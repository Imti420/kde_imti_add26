import { WIRE_RUNNING_TOO_LONG_MS, WIRE_STALE_AFTER_MS, type WireLive } from "./types.ts";

export type WireDeskStatus = "never" | "running" | "current" | "late" | "stale" | "failed" | "degraded";

export function isWireLive(value: unknown): value is WireLive {
  if (!value || typeof value !== "object") return false;
  const record = value as Partial<WireLive>;
  return record.version === 1 && typeof record.status === "string" && Array.isArray(record.items) && Array.isArray(record.sources);
}

export function wireDeskStatus(live: WireLive | null, now: Date): WireDeskStatus {
  if (!live || live.status === "never" || live.generatedAt == null) return "never";
  if (live.status === "running") {
    const started = Date.parse(live.startedAt ?? "");
    if (!Number.isFinite(started) || now.getTime() - started > WIRE_RUNNING_TOO_LONG_MS) return "failed";
    return "running";
  }
  if (live.status === "failed") return "failed";
  const done = Date.parse(live.completedAt ?? live.generatedAt ?? "");
  if (!Number.isFinite(done) || now.getTime() - done > WIRE_STALE_AFTER_MS) return "stale";
  const next = live.nextExpectedAt ? Date.parse(live.nextExpectedAt) : done + live.intervalMinutes * 60_000;
  if (Number.isFinite(next) && now.getTime() > next) return "late";
  if (live.counts.failed > 0) return "degraded";
  return "current";
}

export function nextWireAt(live: WireLive | null): Date | null {
  if (!live) return null;
  if (live.nextExpectedAt) {
    const parsed = Date.parse(live.nextExpectedAt);
    if (Number.isFinite(parsed)) return new Date(parsed);
  }
  const done = Date.parse(live.completedAt ?? "");
  if (!Number.isFinite(done)) return null;
  return new Date(done + (live.intervalMinutes || 55) * 60_000);
}
