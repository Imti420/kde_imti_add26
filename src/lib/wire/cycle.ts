import { parseRobots, robotsAllows } from "../crawl/robots.ts";
import { parseFeed, parseHtml, type ParsedItem } from "./parse.ts";
import { admissionRelevance, classifyVerification } from "./relevance.ts";
import { cleanHeadline, digest, hashKey, parseFeedDate } from "./text.ts";
import {
  WIRE_LIMITS,
  WIRE_USER_AGENT,
  type ManualSubmission,
  type WireCounts,
  type WireItem,
  type WireLimits,
  type WireLive,
  type WireLogLine,
  type WireSourceDef,
  type WireSourceState,
  type WireSourceStatus,
} from "./types.ts";

interface Pull {
  httpStatus: number | null;
  finalUrl: string;
  contentType: string | null;
  text: string | null;
  hash: string | null;
  error: string | null;
}

export interface WireRunInput {
  sources: WireSourceDef[];
  manual: ManualSubmission[];
  previousItems: WireItem[];
  previousSources: WireSourceState[];
  now: Date;
  runner: WireLive["runner"];
  fetchImpl: typeof fetch;
  limits?: Partial<WireLimits>;
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
    if (wait) await new Promise((resolve) => setTimeout(resolve, wait));
    try {
      return await fn();
    } finally {
      this.last.set(host, Date.now());
      release();
    }
  }
}

async function pull(fetchImpl: typeof fetch, url: string, limits: WireLimits): Promise<Pull> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), limits.timeoutMs);
  try {
    const response = await fetchImpl(url, {
      signal: controller.signal,
      redirect: "follow",
      headers: {
        "user-agent": WIRE_USER_AGENT,
        accept: "application/rss+xml, application/atom+xml, application/xml, text/html;q=0.9, */*;q=0.8",
        "accept-language": "en,bn;q=0.8",
      },
    });
    const contentType = response.headers.get("content-type");
    if (response.status === 401 || response.status === 403 || response.status === 429) {
      await response.body?.cancel();
      return { httpStatus: response.status, finalUrl: response.url || url, contentType, text: null, hash: null, error: `HTTP ${response.status}. Access was refused.` };
    }
    if (!response.ok) {
      await response.body?.cancel();
      return { httpStatus: response.status, finalUrl: response.url || url, contentType, text: null, hash: null, error: `HTTP ${response.status}` };
    }
    const length = Number(response.headers.get("content-length") ?? "0");
    if (length > limits.maxBytes) {
      await response.body?.cancel();
      return { httpStatus: response.status, finalUrl: response.url || url, contentType, text: null, hash: null, error: "body too large" };
    }
    const reader = response.body?.getReader();
    if (!reader) return { httpStatus: response.status, finalUrl: response.url || url, contentType, text: null, hash: null, error: "empty body" };
    const chunks: Uint8Array[] = [];
    let total = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (!value) continue;
      total += value.byteLength;
      if (total > limits.maxBytes) {
        await reader.cancel();
        return { httpStatus: response.status, finalUrl: response.url || url, contentType, text: null, hash: null, error: "body too large" };
      }
      chunks.push(value);
    }
    if (total === 0) return { httpStatus: response.status, finalUrl: response.url || url, contentType, text: null, hash: null, error: "empty body" };
    const buffer = new Uint8Array(total);
    let offset = 0;
    for (const chunk of chunks) {
      buffer.set(chunk, offset);
      offset += chunk.byteLength;
    }
    const hash = await digestBytes(buffer);
    const text = new TextDecoder("utf-8", { fatal: false }).decode(buffer);
    return { httpStatus: response.status, finalUrl: response.url || url, contentType, text, hash, error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : "request failed";
    return { httpStatus: null, finalUrl: url, contentType: null, text: null, hash: null, error: message || "request failed" };
  } finally {
    clearTimeout(timer);
  }
}

