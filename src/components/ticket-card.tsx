import { TICKET_STATUS_LABEL, templateByKind, type TicketKind, type TicketStatus } from "@/data/tickets";
import type { UserTicket } from "@/lib/tickets-store";
import { TicketArt } from "@/components/ticket-art";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function fmtDate(v?: string): string {
  if (!v) return "";
  const p = v.split("-");
  if (p.length < 3) return v;
  return `${+p[2]} ${MONTHS[+p[1] - 1]} ${p[0]}`;
}

function fmtTime(v?: string): string {
  if (!v) return "";
  const [hs, ms] = v.split(":");
  const h = +hs;
  const ap = h >= 12 ? "PM" : "AM";
  return `${h % 12 || 12}:${ms} ${ap}`;
}

function serialOf(kind: TicketKind): string {
  const order: TicketKind[] = [
    "kuet", "du", "ru", "jnu", "duet", "gst", "cu", "sust", "cou", "ruet", "bup", "mat", "buet", "cuet", "mist", "ju",
  ];
  const i = order.indexOf(kind);
  return String(i >= 0 ? i + 1 : 99).padStart(2, "0");
}

export function TicketFace({
  kind,
  data,
  interactive,
  onOpen,
}: {
  kind: TicketKind;
  data?: Pick<UserTicket, "name" | "appId" | "date" | "time" | "fee" | "status">;
  interactive?: boolean;
  onOpen?: () => void;
}) {
  const tpl = templateByKind(kind);
  const status: TicketStatus = data?.status ?? "none";
  const fee = data?.fee && data.fee !== "" ? data.fee : "";
  const hasFee = fee !== "";
  const when = [fmtDate(data?.date), fmtTime(data?.time)].filter(Boolean).join(", ");
  const feeLong = hasFee && String(fee).length > 4;

  const body = (
    <div className="tk__in">
      <div className="tk__art" aria-hidden>
        <TicketArt kind={kind} />
      </div>
      <div className="tk__wash" aria-hidden />
      <i className="tk__h" aria-hidden />
      <i className="tk__h tk__h--r" aria-hidden />

      <div className="tk__top">
        <div className="tk__tl">
          <span className="tk__chip">ADMISSION//26</span>
          <span className="tk__one">ADMIT ONE ★ No.{serialOf(kind)}</span>
        </div>
        <span className={`tk__stat tk__stat--${status}`}>{TICKET_STATUS_LABEL[status]}</span>
      </div>

      <div className="tk__abbr">{tpl.abbr}</div>
      <div className="tk__name">{tpl.name}</div>

      <div className="tk__bot">
        <div>
          <div className="tk__meta">
            <div>
              <span>Candidate</span>
              <b className={data?.name ? undefined : "e"}>{data?.name || "NOT ADDED"}</b>
            </div>
            <div>
              <span>Application ID</span>
              <b className={data?.appId ? undefined : "e"}>{data?.appId || "NOT ADDED"}</b>
            </div>
            <div>
              <span>Exam</span>
              <b className={when ? undefined : "e"}>{when || "NOT ANNOUNCED"}</b>
            </div>
          </div>
          <div className="tk__bc" aria-hidden />
        </div>
        <div className={`tk__fee${feeLong ? " tk__fee--l" : ""}`}>
          <small>{hasFee ? "EXAM FEE ৳" : "FEE NOT PROVIDED"}</small>
          <b>
            //{hasFee ? fee : <i className="tk__slot" aria-hidden />}
          </b>
        </div>
      </div>
    </div>
  );

  if (interactive) {
    return (
      <div
        className={`tk tk--${kind}`}
        role="button"
        tabIndex={0}
        aria-label={`Open ${tpl.abbr} ticket`}
        onClick={onOpen}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpen?.();
          }
        }}
      >
        {body}
      </div>
    );
  }

  return <div className={`tk tk--${kind}`}>{body}</div>;
}
