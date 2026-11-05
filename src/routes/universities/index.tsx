import { Link, createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHead, StatusPill, controlClass } from "@/components/marks";
import { CountUp } from "@/components/motion";
import { UniversityCard } from "@/components/university-card";
import { RankBars, SplitMeter } from "@/components/viz";
import { TRACK_LABEL, type Track } from "@/data/types";
import { useCatalog } from "@/lib/catalog";
import { formatDay } from "@/lib/dates";
import { deriveStatus, nextRelevantDay } from "@/lib/status";

export const Route = createFileRoute("/universities/")({
  head: () => ({ meta: [{ title: "All universities — ADMISSION//26" }] }),
  component: UniversitiesPage,
});

const TRACKS = ["all", ...Object.keys(TRACK_LABEL)] as const;

function UniversitiesPage() {
  const { universities, circulars } = useCatalog();
  const [q, setQ] = useState("");
  const [track, setTrack] = useState<(typeof TRACKS)[number]>("all");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("name");
  const [engineeringOnly, setEngineeringOnly] = useState(false);
  const [view, setView] = useState<"cards" | "ledger">("cards");

  const rows = useMemo(() => {
    const query = q.trim().toLowerCase();
    const mapped = universities
      .map((uni) => {
        const related = circulars
          .filter((item) => item.universityId === uni.id)
          .sort((a, b) => b.updatedOn.localeCompare(a.updatedOn));
        const primary = related[0] ?? null;
        const appStatus = primary ? deriveStatus(primary) : "not_announced";
        const next = primary ? nextRelevantDay(primary) : null;
        return { uni, related, primary, appStatus, next };
      })
      .filter(({ uni, appStatus }) => {
        if (track !== "all" && uni.track !== track) return false;
        if (engineeringOnly && uni.track !== "engineering" && !uni.tags.includes("engineering")) return false;
        if (status !== "all" && appStatus !== status) return false;
        if (!query) return true;
        return [uni.name, uni.shortName, uni.nameBn, uni.city, uni.id].join(" ").toLowerCase().includes(query);
      });
    mapped.sort((a, b) => {
      if (sort === "deadline") return (a.next ?? "9999").localeCompare(b.next ?? "9999");
      if (sort === "city") return a.uni.city.localeCompare(b.uni.city) || a.uni.name.localeCompare(b.uni.name);
      if (sort === "short") return a.uni.shortName.localeCompare(b.uni.shortName);
      return a.uni.name.localeCompare(b.uni.name);
    });
    return mapped;
  }, [universities, circulars, q, track, status, sort, engineeringOnly]);

  const withCircular = rows.filter((row) => row.primary).length;
  const withUnits = rows.filter((row) => (row.primary?.units.length ?? 0) > 0).length;
  const withSeats = rows.filter((row) => row.primary?.seats != null).length;
  const trackRows = (Object.keys(TRACK_LABEL) as Track[])
    .map((id) => ({
      id,
      label: TRACK_LABEL[id],
      value: rows.filter((row) => row.uni.track === id).length,
    }))
    .filter((row) => row.value > 0);
  const statusParts = [
    { id: "open", label: "OPEN", value: rows.filter((row) => row.appStatus === "open").length, tone: "accent" as const },
    { id: "upcoming", label: "UPCOMING", value: rows.filter((row) => row.appStatus === "upcoming").length, tone: "ink" as const },
    { id: "closed", label: "CLOSED", value: rows.filter((row) => row.appStatus === "closed").length, tone: "mute" as const },
    {
      id: "blank",
      label: "NOT ANNOUNCED",
      value: rows.filter((row) => row.appStatus === "not_announced").length,
      tone: "panel" as const,
    },
  ];

  return (
    <div>
      <PageHead
        kicker="Directory"
        title="All universities"
        lede="Every public university on the UGC list is here, plus the three national admission systems and a set of private universities. A missing circular, seat count or subject list stays blank."
      />
      <div className="grid gap-3 border border-ink p-3 md:grid-cols-4">
        <label className="md:col-span-2">
          <span className="font-mono text-xs tracking-widest text-mute">SEARCH</span>
          <input className={controlClass} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Name, short name, city" />
        </label>
        <label>
          <span className="font-mono text-xs tracking-widest text-mute">CATEGORY</span>
          <select className={controlClass} value={track} onChange={(e) => setTrack(e.target.value as (typeof TRACKS)[number])}>
            {TRACKS.map((item) => (
              <option key={item} value={item}>
                {item === "all" ? "ALL CATEGORIES" : TRACK_LABEL[item as Track].toUpperCase()}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className="font-mono text-xs tracking-widest text-mute">STATUS</span>
          <select className={controlClass} value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="all">ALL STATUSES</option>
            <option value="open">OPEN</option>
            <option value="upcoming">UPCOMING</option>
            <option value="closed">CLOSED</option>
            <option value="not_announced">NOT ANNOUNCED</option>
          </select>
        </label>
        <label>
          <span className="font-mono text-xs tracking-widest text-mute">SORT</span>
          <select className={controlClass} value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="name">UNIVERSITY NAME</option>
            <option value="short">SHORT NAME</option>
            <option value="deadline">NEAREST DATE</option>
            <option value="city">CITY</option>
          </select>
        </label>
        <label className="flex h-11 items-center gap-2 border border-ink px-3 font-mono text-xs tracking-widest">
          <input type="checkbox" checked={engineeringOnly} onChange={(e) => setEngineeringOnly(e.target.checked)} />
          ENGINEERING INCL. PRIVATE
        </label>
        <div className="flex h-11 border border-ink md:col-span-2">
          <button
            type="button"
            onClick={() => setView("cards")}
            className={`flex-1 font-mono text-xs tracking-widest ${view === "cards" ? "bg-ink text-paper" : ""}`}
          >
            CARDS
          </button>
          <button
            type="button"
            onClick={() => setView("ledger")}
            className={`flex-1 border-l border-ink font-mono text-xs tracking-widest ${view === "ledger" ? "bg-ink text-paper" : ""}`}
          >
            LEDGER
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 border border-ink md:grid-cols-4">
        <ViewStat k="In view" v={rows.length} hint="After the filters" />
        <ViewStat k="With a circular" v={withCircular} hint="At least one notice" />
        <ViewStat k="Units named" v={withUnits} hint="Subject list on file" />
        <ViewStat k="Seats verified" v={withSeats} hint={withSeats ? "On a circular" : "None in this view"} />
      </div>

      {rows.length > 0 ? (
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <RankBars
            kicker="This view"
            title="Category mix"
            caption="Headcount of the records currently on screen. Filtering changes the chart. It is not a seat chart."
            empty="NO RECORDS IN THIS VIEW."
            rows={trackRows}
          />
          <SplitMeter
            kicker="This view"
            title="Admission status"
            caption="Status comes from dates on the latest circular. No circular means not announced."
            empty="NO RECORDS IN THIS VIEW."
            parts={statusParts}
          />
        </div>
      ) : null}

      {rows.length === 0 ? <p className="mt-4 border border-ink p-4 font-mono text-xs">NO RECORDS MATCH.</p> : null}

      {view === "cards" && rows.length > 0 ? (
        <div className="uni-grid mt-5">
          {rows.map((row, index) => (
            <UniversityCard key={row.uni.id} uni={row.uni} related={row.related} status={row.appStatus} index={index} />
          ))}
        </div>
      ) : null}

      {view === "ledger" && rows.length > 0 ? (
        <>
          <div className="filter-swap mt-4 hidden md:block">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-y border-ink font-mono text-xs tracking-widest text-mute">
                  <th className="py-2 pr-3 font-medium">ID</th>
                  <th className="py-2 pr-3 font-medium">UNIVERSITY</th>
                  <th className="py-2 pr-3 font-medium">CATEGORY</th>
                  <th className="py-2 pr-3 font-medium">SEATS</th>
                  <th className="py-2 pr-3 font-medium">STATUS</th>
                  <th className="py-2 font-medium">NEXT DATE</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(({ uni, primary, appStatus, next }) => (
                  <tr key={uni.id} className="border-b border-ink hover:bg-panel">
                    <td className="py-3 pr-3 font-display text-2xl font-bold uppercase leading-none">
                      <Link to="/universities/$id" params={{ id: uni.id }}>
                        {uni.shortName}
                      </Link>
                    </td>
                    <td className="py-3 pr-3">
                      <Link to="/universities/$id" params={{ id: uni.id }} className="text-sm">
                        {uni.name}
                      </Link>
                      <span className="mt-1 block font-mono text-xs text-mute">{uni.city}</span>
                    </td>
                    <td className="py-3 pr-3 font-mono text-xs">{TRACK_LABEL[uni.track].toUpperCase()}</td>
                    <td className="py-3 pr-3 font-mono text-xs">{primary?.seats == null ? "NOT ON FILE" : primary.seats.toLocaleString("en-BD")}</td>
                    <td className="py-3 pr-3">
                      <StatusPill status={appStatus} />
                    </td>
                    <td className="py-3 font-mono text-xs">{next ? formatDay(next) : "NOT ANNOUNCED"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ol className="filter-swap mt-4 divide-y divide-ink border-y border-ink md:hidden">
            {rows.map(({ uni, appStatus, next, primary }) => (
              <li key={uni.id}>
                <Link to="/universities/$id" params={{ id: uni.id }} className="block py-4">
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-display text-4xl font-bold uppercase leading-none">{uni.shortName}</span>
                    <StatusPill status={appStatus} />
                  </div>
                  <p className="mt-2 text-sm">{uni.name}</p>
                  <p className="mt-1 font-mono text-xs text-mute">
                    {TRACK_LABEL[uni.track].toUpperCase()} · {uni.city} · {next ? formatDay(next) : "NOT ANNOUNCED"} ·{" "}
                    {primary?.seats == null ? "SEATS NOT ON FILE" : `${primary.seats} SEATS`}
                  </p>
                </Link>
              </li>
            ))}
          </ol>
        </>
      ) : null}
    </div>
  );
}

function ViewStat({ k, v, hint }: { k: string; v: number; hint: string }) {
  return (
    <article className="border-ink border-r border-b p-4 md:border-b-0">
      <p className="font-display text-4xl font-bold leading-none">
        <CountUp value={v} />
      </p>
      <h2 className="mt-2 font-display text-lg font-semibold uppercase leading-none">{k}</h2>
      <p className="mt-1 font-mono text-xs text-mute">{hint}</p>
    </article>
  );
}
