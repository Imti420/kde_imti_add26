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
        "border-b border-ink px-3 py-2",
        alert && "border-l-4 border-l-accent bg-panel",
        fresh && "wire-in",
      )}
    >
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <p className="font-mono text-xs text-mute">{item.publishedAt ? formatWireWhen(item.publishedAt) : "PUBLICATION TIME NOT ON THE SOURCE"}</p>
        <p className={cn("font-mono text-xs tracking-widest", alert ? "text-accent" : "text-ink")}>
          {VERIFY[item.verification]} · {kindLabel(item)}
          {item.classifier === "ai" ? " · AI" : item.classifier === "heuristic" ? " · HEURISTIC" : ""}
        </p>
      </div>
      <h3 className="mt-1 font-display text-xl font-bold uppercase leading-tight md:text-2xl">{item.headline}</h3>
      {item.summary ? <p className="mt-1 max-w-4xl text-sm text-pretty">{item.summary}</p> : null}
      <p className="mt-1 font-mono text-xs text-mute">
        <ExternalLink href={item.sourceUrl}>{item.sourceName}</ExternalLink>
        {" · FOUND "}
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

/** Massive breaking super-head for the UGC calendar nuke — the shining moment of Admission 26. */
export function UgcNukeSuperHead() {
  const lead = SPICE_CARDS.find((c) => c.id === "spice-ugc-nuke") ?? SPICE_CARDS[0];
  return (
    <section className="ugc-nuke-super relative mb-8 overflow-hidden border-[4px] border-ink bg-ink text-paper shadow-[12px_12px_0_0_var(--color-accent)]">
      <div className="absolute inset-0 ugc-nuke-scanlines pointer-events-none" aria-hidden />
      <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-accent/30 blur-3xl ugc-nuke-pulse" aria-hidden />
      <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-accent/20 blur-3xl ugc-nuke-pulse" style={{ animationDelay: "0.8s" }} aria-hidden />

      <div className="relative px-4 py-6 md:px-8 md:py-10">
        <div className="flex flex-wrap items-center gap-3">
          <span className="ugc-nuke-badge inline-flex items-center gap-2 bg-accent px-3 py-1.5 font-mono text-[11px] font-black tracking-[0.25em] text-onaccent">
            <span className="inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-paper" />
            BREAKING · UGC NUKE · 9 NOV 2026
          </span>
          <span className="font-mono text-[11px] tracking-widest text-accent">THE SHINING MOMENT OF ADMISSION 26</span>
        </div>

        <p className="mt-4 font-mono text-xs font-bold tracking-[0.35em] text-accent md:text-sm">
          THE WHOLE PUBLIC UNIVERSITY CALENDAR JUST DIED
        </p>

        <h1 className="ugc-nuke-title mt-3 font-display text-[2.6rem] font-black uppercase leading-[0.88] tracking-tight text-paper md:text-[4.2rem] lg:text-[5.2rem]">
          UGC POSTPONES{" "}
          <span className="text-accent">EVERY</span>{" "}
          PUBLIC UNI ADMISSION TEST
        </h1>

        <p className="mt-5 max-w-4xl font-display text-xl font-bold uppercase leading-snug text-paper/95 md:text-2xl md:leading-tight">
          Applications from 1 January 2027. Tests after 1 February. DU was opening{" "}
          <span className="bg-accent px-1.5 text-onaccent">TOMORROW</span>. BUET on 21 Nov. Medical locked 18 Dec. The coaching war just lost its calendar.
        </p>

        <div className="mt-6 flex flex-col gap-4 border-t-2 border-accent/60 pt-5 md:flex-row md:items-end md:justify-between">
          <p className="max-w-2xl text-sm leading-relaxed text-paper/85 md:text-base">
            {lead.body.slice(0, 280)}…
          </p>
          <div className="shrink-0">
            <p className="font-display text-lg font-black uppercase leading-none text-accent md:text-xl">
              {lead.punch}
            </p>
            <p className="mt-2 font-mono text-[10px] tracking-wide text-mute">
              <ExternalLink href={lead.sourceUrl}>{lead.sourceLabel}</ExternalLink>
            </p>
          </div>
        </div>
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
    <section id="wire" className="window desk-anchor mt-8">
      <UgcNukeSuperHead />
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-ink px-3 py-3">
        <div>
          <p className="font-mono text-xs tracking-widest text-accent">DESK BRIEFING · NOT A HEADLINE FEED</p>
          <h2 className="mt-1 font-display text-4xl font-bold uppercase leading-none">Nine that matter</h2>
          <p className="mt-2 max-w-2xl text-sm text-mute">
            Written by the desk from the messy admission and edtech season — ACS vs Udvash, Hulkenstein hype, HSC crash, coaching street fights, and the rest. Not a sad grid of scraped headlines.
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

      <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-3">
        {SPICE_CARDS.map((card, i) => (
          <article
            key={card.id}
            className={cn(
              "flex flex-col border-ink bg-panel p-4 md:p-5 border-b border-ink",
              (i + 1) % 2 !== 0 && "sm:border-r",
              (i + 1) % 3 !== 0 && "lg:border-r",
            )}
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className={cn("px-2 py-0.5 font-mono text-[10px] font-bold tracking-widest", HEAT_CLASS[card.heat] ?? "bg-ink text-paper")}>
                {card.heat}
              </span>
              <span className="font-mono text-[10px] tracking-widest text-mute">{card.kicker}</span>
            </div>
            <h3 className="mt-3 font-display text-2xl font-bold uppercase leading-[0.95] md:text-[1.65rem]">
              {card.headline}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-pretty">{card.body}</p>
            <p className="mt-4 border-l-4 border-accent pl-3 font-display text-base font-bold uppercase leading-snug text-accent">
              {card.punch}
            </p>
            <p className="mt-4 font-mono text-[10px] tracking-wide text-mute">
              <ExternalLink href={card.sourceUrl}>{card.sourceLabel}</ExternalLink>
              {" · "}
              {card.published}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
