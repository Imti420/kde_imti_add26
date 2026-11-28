import { Link } from "@tanstack/react-router";
import { ExternalLink } from "@/components/marks";
import { cn } from "@/lib/cn";
import { nextWireAt, wireDeskStatus, type WireDeskStatus } from "@/lib/wire/gate";
import type { WireItem, WireVerification } from "@/lib/wire/types";
import { useWire } from "@/lib/wire/use-wire";
import { SPICE_CARDS } from "@/data/desk-spice";

const VERIFY: Record<WireVerification, string> = {
  official: "OFFICIAL",
  reported: "REPORTED",
  community: "COMMUNITY",
  unverified: "UNVERIFIED",
  corrected: "CORRECTED",
};

const DESK: Record<WireDeskStatus, string> = {
  never: "NO WIRE YET",
  running: "CYCLE RUNNING",
  current: "ON SCHEDULE",
  late: "UPDATE LATE",
  stale: "WIRE IS STALE",
  failed: "LAST CYCLE FAILED",
  degraded: "SOME SOURCES FAILED",
};

export function formatWireWhen(iso: string | null): string {
  if (!iso) return "NO PUBLICATION TIME";
  const then = Date.parse(iso);
  if (Number.isNaN(then)) return "NO PUBLICATION TIME";
  const stamp = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Dhaka",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(then);
  return `${stamp} DHAKA`;
}

export function ago(iso: string | null, now: Date): string {
  if (!iso) return "NEVER";
  const then = Date.parse(iso);
  if (Number.isNaN(then)) return "UNKNOWN";
  const minutes = Math.floor(Math.max(0, now.getTime() - then) / 60_000);
  if (minutes < 1) return "JUST NOW";
  if (minutes < 60) return `${minutes} MIN AGO`;
  const hours = Math.floor(minutes / 60);
  if (hours < 48) return `${hours} HR AGO`;
  const days = Math.floor(hours / 24);
  return `${days} DAY${days === 1 ? "" : "S"} AGO`;
}

function kindLabel(item: WireItem): string {
  if (item.origin === "manual") return "MANUAL";
  if (item.sourceId.startsWith("udvash") || item.sourceId.startsWith("acs") || item.sourceId.startsWith("apars") || item.sourceId.startsWith("fb-apars") || item.sourceId === "fb-udvash") {
    return "COACHING";
  }
  if (item.sourceCategory === "news") return "NEWSROOM";
  if (item.sourceCategory === "community") return "COMMUNITY";
  return "INSTITUTION";
}

function caveat(item: WireItem): string | null {
  if (item.verification === "reported") return "News report. Not the original circular.";
  if (item.verification === "community" || item.verification === "unverified") return "Not an official announcement.";
  if (kindLabel(item) === "COACHING") return "Coaching announcement. Not a university circular.";
  if (item.verification === "corrected") return "Correction from the institution. Read the source.";
  return null;
}

export function WireHeadline({
  item,
  fresh,
  now,
}: {
  item: WireItem;
  fresh: boolean;
  now: Date;
}) {
  const alert = item.importance === "official-alert";
  const note = caveat(item);
  return (
    <article
      className={cn(
        "border-b border-ink px-3 py-2.5 md:px-4",
        alert && "border-l-4 border-l-accent bg-panel",
        fresh && "wire-in",
      )}
    >
      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
        <p className="font-mono text-[10px] tracking-wide text-mute md:text-xs">
          {item.publishedAt ? formatWireWhen(item.publishedAt) : "NO PUB TIME"}
        </p>
        <span className="text-mute" aria-hidden>
          ·
        </span>
        <p className={cn("font-mono text-[10px] tracking-widest md:text-xs", alert ? "text-accent" : "text-ink")}>
          {VERIFY[item.verification]} · {kindLabel(item)}
          {item.classifier === "ai" ? " · AI" : item.classifier === "heuristic" ? " · HEURISTIC" : ""}
        </p>
      </div>
      <h3 className="mt-1 font-display text-lg font-bold uppercase leading-[1.05] md:text-xl">{item.headline}</h3>
      {item.summary ? <p className="mt-1 max-w-4xl text-[13px] leading-snug text-pretty text-ink/90 md:text-sm">{item.summary}</p> : null}
      <p className="mt-1 font-mono text-[10px] tracking-wide text-mute">
        <ExternalLink href={item.sourceUrl}>{item.sourceName}</ExternalLink>
        {" · "}
        {ago(item.discoveredAt, now)}
        {note ? ` · ${note}` : ""}
      </p>
    </article>
  );
}

const HEAT_CLASS: Record<string, string> = {
  HOT: "bg-accent text-onaccent",
  SYSTEM: "bg-ink text-paper",
  MARKET: "bg-yellow text-onyellow",
  WAR: "bg-accent text-onaccent",
  STREET: "bg-ink text-paper",
  SCAM: "bg-yellow text-onyellow",
  NUKE: "bg-accent text-onaccent nuke-badge",
};

