import { TICKET_STATUS_LABEL, templateByKind, type TicketKind } from "@/data/tickets";
import type { UserTicket } from "@/lib/tickets-store";
import { TicketArt } from "@/components/ticket-art";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function fmtDate(v: string): string {
  if (!v) return "";
  const p = v.split("-");
  if (p.length < 3) return v;
  return `${Number(p[2])} ${MONTHS[Number(p[1]) - 1]} ${p[0]}`;
}

function fmtTime(v: string): string {
  if (!v) return "";
  const [hs, ms] = v.split(":");
  const h = Number(hs);
  return `${h % 12 || 12}:${ms} ${h >= 12 ? "PM" : "AM"}`;
}

function MetaRow({ label, value, empty }: { label: string; value: string; empty: string }) {
  return (
    <div>
      <span>{label}</span>
      <b className={value ? undefined : "e"}>{value || empty}</b>
    </div>
  );
}

export function TicketFace({
  kind,
  data,
  interactive,
  onOpen,
  face = "front",
}: {
  kind: TicketKind;
  data?: Pick<UserTicket, "name" | "appId" | "date" | "time" | "fee" | "status">;
  interactive?: boolean;
  onOpen?: () => void;
  /** back = pitch side used in dialog flip */
  face?: "front" | "back";
}) {
  const tpl = templateByKind(kind);
  const status = data?.status ?? "none";
  const feeRaw = data?.fee && data.fee !== "" ? data.fee : tpl.defaultFee;
  const hasFee = Boolean(feeRaw);
  const when = [fmtDate(data?.date ?? ""), fmtTime(data?.time ?? "")].filter(Boolean).join(", ");

  const inner =
    face === "back" ? (
      <div className="tk__in">
        <i className="tk__h" />
        <i className="tk__h r" />
        <div className="tk__top">
          <span className="tk__chip">ADMISSION//26</span>
          <span className="tk__one">WHY THIS TICKET?</span>
        </div>
        <div className="tkb">
          <div>
            <h4>{tpl.abbr}</h4>
            <ul>
              <li>Claim only if you will sit the exam.</li>
              <li>Portal login stays on this device.</li>
              <li>Fee and date are yours to fill.</li>
            </ul>
          </div>
          <div className="tkb__r">
            <div className="tkb__row">
              <span>STATUS</span>
              <b>{TICKET_STATUS_LABEL[status]}</b>
            </div>
            <div className="tkb__row">
              <span>FEE</span>
              <b>{hasFee ? `৳ ${feeRaw}` : "—"}</b>
            </div>
            <div className="tkb__row">
              <span>EXAM</span>
              <b>{when || "NOT ANNOUNCED"}</b>
            </div>
          </div>
        </div>
        <div className="tk__bc" />
      </div>
    ) : (
      <div className="tk__in">
        <div className="tk__art" aria-hidden>
          <TicketArt kind={kind} />
        </div>
        <div className="tk__wash" aria-hidden />
        <i className="tk__h" />
        <i className="tk__h r" />
        <div className="tk__top">
          <div className="tk__tl">
            <span className="tk__chip">ADMISSION//26</span>
            <span className="tk__one">ADMIT ONE</span>
          </div>
          <span className={`tk__stat tk__stat--${status}`}>{TICKET_STATUS_LABEL[status]}</span>
        </div>
        <div className="tk__abbr">{tpl.abbr}</div>
        <div className="tk__name">{tpl.name}</div>
        <span />
        <div className="tk__bot">
          <div>
            <div className="tk__meta">
              <MetaRow label="Candidate" value={data?.name ?? ""} empty="NOT ADDED" />
              <MetaRow label="Application ID" value={data?.appId ?? ""} empty="NOT ADDED" />
              <MetaRow label="Exam" value={when} empty="NOT ANNOUNCED" />
            </div>
            <div className="tk__bc" />
          </div>
          <div className={`tk__fee${hasFee && String(feeRaw).length > 4 ? " tk__fee--l" : ""}`}>
            <small>{hasFee ? "EXAM FEE ৳" : "FEE NOT PROVIDED"}</small>
            <b>
              //{hasFee ? feeRaw : <i className="tk__slot" />}
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
        {inner}
      </div>
    );
  }

  return <div className={`tk tk--${kind}${face === "back" ? " tk--back" : ""}`}>{inner}</div>;
}
