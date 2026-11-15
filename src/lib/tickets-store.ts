import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { TicketKind } from "@/data/tickets";

export interface UserTicket {
  id: string;
  kind: TicketKind;
  holderName: string;
  applicationId: string;
  /** Stored only in this browser via localStorage. Never uploaded. */
  password: string;
  feeBdt: number;
  paid: boolean;
  note: string;
  createdAt: string;
}

interface TicketState {
  tickets: UserTicket[];
  hydrated: boolean;
  setHydrated: (v: boolean) => void;
  addTicket: (ticket: Omit<UserTicket, "id" | "createdAt">) => void;
  updateTicket: (id: string, patch: Partial<UserTicket>) => void;
  removeTicket: (id: string) => void;
  clearAll: () => void;
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
      addTicket: (ticket) =>
        set({
          tickets: [
            ...get().tickets,
            {
              ...ticket,
              id: uid(),
              createdAt: new Date().toISOString(),
            },
          ],
        }),
      updateTicket: (id, patch) =>
        set({
          tickets: get().tickets.map((t) => (t.id === id ? { ...t, ...patch } : t)),
        }),
      removeTicket: (id) => set({ tickets: get().tickets.filter((t) => t.id !== id) }),
      clearAll: () => set({ tickets: [] }),
    }),
    {
      name: "a26-tickets-v1",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ tickets: s.tickets }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);
