/** Season ticket catalog — which admission forms are on the shelf. */

export type TicketKind = "du" | "kuet" | "ru" | "jnu" | "mat";

export type TicketStatus = "none" | "await" | "paid";

export const TICKET_STATUS_LABEL: Record<TicketStatus, string> = {
  none: "NOT REGISTERED",
  await: "AWAITING PAYMENT",
  paid: "PAID",
};

export interface TicketTemplate {
  kind: TicketKind;
  abbr: string;
  name: string;
  defaultFee: string;
  circularId: string | null;
}

export const TICKET_CATALOG: TicketTemplate[] = [
  {
    kind: "kuet",
    abbr: "KUET",
    name: "Khulna University of Engineering & Technology",
    defaultFee: "1500",
    circularId: "c-kuet",
  },
  {
    kind: "du",
    abbr: "DU",
    name: "University of Dhaka",
    defaultFee: "1200",
    circularId: "c-du",
  },
  {
    kind: "ru",
    abbr: "RU",
    name: "University of Rajshahi",
    defaultFee: "1000",
    circularId: "c-ru",
  },
  {
    kind: "jnu",
    abbr: "JNU",
    name: "Jagannath University",
    defaultFee: "1200",
    circularId: "c-jnu",
  },
  {
    kind: "mat",
    abbr: "MAT",
    name: "Medical Admission Test (Bangladesh)",
    defaultFee: "1000",
    circularId: "c-dghs",
  },
];

export function templateByKind(kind: TicketKind): TicketTemplate {
  const hit = TICKET_CATALOG.find((t) => t.kind === kind);
  if (!hit) throw new Error(`Unknown ticket kind: ${kind}`);
  return hit;
}
