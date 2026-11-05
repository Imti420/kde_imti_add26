import { extractAnchors, extractFeedItems, extractFeedUrls, extractSitemapLocs, looksLikeHtml } from "./html.ts";
import { shouldStartCycle } from "./gate.ts";
import { FOLLOW_SCORE, admissionSignal, linkTitle, scoreLink } from "./lexicon.ts";
import { mergeRegistry, seedSources, sourceIdFor } from "./registry.ts";
import { parseRobots, robotsAllows, type RobotsFile } from "./robots.ts";
import {
  NO_DATE_NOTE,
  PRODUCTION_LIMITS,
  USER_AGENT,
  type CrawlCounts,
  type CrawlEvent,
  type CrawlLimits,
  type CrawlState,
  type DiscoveryRecord,
  type LiveFile,
  type OpsBundle,
  type Reachability,
  type RobotsCacheEntry,
  type SeedInstitution,
  type SourceRecord,
} from "./types.ts";
import { isDocumentUrl, isPdfUrl, normalizeUrl, sameSite } from "./url.ts";

export interface FetchHit {
  httpStatus: number | null;
  finalUrl: string;
  etag: string | null;
  lastModified: string | null;
  contentType: string | null;
  bodyText: string | null;
  contentHash: string | null;
  error: string | null;
  transient: boolean;
}

interface RunInput {
  institutions: SeedInstitution[];
  previousRegistry: SourceRecord[];
  previousDiscoveries: DiscoveryRecord[];
  previousSeen?: string[];
  previousRobots?: RobotsCacheEntry[];
  previousState: CrawlState | null;
  now: Date;
  force?: boolean;
  runner: LiveFile["runner"];
  fetchImpl: typeof fetch;
  limits?: Partial<CrawlLimits>;
  clock?: () => Date;
  onProgress?: (snapshot: {
    cycleId: string;
    startedAt: string;
    events: CrawlEvent[];
    sources: SourceRecord[];
    discoveries: DiscoveryRecord[];
    seen: string[];
    robots: RobotsCacheEntry[];
    cursor: number;
    counts: CrawlCounts;
  }) => void;
}

class HostGate {
  private tails = new Map<string, Promise<void>>();
  private last = new Map<string, number>();

  async run<T>(host: string, gapMs: number, fn: () => Promise<T>): Promise<T> {
    const prev = this.tails.get(host) ?? Promise.resolve();
    let release: () => void = () => undefined;
    const current = new Promise<void>((resolve) => {
      release = resolve;
    });
    this.tails.set(host, prev.then(() => current));
    await prev;
    const wait = Math.max(0, (this.last.get(host) ?? 0) + gapMs - Date.now());
    if (wait) await sleep(wait);
    try {
      return await fn();
    } finally {
      this.last.set(host, Date.now());
      release();
    }
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const ROBOTS_TTL_MS = 24 * 60 * 60 * 1000;

/** Stable compact id. Not a secret; it only has to never collide for this archive. */
export function compactHash(value: string): string {
  let h1 = 0x811c9dc5;
  let h2 = 0x9e3779b1;
  for (let i = 0; i < value.length; i += 1) {
    const code = value.charCodeAt(i);
    h1 ^= code;
    h1 = Math.imul(h1, 0x01000193);
    h2 ^= code + i;
    h2 = Math.imul(h2, 0x01000193);
  }
  return (h1 >>> 0).toString(16).padStart(8, "0") + (h2 >>> 0).toString(16).padStart(8, "0");
}

function linkFingerprint(html: string, pageUrl: string): string {
  const rows = [
    ...extractAnchors(html, pageUrl).map((link) => `a\t${link.url}\t${link.text.normalize("NFC").toLowerCase()}`),
    ...extractFeedUrls(html, pageUrl).map((url) => `f\t${url}`),
  ].sort();
  return `links:${compactHash(rows.join("\n"))}`;
}

/** Undergraduate admission notices in Bangladesh cluster in the autumn and winter. */
function isAdmissionSeason(now: Date): boolean {
  const month = now.getUTCMonth() + 1;
  return month >= 9 || month <= 1;
}

function revisitMs(source: SourceRecord, now: Date): number {
  const streak = source.unchangedStreak ?? 0;
  const lastNew = source.lastNewDocumentAt ? Date.parse(source.lastNewDocumentAt) : Number.NaN;
  const hot = Number.isFinite(lastNew) && now.getTime() - lastNew < 14 * 24 * 60 * 60 * 1000;
  if (hot) return 10 * 60 * 1000;
  const docs = source.documentsFound ?? 0;
  if (isAdmissionSeason(now)) {
    if (streak >= 10 && docs === 0) return 7 * 24 * 60 * 60 * 1000;
    if (streak >= 4) return 6 * 60 * 60 * 1000;
    return 45 * 60 * 1000;
  }
  if (streak >= 6 && docs === 0) return 7 * 24 * 60 * 60 * 1000;
  if (streak >= 2) return 24 * 60 * 60 * 1000;
  return 3 * 60 * 60 * 1000;
}

function isDue(source: SourceRecord, now: Date): boolean {
  if (!source.lastCheckedAt) return true;
  if (
    source.reachability === "not_yet_checked" ||
    source.reachability === "retry_scheduled" ||
    source.reachability === "unreachable"
  ) {
    return true;
  }
  const then = Date.parse(source.lastCheckedAt);
  if (!Number.isFinite(then)) return true;
  return now.getTime() - then >= revisitMs(source, now);
}

async function sha256(bytes: Uint8Array): Promise<string> {
  const copy = new Uint8Array(bytes.byteLength);
  copy.set(bytes);
  const digest = await crypto.subtle.digest("SHA-256", copy);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function readCapped(response: Response, maxBytes: number): Promise<{ text: string | null; hash: string | null; error: string | null }> {
  const length = Number(response.headers.get("content-length") ?? "0");
  if (length > maxBytes) {
    await response.body?.cancel();
    return { text: null, hash: null, error: "body too large" };
  }
  const reader = response.body?.getReader();
  if (!reader) return { text: null, hash: null, error: "empty body" };
  const chunks: Uint8Array[] = [];
  let total = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (!value) continue;
    total += value.byteLength;
    if (total > maxBytes) {
      await reader.cancel();
      return { text: null, hash: null, error: "body too large" };
    }
    chunks.push(value);
  }
  if (total === 0) return { text: null, hash: null, error: "empty body" };
  const buffer = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    buffer.set(chunk, offset);
    offset += chunk.byteLength;
  }
  const hash = await sha256(buffer);
  const text = new TextDecoder("utf-8", { fatal: false }).decode(buffer);
  return { text, hash, error: null };
}

export async function fetchHit(
  fetchImpl: typeof fetch,
  url: string,
  limits: CrawlLimits,
  previous?: { etag: string | null; lastModified: string | null },
): Promise<FetchHit> {
  let attempt = 0;
  let lastError = "request failed";
  while (attempt <= limits.retries) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), limits.timeoutMs);
    try {
      const response = await fetchImpl(url, {
        signal: controller.signal,
        redirect: "follow",
        headers: {
          "user-agent": USER_AGENT,
          accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "accept-language": "en,bn;q=0.8",
          ...(previous?.etag ? { "if-none-match": previous.etag } : {}),
          ...(previous?.lastModified ? { "if-modified-since": previous.lastModified } : {}),
        },
      });
      const etag = response.headers.get("etag");
      const lastModified = response.headers.get("last-modified");
      const contentType = response.headers.get("content-type");
      if (response.status === 304) {
        return { httpStatus: 304, finalUrl: response.url || url, etag, lastModified, contentType, bodyText: null, contentHash: null, error: null, transient: false };
      }
      if (response.status === 429 || response.status === 503 || response.status === 502) {
        lastError = `HTTP ${response.status}`;
        attempt += 1;
        if (attempt <= limits.retries) await sleep(limits.retryBaseMs * attempt);
        continue;
      }
      const body = response.status === 200 ? await readCapped(response, limits.maxBytes) : { text: null, hash: null, error: null };
      return {
        httpStatus: response.status,
        finalUrl: response.url || url,
        etag,
        lastModified,
        contentType,
        bodyText: body.text,
        contentHash: body.hash,
        error: body.error,
        transient: false,
      };
    } catch (error) {
      const aborted = error instanceof Error && error.name === "AbortError";
      lastError = aborted ? "timeout" : error instanceof Error ? error.message : "request failed";
      attempt += 1;
      if (attempt <= limits.retries) await sleep(limits.retryBaseMs * attempt);
    } finally {
      clearTimeout(timer);
    }
  }
  return {
    httpStatus: null,
    finalUrl: url,
    etag: null,
    lastModified: null,
    contentType: null,
    bodyText: null,
    contentHash: null,
    error: lastError,
    transient: true,
  };
}

