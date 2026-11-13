/**
 * Desk-written spicy briefings — not crawler headlines.
 * Cycle n1113 · 13 Nov 2026 afternoon — DU clock runs; JnU/RU open in 48h; 12 unis locked schedules.
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
    id: "n1113-du-clock",
    heat: "HOT",
    kicker: "13 NOV · DU · ~12 DAYS LEFT",
    headline:
      "Dhaka University applications still open — close 25 November 23:59. December unit tests do not move.",
    body:
      "Portal live since 11 Nov noon. Observer / Prothom Alo: only 2026 HSC batch; second-timers out. Science combined GPA 8.0 (3.5 each); Arts/Business 7.5; Fine Arts 6.5; IBA 8.0. Fees: core units ৳1,200 · Fine Arts ৳1,400 · IBA ৳1,500. Tests 5–26 Dec. Re-eval results due 23 Nov still fit the close.",
    punch: "If DU is the target, the form is the job this week.",
    sourceLabel: "DU portal · Observer · Prothom Alo · 11–13 Nov 2026",
    sourceUrl: "https://admission.eis.du.ac.bd/",
    published: "2026-11-13",
    circularId: "c-du",
  },
  {
    id: "n1113-jnu-ru-open",
    heat: "NUKE",
    kicker: "48 HOURS · TWO PORTALS",
    headline:
      "JnU and RU applications open 15 November. Mark the calendar — both windows are short.",
    body:
      "JnU (circular line 11 Nov): apps 15 Nov 12:00 → 10 Dec 23:59; five-unit MCQ tests 1–23 Jan in Dhaka; ~2,765 seats reported. RU (Prothom Alo / committee): apps 15–30 Nov; tests pushed to 12 Feb (B), 13 Feb (C), 20 Feb (A); seven-day late window for supplementary passers after results. Opposite clocks from DU/BUET.",
    punch: "Saturday morning: two forms, two strategies.",
    sourceLabel: "Prothom Alo · Alormela · JnU / RU committees · 11–13 Nov 2026",
    sourceUrl: "https://www.prothomalo.com/education/admission/syafosa3pv",
    published: "2026-11-13",
    circularId: "c-jnu",
  },
  {
    id: "n1113-twelve-lock",
    heat: "SYSTEM",
    kicker: "BOARD · 12 UNIVERSITIES",
    headline:
      "Twelve universities have locked 2026–27 test dates. The national board is no longer a rumour graphic.",
    body:
      "Prothom Alo / Jugantor (11–12 Nov): DU Dec · JnU Jan · RU Feb · BUET 16 Jan · KUET 8 Jan · KU mid-Dec · MIST 18–19 Dec · CoU early Feb · CU late Jan/early Feb and more. Clashes still exist — 8 Jan packs KUET + JnU E + others. Pick before you pay.",
    punch: "One board. Multiple clocks. Choose.",
    sourceLabel: "Prothom Alo · Jugantor · RTV · 11–13 Nov 2026",
    sourceUrl: "https://www.prothomalo.com/education/admission/nonjv8wels",
    published: "2026-11-13",
    circularId: null,
  },
  {
    id: "n1113-buet",
    heat: "WAR",
    kicker: "BUET · 8 DAYS TO APPS",
    headline:
      "BUET applications open 21 November. Written test holds 16 January. GPA wall unchanged.",
    body:
      "Notice-backed: no preliminary MCQ; ~1,309 seats; SSC ≥4.00 science; HSC GPA 5.00 with A+ in Physics, Chemistry, Higher Math. Application close still not announced in the stored notice. Flagship engineering clock ignores the UGC floor.",
    punch: "Prepare the grade sheet. Portal opens next week.",
    sourceLabel: "BUET notice · TBS · students.bd · 8–13 Nov 2026",
    sourceUrl: "https://students.bd/en/news/buet-admission-test-date-january-16-application-guidelines",
    published: "2026-11-13",
    circularId: "c-buet",
  },
  {
    id: "n1113-kuet",
    heat: "HOT",
    kicker: "KUET · LIVE + PDF",
    headline:
      "KUET applications live through 10 December 17:00. Test 8 January. Official circular PDF on this archive.",
    body:
      "Apps from 10 Nov. 1,105 seats. Centres Khulna / Dhaka / Rajshahi. Fee ৳1,500 Khulna · ৳1,800 Dhaka/Rajshahi. Eligible list targeted 20 Dec. Still the cleanest engineering PDF on the desk.",
    punch: "If engineering is the path, KUET is already counting.",
    sourceLabel: "KUET admission portal · desk archive · 13 Nov 2026",
    sourceUrl: "https://admission.kuet.ac.bd/",
    published: "2026-11-13",
    circularId: "c-kuet",
  },
  {
    id: "n1113-ru-feb",
    heat: "SYSTEM",
    kicker: "RU · FEBRUARY GRID",
    headline:
      "Rajshahi University tests: 12 Feb Business · 13 Feb Science · 20 Feb Arts. January grid is dead.",
    body:
      "Prothom Alo (11 Nov) + committee line: apps 15–30 Nov; supplementary passers get about seven extra days after results. GPA bars under revision for the session — confirm on the formal circular when it lands. Not the old 8/9/16 Jan plan.",
    punch: "RU is on the UGC-leaning clock.",
    sourceLabel: "Prothom Alo · RU committee · 11–13 Nov 2026",
    sourceUrl: "https://www.prothomalo.com/education/admission/syafosa3pv",
    published: "2026-11-13",
    circularId: "c-ru",
  },
  {
    id: "n1113-medical",
    heat: "HOT",
    kicker: "MEDICAL · 18 DEC",
    headline:
      "National MBBS/BDS test still pointing at 18 December. Formal DGME circular PDF still not on the desk.",
    body:
      "Campus wires and coaching calendars keep 18 Dec. Application window expected mid-to-late November if the circular publishes. Outside the UGC public-uni fight. No invented fee, no invented portal until DGME posts.",
    punch: "Reported day. Missing paper.",
    sourceLabel: "Observer · Daily Campus · desk · 12–13 Nov 2026",
    sourceUrl: "https://observerbd.com/news/605584",
    published: "2026-11-13",
    circularId: "c-dghs",
  },
  {
    id: "n1113-cou-cu",
    heat: "SYSTEM",
    kicker: "LATE WINDOWS",
    headline:
      "CoU applications 10–31 December · CU applications 20 December → 10 January. November is not their month.",
    body:
      "CoU tests 5–7 Feb (A/B/C). CU tentative unit tests late Jan / early Feb — confirm on admission.cu.ac.bd. Both campuses talking supplementary examinees. Do not confuse CoU with CU on the form.",
    punch: "Wrong portal = wasted fee.",
    sourceLabel: "Prothom Alo · TBS · 11–12 Nov 2026",
    sourceUrl: "https://www.prothomalo.com/education/admission/gpl5kef7h0",
    published: "2026-11-13",
    circularId: "c-cou",
  },
  {
    id: "n1113-desk",
    heat: "STREET",
    kicker: "DESK · 13 NOV",
    headline:
      "This week’s only list: DU form · JnU/RU Saturday open · BUET 21 Nov · KUET close clock · medical PDF hunt.",
    body:
      "DU is live and counting down. JnU and RU open in two days. BUET opens next Friday. KUET already running to 10 Dec. Medical still waiting on DGME paper. Twelve universities have dates — clashes are real. Write the board; ignore the Facebook graphic.",
    punch: "Forms first. Arguments later.",
    sourceLabel: "Admission//26 desk · 13 Nov 2026",
    sourceUrl: "/newswire",
    published: "2026-11-13",
    circularId: null,
  },
];
