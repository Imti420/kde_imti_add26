/**
 * Desk briefings — cycle n1128 · 28 Nov 2026.
 * DU closes today (extended from 25 Nov); BUET opens 1 Dec; JU/RU/KUET open.
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
    id: "n1128-du",
    heat: "HOT",
    kicker: "DU · CLOSES TODAY",
    headline: "Dhaka University forms close today — 28 November 23:59.",
    body:
      "Extended three days from the original 25 Nov cut-off. Last stretch on admission.eis.du.ac.bd. Only the 2026 HSC batch. December unit tests stay: IBA 5 · Science 12 · Arts 19 · Fine Arts 22 · Business 26.",
    punch: "Finish DU before midnight tonight.",
    sourceLabel: "Prothom Alo · admission.eis.du.ac.bd · 23 Nov 2026",
    sourceUrl: "https://admission.eis.du.ac.bd/",
    published: "2026-11-28",
    circularId: "c-du",
  },
  {
    id: "n1123b-buet",
    heat: "SYSTEM",
    kicker: "BUET · CIRCULAR",
    headline: "BUET circular is out — applications open 1 December.",
    body:
      "Apps 1 Dec 10:00 → 7 Jan 15:00; fee pay by 8 Jan 15:00. Eligible list ~16 Jan. Test 1 February 2027. 1,309 seats. ~10,000 examinees shortlisted on HSC Math/Physics/Chemistry marks.",
    punch: "Engineering form from December 1.",
    sourceLabel: "BUET circular · 22 Nov 2026",
    sourceUrl: "https://www.buet.ac.bd/",
    published: "2026-11-23",
    circularId: "c-buet",
  },
  {
    id: "n1123b-ju",
    heat: "HOT",
    kicker: "JU · LIVE",
    headline: "Jahangirnagar applications are open through 15 December.",
    body:
      "Opened Sunday 22 Nov 10:00. About 1,848 seats in 37 departments. Admit cards from ~25 December. Tests tentatively 10–21 January.",
    punch: "JU form is live now.",
    sourceLabel: "admission.juniv.edu · 23 Nov 2026",
    sourceUrl: "/circulars/c-ju",
    published: "2026-11-23",
    circularId: "c-ju",
  },
  {
    id: "n1123b-ru",
    heat: "HOT",
    kicker: "RU · OPEN",
    headline: "Rajshahi applications through 30 November.",
    body:
      "Still open this week. Unit tests B 12 Feb · C 13 Feb · A 20 Feb. Supplementary passers get a short extra window after results.",
    punch: "RU closes next Sunday.",
    sourceLabel: "admission.ru.ac.bd · 23 Nov 2026",
    sourceUrl: "https://admission.ru.ac.bd/",
    published: "2026-11-23",
    circularId: "c-ru",
  },
  {
    id: "n1123b-jnu",
    heat: "SYSTEM",
    kicker: "JnU · WEDNESDAY",
    headline: "Jagannath applications open Wednesday 25 November.",
    body:
      "Noon Wednesday through 10 December 23:59. Units A–E tests 1–23 January. Fees A–D ৳1,200 · E ৳1,500 on the official line.",
    punch: "JnU form this Wednesday.",
    sourceLabel: "admission.jnu.ac.bd · Tribune · 23 Nov",
    sourceUrl: "https://admission.jnu.ac.bd/",
    published: "2026-11-23",
    circularId: "c-jnu",
  },
  {
    id: "n1123b-kuet",
    heat: "HOT",
    kicker: "KUET · OPEN",
    headline: "KUET applications still open through 10 December 17:00.",
    body:
      "Test 8 January. Centres Khulna, Dhaka, Rajshahi. Keep the PDF handy — cleanest engineering circular still on the desk.",
    punch: "Already open.",
    sourceLabel: "admission.kuet.ac.bd · 23 Nov 2026",
    sourceUrl: "https://admission.kuet.ac.bd/",
    published: "2026-11-23",
    circularId: "c-kuet",
  },
  {
    id: "n1123b-agri",
    heat: "SYSTEM",
    kicker: "AGRI · WEDNESDAY",
    headline: "Agricultural cluster forms from 25 November to 15 December.",
    body:
      "Combined test 2 January 2027. Board fee ৳1,600 — confirm on ACAS before you pay.",
    punch: "Agri opens with JnU.",
    sourceLabel: "ACAS cluster · desk · 23 Nov",
    sourceUrl: "/circulars/c-agri",
    published: "2026-11-23",
    circularId: "c-agri",
  },
  {
    id: "n1123b-dec",
    heat: "STREET",
    kicker: "DECEMBER MAP",
    headline: "December forms: BUET · SUST · BUTEX · BUP · CoU · CU.",
    body:
      "BUET 1 Dec–7 Jan · SUST 1–25 Dec · BUTEX 1 Dec–10 Jan · BUP 1 Dec–5 Jan · CoU 10–31 Dec · CU 10 Dec–10 Jan. MIST apps 5–21 January.",
    punch: "Mark December early.",
    sourceLabel: "Admission//26 desk · 23 Nov 2026",
    sourceUrl: "/calendar",
    published: "2026-11-23",
    circularId: null,
  },
  {
    id: "n1123b-board",
    heat: "STREET",
    kicker: "MONDAY BOARD",
    headline: "Live: DU · RU · JU · KUET. Opening Wed: JnU · Agri. Circular: BUET.",
    body:
      "Finish DU by tonight (28 Nov), keep RU in the queue, and save 1 December for BUET. Calendar follows the circulars.",
    punch: "Forms first.",
    sourceLabel: "Admission//26 desk · 28 Nov 2026",
    sourceUrl: "/newswire",
    published: "2026-11-28",
    circularId: null,
  },
];