function emptyCounts(): CrawlCounts {
  return {
    universities: 0,
    systems: 0,
    sources: 0,
    checked: 0,
    reached: 0,
    unchanged: 0,
    failed: 0,
    skipped: 0,
    notChecked: 0,
    newDocuments: 0,
    newPages: 0,
  };
}

function count(sources: SourceRecord[]): CrawlCounts {
  const counts = emptyCounts();
  const universities = new Set<string>();
  const systems = new Set<string>();
  counts.sources = sources.length;
  for (const source of sources) {
    if (source.kind === "system") systems.add(source.universityId);
    else universities.add(source.universityId);
    if (source.reachability === "not_yet_checked") {
      counts.notChecked += 1;
      continue;
    }
    if (source.reachability === "no_official_url" || source.reachability === "skipped_robots") {
      counts.skipped += 1;
      continue;
    }
    counts.checked += 1;
    if (source.reachability === "success" || source.reachability === "no_change" || source.reachability === "new_document") {
      counts.reached += 1;
      if (source.reachability === "no_change") counts.unchanged += 1;
    } else {
      counts.failed += 1;
    }
  }
  counts.universities = universities.size;
  counts.systems = systems.size;
  return counts;
}

function applyHit(source: SourceRecord, hit: FetchHit, checkedAt: string): Reachability {
  source.lastCheckedAt = checkedAt;
  source.httpStatus = hit.httpStatus;
  source.error = hit.error;
  if (hit.error && hit.httpStatus == null) {
    source.reachability = hit.transient ? "retry_scheduled" : "unreachable";
    source.lastFailureAt = checkedAt;
    source.contentHash = null;
    source.note = hit.transient
      ? `${hit.error}. Will try again next cycle. This is not an unchanged page.`
      : `${hit.error}. The source could not be reached. This is not an unchanged page.`;
    return source.reachability;
  }
  if (hit.httpStatus === 304) {
    if (!source.contentHash) {
      source.reachability = "unreachable";
      source.lastFailureAt = checkedAt;
      source.note = "HTTP 304 without a stored fingerprint. Not treated as unchanged.";
      source.error = "304 without a stored fingerprint";
      return source.reachability;
    }
    source.reachability = "no_change";
    source.lastSuccessAt = checkedAt;
    source.unchangedStreak = (source.unchangedStreak ?? 0) + 1;
    source.note = "The server reported the page unchanged (304). Links were not re-read.";
    source.error = null;
    return source.reachability;
  }
  if (hit.httpStatus === 404 || hit.httpStatus === 410) {
    source.reachability = "source_broken";
    source.lastFailureAt = checkedAt;
    source.contentHash = null;
    source.note = `HTTP ${hit.httpStatus}. The registered URL looks broken.`;
    return source.reachability;
  }
  if (hit.httpStatus !== 200 || !hit.contentHash) {
    source.reachability = hit.httpStatus === 429 || hit.httpStatus === 503 ? "retry_scheduled" : "unreachable";
    source.lastFailureAt = checkedAt;
    source.contentHash = null;
    source.note = hit.error
      ? `${hit.error}. Not treated as unchanged.`
      : `HTTP ${hit.httpStatus ?? "none"}. A response that is not a readable document is not a successful check.`;
    return source.reachability;
  }
  const same = source.contentHash === hit.contentHash;
  source.etag = hit.etag;
  source.lastModified = hit.lastModified;
  source.contentHash = hit.contentHash;
  source.lastSuccessAt = checkedAt;
  source.error = null;
  source.reachability = same ? "no_change" : "success";
  source.unchangedStreak = same ? (source.unchangedStreak ?? 0) + 1 : 0;
  source.note = same
    ? "Content fingerprint matches the previous check."
    : source.origin === "seed"
      ? "Homepage retrieved. Reaching it does not confirm any admission date."
      : "Linked page retrieved from the official site. No admission date was published.";
  return source.reachability;
}

