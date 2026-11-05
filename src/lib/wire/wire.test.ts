import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { shouldStartCycle } from "../crawl/gate.ts";
import { readManual, runWireCycle } from "./cycle.ts";
import { isWireLive, wireDeskStatus } from "./gate.ts";
import { parseFeed } from "./parse.ts";
import { admissionRelevance, classifyVerification } from "./relevance.ts";
import { parseFeedDate } from "./text.ts";
import { WIRE_INTERVAL_MINUTES, type WireLive, type WireSourceDef } from "./types.ts";

const rss = `<?xml version="1.0"?><rss version="2.0"><channel>
<item>
  <title><a href="/news/hsc-retake">HSC retake form fill-up begins tomorrow</a></title>
  <link>https://www.thedailystar.net/news/hsc-retake</link>
  <pubDate>Wed, 04 Nov 26 15:32:59 +0600</pubDate>
  <description>Eligible candidates who failed up to two subjects can apply online until November 9</description>
</item>
<item>
  <title>Office tender for stationery</title>
  <link>https://www.example.edu/tender</link>
  <description>Procurement notice</description>
</item>
<item>
  <title>Noakhali Textile Engineering College: Teacher shortage, poor facilities disrupt classes</title>
  <link>https://www.thedailystar.net/news/classes</link>
</item>
<item>
  <title></title>
  <link>https://www.thedailystar.net/news/blank</link>
</item>
</channel></rss>`;

const star: WireSourceDef = {
  id: "daily-star-education",
  name: "The Daily Star — Education",
  category: "news",
  subtype: "education-news",
  url: "https://news.example/rss.xml",
  platform: "web",
  trust: "reported",
  accessMethod: "rss",
  extract: "rss",
  relevance: "news",
  automatedAuthorised: true,
  note: "test",
};

const facebook: WireSourceDef = {
  id: "fb-udvash",
  name: "Udvash — Facebook Page",
  category: "official",
  subtype: "facebook-page",
  url: "https://www.facebook.com/udvash",
  platform: "facebook",
  trust: "official",
  accessMethod: "meta-graph",
  extract: "none",
  relevance: "coaching",
  automatedAuthorised: false,
  note: "not opened",
};

function mockFetch(calls: string[]): typeof fetch {
  return (async (input: RequestInfo | URL) => {
    const url = String(input);
    calls.push(url);
    if (url.includes("facebook.com")) {
      throw new Error("Facebook must not be fetched");
    }
    if (url.endsWith("/robots.txt")) {
      return new Response("User-agent: *\nAllow: /\n", { status: 404, headers: { "content-type": "text/plain" } });
    }
    if (url.endsWith("/rss.xml")) {
      return new Response(rss, { status: 200, headers: { "content-type": "application/rss+xml" } });
    }
    return new Response("no", { status: 403, headers: { "content-type": "text/html" } });
  }) as typeof fetch;
}

