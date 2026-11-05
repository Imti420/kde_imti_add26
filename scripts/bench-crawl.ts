import { runDiscovery } from "../src/lib/crawl/cycle.ts";
import type { SeedInstitution } from "../src/lib/crawl/types.ts";

const scale = Number(process.env.SCALE ?? 10);
const latency = 300 / scale;
const gap = 1500 / scale;
const count = 87;
const concurrency = Number(process.env.CONC ?? 4);
const cap = Number(process.env.CAP ?? 500);

const institutions: SeedInstitution[] = Array.from({ length: count }, (_, i) => ({
  id: `u${i}`,
  kind: "university",
  name: `Univ ${i}`,
  shortName: `U${i}`,
  website: `https://www.u${i}.ac.bd`,
}));

let fetches = 0;
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const html = (body: string) => new Response(body, { status: 200, headers: { "content-type": "text/html" } });
const fetchImpl = (async (url: string | URL | Request) => {
  fetches += 1;
  await sleep(latency);
  const u = new URL(String(url));
  if (u.pathname === "/robots.txt") return new Response("User-agent: *\nAllow: /\n", { status: 200, headers: { "content-type": "text/plain" } });
  if (u.pathname === "/feed.xml") {
    return new Response(`<rss><channel><item><title>admission circular</title><link>${u.origin}/f/1.pdf</link></item></channel></rss>`, {
      status: 200,
      headers: { "content-type": "application/xml" },
    });
  }
  if (u.pathname === "/") {
    return html(`<html><head><link rel="alternate" type="application/rss+xml" href="/feed.xml"></head><body>
    <a href="/admissions">Undergraduate admission</a><a href="/notice-board">Notice board</a>
    <a href="/a/1.pdf">admission circular 2026</a><a href="/a/2.pdf">ভর্তি বিজ্ঞপ্তি</a></body></html>`);
  }
  return html(`<a href="${u.origin}/x/${u.pathname.replace(/\W/g, "")}.pdf">admission notice</a>`);
}) as typeof fetch;

const started = Date.now();
const result = await runDiscovery({
  institutions,
  previousRegistry: [],
  previousDiscoveries: [],
  previousState: null,
  now: new Date(),
  force: true,
  runner: "test",
  fetchImpl,
  limits: { hostGapMs: gap, timeoutMs: 5000, maxFetches: cap, concurrency, retries: 0 },
});
const ms = Date.now() - started;
const counts = result.bundle!.live.counts;
const checked = new Set(
  result.bundle!.registry.filter((source) => source.reachability !== "not_yet_checked").map((source) => source.universityId),
).size;
console.log(
  JSON.stringify({
    concurrency,
    cap,
    simulatedSeconds: +((ms * scale) / 1000).toFixed(1),
    fetches,
    institutionsChecked: checked,
    cursorAfter: result.bundle!.state.cursor,
    sourcesChecked: counts.checked,
    notChecked: counts.notChecked,
    newDocs: counts.newDocuments,
  }),
);
