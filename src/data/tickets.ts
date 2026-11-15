/** Season ticket catalog — which admission forms are on the shelf. */

export type TicketKind =
  | "kuet"
  | "du"
  | "ru"
  | "jnu"
  | "duet"
  | "gst"
  | "cu"
  | "sust"
  | "cou"
  | "ruet"
  | "bup"
  | "mat"
  | "buet"
  | "cuet"
  | "mist"
  | "ju";

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

/** Flat poster-ticket order — matches the board aesthetic. */
export const TICKET_CATALOG: TicketTemplate[] = [
  { kind: "kuet", abbr: "KUET", name: "Khulna University of Engineering & Technology", defaultFee: "1200", circularId: "c-kuet" },
  { kind: "du", abbr: "DU", name: "University of Dhaka", defaultFee: "1200", circularId: "c-du" },
  { kind: "ru", abbr: "RU", name: "University of Rajshahi", defaultFee: "1200", circularId: "c-ru" },
  { kind: "jnu", abbr: "JNU", name: "Jagannath University", defaultFee: "1200", circularId: "c-jnu" },
  { kind: "duet", abbr: "DUET", name: "Dhaka University of Engineering & Technology", defaultFee: "1200", circularId: null },
  { kind: "gst", abbr: "GST", name: "GST cluster · 20 public universities", defaultFee: "1200", circularId: "c-gst" },
  { kind: "cu", abbr: "CU", name: "Chittagong University", defaultFee: "1200", circularId: "c-cu" },
  { kind: "sust", abbr: "SUST", name: "Shahjalal University of Science & Technology", defaultFee: "1200", circularId: "c-sust" },
  { kind: "cou", abbr: "CoU", name: "Comilla University", defaultFee: "1200", circularId: "c-cou" },
  { kind: "ruet", abbr: "RUET", name: "Rajshahi University of Engineering & Technology", defaultFee: "1200", circularId: "c-ruet" },
  { kind: "bup", abbr: "BUP", name: "Bangladesh University of Professionals", defaultFee: "1200", circularId: null },
  { kind: "mat", abbr: "MAT", name: "Medical Admission Test (Bangladesh)", defaultFee: "1200", circularId: "c-dghs" },
  { kind: "buet", abbr: "BUET", name: "Bangladesh University of Engineering & Technology", defaultFee: "1200", circularId: "c-buet" },
  { kind: "cuet", abbr: "CUET", name: "Chittagong University of Engineering & Technology", defaultFee: "1200", circularId: "c-cuet" },
  { kind: "mist", abbr: "MIST", name: "Military Institute of Science & Technology", defaultFee: "1200", circularId: "c-mist" },
  { kind: "ju", abbr: "JU", name: "Jahangirnagar University", defaultFee: "1200", circularId: "c-ju" },
];

export function templateByKind(kind: TicketKind): TicketTemplate {
  const hit = TICKET_CATALOG.find((t) => t.kind === kind);
  if (!hit) throw new Error(`Unknown ticket kind: ${kind}`);
  return hit;
}
