export const INTERVAL_MINUTES = 45;
export const STALE_AFTER_MS = 90 * 60_000;
export const RUNNING_TOO_LONG_MS = 30 * 60_000;

export type InstitutionKind = "university" | "system";

export type SourceType = "homepage" | "discovered-page" | "discovered-document" | "feed" | "sitemap";

export type SourceOrigin = "seed" | "discovered";

export type Reachability =
  | "not_yet_checked"
  | "success"
  | "no_change"
  | "new_document"
  | "unreachable"
  | "retry_scheduled"
  | "source_broken"
  | "skipped_robots"
  | "no_official_url";

export type CycleStatus = "never" | "running" | "completed" | "skipped";

export interface SeedInstitution {
  id: string;
  kind: InstitutionKind;
  name: string;
  shortName: string;
  website: string | null;
}

export interface SourceRecord {
  id: string;
  universityId: string;
  universityName: string;
  shortName: string;
  kind: InstitutionKind;
  sourceName: string;
  url: string | null;
  type: SourceType;
  reliability: "official" | "official-linked";
  extraction: "html-links" | "not-fetched" | "feed" | "sitemap";
  origin: SourceOrigin;
  lastSuccessAt: string | null;
  lastFailureAt: string | null;
  lastCheckedAt: string | null;
  lastDiscoveredDocument: string | null;
  documentsFound: number;
  reachability: Reachability;
  httpStatus: number | null;
  etag: string | null;
  lastModified: string | null;
  contentHash: string | null;
  error: string | null;
  note: string;
  /** How many checks in a row came back unchanged. Missing on older rows means 0. */
  unchangedStreak?: number;
  /** When a post-baseline document link was last recorded. */
  lastNewDocumentAt?: string | null;
}

export interface DiscoveryRecord {
  id: string;
  url: string;
  universityId: string;
  shortName: string;
  foundOn: string;
  foundAt: string;
  title: string;
  kind: "pdf" | "page" | "feed" | "sitemap";
  score: number;
  sameSite: boolean;
  downloaded: false;
  /** First observation of a host is a baseline, not a "new" announcement. */
  disposition?: "baseline" | "new";
}

export interface CrawlEvent {
  at: string;
  level: "info" | "warn" | "error";
  type:
    | "cycle_start"
    | "cycle_end"
    | "connect"
    | "fetched"
    | "no_change"
    | "discover"
    | "skip"
    | "fail"
    | "cap";
  universityId: string | null;
  sourceId: string | null;
  url: string | null;
  message: string;
}

export interface CrawlCounts {
  universities: number;
  systems: number;
  sources: number;
  checked: number;
  reached: number;
  unchanged: number;
  failed: number;
  skipped: number;
  notChecked: number;
  newDocuments: number;
  newPages: number;
}

export interface CrawlState {
  version: 1;
  intervalMinutes: number;
  lastStartedAt: string | null;
  lastCompletedAt: string | null;
  lastStatus: CycleStatus | "failed";
  cycleId: string | null;
  cursor: number;
  note: string;
}

export interface LiveFile {
  version: 1;
  generatedAt: string | null;
  status: CycleStatus | "failed";
  runner: "github-actions" | "manual-script" | "test";
  intervalMinutes: number;
  cycleId: string | null;
  startedAt: string | null;
  completedAt: string | null;
  durationMs: number | null;
  note: string;
  counts: CrawlCounts;
  events: CrawlEvent[];
  sources: SourceRecord[];
  discoveries: DiscoveryRecord[];
}

export interface RobotsCacheEntry {
  origin: string;
  fetchedAt: string;
  body: string | null;
}

export interface OpsBundle {
  state: CrawlState;
  registry: SourceRecord[];
  discoveries: DiscoveryRecord[];
  events: CrawlEvent[];
  live: LiveFile;
  /** Compact hashes of every document id ever seen. Not trimmed with discoveries. */
  seen: string[];
  robots: RobotsCacheEntry[];
}

export interface CrawlLimits {
  hostGapMs: number;
  timeoutMs: number;
  maxBytes: number;
  retries: number;
  retryBaseMs: number;
  maxExtraPages: number;
  maxFetches: number;
  concurrency: number;
  maxDiscoveries: number;
  maxEvents: number;
}

export const PRODUCTION_LIMITS: CrawlLimits = {
  hostGapMs: 900,
  // Bangladesh university origins are often slow from GitHub runners.
  timeoutMs: 10_000,
  maxBytes: 1_500_000,
  retries: 2,
  retryBaseMs: 600,
  maxExtraPages: 2,
  maxFetches: 500,
  concurrency: 4,
  maxDiscoveries: 2000,
  maxEvents: 400,
};

// Browser-shaped UA reduces blanket 403s on campus CDNs that block bot tokens.
// Purpose is still declared via a custom header in the fetch layer.
export const USER_AGENT =
  "Mozilla/5.0 (compatible; ADMISSION26-discovery/1.1; +https://github.com/Imti420/kde_imti_add26) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

export const NO_DATE_NOTE =
  "Discovery only. No admission date was extracted or published by this cycle.";
