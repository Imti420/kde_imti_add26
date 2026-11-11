import { RUNNING_TOO_LONG_MS, STALE_AFTER_MS, type LiveFile } from "./types.ts";

export function shouldStartCycle(
  lastCompletedAt: string | null,
  now: Date,
  intervalMinutes: number,
  lastStatus?: string | null,
): boolean {
  if (lastStatus === "running") return true;
  if (!lastCompletedAt) return true;
  const then = Date.parse(lastCompletedAt);
  if (Number.isNaN(then)) return true;
  return now.getTime() - then >= intervalMinutes * 60_000;
}


/** If a prior runner died mid-cycle (SIGKILL / job timeout), state can sit on `running` forever.
 *  Treat that as failed after RUNNING_TOO_LONG_MS so the next scheduled pass can start cleanly
 *  without requiring --force. Does not invent a successful completion. */
export function healStuckRunningState<T extends { lastStatus?: string | null; lastStartedAt?: string | null; note?: string | null }>(
  state: T,
  now: Date,
  limitMs: number = RUNNING_TOO_LONG_MS,
): T {
  if (state.lastStatus !== "running") return state;
  const started = Date.parse(state.lastStartedAt ?? "");
  if (!Number.isFinite(started)) {
    return {
      ...state,
      lastStatus: "failed",
      note: "Prior cycle left status=running with no start time. Marked failed — not a successful scan.",
    };
  }
  if (now.getTime() - started <= limitMs) return state;
  return {
    ...state,
    lastStatus: "failed",
    note: `Prior cycle was still marked running after ${Math.round(limitMs / 60000)} minutes (likely killed before finish). Marked failed — not a successful scan.`,
  };
}

export type SystemStatus = "never" | "active" | "idle" | "degraded" | "failed" | "stale";

export function systemStatus(live: LiveFile | null, now: Date): SystemStatus {
  if (!live || live.status === "never" || live.generatedAt == null) return "never";
  if (live.status === "running") {
    const started = Date.parse(live.startedAt ?? "");
    if (!Number.isFinite(started) || now.getTime() - started > RUNNING_TOO_LONG_MS) return "failed";
    return "active";
  }
  if (live.status === "failed" && live.counts.reached === 0 && live.counts.checked === 0) return "failed";
  const done = Date.parse(live.completedAt ?? live.generatedAt ?? "");
  if (!Number.isFinite(done) || now.getTime() - done > STALE_AFTER_MS) return "stale";
  if (live.counts.checked > 0 && live.counts.reached === 0 && live.counts.failed > 0) return "failed";
  if (live.counts.failed > 0) return "degraded";
  return "idle";
}

export function isLiveFile(value: unknown): value is LiveFile {
  if (!value || typeof value !== "object") return false;
  const record = value as Partial<LiveFile>;
  return record.version === 1 && typeof record.status === "string" && Array.isArray(record.events) && Array.isArray(record.sources);
}