describe("newswire", () => {
  it("parses a two-digit RSS date and does not invent one", () => {
    assert.equal(parseFeedDate("Wed, 04 Nov 26 15:32:59 +0600"), "2026-11-04T09:32:59.000Z");
    assert.equal(parseFeedDate(""), null);
    assert.equal(parseFeedDate("not a date"), null);
    const items = parseFeed(rss, "https://www.thedailystar.net/");
    assert.equal(items[0]?.headline, "HSC retake form fill-up begins tomorrow");
    assert.equal(items[0]?.publishedAt, "2026-11-04T09:32:59.000Z");
    assert.equal(items[3], undefined);
  });

  it("keeps admission headlines and drops tenders, scholarships and school noise", () => {
    assert.equal(admissionRelevance("HSC retake form fill-up begins tomorrow", "news").keep, true);
    assert.equal(admissionRelevance("Admission schedule: Medical colleges mull relief", "news").keep, true);
    assert.equal(admissionRelevance("Office tender for stationery admission building", "news").keep, false);
    assert.equal(admissionRelevance("ইউজিসি পিএইচডি স্কলারশিপ আবেদন", "official-page").keep, false);
    assert.equal(admissionRelevance("গ্রামার চ্যাম্প HSC", "coaching").keep, false);
    assert.equal(admissionRelevance("মেডিকেল মডেল টেস্ট প্যাকেজ ২০২৬", "coaching").keep, true);
    assert.equal(admissionRelevance("Academic to Admission", "coaching").keep, false);
    assert.equal(admissionRelevance("UG Admission", "official-page").keep, false);
    assert.equal(admissionRelevance("PG Admission", "official-page").keep, false);
    assert.equal(admissionRelevance("HSC results: Dhaka top among education boards", "news").keep, false);
    assert.equal(admissionRelevance("HSC result re-scrutiny begins, candidates can apply until 7 Nov", "news").keep, true);
    assert.equal(admissionRelevance("DU retains top spot in QS rankings", "news").keep, false);
  });

  it("never promotes a community item or a news report to official", () => {
    assert.equal(classifyVerification("community", "community", "DU admission date changed tomorrow"), "community");
    assert.equal(classifyVerification("reported", "news", "University issues admission correction"), "reported");
    assert.equal(classifyVerification("official", "official", "Admission corrigendum"), "corrected");
    assert.equal(classifyVerification("official", "official", "Undergraduate admission circular"), "official");
  });

  it("clamps a manual official claim to unverified", () => {
    const rows = readManual({
      submissions: [
        { headline: "Rumour: exam postponed", url: "https://example.com/post", verification: "official", sourceName: "Group" },
        { headline: "no", url: "notaurl" },
      ],
    });
    assert.equal(rows.length, 1);
    assert.equal(rows[0]?.verification, "unverified");
  });

  it("does not open Facebook and does not keep irrelevant feed items", async () => {
    const calls: string[] = [];
    const live = await runWireCycle({
      sources: [star, facebook],
      manual: [{ headline: "Students say the admit card date moved", url: "https://example.com/group/1", sourceName: "Desk", publishedAt: null, verification: "community", note: "" }],
      previousItems: [],
      previousSources: [],
      now: new Date("2026-11-05T00:00:00.000Z"),
      runner: "test",
      fetchImpl: mockFetch(calls),
      limits: { hostGapMs: 0, timeoutMs: 1000 },
    });
    assert.equal(isWireLive(live), true);
    assert.equal(calls.some((url) => url.includes("facebook.com")), false);
    const fb = live.sources.find((source) => source.id === "fb-udvash");
    assert.equal(fb?.status, "not_authorised");
    assert.equal(fb?.lastSuccessAt, null);
    assert.equal(fb?.lastCheckedAt, null);
    assert.equal(live.items.some((item) => /tender/i.test(item.headline)), false);
    assert.equal(live.items.some((item) => /teacher shortage/i.test(item.headline)), false);
    const story = live.items.find((item) => item.headline.startsWith("HSC retake"));
    assert.ok(story);
    assert.equal(story?.verification, "reported");
    assert.equal(story?.publishedAt, "2026-11-04T09:32:59.000Z");
    const community = live.items.find((item) => item.origin === "manual");
    assert.equal(community?.verification, "community");
    assert.notEqual(community?.verification, "official");

    const again = await runWireCycle({
      sources: [star, facebook],
      manual: [],
      previousItems: live.items,
      previousSources: live.sources,
      now: new Date("2026-11-05T01:00:00.000Z"),
      runner: "test",
      fetchImpl: mockFetch([]),
      limits: { hostGapMs: 0, timeoutMs: 1000 },
    });
    assert.equal(again.counts.newItems, 0);
    assert.equal(again.sources.find((source) => source.id === "daily-star-education")?.status, "no_change");
  });

  it("waits 55 minutes and marks a late runner without pretending it is current", () => {
    const completed = "2026-11-05T00:00:00.000Z";
    assert.equal(shouldStartCycle(completed, new Date("2026-11-05T00:54:00.000Z"), WIRE_INTERVAL_MINUTES, "completed"), false);
    assert.equal(shouldStartCycle(completed, new Date("2026-11-05T00:55:00.000Z"), WIRE_INTERVAL_MINUTES, "completed"), true);
    const live = {
      version: 1,
      generatedAt: completed,
      status: "completed",
      intervalMinutes: 55,
      startedAt: completed,
      completedAt: completed,
      nextExpectedAt: "2026-11-05T00:55:00.000Z",
      counts: { failed: 0 },
      items: [],
      sources: [],
    } as unknown as WireLive;
    assert.equal(wireDeskStatus(live, new Date("2026-11-05T00:20:00.000Z")), "current");
    assert.equal(wireDeskStatus(live, new Date("2026-11-05T01:10:00.000Z")), "late");
    assert.equal(wireDeskStatus(live, new Date("2026-11-05T03:00:00.000Z")), "stale");
    assert.equal(wireDeskStatus({ ...live, status: "failed" }, new Date("2026-11-05T00:10:00.000Z")), "failed");
  });
});
