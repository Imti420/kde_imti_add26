/**
 * Desk-written spicy briefings — not crawler headlines.
 * Evening cycle 11 Nov 2026 — UGC floor vs campuses that simply did not move.
 * New ids so alert fan-out treats them as fresh.
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
  /** When set, primary action goes to /circulars/<id> (in-app). */
  circularId: string | null;
}

export const SPICE_CARDS: SpiceCard[] = [
  {
    id: "n1117-ugc-ignored",
    heat: "NUKE",
    kicker: "UGC · JAN/FEB FLOOR · CAMPUSES DID NOT BLINK",
    headline:
      "UGC said public-uni apps from January, tests after 1 February. DU opened the form on 11 Nov anyway. BUET kept 16 Jan. Several others never moved their published grids. The commission still exists — a stack of flagships is acting like the briefing was optional.",
    body:
      "9 Nov VC meeting: wait for HSC re-eval / supplementary (~31 Dec), then national motion. Universities that already published were asked to reconsider. DU’s admission committee met the same day and kept Dec tests. BUET’s 10 Nov website notice kept 16 Jan. KUET apps are live on its own window. AAUB is one of the few reported formal slips. Floor is not a binding national circular PDF — and the heavyweights are treating it that way.",
    punch: "Read the campus notice. Not the press conference.",
    sourceLabel: "Prothom Alo · TBS · Jago · bdnews24 · Daily Star · 9–11 Nov 2026",
    sourceUrl: "https://en.prothomalo.com/youth/education/rkb167dkiy",
    published: "2026-11-11",
    circularId: null,
  },
  {
    id: "n1117-du-open",
    heat: "HOT",
    kicker: "DU · FORM OPEN · CLOSE 25 NOV 23:59",
    headline:
      "Dhaka University applications are live right now. Portal taking forms through 25 Nov 23:59. Unit tests still December. UGC’s January floor did not touch this calendar.",
    body:
      "admission.eis.du.ac.bd from noon 11 Nov. Tests: IBA 5 Dec · Science 12 · Arts/Law/Social 19 · Fine Arts 22 · Business 26. Re-eval results due 23 Nov still fit inside the close. DU said it had no involvement with the UGC decision and would follow its own highest forum. Portal-first.",
    punch: "The form is open. Ignore the rumour mill.",
    sourceLabel: "DU portal · TBS · Observer · Channel I · 9–11 Nov 2026",
    sourceUrl: "https://admission.eis.du.ac.bd/",
    published: "2026-11-11",
    circularId: "c-du",
  },
  {
    id: "n1117-buet-stands",
    heat: "WAR",
    kicker: "BUET · 10 NOV NOTICE · 16 JAN STANDS",
    headline:
      "BUET published a notice: first-year test stays 16 January 2027. Apps from 21 November. Second flagship off the UGC script after DU.",
    body:
      "Prothom Alo / Jago (10–11 Nov): brief website notice keeps 16 Jan. Application close still NOT ANNOUNCED in that notice. GPA wall unchanged. No preliminary MCQ pattern from last year is the working assumption until a fuller circular lands.",
    punch: "A notice beats a VC meeting photo-op.",
    sourceLabel: "Prothom Alo · Jago News · BUET notice · 10–11 Nov 2026",
    sourceUrl: "https://en.prothomalo.com/youth/education/rkb167dkiy",
    published: "2026-11-11",
    circularId: "c-buet",
  },
  {
    id: "n1117-kuet-live",
    heat: "HOT",
    kicker: "KUET · APPS LIVE · OFFICIAL PDF ON FILE",
    headline:
      "KUET applications open through 10 December. Test 8 January 2027. Official circular PDF is on the circular record — one of the few.",
    body:
      "Portal admission.kuet.ac.bd. Centres KUET / DU / RUET. ~1,105 seats. Own engineering track; not waiting on UGC’s February floor. Open the in-app circular for the PDF link.",
    punch: "PDF on record. Apply on the portal.",
    sourceLabel: "KUET admission portal + official circular · 10–11 Nov 2026",
    sourceUrl: "https://admission.kuet.ac.bd/",
    published: "2026-11-11",
    circularId: "c-kuet",
  },
  {
    id: "n1117-who-moved",
    heat: "SYSTEM",
    kicker: "WHO OBEYED · WHO DID NOT",
    headline:
      "Reported compliance is thin. AAUB deferred (5 Dec → 30 Jan). Most published grids — DU, BUET, KUET, and several others with Nov–Jan windows — are still on their own paper.",
    body:
      "UGC asked campuses that already published to reconsider. That is not the same as every university rewriting. JnU / RU / CU still carry local or preliminary lines in this archive; treat them as provisional under pressure, not as formal slips. Desk rule: no invented postponements.",
    punch: "Silence is not compliance.",
    sourceLabel: "Desk synthesis · Digi Bangla (AAUB) · campus notices · 9–11 Nov 2026",
    sourceUrl: "https://digibanglatech.news/195219",
    published: "2026-11-11",
    circularId: null,
  },
  {
    id: "n1117-dgme-18",
    heat: "HOT",
    kicker: "MEDICAL · 18 DEC · NOT UGC’S PROBLEM",
    headline:
      "DGME line remains 18 December for MBBS/BDS. Health education is outside the UGC public-uni floor. Formal admission circular PDF still missing.",
    body:
      "Daily Campus / Observer / bdnews24 carried DGME confirmation of 18 Dec. Apps expected mid-November — expected, not locked. Until the PDF is on dgme.gov.bd, application opens stay reported.",
    punch: "Date without PDF is still incomplete.",
    sourceLabel: "Daily Campus · Observer · bdnews24 · DGME lines · 7–11 Nov 2026",
    sourceUrl: "https://observerbd.com/news/604606",
    published: "2026-11-11",
    circularId: "c-dghs",
  },
  {
    id: "n1117-retake-split",
    heat: "MARKET",
    kicker: "RETAKES · 1 DEC · WHO GETS CUT",
    headline:
      "HSC retakes begin 1 December. Campuses that close before supplementary results drop will strand late passers. DU’s 25 Nov close is before that wave.",
    body:
      "UGC framed January apps as the fix for re-eval + supplementary students. Campuses holding Nov–Dec windows are choosing session speed over that cohort. Neither side is inventing the other out of existence — the split is the story.",
    punch: "Check the close date before you assume you’re covered.",
    sourceLabel: "UGC briefing · DU schedule · education desks · 9–11 Nov 2026",
    sourceUrl: "https://bdnews24.com/education/5ntai555o0",
    published: "2026-11-11",
    circularId: null,
  },
  {
    id: "n1117-clash-grid",
    heat: "STREET",
    kicker: "CLASH MAP · DEC–JAN STILL CROWDED",
    headline:
      "Published and provisional grids still stack mid-December through mid-January: DU units, MIST, KUET 8 Jan, RU / JnU fragments, BUET 16 Jan. UGC’s ‘after 1 Feb’ did not clear the calendar.",
    body:
      "Students chasing multiple campuses still need a personal clash sheet. This desk will not delete a local notice because a commission briefing preferred a later floor. Track circular records for what is actually on paper.",
    punch: "Your shortlist. Your calendar. Their notices.",
    sourceLabel: "Desk clash synthesis · Star timelines · campus notices · 11 Nov 2026",
    sourceUrl: "https://kdeimtiadd26.vercel.app/calendar",
    published: "2026-11-11",
    circularId: null,
  },
  {
    id: "n1117-desk-now",
    heat: "STREET",
    kicker: "DESK · 11 NOV EVENING · DO THESE",
    headline:
      "1) DU form is open — close 25 Nov. 2) BUET apps 21 Nov, test 16 Jan. 3) KUET PDF on file. 4) Medical circular still not on paper. 5) UGC floor is real for campuses that never published — not a delete key for the ones that did.",
    body:
      "In-app circular rows (DU · BUET · KUET · DGHS) are the spine. News URLs expire; the notice does not. Do not wait for one national timetable that has not been issued as a single PDF.",
    punch: "Circular record first. Rumour second.",
    sourceLabel: "Desk synthesis · verified 11 Nov 2026 evening",
    sourceUrl: "https://kdeimtiadd26.vercel.app/circulars",
    published: "2026-11-11",
    circularId: null,
  },
];
