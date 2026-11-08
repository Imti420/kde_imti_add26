import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ExternalLink, PageHead } from "@/components/marks";
import { CountUp } from "@/components/motion";
import { RankBars } from "@/components/viz";
import { fetchPublishedLog } from "@/lib/crawl/published";
import { isLiveFile, systemStatus, type SystemStatus } from "@/lib/crawl/gate";
import type { CrawlEvent, LiveFile, Reachability, SourceRecord } from "@/lib/crawl/types";
import { cn } from "@/lib/cn";

export const Route = createFileRoute("/discovery")({
  head: () => ({ meta: [{ title: "Discovery log — ADMISSION//26" }] }),
  component: DiscoveryPage,
});

const REACH_LABEL: Record<Reachability, string> = {
  not_yet_checked: "NOT YET CHECKED",
  success: "SUCCESS",
  no_change: "NO CHANGE",
  new_document: "NEW DOCUMENT",
  unreachable: "SOURCE UNREACHABLE",
  retry_scheduled: "RETRY SCHEDULED",
  source_broken: "SOURCE BROKEN",
  skipped_robots: "SKIPPED",
  no_official_url: "NO OFFICIAL URL",
};

const SYSTEM_LABEL: Record<SystemStatus, string> = {
  never: "NOT STARTED",
  active: "ACTIVE",
  idle: "IDLE",
  degraded: "DEGRADED",
  failed: "FAILED",
  stale: "STALE",
};

const EVENT_STAMP: Record<CrawlEvent["type"], string> = {
  cycle_start: "START",
  cycle_end: "END",
  connect: "OPEN",
  fetched: "GET",
  no_change: "SAME",
  discover: "DOC",
  skip: "SKIP",
  fail: "FAIL",
  cap: "CAP",
};

type EventFilter = "all" | "discover" | "fetched" | "same" | "fail" | "skip";

function relativePast(iso: string | null, now: Date): string {
  if (!iso) return "NEVER";
  const then = Date.parse(iso);
  if (Number.isNaN(then)) return "UNKNOWN";
  const minutes = Math.floor(Math.max(0, now.getTime() - then) / 60_000);
  if (minutes < 1) return "JUST NOW";
  if (minutes < 60) return `${minutes} MINUTE${minutes === 1 ? "" : "S"} AGO`;
  const hours = Math.floor(minutes / 60);
  if (hours < 48) return `${hours} HOUR${hours === 1 ? "" : "S"} AGO`;
  const days = Math.floor(hours / 24);
  return `${days} DAY${days === 1 ? "" : "S"} AGO`;
}

