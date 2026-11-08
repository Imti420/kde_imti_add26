import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { PageHead, TextButton, controlClass } from "@/components/marks";
import type { PersonalEvent, PersonalEventKind } from "@/data/types";
import { archiveEvents, monthMatrix, shiftMonth, toIcs, toneFor, weekDays, type CalendarEvent } from "@/lib/calendar";
import { useCatalog } from "@/lib/catalog";
import { cn } from "@/lib/cn";
import { formatDay, relativeDay, todayISO } from "@/lib/dates";
import { usePersonal } from "@/lib/store";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/calendar")({
  head: () => ({ meta: [{ title: "Calendar — ADMISSION//26" }] }),
  component: CalendarPage,
});

const WEEKDAY_KEYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const;
const KINDS: { id: PersonalEventKind; label: string }[] = [
  { id: "closes", label: "Deadline" },
  { id: "exam", label: "Examination" },
  { id: "opens", label: "Application opens" },
  { id: "admit", label: "Admit card" },
  { id: "other", label: "Other" },
];

function CalendarPage() {
  const t = useT();
  const { circulars, byId } = useCatalog();
  const personal = usePersonal((s) => s.personalEvents);
  const shortlist = usePersonal((s) => s.shortlist);
  const hydrated = usePersonal((s) => s.hydrated);
  const addPersonalEvent = usePersonal((s) => s.addPersonalEvent);
  const updatePersonalEvent = usePersonal((s) => s.updatePersonalEvent);
  const deletePersonalEvent = usePersonal((s) => s.deletePersonalEvent);
  const today = todayISO();
  const [view, setView] = useState<"month" | "week" | "agenda">("month");
  const [cursor, setCursor] = useState(today);
  const [selected, setSelected] = useState(today);
  const [scope, setScope] = useState<"all" | "shortlist">("all");
  const [hideDone, setHideDone] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const names = useMemo(() => new Map([...byId.values()].map((uni) => [uni.id, uni.shortName])), [byId]);
  const events = useMemo(() => {
    const archive = archiveEvents(circulars, names).filter(
      (event) => scope === "all" || (event.universityId && shortlist.includes(event.universityId)),
    );
    const mine = personal
      .filter((event) => scope === "all" || !event.universityId || shortlist.includes(event.universityId))
      .filter((event) => (hideDone ? !event.completed : true))
      .map((event) => toCalendar(event, event.universityId ? (names.get(event.universityId) ?? null) : null));
    return [...archive, ...mine].sort((a, b) => a.day.localeCompare(b.day) || a.title.localeCompare(b.title));
  }, [circulars, names, personal, scope, shortlist, hideDone]);

  const year = Number(cursor.slice(0, 4));
  const month = Number(cursor.slice(5, 7)) - 1;
  const monthDays = monthMatrix(year, month);
  const week = weekDays(cursor);
  const monthKey = cursor.slice(0, 7);
  const visible =
    view === "month"
      ? events.filter((event) => event.day.startsWith(monthKey))
      : view === "week"
        ? events.filter((event) => week.includes(event.day))
        : events;
  const selectedEvents = events.filter((event) => event.day === selected);
  const active = events.find((event) => event.id === activeId) ?? null;
  const monthLabel = formatDay(`${monthKey}-01`).slice(3);

  const shift = (delta: number) => {
    if (view === "week") {
      const [y, m, d] = cursor.split("-").map(Number);
      const date = new Date(y ?? 2026, (m ?? 1) - 1, (d ?? 1) + delta * 7);
      setCursor(todayISO(date));
      return;
    }
    const next = shiftMonth(year, month, delta);
    setCursor(todayISO(new Date(next.year, next.month, 1)));
  };

  const pickDay = (day: string, firstId?: string | null) => {
    setSelected(day);
    setActiveId(firstId ?? null);
    setSheetOpen(true);
  };

  const download = () => {
    const blob = new Blob([toIcs(events)], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "admission26.ics";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="cal-page">
      <PageHead
        kicker={t("cal.kicker")}
        title={t("cal.title")}
        lede={t("cal.lede")}
        aside={
          <div className="flex flex-wrap gap-2">
            <TextButton tone="paper" onClick={download}>
              {t("cal.export")}
            </TextButton>
            <TextButton
              tone="ghost"
              onClick={() => {
                setCursor(today);
                setSelected(today);
                setSheetOpen(true);
              }}
            >
              {t("cal.today")}
            </TextButton>
          </div>
        }
      />

      {/* Sticky mobile-first control dock */}
      <div className="cal-dock sticky top-0 z-20 -mx-1 mb-3 border-[3px] border-ink bg-paper/95 px-2 py-2 shadow-[4px_4px_0_0_var(--color-ink)] backdrop-blur-md md:static md:mx-0 md:shadow-none md:backdrop-blur-none">
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous"
            className="cal-nav-btn"
            onClick={() => shift(-1)}
          >
            ‹
          </button>
          <div className="min-w-0 flex-1 text-center">
            <p className="font-display text-2xl font-bold uppercase leading-none tracking-tight md:text-3xl">
              {view === "week"
                ? `${formatDay(week[0] ?? cursor).slice(0, 6)} – ${formatDay(week[6] ?? cursor).slice(0, 6)}`
                : monthLabel}
            </p>
            <p className="mt-0.5 font-mono text-[10px] tracking-widest text-mute">
              {view === "agenda" ? `${visible.length} ${t("cal.events")}` : t(`cal.${view}`)}
            </p>
          </div>
          <button
            type="button"
            aria-label="Next"
            className="cal-nav-btn"
            onClick={() => shift(1)}
          >
            ›
          </button>
        </div>

        <div className="mt-2 flex gap-1 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {(["month", "week", "agenda"] as const).map((item) => (
            <button
              key={item}
              type="button"
              className={cn(
                "h-9 shrink-0 rounded-full border-2 px-3.5 font-display text-xs font-bold uppercase tracking-widest transition-colors",
                view === item ? "border-ink bg-ink text-paper" : "border-ink/40 bg-panel text-ink",
              )}
              onClick={() => setView(item)}
            >
              {t(`cal.${item}`)}
            </button>
          ))}
          <select
            className="h-9 shrink-0 rounded-full border-2 border-ink/40 bg-panel px-3 font-mono text-[11px] tracking-wide outline-none"
            value={scope}
            onChange={(event) => setScope(event.target.value as "all" | "shortlist")}
          >
            <option value="all">{t("cal.allDates")}</option>
            <option value="shortlist">{t("cal.shortlist")}</option>
          </select>
          <label className="flex h-9 shrink-0 items-center gap-1.5 rounded-full border-2 border-ink/40 bg-panel px-3 font-mono text-[11px] tracking-wide">
            <input
              type="checkbox"
              className="accent-accent"
              checked={hideDone}
              onChange={(event) => setHideDone(event.target.checked)}
            />
            {t("cal.hideDone")}
          </label>
        </div>
      </div>

      {/* Legend — compact chips */}
      <ul className="mb-3 flex flex-wrap gap-2 font-mono text-[10px] tracking-widest">
        <li className="inline-flex items-center gap-1.5 rounded-full border border-ink/20 bg-panel px-2 py-1">
          <i className="inline-block h-2.5 w-2.5 rounded-sm bg-accent" /> {t("cal.deadline")}
        </li>
        <li className="inline-flex items-center gap-1.5 rounded-full border border-ink/20 bg-panel px-2 py-1">
          <i className="inline-block h-2.5 w-2.5 rounded-sm bg-ink" /> {t("cal.exam")}
        </li>
        <li className="inline-flex items-center gap-1.5 rounded-full border border-ink/20 bg-panel px-2 py-1">
          <i className="inline-block h-2.5 w-2.5 rounded-sm bg-mute" /> {t("cal.opens")}
        </li>
        <li className="inline-flex items-center gap-1.5 rounded-full border border-ink/20 bg-panel px-2 py-1">
          <i className="inline-block h-2.5 w-2.5 rounded-sm bg-signal" /> {t("cal.admit")}
        </li>
      </ul>

      {/* MONTH VIEW — phone-first grid */}
      {view === "month" ? (
        <div className="cal-month overflow-hidden rounded-[1.1rem] border-[3px] border-ink bg-paper shadow-[5px_5px_0_0_var(--color-ink)]">
          <div className="grid grid-cols-7 border-b-2 border-ink bg-panel">
            {WEEKDAY_KEYS.map((key) => (
              <p
                key={key}
                className="py-2 text-center font-mono text-[11px] font-semibold tracking-widest text-mute"
              >
                {t(`cal.wd.${key}`)}
              </p>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {monthDays.map((day) => {
              const inMonth = day.startsWith(monthKey);
              const items = events.filter((event) => event.day === day);
              const isToday = day === today;
              const isSelected = selected === day;
              const count = items.length;
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => pickDay(day, items[0]?.id ?? null)}
                  className={cn(
                    "cal-day relative flex min-h-[3.35rem] flex-col items-center justify-start gap-0.5 border-b border-r border-ink/15 p-1 pt-1.5 transition-colors active:bg-yellow/40 md:min-h-[5.5rem] md:items-stretch md:p-1.5",
                    !inMonth && "bg-panel/60 text-mute",
                    isSelected && "z-[1] bg-yellow/30 ring-2 ring-inset ring-accent",
                    isToday && !isSelected && "bg-accent/5",
                  )}
                >
                  <span
                    className={cn(
                      "inline-flex h-7 w-7 items-center justify-center rounded-full font-mono text-sm font-bold tabular-nums md:h-8 md:w-8 md:text-base",
                      isToday && "bg-accent text-onaccent shadow-[2px_2px_0_0_var(--color-ink)]",
                      isSelected && !isToday && "bg-ink text-paper",
                    )}
                  >
                    {Number(day.slice(8))}
                  </span>
                  {/* Mobile: count badge */}
                  {count > 0 ? (
                    <span
                      className={cn(
                        "mt-0.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 font-mono text-[10px] font-bold leading-none md:hidden",
                        items.some((e) => toneFor(e.kind) === "accent")
                          ? "bg-accent text-onaccent"
                          : items.some((e) => toneFor(e.kind) === "ink")
                            ? "bg-ink text-paper"
                            : "bg-signal text-onaccent",
                      )}
                    >
                      {count}
                    </span>
                  ) : null}
                  {/* Desktop: chips */}
                  <span className="mt-1 hidden flex-col gap-0.5 md:flex">
                    {items.slice(0, 3).map((event) => (
                      <EventChip key={event.id} event={event} compact />
                    ))}
                    {count > 3 ? (
                      <span className="font-mono text-[10px] text-mute">+{count - 3}</span>
                    ) : null}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      {/* WEEK VIEW — horizontal snap on mobile */}
      {view === "week" ? (
        <div className="cal-week -mx-1 flex gap-2 overflow-x-auto px-1 pb-2 snap-x snap-mandatory md:mx-0 md:grid md:grid-cols-7 md:gap-px md:overflow-visible md:bg-ink md:p-0 md:snap-none">
          {week.map((day) => {
            const dayEvents = events.filter((event) => event.day === day);
            const isToday = day === today;
            const isSelected = selected === day;
            const wd = new Date(
              Number(day.slice(0, 4)),
              Number(day.slice(5, 7)) - 1,
              Number(day.slice(8)),
            ).getDay();
            return (
              <section
                key={day}
                className={cn(
                  "cal-week-card min-w-[78vw] shrink-0 snap-center rounded-[1rem] border-[3px] border-ink bg-paper p-3 shadow-[4px_4px_0_0_var(--color-ink)] md:min-w-0 md:rounded-none md:border-0 md:shadow-none md:p-2",
                  isToday && "ring-2 ring-accent ring-offset-2 ring-offset-paper",
                  isSelected && "bg-yellow/25",
                )}
              >
                <button
                  type="button"
                  className="flex w-full items-baseline justify-between gap-2"
                  onClick={() => pickDay(day, dayEvents[0]?.id ?? null)}
                >
                  <span className="font-mono text-[11px] tracking-widest text-mute">
                    {t(`cal.wdFull.${WEEKDAY_KEYS[wd] ?? "sun"}`)}
                  </span>
                  <span
                    className={cn(
                      "font-display text-3xl font-bold leading-none",
                      isToday && "text-accent",
                    )}
                  >
                    {Number(day.slice(8))}
                  </span>
                </button>
                <div className="mt-3 grid gap-1.5">
                  {dayEvents.length === 0 ? (
                    <p className="font-mono text-[11px] text-mute">{t("cal.noEvents")}</p>
                  ) : (
                    dayEvents.map((event) => (
                      <button
                        key={event.id}
                        type="button"
                        className="text-left"
                        onClick={() => {
                          setSelected(day);
                          setActiveId(event.id);
                          setSheetOpen(true);
                        }}
                      >
                        <EventChip event={event} />
                      </button>
                    ))
                  )}
                </div>
              </section>
            );
          })}
        </div>
      ) : null}

      {/* AGENDA VIEW */}
      {view === "agenda" ? (
        <ol className="cal-agenda divide-y-2 divide-ink overflow-hidden rounded-[1.1rem] border-[3px] border-ink bg-paper shadow-[5px_5px_0_0_var(--color-ink)]">
          {visible.length === 0 ? (
            <li className="px-4 py-6 text-sm text-mute">{t("cal.nothing")}</li>
          ) : null}
          {visible.map((event) => {
            const rel = relativeDay(event.day);
            return (
              <li key={event.id}>
                <button
                  type="button"
                  className="flex w-full flex-col gap-1 px-4 py-3.5 text-left active:bg-yellow/30 md:grid md:grid-cols-[7.5rem_1fr_auto] md:items-center md:gap-3"
                  onClick={() => {
                    setSelected(event.day);
                    setActiveId(event.id);
                    setSheetOpen(true);
                  }}
                >
                  <span className="flex items-center gap-2 font-mono text-[11px] tracking-wide">
                    <span className={cn("rounded-full px-2 py-0.5 font-bold", event.day === today ? "bg-accent text-onaccent" : "bg-panel text-mute")}>
                      {rel}
                    </span>
                    <span className="text-mute">{formatDay(event.day)}</span>
                  </span>
                  <span
                    className={cn(
                      "font-display text-xl font-bold uppercase leading-tight md:text-2xl",
                      event.completed && "line-through opacity-60",
                    )}
                  >
                    {event.title}
                  </span>
                  <span className="font-mono text-[10px] tracking-widest text-mute md:text-right">
                    {event.confidenceLabel}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      ) : null}

      {/* Selected day panel — always visible, sheet-like on mobile */}
      <div
        className={cn(
          "cal-sheet mt-4 overflow-hidden rounded-[1.1rem] border-[3px] border-ink bg-paper shadow-[5px_5px_0_0_var(--color-ink)]",
          !sheetOpen && view === "month" && "max-md:hidden",
        )}
      >
        <div className="flex items-center justify-between gap-2 border-b-2 border-ink bg-panel px-4 py-3">
          <div>
            <p className="font-mono text-[10px] tracking-widest text-mute">
              {selected === today ? t("common.today") : relativeDay(selected)}
            </p>
            <p className="font-display text-2xl font-bold uppercase leading-none">
              {formatDay(selected)}
            </p>
          </div>
          <button
            type="button"
            className="h-9 rounded-full border-2 border-ink px-3 font-mono text-[11px] tracking-widest md:hidden"
            onClick={() => setSheetOpen(false)}
          >
            {t("cal.close")}
          </button>
        </div>
        <div className="p-4">
          {selectedEvents.length === 0 ? (
            <p className="text-sm text-mute">{t("cal.noEventsDay")}</p>
          ) : (
            <ul className="divide-y divide-ink/20">
              {selectedEvents.map((event) => (
                <li key={event.id}>
                  <button
                    type="button"
                    className={cn(
                      "w-full py-3 text-left transition-colors",
                      activeId === event.id && "bg-yellow/20",
                    )}
                    onClick={() => setActiveId(event.id === activeId ? null : event.id)}
                  >
                    <EventChip event={event} />
                    <span className="mt-1 block font-mono text-[10px] tracking-widest text-mute">
                      {event.confidenceLabel}
                      {event.time ? ` · ${event.time}` : ""}
                    </span>
                  </button>
                  {active?.id === event.id ? <EventDetail event={event} /> : null}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Personal event form */}
      <div className="mt-5">
        <EventForm
          hydrated={hydrated}
          universities={[...byId.values()]}
          editing={active?.personal ? (personal.find((event) => event.id === active.id) ?? null) : null}
          defaultDay={selected}
          onCreate={addPersonalEvent}
          onUpdate={updatePersonalEvent}
          onDelete={deletePersonalEvent}
        />
      </div>
    </div>
  );
}

function EventDetail({ event }: { event: CalendarEvent }) {
  const t = useT();
  return (
    <div className="mt-2 rounded-xl border-2 border-ink/15 bg-panel p-3">
      <p className="font-display text-xl font-bold uppercase leading-none">{event.title}</p>
      <p className="mt-1.5 font-mono text-[10px] tracking-widest text-mute">{event.confidenceLabel}</p>
      {event.time ? (
        <p className="mt-1 font-mono text-xs">
          {event.time} · {t("cal.bdLocal")}
        </p>
      ) : null}
      {event.notes ? <p className="mt-2 text-sm leading-snug">{event.notes}</p> : null}
      <div className="mt-3 flex flex-wrap gap-3">
        {event.circularId ? (
          <Link
            to="/circulars/$id"
            params={{ id: event.circularId }}
            className="font-mono text-[11px] font-bold tracking-widest underline"
          >
            {t("cal.openCircular")}
          </Link>
        ) : null}
        {event.universityId ? (
          <Link
            to="/universities/$id"
            params={{ id: event.universityId }}
            className="font-mono text-[11px] font-bold tracking-widest underline"
          >
            {t("cal.openUniversity")}
          </Link>
        ) : null}
      </div>
    </div>
  );
}

function EventForm({
  hydrated,
  universities,
  editing,
  defaultDay,
  onCreate,
  onUpdate,
  onDelete,
}: {
  hydrated: boolean;
  universities: { id: string; shortName: string; name: string }[];
  editing: PersonalEvent | null;
  defaultDay: string;
  onCreate: (event: PersonalEvent) => void;
  onUpdate: (id: string, patch: Partial<PersonalEvent>) => void;
  onDelete: (id: string) => void;
}) {
  const t = useT();
  const [title, setTitle] = useState("");
  const [day, setDay] = useState(defaultDay);
  const [time, setTime] = useState("");
  const [kind, setKind] = useState<PersonalEventKind>("other");
  const [notes, setNotes] = useState("");
  const [remind, setRemind] = useState("");
  const [universityId, setUniversityId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash === "new-event") document.getElementById("new-event")?.scrollIntoView();
  }, []);

  useEffect(() => {
    if (!editing) {
      setDay(defaultDay);
      return;
    }
    setTitle(editing.title);
    setDay(editing.day);
    setTime(editing.time ?? "");
    setKind(editing.kind);
    setNotes(editing.notes);
    setRemind(editing.remindDays == null ? "" : String(editing.remindDays));
    setUniversityId(editing.universityId ?? "");
  }, [editing, defaultDay]);

  const clear = () => {
    setTitle("");
    setTime("");
    setNotes("");
    setRemind("");
    setUniversityId("");
    setKind("other");
    setError("");
  };

  return (
    <form
      id="new-event"
      className="overflow-hidden rounded-[1.1rem] border-[3px] border-ink bg-paper p-4 shadow-[5px_5px_0_0_var(--color-ink)]"
      onSubmit={(event) => {
        event.preventDefault();
        if (!title.trim() || !/^\d{4}-\d{2}-\d{2}$/.test(day)) {
          setError(t("cal.needTitle"));
          return;
        }
        if (editing) {
          onUpdate(editing.id, {
            title: title.trim(),
            day,
            time: time || null,
            kind,
            notes,
            remindDays: remind === "" ? null : Number(remind),
            universityId: universityId || null,
          });
        } else {
          onCreate({
            id: `p-${Date.now()}`,
            title: title.trim(),
            day,
            time: time || null,
            kind,
            notes,
            completed: false,
            remindDays: remind === "" ? null : Number(remind),
            universityId: universityId || null,
            circularId: null,
          });
          clear();
        }
        setError("");
      }}
    >
      <p className="font-display text-2xl font-bold uppercase leading-none">
        {editing ? t("cal.editEvent") : t("cal.addEvent")}
      </p>
      <p className="mt-1 font-mono text-[11px] tracking-widest text-mute">
        {t("cal.localOnly")}
      </p>
      {!hydrated ? (
        <p className="mt-3 font-mono text-xs text-mute">{t("cal.restoring")}</p>
      ) : null}
      <div className="mt-4 grid gap-3">
        <input
          className={controlClass}
          placeholder={t("cal.titlePh")}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <div className="grid grid-cols-2 gap-2">
          <input
            className={controlClass}
            type="date"
            value={day}
            onChange={(event) => setDay(event.target.value)}
          />
          <input
            className={controlClass}
            type="time"
            value={time}
            onChange={(event) => setTime(event.target.value)}
          />
        </div>
        <select
          className={controlClass}
          value={kind}
          onChange={(event) => setKind(event.target.value as PersonalEventKind)}
        >
          {KINDS.map((item) => (
            <option key={item.id} value={item.id}>
              {t(`cal.kind.${item.id}`)}
            </option>
          ))}
        </select>
        <select
          className={controlClass}
          value={universityId}
          onChange={(event) => setUniversityId(event.target.value)}
        >
          <option value="">{t("cal.noUni")}</option>
          {universities.map((uni) => (
            <option key={uni.id} value={uni.id}>
              {uni.shortName} — {uni.name}
            </option>
          ))}
        </select>
        <select
          className={controlClass}
          value={remind}
          onChange={(event) => setRemind(event.target.value)}
        >
          <option value="">{t("cal.noRemind")}</option>
          <option value="0">{t("cal.remind0")}</option>
          <option value="1">{t("cal.remind1")}</option>
          <option value="3">{t("cal.remind3")}</option>
          <option value="7">{t("cal.remind7")}</option>
        </select>
        <textarea
          className={`${controlClass} h-24 py-2`}
          placeholder={t("cal.notesPh")}
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
        />
        {error ? <p className="font-mono text-xs text-accent">{error}</p> : null}
        <div className="flex flex-wrap gap-2">
          <TextButton type="submit" disabled={!hydrated}>
            {editing ? t("cal.save") : t("cal.add")}
          </TextButton>
          {editing ? (
            <TextButton
              tone="paper"
              onClick={() => onUpdate(editing.id, { completed: !editing.completed })}
            >
              {editing.completed ? t("cal.markOpen") : t("cal.markDone")}
            </TextButton>
          ) : null}
          {editing ? (
            <TextButton
              tone="ghost"
              onClick={() => {
                if (confirm(t("cal.deleteConfirm"))) onDelete(editing.id);
              }}
            >
              {t("cal.delete")}
            </TextButton>
          ) : null}
        </div>
      </div>
    </form>
  );
}

function toCalendar(event: PersonalEvent, shortName: string | null): CalendarEvent {
  return {
    id: event.id,
    day: event.day,
    time: event.time,
    title: shortName ? `${shortName} · ${event.title}` : event.title,
    kind: event.kind,
    confidence: "personal",
    confidenceLabel: "PERSONAL DESK",
    universityId: event.universityId,
    circularId: event.circularId,
    personal: true,
    completed: event.completed,
    notes: event.notes,
    remindDays: event.remindDays,
  };
}

function EventChip({ event, compact }: { event: CalendarEvent; compact?: boolean }) {
  const tone = toneFor(event.kind);
  return (
    <span
      className={cn(
        "block truncate border-l-[3px] font-mono leading-snug",
        compact ? "px-1 text-[10px]" : "mt-0.5 px-1.5 py-0.5 text-xs",
        event.completed && "line-through opacity-60",
        tone === "accent" && "border-accent bg-accent/10",
        tone === "ink" && "border-ink bg-ink/5",
        tone === "mute" && "border-mute text-mute",
        tone === "signal" && "border-signal bg-signal/10 text-signal",
      )}
    >
      {event.title}
    </span>
  );
}
// deploy-bump 20261108160932
