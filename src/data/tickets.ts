/** Season ticket catalog — which admission forms are “out” right now. */

export type TicketKind = "du" | "kuet" | "ru" | "jnu" | "mat";

export interface TicketTemplate {
  kind: TicketKind;
  label: string;
  shortLabel: string;
  subtitle: string;
  defaultFeeBdt: number;
  circularId: string | null;
  portalHint: string;
  /** Visual theme key — drives CSS class ticket-theme-{theme} */
  theme: "du" | "kuet" | "ru" | "jnu" | "mat";
  /** Soft blurb on the blank face of the ticket */
  faceLine: string;
}

/** Tickets currently available to claim this season. */
export const TICKET_CATALOG: TicketTemplate[] = [
  {
    kind: "du",
    label: "University of Dhaka",
    shortLabel: "DU",
    subtitle: "Undergraduate admission 2026–27",
    defaultFeeBdt: 1200,
    circularId: "c-du",
    portalHint: "admission.eis.du.ac.bd",
    theme: "du",
    faceLine: "Five units · December tests · portal open through 25 Nov",
  },
  {
    kind: "kuet",
    label: "KUET",
    shortLabel: "KUET",
    subtitle: "BSc Engineering admission test",
    defaultFeeBdt: 1500,
    circularId: "c-kuet",
    portalHint: "admission.kuet.ac.bd",
    theme: "kuet",
    faceLine: "1,105 seats · 8 Jan test · PDF on archive",
  },
  {
    kind: "ru",
    label: "University of Rajshahi",
    shortLabel: "RU",
    subtitle: "Undergraduate admission 2026–27",
    defaultFeeBdt: 1000,
    circularId: "c-ru",
    portalHint: "admission.ru.ac.bd",
    theme: "ru",
    faceLine: "Apps through 30 Nov · February unit tests",
  },
  {
    kind: "jnu",
    label: "Jagannath University",
    shortLabel: "JnU",
    subtitle: "Honours & BBA admission",
    defaultFeeBdt: 1200,
    circularId: "c-jnu",
    portalHint: "admission.jnu.ac.bd",
    theme: "jnu",
    faceLine: "Five units · January MCQ · check portal open day",
  },
  {
    kind: "mat",
    label: "Medical Admission Test",
    shortLabel: "MAT",
    subtitle: "MBBS / BDS national test",
    defaultFeeBdt: 1000,
    circularId: "c-dghs",
    portalHint: "DGME circular when published",
    theme: "mat",
    faceLine: "National medical · ~18 Dec line · formal PDF pending",
  },
];

export function templateByKind(kind: TicketKind): TicketTemplate {
  const hit = TICKET_CATALOG.find((t) => t.kind === kind);
  if (!hit) throw new Error(`Unknown ticket kind: ${kind}`);
  return hit;
}
