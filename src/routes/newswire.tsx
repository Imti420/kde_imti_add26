import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type FormEvent, Fragment } from "react";
import { PageHead, ExternalLink } from "@/components/marks";
import { SPICE_CARDS } from "@/data/desk-spice";
import { WireHeadline, ago, formatWireWhen } from "@/components/newswire";
import { cn } from "@/lib/cn";
import { parseFeedDate } from "@/lib/wire/text";
import { nextWireAt, wireDeskStatus, type WireDeskStatus } from "@/lib/wire/gate";
import type { WireItem, WireSourceState } from "@/lib/wire/types";
import { useWire } from "@/lib/wire/use-wire";

export const Route = createFileRoute("/newswire")({
  head: () => ({ meta: [{ title: "Newswire — ADMISSION//26" }] }),
  component: NewswirePage,
});

const FILTERS = ["all", "official", "reported", "community", "unverified", "corrected"] as const;
type Filter = (typeof FILTERS)[number];

const DESK: Record<WireDeskStatus, string> = {
  never: "NO WIRE YET",
  running: "CYCLE RUNNING",
  current: "ON SCHEDULE",
  late: "UPDATE LATE",
  stale: "WIRE IS STALE",
  failed: "LAST CYCLE FAILED",
  degraded: "SOME SOURCES FAILED",
};

const STATUS_LABEL: Record<WireSourceState["status"], string> = {
  not_yet_checked: "NOT CHECKED",
  ok: "REACHED",
  no_change: "NO CHANGE",
  empty: "NO FEED",
  unreachable: "UNREACHABLE",
  blocked: "BLOCKED",
  not_authorised: "NOT AUTHORISED",
  manual_only: "MANUAL ONLY",
};

const DESK_KEY = "admission26.wire.desk.v1";

interface DeskItem {
  id: string;
  headline: string;
  url: string;
  sourceName: string;
  publishedAt: string | null;
  verification: "community" | "unverified";
  addedAt: string;
}

function readDesk(): DeskItem[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(DESK_KEY) ?? "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((row): row is DeskItem => {
      if (!row || typeof row !== "object") return false;
      const item = row as DeskItem;
      return typeof item.headline === "string" && typeof item.url === "string" && (item.verification === "community" || item.verification === "unverified");
    });
  } catch {
    return [];
  }
}