function discoveryId(universityId: string, url: string): string {
  return `${universityId}:${url}`.slice(0, 180);
}

export async function runDiscovery(input: RunInput): Promise<{ skipped: boolean; reason: string; bundle: OpsBundle | null }> {
  const limits = { ...PRODUCTION_LIMITS, ...input.limits };
  const clock = input.clock ?? (() => new Date());
  const interval = input.previousState?.intervalMinutes ?? 45;
  if (!input.force && !shouldStartCycle(input.previousState?.lastCompletedAt ?? null, input.now, interval, input.previousState?.lastStatus)) {
    return {
      skipped: true,
      reason: `Last completed cycle was under ${interval} minutes ago. No scan was started.`,
      bundle: null,
    };
  }

  const events: CrawlEvent[] = [];
  const log = (event: Omit<CrawlEvent, "at">) => {
    events.push({ ...event, at: clock().toISOString() });
  };
  const started = clock();
  const cycleId = `cyc-${started.toISOString()}`;
  log({
    level: "info",
    type: "cycle_start",
    universityId: null,
    sourceId: null,
    url: null,
    message: input.previousState?.lastStatus === "running"
      ? "Previous cycle did not finish. Starting a new discovery cycle. No date will be published."
      : "Starting discovery cycle. No date will be published.",
  });

  const registry = mergeRegistry(seedSources(input.institutions), input.previousRegistry);
  const discoveries = [...input.previousDiscoveries];
  const knownDiscovery = new Set(discoveries.map((item) => item.id));
  const seen = new Set<string>(input.previousSeen ?? []);
  for (const item of discoveries) seen.add(compactHash(item.id));
  const robotsCache = new Map<string, RobotsFile | null>();
  const robotsStore = new Map<string, RobotsCacheEntry>();
  for (const entry of input.previousRobots ?? []) {
    if (!entry?.origin || !entry.fetchedAt) continue;
    robotsStore.set(entry.origin, entry);
  }
  const pageCache = new Map<string, FetchHit>();
  const gate = new HostGate();
  let fetches = 0;
  let capped = false;

  const takeFetch = () => {
    if (fetches >= limits.maxFetches) {
      capped = true;
      return false;
    }
    fetches += 1;
    return true;
  };

  const loadRobots = async (pageUrl: string): Promise<RobotsFile | null> => {
    const origin = new URL(pageUrl).origin;
    if (robotsCache.has(origin)) return robotsCache.get(origin) ?? null;
    const stored = robotsStore.get(origin);
    const storedAt = stored ? Date.parse(stored.fetchedAt) : Number.NaN;
    if (stored && Number.isFinite(storedAt) && clock().getTime() - storedAt < ROBOTS_TTL_MS) {
      const parsed = stored.body ? parseRobots(stored.body) : null;
      robotsCache.set(origin, parsed);
      return parsed;
    }
    const robotsUrl = `${origin}/robots.txt`;
    if (!takeFetch()) return null;
    const hit = await gate.run(new URL(pageUrl).hostname, limits.hostGapMs, () => fetchHit(input.fetchImpl, robotsUrl, limits));
    pageCache.set(robotsUrl, hit);
    if (hit.transient || hit.httpStatus == null) {
      robotsCache.set(origin, null);
      return null;
    }
    const body = hit.httpStatus === 200 ? hit.bodyText : null;
    if (hit.httpStatus === 200 || hit.httpStatus === 404) {
      robotsStore.set(origin, { origin, fetchedAt: clock().toISOString(), body });
    }
    const parsed = body ? parseRobots(body) : null;
    robotsCache.set(origin, parsed);
    return parsed;
  };

  const retrieve = async (url: string, previous?: { etag: string | null; lastModified: string | null }): Promise<FetchHit | null> => {
    const cached = pageCache.get(url);
    if (cached) return cached;
    if (!takeFetch()) return null;
    const hit = await gate.run(new URL(url).hostname, limits.hostGapMs, () => fetchHit(input.fetchImpl, url, limits, previous));
    const type = (hit.contentType ?? "").toLowerCase();
    const xml = type.includes("xml") || type.includes("rss") || type.includes("atom");
    if (hit.bodyText && !xml && looksLikeHtml(hit.contentType, hit.finalUrl || url)) {
      hit.contentHash = linkFingerprint(hit.bodyText, hit.finalUrl || url);
    }
    pageCache.set(url, hit);
    return hit;
  };

  const remember = (
    source: SourceRecord,
    item: Omit<DiscoveryRecord, "id" | "universityId" | "shortName" | "downloaded" | "disposition"> & { downloaded?: false },
    options?: { baseline?: boolean },
  ) => {
    const record: DiscoveryRecord = {
      ...item,
      id: discoveryId(source.universityId, item.url),
      universityId: source.universityId,
      shortName: source.shortName,
      downloaded: false,
      disposition: options?.baseline ? "baseline" : "new",
    };
    const hash = compactHash(record.id);
    if (knownDiscovery.has(record.id) || seen.has(hash)) return false;
    knownDiscovery.add(record.id);
    seen.add(hash);
    discoveries.push(record);
    if (record.kind === "pdf") {
      source.documentsFound += 1;
      source.lastDiscoveredDocument = record.url;
      if (!options?.baseline) {
        source.lastNewDocumentAt = clock().toISOString();
        source.unchangedStreak = 0;
      }
    }
    return true;
  };

  const institutions = rotate(input.institutions, input.previousState?.cursor ?? 0);
  const startCursor = input.previousState?.cursor ?? 0;
  const done = new Array<boolean>(institutions.length).fill(false);
  let highWater = 0;
  const nextCursor = () => {
    if (!institutions.length || highWater >= institutions.length) return 0;
    return (startCursor + highWater) % institutions.length;
  };
  const tally = () => {
    const totals = count(registry);
    totals.newDocuments = events.filter((event) => event.type === "discover" && event.message.startsWith("New document")).length;
    totals.newPages = events.filter(
      (event) =>
        event.type === "discover" &&
        (event.message.startsWith("Recorded linked page") ||
          event.message.startsWith("Feed listed a page") ||
          event.message.startsWith("Sitemap listed a page")),
    ).length;
    return totals;
  };
  const publish = () => {
    if (!input.onProgress) return;
    input.onProgress({
      cycleId,
      startedAt: started.toISOString(),
      events: events.slice(-limits.maxEvents),
      sources: registry,
      discoveries: discoveries.slice(-limits.maxDiscoveries),
      seen: [...seen],
      robots: [...robotsStore.values()],
      cursor: nextCursor(),
      counts: tally(),
    });
  };
  const announceDocuments = (source: SourceRecord, docs: DiscoveryRecord[], baseline: boolean) => {
    if (!docs.length) return;
    if (baseline) {
      source.note = `Baselined ${docs.length} document link${docs.length === 1 ? "" : "s"} already on the official site. Not announced as new. Not downloaded.`;
      log({
        level: "info",
        type: "discover",
        universityId: source.universityId,
        sourceId: source.id,
        url: docs[0]?.url ?? source.url,
        message: `Baselined ${docs.length} existing document link${docs.length === 1 ? "" : "s"} on ${source.shortName}. Not announced as new. Not downloaded.`,
      });
      return;
    }
    source.reachability = "new_document";
    source.note = `Recorded ${docs.length} new document link${docs.length === 1 ? "" : "s"}. The files were not downloaded. No date was published.`;
    for (const doc of docs) {
      log({
        level: "info",
        type: "discover",
        universityId: source.universityId,
        sourceId: source.id,
        url: doc.url,
        message: `New document link on ${source.shortName}: ${doc.title || doc.url}. Not downloaded.`,
      });
    }
  };
  const recheckSource = async (source: SourceRecord, robots: RobotsFile | null, baseline: boolean) => {
    if (!source.url || capped) return;
    const path = new URL(source.url).pathname || "/";
    if (robots && !robotsAllows(robots, path, USER_AGENT)) {
      source.reachability = "skipped_robots";
      source.lastCheckedAt = clock().toISOString();
      source.note = "robots.txt disallows this path. Not fetched.";
      source.error = "disallowed by robots.txt";
      log({
        level: "warn",
        type: "skip",
        universityId: source.universityId,
        sourceId: source.id,
        url: source.url,
        message: `Skipped ${source.url} because robots.txt disallows it.`,
      });
      return;
    }
    const hit = await retrieve(source.url, source);
    if (!hit) return;
    const reach = applyHit(source, hit, clock().toISOString());
    if (reach === "unreachable" || reach === "retry_scheduled" || reach === "source_broken") {
      log({
        level: "error",
        type: "fail",
        universityId: source.universityId,
        sourceId: source.id,
        url: source.url,
        message: `${source.shortName} linked page failed: ${source.note}`,
      });
      return;
    }
    if (reach === "no_change" || !hit.bodyText) {
      if (reach === "no_change") {
        log({
          level: "info",
          type: "no_change",
          universityId: source.universityId,
          sourceId: source.id,
          url: source.url,
          message: `${source.shortName} linked page is unchanged.`,
        });
      }
      return;
    }
    if (source.type === "sitemap") {
      const locs = extractSitemapLocs(hit.bodyText)
        .filter((url) => sameSite(source.url ?? url, url))
        .map((url) => ({ url, score: scoreLink(url, url) }))
        .filter((item) => (isPdfUrl(item.url) || isDocumentUrl(item.url) ? admissionSignal(item.url, item.url) : item.score >= FOLLOW_SCORE))
        .sort((a, b) => b.score - a.score)
        .slice(0, limits.maxExtraPages);
      for (const loc of locs) {
        const pdf = isPdfUrl(loc.url) || isDocumentUrl(loc.url);
        const added = remember(
          source,
          {
            url: loc.url,
            foundOn: source.url ?? loc.url,
            foundAt: clock().toISOString(),
            title: loc.url,
            kind: pdf ? "pdf" : "page",
            score: loc.score,
            sameSite: true,
          },
          { baseline },
        );
        if (!added || baseline) continue;
        if (pdf) source.reachability = "new_document";
        log({
          level: "info",
          type: "discover",
          universityId: source.universityId,
          sourceId: source.id,
          url: loc.url,
          message: pdf
            ? `New document link on ${source.shortName}: ${loc.url}. Not downloaded.`
            : `Sitemap listed a page for ${source.shortName}: ${loc.url}. Not downloaded.`,
        });
      }
      return;
    }
    if (source.type === "feed") {
      let documents = 0;
      for (const item of extractFeedItems(hit.bodyText, hit.finalUrl || source.url)) {
        if (!sameSite(source.url, item.url)) continue;
        const score = scoreLink(`${item.text} ${item.context}`, item.url);
        const pdf = isPdfUrl(item.url) || isDocumentUrl(item.url);
        if (pdf ? !admissionSignal(`${item.text} ${item.context}`, item.url) : score < FOLLOW_SCORE) continue;
        const added = remember(
          source,
          {
            url: item.url,
            foundOn: source.url,
            foundAt: clock().toISOString(),
            title: linkTitle(item.text, item.context),
            kind: pdf ? "pdf" : "page",
            score,
            sameSite: true,
          },
          { baseline },
        );
        if (!added || baseline) continue;
        if (pdf) documents += 1;
        log({
          level: "info",
          type: "discover",
          universityId: source.universityId,
          sourceId: source.id,
          url: item.url,
          message: pdf
            ? `New document link on ${source.shortName}: ${item.text || item.url}. Not downloaded.`
            : `Feed listed a page for ${source.shortName}: ${item.text || item.url}. Not downloaded.`,
        });
      }
      if (documents > 0) {
        source.reachability = "new_document";
        source.note = `Recorded ${documents} new document link${documents === 1 ? "" : "s"} from the official feed. The files were not downloaded. No date was published.`;
      }
      return;
    }
    if (!looksLikeHtml(hit.contentType, hit.finalUrl) || !sameSite(source.url, hit.finalUrl)) return;
    const docs = collectLinks(source, hit.bodyText, hit.finalUrl, remember, baseline);
    if (docs.length) announceDocuments(source, docs, baseline);
  };
  const processInstitution = async (institution: SeedInstitution, index: number): Promise<"cap" | void> => {
    let complete = true;
    try {
      const owned = registry.filter((source) => source.universityId === institution.id);
      const homepage = owned.find((source) => source.type === "homepage") ?? null;
      if (!homepage || !homepage.url) {
        log({
          level: "warn",
          type: "skip",
          universityId: institution.id,
          sourceId: homepage?.id ?? null,
          url: null,
          message: `${institution.name} has no official website on file. Skipped. Not marked unchanged.`,
        });
        return;
      }
      const baseline = !homepage.lastSuccessAt;
      const dueChildren = owned.filter((source) => source.id !== homepage.id && Boolean(source.url) && isDue(source, clock()));
      if (!isDue(homepage, clock())) {
        if (!dueChildren.length) {
          log({
            level: "info",
            type: "skip",
            universityId: institution.id,
            sourceId: homepage.id,
            url: homepage.url,
            message: `Skipping ${institution.shortName}: last check is still inside its revisit window.`,
          });
          return;
        }
        const robots = await loadRobots(homepage.url);
        if (capped) {
          complete = false;
          log({
            level: "warn",
            type: "cap",
            universityId: institution.id,
            sourceId: homepage.id,
            url: homepage.url,
            message: "Fetch cap reached. Remaining sources stay unchecked and were not marked successful.",
          });
          return "cap";
        }
        for (const child of dueChildren) {
          if (capped) return "cap";
          await recheckSource(child, robots, false);
        }
        return;
      }
      log({
        level: "info",
        type: "connect",
        universityId: institution.id,
        sourceId: homepage.id,
        url: homepage.url,
        message: `Connecting to ${institution.name} official homepage.`,
      });
      const robots = await loadRobots(homepage.url);
      if (capped && !pageCache.has(homepage.url)) {
        complete = false;
        log({
          level: "warn",
          type: "cap",
          universityId: institution.id,
          sourceId: homepage.id,
          url: homepage.url,
          message: "Fetch cap reached. Remaining sources stay unchecked and were not marked successful.",
        });
        return "cap";
      }
      const path = new URL(homepage.url).pathname || "/";
      if (robots && !robotsAllows(robots, path, USER_AGENT)) {
        homepage.reachability = "skipped_robots";
        homepage.lastCheckedAt = clock().toISOString();
        homepage.note = "robots.txt disallows this path. Not fetched.";
        homepage.error = "disallowed by robots.txt";
        log({
          level: "warn",
          type: "skip",
          universityId: institution.id,
          sourceId: homepage.id,
          url: homepage.url,
          message: `Skipped ${institution.shortName} homepage because robots.txt disallows it.`,
        });
        return;
      }
      const hit = await retrieve(homepage.url, homepage);
      if (!hit) {
        complete = false;
        log({
          level: "warn",
          type: "cap",
          universityId: institution.id,
          sourceId: homepage.id,
          url: homepage.url,
          message: "Fetch cap reached before this homepage. It was not marked successful.",
        });
        return "cap";
      }
      const reach = applyHit(homepage, hit, clock().toISOString());
      if (reach === "unreachable" || reach === "retry_scheduled" || reach === "source_broken") {
        log({
          level: "error",
          type: "fail",
          universityId: institution.id,
          sourceId: homepage.id,
          url: homepage.url,
          message: `${institution.shortName} homepage failed: ${homepage.note}`,
        });
        return;
      }
      if (reach === "no_change") {
        log({
          level: "info",
          type: "no_change",
          universityId: institution.id,
          sourceId: homepage.id,
          url: homepage.url,
          message: hit.httpStatus === 304
            ? `${institution.shortName} homepage is unchanged (304).`
            : `${institution.shortName} homepage matches the stored link fingerprint.`,
        });
        for (const child of dueChildren) {
          if (capped) return "cap";
          await recheckSource(child, robots, false);
        }
        return;
      }
      log({
        level: "info",
        type: "fetched",
        universityId: institution.id,
        sourceId: homepage.id,
        url: hit.finalUrl,
        message: `Retrieved ${institution.shortName} homepage.`,
      });
      if (!hit.bodyText || !looksLikeHtml(hit.contentType, hit.finalUrl)) return;
      if (!sameSite(homepage.url, hit.finalUrl)) {
        homepage.note = "Homepage redirected off the official site. Links on the destination were not treated as official.";
        log({
          level: "warn",
          type: "skip",
          universityId: institution.id,
          sourceId: homepage.id,
          url: hit.finalUrl,
          message: `${institution.shortName} redirected off its official site. Off-site page was not crawled.`,
        });
        return;
      }
      const freshDocs = collectLinks(homepage, hit.bodyText, hit.finalUrl, remember, baseline);
      if (freshDocs.length) announceDocuments(homepage, freshDocs, baseline);
      else {
        log({
          level: "info",
          type: "no_change",
          universityId: institution.id,
          sourceId: homepage.id,
          url: homepage.url,
          message: `No new documents on ${institution.shortName}.`,
        });
      }
      await followPages({
        homepage,
        html: hit.bodyText,
        finalUrl: hit.finalUrl,
        robots,
        registry,
        limits,
        clock,
        log,
        remember,
        retrieve,
        capped: () => capped,
        baseline,
      });
      await readFeeds({
        homepage,
        html: hit.bodyText,
        finalUrl: hit.finalUrl,
        registry,
        clock,
        log,
        remember,
        retrieve,
        capped: () => capped,
        baseline,
      });
      if (robots) {
        const sitemap = robots.sitemaps.map((item) => normalizeUrl(item)).find((item) => item && sameSite(homepage.url!, item));
        if (sitemap) await readSitemap(homepage, sitemap, registry, limits, clock, log, remember, retrieve, baseline);
      }
      if (capped) return "cap";
    } finally {
      if (complete) {
        done[index] = true;
        while (highWater < institutions.length && done[highWater]) highWater += 1;
      }
      publish();
    }
  };

  let nextIndex = 0;
  let stopAll = false;
  const worker = async () => {
    while (!stopAll) {
      const index = nextIndex++;
      if (index >= institutions.length) return;
      const result = await processInstitution(institutions[index]!, index);
      if (result === "cap") stopAll = true;
    }
  };
  const poolSize = Math.max(1, Math.min(limits.concurrency || 1, Math.max(institutions.length, 1)));
  if (institutions.length) await Promise.all(Array.from({ length: poolSize }, () => worker()));

  const counts = tally();
  const completed = clock();
  log({
    level: counts.failed && !counts.reached ? "error" : "info",
    type: "cycle_end",
    universityId: null,
    sourceId: null,
    url: null,
    message: `Discovery cycle finished. Checked ${counts.checked}, reached ${counts.reached}, failed ${counts.failed}. No admission date was published.`,
  });
  const state: CrawlState = {
    version: 1,
    intervalMinutes: 45,
    lastStartedAt: started.toISOString(),
    lastCompletedAt: completed.toISOString(),
    lastStatus: counts.checked > 0 && counts.reached === 0 && counts.failed > 0 ? "failed" : "completed",
    cycleId,
    cursor: nextCursor(),
    note: NO_DATE_NOTE,
  };
  const live: LiveFile = {
    version: 1,
    generatedAt: completed.toISOString(),
    status: state.lastStatus,
    runner: input.runner,
    intervalMinutes: 45,
    cycleId,
    startedAt: started.toISOString(),
    completedAt: completed.toISOString(),
    durationMs: completed.getTime() - started.getTime(),
    note: NO_DATE_NOTE,
    counts,
    events: events.slice(-limits.maxEvents),
    sources: registry,
    discoveries: discoveries.slice(-200),
  };
  return {
    skipped: false,
    reason: "",
    bundle: {
      state,
      registry,
      discoveries: discoveries.slice(-limits.maxDiscoveries),
      events: events.slice(-limits.maxEvents),
      live,
      seen: [...seen],
      robots: [...robotsStore.values()],
    },
  };
}

