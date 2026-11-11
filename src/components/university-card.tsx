import { Link } from "@tanstack/react-router";
import { EvidenceStamp, StatusPill } from "@/components/marks";
import { campusVoice } from "@/data/voices";
import { UniMark } from "@/components/uni-mark";
import { circularDocState } from "@/lib/doc-state";
import { SYSTEM_LABEL, TRACK_LABEL, type AppStatus, type Circular, type University } from "@/data/types";
import { cn } from "@/lib/cn";
import { daysUntil, formatDay } from "@/lib/dates";

const FEATURE = new Set(["du", "buet", "ru", "sust", "gst", "dghs"]);

export function earliestExam(circular: Circular | null): string | null {
  if (!circular) return null;
  const days = [...circular.units.map((unit) => unit.examDate), circular.examDate].filter(
    (day): day is string => Boolean(day),
  );
  if (!days.length) return null;
  return [...days].sort()[0] ?? null;
}

function shortDay(iso: string | null): string {
  if (!iso) return "";
  return formatDay(iso).replace(/ \d{4}$/, "");
}

function closeLabel(closes: string | null, closeDays: number | null): string | null {
  if (!closes) return null;
  if (closeDays == null) return `Closes ${shortDay(closes)}`;
  if (closeDays < 0) return `Closed ${shortDay(closes)}`;
  if (closeDays === 0) return "Closes today";
  if (closeDays === 1) return "Closes tomorrow";
  if (closeDays <= 14) return `${closeDays}d left · ${shortDay(closes)}`;
  return `Closes ${shortDay(closes)}`;
}

export function UniversityCard({
  uni,
  related,
  status,
  index,
}: {
  uni: University;
  related: Circular[];
  status: AppStatus;
  index: number;
}) {
  const primary = related[0] ?? null;
  const seats = primary?.seats ?? null;
  const exam = earliestExam(primary);
  const closes = primary?.applicationCloses ?? null;
  const closeDays = closes ? daysUntil(closes) : null;
  const hot = status === "open" || (closeDays != null && closeDays >= 0 && closeDays <= 14);
  const nameClass = uni.shortName.length >= 6 ? "is-long" : uni.shortName.length >= 4 ? "is-mid" : "";
  const system = primary ? SYSTEM_LABEL[primary.system] : null;
  const closeText = closeLabel(closes, closeDays);
  const voice = campusVoice(uni.id);

  return (
    <Link
      to="/universities/$id"
      params={{ id: uni.id }}
      aria-label={`Open ${uni.shortName} profile, ${uni.name}`}
      data-track={uni.track}
      className={cn("uni-card", FEATURE.has(uni.id) && "uni-card-feature", index < 12 && "rise")}
      style={index < 12 ? { animationDelay: `${index * 42}ms` } : undefined}
    >
      <span className="uni-card-kicker">
        <span>{TRACK_LABEL[uni.track]}</span>
        <span>{String(index + 1).padStart(2, "0")}</span>
      </span>

      <UniMark uni={uni} size="sm" className="mb-2" />
      <span className={cn("uni-card-name", nameClass)}>{uni.shortName}</span>
      <span className="uni-card-full">{uni.name}</span>
      <span className="uni-card-side">{uni.city || "CITY NOT LOGGED"}</span>

      {/* Status + confidence — always first in the fact row */}
      <span className="uni-card-facts" aria-label="Status and key dates">
        <StatusPill status={status} />
        {primary ? <EvidenceStamp circular={primary} /> : null}
        {closeText ? (
          <span className={cn("uni-fact", hot && "uni-fact-hot")}>{closeText}</span>
        ) : (
          <span className="uni-fact">Apps not dated</span>
        )}
        {exam ? <span className="uni-fact">Exam {shortDay(exam)}</span> : null}
        <span className="uni-fact">
          {seats == null ? "Seats not on file" : `${seats.toLocaleString("en-BD")} seats`}
        </span>
        {system ? <span className="uni-fact">{system}</span> : null}
        {primary && circularDocState(primary) !== "none" ? (
          <span className="uni-fact uni-fact-hot">PDF ✓</span>
        ) : primary ? (
          <span className="uni-fact">NO PDF</span>
        ) : (
          <span className="uni-fact">NO CIRCULAR</span>
        )}
        {uni.admissionUrl ? (
          <span className="uni-fact uni-fact-hot">PORTAL ✓</span>
        ) : (
          <span className="uni-fact">NO PORTAL</span>
        )}
      </span>

      {/*
        Street voice ALWAYS visible.
        CSS hides .uni-card-tease until hover on fine pointers — override so
        people’s-thought lines never disappear on desktop or phone.
      */}
      <span
        className="uni-card-tease"
        style={{
          maxHeight: "none",
          marginTop: "0.9rem",
          paddingTop: "0.7rem",
          opacity: 1,
          overflow: "visible",
          borderTopColor: "var(--color-ink)",
        }}
      >
        <span className="uni-card-line">{voice}</span>
        <span className="uni-card-go">OPEN PROFILE →</span>
      </span>
    </Link>
  );
}
