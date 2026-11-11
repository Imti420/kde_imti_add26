import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { AmendUniversity } from "@/components/amend";
import { NoteBox, ProgressSelect, RecordActions } from "@/components/actions";
import { Announced, EvidenceStamp, ExternalLink, SectionLabel, StatusPill } from "@/components/marks";
import { UniMark } from "@/components/uni-mark";
import { earliestExam } from "@/components/university-card";
import { campusVoice } from "@/data/voices";
import { SYSTEM_LABEL, TRACK_LABEL, type Circular } from "@/data/types";
import { blankCircular, useCatalog } from "@/lib/catalog";
import { circularDocState } from "@/lib/doc-state";
import { cn } from "@/lib/cn";
import { daysUntil, formatDay } from "@/lib/dates";
import { usePersonal } from "@/lib/store";
import { deriveStatus, eventsFor } from "@/lib/status";

export const Route = createFileRoute("/universities/$id")({
  head: ({ params }) => ({ meta: [{ title: `${params.id.toUpperCase()} — ADMISSION//26` }] }),
  component: UniversityPage,
});

type Phase = "missing" | "today" | "upcoming" | "expired";

function phaseOf(day: string | null): Phase {
  if (!day) return "missing";
  const n = daysUntil(day);
  if (n > 0) return "upcoming";
  if (n === 0) return "today";
  return "expired";
}

const PHASE_LABEL: Record<Phase, string> = {
  missing: "NOT ON FILE",
  today: "TODAY",
  upcoming: "UPCOMING",
  expired: "EXPIRED",
};

function PhaseMark({ day }: { day: string | null }) {
  const phase = phaseOf(day);
  return <span className={cn("phase", `phase-${phase}`)}>{PHASE_LABEL[phase]}</span>;
}

function UniversityPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const { universities, circulars } = useCatalog();
  const addCircular = usePersonal((s) => s.addCircular);
  const hideUniversity = usePersonal((s) => s.hideUniversity);
  const uni = universities.find((item) => item.id === id);
  if (!uni) {
    return (
      <div className="window">
        <div className="window-bar">Missing record</div>
        <div className="window-body">
          <h1 className="font-display text-5xl font-bold uppercase">Not in the directory</h1>
          <Link to="/universities" className="press mt-4">
            Back to all universities
          </Link>
        </div>
      </div>
    );
  }
  const related = circulars.filter((item) => item.universityId === uni.id);
  const primary = related[0] ?? null;
  const timeline = primary ? eventsFor(primary) : [];
  const examDay = earliestExam(primary);
  const voice = campusVoice(uni.id);
  const nameClass = uni.shortName.length >= 6 ? "text-5xl sm:text-7xl" : uni.shortName.length >= 4 ? "text-6xl sm:text-8xl" : "text-7xl sm:text-9xl";

  return (
    <article>
      <p className="font-mono text-xs tracking-widest text-mute">
        <Link to="/universities" className="underline underline-offset-4">
          ALL UNIVERSITIES
        </Link>
        {" / "}
        {uni.id.toUpperCase()}
      </p>

      <header className="window mt-4" data-track={uni.track}>
        <div className="window-bar">
          <span>
            {TRACK_LABEL[uni.track]} · {uni.city || "CITY NOT LOGGED"} · {uni.kind === "system" ? "SYSTEM" : "INSTITUTION"}
          </span>
          <span>{primary ? SYSTEM_LABEL[primary.system] : "CLUSTER NOT ON FILE"}</span>
        </div>
        <div className="window-body">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <p className="sticker">Campus commentary · not a fact</p>
            {primary ? <StatusPill status={deriveStatus(primary)} /> : <span className="phase phase-missing">NOT ANNOUNCED</span>}
          </div>
          <div className="mt-4 flex items-end gap-3">
            <UniMark uni={uni} size="lg" />
            <h1 className={cn("font-display font-bold uppercase leading-[0.8]", nameClass)}>{uni.shortName}</h1>
          </div>
          <p className="mt-3 max-w-3xl text-lg">{uni.name}</p>
          {uni.nameBn ? <p className="text-sm text-mute">{uni.nameBn}</p> : null}
          <p className="mt-4 max-w-3xl font-display text-3xl font-bold uppercase leading-none md:text-4xl">{voice}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {uni.website ? (
              <a className="press press-accent" href={uni.website} target="_blank" rel="noreferrer">
                Official site
              </a>
            ) : (
              <span className="press" aria-disabled="true">
                Site not listed
              </span>
            )}
            <Link to="/universities" className="press">
              Back to grid
            </Link>
          </div>
        </div>
      </header>

      <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Strip k="Seats" v={primary?.seats == null ? "—" : primary.seats.toLocaleString("en-BD")} note={primary?.seats == null ? "NOT YET VERIFIED" : "ON CIRCULAR"} />
        <Strip
          k="Closes"
          v={primary?.applicationCloses ? formatDay(primary.applicationCloses) : "—"}
          note={primary?.applicationCloses ? PHASE_LABEL[phaseOf(primary.applicationCloses)] : "NOT ON FILE"}
        />
        <Strip k="Exam" v={examDay ? formatDay(examDay) : "—"} note={examDay ? PHASE_LABEL[phaseOf(examDay)] : "NOT ON FILE"} />
        <Strip
          k="Fee"
          v={primary?.feeBdt == null ? "—" : `৳${primary.feeBdt.toLocaleString("en-BD")}`}
          note={primary?.feeBdt == null ? "NOT ANNOUNCED" : primary.feeNote || "ON CIRCULAR"}
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2 rounded-2xl border-[3px] border-ink bg-panel p-3">
        {uni.admissionUrl ? (
          <a
            href={uni.admissionUrl}
            target="_blank"
            rel="noreferrer"
            className="press bg-accent text-onaccent font-mono text-xs tracking-widest uppercase"
          >
            Official portal ↗
          </a>
        ) : (
          <span className="font-mono text-xs text-mute">PORTAL NOT ON FILE</span>
        )}
        {primary && circularDocState(primary) !== "none" ? (
          <Link
            to="/circulars/$id/pdf"
            params={{ id: primary.id }}
            className="press min-h-11 bg-ink px-3 font-mono text-xs tracking-widest uppercase text-paper"
          >
            Read circular
          </Link>
        ) : (
          <span className="font-mono text-xs text-mute">NO PDF PUBLISHED</span>
        )}
        {primary ? (
          <Link
            to="/circulars/$id"
            params={{ id: primary.id }}
            className="press font-mono text-xs tracking-widest uppercase"
          >
            Open circular page →
          </Link>
        ) : null}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <RecordActions universityId={uni.id} circularId={primary?.id} />
        <button
          type="button"
          className="press"
          onClick={() => {
            const circular = blankCircular(uni.id, `${uni.shortName} admission 2026–27`);
            addCircular(circular);
            void navigate({ to: "/circulars/$id", params: { id: circular.id } });
          }}
        >
          Log a circular
        </button>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="space-y-6">
          <section className="window">
            <div className="window-bar">
              <span>Admission · dates on file</span>
            </div>
            <div className="window-body">
              <SectionLabel>The window</SectionLabel>
              {primary ? <DateBoard circular={primary} /> : <p className="mt-3 text-sm">No notice is on file. Opening, closing, admit card, test, result and fee are not announced in this archive.</p>}
              {timeline.length ? (
                <ol className="mt-4 border-t border-ink">
                  {timeline.map((event, index) => (
                    <li key={event.id} className="grid grid-cols-[2rem_1fr_auto] items-baseline gap-3 border-b border-ink py-3">
                      <span className="font-mono text-xs text-mute">{String(index + 1).padStart(2, "0")}</span>
                      <span>
                        <span className="block font-display text-2xl font-bold uppercase leading-none">{event.label}</span>
                        <Announced day={event.day} time={event.time} />
                      </span>
                      <PhaseMark day={event.day} />
                    </li>
                  ))}
                </ol>
              ) : null}
              {related.length ? (
                <ul className="mt-4 space-y-3">
                  {related.map((item) => (
                    <li key={item.id} className="border-t border-ink pt-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <StatusPill status={deriveStatus(item)} />
                        <EvidenceStamp circular={item} />
                      </div>
                      <h3 className="mt-2 font-display text-3xl font-bold uppercase leading-none">
                        <Link to="/circulars/$id" params={{ id: item.id }} className="hover:text-accent">
                          {item.title}
                        </Link>
                      </h3>
                      <p className="mt-2 max-w-3xl text-sm text-pretty">{item.summary}</p>
                      {circularDocState(item) !== "none" ? (
                        <p className="mt-2 flex flex-wrap gap-3 font-mono text-xs">
                          <Link to="/circulars/$id/pdf" params={{ id: item.id }} className="underline underline-offset-4">
                            Read in app →
                          </Link>
                          {(item.doc?.originalUrl ?? item.pdfUrl) ? (
                            <ExternalLink href={(item.doc?.originalUrl ?? item.pdfUrl)!}>Official source</ExternalLink>
                          ) : null}
                        </p>
                      ) : (
                        <p className="mt-2 font-mono text-xs text-mute">NO PDF PUBLISHED</p>
                      )}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </section>

          <section className="window">
            <div className="window-bar">
              <span>Seats and subjects</span>
              <span>{primary?.seats == null ? "Seats not verified" : "Seats on circular"}</span>
            </div>
            <div className="window-body">
              <p className="font-mono text-xs tracking-widest text-mute">TOTAL SEATS</p>
              <p className={cn("seat-num", primary?.seats == null && "text-mute")}>
                {primary?.seats == null ? "—" : primary.seats.toLocaleString("en-BD")}
              </p>
              <p className="mt-2 max-w-xl text-sm">
                {primary?.seats == null
                  ? "No verified seat total is stored. This page will not estimate one."
                  : "Taken from the circular on file. Not a guess."}
              </p>
              <div className="mt-5">
                <p className="font-mono text-xs tracking-widest text-mute">UNITS AND SUBJECTS</p>
                {primary && primary.units.length ? (
                  <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                    {primary.units.map((unit) => (
                      <li key={unit.code} className="rounded-2xl border-[3px] border-ink p-3">
                        <p className="font-display text-4xl font-bold uppercase leading-none">{unit.code}</p>
                        <p className="mt-2 text-sm">{unit.detail || "Detail not on file."}</p>
                        <p className="mt-2 font-mono text-xs text-mute">
                          {unit.examDate ? formatDay(unit.examDate) : "EXAM NOT ON FILE"}
                          {unit.centre ? ` · ${unit.centre}` : ""}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 rounded-2xl border-[3px] border-dashed border-ink p-4 text-sm">
                    Unit-wise seats, faculties and departments are not yet verified for this record.
                  </p>
                )}
              </div>
              <details className="mt-4 rounded-2xl border-[3px] border-ink">
                <summary className="cursor-pointer px-3 py-3 font-display text-xl font-bold uppercase">Eligibility</summary>
                <div className="border-t-[3px] border-ink px-3 py-3">
                  {primary && primary.eligibility.length ? (
                    <ul className="list-disc space-y-2 pl-5 text-sm">
                      {primary.eligibility.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="font-mono text-sm text-mute">NOT ANNOUNCED</p>
                  )}
                </div>
              </details>
            </div>
          </section>

          <section className="window">
            <div className="window-bar">
              <span>Campus culture</span>
            </div>
            <div className="window-body grid gap-3">
              <article className="rounded-2xl border-[3px] border-ink bg-yellow p-4 text-onyellow">
                <p className="font-mono text-xs tracking-widest">COMMUNITY COMMENTARY · NOT VERIFIED</p>
                <p className="mt-2 font-display text-3xl font-bold uppercase leading-none">{voice}</p>
                <p className="mt-2 text-sm">A browsing line. It is not an official description and it is not a fact.</p>
              </article>
              <article className="rounded-2xl border-[3px] border-ink p-4">
                <p className="font-mono text-xs tracking-widest text-mute">ARCHIVE NOTE</p>
                <p className="mt-2 text-sm text-pretty">{uni.directoryNote || "No directory note is stored."}</p>
              </article>
              <article className="rounded-2xl border-[3px] border-dashed border-ink p-4">
                <p className="font-mono text-xs tracking-widest text-mute">SOURCED CAMPUS PROFILE</p>
                <p className="mt-2 text-sm">
                  Clubs, debate societies, campus traditions and student life are not stored for this institution yet. This
                  archive will not invent them.
                </p>
              </article>
            </div>
          </section>
        </div>

        <aside className="window h-fit">
          <div className="window-bar">
            <span>Record</span>
          </div>
          <div className="window-body space-y-3 text-sm">
            <Fact label="Application status">{primary ? <StatusPill status={deriveStatus(primary)} /> : "NOT ANNOUNCED"}</Fact>
            <Fact label="Opens">
              <Announced day={primary?.applicationOpens ?? null} time={primary?.opensAt} /> <PhaseMark day={primary?.applicationOpens ?? null} />
            </Fact>
            <Fact label="Closes">
              <Announced day={primary?.applicationCloses ?? null} time={primary?.closesAt} />{" "}
              <PhaseMark day={primary?.applicationCloses ?? null} />
            </Fact>
            <Fact label="Admit card">
              <Announced day={primary?.admitCardOn ?? null} /> <PhaseMark day={primary?.admitCardOn ?? null} />
            </Fact>
            <Fact label="Result">
              <Announced day={primary?.resultOn ?? null} /> <PhaseMark day={primary?.resultOn ?? null} />
            </Fact>
            <Fact label="Fee">
              {primary?.feeBdt == null ? (
                <span className="font-mono text-sm text-mute">NOT ANNOUNCED</span>
              ) : (
                <span className="font-mono text-sm">BDT {primary.feeBdt.toLocaleString("en-BD")}</span>
              )}
            </Fact>
            <Fact label="Official website">
              {uni.website ? <ExternalLink href={uni.website}>{uni.website.replace(/^https?:\/\//, "")}</ExternalLink> : "NOT LISTED"}
            </Fact>
            <Fact label="Application portal">
              {uni.admissionUrl ? (
                <ExternalLink href={uni.admissionUrl}>{uni.admissionUrl.replace(/^https?:\/\//, "")}</ExternalLink>
              ) : (
                <span className="font-mono text-sm text-mute">NOT ANNOUNCED</span>
              )}
            </Fact>
            {primary?.sources.length ? (
              <div>
                <p className="font-mono text-xs tracking-widest text-mute">SOURCES</p>
                <ul className="mt-1 space-y-1">
                  {primary.sources.map((source) => (
                    <li key={source.url}>
                      <ExternalLink href={source.url}>{source.label}</ExternalLink>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </aside>
      </div>

      <section className="window mt-8">
        <div className="window-bar">
          <span>This computer · your desk</span>
        </div>
        <div className="window-body grid gap-6">
          <NoteBox id={uni.id} label="Personal note — stays on this computer" />
          {primary ? (
            <label className="max-w-sm">
              <span className="font-mono text-xs tracking-widest text-mute">APPLICATION PROGRESS</span>
              <ProgressSelect id={primary.id} />
            </label>
          ) : null}
          <AmendUniversity university={uni} />
          <button
            type="button"
            className="press text-accent"
            onClick={() => {
              if (confirm(`Hide ${uni.shortName} from this desk?`)) {
                hideUniversity(uni.id);
                void navigate({ to: "/universities" });
              }
            }}
          >
            Hide from directory
          </button>
        </div>
      </section>
    </article>
  );
}

function DateBoard({ circular }: { circular: Circular }) {
  const rows = [
    ["Applications open", circular.applicationOpens],
    ["Applications close", circular.applicationCloses],
    ["Admit card", circular.admitCardOn],
    ["Examination", circular.examDate],
    ["Result", circular.resultOn],
    ["Classes begin", circular.classesBegin],
  ] as const;
  return (
    <ul className="mt-4 grid gap-2 sm:grid-cols-2">
      {rows.map(([label, day]) => (
        <li key={label} className="flex items-center justify-between gap-3 rounded-xl border-2 border-ink px-3 py-2">
          <span>
            <span className="block font-mono text-xs tracking-widest text-mute">{label.toUpperCase()}</span>
            <span className={cn("font-display text-2xl font-bold uppercase leading-none", !day && "text-mute")}>
              {day ? formatDay(day) : "—"}
            </span>
          </span>
          <PhaseMark day={day} />
        </li>
      ))}
    </ul>
  );
}

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="font-mono text-xs tracking-widest text-mute">{label.toUpperCase()}</p>
      <div className="mt-1 flex flex-wrap items-center gap-2">{children}</div>
    </div>
  );
}

function Strip({ k, v, note }: { k: string; v: string; note: string }) {
  return (
    <div className="window">
      <div className="window-body">
        <p className="font-mono text-xs tracking-widest text-mute">{k.toUpperCase()}</p>
        <p className={cn("mt-2 font-display text-2xl font-bold uppercase leading-none md:text-3xl", v === "—" && "text-mute")}>{v}</p>
        <p className="mt-2 font-mono text-xs text-mute">{note}</p>
      </div>
    </div>
  );
}
