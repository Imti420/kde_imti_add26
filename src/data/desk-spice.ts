/**
 * Desk-written spicy briefings — not crawler headlines.
 * Agent 02 · 11 Nov 2026 ~16:30 +06 — circularId deep-links for in-app circular surface.
 * New ids only when the claim is re-verified; superseded claims stay visible elsewhere.
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
  /** When set, primary action goes to /circulars/<id> (in-app). Coordinate name with A01. */
  circularId: string | null;
}

export const SPICE_CARDS: SpiceCard[] = [
  {
    id: "n1111-du-open",
    heat: "NUKE",
    kicker: "DU · LIVE NOW · 11 NOV 12:00 → 25 NOV 23:59",
    headline:
      "Dhaka University applications are OPEN. Portal is taking forms. Close 25 November 23:59. UGC said January. DU said no — and meant it.",
    body:
      "admission.eis.du.ac.bd is live as of noon 11 Nov. Unit tests still Dec: IBA 5 · Science 12 · Arts/Law/Social 19 · Fine Arts 22 · Business 26. Re-evaluation results due 23 Nov still fit inside the close. Some subject bars were eased on 9 Nov; the calendar was not. Portal-first — full PDF circular may still be pending on the university side.",
    punch: "The form is open. Open the DU circular record in-app for dates.",
    sourceLabel: "DU portal · TBS · Observer · Channel I · Jago News · 9–11 Nov 2026",
    sourceUrl: "https://admission.eis.du.ac.bd/",
    published: "2026-11-11",
    circularId: "c-du",
  },
  {
    id: "n1111-buet-notice",
    heat: "WAR",
    kicker: "BUET · 10 NOV NOTICE · TEST 16 JAN STANDS",
    headline:
      "BUET published a notice: first-year test stays 16 January 2027. Applications from 21 November. After DU, the second heavyweight walked off the UGC script.",
    body:
      "Prothom Alo and Jago News (10–11 Nov): BUET’s brief website notice keeps 16 Jan. Apps open 21 Nov; close date still NOT ANNOUNCED in that notice. GPA wall unchanged. Two flagships are now off the commission’s January/February floor. In-app circular record tracks the notice; full PDF may land later.",
    punch: "A notice beats a press conference.",
    sourceLabel: "Prothom Alo · Jago News · BUET notice · 10–11 Nov 2026",
    sourceUrl: "https://en.prothomalo.com/youth/education/rkb167dkiy",
    published: "2026-11-11",
    circularId: "c-buet",
  },
  {
    id: "n1111-ugc-floor",
    heat: "SYSTEM",
    kicker: "UGC · JAN APPS · FEB TESTS · STILL ON THE BOOKS",
    headline:
      "UGC’s 9 Nov floor is not withdrawn: public university applications from January, tests after 1 February — a recommendation + VC meeting outcome, not a single binding national circular PDF.",
    body:
      "Chairman Mamun Ahmed after the VC meeting: wait for HSC re-eval + supplementary results by ~31 Dec, then national public-uni motion. Universities that already published were asked to reconsider. DU and BUET have not. This is not the same as “UGC postponed every exam.” Do not treat the press briefing as a superseding circular.",
    punch: "Floor ≠ formal rewrite of every campus notice.",
    sourceLabel: "TBS · Daily Star · Prothom Alo · UGC briefing · 9 Nov 2026",
    sourceUrl: "https://www.tbsnews.net/bangladesh/education/public-university-admission-applications-open-january-tests-february-1597276",
    published: "2026-11-11",
    circularId: null,
  },
  {
    id: "n1111-dgme-18",
    heat: "HOT",
    kicker: "MEDICAL · 18 DEC TEST · CIRCULAR STILL MISSING",
    headline:
      "DGME line remains 18 December for MBBS/BDS. Formal admission circular PDF still not published as of this desk pass. Apps expected mid-November — expected, not locked.",
    body:
      "Health education is not under the UGC public-university floor. Daily Campus / Observer / bdnews24 carried DGME confirmation of 18 Dec. Until the PDF is on dgme.gov.bd, treat application opens as reported. In-app medical circular record stays the place to watch.",
    punch: "Date without PDF is still incomplete.",
    sourceLabel: "Daily Campus · Observer · bdnews24 · DGME lines · 7–11 Nov 2026",
    sourceUrl: "https://observerbd.com/news/604606",
    published: "2026-11-11",
    circularId: "c-dghs",
  },
  {
    id: "n1111-kuet-live",
    heat: "HOT",
    kicker: "KUET · APPS LIVE · OFFICIAL PDF ON FILE",
    headline:
      "KUET undergraduate applications are open through 10 December. Test 8 January 2027. Official circular PDF is attached on the KUET circular record.",
    body:
      "Portal admission.kuet.ac.bd. Window from 10 Nov. Centres: KUET, DU, RUET. ~1,105 seats. This is one of the few entries where an official PDF URL is on the circular record — open it in-app from the circular page (Agent 03/04 mirroring for offline is separate).",
    punch: "PDF on record. Apply on the portal.",
    sourceLabel: "KUET admission portal + official circular PDF · 10–11 Nov 2026",
    sourceUrl: "https://admission.kuet.ac.bd/",
    published: "2026-11-11",
    circularId: "c-kuet",
  },
  {
    id: "n1111-ju-hold",
    heat: "WAR",
    kicker: "JU · LEANING HOLD · NOT A FORMAL SLIP",
    headline:
      "Jahangirnagar coverage still points at keeping its published path rather than sliding fully to UGC’s February tests — treat as reported campus lean, not a scanned circular.",
    body:
      "TBS / Daily Campus (10 Nov): JU has no firm public “we postpone everything” PDF on this desk. UGC asked reconsideration. Until JU posts a formal notice, do not delete prior schedule claims; mark them provisional. No circularId until Agent 03 has a JnU/JU circular row with dates.",
    punch: "Lean ≠ circular.",
    sourceLabel: "TBS · Daily Campus · 10 Nov 2026",
    sourceUrl: "https://www.tbsnews.net/bangladesh/no-plan-postpone-ju-admission-tests-despite-ugc-decision-1598286",
    published: "2026-11-11",
    circularId: null,
  },
  {
    id: "n1111-aaub-obeys",
    heat: "SYSTEM",
    kicker: "AAUB · COMPLIED · TEST MOVED TO 30 JAN",
    headline:
      "Aviation and Aerospace University Bangladesh deferred its test from 5 December to 30 January after the UGC meeting — a reported formal campus move.",
    body:
      "Coverage cites an official circular 9 Nov afternoon. Two centres reported. Specialized public uni. First clear compliance story on the desk. No AAUB circular row in archive yet — circularId null until Agent 03 adds one.",
    punch: "Someone moved. Most have not.",
    sourceLabel: "Digi Bangla · AAUB circular coverage · 9 Nov 2026",
    sourceUrl: "https://digibanglatech.news/195219",
    published: "2026-11-11",
    circularId: null,
  },
  {
    id: "n1111-retake-split",
    heat: "MARKET",
    kicker: "RETAKES · 1 DEC START · WHO GETS A SEAT",
    headline:
      "HSC retakes begin 1 December. UGC moved the public calendar for them. DU’s November gate and BUET’s GPA wall mostly leave them outside.",
    body:
      "Results hoped by 31 Dec. Medical on 18 Dec likely closes before revised results. January-application campuses (if they obey) are the path. This is analysis, not an announcement of a single national PDF.",
    punch: "Equity for retakers is a campus choice.",
    sourceLabel: "UGC briefing · DGME lines · desk synthesis · 9–11 Nov 2026",
    sourceUrl: "https://bdnews24.com/education/5ntai555o0",
    published: "2026-11-11",
    circularId: null,
  },
  {
    id: "n1111-desk-tonight",
    heat: "STREET",
    kicker: "DESK · 11 NOV · WHAT ACTUALLY MATTERS",
    headline:
      "1) DU form is open — close 25 Nov. 2) BUET apps 21 Nov, test 16 Jan. 3) KUET PDF on file. 4) Medical circular still not on paper.",
    body:
      "Track in-app circular records, not only news URLs. DU · BUET · KUET · DGHS rows are the calendar spine. UGC floor still exists for campuses that have not rewritten. Do not wait for one national timetable.",
    punch: "Circular record first. Rumour second.",
    sourceLabel: "Desk synthesis · verified 11 Nov 2026",
    sourceUrl: "https://kdeimtiadd26.vercel.app/circulars",
    published: "2026-11-11",
    circularId: null,
  },
];
