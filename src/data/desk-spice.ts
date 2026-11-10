/**
 * Desk-written spicy briefings — not crawler headlines.
 * DAY CYCLE 10 Nov 2026: nine fresh cards, new IDs (force alert fan-out).
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
    id: "n1011-du-portal-tomorrow",
    heat: "NUKE",
    kicker: "DU · TOMORROW NOON · admission.eis.du.ac.bd",
    headline:
      "Dhaka University applications open TOMORROW — 12:00 on 11 November. Close 23:59 on 25 November. UGC asked to wait. DU did not.",
    body:
      "Flagship still runs on its own clock. Online forms: 11 Nov noon → 25 Nov 11:59pm. Tests: IBA 5 Dec · Science 12 Dec · Arts/Law/Social 19 Dec · Fine Arts 22 Dec · Business 26 Dec. Re-evaluation sheets due 23 Nov — two days before the gate shuts. Pro-VC already said the hold is intentional. If the submit button lights up at noon, the national January story is optional for this campus.",
    punch: "Tomorrow is not a briefing. Tomorrow is a portal.",
    sourceLabel: "DU schedule · TBS · bdnews24 · 9–10 Nov 2026",
    sourceUrl: "https://admission.eis.du.ac.bd/",
    published: "2026-11-10",
  },
  {
    id: "n1011-ugc-vs-du-standoff",
    heat: "SYSTEM",
    kicker: "UGC FLOOR · JAN APPS · FEB TESTS · DU SAID NO",
    headline:
      "UGC still sells January applications and February tests for public universities. DU kept November–December. Both stories are live on 10 November.",
    body:
      "Chairman Prof Mamun Ahmed after the VC meeting: HSC re-eval + supplementary results by 31 December; public university admission activity after that; apps from January; tests from February. VCs were in the room. Ramadan named as a constraint. Pass count fell from 700k+ last cycle to a bit over 600k. DU’s highest body kept the old map. National equity vs session discipline — pick which PDF owns your year.",
    punch: "A commission press conference does not close a university portal.",
    sourceLabel: "Daily Star · TBS · Prothom Alo · 9–10 Nov 2026",
    sourceUrl: "https://www.thedailystar.net/news/education/news/public-university-admission-procedures-begin-after-december-31-4319011",
    published: "2026-11-10",
  },
  {
    id: "n1011-kuet-window",
    heat: "HOT",
    kicker: "KUET · APPS FROM 10 NOV · TEST 8 JAN",
    headline:
      "KUET application window is in the November sprint — engineering does not wait for the UGC winter story.",
    body:
      "Khulna Engineering is on the early board: applications from 10 November on the published pattern, MCQ map and January test date already circulating in the admission guides. While UGC talks February for the general public universities, several engineering and city campuses are already taking money or about to. Screenshot every fee page. Treat each university as its own country until a joint circular says otherwise.",
    punch: "Cluster season is dead. Campus season is not.",
    sourceLabel: "Admission guides · KUET window · desk 10 Nov 2026",
    sourceUrl: "https://students.bd/admission",
    published: "2026-11-10",
  },
  {
    id: "n1011-jnu-ru-wave",
    heat: "HOT",
    kicker: "JnU 15 NOV · RU 12–27 NOV · MORE BEHIND",
    headline:
      "Jagannath opens 15 November. Rajshahi primary apps 12–27 November. The mid-November wave is real even if UGC wants January.",
    body:
      "JnU: online from 15 Nov noon toward early December close on the published track, with January tests on their board. RU: primary application 12–27 November. Samakal and the campus wires are listing where-to-apply grids while the commission still says wait for January. Students chasing both DU and these campuses need parallel calendars — not one national myth.",
    punch: "If three portals open in two weeks, you do not have a winter. You have a stampede.",
    sourceLabel: "Samakal · campus wires · 9–10 Nov 2026",
    sourceUrl: "https://samakal.com/campus/article/382164",
    published: "2026-11-10",
  },
  {
    id: "n1011-retaker-4lakh",
    heat: "STREET",
    kicker: "~4.23 LAKH SUPPLEMENTARY · OUTSIDE THE SPRINT",
    headline:
      "UGC moved the season for the supplementary cohort. DU’s December map mostly leaves them outside the building.",
    body:
      "Of the failed HSC cohort, hundreds of thousands are eligible for supplementary exams aimed at early December with results by year-end. UGC’s January–February floor was sold as their lane into public universities. A November application gate and December unit tests do not wait for those sheets. Unless a second DU lane appears, the retake army does not walk into this flagship cycle. That is exclusion math, not scheduling taste.",
    punch: "A second chance that misses the only gate that matters is not a chance.",
    sourceLabel: "UGC briefing · Daily Star numbers · desk 10 Nov 2026",
    sourceUrl: "https://www.thedailystar.net/news/bangladesh/news/universities-push-admission-tests-february-4319641",
    published: "2026-11-10",
  },
  {
    id: "n1011-buet-watch",
    heat: "WAR",
    kicker: "BUET · LAST HARD LINE STILL ON THE BOARD",
    headline:
      "BUET’s last hard public line was still November apps and a mid-January test. After DU held, silence is a strategy.",
    body:
      "Engineering’s next piece of paper decides whether the sprint becomes a cluster or a solo. UGC set a January floor. DU refused it. Until BUET posts a revised circular, treat the prior app window and January test date as undead — not cancelled, not reconfirmed after the war. The loudest room in the country is still the one that has not spoken today.",
    punch: "Watch the notice board. Ignore the talk shows.",
    sourceLabel: "Prior BUET board · UGC day · desk 10 Nov 2026",
    sourceUrl: "https://www.tbsnews.net/bangladesh/education/public-university-admission-applications-open-january-tests-february-1597276",
    published: "2026-11-10",
  },
  {
    id: "n1011-eight-schedules",
    heat: "SYSTEM",
    kicker: "EIGHT CAMPUSES · DATES ON PAPER · CLASH RISK",
    headline:
      "At least eight public universities already published test maps spanning December into February. Overlaps are not a rumour.",
    body:
      "DU, JnU, RU, CU, KhU, KUET and others are on grids that do not share one calendar. UGC asked campuses to coordinate and to respect Ramadan. Students who want multiple shots need a clash table, not a single national date. This archive’s job is the table — not a prayer that everyone waits until February.",
    punch: "Coordination is a press line. Your calendar is the product.",
    sourceLabel: "Daily Star Bangla · multi-campus grids · 10 Nov 2026",
    sourceUrl: "https://bangla.thedailystar.net/youth/education/news-3956931",
    published: "2026-11-10",
  },
  {
    id: "n1011-coaching-chaos",
    heat: "MARKET",
    kicker: "COACHING STREET · TWO MAPS · ONE SMS THREAD",
    headline:
      "Morning batch: season postponed. Evening batch: DU still opens Wednesday. Model-test calendars are a crime scene.",
    body:
      "Crash courses sold against December units. Then UGC deleted the map. Then DU put half the map back. Refund fights and new-new orientation calls are the product. Coaching sells certainty. This week certainty was recalled twice before the form even opened. Screenshot every fee receipt.",
    punch: "You cannot invoice a seat on a date that flips twice before dinner.",
    sourceLabel: "Desk synthesis — street + national wire, 10 Nov 2026",
    sourceUrl: "https://tob.news/season-of-expectation-public-univ-admission-applications-to-open-in-january/",
    published: "2026-11-10",
  },
  {
    id: "n1011-three-triggers",
    heat: "HOT",
    kicker: "NEXT 24 HOURS · ONLY THREE TRIGGERS",
    headline:
      "1) DU portal at noon tomorrow. 2) BUET notice. 3) Ministry or UGC force that actually moves a campus. Everything else is noise.",
    body:
      "If the form takes money on 11 November, the UGC floor is optional for the flagship. If ministry force lands first, the PVC hold becomes a footnote. If BUET mirrors DU, engineering sprints. If BUET mirrors UGC, the season stays two-speed through winter. The desk fires alerts when those three move — not when another panel restates yesterday’s briefing.",
    punch: "Watch the submit button. Ignore the panel discussion.",
    sourceLabel: "Desk standing order — 10 Nov 2026",
    sourceUrl: "https://www.tbsnews.net/bangladesh/education/du-hold-admission-tests-scheduled-despite-ugc-request-defer-1597571",
    published: "2026-11-10",
  },
];
