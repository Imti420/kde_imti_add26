import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { templateByKind, type TicketKind } from "@/data/tickets";
import type { UserTicket } from "@/lib/tickets-store";

export function TicketCard({
  ticket,
  onRemove,
  onUpdate,
}: {
  ticket: UserTicket;
  onRemove: () => void;
  onUpdate: (patch: Partial<UserTicket>) => void;
}) {
  const tpl = templateByKind(ticket.kind);
  const [reveal, setReveal] = useState(false);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({
    holderName: ticket.holderName,
    applicationId: ticket.applicationId,
    password: ticket.password,
    feeBdt: ticket.feeBdt,
    note: ticket.note,
    paid: ticket.paid,
  });

  const save = () => {
    onUpdate({
      holderName: draft.holderName.trim(),
      applicationId: draft.applicationId.trim(),
      password: draft.password,
      feeBdt: Number.isFinite(draft.feeBdt) ? Math.max(0, Math.round(draft.feeBdt)) : 0,
      note: draft.note.trim(),
      paid: draft.paid,
    });
    setEditing(false);
  };

  return (
    <article className={`ticket-card ticket-theme-${tpl.theme}`}>
      <div className="ticket-card-stub" aria-hidden>
        <span className="ticket-stub-code">{tpl.shortLabel}</span>
        <span className="ticket-stub-year">26/27</span>
      </div>
      <div className="ticket-card-body">
        <header className="ticket-card-head">
          <div>
            <p className="ticket-kicker">{tpl.subtitle}</p>
            <h3 className="ticket-title">{tpl.label}</h3>
          </div>
          <div className="ticket-fee-block">
            <p className="ticket-fee-label">FEE</p>
            <p className="ticket-fee">৳{ticket.feeBdt.toLocaleString("en-BD")}</p>
            <p className={`ticket-paid ${ticket.paid ? "is-paid" : "is-unpaid"}`}>
              {ticket.paid ? "PAID" : "UNPAID"}
            </p>
          </div>
        </header>

        <p className="ticket-face-line">{tpl.faceLine}</p>

        {!editing ? (
          <dl className="ticket-fields">
            <div>
              <dt>Holder</dt>
              <dd>{ticket.holderName || "—"}</dd>
            </div>
            <div>
              <dt>Application / User ID</dt>
              <dd className="font-mono">{ticket.applicationId || "—"}</dd>
            </div>
            <div>
              <dt>Password</dt>
              <dd className="font-mono">
                {ticket.password
                  ? reveal
                    ? ticket.password
                    : "••••••••"
                  : "—"}
                {ticket.password ? (
                  <button
                    type="button"
                    className="ticket-reveal"
                    onClick={() => setReveal((v) => !v)}
                  >
                    {reveal ? "Hide" : "Show"}
                  </button>
                ) : null}
              </dd>
            </div>
            {ticket.note ? (
              <div>
                <dt>Note</dt>
                <dd>{ticket.note}</dd>
              </div>
            ) : null}
          </dl>
        ) : (
          <div className="ticket-edit-grid">
            <label>
              <span>Name on ticket</span>
              <input
                value={draft.holderName}
                onChange={(e) => setDraft({ ...draft, holderName: e.target.value })}
                placeholder="Your name"
              />
            </label>
            <label>
              <span>Application / User ID</span>
              <input
                value={draft.applicationId}
                onChange={(e) => setDraft({ ...draft, applicationId: e.target.value })}
                placeholder="Portal user id"
                autoComplete="username"
              />
            </label>
            <label>
              <span>Password (device only)</span>
              <input
                type="text"
                value={draft.password}
                onChange={(e) => setDraft({ ...draft, password: e.target.value })}
                placeholder="Optional · stays in this browser"
                autoComplete="off"
              />
            </label>
            <label>
              <span>Fee (৳)</span>
              <input
                type="number"
                min={0}
                value={draft.feeBdt}
                onChange={(e) => setDraft({ ...draft, feeBdt: Number(e.target.value) })}
              />
            </label>
            <label className="ticket-check">
              <input
                type="checkbox"
                checked={draft.paid}
                onChange={(e) => setDraft({ ...draft, paid: e.target.checked })}
              />
              <span>Marked paid</span>
            </label>
            <label className="ticket-span">
              <span>Note</span>
              <input
                value={draft.note}
                onChange={(e) => setDraft({ ...draft, note: e.target.value })}
                placeholder="Unit, centre, anything"
              />
            </label>
          </div>
        )}

        <footer className="ticket-card-foot">
          <p className="ticket-portal">{tpl.portalHint}</p>
          <div className="ticket-actions">
            {tpl.circularId ? (
              <Link to="/circulars/$id" params={{ id: tpl.circularId }} className="press text-[10px] tracking-widest">
                CIRCULAR
              </Link>
            ) : null}
            {!editing ? (
              <>
                <button type="button" className="press text-[10px] tracking-widest" onClick={() => setEditing(true)}>
                  EDIT
                </button>
                <button type="button" className="press text-[10px] tracking-widest" onClick={onRemove}>
                  REMOVE
                </button>
              </>
            ) : (
              <>
                <button type="button" className="press text-[10px] tracking-widest" onClick={save}>
                  SAVE
                </button>
                <button
                  type="button"
                  className="press text-[10px] tracking-widest"
                  onClick={() => {
                    setDraft({
                      holderName: ticket.holderName,
                      applicationId: ticket.applicationId,
                      password: ticket.password,
                      feeBdt: ticket.feeBdt,
                      note: ticket.note,
                      paid: ticket.paid,
                    });
                    setEditing(false);
                  }}
                >
                  CANCEL
                </button>
              </>
            )}
          </div>
        </footer>
      </div>
    </article>
  );
}

export function BlankTicketFace({ kind }: { kind: TicketKind }) {
  const tpl = templateByKind(kind);
  return (
    <div className={`ticket-blank ticket-theme-${tpl.theme}`}>
      <span className="ticket-blank-code">{tpl.shortLabel}</span>
      <span className="ticket-blank-fee">৳{tpl.defaultFeeBdt}</span>
      <span className="ticket-blank-line">{tpl.faceLine}</span>
    </div>
  );
}
