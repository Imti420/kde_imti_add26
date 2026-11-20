/**
 * Desk-written spicy briefings — not crawler headlines.
 * Cycle n1120 · 20 Nov 2026 — calendar lock: BUET → 1 Feb, KU → Feb, CU → Jan/Feb grid.
 */
export interface SpiceCard {
  id: string;
  heat: "HOT" | "SYSTEM" | "MARKET" | "WAR" | "STREET" | "SCAM" | "NUKE";
  kicker: string;
  headline: string;
  body: string;
  punch: string;
  sourceLabel: string;
  sourceUrl: string;
  published: string;
  circularId: string | null;
}

export const SPICE_CARDS: SpiceCard[] = [
  {
    id: "n1120-du",
    heat: "HOT",
    kicker: "DU · ~5 DAYS",
    headline:
      "Dhaka University forms close 25 November 23:59. December unit tests stay put.",
    body:
      "About five days left on admission.eis.du.ac.bd. IBA 5 Dec · Science 12 Dec · Arts 19 Dec · Fine Arts 22 Dec · Business 26 Dec. Only the 2026 HSC batch.",
    punch: "Finish DU this week.",
    sourceLabel: "admission.eis.du.ac.bd · desk · 20 Nov 2026",
    sourceUrl: "https://admission.eis.du.ac.bd/",
    published: "2026-11-20",
    circularId: "c-du",
  },
  {
    id: "n1120-buet",
    heat: "SYSTEM",
    kicker: "BUET · MOVED",
    headline:
      "BUET test moved to 1 February 2027. Applications through 7 January.",
    body:
      "The 16 January date is gone on this desk. Written test 1 Feb. App window reported ~21 Nov → 7 Jan 23:59. GPA wall unchanged. Re-check the portal before you pay.",
    punch: "Calendar shift. Engineering.",
    sourceLabel: "BUET revised schedule · desk · 20 Nov 2026",
    sourceUrl: "https://www.buet.ac.bd/",
    published: "2026-11-20",
    circularId: "c-buet",
  },
  {
    id: "n1120-ru",
    heat: "HOT",
    kicker: "RU · OPEN",
    headline:
      "Rajshahi applications through 30 November. Unit tests 12 / 13 / 20 February.",
    body:
      "B 12 Feb · C 13 Feb · A 20 Feb. Supplementary passers get a short extra window after results. January unit grid is withdrawn.",
    punch: "RU is a February exam.",
    sourceLabel: "admission.ru.ac.bd · desk · 20 Nov 2026",
    sourceUrl: "https://admission.ru.ac.bd/",
    published: "2026-11-20",
    circularId: "c-ru",
  },
  {
    id: "n1120-cu",
    heat: "HOT",
    kicker: "CU · JAN–FEB",
    headline:
      "Chittagong applications through 10 December. Unit tests 29 Jan – 8 Feb.",
    body:
      "C 29 Jan · A 30 Jan · B1 3 Feb · B2 4 Feb · B 5 Feb · D 6 Feb · D1 8 Feb. December unit grid is off the desk.",
    punch: "CU is a winter exam.",
    sourceLabel: "CU schedule · desk · 20 Nov 2026",
    sourceUrl: "/circulars/c-cu",
    published: "2026-11-20",
    circularId: "c-cu",
  },
  {
    id: "n1120-board",
    heat: "STREET",
    kicker: "DESK · 20 NOV",
    headline:
      "Calendar lock: DU closes Tue · JU opens Sun · BUET → 1 Feb · KU → early Feb.",
    body:
      "JnU open through 10 Dec. KUET still open. Agri site from 25 Nov. GST stays March. If a card still shows January for BUET or December for KU, hard-refresh — those are gone.",
    punch: "Trust the circular cards.",
    sourceLabel: "Admission//26 desk · 20 Nov 2026",
    sourceUrl: "/calendar",
    published: "2026-11-20",
    circularId: null,
  },
  {
    id: "n1120-ju",
    heat: "SYSTEM",
    kicker: "JU · SUNDAY",
    headline:
      "Jahangirnagar applications open 22 November 10:00 through 15 December.",
    body:
      "Tests tentatively 10–21 January on campus (no Fri/Sat). Unit grid still soft — lock the app window first.",
    punch: "JU form this Sunday.",
    sourceLabel: "JU circular line · desk · 20 Nov 2026",
    sourceUrl: "/circulars/c-ju",
    published: "2026-11-20",
    circularId: "c-ju",
  },
];
