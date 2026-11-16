/**
 * Desk-written spicy briefings — not crawler headlines.
 * Cycle n1116 · 16 Nov 2026 afternoon — form week: DU ~9d · RU open · JnU open · BUET Friday.
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
    id: "n1116-du",
    heat: "HOT",
    kicker: "DU · ~9 DAYS",
    headline:
      "Dhaka University still taking forms through 25 November 23:59. December tests unchanged.",
    body:
      "About nine days left on admission.eis.du.ac.bd. Only the 2026 HSC batch. Science 8.0 · Arts/Business 7.5 · Fine Arts 6.5 · IBA 8.0. Finish DU this week if it is on your list — no second-timers.",
    punch: "Quiet clock. Real deadline.",
    sourceLabel: "admission.eis.du.ac.bd · desk · 16 Nov 2026",
    sourceUrl: "https://admission.eis.du.ac.bd/",
    published: "2026-11-16",
    circularId: "c-du",
  },
  {
    id: "n1116-ru",
    heat: "HOT",
    kicker: "RU · OPEN",
    headline:
      "Rajshahi applications running through 30 November. February unit tests on the portal.",
    body:
      "Official line: apps 15–30 Nov. Unit tests B 12 Feb · C 13 Feb · A 20 Feb 2027. Supplementary passers get a short window after results. Eight regional centres listed on the notice board.",
    punch: "RU is open. Mark February.",
    sourceLabel: "admission.ru.ac.bd · desk · 16 Nov 2026",
    sourceUrl: "https://admission.ru.ac.bd/",
    published: "2026-11-16",
    circularId: "c-ru",
  },
  {
    id: "n1116-jnu",
    heat: "HOT",
    kicker: "JnU · OPEN",
    headline:
      "Jagannath applications through 10 December. Five MCQ units from 1–23 January.",
    body:
      "Desk reads the open window as 15 Nov–10 Dec (All Result / Star / Prothom Alo line). Unit grid: A 1 Jan · E 8 Jan · B 15 Jan · C 22 Jan · D 23 Jan. Fees around ৳1,000–1,200 depending on unit — confirm on admission.jnu.ac.bd before you pay.",
    punch: "Portal first. Then the fee.",
    sourceLabel: "admission.jnu.ac.bd · All Result BD · 16 Nov 2026",
    sourceUrl: "https://admission.jnu.ac.bd/",
    published: "2026-11-16",
    circularId: "c-jnu",
  },
  {
    id: "n1116-buet",
    heat: "SYSTEM",
    kicker: "BUET · FRIDAY",
    headline:
      "BUET applications expected Friday 21 November. Written test stays 16 January.",
    body:
      "Five days out. GPA wall unchanged on the stored notice. Close date still not on the short notice — watch buet.ac.bd mid-week. No drama, just the form.",
    punch: "Engineering form this Friday.",
    sourceLabel: "BUET notice · TBS · 16 Nov 2026",
    sourceUrl: "https://www.buet.ac.bd/",
    published: "2026-11-16",
    circularId: "c-buet",
  },
  {
    id: "n1116-kuet",
    heat: "HOT",
    kicker: "KUET · STILL OPEN",
    headline:
      "KUET applications through 10 December 17:00. Test 8 January. PDF on the archive.",
    body:
      "1,105 seats. Centres Khulna, Dhaka, Rajshahi. Eligible list targeted late December. Cleanest engineering paper still on the desk.",
    punch: "Already open. Keep counting.",
    sourceLabel: "admission.kuet.ac.bd · 16 Nov 2026",
    sourceUrl: "https://admission.kuet.ac.bd/",
    published: "2026-11-16",
    circularId: "c-kuet",
  },
  {
    id: "n1116-board",
    heat: "STREET",
    kicker: "DESK · 16 NOV",
    headline:
      "Monday board: DU ~9 days · RU open · JnU open · KUET open · BUET Friday.",
    body:
      "No new national circular dropped this morning. Form season is portals lighting up, not press conferences. Write what is open; skip the rumour graphic.",
    punch: "Forms first. Arguments later.",
    sourceLabel: "Admission//26 desk · 16 Nov 2026",
    sourceUrl: "/newswire",
    published: "2026-11-16",
    circularId: null,
  },
];
