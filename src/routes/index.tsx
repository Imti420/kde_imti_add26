import { Link, createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { watchItems } from "@/data/watch";
import { TRACK_LABEL, type Track } from "@/data/types";
import { usePublishedLive } from "@/components/live-pulse";
import { WireStrip } from "@/components/newswire";
import { Announced, EvidenceStamp, ExternalLink, SectionLabel, StatusPill } from "@/components/marks";
import { CountUp, Reveal } from "@/components/motion";
import { Proximity, RankBars, SeatPlate, SplitMeter } from "@/components/viz";
import { UniversityCard } from "@/components/university-card";
import { systemStatus, type SystemStatus } from "@/lib/crawl/gate";
import type { CrawlEvent } from "@/lib/crawl/types";
import { useCatalog } from "@/lib/catalog";
import { daysUntil, formatDay, relativeDay, todayISO } from "@/lib/dates";
import { deriveStatus, eventsFor, isUrgent, publishedNotice } from "@/lib/status";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Overview — ADMISSION//26" }] }),
  component: Overview,
});

const PANEL_IDS = ["universe", "wire", "urgent", "exams", "fresh", "picture", "seats", "ops"] as const;

const TRACKS = ["all", ...Object.keys(TRACK_LABEL)] as const;
const LEAD = ["gst", "agri", "dghs", "du", "buet", "ru", "cu", "ju", "sust", "kuet", "ruet", "cuet", "nsu", "bracu", "bup", "ku", "mist", "bau", "nu"];

const DESK_STATUS: Record<SystemStatus, string> = {
  never: "NOT STARTED",
  active: "ACTIVE",
  idle: "IDLE",
  degraded: "DEGRADED",
  failed: "FAILED",
  stale: "STALE",
};

const EVENT_LABEL: Record<CrawlEvent["type"], string> = {
  cycle_start: "Cycle start",
  cycle_end: "Cycle end",
  connect: "Connect",
  fetched: "Fetched",
  no_change: "No change",
  discover: "New link",
  skip: "Skipped",
  fail: "Failed",
  cap: "Cap",
};