function rotate<T>(items: T[], cursor: number): T[] {
  if (!items.length) return items;
  const index = ((cursor % items.length) + items.length) % items.length;
  return items.slice(index).concat(items.slice(0, index));
}

type Remember = (
  source: SourceRecord,
  item: Omit<DiscoveryRecord, "id" | "universityId" | "shortName" | "downloaded" | "disposition">,
  options?: { baseline?: boolean },
) => boolean;

function collectLinks(
  source: SourceRecord,
  html: string,
  pageUrl: string,
  remember: Remember,
  baseline = false,
): DiscoveryRecord[] {
  const created: DiscoveryRecord[] = [];
  for (const link of extractAnchors(html, pageUrl)) {
    const title = linkTitle(link.text, link.context);
    const scored = `${title} ${link.context}`;
    const score = scoreLink(scored, link.url);
    const pdf = isPdfUrl(link.url) || isDocumentUrl(link.url);
    const onSite = sameSite(pageUrl, link.url);
    if (!onSite || !pdf || !admissionSignal(scored, link.url)) continue;
    const added = remember(
      source,
      {
        url: link.url,
        foundOn: pageUrl,
        foundAt: source.lastCheckedAt ?? new Date().toISOString(),
        title,
        kind: "pdf",
        score,
        sameSite: onSite,
      },
      { baseline },
    );
    if (added) {
      created.push({
        id: discoveryId(source.universityId, link.url),
        universityId: source.universityId,
        shortName: source.shortName,
        url: link.url,
        foundOn: pageUrl,
        foundAt: source.lastCheckedAt ?? "",
        title,
        kind: "pdf",
        score,
        sameSite: onSite,
        downloaded: false,
        disposition: baseline ? "baseline" : "new",
      });
    }
  }
  for (const feed of extractFeedUrls(html, pageUrl)) {
    if (!sameSite(pageUrl, feed)) continue;
    remember(
      source,
      {
        url: feed,
        foundOn: pageUrl,
        foundAt: source.lastCheckedAt ?? new Date().toISOString(),
        title: "RSS or Atom feed",
        kind: "feed",
        score: FOLLOW_SCORE,
        sameSite: true,
      },
      { baseline },
    );
  }
  return created;
}

