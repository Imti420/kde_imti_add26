/**
 * Desk-written spicy briefings — not crawler headlines.
 * Cycle n1112b · 12 Nov 2026 night — CoU apps delayed; CU window moves; flagships still hold.
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
    id: "n1112b-cou-delay",
    heat: "HOT",
    kicker: "12 NOV · COMILLA · WINDOW MOVED",
    headline:
      "Comilla University just pushed applications to 10–31 December. Tests stay 5–7 February. The early-November open is dead.",
    body:
      "Prothom Alo / Times of Bangladesh / Kaler Kantho (11–12 Nov): VC MM Shariful Karim’s central admission committee delayed CoU apps from the old 15 Nov–10 Dec plan to 10–31 Dec. A unit 5 Feb 11:00 (Science & Engineering), B unit 6 Feb 15:00 (Arts/SS/Law), C unit 7 Feb 11:00 (Business). HSC 2026 supplementary candidates may apply. Own test — not GST. Formal PDF still not on the desk.",
    punch: "CoU is on the board. Mark Dec 10.",
    sourceLabel: "Prothom Alo · Times of Bangladesh · Kaler Kantho · 11–12 Nov 2026",
    sourceUrl: "https://www.prothomalo.com/education/admission/gpl5kef7h0",
    published: "2026-11-12",
    circularId: "c-cou",
  },
  {
    id: "n1112b-split",
    heat: "NUKE",
    kicker: "TWO SPEEDS · STILL LIVE",
    headline:
      "DU and BUET still refuse the UGC floor. RU and JnU bent. CoU just joined the late-application club.",
    body:
      "DU apps open through 25 Nov; December unit tests. BUET apps from 21 Nov, test 16 Jan. RU tests from 12 Feb + resit window. JnU limited resit door. CoU apps now 10–31 Dec, tests early February. Campuses are picking clocks in public.",
    punch: "Same country. Different calendars.",
    sourceLabel: "bdnews24 · Prothom Alo · CoU committee · 11–12 Nov 2026",
    sourceUrl: "https://bdnews24.com/education/wk2v9xuw49",
    published: "2026-11-12",
    circularId: null,
  },
  {
    id: "n1112b-du-open",
    heat: "HOT",
    kicker: "DU · FORM LIVE",
    headline: "Dhaka University applications are open through 25 November. December tests unchanged.",
    body:
      "Portal live since 11 Nov noon. Close 25 Nov 23:59. Unit tests 5–26 Dec (IBA first). Fees raised on core units. Re-eval results due 23 Nov still fit the cutoff. Second-timers stay out.",
    punch: "Pay the portal. Don’t wait for UGC.",
    sourceLabel: "DU portal · Observer · Prothom Alo · 11–12 Nov 2026",
    sourceUrl: "https://admission.eis.du.ac.bd/",
    published: "2026-11-12",
    circularId: "c-du",
  },
  {
    id: "n1112b-buet",
    heat: "WAR",
    kicker: "BUET · HOLDS",
    headline: "BUET applications from 21 November. Written test 16 January. No UGC blink.",
    body:
      "Committee line unchanged: apps open 21 Nov, test 16 Jan 2027. GPA wall intact. ~1,309 seats. No formal full circular PDF on the desk yet — schedule is notice-backed.",
    punch: "Engineering clock does not move for the floor.",
    sourceLabel: "TBS · Prothom Alo · BUET notice · 7–11 Nov 2026",
    sourceUrl: "https://www.tbsnews.net/bangladesh/education/buet-admission-applications-open-21-nov-test-set-16-jan-1595726",
    published: "2026-11-12",
    circularId: "c-buet",
  },
  {
    id: "n1112b-kuet",
    heat: "HOT",
    kicker: "KUET · LIVE + PDF",
    headline: "KUET applications still live through 10 December. Test 8 January. Official PDF on file.",
    body:
      "Apps from 10 Nov; close 10 Dec 17:00. Test 8 Jan 2027. Circular PDF is the one archive document with a real mirror path. Don’t confuse with CoU’s December open.",
    punch: "One engineering PDF you can actually open.",
    sourceLabel: "KUET admission portal · desk archive",
    sourceUrl: "https://admission.kuet.ac.bd/",
    published: "2026-11-12",
    circularId: "c-kuet",
  },
  {
    id: "n1112b-cu",
    heat: "SYSTEM",
    kicker: "CU · WINDOW SLIDES",
    headline: "Chittagong University applications now line up for 20 December → 10 January.",
    body:
      "TBS (12 Nov): CU admission committee extended the undergraduate form window — open 20 Dec through 10 Jan. Tentative unit tests late Jan / early Feb. Supplementary examinees in the conversation. Confirm on admission.cu.ac.bd when the portal posts.",
    punch: "CU is not CoU. Check the portal name.",
    sourceLabel: "The Business Standard · 12 Nov 2026",
    sourceUrl: "https://www.tbsnews.net/bangladesh/education/cu-admission-applications-open-20-december-hsc-supplementary-examinees-eligible",
    published: "2026-11-12",
    circularId: "c-cu",
  },
  {
    id: "n1112b-medical",
    heat: "HOT",
    kicker: "MEDICAL · 18 DEC",
    headline: "National medical/dental test still pointing at 18 December. Formal DGME circular PDF still missing.",
    body:
      "Multiple campus wires keep 18 Dec as the medical test day. Application window expected mid-November if the circular lands. Do not invent a PDF — desk shows reported only until DGME publishes.",
    punch: "No PDF, no invented fee.",
    sourceLabel: "Daily Campus · Daily Sun · desk · Nov 2026",
    sourceUrl: "https://thedailycampus.com/",
    published: "2026-11-12",
    circularId: "c-dghs",
  },
  {
    id: "n1112b-ru-jnu",
    heat: "SYSTEM",
    kicker: "RU / JnU · BEND",
    headline: "Rajshahi tests from mid-February. Jagannath opens a limited resit door on SSC marks.",
    body:
      "RU VC line: tests from 12 Feb, separate window for supplementary passers. JnU: up to two-subject resit candidates may apply on SSC; apps 25 Nov–10 Dec. Opposite of DU/BUET.",
    punch: "Resit policy is campus-by-campus.",
    sourceLabel: "bdnews24 · 11 Nov 2026",
    sourceUrl: "https://bdnews24.com/education/wk2v9xuw49",
    published: "2026-11-12",
    circularId: "c-ru",
  },
  {
    id: "n1112b-desk",
    heat: "STREET",
    kicker: "DESK · TONIGHT",
    headline: "Tonight’s only list: DU form · CoU Dec 10 · BUET 21 Nov · medical PDF · KUET close clock.",
    body:
      "If you are sitting DU, the portal is open. If you are watching CoU, do not show up in November — applications start 10 December. BUET opens 21 Nov. Medical still waiting on DGME paper. KUET already counting down to 10 Dec close.",
    punch: "Write the dates. Ignore the rumour graphic.",
    sourceLabel: "Admission//26 desk · 12 Nov 2026",
    sourceUrl: "/newswire",
    published: "2026-11-12",
    circularId: null,
  },
];