function NewswirePage() {
  const { live, phase, seenAt, arrivedAt, freshIds, reloadNote, reloading, reload } = useWire();
  const [now, setNow] = useState(() => new Date());
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [desk, setDesk] = useState<DeskItem[]>([]);
  const [headline, setHeadline] = useState("");
  const [url, setUrl] = useState("");
  const [sourceName, setSourceName] = useState("");
  const [published, setPublished] = useState("");
  const [verification, setVerification] = useState<"community" | "unverified">("unverified");
  const [formNote, setFormNote] = useState<string | null>(null);

  useEffect(() => {
    setDesk(readDesk());
    const clock = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(clock);
  }, []);

  const status = wireDeskStatus(phase === "ready" ? live : null, now);
  const next = nextWireAt(live);
  const pulsing = status === "running" || arrivedAt != null;

  const deskItems = useMemo<WireItem[]>(
    () =>
      desk.map((item) => ({
        id: item.id,
        headline: item.headline,
        summary: "Saved on this desk only. It is not in the shared wire.",
        sourceId: "desk",
        sourceName: item.sourceName,
        sourceUrl: item.url,
        sourceCategory: "community",
        platform: "web",
        verification: item.verification,
        publishedAt: item.publishedAt,
        discoveredAt: item.addedAt,
        contentHash: item.id,
        importance: "normal",
        origin: "manual",
      })),
    [desk],
  );

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return [...(live?.items ?? []), ...deskItems].filter((item) => {
      if (filter !== "all" && item.verification !== filter) return false;
      if (!q) return true;
      return [item.headline, item.summary ?? "", item.sourceName, item.verification].join(" ").toLowerCase().includes(q);
    });
  }, [live, deskItems, filter, query]);

  const saveDesk = (event: FormEvent) => {
    event.preventDefault();
    const cleanHeadline = headline.replace(/\s+/g, " ").trim();
    const cleanUrl = url.trim();
    if (cleanHeadline.length < 8 || cleanHeadline.length > 300) {
      setFormNote("Headline must be the original wording, 8 to 300 characters.");
      return;
    }
    if (!/^https?:\/\//i.test(cleanUrl)) {
      setFormNote("A public http or https link is required.");
      return;
    }
    const nextItem: DeskItem = {
      id: `desk-${Date.now().toString(36)}`,
      headline: cleanHeadline,
      url: cleanUrl,
      sourceName: sourceName.trim() || "Public link",
      publishedAt: published.trim() ? parseFeedDate(published.trim()) : null,
      verification,
      addedAt: new Date().toISOString(),
    };
    if (published.trim() && !nextItem.publishedAt) {
      setFormNote("That publication time could not be read, so it was not stored. Leave it blank rather than guess.");
      return;
    }
    const stored = [nextItem, ...desk].slice(0, 30);
    localStorage.setItem(DESK_KEY, JSON.stringify(stored));
    setDesk(stored);
    setHeadline("");
    setUrl("");
    setSourceName("");
    setPublished("");
    setFormNote("Saved on this desk. It is not an official circular and it is not shared.");
  };

  return (
    <div>
      <PageHead
        kicker="ADMISSION SEASON · 55-MINUTE CYCLE"
        title="Newswire"
        lede="Nine desk briefings on top — ACS vs Udvash, Hulkenstein, HSC crash, coaching street fights, written spicy and sourced hard. Below that: the crawler feed. A news report is still not a circular."
        aside={
          <button
            type="button"
            className="h-11 border border-ink px-4 font-mono text-xs tracking-widest hover:bg-ink hover:text-paper disabled:opacity-50"
            onClick={reload}
            disabled={reloading}
          >
            {reloading ? "READING" : "RELOAD WIRE"}
          </button>
        }
      />

      <div className="mb-4 border border-ink px-3 py-3">
        <div className="flex flex-wrap items-center gap-3">
          <span className={cn("inline-block h-3 w-3 border border-ink", pulsing ? "wire-live bg-accent" : "bg-transparent")} aria-hidden />
          <p className={cn("font-display text-3xl font-bold uppercase leading-none", status === "failed" || status === "stale" || status === "late" ? "text-accent" : "")}>
            {phase === "loading" ? "READING" : DESK[status]}
          </p>
        </div>
        <p className="mt-2 font-mono text-xs leading-relaxed text-mute">
          {live?.note ?? "No published note."}
        </p>
        <p className="mt-2 font-mono text-xs text-mute">
          LAST CYCLE {live?.completedAt ? `${formatWireWhen(live.completedAt)} · ${ago(live.completedAt, now)}` : "NEVER"}
          {" · "}
          NEXT EXPECTED {next ? formatWireWhen(next.toISOString()) : "UNKNOWN"}
          {seenAt ? ` · THIS DESK READ THE FILE ${ago(seenAt.toISOString(), now)}` : ""}
        </p>
        {status === "late" ? (
          <p className="mt-2 font-mono text-xs tracking-widest text-accent">THE 55-MINUTE MARK HAS PASSED. NO NEWER FILE HAS BEEN PUBLISHED.</p>
        ) : null}
        {status === "stale" || status === "failed" ? (
          <p className="mt-2 font-mono text-xs tracking-widest text-accent">THIS WIRE IS NOT CURRENT. FAILED OR LATE RUNS ARE NOT SHOWN AS A FRESH SCAN.</p>
        ) : null}
        {reloadNote ? <p className="mt-2 font-mono text-xs text-ink">{reloadNote}</p> : null}
        {arrivedAt ? <p className="mt-2 font-mono text-xs tracking-widest text-accent">NEW WIRE ARRIVED</p> : null}
      </div>


      <div className="mb-6">
        <p className="mb-2 font-mono text-xs tracking-widest text-accent">DESK · NINE THAT MATTER</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SPICE_CARDS.map((card) => (
            <article key={card.id} className="flex flex-col border-[3px] border-ink bg-panel p-4 shadow-[6px_6px_0_0_var(--color-ink)]">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={
                    card.heat === "HOT" || card.heat === "WAR"
                      ? "bg-accent px-2 py-0.5 font-mono text-[10px] font-bold tracking-widest text-onaccent"
                      : card.heat === "MARKET" || card.heat === "SCAM"
                        ? "bg-yellow px-2 py-0.5 font-mono text-[10px] font-bold tracking-widest text-onyellow"
                        : "bg-ink px-2 py-0.5 font-mono text-[10px] font-bold tracking-widest text-paper"
                  }
                >
                  {card.heat}
                </span>
                <span className="font-mono text-[10px] tracking-widest text-mute">{card.kicker}</span>
              </div>
              <h2 className="mt-3 font-display text-2xl font-bold uppercase leading-[0.95]">{card.headline}</h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed">{card.body}</p>
              <p className="mt-3 border-l-4 border-accent pl-3 font-display text-sm font-bold uppercase text-accent">{card.punch}</p>
              <p className="mt-3 font-mono text-[10px] text-mute">
                <ExternalLink href={card.sourceUrl}>{card.sourceLabel}</ExternalLink>
                {" · "}
                {card.published}
              </p>
            </article>
          ))}
        </div>
      </div>

      <div className="mb-4 flex flex-col gap-2 md:flex-row">
        <label className="sr-only" htmlFor="wire-search">
          Filter headlines
        </label>
        <input
          id="wire-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="FILTER HEADLINES"
          className="h-11 flex-1 border border-ink bg-paper px-3 font-mono text-xs uppercase tracking-widest outline-none placeholder:text-mute"
        />
        <div className="flex gap-2 overflow-x-auto" role="tablist" aria-label="Verification">
          {FILTERS.map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={filter === item}
              className={cn(
                "h-11 shrink-0 border border-ink px-3 font-mono text-xs tracking-widest",
                filter === item ? "bg-ink text-paper" : "bg-paper",
              )}
              onClick={() => setFilter(item)}
            >
              {item.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div key={`${filter}|${query}`} className="filter-swap border border-ink">
        {phase === "loading" ? <p className="rule-wait px-3 py-4 font-mono text-xs tracking-widest text-mute">READING THE PUBLISHED WIRE.</p> : null}
        {phase !== "loading" && rows.length === 0 ? (
          <p className="px-3 py-4 font-mono text-xs tracking-widest text-mute">NOTHING IN THIS FILTER. THE WIRE WAS NOT FILLED IN.</p>
        ) : null}
        {rows.map((item, index) => (
          <Fragment key={item.id}>
            {!item.publishedAt && rows.slice(0, index).some((row) => row.publishedAt) && (index === 0 || rows[index - 1]?.publishedAt) ? (
              <p className="border-b border-ink bg-ink px-3 py-2 font-mono text-xs tracking-widest text-paper">NO PUBLICATION TIME ON THE SOURCE</p>
            ) : null}
            <WireHeadline item={item} fresh={freshIds.includes(item.id)} now={now} />
          </Fragment>
        ))}
      </div>

      <section className="mt-8">
        <h2 className="font-display text-4xl font-bold uppercase leading-none">Source registry</h2>
        <p className="mt-2 max-w-3xl text-sm">
          A source is monitored only after an authorised read succeeds. Facebook pages and groups stay closed until a Meta app token is approved for that Page or installed by a group admin. Manual links stay on this desk.
        </p>
        <div className="mt-3 border border-ink">
          {(live?.sources ?? []).map((source) => {
            const closed = source.status === "not_authorised" || source.status === "manual_only";
            const bad = source.status === "blocked" || source.status === "unreachable" || source.status === "empty";
            return (
              <article key={source.id} className={cn("border-b border-ink px-3 py-3", closed || bad ? "border-l-4 border-l-accent" : "border-l-4 border-l-ink")}>
                <p className="font-mono text-xs tracking-widest text-mute">
                  {source.category.toUpperCase()} · {source.platform.toUpperCase()} · {source.accessMethod.toUpperCase()} · {source.automatedAuthorised ? "AUTO AUTHORISED" : "AUTO NOT AUTHORISED"}
                </p>
                <h3 className="mt-1 font-display text-2xl font-bold uppercase leading-none">{source.name}</h3>
                <p className={cn("mt-1 font-mono text-xs tracking-widest", closed || bad ? "text-accent" : "")}>
                  {STATUS_LABEL[source.status]}
                  {source.httpStatus ? ` · HTTP ${source.httpStatus}` : ""}
                  {" · LAST SUCCESS "}
                  {source.lastSuccessAt ? formatWireWhen(source.lastSuccessAt) : "NEVER"}
                  {source.itemsFound ? ` · ${source.itemsFound} KEPT` : ""}
                </p>
                {source.error ? <p className="mt-1 font-mono text-xs text-accent">{source.error}</p> : null}
                <p className="mt-1 text-sm text-pretty">{source.note}</p>
                {source.url.startsWith("http") ? (
                  <p className="mt-1 font-mono text-xs">
                    <a href={source.url} target="_blank" rel="noreferrer" className="underline underline-offset-4">
                      {source.url}
                    </a>
                  </p>
                ) : null}
              </article>
            );
          })}
          {phase === "ready" && (live?.sources.length ?? 0) === 0 ? (
            <p className="px-3 py-4 font-mono text-xs text-mute">THE WIRE FILE HAS NO SOURCE ROWS.</p>
          ) : null}
        </div>
      </section>

      <section className="mt-8 border border-ink p-3 md:p-4">
        <h2 className="font-display text-3xl font-bold uppercase leading-none">Record a public link</h2>
        <p className="mt-2 max-w-3xl text-sm">
          For a Facebook post or group note that cannot be read automatically. It is stored in this browser, marked community or unverified, and never becomes a circular.
        </p>
        <form className="mt-3 grid gap-2" onSubmit={saveDesk}>
          <input value={headline} onChange={(event) => setHeadline(event.target.value)} placeholder="ORIGINAL HEADLINE" className="h-11 border border-ink bg-paper px-3 font-mono text-xs outline-none" />
          <input value={url} onChange={(event) => setUrl(event.target.value)} placeholder="PUBLIC URL" className="h-11 border border-ink bg-paper px-3 font-mono text-xs outline-none" inputMode="url" />
          <input value={sourceName} onChange={(event) => setSourceName(event.target.value)} placeholder="SOURCE NAME" className="h-11 border border-ink bg-paper px-3 font-mono text-xs outline-none" />
          <input value={published} onChange={(event) => setPublished(event.target.value)} placeholder="PUBLICATION TIME, IF THE SOURCE PRINTS ONE" className="h-11 border border-ink bg-paper px-3 font-mono text-xs outline-none" />
          <div className="flex gap-2">
            {(["unverified", "community"] as const).map((item) => (
              <button
                key={item}
                type="button"
                className={cn("h-11 flex-1 border border-ink font-mono text-xs tracking-widest", verification === item ? "bg-ink text-paper" : "")}
                onClick={() => setVerification(item)}
              >
                {item.toUpperCase()}
              </button>
            ))}
          </div>
          <button type="submit" className="h-11 border border-ink font-mono text-xs tracking-widest hover:bg-ink hover:text-paper">
            SAVE ON THIS DESK
          </button>
          {formNote ? <p className="font-mono text-xs">{formNote}</p> : null}
        </form>
      </section>
    </div>
  );
}