async function followPages(input: {
  homepage: SourceRecord;
  html: string;
  finalUrl: string;
  robots: RobotsFile | null;
  registry: SourceRecord[];
  limits: CrawlLimits;
  clock: () => Date;
  log: (event: Omit<CrawlEvent, "at">) => void;
  remember: Remember;
  retrieve: (url: string, previous?: { etag: string | null; lastModified: string | null }) => Promise<FetchHit | null>;
  capped: () => boolean;
  baseline: boolean;
}) {
  const candidates = extractAnchors(input.html, input.finalUrl)
    .map((link) => ({ ...link, score: scoreLink(link.text, link.url) }))
    .filter((link) => link.score >= FOLLOW_SCORE && sameSite(input.finalUrl, link.url) && !isDocumentUrl(link.url))
    .filter((link) => normalizeUrl(link.url) !== normalizeUrl(input.homepage.url ?? ""))
    .sort((a, b) => b.score - a.score)
    .slice(0, input.limits.maxExtraPages);
  for (const candidate of candidates) {
    if (input.capped()) return;
    const path = new URL(candidate.url).pathname || "/";
    if (input.robots && !robotsAllows(input.robots, path, USER_AGENT)) {
      input.log({
        level: "warn",
        type: "skip",
        universityId: input.homepage.universityId,
        sourceId: input.homepage.id,
        url: candidate.url,
        message: `Skipped ${candidate.url} because robots.txt disallows it.`,
      });
      continue;
    }
    const existing = input.registry.find((source) => source.url === candidate.url && source.universityId === input.homepage.universityId);
    const page = existing ?? {
      ...input.homepage,
      id: sourceIdFor(input.homepage.universityId, candidate.url, "discovered-page"),
      sourceName: candidate.text || `${input.homepage.shortName} linked admission page`,
      url: candidate.url,
      type: "discovered-page" as const,
      reliability: "official-linked" as const,
      extraction: "html-links" as const,
      origin: "discovered" as const,
      lastSuccessAt: null,
      lastFailureAt: null,
      lastCheckedAt: null,
      lastDiscoveredDocument: null,
      documentsFound: 0,
      reachability: "not_yet_checked" as const,
      httpStatus: null,
      etag: null,
      lastModified: null,
      contentHash: null,
      error: null,
      note: "Found on the official homepage during this cycle.",
      unchangedStreak: 0,
      lastNewDocumentAt: null,
    };
    if (!existing) input.registry.push(page);
    else if (!isDue(existing, input.clock())) continue;
    input.log({
      level: "info",
      type: "connect",
      universityId: page.universityId,
      sourceId: page.id,
      url: candidate.url,
      message: `Opening linked page for ${input.homepage.shortName}: ${candidate.text || candidate.url}`,
    });
    const hit = await input.retrieve(candidate.url, page);
    if (!hit) return;
    const reach = applyHit(page, hit, input.clock().toISOString());
    if (reach === "unreachable" || reach === "retry_scheduled" || reach === "source_broken") {
      input.log({
        level: "error",
        type: "fail",
        universityId: page.universityId,
        sourceId: page.id,
        url: candidate.url,
        message: `Linked page failed for ${input.homepage.shortName}: ${page.note}`,
      });
      continue;
    }
    if (hit.bodyText && looksLikeHtml(hit.contentType, hit.finalUrl) && sameSite(candidate.url, hit.finalUrl)) {
      const docs = collectLinks(page, hit.bodyText, hit.finalUrl, input.remember, input.baseline);
      if (docs.length && input.baseline) {
        page.note = `Baselined ${docs.length} document link${docs.length === 1 ? "" : "s"} already linked from the official site. Not announced as new. Not downloaded.`;
      } else if (docs.length) {
        page.reachability = "new_document";
        page.note = `Recorded ${docs.length} new document link${docs.length === 1 ? "" : "s"} from a page linked by the official site. Not downloaded.`;
        for (const doc of docs) {
          input.log({
            level: "info",
            type: "discover",
            universityId: page.universityId,
            sourceId: page.id,
            url: doc.url,
            message: `New document link on ${input.homepage.shortName}: ${doc.title || doc.url}. Not downloaded.`,
          });
        }
      }
    }
    const added = input.remember(
      input.homepage,
      {
        url: candidate.url,
        foundOn: input.finalUrl,
        foundAt: input.clock().toISOString(),
        title: candidate.text,
        kind: "page",
        score: candidate.score,
        sameSite: true,
      },
      { baseline: input.baseline },
    );
    if (added && !input.baseline) {
      input.log({
        level: "info",
        type: "discover",
        universityId: page.universityId,
        sourceId: page.id,
        url: candidate.url,
        message: `Recorded linked page for ${input.homepage.shortName}: ${candidate.text || candidate.url}`,
      });
    }
  }
}

