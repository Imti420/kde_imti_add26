/**
 * Desk briefings — cycle n1123 · 23 Nov 2026.
 * Board from compiled application schedule + locked circulars.
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
    id: "n1123-du",
    heat: "HOT",
    kicker: "DU · ~2 DAYS",
    headline: "Dhaka University forms close 25 November at 23:59.",
    body:
      "Two days left on admission.eis.du.ac.bd. Fees: Science / Arts / Business ৳1,200 · Fine Arts ৳1,400 · IBA ৳1,500. December unit tests unchanged.",
    punch: "Finish DU by Tuesday night.",
    sourceLabel: "admission.eis.du.ac.bd · 23 Nov 2026",
    sourceUrl: "https://admission.eis.du.ac.bd/",
    published: "2026-11-23",
    circularId: "c-du",
  },
  {
    id: "n1123-ru",
    heat: "HOT",
    kicker: "RU · OPEN",
    headline: "Rajshahi applications through 30 November.",
    body:
      "Still open. Fees on the compiled board: A/C ৳1,320 · B ৳1,100. Unit tests B 12 Feb · C 13 Feb · A 20 Feb.",
    punch: "RU closes next Sunday.",
    sourceLabel: "admission.ru.ac.bd · 23 Nov 2026",
    sourceUrl: "https://admission.ru.ac.bd/",
    published: "2026-11-23",
    circularId: "c-ru",
  },
  {
    id: "n1123-ju",
    heat: "HOT",
    kicker: "JU · OPEN",
    headline: "Jahangirnagar applications are open through 15 December.",
    body:
      "Opened 22 November 10:00. Fees: A/B/C/D ৳800 · E ৳700 · C1/IBA ৳600 (+1.2% service). Tests tentatively 10–21 January.",
    punch: "JU form is live.",
    sourceLabel: "JU circular line · 23 Nov 2026",
    sourceUrl: "/circulars/c-ju",
    published: "2026-11-23",
    circularId: "c-ju",
  },
  {
    id: "n1123-jnu",
    heat: "SYSTEM",
    kicker: "JnU · WEDNESDAY",
    headline: "Jagannath applications open 25 November through 10 December.",
    body:
      "Starts Wednesday 12:00. Fees: A–D ৳1,200 · E ৳1,500. Unit tests 1–23 January on the locked grid.",
    punch: "JnU form this Wednesday.",
    sourceLabel: "admission.jnu.ac.bd · 23 Nov 2026",
    sourceUrl: "https://admission.jnu.ac.bd/",
    published: "2026-11-23",
    circularId: "c-jnu",
  },
  {
    id: "n1123-agri",
    heat: "SYSTEM",
    kicker: "AGRI · WEDNESDAY",
    headline: "Agricultural cluster applications from 25 November to 15 December.",
    body:
      "Site opens Wednesday. Combined test 2 January 2027. Fee on the board ৳1,600 — confirm on ACAS before paying.",
    punch: "Agri form this week.",
    sourceLabel: "ACAS cluster · desk · 23 Nov",
    sourceUrl: "/circulars/c-agri",
    published: "2026-11-23",
    circularId: "c-agri",
  },
  {
    id: "n1123-kuet",
    heat: "HOT",
    kicker: "KUET · OPEN",
    headline: "KUET applications still open through 10 December 17:00.",
    body:
      "Test 8 January. Centre fees: Khulna ৳1,500 · Dhaka/Rajshahi ৳1,800. PDF still the cleanest engineering circular on the desk.",
    punch: "Already open.",
    sourceLabel: "admission.kuet.ac.bd · 23 Nov 2026",
    sourceUrl: "https://admission.kuet.ac.bd/",
    published: "2026-11-23",
    circularId: "c-kuet",
  },
  {
    id: "n1123-dec",
    heat: "STREET",
    kicker: "DECEMBER BOARD",
    headline: "December opens: SUST · BUTEX · BUP · CoU · CU.",
    body:
      "SUST 1–25 Dec · BUTEX 1 Dec–10 Jan · BUP 1 Dec–5 Jan · CoU 10–31 Dec · CU 10 Dec–10 Jan. MIST forms 5–21 January.",
    punch: "Mark December early.",
    sourceLabel: "Admission//26 desk · 23 Nov 2026",
    sourceUrl: "/calendar",
    published: "2026-11-23",
    circularId: null,
  },
  {
    id: "n1123-cu",
    heat: "SYSTEM",
    kicker: "CU · 10 DEC",
    headline: "Chittagong applications open 10 December through 10 January.",
    body:
      "Fee ৳1,000 on the compiled board. Unit tests still 29 Jan – 8 Feb. Not a November form.",
    punch: "CU is a December form.",
    sourceLabel: "CU schedule · desk · 23 Nov",
    sourceUrl: "/circulars/c-cu",
    published: "2026-11-23",
    circularId: "c-cu",
  },
  {
    id: "n1123-buet",
    heat: "SYSTEM",
    kicker: "BUET · 1 FEB",
    headline: "BUET test stays 1 February; applications through 7 January.",
    body:
      "App window from about 21 November. Written test 1 Feb 2027. GPA wall unchanged. Confirm fee on buet.ac.bd.",
    punch: "Engineering date locked.",
    sourceLabel: "BUET desk · 23 Nov 2026",
    sourceUrl: "/circulars/c-buet",
    published: "2026-11-23",
    circularId: "c-buet",
  },
];
