import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHead, SectionLabel } from "@/components/marks";
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

function abbrOf(kind: TicketKind): string {
  return TICKET_CATALOG.find((t) => t.kind === kind)?.abbr ?? kind.toUpperCase();
}

function TicketsPage() {
  const tickets = useTickets((s) => s.tickets);
  const hydrated = useTickets((s) => s.hydrated);
  const setHydrated = useTickets((s) => s.setHydrated);
  const addTicket = useTickets((s) => s.addTicket);
  const updateTicket = useTickets((s) => s.updateTicket);
  const removeTicket = useTickets((s) => s.removeTicket);

  const [openId, setOpenId] = useState<string | null>(null);
  const [shelfOpen, setShelfOpen] = useState(false);
  const [popId, setPopId] = useState<string | null>(null);
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
    if (TICKET_CATALOG.every((t) => owned.has(t.kind) || t.kind === kind)) {
      setShelfOpen(false);
    }
  };

  return (
    <div>
      <PageHead
        kicker="Wallet"
        title="Ticket vault"
        lede="Claim only the exams you are sitting. Portal logins stay on this device. Ticket faces keep the campus art; the desk stays ADMISSION//26."
        aside={
          <button
            type="button"
            className="press press-accent shrink-0 px-4 py-2 font-mono text-[11px] tracking-widest"
            onClick={() => setShelfOpen((v) => !v)}
            aria-expanded={shelfOpen}
          >
            {shelfOpen ? "CLOSE SHELF" : shelf.length ? `ADD TICKET · ${shelf.length}` : "SHELF EMPTY"}
          </button>
        }
      />

      <div className="grid grid-cols-2 border-[3px] border-ink bg-panel md:grid-cols-4">
        <Stat label="EXAMS" value={String(stats.n)} />
        <Stat label="PAID" value={String(stats.paid)} />
        <Stat label="SPENT" value={money(stats.spent)} />
        <Stat label="AWAITING" value={String(stats.wait)} hot={stats.wait > 0} />
      </div>

      <p className="mt-2 font-mono text-[11px] tracking-wide text-mute">
        Local only · password never printed on the ticket · delete lives inside the ticket panel
      </p>

      {!hydrated ? <p className="mt-4 font-mono text-xs text-mute">RESTORING VAULT…</p> : null}

      {shelfOpen && shelf.length > 0 ? (
        <section className="mt-6 border-[3px] border-ink bg-yellow/30 p-4">
          <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
            <SectionLabel>On the shelf</SectionLabel>
            <p className="max-w-md text-sm text-ink">Pick a campus. It moves into your collection. You can skip any of them.</p>
          </div>
          <div className="tv-grid">
            {shelf.map((tpl) => (
              <div key={tpl.kind} className="tv-slot">
                <TicketFace kind={tpl.kind} />
                <button type="button" className="press px-3 py-2 font-mono text-[11px] tracking-widest" onClick={() => claim(tpl.kind)}>
                  ADD {tpl.abbr}
                </button>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {shelfOpen && shelf.length === 0 ? (
        <p className="mt-6 border-[3px] border-ink bg-panel p-4 text-sm">Every ticket on the shelf is already in your collection.</p>
      ) : null}

      <section className="mt-8">
        <SectionLabel>My collection</SectionLabel>
        {tickets.length === 0 ? (
          <div className="mt-4 border-[3px] border-ink bg-panel p-5">
            <p className="font-display text-3xl font-bold uppercase leading-none">Vault is empty</p>
            <p className="mt-2 max-w-prose text-sm">
              Nothing claimed yet. Open the shelf and add only what you will sit — DU, KUET, RU, JnU, MAT, or none.
            </p>
            <button
              type="button"
              className="press press-accent mt-4 px-4 py-2 font-mono text-[11px] tracking-widest"
              onClick={() => setShelfOpen(true)}
            >
              OPEN SHELF
            </button>
          </div>
        ) : (
          <div className="tv-grid mt-4">
            {tickets.map((t) => (
              <div key={t.id} className={`tv-slot${popId === t.kind ? " tv-pop" : ""}`}>
                <TicketFace kind={t.kind} data={t} interactive onOpen={() => setOpenId(t.id)} />
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

function Stat({ label, value, hot }: { label: string; value: string; hot?: boolean }) {
  return (
    <div className={`border-ink border-r border-b p-3 last:border-r-0 md:[&:nth-child(4)]:border-r-0 ${hot ? "bg-yellow text-onyellow" : ""}`}>
      <p className="font-display text-3xl font-bold tabular-nums md:text-4xl">{value}</p>
      <p className="mt-1 font-mono text-[10px] tracking-widest text-mute">{label}</p>
    </div>
  );
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
  const [confirmRemove, setConfirmRemove] = useState(false);
  const abbr = abbrOf(ticket.kind);

  const setField = <K extends keyof UserTicket>(key: K, value: UserTicket[K]) => {
    onChange({ [key]: value } as Partial<UserTicket>);
  };

  return (
    <div className="tv-dlg__body">
      <div className="tv-dlg__top">
        <span className="font-display text-2xl font-bold uppercase tracking-tight">{abbr} ticket</span>
        <button type="button" className="press px-3 py-1 font-mono text-[11px] tracking-widest" onClick={onClose}>
          CLOSE
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
                  className="press px-2 py-1 font-mono text-[10px] tracking-widest"
                  aria-pressed={showPass}
                  onClick={() => setShowPass((v) => !v)}
                >
                  {showPass ? "HIDE" : "SHOW"}
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
              Stays on this device only. Nothing is uploaded. The password never appears on the ticket face.
            </p>
          </div>
        ) : null}
      </div>

      <div className="tv-dlg__ft">
        {!confirmRemove ? (
          <button
            type="button"
            className="press px-3 py-2 font-mono text-[11px] tracking-widest"
            onClick={() => setConfirmRemove(true)}
          >
            REMOVE TICKET
          </button>
        ) : (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold">Remove {abbr} from the vault?</span>
            <button
              type="button"
              className="press press-accent px-3 py-2 font-mono text-[11px] tracking-widest"
              onClick={onRemove}
            >
              YES, REMOVE
            </button>
            <button
              type="button"
              className="press px-3 py-2 font-mono text-[11px] tracking-widest"
              onClick={() => setConfirmRemove(false)}
            >
              KEEP IT
            </button>
          </div>
        )}
        <button type="button" className="press press-ink px-3 py-2 font-mono text-[11px] tracking-widest" onClick={onClose}>
          DONE
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
