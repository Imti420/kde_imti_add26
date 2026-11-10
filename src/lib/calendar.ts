import type { Circular, Confidence } from "@/data/types";
import { monthMatrix, shiftMonth, toIcs, weekDays } from "@/lib/calendar-ics";
import { evidenceLabel, eventsFor, type RadarEvent } from "@/lib/status";

export { monthMatrix, shiftMonth, toIcs, weekDays };

export type CalendarKind = RadarEvent["kind"] | "other";
export type EventTone = "accent" | "ink" | "mute" | "signal";

export interface CalendarEvent {
  id: string;
  day: string;
  time: string | null;
  title: string;
  /** University short code for chip display (e.g. KUET, DU). */
  shortName: string | null;
  /** Action label without the uni prefix (e.g. Written test). */
  action: string;
  kind: CalendarKind;
  confidence: Confidence | "personal";
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
  return "signal";
}

export function kindStamp(kind: CalendarKind): string {
  if (kind === "closes") return "CLOSE";
  if (kind === "exam") return "TEST";
  if (kind === "opens") return "OPEN";
  if (kind === "admit") return "ADMIT";
  return "NOTE";
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
      kind: event.kind,
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
