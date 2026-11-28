/**
 * Desk briefings — cycle n1128b · copy pass 28 Nov 2026.
 * DU closes 28 Nov 23:59 (extended from 25). JnU + Agri already open.
 * Source dates on cards stay the day the fact was checked, not the copy-edit day.
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
    kicker: "DU · CLOSES 28 NOV",
    headline: "Dhaka University applications close 28 November 2026, 23:59.",
    body:
      "Extended three days from the original 25 Nov cut-off. Portal: admission.eis.du.ac.bd. Only the 2026 HSC batch. Unit tests: IBA 5 Dec · Science 12 Dec · Arts 19 Dec · Fine Arts 22 Dec · Business 26 Dec 2026.",
    punch: "Apply before 28 Nov 23:59 if the portal still accepts forms.",
    sourceLabel: "Prothom Alo · admission.eis.du.ac.bd · checked 23 Nov 2026",
    sourceUrl: "https://admission.eis.du.ac.bd/",
    published: "2026-11-23",
    circularId: "c-du",
  },
  {
    id: "n1123b-buet",
    heat: "SYSTEM",
    kicker: "BUET · CIRCULAR",
    headline: "BUET circular is out — applications open 1 December 2026.",
    body:
      "Apps 1 Dec 2026 10:00 → 7 Jan 2027 15:00; fee pay by 8 Jan 2027 15:00. Eligible list ~16 Jan 2027. Test 1 February 2027. 1,309 seats. ~10,000 examinees shortlisted on HSC Math/Physics/Chemistry marks.",
    punch: "Engineering form from 1 December 2026.",
    sourceLabel: "BUET circular lines · checked 22–23 Nov 2026",
    sourceUrl: "https://www.buet.ac.bd/",
    published: "2026-11-23",
    circularId: "c-buet",
  },
  {
    id: "n1123b-ju",
    heat: "HOT",
    kicker: "JU · OPEN",
    headline: "Jahangirnagar applications are open through 15 December 2026.",
    body:
      "Opened 22 Nov 2026 10:00. About 1,848 seats in 37 departments. Admit cards from ~25 December. Tests tentatively 10–21 January 2027 — confirm on admission.juniv.edu.",
    punch: "JU form is live now.",
    sourceLabel: "admission.juniv.edu · checked 23 Nov 2026",
    sourceUrl: "/circulars/c-ju",
    published: "2026-11-23",
    circularId: "c-ju",
  },
  {
    id: "n1123b-ru",
    heat: "HOT",
    kicker: "RU · OPEN",
    headline: "Rajshahi applications through 30 November 2026.",
    body:
      "Still open this week. Unit tests B 12 Feb 2027 · C 13 Feb 2027 · A 20 Feb 2027. Supplementary passers get a short extra window after results.",
    punch: "RU closes 30 Nov 2026.",
    sourceLabel: "admission.ru.ac.bd · checked 23 Nov 2026",
    sourceUrl: "https://admission.ru.ac.bd/",
    published: "2026-11-23",
    circularId: "c-ru",
  },
  {
    id: "n1128-jnu",
    heat: "HOT",
    kicker: "JnU · OPEN",
    headline: "Jagannath applications are open through 10 December 2026.",
    body:
      "Window opened 25 Nov 2026 (already live). Closes 10 December 2026 23:59. Units A–E tests planned January 2027 (A 1 Jan · E 8 Jan · B 15 Jan · C 22 Jan · D 23 Jan on the stored grid — confirm on admission.jnu.ac.bd). Fees A–D ৳1,200 · E ৳1,500.",
    punch: "JnU form is open now.",
    sourceLabel: "desk schedule graphic · Tribune lines · checked 23 Nov 2026",
    sourceUrl: "https://admission.jnu.ac.bd/",
    published: "2026-11-23",
    circularId: "c-jnu",
  },
  {
    id: "n1123b-kuet",
    heat: "HOT",
    kicker: "KUET · OPEN",
    headline: "KUET applications still open through 10 December 2026, 17:00.",
    body:
      "Test 8 January 2027. Centres Khulna, Dhaka, Rajshahi. Official PDF on the admission portal.",
    punch: "Already open.",
    sourceLabel: "admission.kuet.ac.bd · checked 23 Nov 2026",
    sourceUrl: "https://admission.kuet.ac.bd/",
    published: "2026-11-23",
    circularId: "c-kuet",
  },
  {
    id: "n1128-agri",
    heat: "HOT",
    kicker: "AGRI · OPEN",
    headline: "Agricultural cluster applications are open through 15 December 2026.",
    body:
      "Window opened 25 Nov 2026 (already live). Combined test reported 2–3 January 2027 depending on source — confirm on acas.edu.bd. Fee lines differ in reports (৳1,200–৳1,600); pay only what the portal shows.",
    punch: "Agri form is open now.",
    sourceLabel: "Observer / ACAS reports · checked 20–23 Nov 2026",
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
      "BUET 1 Dec 2026–7 Jan 2027 · SUST 1–25 Dec 2026 · BUTEX 1 Dec 2026–10 Jan 2027 · BUP 1 Dec 2026–5 Jan 2027 · CoU 10–31 Dec 2026 · CU 10 Dec 2026–10 Jan 2027. MIST apps 5–21 January 2027.",
    punch: "Mark December early.",
    sourceLabel: "Admission//26 desk · checked 23 Nov 2026",
    sourceUrl: "/calendar",
    published: "2026-11-23",
    circularId: null,
  },
  {
    id: "n1128-board",
    heat: "STREET",
    kicker: "WEEKEND BOARD",
    headline: "Open now: DU · RU · JU · KUET · JnU · Agri. BUET circular ready for 1 Dec.",
    body:
      "DU closes 28 Nov 2026 23:59. RU closes 30 Nov. Keep December openers in the queue. Calendar follows the circular fields.",
    punch: "Forms first.",
    sourceLabel: "Admission//26 desk · copy pass 28 Nov 2026",
    sourceUrl: "/newswire",
    published: "2026-11-28",
    circularId: null,
  },
];
