import { templateByKind, type TicketKind } from "@/data/tickets";
import type { UserTicket } from "@/lib/tickets-store";

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

  const body = (
    <div className="tk__card">
      <span className="tk__notch" aria-hidden />
      <div className="tk__stripe" aria-hidden />
      <div className="tk__main">
        <p className="tk__abbr">{tpl.abbr}</p>
        <p className="tk__uni">{tpl.name}</p>
      </div>
      <p className="tk__fee">//{fee}</p>
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
