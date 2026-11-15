import { useEffect, useMemo, useState, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHead } from "@/components/marks";
import { BlankTicketFace, TicketCard } from "@/components/ticket-card";
import { TICKET_CATALOG, type TicketKind } from "@/data/tickets";
import { useTickets } from "@/lib/tickets-store";

export const Route = createFileRoute("/tickets")({
  head: () => ({ meta: [{ title: "Tickets — ADMISSION//26" }] }),
  component: TicketsPage,
});

function TicketsPage() {
  const tickets = useTickets((s) => s.tickets);
  const hydrated = useTickets((s) => s.hydrated);
  const setHydrated = useTickets((s) => s.setHydrated);
  const addTicket = useTickets((s) => s.addTicket);
  const updateTicket = useTickets((s) => s.updateTicket);
  const removeTicket = useTickets((s) => s.removeTicket);

  const [pickerOpen, setPickerOpen] = useState(false);
  const [kind, setKind] = useState<TicketKind | null>(null);
  const [holderName, setHolderName] = useState("");
  const [applicationId, setApplicationId] = useState("");
  const [password, setPassword] = useState("");
  const [feeBdt, setFeeBdt] = useState(0);
  const [paid, setPaid] = useState(true);
  const [note, setNote] = useState("");

  useEffect(() => {
    // zustand persist may already have hydrated
    if (!hydrated) {
      const t = window.setTimeout(() => setHydrated(true), 50);
      return () => window.clearTimeout(t);
    }
  }, [hydrated, setHydrated]);

  const stats = useMemo(() => {
    const count = tickets.length;
    const paidCount = tickets.filter((t) => t.paid).length;
    const totalFee = tickets.reduce((sum, t) => sum + (t.feeBdt || 0), 0);
    const paidFee = tickets.filter((t) => t.paid).reduce((sum, t) => sum + (t.feeBdt || 0), 0);
    return { count, paidCount, totalFee, paidFee };
  }, [tickets]);

  const ownedKinds = useMemo(() => new Set(tickets.map((t) => t.kind)), [tickets]);

  const startAdd = (k: TicketKind) => {
    const tpl = TICKET_CATALOG.find((t) => t.kind === k)!;
    setKind(k);
    setFeeBdt(tpl.defaultFeeBdt);
    setPaid(true);
    setHolderName("");
    setApplicationId("");
    setPassword("");
    setNote("");
    setPickerOpen(true);
  };

  const commit = () => {
    if (!kind) return;
    addTicket({
      kind,
      holderName: holderName.trim(),
      applicationId: applicationId.trim(),
      password,
      feeBdt: Math.max(0, Math.round(feeBdt || 0)),
      paid,
      note: note.trim(),
    });
    setPickerOpen(false);
    setKind(null);
  };

  return (
    <div>
      <PageHead
        kicker="Wallet"
        title="Admission tickets"
        lede="Claim only the forms you are actually sitting. Store portal IDs and passwords on this device only — nothing is uploaded. Each campus gets its own ticket face."
      />

      <div className="grid grid-cols-2 border border-ink md:grid-cols-4">
        <Stat label="TICKETS" value={String(stats.count).padStart(2, "0")} />
        <Stat label="PAID" value={String(stats.paidCount).padStart(2, "0")} />
        <Stat label="TOTAL ৳" value={stats.totalFee.toLocaleString("en-BD")} />
        <Stat label="PAID ৳" value={stats.paidFee.toLocaleString("en-BD")} />
      </div>

      <p className="mt-3 font-mono text-[11px] tracking-wide text-mute">
        Local wallet · passwords never leave this browser · you can skip any campus
      </p>

      {!hydrated ? <p className="mt-4 font-mono text-xs text-mute">RESTORING WALLET…</p> : null}

      <section className="mt-6">
        <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl font-bold uppercase tracking-tight">Available this season</h2>
            <p className="mt-1 text-sm text-mute">Pick a ticket only if you are applying. Designs are placeholders — you can refine them later.</p>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {TICKET_CATALOG.map((tpl) => {
            const owned = ownedKinds.has(tpl.kind);
            return (
              <button
                key={tpl.kind}
                type="button"
                disabled={owned}
                onClick={() => startAdd(tpl.kind)}
                className="ticket-pick text-left disabled:cursor-not-allowed disabled:opacity-50"
              >
                <BlankTicketFace kind={tpl.kind} />
                <span className="mt-2 block font-mono text-[10px] tracking-widest text-mute">
                  {owned ? "ALREADY IN WALLET" : "ADD TO WALLET"}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-bold uppercase tracking-tight">Your ticket zone</h2>
        {tickets.length === 0 ? (
          <p className="mt-3 border border-ink p-4 text-sm">
            Empty wallet. Add DU, KUET, RU, JnU or MAT when you decide to sit that exam — or add none.
          </p>
        ) : (
          <div className="mt-4 grid gap-5 lg:grid-cols-2">
            {tickets.map((ticket) => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                onRemove={() => removeTicket(ticket.id)}
                onUpdate={(patch) => updateTicket(ticket.id, patch)}
              />
            ))}
          </div>
        )}
      </section>

      {pickerOpen && kind ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/50 p-3 sm:items-center">
          <div
            role="dialog"
            aria-modal="true"
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto border-2 border-ink bg-paper p-4 shadow-[8px_8px_0_0_var(--color-accent)]"
          >
            <p className="font-mono text-[10px] tracking-widest text-mute">NEW TICKET · {kind.toUpperCase()}</p>
            <h3 className="mt-1 font-display text-3xl font-bold uppercase">Fill what you want</h3>
            <p className="mt-1 text-sm text-mute">
              Name, ID, password and fee are optional fields. Password stays on this device.
            </p>
            <div className="mt-4 grid gap-3">
              <Field label="Name on ticket">
                <input value={holderName} onChange={(e) => setHolderName(e.target.value)} placeholder="Optional" />
              </Field>
              <Field label="Application / User ID">
                <input
                  value={applicationId}
                  onChange={(e) => setApplicationId(e.target.value)}
                  placeholder="Portal id"
                  autoComplete="username"
                />
              </Field>
              <Field label="Password (hidden by default on ticket)">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Optional · local only"
                  autoComplete="off"
                />
              </Field>
              <Field label="Ticket cost (৳)">
                <input
                  type="number"
                  min={0}
                  value={feeBdt}
                  onChange={(e) => setFeeBdt(Number(e.target.value))}
                />
              </Field>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={paid} onChange={(e) => setPaid(e.target.checked)} />
                Mark as paid
              </label>
              <Field label="Note">
                <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Unit, centre…" />
              </Field>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <button type="button" className="press px-3 py-2 font-mono text-[11px] tracking-widest" onClick={commit}>
                ADD TICKET
              </button>
              <button
                type="button"
                className="press px-3 py-2 font-mono text-[11px] tracking-widest"
                onClick={() => {
                  setPickerOpen(false);
                  setKind(null);
                }}
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-ink border-r border-b p-3 last:border-r-0 md:[&:nth-child(4)]:border-r-0">
      <p className="font-display text-3xl font-bold tabular-nums md:text-4xl">{value}</p>
      <p className="mt-1 font-mono text-[10px] tracking-widest text-mute">{label}</p>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="font-mono text-[10px] tracking-widest text-mute">{label}</span>
      {children}
    </label>
  );
}