async function readFeeds(input: {
  homepage: SourceRecord;
  html: string;
  finalUrl: string;
  registry: SourceRecord[];
  clock: () => Date;
  log: (event: Omit<CrawlEvent, "at">) => void;
  remember: Remember;
  retrieve: (url: string) => Promise<FetchHit | null>;
  capped: () => boolean;
  baseline: boolean;
}) {
  const feeds = extractFeedUrls(input.html, input.finalUrl).filter((url) => sameSite(input.finalUrl, url)).slice(0, 1);
  for (const feedUrl of feeds) {
    if (input.capped()) return;
    const existing = input.registry.find((source) => source.url === feedUrl && source.universityId === input.homepage.universityId);
    const feed = existing ?? {
      ...input.homepage,
      id: sourceIdFor(input.homepage.universityId, feedUrl, "feed"),
      sourceName: `${input.homepage.shortName} official feed`,
      url: feedUrl,
      type: "feed" as const,
      reliability: "official-linked" as const,
      extraction: "feed" as const,
      origin: "discovered" as const,
      lastSuccessAt: null,
      lastFailureAt: null,
      lastCheckedAt: null,
      lastDiscoveredDocument: null,
      documentsFound: 0,
      reachability: "not_yet_checked" as const,
      httpStatus: null,
      etag: null,
      lastModified: null,
      contentHash: null,
      error: null,
      note: "Feed linked from the official homepage.",
      unchangedStreak: 0,
      lastNewDocumentAt: null,
    };
    if (!existing) input.registry.push(feed);
    const hit = await input.retrieve(feedUrl);
    if (!hit || hit.httpStatus !== 200 || !hit.bodyText) {
      if (hit) applyHit(feed, hit, input.clock().toISOString());
      input.log({
        level: "warn",
        type: "fail",
        universityId: input.homepage.universityId,
        sourceId: feed.id,
        url: feedUrl,
        message: `${input.homepage.shortName} feed could not be read${hit?.error ? `: ${hit.error}` : hit?.httpStatus ? `: HTTP ${hit.httpStatus}` : ""}. Not treated as unchanged.`,
      });
      continue;
    }
    applyHit(feed, hit, input.clock().toISOString());
    let documents = 0;
    for (const item of extractFeedItems(hit.bodyText, hit.finalUrl || feedUrl)) {
      if (!sameSite(input.finalUrl, item.url)) continue;
      const title = linkTitle(item.text, item.context);
      const score = scoreLink(`${title} ${item.context}`, item.url);
      const pdf = isPdfUrl(item.url) || isDocumentUrl(item.url);
      if (pdf ? !admissionSignal(`${title} ${item.context}`, item.url) : score < FOLLOW_SCORE) continue;
      const added = input.remember(
        feed,
        {
          url: item.url,
          foundOn: feedUrl,
          foundAt: input.clock().toISOString(),
          title,
          kind: pdf ? "pdf" : "page",
          score,
          sameSite: true,
        },
        { baseline: input.baseline },
      );
      if (!added || input.baseline) continue;
      if (pdf) documents += 1;
      input.log({
        level: "info",
        type: "discover",
        universityId: input.homepage.universityId,
        sourceId: feed.id,
        url: item.url,
        message: pdf
          ? `New document link on ${input.homepage.shortName}: ${title || item.url}. Not downloaded.`
          : `Feed listed a page for ${input.homepage.shortName}: ${title || item.url}. Not downloaded.`,
      });
    }
    if (documents > 0 && !input.baseline) {
      input.homepage.reachability = "new_document";
      input.homepage.note = `Recorded ${documents} new document link${documents === 1 ? "" : "s"} from the official feed. The files were not downloaded. No date was published.`;
    }
  }
}

