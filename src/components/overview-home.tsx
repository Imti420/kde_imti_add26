import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { watchItems } from "@/data/watch";
import { TRACK_LABEL, type Track } from "@/data/types";
import { WireStrip } from "@/components/newswire";
import { ExternalLink, StatusPill } from "@/components/marks";
import { UniversityCard } from "@/components/university-card";
import { useCatalog } from "@/lib/catalog";
import { formatDay, relativeDay, todayISO } from "@/lib/dates";
import { deriveStatus, eventsFor, isUrgent } from "@/lib/status";
import { useT } from "@/lib/i18n";

const PANEL_IDS = ["wire", "watch", "counts", "urgent", "universe", "fresh"] as const;
const PANEL_LABEL: Record<(typeof PANEL_IDS)[number], string> = {
  wire: "Newswire",
  watch: "Watch",
  counts: "Counts",
  urgent: "Deadlines",
  universe: "Universities",
  fresh: "Circulars",
};
const TRACKS = ["all", ...Object.keys(TRACK_LABEL)] as const;
const LEAD = ["gst", "agri", "dghs", "du", "buet", "ru", "cu", "ju", "sust", "kuet", "ruet", "cuet", "nsu", "bracu", "bup", "ku", "mist", "bau", "nu"];

export function OverviewHome() {
  const t = useT();
  const { universities, circulars, byId } = useCatalog();
  const [track, setTrack] = useState<(typeof TRACKS)[number]>("all");
  const [gridQuery, setGridQuery] = useState("");
  const now = new Date();
  const today = todayISO(now);

  const published = circulars.filter((item) => item.confidence === "notice" || item.confidence === "reported");
  const openCount = circulars.filter((item) => deriveStatus(item, now) === "open").length;
  const deadlines = circulars.filter((item) => item.applicationCloses && item.applicationCloses >= today);
  const upcoming = circulars
    .flatMap((item) => eventsFor(item))
    .filter((event) => event.day >= today && (event.kind === "opens" || event.kind === "closes" || event.kind === "exam"))
    .sort((a, b) => a.day.localeCompare(b.day) || a.label.localeCompare(b.label));
  const deadlineRows = upcoming.filter((event) => event.kind === "closes" || event.kind === "opens");
  const urgentDeadlines = deadlineRows.filter((event) => isUrgent(event, now));
  const radar = (urgentDeadlines.length ? urgentDeadlines : deadlineRows).slice(0, 6);
  const examRows = upcoming.filter((event) => event.kind === "exam").slice(0, 6);
  const latest = [...circulars].sort((a, b) => b.updatedOn.localeCompare(a.updatedOn)).slice(0, 6);

  const stats = [
    { k: "01", label: "Universities tracked", value: universities.length },
    { k: "02", label: "Published circulars", value: published.length },
    { k: "03", label: "Upcoming deadlines", value: deadlines.length },
    { k: "04", label: "Open applications", value: openCount },
    { k: "05", label: "Upcoming examinations", value: examRows.length },
    { k: "06", label: "Watch items", value: watchItems.length },
  ];

  const leadRank = useMemo(() => new Map(LEAD.map((id, index) => [id, index])), []);
  const grid = useMemo(() => {
    const query = gridQuery.trim().toLowerCase();
    const rows = universities
      .map((uni) => {
        const related = circulars
          .filter((item) => item.universityId === uni.id)
          .sort((a, b) => b.updatedOn.localeCompare(a.updatedOn));
        const primary = related[0] ?? null;
        return { uni, related, status: primary ? deriveStatus(primary, now) : ("not_announced" as const) };
      })
      .filter(({ uni }) => {
        if (track !== "all" && uni.track !== track) return false;
        if (!query) return true;
        return [uni.name, uni.shortName, uni.nameBn, uni.city, uni.id].join(" ").toLowerCase().includes(query);
      });
    rows.sort((a, b) => {
      if (track === "all" && !query) {
        const ar = leadRank.get(a.uni.id) ?? 500;
        const br = leadRank.get(b.uni.id) ?? 500;
        if (ar !== br) return ar - br;
      }
      return a.uni.shortName.localeCompare(b.uni.shortName);
    });
    return rows;
  }, [universities, circulars, track, gridQuery, leadRank, now]);

  return (
    <div className="pb-8">
      <header className="rise">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <p className="font-mono text-xs tracking-widest text-mute">VOL. 01 · DHAKA DESK · {formatDay(today)}</p>
          <p className="sticker">HSC 2026–27</p>
        </div>
        <h1 className="mt-3 max-w-5xl font-display text-5xl font-bold uppercase leading-[0.86] tracking-tight text-balance sm:text-6xl md:text-7xl lg:text-8xl">
          Admission<span className="text-accent">//</span>26
        </h1>
        <p className="mt-3 max-w-2xl font-display text-xl uppercase leading-none md:text-3xl">
          Never miss a Bangladesh university admission deadline.
        </p>
        <p className="mt-2 max-w-2xl text-sm text-pretty md:text-base">
          Circulars, calendars, and open windows for the 2026–27 season — on one desk, on a cheap phone, even offline.
        </p>
        <p className="mt-3 font-mono text-[11px] tracking-widest text-mute">
          DESK COPY · 28 NOV 2026 · sources dated on each card
        </p>
      </header>

      <nav className="mt-5 flex gap-2 overflow-x-auto pb-2" aria-label="Desk sections">
        {PANEL_IDS.map((id) => (
          <a key={id} href={`#${id}`} className="press shrink-0">
            {PANEL_LABEL[id]}
          </a>
        ))}
      </nav>

      <section id="wire" className="desk-anchor mt-8">
        <div className="mb-3 flex flex-wrap items-end justify-between gap-3 border-b-[3px] border-ink pb-2">
          <div>
            <p className="font-mono text-xs tracking-widest text-accent">02 · THE WIRE</p>
            <h2 className="mt-1 font-display text-4xl font-bold uppercase leading-none md:text-5xl">Three that matter</h2>
          </div>
          <Link to="/newswire" className="press shrink-0">
            Full newswire
          </Link>
        </div>
        <WireStrip />
      </section>

      <section id="watch" className="desk-anchor mt-10">
        <div className="mb-3 border-b-[3px] border-ink pb-2">
          <p className="font-mono text-xs tracking-widest text-accent">03 · WATCH BOARD</p>
          <h2 className="mt-1 font-display text-4xl font-bold uppercase leading-none">On the board</h2>
        </div>
        <div className="grid grid-cols-1 gap-0 border-[3px] border-ink sm:grid-cols-2">
          {watchItems.map((item) => (
            <article key={item.id} className="border-b border-ink p-4 sm:border-r">
              <p className="font-mono text-[10px] tracking-widest text-mute">NOT A CONFIRMED CIRCULAR</p>
              <h3 className="mt-2 font-display text-xl font-bold uppercase leading-tight">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed">{item.body}</p>
              <p className="mt-3 font-mono text-[10px] text-mute">
                <ExternalLink href={item.sourceUrl}>{item.sourceLabel}</ExternalLink>
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="counts" className="desk-anchor mt-10">
        <div className="mb-3 border-b-[3px] border-ink pb-2">
          <p className="font-mono text-xs tracking-widest text-accent">04 · SEASON METER</p>
          <h2 className="mt-1 font-display text-4xl font-bold uppercase leading-none">What the file holds</h2>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {stats.map((stat) => (
            <div key={stat.k} className="border-[3px] border-ink bg-panel p-3">
              <p className="font-mono text-[10px] tracking-widest text-mute">{stat.k}</p>
              <p className="mt-1 font-display text-4xl font-black leading-none">{String(stat.value).padStart(2, "0")}</p>
              <p className="mt-2 font-mono text-[11px] uppercase leading-snug">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="urgent" className="desk-anchor mt-10">
        <div className="mb-3 flex flex-wrap items-end justify-between gap-3 border-b-[3px] border-ink pb-2">
          <div>
            <p className="font-mono text-xs tracking-widest text-accent">05 · DEADLINES</p>
            <h2 className="mt-1 font-display text-4xl font-bold uppercase leading-none">Approaching</h2>
          </div>
          <Link to="/radar" className="press shrink-0">
            Full radar
          </Link>
        </div>
        <ol className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {radar.map((event, index) => {
            const uni = byId.get(event.universityId);
            return (
              <li key={event.id}>
                <Link
                  to="/circulars/$id"
                  params={{ id: event.circularId }}
                  className="block border-[3px] border-ink bg-panel p-3 hover:bg-yellow"
                >
                  <p className="font-mono text-[10px] tracking-widest text-mute">
                    {String(index + 1).padStart(2, "0")} · {formatDay(event.day)} · {relativeDay(event.day, now)}
                  </p>
                  <p className="mt-1 font-display text-2xl font-bold uppercase leading-none">{uni?.shortName ?? "—"}</p>
                  <p className="mt-1 font-mono text-xs uppercase">
                    {event.kind === "closes" ? "Application closes" : event.kind === "opens" ? "Application opens" : event.label}
                    {isUrgent(event, now) ? " · URGENT" : ""}
                  </p>
                </Link>
              </li>
            );
          })}
        </ol>

        <div className="mt-8 mb-3 flex flex-wrap items-end justify-between gap-3 border-b-[3px] border-ink pb-2">
          <div>
            <p className="font-mono text-xs tracking-widest text-accent">06 · EXAMINATIONS</p>
            <h2 className="mt-1 font-display text-4xl font-bold uppercase leading-none">Next papers</h2>
          </div>
          <Link to="/calendar" className="press shrink-0">
            Calendar
          </Link>
        </div>
        <ol className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {examRows.map((event) => {
            const uni = byId.get(event.universityId);
            return (
              <li key={event.id}>
                <Link
                  to="/circulars/$id"
                  params={{ id: event.circularId }}
                  className="block border-[3px] border-ink p-3 hover:bg-panel"
                >
                  <p className="font-display text-xl font-bold uppercase">
                    {uni?.shortName ?? "—"} · {relativeDay(event.day, now)}
                  </p>
                  <p className="mt-1 font-mono text-xs uppercase">{event.label}</p>
                  <p className="mt-1 font-mono text-[11px] text-mute">{formatDay(event.day)}</p>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      <section id="universe" className="desk-anchor mt-12">
        <div className="mb-3 flex flex-wrap items-end justify-between gap-3 border-b-[3px] border-ink pb-2">
          <div>
            <p className="font-mono text-xs tracking-widest text-accent">01 · THE DIRECTORY</p>
            <h2 className="mt-1 font-display text-4xl font-bold uppercase leading-none md:text-5xl">{t("home.panel.universe")}</h2>
          </div>
          <Link to="/universities" className="press shrink-0">
            Full directory
          </Link>
        </div>
        <div className="mb-3 flex flex-wrap gap-2">
          {TRACKS.map((id) => (
            <button
              key={id}
              type="button"
              className={`press text-[10px] tracking-widest ${track === id ? "bg-ink text-paper" : ""}`}
              onClick={() => setTrack(id)}
            >
              {id === "all" ? "ALL" : TRACK_LABEL[id as Track]}
            </button>
          ))}
          <input
            value={gridQuery}
            onChange={(e) => setGridQuery(e.target.value)}
            placeholder="Filter…"
            className="h-10 min-w-[10rem] flex-1 border-[3px] border-ink bg-paper px-2 font-mono text-xs uppercase tracking-widest outline-none"
          />
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {grid.slice(0, 18).map(({ uni, related, status }, index) => (
            <UniversityCard key={uni.id} uni={uni} related={related} status={status} index={index} />
          ))}
        </div>
        {grid.length > 18 ? (
          <p className="mt-3 font-mono text-xs text-mute">
            Showing 18 of {grid.length}.{" "}
            <Link to="/universities" className="underline">
              Open full directory
            </Link>
          </p>
        ) : null}
      </section>

      <section id="fresh" className="desk-anchor mt-12">
        <div className="mb-3 border-b-[3px] border-ink pb-2">
          <p className="font-mono text-xs tracking-widest text-accent">07 · FRESH CIRCULARS</p>
          <h2 className="mt-1 font-display text-4xl font-bold uppercase leading-none">Recently touched</h2>
        </div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {latest.map((item) => {
            const uni = byId.get(item.universityId);
            return (
              <Link
                key={item.id}
                to="/circulars/$id"
                params={{ id: item.id }}
                className="flex items-start justify-between gap-3 border-[3px] border-ink p-3 hover:bg-panel"
              >
                <div>
                  <p className="font-display text-lg font-bold uppercase leading-tight">{uni?.shortName ?? item.universityId}</p>
                  <p className="mt-1 text-sm leading-snug">{item.title}</p>
                </div>
                <div className="shrink-0 text-right">
                  <StatusPill status={deriveStatus(item, now)} />
                  <p className="mt-1 font-mono text-[10px] text-mute">{item.updatedOn}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
