import { Link } from "@tanstack/react-router";
import { StatusPill } from "@/components/marks";
import { campusVoice } from "@/data/voices";
import { SYSTEM_LABEL, TRACK_LABEL, type AppStatus, type Circular, type University } from "@/data/types";
import { cn } from "@/lib/cn";
import { daysUntil, formatDay } from "@/lib/dates";

const FEATURE = new Set(["du", "buet", "ru", "sust", "gst", "dghs"]);

export function earliestExam(circular: Circular | null): string | null {
  if (!circular) return null;
  const days = [...circular.units.map((unit) => unit.examDate), circular.examDate].filter((day): day is string => Boolean(day));
  if (!days.length) return null;
  return [...days].sort()[0] ?? null;
}

function shortDay(iso: string | null): string {
  if (!iso) return "";
  return formatDay(iso).replace(/ \d{4}$/, "");
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
      <span className={cn("uni-card-name", nameClass)}>{uni.shortName}</span>
      <span className="uni-card-full">{uni.name}</span>
      <span className="uni-card-side">{uni.city || "CITY NOT LOGGED"}</span>
      <span className="uni-card-facts">
        <StatusPill status={status} />
        {system ? <span className="uni-fact">{system}</span> : <span className="uni-fact">Cluster not on file</span>}
        {closes ? <span className={cn("uni-fact", hot && "uni-fact-hot")}>Closes {shortDay(closes)}</span> : null}
        {exam ? <span className="uni-fact">Exam {shortDay(exam)}</span> : null}
        <span className="uni-fact">{seats == null ? "Seats not on file" : `${seats.toLocaleString("en-BD")} seats`}</span>
        {primary?.pdfUrl ? <span className="uni-fact uni-fact-hot">CIRCULAR ✓</span> : <span className="uni-fact">NO CIRCULAR</span>}
        {uni.admissionUrl ? <span className="uni-fact uni-fact-hot">PORTAL ✓</span> : <span className="uni-fact">NO PORTAL</span>}
      </span>
      <span className="uni-card-tease">
        <span className="uni-card-line">{campusVoice(uni.id)}</span>
        <span className="uni-card-go">OPEN PROFILE →</span>
      </span>
    </Link>
  );
}
