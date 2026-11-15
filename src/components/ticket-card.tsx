import { templateByKind, type TicketKind } from "@/data/tickets";
import type { UserTicket } from "@/lib/tickets-store";
import { TicketArt } from "@/components/ticket-art";

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
  const fee = (data?.fee && data.fee !== "" ? data.fee : tpl.defaultFee) || "1200";
  const tag =
    data?.status === "paid"
      ? "PAID"
      : data?.status === "await"
        ? "AWAITING"
        : data?.name
          ? data.name
          : "NOT PROVIDED";

  const body = (
    <>
      <span className="tk__punch" aria-hidden />
      <div className="tk__face">
        <div className="tk__copy">
          <p className="tk__brand">ADMISSION//26</p>
          <p className="tk__abbr">{tpl.abbr}</p>
          <p className="tk__uni">{tpl.name}</p>
          <span className="tk__tag">{tag}</span>
        </div>
        <div className="tk__scene" aria-hidden>
          <TicketArt kind={kind} />
        </div>
        <div className="tk__bar" aria-hidden />
        <p className="tk__fee">//{fee}</p>
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
