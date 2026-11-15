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
  const ap = h >= 12 ? "PM" : "AM";
  return `${h % 12 || 12}:${ms} ${ap}`;
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="tk__row">
      <span>{label}</span>
      <b className={value ? undefined : "is-empty"}>{value || "————"}</b>
    </div>
  );
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
  const status = data?.status ?? "none";
  const fee = (data?.fee && data.fee !== "" ? data.fee : tpl.defaultFee) || "1200";
  const whenDate = fmtDate(data?.date ?? "");
  const whenTime = fmtTime(data?.time ?? "");

  const body = (
    <>
      <span className="tk__notch tk__notch--l" aria-hidden />
      <span className="tk__notch tk__notch--r" aria-hidden />
      <div className="tk__shell">
        <div className="tk__left">
          <div className="tk__brand-row">
            <span className="tk__brand">ADMISSION//26</span>
            <span className={`tk__pill tk__pill--${status}`}>{TICKET_STATUS_LABEL[status]}</span>
          </div>
          <p className="tk__abbr">{tpl.abbr}</p>
          <p className="tk__uni">{tpl.name}</p>
          <div className="tk__fields">
            <Field label="Name" value={data?.name ?? ""} />
            <Field label="App ID" value={data?.appId ?? ""} />
            <Field label="Date" value={whenDate} />
            <Field label="Time" value={whenTime} />
          </div>
        </div>
        <div className="tk__right">
          <div className="tk__art" aria-hidden>
            <TicketArt kind={kind} />
          </div>
          <div className="tk__barcode" aria-hidden />
          <p className="tk__fee">/{fee}</p>
        </div>
      </div>
    </>
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
