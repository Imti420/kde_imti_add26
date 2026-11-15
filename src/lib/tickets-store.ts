import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { TicketKind, TicketStatus } from "@/data/tickets";

export interface UserTicket {
  id: string;
  kind: TicketKind;
  name: string;
  appId: string;
  /** Only persisted when keepLogin is true. */
  pass: string;
  keepLogin: boolean;
  date: string;
  time: string;
  fee: string;
  status: TicketStatus;
  createdAt: string;
}

interface TicketState {
  tickets: UserTicket[];
  hydrated: boolean;
  setHydrated: (v: boolean) => void;
  addTicket: (kind: TicketKind) => void;
  updateTicket: (id: string, patch: Partial<UserTicket>) => void;
  removeTicket: (id: string) => void;
}

function uid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `t-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export const useTickets = create<TicketState>()(
  persist(
    (set, get) => ({
      tickets: [],
      hydrated: false,
      setHydrated: (v) => set({ hydrated: v }),
      addTicket: (kind) => {
        if (get().tickets.some((t) => t.kind === kind)) return;
        set({
          tickets: [
            ...get().tickets,
            {
              id: uid(),
              kind,
              name: "",
              appId: "",
              pass: "",
              keepLogin: false,
              date: "",
              time: "",
              fee: "",
              status: "none",
              createdAt: new Date().toISOString(),
            },
          ],
        });
      },
      updateTicket: (id, patch) =>
        set({
          tickets: get().tickets.map((t) => (t.id === id ? { ...t, ...patch } : t)),
        }),
      removeTicket: (id) => set({ tickets: get().tickets.filter((t) => t.id !== id) }),
    }),
    {
      name: "a26-tickets-v2",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        tickets: s.tickets.map((t) => ({
          ...t,
          pass: t.keepLogin ? t.pass : "",
        })),
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);
