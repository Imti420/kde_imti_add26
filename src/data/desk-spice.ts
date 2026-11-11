/**
 * Desk-written spicy briefings — not crawler headlines.
 * Day cycle 11 Nov 2026 ~16:00 +06 — Agent 02 news intelligence.
 * DU window is OPEN. BUET notice locked. UGC floor still on the books.
 * New ids force alert fan-out.
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
}

export const SPICE_CARDS: SpiceCard[] = [
  {
    id: "n1111-du-open",
    heat: "NUKE",
    kicker: "DU · LIVE NOW · 11 NOV 12:00 → 25 NOV 23:59",
    headline:
      "Dhaka University applications are OPEN. Portal is taking forms. Close 25 November 23:59. UGC said January. DU said no — and meant it.",
    body:
      "admission.eis.du.ac.bd is live as of noon 11 Nov. Unit tests still Dec: IBA 5 · Science 12 · Arts/Law/Social 19 · Fine Arts 22 · Business 26. Re-evaluation results due 23 Nov still fit inside the close. Some subject bars were eased on 9 Nov; the calendar was not. If you are aiming at DU, the national January speech is background noise.",
    punch: "The form is open. The fight is over for DU applicants.",
    sourceLabel: "DU portal · TBS · Observer · Channel I · Jago News · 9–11 Nov 2026",
    sourceUrl: "https://admission.eis.du.ac.bd/",
    published: "2026-11-11",
  },
  {
    id: "n1111-buet-notice",
    heat: "WAR",
    kicker: "BUET · 10 NOV NOTICE · TEST 16 JAN STANDS",
    headline:
      "BUET published a notice: first-year test stays 16 January 2027. Applications from 21 November. After DU, the second heavyweight walked off the UGC script.",
    body:
      "Prothom Alo and Jago News (10–11 Nov): BUET’s brief website notice keeps 16 Jan. Apps open 21 Nov; close date still not in that notice. GPA wall unchanged — A+ in Physics, Chemistry, Higher Math. Only ~10,000 will sit the test. Two flagships are now off the commission’s January/February floor.",
    punch: "A notice beats a press conference.",
    sourceLabel: "Prothom Alo · Jago News · BUET notice · 10–11 Nov 2026",
    sourceUrl: "https://en.prothomalo.com/youth/education/rkb167dkiy",
    published: "2026-11-11",
  },
  {
    id: "n1111-ugc-floor",
    heat: "SYSTEM",
    kicker: "UGC · JAN APPS · FEB TESTS · STILL ON THE BOOKS",
    headline:
      "UGC’s 9 Nov floor is not withdrawn: public university applications from 1 January, tests after 1 February. Compliance is voluntary — and uneven.",
    body:
      "Chairman Mamun Ahmed: wait for HSC re-eval + supplementary by 31 Dec, then open the gate. DU and BUET refused. AAUB deferred to 30 January. JU says no plan to postpone (tests still sketched 10–21 Jan). The “national” calendar is a menu, not a law.",
    punch: "Floor without enforcement is a suggestion with letterhead.",
    sourceLabel: "bdnews24 · Daily Campus · Daily Sun · UGC briefing · 9–11 Nov 2026",
    sourceUrl: "https://bdnews24.com/education/5ntai555o0",
    published: "2026-11-11",
  },
  {
    id: "n1111-dgme-18",
    heat: "HOT",
    kicker: "DGME · MEDICAL TEST 18 DEC · CIRCULAR STILL MISSING",
    headline:
      "DGME still locks medical/dental admission test for 18 December. Formal circular not published as of 11 Nov afternoon. Apps still expected mid-November.",
    body:
      "DG Nazmul Hossain (Daily Campus 10 Nov): 18 Dec finalised; policy in one or two days; online apps likely 15–18 Nov. Health ministry, not UGC. Retakers starting 1 Dec are likely locked out unless the ministry invents a bridge. Two new govt medical colleges (Thakurgaon, Narsingdi) in the mix.",
    punch: "Different ministry. Different clock. Same stressed cohort.",
    sourceLabel: "Daily Campus · Observer · Daily Sun · bdnews24 · DGME · 7–10 Nov 2026",
    sourceUrl: "https://english.thedailycampus.com/university-admission/3888",
    published: "2026-11-11",
  },
  {
    id: "n1111-kuet-live",
    heat: "HOT",
    kicker: "KUET · APPS LIVE · TEST 8 JAN · ~1105 SEATS",
    headline:
      "KUET application window is open — through 10 December 17:00. Written test 8 January in Khulna, Dhaka, Rajshahi.",
    body:
      "Circular on file: ~1,105 seats across 17 departments. Not waiting for the UGC winter. If engineering is the plan and BUET’s wall is too high, this window is real money already moving.",
    punch: "Live portal > press promise.",
    sourceLabel: "KUET circular · desk archive · Nov 2026",
    sourceUrl: "https://admission.kuet.ac.bd",
    published: "2026-11-11",
  },
  {
    id: "n1111-ju-hold",
    heat: "STREET",
    kicker: "JU · NO PLAN TO POSTPONE · JAN 10–21 SKETCH",
    headline:
      "Jahangirnagar University: no plan to postpone. Pro-VC (Education) says the October schedule still stands — tests 10–21 January, campus only.",
    body:
      "TBS and Daily Campus (10 Nov): Ali Reza / Prof Shamsul Alam — preparations continue; VC abroad; Central Admission Committee may revisit later. Not a formal circular. Not a UGC compliance letter. A third major campus leaning away from February.",
    punch: "Tentative is still a direction.",
    sourceLabel: "TBS · Daily Campus · 10 Nov 2026",
    sourceUrl: "https://www.tbsnews.net/bangladesh/no-plan-postpone-ju-admission-tests-despite-ugc-decision-1598286",
    published: "2026-11-11",
  },
  {
    id: "n1111-aaub-obeys",
    heat: "SYSTEM",
    kicker: "AAUB · COMPLIED · TEST MOVED TO 30 JAN",
    headline:
      "Aviation and Aerospace University Bangladesh deferred its test from 5 December to 30 January after the UGC meeting. Proof someone listened.",
    body:
      "Official circular 9 Nov afternoon. Two centres: BAF Shaheen College Dhaka and Lalmonirhat campus. Specialized public uni, not a heavyweight — but the first clear formal compliance on the desk.",
    punch: "Someone moved. Most have not.",
    sourceLabel: "Digi Bangla · AAUB circular · 9 Nov 2026",
    sourceUrl: "https://digibanglatech.news/195219",
    published: "2026-11-11",
  },
  {
    id: "n1111-retake-split",
    heat: "MARKET",
    kicker: "RETAKES · 1 DEC START · WHO GETS A SEAT",
    headline:
      "HSC retakes begin 1 December. UGC moved the public calendar for them. DU’s November gate and BUET’s GPA wall mostly leave them outside.",
    body:
      "Results expected by 31 Dec. Medical on 18 Dec almost certainly closes before revised results. January-application campuses (if they obey) are the path. Coaching batches are already splitting: “apply DU now” vs “wait for the national gate.”",
    punch: "Equity for retakers is not automatic. It is a campus choice.",
    sourceLabel: "UGC briefing · DGME lines · desk synthesis · 9–11 Nov 2026",
    sourceUrl: "https://bdnews24.com/education/5ntai555o0",
    published: "2026-11-11",
  },
  {
    id: "n1111-desk-tonight",
    heat: "STREET",
    kicker: "DESK · 11 NOV NIGHT · WHAT ACTUALLY MATTERS",
    headline:
      "1) DU form is open — close 25 Nov. 2) BUET apps 21 Nov, test 16 Jan. 3) Medical circular still not on paper. 4) UGC floor still exists for everyone else.",
    body:
      "Do not wait for a single national timetable. Track portals: admission.eis.du.ac.bd, BUET notice board, KUET, and DGME when the PDF lands. AAUB complied; DU and BUET did not. JU is leaning hold. Your clash table is personal now.",
    punch: "Tonight: apply or shortlist. Do not refresh the same rumour.",
    sourceLabel: "Desk synthesis · verified 11 Nov 2026",
    sourceUrl: "https://kdeimtiadd26.vercel.app/newswire",
    published: "2026-11-11",
  },
];
