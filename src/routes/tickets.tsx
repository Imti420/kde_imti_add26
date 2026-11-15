import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { TicketFace } from "@/components/ticket-card";
import { TICKET_CATALOG, TICKET_STATUS_LABEL, type TicketKind, type TicketStatus } from "@/data/tickets";
import { useTickets, type UserTicket } from "@/lib/tickets-store";

export const Route = createFileRoute("/tickets")({
  head: () => ({ meta: [{ title: "Ticket Vault — ADMISSION//26" }] }),
  component: TicketsPage,
});

function money(n: number): string {
  return `৳ ${n.toLocaleString("en-IN")}`;
}

function TicketsPage() {
  const tickets = useTickets((s) => s.tickets);
  const hydrated = useTickets((s) => s.hydrated);
  const setHydrated = useTickets((s) => s.setHydrated);
  const addTicket = useTickets((s) => s.addTicket);
  const updateTicket = useTickets((s) => s.updateTicket);
  const removeTicket = useTickets((s) => s.removeTicket);

  const [openId, setOpenId] = useState<string | null>(null);
  const [popId, setPopId] = useState<string | null>(null);
  const shelfRef = useRef<HTMLElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!hydrated) {
      const t = window.setTimeout(() => setHydrated(true), 40);
      return () => window.clearTimeout(t);
    }
  }, [hydrated, setHydrated]);

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    if (openId) {
      if (!dlg.open) dlg.showModal();
    } else if (dlg.open) {
      dlg.close();
    }
  }, [openId]);

  const owned = useMemo(() => new Set(tickets.map((t) => t.kind)), [tickets]);
  const shelf = useMemo(() => TICKET_CATALOG.filter((t) => !owned.has(t.kind)), [owned]);
  const active = tickets.find((t) => t.id === openId) ?? null;

  const stats = useMemo(() => {
    let paid = 0;
    let wait = 0;
    let spent = 0;
    for (const t of tickets) {
      if (t.status === "paid") {
        paid += 1;
        spent += Number(t.fee) || 0;
      } else if (t.status === "await") {
        wait += 1;
      }
    }
    return { paid, wait, spent, n: tickets.length };
  }, [tickets]);

  const claim = (kind: TicketKind) => {
    addTicket(kind);
    setPopId(kind);
    window.setTimeout(() => setPopId(null), 450);
  };

  return (
    <div className="tv">
      <header className="tv-hd">
        <div>
          <span className="tv-tag">ADMISSION//26</span>
          <h1 className="tv-title">Ticket Vault</h1>
          <p className="tv-lede">Collect a ticket for each exam you are sitting. Leave out the rest.</p>
        </div>
        <div className="tv-sum" role="group" aria-label="Admission summary">
          <div>
            <b>{stats.n}</b>
            <span>Exams selected</span>
          </div>
          <div>
            <b>{stats.paid}</b>
            <span>Paid applications</span>
          </div>
          <div>
            <b>{money(stats.spent)}</b>
            <span>Spent (paid only)</span>
          </div>
          <div className={stats.wait ? "tv-hot" : undefined}>
            <b>{stats.wait}</b>
            <span>Awaiting payment</span>
          </div>
        </div>
      </header>

      {!hydrated ? <p className="tv-none">Restoring vault…</p> : null}

      <section className="tv-sec" aria-labelledby="tv-h-coll">
        <h2 id="tv-h-coll">
          My collection <i>{tickets.length}</i>
        </h2>
        {tickets.length === 0 ? (
          <div className="tv-empty">
            <div className="tv-stack" aria-hidden>
              <i />
              <i />
              <i />
            </div>
            <div>
              <h3>Your vault is empty</h3>
              <p>Every exam you plan to sit gets its own ticket. Pick one from the shelf and it lands here.</p>
              <button
                type="button"
                className="tv-btn"
                onClick={() => shelfRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
              >
                Choose your first ticket
              </button>
            </div>
          </div>
        ) : (
          <div className="tv-grid">
            {tickets.map((t) => (
              <div key={t.id} className={`tv-slot${popId === t.kind ? " tv-pop" : ""}`}>
                <TicketFace kind={t.kind} data={t} interactive onOpen={() => setOpenId(t.id)} />
                <button type="button" className="tv-btn tv-btn--sm tv-btn--ghost" onClick={() => removeTicket(t.id)}>
                  Remove {templateAbbr(t.kind)}
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="tv-sec" aria-labelledby="tv-h-shelf" ref={shelfRef} tabIndex={-1}>
        <h2 id="tv-h-shelf">On the shelf</h2>
        {shelf.length === 0 ? (
          <p className="tv-none">You have collected every ticket on the shelf.</p>
        ) : (
          <div className="tv-grid">
            {shelf.map((tpl) => (
              <div key={tpl.kind} className="tv-slot">
                <TicketFace kind={tpl.kind} />
                <button type="button" className="tv-btn" onClick={() => claim(tpl.kind)}>
                  Add {tpl.abbr} ticket
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <dialog
        ref={dialogRef}
        className="tv-dlg"
        aria-label="Ticket details"
        onClose={() => setOpenId(null)}
        onClick={(e) => {
          if (e.target === dialogRef.current) setOpenId(null);
        }}
      >
        {active ? (
          <TicketDetail
            ticket={active}
            onClose={() => setOpenId(null)}
            onRemove={() => {
              removeTicket(active.id);
              setOpenId(null);
            }}
            onChange={(patch) => updateTicket(active.id, patch)}
          />
        ) : null}
      </dialog>
    </div>
  );
}

function templateAbbr(kind: TicketKind): string {
  return TICKET_CATALOG.find((t) => t.kind === kind)?.abbr ?? kind.toUpperCase();
}

function TicketDetail({
  ticket,
  onClose,
  onRemove,
  onChange,
}: {
  ticket: UserTicket;
  onClose: () => void;
  onRemove: () => void;
  onChange: (patch: Partial<UserTicket>) => void;
}) {
  const [credOpen, setCredOpen] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const abbr = templateAbbr(ticket.kind);

  const setField = <K extends keyof UserTicket>(key: K, value: UserTicket[K]) => {
    onChange({ [key]: value } as Partial<UserTicket>);
  };

  return (
    <div className="tv-dlg__body">
      <div className="tv-dlg__top">
        <span>{abbr} ticket</span>
        <button type="button" className="tv-btn tv-btn--sm" onClick={onClose}>
          Close
        </button>
      </div>
      <div className="tv-dlg__tk">
        <TicketFace kind={ticket.kind} data={ticket} />
      </div>

      <fieldset className="tv-fs">
        <legend>Candidate</legend>
        <Field label="Candidate name">
          <input
            className="tv-in"
            value={ticket.name}
            placeholder="Your name"
            onChange={(e) => setField("name", e.target.value)}
          />
        </Field>
        <Field label="Application ID">
          <input className="tv-in" value={ticket.appId} onChange={(e) => setField("appId", e.target.value)} />
        </Field>
      </fieldset>

      <fieldset className="tv-fs">
        <legend>Examination</legend>
        <Field label="Date">
          <input className="tv-in" type="date" value={ticket.date} onChange={(e) => setField("date", e.target.value)} />
        </Field>
        <Field label="Time">
          <input className="tv-in" type="time" value={ticket.time} onChange={(e) => setField("time", e.target.value)} />
        </Field>
        <p className="tv-hint">Leave blank until the university announces it.</p>
      </fieldset>

      <fieldset className="tv-fs">
        <legend>Payment</legend>
        <Field label="Exam fee (৳)">
          <input
            className="tv-in"
            type="number"
            min={0}
            step={1}
            inputMode="numeric"
            value={ticket.fee}
            onChange={(e) => setField("fee", e.target.value)}
          />
        </Field>
        <Field label="Registration status">
          <select
            className="tv-in"
            value={ticket.status}
            onChange={(e) => setField("status", e.target.value as TicketStatus)}
          >
            {(Object.keys(TICKET_STATUS_LABEL) as TicketStatus[]).map((k) => (
              <option key={k} value={k}>
                {TICKET_STATUS_LABEL[k]}
              </option>
            ))}
          </select>
        </Field>
      </fieldset>

      <div className="tv-fs tv-cred">
        <button
          type="button"
          className="tv-cred__btn"
          aria-expanded={credOpen}
          onClick={() => setCredOpen((v) => !v)}
        >
          Saved login (optional)
        </button>
        {credOpen ? (
          <div className="tv-cred__p">
            <label className="tv-f">
              <span>Password</span>
              <span className="tv-pw">
                <input
                  className="tv-in"
                  type={showPass ? "text" : "password"}
                  autoComplete="off"
                  value={ticket.pass}
                  onChange={(e) => setField("pass", e.target.value)}
                />
                <button
                  type="button"
                  className="tv-btn tv-btn--sm"
                  aria-pressed={showPass}
                  onClick={() => setShowPass((v) => !v)}
                >
                  {showPass ? "Hide" : "Show"}
                </button>
              </span>
            </label>
            <label className="tv-chk">
              <input
                type="checkbox"
                checked={ticket.keepLogin}
                onChange={(e) => setField("keepLogin", e.target.checked)}
              />
              Keep these login details on this device
            </label>
            <p className="tv-note">
              Meant to stay on this device only. Nothing is sent anywhere, and your password never appears on the ticket.
            </p>
          </div>
        ) : null}
      </div>

      <div className="tv-dlg__ft">
        <button type="button" className="tv-btn tv-btn--ghost" onClick={onRemove}>
          Remove from vault
        </button>
        <button type="button" className="tv-btn" onClick={onClose}>
          Done
        </button>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="tv-f">
      <span>{label}</span>
      {children}
    </label>
  );
}