function Overview() {
  const t = useT();
  const { universities, circulars, byId } = useCatalog();
  const { live, phase } = usePublishedLive();
  const [track, setTrack] = useState<(typeof TRACKS)[number]>("all");
  const [gridQuery, setGridQuery] = useState("");
  const now = new Date();
  const today = todayISO(now);
  const unis = universities.filter((item) => item.kind === "university");
  const published = circulars.filter(publishedNotice);
  const openCount = circulars.filter((item) => deriveStatus(item, now) === "open").length;
  const deadlines = circulars.filter((item) => item.applicationCloses && item.applicationCloses >= today);
  const exams = new Set(
    circulars.flatMap((item) =>
      eventsFor(item)
        .filter((event) => event.kind === "exam" && event.day >= today)
        .map((event) => event.id),
    ),
  );
  const recentCut = new Date(now);
  recentCut.setDate(recentCut.getDate() - 14);
  const recentCutISO = todayISO(recentCut);
  const recent = circulars.filter((item) => item.updatedOn >= recentCutISO);
  const latest = [...circulars].sort((a, b) => b.updatedOn.localeCompare(a.updatedOn)).slice(0, 5);
  const upcoming = circulars
    .flatMap((item) => eventsFor(item))
    .filter((event) => event.day >= today && (event.kind === "opens" || event.kind === "closes" || event.kind === "exam"))
    .sort((a, b) => a.day.localeCompare(b.day) || a.label.localeCompare(b.label));
  const deadlineRows = upcoming.filter((event) => event.kind === "closes" || event.kind === "opens");
  const urgentDeadlines = deadlineRows.filter((event) => isUrgent(event, now));
  const radar = (urgentDeadlines.length ? urgentDeadlines : deadlineRows.length ? deadlineRows : upcoming).slice(0, 6);
  const examRows = upcoming.filter((event) => event.kind === "exam").slice(0, 6);

  const stats = [
    { k: "01", label: "Universities tracked", value: unis.length, hint: `${universities.length - unis.length} admission systems` },
    { k: "02", label: "Published circulars", value: published.length, hint: "Notice cited · PDF only if linked" },
    { k: "03", label: "Upcoming deadlines", value: deadlines.length, hint: "Close date still ahead" },
    { k: "04", label: "Open applications", value: openCount, hint: openCount ? "Window is live" : "None live today" },
    { k: "05", label: "Upcoming examinations", value: exams.size, hint: "Unit papers still ahead" },
    { k: "06", label: "Recent intelligence", value: recent.length, hint: "Updated in 14 days" },
  ];

  const trackRows = (Object.keys(TRACK_LABEL) as Track[]).map((track) => ({
    id: track,
    label: TRACK_LABEL[track],
    value: universities.filter((uni) => uni.track === track).length,
  }));

  const statusCounts = { open: 0, upcoming: 0, closed: 0, not_announced: 0 };
  for (const item of circulars) statusCounts[deriveStatus(item, now)] += 1;

  const confidenceRows = [
    { id: "notice", label: "Notice cited", value: circulars.filter((item) => item.confidence === "notice").length },
    { id: "reported", label: "Reported", value: circulars.filter((item) => item.confidence === "reported").length },
    { id: "preliminary", label: "Preliminary", value: circulars.filter((item) => item.confidence === "preliminary").length },
    { id: "blank", label: "Not announced", value: circulars.filter((item) => item.confidence === "not-announced").length },
  ];

  const coveredIds = new Set(circulars.map((item) => item.universityId));
  const covered = universities.filter((uni) => coveredIds.has(uni.id)).length;
  const seatRows = circulars
    .filter((item) => item.seats != null)
    .map((item) => ({
      id: item.id,
      label: byId.get(item.universityId)?.shortName ?? item.universityId,
      seats: item.seats as number,
    }));

  const soon = upcoming
    .filter((event) => event.kind === "closes" || event.kind === "exam")
    .slice(0, 8)
    .map((event) => ({
      id: event.id,
      label: `${byId.get(event.universityId)?.shortName ?? "—"}`,
      meta: `${event.kind === "exam" ? "EXAM" : "CLOSES"} · ${relativeDay(event.day, now)}`,
      days: Math.max(0, daysUntil(event.day, now)),
      hot: isUrgent(event, now),
    }));

  const deskStatus = systemStatus(phase === "ready" ? live : null, now);
  const eventRows = countEvents(live?.events ?? []);
  const sameHour = eventsShareOneHour(live?.events ?? []);
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
    <div>
      <header className="rise">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <p className="font-mono text-xs tracking-widest text-mute">VOL. 01 · DHAKA DESK · {formatDay(today)}</p>
          <p className="sticker">HSC 2026–27</p>
        </div>
        <h1 className="mt-3 max-w-5xl font-display text-6xl font-bold uppercase leading-[0.82] tracking-tight text-balance sm:text-7xl md:text-8xl">
          Admission<span className="text-accent">//</span>26
        </h1>
        <p className="mt-4 max-w-xl font-display text-2xl uppercase leading-none md:text-4xl">
          The university universe, on one desk.
        </p>
        <p className="mt-3 max-w-2xl text-base text-pretty">
          Big cards, real circulars, and blanks where the archive does not know. Not a portal. A season catalogue.
        </p>
      </header>

      <nav className="mt-6 flex gap-2 overflow-x-auto pb-2" aria-label="Desk sections">
        {PANEL_IDS.map((id) => (
          <a key={id} href={`#${id}`} className="press shrink-0">
            {t(`home.panel.${id}`)}
          </a>
        ))}
      </nav>

      <section id="universe" className="desk-anchor mt-8">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-mono text-xs tracking-widest text-accent">01 · THE DIRECTORY</p>
            <h2 className="mt-1 font-display text-5xl font-bold uppercase leading-none md:text-6xl">{t("home.panel.universe")}</h2>
          </div>
          <Link to="/universities" className="press">
            Full directory
          </Link>
        </div>
        <p className="max-w-3xl text-sm text-pretty">
          Every institution already in the registry. Hover a card for a campus joke — commentary, not a fact — then open the profile.
          Missing seats, dates and subjects stay labelled as not on file.
        </p>
        <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-center">
          <label className="min-w-0 flex-1">
            <span className="sr-only">{t("home.filterUnis")}</span>
            <input
              value={gridQuery}
              onChange={(event) => setGridQuery(event.target.value)}
              placeholder="FILTER BY NAME, CITY, SHORT NAME"
              className="h-11 w-full rounded-xl border-[3px] border-ink bg-paper px-3 font-mono text-xs uppercase tracking-widest outline-none placeholder:text-mute focus:bg-panel"
            />
          </label>
          <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="University category">
            {TRACKS.map((item) => (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={track === item}
                aria-pressed={track === item}
                className="press shrink-0"
                onClick={() => setTrack(item)}
              >
                {item === "all" ? "All" : TRACK_LABEL[item as Track].split(" ")[0]}
              </button>
            ))}
          </div>
        </div>
        {grid.length === 0 ? (
          <p className="window mt-4">
            <span className="window-body block font-mono text-xs tracking-widest text-mute">{t("home.noUniMatch")}</span>
          </p>
        ) : (
          <div className="uni-grid mt-5">
            {grid.map((row, index) => (
              <UniversityCard key={row.uni.id} uni={row.uni} related={row.related} status={row.status} index={index} />
            ))}
          </div>
        )}
      </section>

      <section className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6" aria-label="Season counts">
        {stats.map((stat, index) => (
          <Reveal key={stat.k} index={index} className="window">
            <div className="window-bar">
              <span>{stat.k}</span>
            </div>
            <div className="window-body">
              <p className="font-display text-4xl font-bold leading-none">
                <CountUp value={stat.value} />
              </p>
              <h2 className="mt-2 font-display text-lg font-semibold uppercase leading-none">{stat.label}</h2>
              <p className="mt-2 font-mono text-xs text-mute">{stat.hint}</p>
            </div>
          </Reveal>
        ))}
      </section>

      <WireStrip />

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.8fr)]">
        <section id="urgent" className="desk-anchor">
          <div className="mb-4 flex items-end justify-between gap-3 border-b border-ink pb-2">
            <SectionLabel index="07">{urgentDeadlines.length ? "Deadlines approaching" : deadlineRows.length ? "Nearest deadlines" : "Nearest marks"}</SectionLabel>
            <Link to="/radar" className="font-mono text-xs tracking-widest underline underline-offset-4">
              FULL RADAR
            </Link>
          </div>
          {radar.length === 0 ? (
            <p className="border border-dashed border-ink p-4 font-mono text-xs tracking-widest text-mute">NO FUTURE DATE IS ON FILE.</p>
          ) : (
            <ol>
              {radar.map((event, index) => {
                const uni = byId.get(event.universityId);
                const hot = isUrgent(event, now);
                return (
                  <li key={event.id} className="rise border-b border-ink" style={{ animationDelay: `${index * 40}ms` }}>
                    <Link
                      to="/circulars/$id"
                      params={{ id: event.circularId }}
                      className="grid grid-cols-[auto_1fr] gap-4 py-3 hover:bg-panel md:grid-cols-[4.5rem_8rem_1fr_auto]"
                    >
                      <span className="font-mono text-xs text-mute">{String(index + 1).padStart(2, "0")}</span>
                      <span className={`font-mono text-xs ${hot ? "text-accent" : "text-ink"}`}>
                        {formatDay(event.day)}
                        <span className="mt-1 block">{relativeDay(event.day, now)}</span>
                      </span>
                      <span>
                        <span className="font-display text-3xl font-bold uppercase leading-none">{uni?.shortName}</span>
                        <span className="mt-1 block text-sm">{event.label}</span>
                      </span>
                      <span className={`font-mono text-xs ${hot ? "text-accent" : "text-mute"}`}>{hot ? "URGENT" : "ON FILE"}</span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          )}
          <p className="mt-2 font-mono text-xs text-mute">
            {urgentDeadlines.length
              ? "RED MEANS A CLOSE INSIDE 14 DAYS, OR AN OPENING INSIDE 7."
              : deadlineRows.length
                ? "NO OPENING OR CLOSE IS INSIDE THE URGENT WINDOW. THESE ARE THE NEXT APPLICATION WINDOWS ON FILE."
                : "NO APPLICATION WINDOW IS DATED. THESE ARE THE NEXT MARKS ON FILE."}
          </p>
        </section>

        <section id="exams" className="desk-anchor">
          <div className="mb-4 flex items-end justify-between gap-3 border-b border-ink pb-2">
            <SectionLabel index="08">{t("home.examinations")}</SectionLabel>
            <Link to="/calendar" className="font-mono text-xs tracking-widest underline underline-offset-4">
              CALENDAR
            </Link>
          </div>
          {examRows.length === 0 ? (
            <p className="border border-dashed border-ink p-4 font-mono text-xs text-mute">NO UPCOMING EXAM DATE IS ON FILE.</p>
          ) : (
            <ol className="border-t border-ink">
              {examRows.map((event) => {
                const uni = byId.get(event.universityId);
                const hot = isUrgent(event, now);
                return (
                  <li key={event.id} className="border-b border-ink">
                    <Link to="/circulars/$id" params={{ id: event.circularId }} className="block py-3 hover:bg-panel">
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="font-display text-3xl font-bold uppercase leading-none">{uni?.shortName}</span>
                        <span className={`font-mono text-xs ${hot ? "text-accent" : "text-mute"}`}>{relativeDay(event.day, now)}</span>
                      </div>
                      <p className="mt-1 text-sm">{event.label}</p>
                      <p className="mt-1 font-mono text-xs">{formatDay(event.day)}</p>
                    </Link>
                  </li>
                );
              })}
            </ol>
          )}
        </section>
      </div>

      <section id="fresh" className="desk-anchor mt-10">
        <div className="mb-4 flex items-end justify-between gap-3 border-b border-ink pb-2">
          <SectionLabel index="09">{t("home.recentlyCited")}</SectionLabel>
          <Link to="/circulars" className="font-mono text-xs tracking-widest underline underline-offset-4">
            ARCHIVE
          </Link>
        </div>
        <ol className="grid gap-px bg-ink md:grid-cols-2">
          {latest.map((item, index) => {
            const uni = byId.get(item.universityId);
            return (
              <li key={item.id} className="rise bg-paper" style={{ animationDelay: `${index * 50}ms` }}>
                <Link to="/circulars/$id" params={{ id: item.id }} className="block p-4 hover:bg-panel">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-display text-3xl font-bold uppercase leading-none">{uni?.shortName}</span>
                    <StatusPill status={deriveStatus(item, now)} />
                    {item.updatedOn >= recentCutISO ? <span className="font-mono text-xs text-accent">REVISED</span> : null}
                  </div>
                  <p className="mt-2 text-sm">{item.title}</p>
                  <p className="mt-2 font-mono text-xs text-mute">CITED {formatDay(item.updatedOn)}</p>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      <section id="picture" className="desk-anchor mt-10">
        <SectionLabel index="10">Picture of the file</SectionLabel>
        <p className="mt-2 max-w-3xl text-sm">
          Counts from the directory and the circulars already stored. Bars are headcounts, not seat estimates.
        </p>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <RankBars
            kicker="Directory"
            title="Records by cluster"
            caption="Every university and admission system on the desk. This does not say who is admitting."
            empty="THE DIRECTORY IS EMPTY."
            rows={trackRows}
          />
          <SplitMeter
            kicker="Circulars only"
            title="Application stage"
            caption={`${circulars.length} circulars are stored. Universities without a circular are not in this mix.`}
            empty="NO CIRCULARS ARE ON FILE."
            parts={[
              { id: "open", label: "OPEN", value: statusCounts.open, tone: "accent" },
              { id: "upcoming", label: "UPCOMING", value: statusCounts.upcoming, tone: "ink" },
              { id: "closed", label: "CLOSED", value: statusCounts.closed, tone: "mute" },
              { id: "blank", label: "NOT ANNOUNCED", value: statusCounts.not_announced, tone: "panel" },
            ]}
          />
          <SplitMeter
            kicker="Coverage"
            title="Who has a circular"
            caption="A record counts as covered when at least one circular is stored for it. Absence is not a rumour."
            empty="NOTHING IS IN THE DIRECTORY."
            parts={[
              { id: "yes", label: "CIRCULAR ON FILE", value: covered, tone: "ink" },
              { id: "no", label: "NO CIRCULAR", value: universities.length - covered, tone: "panel" },
            ]}
          />
          <RankBars
            kicker="Evidence"
            title="How sure the circulars are"
            caption="Confidence is the archive's grade of the source, not a prediction."
            empty="NO CIRCULARS ARE GRADED."
            rows={confidenceRows}
          />
          <Proximity
            kicker="Horizon"
            title="Closes and exams"
            caption="Longer mark means sooner. Only dates written on a circular. Same-day clashes still live on the radar."
            empty="NO FUTURE CLOSE OR EXAM DATE IS ON FILE."
            rows={soon}
          />
          <div id="seats" className="desk-anchor">
            <SeatPlate known={seatRows.length} missing={circulars.length - seatRows.length} rows={seatRows} />
          </div>
        </div>
      </section>

      <section id="ops" className="desk-anchor mt-10 border border-ink p-4 md:p-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-mono text-xs tracking-widest text-mute">11 · DISCOVERY</p>
            <h2 className="mt-1 font-display text-4xl font-bold uppercase leading-none">Crawler health</h2>
          </div>
          <Link to="/discovery" className="font-mono text-xs tracking-widest underline underline-offset-4">
            OPEN THE LOG
          </Link>
        </div>
        {phase === "loading" ? (
          <p className="rule-wait mt-4 font-mono text-xs tracking-widest text-mute">READING THE PUBLISHED LOG.</p>
        ) : null}
        {phase === "missing" ? (
          <p className="mt-4 border border-dashed border-ink p-4 font-mono text-xs tracking-widest text-mute">
            NO DISCOVERY FILE. NOTHING HERE IS A SCAN.
          </p>
        ) : null}
        {live ? (
          <>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span
                className={`inline-block h-3 w-3 border border-ink ${deskStatus === "active" ? "crawl-live bg-accent" : "bg-transparent"}`}
                aria-hidden
              />
              <p className={`font-display text-3xl font-bold uppercase leading-none ${deskStatus === "failed" || deskStatus === "stale" ? "text-accent" : ""}`}>
                {DESK_STATUS[deskStatus]}
              </p>
              <p className="font-mono text-xs tracking-widest text-mute">FILE SAYS {live.status.toUpperCase()}</p>
            </div>
            <p className="mt-3 max-w-3xl font-mono text-xs leading-relaxed text-mute">{live.note}</p>
            {sameHour && (live.events.length ?? 0) > 1 ? (
              <p className="mt-2 font-mono text-xs text-mute">
                EVERY EVENT IN THIS FILE SHARES ONE HOUR. A TIME SERIES WOULD BE A SINGLE MARK, SO IT IS NOT DRAWN.
              </p>
            ) : null}
            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <SplitMeter
                kicker="Last published counts"
                title="What the cycle counted"
                caption="Taken from the cycle's own counters. Not recomputed, not filled in."
                empty="THE CYCLE RECORDED NO COUNTS."
                parts={[
                  { id: "reached", label: "REACHED", value: live.counts.reached, tone: "ink" },
                  { id: "failed", label: "FAILED", value: live.counts.failed, tone: "accent" },
                  { id: "skipped", label: "SKIPPED", value: live.counts.skipped, tone: "mute" },
                  { id: "unchecked", label: "NOT CHECKED", value: live.counts.notChecked, tone: "panel" },
                ]}
              />
              <RankBars
                kicker="Event list"
                title="Lines in the log"
                caption={
                  live.events.length
                    ? `${live.events.length} lines are in the published list. The list is capped, so this is not a full history.`
                    : "The file has a count block but no event lines."
                }
                empty="NO EVENTS HAVE BEEN RECORDED."
                rows={eventRows}
              />
            </div>
          </>
        ) : null}
      </section>

      <section className="mt-10 border border-ink border-l-4 border-l-accent p-4 md:p-6">
        <p className="font-mono text-xs tracking-widest text-accent">WATCH ITEM · NOT A CONFIRMED CIRCULAR</p>
        {watchItems.map((item) => (
          <article key={item.id} className="mt-2">
            <h2 className="font-display text-4xl font-bold uppercase leading-none">{item.title}</h2>
            <p className="mt-3 max-w-4xl text-sm text-pretty">{item.body}</p>
            <p className="mt-3 font-mono text-xs">
              <ExternalLink href={item.sourceUrl}>{item.sourceLabel}</ExternalLink>
            </p>
          </article>
        ))}
      </section>

      <section className="mt-10">
        <SectionLabel index="12">Systems on the desk</SectionLabel>
        <div className="mt-4 grid gap-px bg-ink md:grid-cols-3">
          {universities
            .filter((item) => item.kind === "system")
            .map((item, index) => {
              const circular = circulars.find((entry) => entry.universityId === item.id);
              return (
                <Link
                  key={item.id}
                  to="/universities/$id"
                  params={{ id: item.id }}
                  className="rise bg-paper p-4 hover:bg-panel"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  <p className="font-mono text-xs text-mute">{TRACK_LABEL[item.track]}</p>
                  <h3 className="mt-2 font-display text-4xl font-bold uppercase leading-none">{item.shortName}</h3>
                  <p className="mt-2 text-sm">{item.name}</p>
                  {circular ? (
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <EvidenceStamp circular={circular} />
                      <Announced day={circular.examDate} />
                    </div>
                  ) : null}
                </Link>
              );
            })}
        </div>
      </section>
    </div>
  );
}

function countEvents(events: CrawlEvent[]) {
  const totals = new Map<CrawlEvent["type"], number>();
  for (const event of events) totals.set(event.type, (totals.get(event.type) ?? 0) + 1);
  return [...totals.entries()]
    .map(([type, value]) => ({ id: type, label: EVENT_LABEL[type], value }))
    .sort((a, b) => b.value - a.value || a.label.localeCompare(b.label));
}

function eventsShareOneHour(events: CrawlEvent[]): boolean {
  if (events.length < 2) return false;
  const hour = events[0]?.at.slice(0, 13);
  return events.every((event) => event.at.slice(0, 13) === hour);
}