/** Season lead — calendar-lock board (no drama banner). */
export function UgcNukeSuperHead() {
  const lead = SPICE_CARDS[0];
  const pins = [
    { label: "DU", line: "Closes 28 Nov", tone: "hot" as const },
    { label: "BUET", line: "Test 1 Feb", tone: "sys" as const },
    { label: "RU", line: "Open → 30 Nov", tone: "hot" as const },
    { label: "JU", line: "Open → 15 Dec", tone: "sys" as const },
  ];
  return (
    <section
      className="relative mb-6 overflow-hidden border-[3px] border-ink bg-panel text-ink shadow-[6px_6px_0_0_var(--color-ink)] md:mb-8"
      aria-label="Season board"
    >
      <div className="border-b-[3px] border-ink bg-ink px-3 py-2 text-paper sm:px-5 md:px-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="font-mono text-[10px] font-bold tracking-[0.2em] md:text-[11px]">
            ADMISSION//26 · NEWSWIRE · 28 NOV
          </p>
          <p className="font-mono text-[10px] tracking-widest text-paper/70">CALENDAR LOCK</p>
        </div>
      </div>

      <div className="px-3 py-5 sm:px-5 md:px-6 md:py-7">
        <p className="font-mono text-[11px] font-bold tracking-[0.18em] text-accent">SEASON BOARD</p>
        <h1 className="mt-2 max-w-4xl font-display text-[1.75rem] font-black uppercase leading-[0.95] tracking-tight sm:text-[2.35rem] md:text-[3.1rem]">
          Forms are live. Dates moved.{" "}
          <span className="text-accent">Read the board.</span>
        </h1>
        <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-ink/85 md:text-base">
          DU closes today (28 Nov, extended from 25). BUET&apos;s test is 1 February. RU and JU are open. JnU and Agri are live.
          This strip is the desk&apos;s current map — not a panic banner.
        </p>

        <div className="mt-5 grid grid-cols-2 gap-2 border-t-[3px] border-ink pt-4 sm:grid-cols-4">
          {pins.map((p) => (
            <div
              key={p.label}
              className={
                p.tone === "hot"
                  ? "border-[2.5px] border-ink bg-accent px-2.5 py-2 text-onaccent"
                  : "border-[2.5px] border-ink bg-paper px-2.5 py-2"
              }
            >
              <p className="font-display text-xl font-black uppercase leading-none md:text-2xl">{p.label}</p>
              <p className="mt-1 font-mono text-[10px] font-bold tracking-wide opacity-90">{p.line}</p>
            </div>
          ))}
        </div>

        {lead ? (
          <div className="mt-4 flex flex-col gap-2 border-t border-ink/20 pt-3 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-2xl text-[13px] leading-relaxed text-ink/75 md:text-sm">{lead.body}</p>
            {lead.circularId ? (
              <Link
                to="/circulars/$id"
                params={{ id: lead.circularId }}
                className="press shrink-0 text-[10px] tracking-widest"
              >
                OPEN CIRCULAR →
              </Link>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function WireStrip() {
  const { live, phase, arrivedAt } = useWire();
  const now = new Date();
  const status = wireDeskStatus(phase === "ready" ? live : null, now);
  const next = nextWireAt(live);
  const pulsing = status === "running" || arrivedAt != null;

  return (
    <section className="window desk-anchor" aria-label="Desk briefing cards">
      <UgcNukeSuperHead />
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-ink px-3 py-3">
        <div>
          <p className="font-mono text-xs tracking-widest text-accent">DESK BRIEFING · 28 NOV</p>
          <h2 className="mt-1 font-display text-4xl font-bold uppercase leading-none">What moved</h2>
          <p className="mt-2 max-w-2xl text-sm text-mute">
            Fresh desk cards for the calendar lock — form deadlines, moved tests, and open portals. Not a scrape of random headlines.
          </p>
        </div>
        <Link to="/newswire" className="press text-xs tracking-widest">
          FULL WIRE →
        </Link>
      </div>

      <div className="flex flex-wrap items-center gap-3 border-b border-ink px-3 py-2">
        <span className={cn("inline-block h-3 w-3 border border-ink", pulsing ? "wire-live bg-accent" : "bg-transparent")} aria-hidden />
        <p className={cn("font-mono text-xs tracking-widest", status === "failed" || status === "stale" || status === "late" ? "text-accent" : "text-mute")}>
          {phase === "loading" ? "READING THE WIRE" : DESK[status]}
        </p>
        <p className="font-mono text-xs text-mute">
          {live?.completedAt ? `CRAWLER CYCLE ${ago(live.completedAt, now)}` : "NO CRAWLER CYCLE YET"}
          {next ? ` · NEXT ${formatWireWhen(next.toISOString())}` : ""}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-3">
        {SPICE_CARDS.map((card, i) => (
          <article
            key={card.id}
            className={cn(
              "flex flex-col border-b border-ink bg-panel p-4 md:p-5",
              (i + 1) % 2 !== 0 && "sm:border-r",
              (i + 1) % 3 !== 0 && "lg:border-r",
            )}
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className={cn("shrink-0 px-2 py-0.5 font-mono text-[10px] font-bold tracking-widest", HEAT_CLASS[card.heat] ?? "bg-ink text-paper")}>
                {card.heat}
              </span>
              <span className="min-w-0 font-mono text-[10px] leading-snug tracking-widest text-mute">{card.kicker}</span>
            </div>
            <h3 className="mt-2.5 font-display text-xl font-bold uppercase leading-[0.95] md:mt-3 md:text-[1.55rem]">
              {card.headline}
            </h3>
            <p className="mt-2.5 flex-1 text-[13px] leading-relaxed text-pretty md:mt-3 md:text-sm">{card.body}</p>
            <p className="mt-3 border-l-4 border-accent pl-3 font-display text-sm font-bold uppercase leading-snug text-accent md:mt-4 md:text-base">
              {card.punch}
            </p>
            <p className="mt-3 font-mono text-[10px] tracking-wide text-mute md:mt-4">
              <ExternalLink href={card.sourceUrl}>{card.sourceLabel}</ExternalLink>
              {" · "}
              {card.published}
            </p>
            {card.circularId ? (
              <Link
                to="/circulars/$id"
                params={{ id: card.circularId }}
                className="mt-2 inline-flex w-fit border-[2px] border-ink bg-paper px-2 py-1 font-mono text-[10px] font-bold tracking-widest text-ink hover:bg-yellow"
              >
                CIRCULAR · {card.circularId.toUpperCase()} →
              </Link>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
