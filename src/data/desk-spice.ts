/**
 * Desk-written spicy briefings — not crawler headlines.
 * Cycle n1112 · 12 Nov 2026 early — DU day-2 open + RU/JnU bend while flagships hold.
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
    id: "n1112-split-hardens",
    heat: "NUKE",
    kicker: "12 NOV · TWO SPEEDS · FLAGSHIPS VS BENDERS",
    headline:
      "DU and BUET are still on their own clocks. Rajshahi has pushed tests toward mid-February and opened a late window for supplementary passers. Jagannath will let some resit candidates apply on SSC marks. The UGC floor is no longer theoretical — campuses are picking sides in public.",
    body:
      "bdnews24 (11 Nov evening): RU VC says tests begin 12 Feb with Business unit; initial apps mid-Nov, plus a separate seven-day window after supplementary results. JnU: candidates sitting supplementary in up to two subjects may register on SSC qualifications; apps 25 Nov–10 Dec, tests from 1 Jan. DU form stays open through 25 Nov. BUET apps still from 21 Nov, test 16 Jan. Same country, opposite calendars.",
    punch: "Pick your campus. Pick your clock.",
    sourceLabel: "bdnews24 · Prothom Alo · campus lines · 11–12 Nov 2026",
    sourceUrl: "https://bdnews24.com/education/wk2v9xuw49",
    published: "2026-11-12",
    circularId: null,
  },
  {
    id: "n1112-du-day2",
    heat: "HOT",
    kicker: "DU · DAY 2 OF APPS · CLOSE 25 NOV 23:59",
    headline:
      "Dhaka University portal is live for a second day. Fees are up on four units. December unit tests unchanged. UGC’s January floor did not land here.",
    body:
      "Prothom Alo (11 Nov): Science / Arts-Law-Social / Business fee ৳1,050 → ৳1,200; Fine Arts ৳1,250 → ৳1,400; IBA line separate. Tests: IBA 5 Dec · Science 12 · Arts/Law/Social 19 · Fine Arts 22 · Business 26. Re-eval results due 23 Nov still fit inside the close. Portal: admission.eis.du.ac.bd.",
    punch: "Pay what the portal shows. Close is 25 Nov.",
    sourceLabel: "Prothom Alo · DU portal · 11–12 Nov 2026",
    sourceUrl: "https://en.prothomalo.com/youth/education/yn8t4d7jwg",
    published: "2026-11-12",
    circularId: "c-du",
  },
  {
    id: "n1112-buet-holds",
    heat: "WAR",
    kicker: "BUET · APPS 21 NOV · TEST 16 JAN",
    headline:
      "BUET still has not blinked. Registration window opens 21 November. Written test 16 January 2027. Close date still not in the short notice.",
    body:
      "Committee line matches the 10 Nov website notice. No preliminary MCQ expected (same pattern as last cycle). GPA wall intact. Flagship engineering is not waiting for UGC’s after-1-Feb floor or for RU’s February rewrite.",
    punch: "Mark 21 Nov. Full circular still pending.",
    sourceLabel: "Prothom Alo · Jago · BUET notice · bdnews24 · 10–11 Nov 2026",
    sourceUrl: "https://en.prothomalo.com/youth/education/rkb167dkiy",
    published: "2026-11-12",
    circularId: "c-buet",
  },
  {
    id: "n1112-ru-bends",
    heat: "SYSTEM",
    kicker: "RU · TESTS FROM 12 FEB · RESIT WINDOW",
    headline:
      "Rajshahi University is the clearest public bend toward the UGC timeline: tests from 12 February, plus a separate application window for supplementary passers after results drop.",
    body:
      "bdnews24 cites VC Prof Md Faridul Islam: Business faculty unit first on 12 Feb; initial applications 15–30 Nov; seven extra days for supplementary candidates once results publish. That is not the same as DU’s hard 25 Nov close. Treat prior Jan unit dates in older desk rows as superseded pending a formal RU circular PDF.",
    punch: "RU moved. Update your shortlist math.",
    sourceLabel: "bdnews24 · RU VC line · 11 Nov 2026",
    sourceUrl: "https://bdnews24.com/education/wk2v9xuw49",
    published: "2026-11-12",
    circularId: "c-ru",
  },
  {
    id: "n1112-jnu-resit",
    heat: "SYSTEM",
    kicker: "JnU · RESIT DOOR AJAR · APPS 25 NOV–10 DEC",
    headline:
      "Jagannath will let candidates sitting supplementary exams in up to two subjects apply using SSC qualifications. Tests still from 1 January — not a full slide to February.",
    body:
      "bdnews24: apps 25 Nov–10 Dec; A unit science from 1 Jan. This is a targeted accommodation, not a UGC-style national reset. Confirm on JnU’s own notice before treating it as final eligibility law.",
    punch: "Partial mercy. Still a January campus.",
    sourceLabel: "bdnews24 · JnU line · 11 Nov 2026",
    sourceUrl: "https://bdnews24.com/education/wk2v9xuw49",
    published: "2026-11-12",
    circularId: "c-jnu",
  },
  {
    id: "n1112-kuet-live",
    heat: "HOT",
    kicker: "KUET · APPS LIVE · PDF ON FILE",
    headline:
      "KUET applications still open through 10 December. Test 8 January 2027. Official circular PDF remains on the circular record.",
    body:
      "Portal admission.kuet.ac.bd. Centres KUET / DU / RUET. ~1,105 seats. Own engineering track — not waiting on February.",
    punch: "PDF on record. Portal is the form.",
    sourceLabel: "KUET admission portal · 10–12 Nov 2026",
    sourceUrl: "https://admission.kuet.ac.bd/",
    published: "2026-11-12",
    circularId: "c-kuet",
  },
  {
    id: "n1112-medical",
    heat: "HOT",
    kicker: "MEDICAL · 18 DEC · PDF STILL MISSING",
    headline:
      "MBBS/BDS test line remains 18 December. Outside the UGC public-uni fight. Formal DGME circular PDF still not on the desk.",
    body:
      "Jugantor’s 11 Nov round-up still lists medical/dental on 18 Dec among twelve institutions with “final” dates. Apps expected mid-November — still expected, not locked, until the PDF appears on dgme.gov.bd.",
    punch: "Date without PDF is incomplete.",
    sourceLabel: "Jugantor · Observer · DGME lines · 11–12 Nov 2026",
    sourceUrl: "https://www.jugantor.com/campus/1182745",
    published: "2026-11-12",
    circularId: "c-dghs",
  },
  {
    id: "n1112-fee-trap",
    heat: "MARKET",
    kicker: "DU FEES · UP · PAY THE PORTAL",
    headline:
      "DU raised application fees on four units this cycle. Coaching screenshots and last year’s numbers are wrong. Checkout amount is whatever admission.eis.du.ac.bd shows.",
    body:
      "Science / ALS / Business ৳1,200; Fine Arts ৳1,400 per Prothom Alo’s 11 Nov readout. Gateway charges extra. If a page or page admin quotes ৳1,050, it is stale.",
    punch: "Portal amount wins. Always.",
    sourceLabel: "Prothom Alo · DU fee line · 11 Nov 2026",
    sourceUrl: "https://en.prothomalo.com/youth/education/yn8t4d7jwg",
    published: "2026-11-12",
    circularId: "c-du",
  },
  {
    id: "n1112-desk",
    heat: "STREET",
    kicker: "DESK · 12 NOV · WHAT TO DO",
    headline:
      "1) DU form open — close 25 Nov. 2) BUET apps 21 Nov. 3) KUET live + PDF. 4) RU bending to February + resit window. 5) JnU partial resit door. 6) Medical PDF still missing.",
    body:
      "The national story is no longer one timetable. It is a split: flagships holding, some generals accommodating retakers, medical on its own track. Track circular rows in-app. Do not wait for a single PDF that has not been issued.",
    punch: "Circular record first.",
    sourceLabel: "Desk synthesis · 12 Nov 2026",
    sourceUrl: "https://kdeimtiadd26.vercel.app/circulars",
    published: "2026-11-12",
    circularId: null,
  },
];
