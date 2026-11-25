import { TICKET_STATUS_LABEL, templateByKind, type TicketKind } from "@/data/tickets";
import type { UserTicket } from "@/lib/tickets-store";
import { TicketArt } from "@/components/ticket-art";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Linux-desk humour + real warnings for the ticket back. */
const TICKET_BACK: Record<
  string,
  { tag: string; lines: string[]; joke: string }
> = {
  du: {
    tag: "WARN // du.ac.bd ≠ this card",
    lines: [
      "This is a desk stub, not an admit card.",
      "Portal login lives only on this device.",
      "Miss 28 Nov and hyprctl can't save you.",
    ],
    joke: 'echo "I read the circular" | grep -c true  # be honest',
  },
  buet: {
    tag: "WARN // GPA wall is load-bearing",
    lines: [
      "Shortlist is ruthless — Math+Physics+Chem.",
      "Fee day ≠ form day. Pay before the cut.",
      "1 Feb test. Calendar it like a kernel freeze.",
    ],
    joke: "sudo make admit  # dependency: sleep, past papers",
  },
  kuet: {
    tag: "WARN // three centres, one deadline",
    lines: [
      "Khulna / Dhaka / Rajshahi — pick before you pay.",
      "Claim only if you will actually sit.",
      "Centre fee differs. RTFM the portal.",
    ],
    joke: "git commit -m \"applied to KUET\" --no-verify",
  },
  ju: {
    tag: "WARN // no Fri/Sat tests (usually)",
    lines: [
      "Campus-only vibe. Plan the trip.",
      "Units stack mid-January — clash map matters.",
      "Fee is cheap. Overconfidence is not.",
    ],
    joke: "hyprctl dispatch workspace exam",
  },
  jnu: {
    tag: "WARN // regular students only",
    lines: [
      "Second-time applicants: the door is closed.",
      "Five units, five Saturdays. Choose wisely.",
      "This face is not your admit card.",
    ],
    joke: "rm -rf /regret  # permission denied until you study",
  },
  gst: {
    tag: "WARN // twenty unis, one cluster",
    lines: [
      "GST is a system ticket — not a single campus.",
      "Seat math lives in the cluster circular.",
      "Don't invent deadlines. Wait for the notice.",
    ],
    joke: "for u in $(seq 1 20); do echo panic; done",
  },
  mat: {
    tag: "WARN // DGME owns the clock",
    lines: [
      "Medical circular still the source of truth.",
      "No formal PDF on this desk? Don't guess fees.",
      "18 Dec line is press until DGME stamps it.",
    ],
    joke: "curl -I https://hope | grep 200  # may 404",
  },
  agri: {
    tag: "WARN // nine farms, one test",
    lines: [
      "Agricultural cluster — not a single BA ticket.",
      "App window is short. Mark 15 Dec close.",
      "Coordinator campus can shift year to year.",
    ],
    joke: "crop --fail-open  # not a CLI, a lifestyle",
  },
  mist: {
    tag: "WARN // uniform optional, discipline not",
    lines: [
      "Unit fees differ (A / A+B / C).",
      "Confirm exam days on mist.ac.bd — desk can lag.",
      "This ticket is localStorage, not a barracks pass.",
    ],
    joke: "systemctl start grind.service",
  },
  default: {
    tag: "WARN // kdeimti vault · local only",
    lines: [
      "Claim only if you will sit the exam.",
      "Portal login stays on this device.",
      "Fee and date are yours to fill — we don't invent.",
    ],
    joke: "man admission  # no manual entry; read the circular",
  },
};

function backCopy(kind: TicketKind) {
  return TICKET_BACK[kind] ?? TICKET_BACK.default;
}

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
  const back = backCopy(kind);

  const inner =
    face === "back" ? (
      <div className="tk__in tk__in--back">
        <div className="tk__art" aria-hidden>
          <TicketArt kind={kind} />
        </div>
        <div className="tk__grid" aria-hidden />
        <div className="tk__wash tk__wash--back" aria-hidden />
        <i className="tk__h" />
        <i className="tk__h r" />
        <span className="tk__br tl" aria-hidden />
        <span className="tk__br tr" aria-hidden />
        <span className="tk__br bl" aria-hidden />
        <span className="tk__br br" aria-hidden />
        <div className="tk__top">
          <div className="tk__tl">
            <span className="tk__chip">kdeimti://back</span>
            <span className="tk__one">READ BEFORE YOU CLAIM</span>
          </div>
          <span className={`tk__stat tk__stat--${status}`}>{TICKET_STATUS_LABEL[status]}</span>
        </div>
        <div className="tkb">
          <div className="tkb__main">
            <p className="tkb__warn">{back.tag}</p>
            <h4>{tpl.abbr}</h4>
            <ul>
              {back.lines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <p className="tkb__joke">
              <span>$</span> {back.joke}
            </p>
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
            <div className="tkb__row tkb__row--uri">
              <span>URI</span>
              <b>vault/{kind}</b>
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
        <div className="tk__grid" aria-hidden />
        <div className="tk__wash" aria-hidden />
        <i className="tk__h" />
        <i className="tk__h r" />
        <span className="tk__br tl" aria-hidden />
        <span className="tk__br tr" aria-hidden />
        <span className="tk__br bl" aria-hidden />
        <span className="tk__br br" aria-hidden />
        <div className="tk__top">
          <div className="tk__tl">
            <span className="tk__chip">kdeimti://ticket</span>
            <span className="tk__one">ADMIT ONE · LOCAL VAULT</span>
          </div>
          <span className={`tk__stat tk__stat--${status}`}>{TICKET_STATUS_LABEL[status]}</span>
        </div>
        <div className="tk__abbr">{tpl.abbr}</div>
        <div className="tk__name">{tpl.shortName || tpl.name}</div>
        <div className="tk__uri">~/admission/{kind}</div>
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
            <b>{hasFee ? feeRaw : <i className="tk__slot" aria-hidden />}</b>
          </div>
        </div>
      </div>
    );

  if (interactive) {
    return (
      <div
        className={`tk tk--${kind}${face === "back" ? " tk--back" : ""}`}
        role="button"
        tabIndex={0}
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
