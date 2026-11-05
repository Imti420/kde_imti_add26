export const WIRE_INTERVAL_MINUTES = 55;
export const WIRE_STALE_AFTER_MS = 120 * 60_000;
export const WIRE_RUNNING_TOO_LONG_MS = 30 * 60_000;

export const WIRE_USER_AGENT =
  "ADMISSION26-newswire/1.0 (educational archive; public RSS, Atom and official pages only)";

export type WireCategory = "official" | "community" | "news";

export type WireTrust = "official" | "reported" | "community";

export type WirePlatform = "web" | "facebook";

export type WireAccessMethod = "rss" | "html" | "meta-graph" | "manual-submission";

export type WireExtract = "rss" | "html-links" | "html-headings" | "none";

export type WireRelevance = "news" | "coaching" | "official-page";

export type WireSourceStatus =
  | "not_yet_checked"
  | "ok"
  | "no_change"
  | "empty"
  | "unreachable"
  | "blocked"
  | "not_authorised"
  | "manual_only";

export type WireVerification = "official" | "reported" | "community" | "unverified" | "corrected";

export type WireCycleStatus = "never" | "running" | "completed" | "failed";

export interface WireSourceDef {
  id: string;
  name: string;
  category: WireCategory;
  subtype: string;
  url: string;
  platform: WirePlatform;
  trust: WireTrust;
  accessMethod: WireAccessMethod;
  extract: WireExtract;
  relevance: WireRelevance;
  automatedAuthorised: boolean;
  note: string;
}

export interface WireSourceState {
  id: string;
  name: string;
  category: WireCategory;
  subtype: string;
  url: string;
  platform: WirePlatform;
  trust: WireTrust;
  accessMethod: WireAccessMethod;
  automatedAuthorised: boolean;
  lastSuccessAt: string | null;
  lastCheckedAt: string | null;
  status: WireSourceStatus;
  httpStatus: number | null;
  contentHash: string | null;
  itemsFound: number;
  error: string | null;
  note: string;
}

export interface WireItem {
  id: string;
  headline: string;
  summary: string | null;
  sourceId: string;
  sourceName: string;
  sourceUrl: string;
  sourceCategory: WireCategory;
  platform: WirePlatform;
  verification: WireVerification;
  publishedAt: string | null;
  discoveredAt: string;
  contentHash: string;
  importance: "normal" | "official-alert";
  origin: "crawled" | "manual";
}

export interface WireLogLine {
  at: string;
  level: "info" | "warn" | "error";
  sourceId: string | null;
  message: string;
}

export interface WireCounts {
  sources: number;
  attempted: number;
  reached: number;
  failed: number;
  notAuthorised: number;
  manualOnly: number;
  items: number;
  newItems: number;
}

export interface WireLive {
  version: 1;
  generatedAt: string | null;
  status: WireCycleStatus;
  runner: "github-actions" | "manual-script" | "test";
  intervalMinutes: number;
  startedAt: string | null;
  completedAt: string | null;
  durationMs: number | null;
  nextExpectedAt: string | null;
  note: string;
  counts: WireCounts;
  sources: WireSourceState[];
  items: WireItem[];
  log: WireLogLine[];
}

export interface WireStateFile {
  version: 1;
  intervalMinutes: number;
  lastStartedAt: string | null;
  lastCompletedAt: string | null;
  lastStatus: WireCycleStatus;
  note: string;
}

export interface ManualSubmission {
  headline: string;
  url: string;
  sourceName: string;
  publishedAt: string | null;
  verification: "community" | "unverified";
  note: string;
}

export interface WireLimits {
  hostGapMs: number;
  timeoutMs: number;
  maxBytes: number;
  maxPerSource: number;
  maxItems: number;
  maxLog: number;
}

export const WIRE_LIMITS: WireLimits = {
  hostGapMs: 1200,
  timeoutMs: 12000,
  maxBytes: 1_500_000,
  maxPerSource: 12,
  maxItems: 180,
  maxLog: 80,
};
