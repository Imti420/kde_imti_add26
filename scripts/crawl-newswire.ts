import { mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { shouldStartCycle } from "../src/lib/crawl/gate.ts";
import { readManual, runWireCycle } from "../src/lib/wire/cycle.ts";
import { WIRE_SOURCES } from "../src/lib/wire/registry.ts";
import { WIRE_INTERVAL_MINUTES, type WireItem, type WireLive, type WireSourceState, type WireStateFile } from "../src/lib/wire/types.ts";

const root = resolve(import.meta.dirname, "..");
const force = process.argv.includes("--force");
const runner = process.env.GITHUB_ACTIONS === "true" ? "github-actions" : "manual-script";

function readJson<T>(path: string, fallback: T): T {
  try {
    return JSON.parse(readFileSync(path, "utf8")) as T;
  } catch {
    return fallback;
  }
}

function writeJson(path: string, value: unknown) {
  mkdirSync(dirname(path), { recursive: true });
  const temporary = `${path}.tmp`;
  writeFileSync(temporary, `${JSON.stringify(value, null, 2)}\n`);
  renameSync(temporary, path);
}

const statePath = resolve(root, "data/wire/state.json");
const itemsPath = resolve(root, "data/wire/items.json");
const registryPath = resolve(root, "data/wire/registry.json");
const manualPath = resolve(root, "data/wire/manual.json");
const livePath = resolve(root, "public/wire/live.json");

const previous = readJson<WireStateFile>(statePath, {
  version: 1,
  intervalMinutes: WIRE_INTERVAL_MINUTES,
  lastStartedAt: null,
  lastCompletedAt: null,
  lastStatus: "never",
  note: "No newswire cycle has run.",
});

const now = new Date();
if (!force && !shouldStartCycle(previous.lastCompletedAt, now, previous.intervalMinutes || WIRE_INTERVAL_MINUTES, previous.lastStatus)) {
  console.log(
    JSON.stringify({
      skipped: true,
      reason: "Last completed newswire cycle is still inside the 55-minute window. No sources were opened.",
      lastCompletedAt: previous.lastCompletedAt,
    }),
  );
  process.exit(0);
}

const previousItems = readJson<WireItem[]>(itemsPath, []);
const previousSources = readJson<WireSourceState[]>(registryPath, []);
const manual = readManual(readJson<unknown>(manualPath, { version: 1, submissions: [] }));

writeJson(statePath, {
  ...previous,
  lastStatus: "running",
  lastStartedAt: now.toISOString(),
  note: "Newswire cycle is in progress. A crash here is not a successful read.",
});

try {
  const live = await runWireCycle({
    sources: WIRE_SOURCES,
    manual,
    previousItems,
    previousSources,
    now,
    runner,
    fetchImpl: fetch,
  });
  const state: WireStateFile = {
    version: 1,
    intervalMinutes: WIRE_INTERVAL_MINUTES,
    lastStartedAt: live.startedAt,
    lastCompletedAt: live.completedAt,
    lastStatus: live.status,
    note: live.note,
  };
  writeJson(statePath, state);
  writeJson(itemsPath, live.items);
  writeJson(registryPath, live.sources);
  writeJson(livePath, live satisfies WireLive);
  console.log(
    JSON.stringify({
      skipped: false,
      status: live.status,
      items: live.counts.items,
      newItems: live.counts.newItems,
      reached: live.counts.reached,
      failed: live.counts.failed,
      notAuthorised: live.counts.notAuthorised,
      manualOnly: live.counts.manualOnly,
    }),
  );
} catch (error) {
  const message = error instanceof Error ? error.message : "Newswire cycle crashed.";
  writeJson(statePath, {
    ...previous,
    lastStatus: "failed",
    lastStartedAt: now.toISOString(),
    note: message,
  });
  console.error(message);
  process.exit(1);
}