async function pull(url: string): Promise<LiveFile | null> {
  try {
    const response = await fetch(`${url}${url.includes("?") ? "&" : "?"}t=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) return null;
    const json: unknown = await response.json();
    return isLiveFile(json) ? json : null;
  } catch {
    return null;
  }
}

function newer(left: LiveFile | null, right: LiveFile | null): LiveFile | null {
  if (!left) return right;
  if (!right) return left;
  const a = Date.parse(left.generatedAt ?? "") || 0;
  const b = Date.parse(right.generatedAt ?? "") || 0;
  return b > a ? right : left;
}

function eventMatches(event: CrawlEvent, filter: EventFilter): boolean {
  if (filter === "all") return true;
  if (filter === "discover") return event.type === "discover";
  if (filter === "fetched") return event.type === "fetched" || event.type === "connect";
  if (filter === "same") return event.type === "no_change";
  if (filter === "fail") return event.type === "fail" || event.level === "error";
  return event.type === "skip" || event.type === "cap";
}

function eventClass(event: CrawlEvent): string {
  if (event.type === "discover") return "border-l-4 border-l-accent";
  if (event.type === "fail" || event.level === "error") return "border-l-4 border-l-accent bg-panel";
  if (event.type === "skip" || event.type === "cap" || event.type === "no_change") return "border-l-4 border-l-mute";
  if (event.type === "cycle_start" || event.type === "cycle_end") return "bg-ink text-paper";
  return "border-l-4 border-l-ink";
}

function reachClass(reach: Reachability): string {
  if (reach === "new_document") return "border-l-4 border-l-accent bg-panel";
  if (reach === "unreachable" || reach === "retry_scheduled" || reach === "source_broken") return "border-l-4 border-l-accent";
  if (reach === "success" || reach === "no_change") return "border-l-4 border-l-ink";
  return "border-l-4 border-l-mute";
}

function DiscoveryPage() {
  const [live, setLive] = useState<LiveFile | null>(null);
  const [phase, setPhase] = useState<"loading" | "ready" | "missing">("loading");
  const [now, setNow] = useState(() => new Date());
  const [seenAt, setSeenAt] = useState<Date | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "failed" | "reached" | "new" | "unchecked">("all");
  const [eventFilter, setEventFilter] = useState<EventFilter>("all");

  useEffect(() => {
    let stop = false;
    const load = async (isPoll = false) => {
      if (isPoll) setRefreshing(true);
      const local = await pull("/ops/live.json");
      if (stop) return;
      if (local) {
        setLive((current) => newer(current, local));
        setPhase("ready");
        setSeenAt(new Date());
      }
      let remote: LiveFile | null = null;
      try {
        remote = await fetchPublishedLog();
      } catch {
        remote = null;
      }
      if (stop) return;
      const next = newer(local, remote);
      if (next) {
        setLive((current) => newer(current, next));
        setPhase("ready");
      } else if (!local) {
        setPhase("missing");
      }
      setSeenAt(new Date());
      if (isPoll) {
        // brief hold so the scan bar is visible
        window.setTimeout(() => {
          if (!stop) setRefreshing(false);
        }, 650);
      }
    };
    void load(false);
    // Poll more often so the log visibly updates when a cycle finishes
    const poll = window.setInterval(() => void load(true), 20_000);
    const clock = window.setInterval(() => setNow(new Date()), 15_000);
    return () => {
      stop = true;
      window.clearInterval(poll);
      window.clearInterval(clock);
    };
  }, []);

  const status = systemStatus(phase === "ready" ? live : null, now);
  const sources = useMemo(() => {
    const rows = live?.sources ?? [];
    const q = query.trim().toLowerCase();
    return rows.filter((source) => {
      if (filter === "failed" && !["unreachable", "retry_scheduled", "source_broken"].includes(source.reachability)) return false;
      if (filter === "reached" && !["success", "no_change", "new_document"].includes(source.reachability)) return false;
      if (filter === "new" && source.reachability !== "new_document") return false;
      if (filter === "unchecked" && source.reachability !== "not_yet_checked" && source.reachability !== "no_official_url") return false;
      if (!q) return true;
      return [source.universityName, source.shortName, source.sourceName, source.url ?? "", source.error ?? "", source.note]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [live, query, filter]);

  const events = useMemo(() => {
    const list = live?.events ?? [];
    return list
      .map((event, index) => ({ event, key: `${event.at}|${index}|${event.type}|${event.url ?? ""}` }))
      .reverse()
      .filter((row) => eventMatches(row.event, eventFilter));
  }, [live, eventFilter]);

  const reachRows = useMemo(() => {
    const counts = new Map<Reachability, number>();
    for (const source of live?.sources ?? []) counts.set(source.reachability, (counts.get(source.reachability) ?? 0) + 1);
    return (Object.keys(REACH_LABEL) as Reachability[])
      .map((id) => ({ id, label: REACH_LABEL[id], value: counts.get(id) ?? 0 }))
      .filter((row) => row.value > 0);
  }, [live]);

  const nextAt = live?.completedAt ? new Date(Date.parse(live.completedAt) + 45 * 60_000) : null;

  return (
    <div>
      <PageHead
        kicker="Discovery"
        title="Discovery log"
        lede="What the crawler actually opened. This page does not start a scan, and it does not publish admission dates. The job runs on GitHub about every 45 minutes even if nobody has the site open. GitHub may start it late."
      />

      <StatusBanner status={status} phase={phase} live={live} now={now} seenAt={seenAt} nextAt={nextAt} refreshing={refreshing} />

      {phase === "loading" ? (
        <div className="mt-6 border border-ink p-4">
          <p className="rule-wait font-mono text-xs tracking-widest text-mute">READING THE PUBLISHED LOG</p>
          <div className="rule-wait mt-4 h-px bg-ink" />
          <div className="rule-wait mt-2 h-px w-2/3 bg-ink" />
        </div>
      ) : null}

      {live ? (
        <>
          <section className="mt-6 grid grid-cols-2 border border-ink md:grid-cols-4">
            <Stat k="Universities" v={live.counts.universities} hint={`${live.counts.systems} admission systems`} />
            <Stat k="Sources" v={live.counts.sources} hint={`${live.counts.checked} checked this cycle`} />
            <Stat k="Reached" v={live.counts.reached} hint={`${live.counts.failed} failed · ${live.counts.unchanged} unchanged`} />
            <Stat k="New links" v={live.counts.newDocuments + live.counts.newPages} hint={`${live.counts.newDocuments} documents · ${live.counts.newPages} pages`} />
          </section>
          <div className="mt-4">
            <RankBars
              kicker="Sources in the file"
              title="How sources answered"
              caption="Counted from the published source list. A new document is a link the crawler had not stored. It is not an admission date."
              empty="THIS FILE HAS NO SOURCE LIST YET."
              rows={reachRows}
            />
          </div>
          <section className="mt-6 border border-ink">
            <div className="border-b border-ink px-3 py-3">
              <h2 className="font-display text-3xl font-bold uppercase">Document links</h2>
              <p className="mt-1 max-w-3xl text-sm">
                Links stored from official pages. A baseline link was already there the first time that site was seen, so it is not counted as new. Nothing here was downloaded, and none of these rows is an admission date.
              </p>
            </div>
            <ul className="max-h-80 overflow-y-auto">
              {(live.discoveries.filter((item) => item.kind === "pdf").length ?? 0) === 0 ? (
                <li className="px-3 py-4 font-mono text-xs tracking-widest text-mute">NO DOCUMENT LINKS IN THIS FILE.</li>
              ) : null}
              {live.discoveries
                .filter((item) => item.kind === "pdf")
                .slice()
                .reverse()
                .map((item) => (
                  <li key={item.id} className="grid gap-1 border-t border-ink px-3 py-2 md:grid-cols-[6.5rem_1fr]">
                    <span className="font-mono text-xs tracking-widest">{item.disposition === "baseline" ? "BASELINE" : item.disposition === "new" ? "NEW" : "LINK"}</span>
                    <span className="min-w-0 font-mono text-xs">
                      <span className="mr-2">{item.shortName}</span>
                      <ExternalLink href={item.url}>{item.title || item.url}</ExternalLink>
                    </span>
                  </li>
                ))}
            </ul>
          </section>
        </>
      ) : null}

      <section className="mt-10">
        <h2 className="font-display text-4xl font-bold uppercase">Activity</h2>
        <p className="mt-2 max-w-3xl text-sm">Only events written by the crawler. Nothing here is simulated. New lines enter when a newer log arrives.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {(
            [
              ["all", "All"],
              ["discover", "New links"],
              ["fetched", "Fetched"],
              ["same", "Unchanged"],
              ["fail", "Failed"],
              ["skip", "Skipped"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setEventFilter(id)}
              className={`h-11 border px-3 font-mono text-xs tracking-widest ${eventFilter === id ? "border-ink bg-ink text-paper" : "border-ink bg-paper"}`}
            >
              {label}
            </button>
          ))}
        </div>
        <ol key={eventFilter} className={cn("log-feed filter-swap mt-4 max-h-[32rem] overflow-y-auto border border-ink", refreshing && "log-updating")}>
          {phase === "loading" ? <li className="p-4 font-mono text-xs tracking-widest text-mute rule-wait">WAITING FOR THE PUBLISHED LOG.</li> : null}
          {phase !== "loading" && (live?.events.length ?? 0) === 0 ? (
            <li className="p-4 font-mono text-xs tracking-widest text-mute">NO EVENTS HAVE BEEN RECORDED.</li>
          ) : null}
          {phase !== "loading" && (live?.events.length ?? 0) > 0 && events.length === 0 ? (
            <li className="p-4 font-mono text-xs tracking-widest text-mute">NO EVENTS MATCH THIS FILTER.</li>
          ) : null}
          {events.map(({ event, key }, index) => (
            <li key={key} className={cn("border-b border-ink", eventClass(event), index < 24 && "log-in")} style={index < 24 ? { animationDelay: `${index * 16}ms` } : undefined}>
              <details>
                <summary className="grid gap-2 px-3 py-2 md:grid-cols-[4.5rem_6.5rem_1fr]">
                  <span className="font-mono text-xs tracking-widest">{EVENT_STAMP[event.type]}</span>
                  <time className="font-mono text-xs" dateTime={event.at}>
                    {event.at.slice(11, 19)} UTC
                  </time>
                  <span className={cn("font-mono text-xs", event.level === "error" || event.type === "fail" ? "text-accent" : "")}>{event.message}</span>
                </summary>
                <div className="px-3 pb-3 font-mono text-xs leading-relaxed">
                  <p>
                    {event.type.toUpperCase()} · {event.level.toUpperCase()}
                    {event.universityId ? ` · ${event.universityId.toUpperCase()}` : ""}
                  </p>
                  {event.url ? (
                    <p className="mt-1 truncate">
                      <ExternalLink href={event.url}>{event.url}</ExternalLink>
                    </p>
                  ) : (
                    <p className="mt-1 text-mute">NO URL ON THIS LINE</p>
                  )}
                </div>
              </details>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10">
        <div className="flex flex-col gap-3 border-b border-ink pb-3 md:flex-row md:items-end md:justify-between">
          <h2 className="font-display text-4xl font-bold uppercase">Sources</h2>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search university or URL"
            className="h-11 w-full border border-ink bg-paper px-3 font-sans text-sm md:max-w-xs"
            aria-label="Search sources"
          />
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {(
            [
              ["all", "All"],
              ["failed", "Failed"],
              ["reached", "Reached"],
              ["new", "New links"],
              ["unchecked", "Not checked"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setFilter(id)}
              className={`h-11 border px-3 font-mono text-xs tracking-widest ${filter === id ? "border-ink bg-ink text-paper" : "border-ink bg-paper"}`}
            >
              {label}
            </button>
          ))}
        </div>
        <ul key={filter} className="filter-swap mt-4 border-t border-ink">
          {phase === "loading" ? <li className="py-4 font-mono text-xs text-mute">WAITING FOR THE PUBLISHED LOG.</li> : null}
          {phase !== "loading" && live && live.sources.length === 0 ? (
            <li className="py-4 font-mono text-xs text-mute">THIS FILE HAS NO SOURCE LIST YET.</li>
          ) : null}
          {phase !== "loading" && (live?.sources.length ?? 0) > 0 && sources.length === 0 ? (
            <li className="py-4 font-mono text-xs text-mute">NO SOURCES MATCH.</li>
          ) : null}
          {sources.map((source) => (
            <SourceRow key={source.id} source={source} now={now} />
          ))}
        </ul>
      </section>
    </div>
  );
}

function StatusBanner({
  status,
  phase,
  live,
  now,
  seenAt,
  nextAt,
  refreshing,
}: {
  status: SystemStatus;
  phase: "loading" | "ready" | "missing";
  live: LiveFile | null;
  now: Date;
  seenAt: Date | null;
  nextAt: Date | null;
  refreshing: boolean;
}) {
  const tone = status === "failed" || status === "stale" ? "border-accent text-accent" : "border-ink";
  const liveNow = status === "active";
  const showActivity = liveNow || refreshing || phase === "loading";
  return (
    <div className={cn("border p-4", tone, showActivity && "log-updating")}>
      {showActivity ? <div className="status-live-bar -mx-4 -mt-4 mb-3" aria-hidden /> : null}
      <div className="flex flex-wrap items-center gap-3">
        <span
          className={cn(
            "inline-block h-3 w-3 border border-current",
            liveNow || refreshing ? "crawl-live bg-accent" : "bg-transparent",
          )}
          aria-hidden
        />
        <p className="font-display text-3xl font-bold uppercase leading-none">
          {phase === "loading" ? "LOADING" : SYSTEM_LABEL[status]}
        </p>
        {liveNow ? <p className="font-mono text-xs tracking-widest text-accent">LIVE · CRAWLING</p> : null}
        {refreshing && !liveNow ? <p className="font-mono text-xs tracking-widest">REFRESHING LOG</p> : null}
        <p className="font-mono text-xs tracking-widest">TARGET EVERY 45 MIN · GITHUB SCHEDULE MAY LAG</p>
      </div>
      {phase === "loading" ? <p className="mt-3 font-mono text-xs rule-wait">Reading the last published cycle…</p> : null}
      {phase === "missing" ? <p className="mt-3 font-mono text-xs">NO DISCOVERY FILE. NOTHING ON THIS PAGE IS A SCAN.</p> : null}
      {live ? (
        <p className="mt-3 font-mono text-xs leading-relaxed">
          LAST CYCLE {live.completedAt ? `${live.completedAt} · ${relativePast(live.completedAt, now)}` : "NOT FINISHED"}
          {nextAt ? ` · NEXT EXPECTED ${nextAt.toISOString().slice(0, 16)}Z` : ""}
          <br />
          FILE READ {seenAt ? relativePast(seenAt.toISOString(), now) : "—"} · BROWSER CLOCK {now.toISOString().slice(11, 19)}Z
          <br />
          {live.note}
        </p>
      ) : null}
      {status === "stale" ? <p className="mt-2 font-mono text-xs">THE LAST CYCLE IS OVER 90 MINUTES OLD. IT IS NOT RUNNING NOW.</p> : null}
      {status === "active" ? (
        <p className="mt-2 font-mono text-xs">A CYCLE WAS MARKED IN PROGRESS. IF THAT STAMP IS OLD, THIS PAGE WILL NOT KEEP CALLING IT LIVE.</p>
      ) : null}
    </div>
  );
}

function Stat({ k, v, hint }: { k: string; v: number; hint: string }) {
  return (
    <article className="border-ink border-r border-b p-4 md:border-b-0">
      <p className="font-display text-5xl font-bold leading-none">
        <CountUp value={v} />
      </p>
      <h2 className="mt-2 font-display text-lg font-semibold uppercase leading-none">{k}</h2>
      <p className="mt-2 font-mono text-xs text-mute">{hint}</p>
    </article>
  );
}

function SourceRow({ source, now }: { source: SourceRecord; now: Date }) {
  const bad = ["unreachable", "retry_scheduled", "source_broken"].includes(source.reachability);
  return (
    <li className={cn("border-b border-ink", reachClass(source.reachability))}>
      <details className="group">
        <summary className="px-3 py-3">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="font-display text-3xl font-bold uppercase leading-none">{source.shortName}</p>
            <p className={`font-mono text-xs tracking-widest ${bad || source.reachability === "new_document" ? "text-accent" : ""}`}>
              {REACH_LABEL[source.reachability]}
            </p>
          </div>
          <p className="mt-1 text-sm">{source.sourceName}</p>
          <p className="mt-1 font-mono text-xs text-mute">CHECKED {relativePast(source.lastCheckedAt, now)} · OPEN FOR URL AND NOTE</p>
        </summary>
        <div className="px-3 pb-3">
          <p className="font-mono text-xs text-mute">
            {source.kind === "system" ? "ADMISSION SYSTEM · " : ""}
            {source.type.toUpperCase()}
            {source.lastSuccessAt ? ` · LAST SUCCESS ${relativePast(source.lastSuccessAt, now)}` : ""}
            {source.documentsFound ? ` · DOCUMENTS ${source.documentsFound}` : ""}
          </p>
          {source.url ? (
            <p className="mt-1 truncate font-mono text-xs">
              <ExternalLink href={source.url}>{source.url}</ExternalLink>
            </p>
          ) : (
            <p className="mt-1 font-mono text-xs text-mute">NO OFFICIAL URL</p>
          )}
          {source.lastDiscoveredDocument ? (
            <p className="mt-1 truncate font-mono text-xs">
              LAST DOCUMENT <ExternalLink href={source.lastDiscoveredDocument}>{source.lastDiscoveredDocument}</ExternalLink>
            </p>
          ) : null}
          {source.error || source.note ? (
            <p className="mt-2 text-sm">
              {source.error ? `${source.error}. ` : ""}
              {source.note}
            </p>
          ) : null}
        </div>
      </details>
    </li>
  );
}