async function readSitemap(
  homepage: SourceRecord,
  sitemap: string,
  registry: SourceRecord[],
  limits: CrawlLimits,
  clock: () => Date,
  log: (event: Omit<CrawlEvent, "at">) => void,
  remember: Remember,
  retrieve: (url: string) => Promise<FetchHit | null>,
  baseline = false,
) {
  const id = sourceIdFor(homepage.universityId, sitemap, "sitemap");
  let source = registry.find((item) => item.id === id) ?? null;
  if (!source) {
    source = {
      ...homepage,
      id,
      sourceName: `${homepage.shortName} sitemap`,
      url: sitemap,
      type: "sitemap",
      reliability: "official-linked",
      extraction: "sitemap",
      origin: "discovered",
      lastSuccessAt: null,
      lastFailureAt: null,
      lastCheckedAt: null,
      contentHash: null,
      documentsFound: 0,
      lastDiscoveredDocument: null,
      reachability: "not_yet_checked",
      httpStatus: null,
      etag: null,
      lastModified: null,
      error: null,
      note: "Sitemap declared by robots.txt.",
      unchangedStreak: 0,
      lastNewDocumentAt: null,
    };
    registry.push(source);
  }
  const hit = await retrieve(sitemap);
  if (!hit) return;
  applyHit(source, hit, clock().toISOString());
  if (!hit.bodyText) return;
  const locs = extractSitemapLocs(hit.bodyText)
    .filter((url) => sameSite(homepage.url ?? sitemap, url))
    .map((url) => ({ url, score: scoreLink(url, url) }))
    .filter((item) => (isPdfUrl(item.url) || isDocumentUrl(item.url) ? admissionSignal(item.url, item.url) : item.score >= FOLLOW_SCORE))
    .sort((a, b) => b.score - a.score)
    .slice(0, limits.maxExtraPages);
  for (const loc of locs) {
    const pdf = isPdfUrl(loc.url) || isDocumentUrl(loc.url);
    const added = remember(
      homepage,
      {
        url: loc.url,
        foundOn: sitemap,
        foundAt: clock().toISOString(),
        title: loc.url,
        kind: pdf ? "pdf" : "page",
        score: loc.score,
        sameSite: true,
      },
      { baseline },
    );
    if (!added || baseline) continue;
    if (pdf && homepage.reachability !== "unreachable") homepage.reachability = "new_document";
    log({
      level: "info",
      type: "discover",
      universityId: homepage.universityId,
      sourceId: source.id,
      url: loc.url,
      message: pdf
        ? `New document link on ${homepage.shortName}: ${loc.url}. Not downloaded.`
        : `Sitemap listed a page for ${homepage.shortName}: ${loc.url}. Not downloaded.`,
    });
  }
}

export function blankState(): CrawlState {
  return {
    version: 1,
    intervalMinutes: 45,
    lastStartedAt: null,
    lastCompletedAt: null,
    lastStatus: "never",
    cycleId: null,
    cursor: 0,
    note: "No discovery cycle has run.",
  };
}
