/**
 * Desk-written spicy briefings — not crawler headlines.
 * Night cycle 10 Nov 2026 ~22:15 +06 — GO UPDATE NEWS.
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
    id: "n1022-du-tminus",
    heat: "NUKE",
    kicker: "DU · HOURS LEFT · NOON TOMORROW",
    headline:
      "Dhaka University applications open in hours — 11 November 12:00. Close 25 November 23:59. Portal is counting. UGC is not.",
    body:
      "admission.eis.du.ac.bd still runs the official clock. IBA 5 Dec · Science 12 · Arts/Law/Social 19 · Fine Arts 22 · Business 26. Pro-VC Alfasane: schedule holds; re-eval results 23 Nov still fit inside the close. Some subject bars were eased on 9 Nov. The calendar was not. If you are aiming at DU, the national January speech is noise.",
    punch: "Tonight is prep. Noon is the form.",
    sourceLabel: "DU portal · TBS · Observer · bdnews24 · 9–10 Nov 2026",
    sourceUrl: "https://admission.eis.du.ac.bd/",
    published: "2026-11-10",
  },
  {
    id: "n1022-ugc-vs-du",
    heat: "WAR",
    kicker: "UGC · JAN APPS · FEB TESTS · DU SAID NO",
    headline:
      "UGC + VCs sold January applications and February tests. DU’s committee met the same day and kept December. Both stories are still live at night.",
    body:
      "Chairman Mamun Ahmed: wait for HSC re-eval + supplementary by 31 Dec; then public university apps; tests after 1 Feb. DU VC was not in that room. Hours later the flagship refused. National equity vs session discipline — the season is split until other campuses pick a side.",
    punch: "A commission floor the flagship ignores is a press line.",
    sourceLabel: "bdnews24 · Daily Campus · UGC briefing · 9–10 Nov 2026",
    sourceUrl: "https://bdnews24.com/campus/qf1q223ws4",
    published: "2026-11-10",
  },
  {
    id: "n1022-dgme-18",
    heat: "HOT",
    kicker: "DGME · MEDICAL TEST 18 DEC · CIRCULAR DAYS AWAY",
    headline:
      "DGME locked medical/dental admission test for 18 December. Circular expected within days. Apps likely mid-November.",
    body:
      "DG Md Nazmul Hossain to The Daily Campus (10 Nov): 18 Dec finalised; policy in one or two days; online applications likely 15–18 Nov. Earlier 4 Dec and 11 Dec slots died on HSC delay and BCS clash. Medical is not inside the UGC January fight — different ministry, different clock, same stressed cohort.",
    punch: "Health education does not wait for the commission’s winter.",
    sourceLabel: "The Daily Campus · DGME · 10 Nov 2026",
    sourceUrl: "https://english.thedailycampus.com/university-admission/3888",
    published: "2026-11-10",
  },
  {
    id: "n1022-kuet-live",
    heat: "HOT",
    kicker: "KUET · APPS LIVE · TEST 8 JAN · 1105 SEATS",
    headline:
      "KUET application window is already open — 10 Nov morning to 10 Dec 17:00. Written test 8 January in Khulna, Dhaka, Rajshahi.",
    body:
      "Circular on file: ~1,105 seats across 17 departments. Eligible list 20 Dec. Merit 21 Jan. Fees differ by centre. Engineering did not wait for UGC’s February dream. Screenshot the fee page before the site melts.",
    punch: "Open portals beat deferred narratives.",
    sourceLabel: "KUET circular · admission guides · 3–10 Nov 2026",
    sourceUrl: "https://admission.kuet.ac.bd/",
    published: "2026-11-10",
  },
  {
    id: "n1022-buet-wall",
    heat: "SYSTEM",
    kicker: "BUET · 21 NOV APPS · 16 JAN TEST · GPA WALL",
    headline:
      "BUET’s last hard public line still stands: applications from 21 November, written test 16 January, A+ wall intact.",
    body:
      "Kamrul Hasan (7–8 Nov): prior circular remains; ~10k sit; GPA-5 HSC with A+ Physics/Chem/Higher Math; SSC science ≥ 4. No post-UGC rewrite found by night of 10 Nov. DU’s defiance raises the odds BUET holds — silence is not a postponement.",
    punch: "Until a new notice posts, treat 21 Nov as live.",
    sourceLabel: "TBS · bdnews24 · Prothom Alo · 7–10 Nov 2026",
    sourceUrl: "https://www.tbsnews.net/bangladesh/education/buet-admission-applications-open-21-nov-test-set-16-jan-1595726",
    published: "2026-11-10",
  },
  {
    id: "n1022-clash-grid",
    heat: "SYSTEM",
    kicker: "EIGHT CAMPUSES · DATE CLASHES ON PAPER",
    headline:
      "Daily Star maps eight institutions with overlapping December–January tests. Your clash table is the product.",
    body:
      "DU, JnU, RU, CU, KU, KUET, MIST, RUET already published pieces of a grid that does not share one national day. KU 17–18 Dec sits on medical’s 18 Dec. RU B / JnU E / KUET share 8 Jan. UGC asked for coordination. The PDFs did not wait.",
    punch: "Coordination is a press conference. Your calendar is the exam hall.",
    sourceLabel: "Daily Star · multi-campus grids · 10 Nov 2026",
    sourceUrl: "https://online.thedailystar.net/news/education/news/university-admission-tests-2026-27-date-clashes-emerge-8-institutions-announce-schedules-4260196",
    published: "2026-11-10",
  },
  {
    id: "n1022-retake-math",
    heat: "STREET",
    kicker: "SUPPLEMENTARY · OUTSIDE THE SPRINT",
    headline:
      "UGC moved the public calendar for retakers. DU’s November gate and BUET’s GPA wall mostly leave them outside this sprint.",
    body:
      "Re-eval results due 23 Nov — DU gives them two days before close. Supplementary exams aimed at early December with results by year-end do not unlock a Wednesday DU form or a hard BUET A+ wall. Medical’s 18 Dec is also before many retake sheets land. Second chance is real for the board. It is not automatic for every elite gate.",
    punch: "A second chance that misses the gate is not a seat.",
    sourceLabel: "UGC · TBS · DU committee · 9–10 Nov 2026",
    sourceUrl: "https://www.tbsnews.net/bangladesh/education/du-undergraduate-admission-applications-open-tomorrow-1598041",
    published: "2026-11-10",
  },
  {
    id: "n1022-coaching",
    heat: "MARKET",
    kicker: "COACHING · TWO MAPS · ONE INBOX",
    headline:
      "Batch SMS still arguing: season postponed vs DU opens tomorrow vs KUET already taking money.",
    body:
      "Model tests timed to a quiet December, then UGC wiped the map, then DU and the engineering campuses put half the map back. Refund fights and re-orientation calls are the product. Certainty was recalled twice before the flagship form opens. Screenshot every fee receipt.",
    punch: "You cannot invoice a seat on a date that flips twice before dinner.",
    sourceLabel: "Desk synthesis · street + national wire · 10 Nov 2026",
    sourceUrl: "https://admission.eis.du.ac.bd/",
    published: "2026-11-10",
  },
  {
    id: "n1022-tonight",
    heat: "STREET",
    kicker: "DESK · TONIGHT’S ONLY LIST",
    headline:
      "1) DU portal at noon. 2) Medical circular any hour. 3) BUET prospectus before the 21st. Everything else is panel noise.",
    body:
      "If DU takes money at noon, the UGC floor is optional for the flagship. If DGME posts the PDF, medical apps become real mid-month. If BUET only repeats the old line, engineering still has a date but not a complete fee path. The desk fires alerts when those three move.",
    punch: "Watch the submit button. Ignore the talk show.",
    sourceLabel: "Desk standing order · night of 10 Nov 2026",
    sourceUrl: "https://admission.eis.du.ac.bd/",
    published: "2026-11-10",
  },
];