async function digestBytes(buffer: Uint8Array): Promise<string> {
  const copy = new Uint8Array(buffer.byteLength);
  copy.set(buffer);
  const bytes = await crypto.subtle.digest("SHA-256", copy);
  return [...new Uint8Array(bytes)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function blankSource(source: WireSourceDef, patch: Partial<WireSourceState>): WireSourceState {
  return {
    id: source.id,
    name: source.name,
    category: source.category,
    subtype: source.subtype,
    url: source.url,
    platform: source.platform,
    trust: source.trust,
    accessMethod: source.accessMethod,
    automatedAuthorised: source.automatedAuthorised,
    lastSuccessAt: null,
    lastCheckedAt: null,
    status: "not_yet_checked",
    httpStatus: null,
    contentHash: null,
    itemsFound: 0,
    error: null,
    note: source.note,
    ...patch,
  };
}

function looksLikeFeed(text: string, contentType: string | null): boolean {
  if (/xml|rss|atom/i.test(contentType ?? "")) return true;
  return /<(rss|feed|item|entry)\b/i.test(text.slice(0, 4000));
}

export function readManual(value: unknown): ManualSubmission[] {
  const list = Array.isArray(value)
    ? value
    : value && typeof value === "object" && Array.isArray((value as { submissions?: unknown }).submissions)
      ? (value as { submissions: unknown[] }).submissions
      : [];
  const submissions: ManualSubmission[] = [];
  for (const row of list) {
    if (!row || typeof row !== "object") continue;
    const record = row as Record<string, unknown>;
    const headline = typeof record.headline === "string" ? record.headline.trim() : "";
    const url = typeof record.url === "string" ? record.url.trim() : "";
    if (headline.length < 8 || !/^https?:\/\//i.test(url)) continue;
    const publishedRaw = typeof record.publishedAt === "string" ? record.publishedAt : null;
    submissions.push({
      headline: headline.slice(0, 300),
      url,
      sourceName: typeof record.sourceName === "string" && record.sourceName.trim() ? record.sourceName.trim().slice(0, 120) : "Manual submission",
      publishedAt: publishedRaw,
      verification: record.verification === "community" ? "community" : "unverified",
      note: typeof record.note === "string" ? record.note.slice(0, 240) : "",
    });
  }
  return submissions;
}

async function toItem(
  parsed: ParsedItem,
  source: WireSourceDef,
  discoveredAt: string,
  origin: WireItem["origin"],
  verification: WireItem["verification"],
): Promise<WireItem> {
  const contentHash = await digest(hashKey(parsed.url, parsed.headline));
  const match = admissionRelevance(`${parsed.headline} ${parsed.summary ?? ""}`, source.relevance);
  const institutional = source.subtype === "university" || source.subtype === "admission-authority";
  const alert = (verification === "official" || verification === "corrected") && (match.strong || institutional);
  return {
    id: contentHash.slice(0, 16),
    headline: parsed.headline,
    summary: parsed.summary,
    sourceId: source.id,
    sourceName: source.name,
    sourceUrl: parsed.url,
    sourceCategory: source.category,
    platform: source.platform,
    verification,
    publishedAt: parsed.publishedAt,
    discoveredAt,
    contentHash,
    importance: alert ? "official-alert" : "normal",
    origin,
  };
}

export async function runWireCycle(input: WireRunInput): Promise<WireLive> {
  const limits = { ...WIRE_LIMITS, ...input.limits };
  const started = input.now;
  const startedIso = started.toISOString();
  const gate = new HostGate();
  const robotsCache = new Map<string, Awaited<ReturnType<typeof loadRobots>>>();
  const log: WireLogLine[] = [];
  const states: WireSourceState[] = [];
  const fresh: WireItem[] = [];
  const previousById = new Map(input.previousSources.map((source) => [source.id, source]));
  let attempted = 0;
  let reached = 0;
  let failed = 0;
  let notAuthorised = 0;
  let manualOnly = 0;

  const noteLine = (level: WireLogLine["level"], sourceId: string | null, message: string) => {
    log.push({ at: new Date().toISOString(), level, sourceId, message });
  };

  async function loadRobots(origin: string): Promise<{ allow: (path: string) => boolean; error: string | null }> {
    const cached = robotsCache.get(origin);
    if (cached) return cached;
    const result = await gate.run(new URL(origin).host, limits.hostGapMs, () => pull(input.fetchImpl, `${origin}/robots.txt`, limits));
    const parsed = result.text && result.httpStatus && result.httpStatus < 400 ? parseRobots(result.text) : null;
    const packed = {
      allow: (path: string) => (parsed ? robotsAllows(parsed, path, WIRE_USER_AGENT) : true),
      error: result.error,
    };
    robotsCache.set(origin, packed);
    return packed;
  }

  for (const source of input.sources) {
    if (!source.automatedAuthorised || source.platform === "facebook" || source.extract === "none") {
      const manual = source.category === "community" || source.accessMethod === "manual-submission";
      const status: WireSourceStatus = manual ? "manual_only" : "not_authorised";
      if (manual) manualOnly += 1;
      else notAuthorised += 1;
      states.push(
        blankSource(source, {
          status,
          error: "Authorised automated access is not configured. This source was not opened.",
        }),
      );
      noteLine("warn", source.id, `${source.name} was not opened. No authorised access method is configured.`);
      continue;
    }

    attempted += 1;
    let page: URL;
    try {
      page = new URL(source.url);
    } catch {
      failed += 1;
      states.push(blankSource(source, { status: "unreachable", lastCheckedAt: startedIso, error: "The registry URL could not be parsed." }));
      noteLine("error", source.id, "Registry URL could not be parsed.");
      continue;
    }

    const robots = await loadRobots(page.origin);
    if (!robots.allow(page.pathname || "/")) {
      failed += 1;
      states.push(
        blankSource(source, {
          status: "blocked",
          lastCheckedAt: startedIso,
          error: "robots.txt disallows this path. The page was not fetched.",
        }),
      );
      noteLine("warn", source.id, "Skipped because robots.txt disallows the path.");
      continue;
    }

    const response = await gate.run(page.host, limits.hostGapMs, () => pull(input.fetchImpl, source.url, limits));
    if (response.error || !response.text || !response.hash) {
      const blocked = response.httpStatus === 401 || response.httpStatus === 403 || response.httpStatus === 429;
      failed += 1;
      states.push(
        blankSource(source, {
          status: blocked ? "blocked" : "unreachable",
          lastCheckedAt: startedIso,
          httpStatus: response.httpStatus,
          error: response.error ?? "No body",
        }),
      );
      noteLine("error", source.id, response.error ?? "Fetch failed.");
      continue;
    }

    const prior = previousById.get(source.id);
    if (prior?.contentHash && prior.contentHash === response.hash && (prior.status === "ok" || prior.status === "no_change" || prior.status === "empty")) {
      reached += 1;
      states.push(
        blankSource(source, {
          status: "no_change",
          lastCheckedAt: startedIso,
          lastSuccessAt: startedIso,
          httpStatus: response.httpStatus,
          contentHash: response.hash,
          itemsFound: prior.itemsFound,
        }),
      );
      noteLine("info", source.id, "No change since the last successful read.");
      continue;
    }

    if (source.extract === "rss" && !looksLikeFeed(response.text, response.contentType)) {
      failed += 1;
      states.push(
        blankSource(source, {
          status: "empty",
          lastCheckedAt: startedIso,
          httpStatus: response.httpStatus,
          contentHash: response.hash,
          error: "The response was not an RSS or Atom feed.",
        }),
      );
      noteLine("error", source.id, "Response was not a feed.");
      continue;
    }

    const parsed =
      source.extract === "rss" ? parseFeed(response.text, response.finalUrl || source.url) : parseHtml(response.text, response.finalUrl || source.url, source.extract);
    const seenHeads = new Set<string>();
    const kept: ParsedItem[] = [];
    for (const item of parsed) {
      const headline = cleanHeadline(item.headline);
      if (!headline) continue;
      const headKey = headline.toLowerCase();
      if (seenHeads.has(headKey)) continue;
      const decision = admissionRelevance(headline, source.relevance);
      if (!decision.keep) continue;
      seenHeads.add(headKey);
      kept.push({ ...item, headline });
      if (kept.length >= limits.maxPerSource) break;
    }
    for (const item of kept) {
      const verification = classifyVerification(source.trust, source.category, item.headline);
      fresh.push(await toItem(item, source, startedIso, "crawled", verification));
    }
    reached += 1;
    const status: WireSourceStatus = kept.length ? "ok" : "ok";
    states.push(
      blankSource(source, {
        status,
        lastCheckedAt: startedIso,
        lastSuccessAt: startedIso,
        httpStatus: response.httpStatus,
        contentHash: response.hash,
        itemsFound: kept.length,
        note: kept.length ? source.note : `${source.note} Reached. No admission-season headline in this response.`,
      }),
    );
    noteLine("info", source.id, kept.length ? `Kept ${kept.length} admission headline${kept.length === 1 ? "" : "s"}.` : "Reached. Nothing admission-related to keep.");
  }

  const manualSource: WireSourceDef = {
    id: "owner-manual",
    name: "Owner manual list",
    category: "community",
    subtype: "manual",
    url: "data/wire/manual.json",
    platform: "web",
    trust: "community",
    accessMethod: "manual-submission",
    extract: "none",
    relevance: "news",
    automatedAuthorised: false,
    note: "Owner-maintained public links. Never treated as official circulars.",
  };
  const manualItems: WireItem[] = [];
  for (const row of input.manual) {
    const publishedAt = row.publishedAt ? parseFeedDate(row.publishedAt) : null;
    manualItems.push(
      await toItem(
        { headline: row.headline, url: row.url, publishedAt, summary: row.note || null },
        { ...manualSource, name: row.sourceName },
        startedIso,
        "manual",
        row.verification,
      ),
    );
  }
  if (input.manual.length) noteLine("info", "owner-manual", `Read ${manualItems.length} owner submission${manualItems.length === 1 ? "" : "s"}.`);

  const sourceById = new Map(input.sources.map((source) => [source.id, source]));
  const crawledPrev = input.previousItems.filter((item) => {
    if (item.origin !== "crawled") return false;
    const source = sourceById.get(item.sourceId);
    if (!source) return false;
    return admissionRelevance(item.headline, source.relevance).keep;
  });
  const byHash = new Map(crawledPrev.map((item) => [item.contentHash, item]));
  let newItems = 0;
  for (const item of fresh) {
    if (byHash.has(item.contentHash)) continue;
    byHash.set(item.contentHash, item);
    newItems += 1;
  }
  const seen = new Set<string>();
  const items = [...byHash.values(), ...manualItems]
    .sort((a, b) => compareItems(a, b))
    .filter((item) => {
      const key = `${item.sourceId}|${item.headline.toLowerCase()}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, limits.maxItems);

  const counts: WireCounts = {
    sources: input.sources.length,
    attempted,
    reached,
    failed,
    notAuthorised,
    manualOnly,
    items: items.length,
    newItems,
  };
  const status = reached === 0 ? "failed" : "completed";
  const completed = new Date();
  const note =
    status === "failed"
      ? "No authorised source was reached. Facebook rows were not opened. Nothing here is a successful scan."
      : `Wire cycle finished. ${newItems} new headline${newItems === 1 ? "" : "s"}. ${failed} source${failed === 1 ? "" : "s"} failed. ${notAuthorised + manualOnly} source${notAuthorised + manualOnly === 1 ? "" : "s"} were not opened because automated access is not authorised. News is not a circular.`;

  return {
    version: 1,
    generatedAt: completed.toISOString(),
    status,
    runner: input.runner,
    intervalMinutes: 55,
    startedAt: startedIso,
    completedAt: completed.toISOString(),
    durationMs: completed.getTime() - started.getTime(),
    nextExpectedAt: new Date(completed.getTime() + 55 * 60_000).toISOString(),
    note,
    counts,
    sources: states,
    items,
    log: log.slice(-limits.maxLog),
  };
}

function compareItems(a: WireItem, b: WireItem): number {
  const aDated = a.publishedAt ? 1 : 0;
  const bDated = b.publishedAt ? 1 : 0;
  if (aDated !== bDated) return bDated - aDated;
  const aTime = Date.parse((aDated ? a.publishedAt : a.discoveredAt) ?? "") || 0;
  const bTime = Date.parse((bDated ? b.publishedAt : b.discoveredAt) ?? "") || 0;
  return bTime - aTime || a.headline.localeCompare(b.headline);
}
