import type { Circular, Confidence } from "@/data/types";
import { coachingExams, type CoachingExam } from "@/data/coaching";
import { monthMatrix, shiftMonth, toIcs, weekDays } from "@/lib/calendar-ics";
import { evidenceLabel, eventsFor, type RadarEvent } from "@/lib/status";

export { monthMatrix, shiftMonth, toIcs, weekDays };

export type CalendarKind = RadarEvent["kind"] | "other" | "coach-varsity" | "coach-eng";
export type EventTone = "accent" | "ink" | "mute" | "signal" | "varsity" | "eng";

export interface CalendarEvent {
  id: string;
  day: string;
  time: string | null;
  title: string;
  /** University short code or track label (e.g. KUET, VARSITY). */
  shortName: string | null;
  /** Action label without the uni prefix (e.g. Written test). */
  action: string;
  kind: CalendarKind;
  confidence: Confidence | "personal" | "reported";
  confidenceLabel: string;
  universityId: string | null;
  circularId: string | null;
  personal: boolean;
  completed: boolean;
  notes: string;
  remindDays: number | null;
  /** Up to 3 short requirement / desk lines for hover card. */
  reqLines: string[];
}

export function toneFor(kind: CalendarKind): EventTone {
  if (kind === "closes") return "accent";
  if (kind === "exam") return "ink";
  if (kind === "opens") return "mute";
  if (kind === "coach-varsity") return "varsity";
  if (kind === "coach-eng") return "eng";
  return "signal";
}

export function kindStamp(kind: CalendarKind): string {
  if (kind === "closes") return "END";
  if (kind === "exam") return "EXAM";
  if (kind === "opens") return "START";
  if (kind === "admit") return "ADMIT";
  if (kind === "coach-varsity" || kind === "coach-eng") return "MOCK";
  return "NOTE";
}

/** Glyph on the chip: ▲ end · ■ exam · ● open · ◆ coaching */
export function kindSymbol(kind: CalendarKind): string {
  if (kind === "closes") return "▲";
  if (kind === "exam") return "■";
  if (kind === "opens") return "●";
  if (kind === "coach-varsity" || kind === "coach-eng") return "◆";
  if (kind === "admit") return "●";
  return "●";
}

function reqLinesFor(circular: Circular): string[] {
  const lines: string[] = [];
  for (const row of circular.eligibility.slice(0, 3)) {
    const clean = row.trim();
    if (clean) lines.push(clean);
  }
  if (lines.length < 3 && circular.feeBdt != null) {
    lines.push(`Fee ৳${circular.feeBdt.toLocaleString("en-BD")}${circular.feeNote ? ` · ${circular.feeNote}` : ""}`);
  } else if (lines.length < 3 && circular.feeNote) {
    lines.push(circular.feeNote);
  }
  if (lines.length < 3 && circular.seats != null) {
    lines.push(`${circular.seats.toLocaleString("en-BD")} seats`);
  }
  if (lines.length === 0 && circular.summary) {
    lines.push(circular.summary.slice(0, 120));
  }
  return lines.slice(0, 3);
}

export function archiveEvents(circulars: Circular[], shortNames: Map<string, string>): CalendarEvent[] {
  return circulars.flatMap((circular) => {
    const short = shortNames.get(circular.universityId) ?? "RECORD";
    const req = reqLinesFor(circular);
    return eventsFor(circular).map((event) => ({
      id: event.id,
      day: event.day,
      time: event.time,
      title: `${short} · ${event.label}`,
      shortName: short,
      action: event.label,
      kind: event.kind as CalendarKind,
      confidence: circular.confidence,
      confidenceLabel: evidenceLabel(circular.confidence, circular.publication),
      universityId: circular.universityId,
      circularId: circular.id,
      personal: false,
      completed: false,
      notes: "",
      remindDays: null,
      reqLines: req,
    }));
  });
}

function phaseStamp(phase: CoachingExam["phase"]): string {
  if (phase === "paper") return "PAPER";
  if (phase === "subject") return "SUBJECT";
  if (phase === "model") return "MODEL";
  if (phase === "combined") return "COMBINED";
  return "SPECIAL";
}

/** Coaching routine events — Varsity (purple) + Engineering (blue). */
export function coachingCalendarEvents(): CalendarEvent[] {
  return coachingExams.map((row) => {
    const isVarsity = row.track === "varsity";
    const trackLabel = isVarsity ? "VARSITY" : "ENGINEERING";
    return {
      id: `coach-${row.id}`,
      day: row.day,
      time: row.time ?? null,
      title: `${trackLabel} · ${row.action}`,
      shortName: isVarsity ? "VARSITY" : "ENGG",
      action: row.action,
      kind: (isVarsity ? "coach-varsity" : "coach-eng") as CalendarKind,
      confidence: "reported",
      confidenceLabel: "COACHING ROUTINE",
      universityId: null,
      circularId: null,
      personal: false,
      completed: false,
      notes: "",
      remindDays: null,
      // Hover: track name + number distribution only
      reqLines: [trackLabel, row.marks],
    };
  });
}
