import assert from "node:assert/strict";
import { runDiscovery } from "../src/lib/crawl/cycle.ts";

const insts = Array.from({ length: 5 }, (_, i) => ({
  id: `u${i}`,
  kind: "university" as const,
  name: `U${i}`,
  shortName: `U${i}`,
  website: `https://www.u${i}.ac.bd`,
}));

let fetches = 0;
const mk = (n: number) =>
  (async (url: string | URL | Request) => {
    fetches += 1;
    const u = new URL(String(url));
    if (u.pathname === "/robots.txt") return new Response("User-agent: *\nAllow: /\n", { status: 200, headers: { "content-type": "text/plain" } });
    if (u.pathname === "/") {
      const pdfs = Array.from({ length: n }, (_, k) => `<a href="/a/${k}.pdf">admission circular ${k}</a>`).join("");
      return new Response(`<a href="/admissions">Undergraduate admission</a><a href="/notice-board">Notice board</a>${pdfs}`, {
        status: 200,
        headers: { "content-type": "text/html" },
      });
    }
    return new Response(`<a href="/y${u.pathname.replace(/\W/g, "")}.pdf">admission notice</a>`, {
      status: 200,
      headers: { "content-type": "text/html" },
    });
  }) as typeof fetch;

const lim = { hostGapMs: 0, retries: 0, maxFetches: 5000, concurrency: 8, maxExtraPages: 2 };

fetches = 0;
const c1 = await runDiscovery({
  institutions: insts,
  previousRegistry: [],
  previousDiscoveries: [],
  previousState: null,
  now: new Date("2026-11-04T16:00:00.000Z"),
  force: true,
  runner: "test",
  fetchImpl: mk(5),
  limits: lim,
  clock: () => new Date("2026-11-04T16:00:00.000Z"),
});
const f1 = fetches;
fetches = 0;
const c2 = await runDiscovery({
  institutions: insts,
  previousRegistry: c1.bundle!.registry,
  previousDiscoveries: c1.bundle!.discoveries,
  previousSeen: c1.bundle!.seen,
  previousRobots: c1.bundle!.robots,
  previousState: c1.bundle!.state,
  now: new Date("2026-11-04T16:05:00.000Z"),
  force: true,
  runner: "test",
  fetchImpl: mk(5),
  limits: lim,
  clock: () => new Date("2026-11-04T16:05:00.000Z"),
});
console.log(
  "A) identical site: cycle1 fetches",
  f1,
  "| cycle2 fetches",
  fetches,
  "| homepages flagged no_change:",
  c2.bundle!.registry.filter((s) => s.type === "homepage" && (s.reachability === "no_change" || s.reachability === "success")).length,
  "of 5",
);
assert.ok(fetches < f1, "unchanged second cycle must do less work");
assert.equal(fetches, 0);

const lim2 = { ...lim, maxDiscoveries: 100, maxEvents: 500 };
const one = insts.slice(0, 1);
const d1 = await runDiscovery({
  institutions: one,
  previousRegistry: [],
  previousDiscoveries: [],
  previousState: null,
  now: new Date("2026-11-04T16:00:00.000Z"),
  force: true,
  runner: "test",
  fetchImpl: mk(150),
  limits: lim2,
  clock: () => new Date("2026-11-04T16:00:00.000Z"),
});
const d2 = await runDiscovery({
  institutions: one,
  previousRegistry: d1.bundle!.registry,
  previousDiscoveries: d1.bundle!.discoveries,
  previousSeen: d1.bundle!.seen,
  previousRobots: d1.bundle!.robots,
  previousState: d1.bundle!.state,
  now: new Date("2026-11-04T18:00:00.000Z"),
  force: true,
  runner: "test",
  fetchImpl: mk(150),
  limits: lim2,
  clock: () => new Date("2026-11-04T18:00:00.000Z"),
});
const d3 = await runDiscovery({
  institutions: one,
  previousRegistry: d2.bundle!.registry,
  previousDiscoveries: d2.bundle!.discoveries,
  previousSeen: d2.bundle!.seen,
  previousRobots: d2.bundle!.robots,
  previousState: d2.bundle!.state,
  now: new Date("2026-11-04T20:00:00.000Z"),
  force: true,
  runner: "test",
  fetchImpl: mk(150),
  limits: lim2,
  clock: () => new Date("2026-11-04T20:00:00.000Z"),
});
console.log(
  "B) same 150 links every cycle, history cap 100 -> 'new document' events per cycle:",
  d1.bundle!.live.counts.newDocuments,
  d2.bundle!.live.counts.newDocuments,
  d3.bundle!.live.counts.newDocuments,
);
assert.equal(d1.bundle!.seen.length >= 150, true);
assert.equal(d2.bundle!.live.counts.newDocuments, 0);
assert.equal(d3.bundle!.live.counts.newDocuments, 0);
console.log("bench-bugs ok");
