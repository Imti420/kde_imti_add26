/**
 * Desk-written spicy briefings — not crawler headlines.
 * MIDNIGHT CYCLE 9→10 Nov 2026: nine fresh cards, new IDs (force alert fan-out).
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
    id: "n0911-du-official-hold",
    heat: "NUKE",
    kicker: "DU · PVC ON RECORD · TBS 7:35PM",
    headline:
      "DU Pro-VC said it out loud: we are sticking to the old schedule. UGC asked to defer. DU said no.",
    body:
      "Not a group chat rumour. Pro-Vice-Chancellor (Admin) Prof Mohammed Almujaddade Alfasane told The Business Standard the university is holding undergraduate tests on the previously announced map. Re-evaluation results land 23 November; application close is 25 November — two days of air for those sheets. His line on retakers: if thousands of regular students take a session hit because of those who failed, that would be extremely unfortunate. Apps still 11–25 Nov. IBA 5 Dec. Science 12. Arts/Law/Social 19. Fine Arts 22. Business 26.",
    punch: "A PVC quote beats a commission press conference when the portal is the battlefield.",
    sourceLabel: "TBS · DU PVC, 9 Nov 2026 19:35",
    sourceUrl: "https://www.tbsnews.net/bangladesh/education/du-hold-admission-tests-scheduled-despite-ugc-request-defer-1597571",
    published: "2026-11-09",
  },
  {
    id: "n0911-ugc-january-floor",
    heat: "SYSTEM",
    kicker: "UGC · APPS 1 JAN · TESTS AFTER 1 FEB",
    headline:
      "UGC still sells January as the national start. Roughly 63,000 public first-year seats. Over 600,000 HSC passers this year.",
    body:
      "Chairman Prof Mamun Ahmed: re-eval + supplementary results by 31 December; public university admission activity after that; applications from January; tests from February. VCs were in the room. Ramadan was named as a scheduling constraint. Pass numbers dropped from 700k+ last cycle to a bit over 600k this year. The commission's story is equity for the supplementary cohort. DU's story is session discipline. Both are still on the wire at midnight.",
    punch: "National floor vs flagship calendar — pick which PDF you trust with your year.",
    sourceLabel: "TBS · Daily Campus · UGC briefing, 9 Nov 2026",
    sourceUrl: "https://www.tbsnews.net/bangladesh/education/public-university-admission-applications-open-january-tests-february-1597276",
    published: "2026-11-09",
  },
  {
    id: "n0911-48hrs-to-portal",
    heat: "HOT",
    kicker: "COUNTDOWN · WEDNESDAY NOON · admission.eis.du.ac.bd",
    headline:
      "Under 48 hours to DU form open. If the submit button lights up at noon Wednesday, the war is operational.",
    body:
      "Everything before the portal is theatre. Fees on the published pattern: Science/Arts/Business ৳1,200 · Fine Arts ৳1,400 · IBA ৳1,500. Window dies 23:59 on 25 November. Re-eval kids are told they still fit if sheets publish 23 Nov. Screenshot the form the second it appears. If it does not appear, the evening hold collapses.",
    punch: "Press conferences do not admit students. Portals do.",
    sourceLabel: "DU portal · evening committee coverage, 9 Nov 2026",
    sourceUrl: "https://admission.eis.du.ac.bd/",
    published: "2026-11-09",
  },
  {
    id: "n0911-retaker-math",
    heat: "STREET",
    kicker: "4.23 LAKH · OUTSIDE DU'S DECEMBER MAP",
    headline:
      "Supplementary cohort was the whole point of UGC's winter. DU's December sprint mostly leaves them outside the building.",
    body:
      "Supplementary exams still aim for early December with results by year-end. UGC moved the public university season so those students could sit tests. DU kept a November application gate and December units. Unless a second lane appears, the retake army does not walk into this DU cycle. That is the political charge under the PVC quote — not scheduling taste, exclusion math.",
    punch: "A second chance that misses the only gate that matters is not a chance.",
    sourceLabel: "UGC floor · DU hold · desk midnight, 9 Nov 2026",
    sourceUrl: "https://english.thedailycampus.com/university-admission/3886",
    published: "2026-11-09",
  },
  {
    id: "n0911-buet-silence",
    heat: "WAR",
    kicker: "BUET · NO NEW CIRCULAR AT MIDNIGHT",
    headline:
      "BUET's last hard line was 21 Nov apps / 16 Jan test / GPA wall / 10k cap. After DU held, silence is a strategy.",
    body:
      "Committee chair Prof Kamrul Hasan had refused to slip for retakers earlier in the week. UGC then set a January floor. DU then refused the floor. Engineering's next piece of paper decides whether the sprint becomes a cluster or a solo. Until that paper exists, treat 21 Nov / 16 Jan as undead — not dead, not confirmed post-war.",
    punch: "The loudest room in the country is the one that has not spoken.",
    sourceLabel: "TBS · bdnews24 · desk, 7–9 Nov 2026",
    sourceUrl: "https://www.tbsnews.net/bangladesh/education/buet-admission-applications-open-21-nov-test-set-16-jan-1595726",
    published: "2026-11-09",
  },
  {
    id: "n0911-medical-lane",
    heat: "SYSTEM",
    kicker: "DGME · NOT UGC · MID-DEC STILL POSSIBLE",
    headline:
      "Medical still answers to health education. Mid-December MBBS/BDS can run while universities fight about January.",
    body:
      "UGC does not own DGME. Retakers might get a university winter and still miss medical, or get neither if every campus copies DU and medical refuses to move. Three regulators. Three tempers. One cohort refreshing result pages at 2am.",
    punch: "Same students. Different ministries. Parallel panic.",
    sourceLabel: "DGME file · UGC day · desk, 9 Nov 2026",
    sourceUrl: "https://observerbd.com/news/604606",
    published: "2026-11-09",
  },
  {
    id: "n0911-coaching-double-flip",
    heat: "MARKET",
    kicker: "COACHING STREET · TWO RECALLS IN ONE DAY",
    headline:
      "Morning: season postponed. Evening: DU still opens Wednesday. Batch SMS is a crime scene.",
    body:
      "Model tests timed to December units. Crash courses sold against BUET's November open. Then UGC deleted the map. Then DU put half the map back. Refund fights and new-new orientation calls are the product now. Coaching sells certainty. Today certainty was recalled twice before midnight.",
    punch: "You cannot invoice a seat on a date that flips twice before dinner.",
    sourceLabel: "Desk synthesis — street + TBS evening, 9 Nov 2026",
    sourceUrl: "https://www.tbsnews.net/bangladesh/education/du-hold-admission-tests-scheduled-despite-ugc-request-defer-1597571",
    published: "2026-11-09",
  },
  {
    id: "n0911-marks-eased",
    heat: "HOT",
    kicker: "DU · SOME BARS LOWERED · ELIGIBILITY STILL TIGHT",
    headline:
      "Emergency committee eased marks in some test subjects and some HSC grade floors — without opening the gate to failed-batch HSC.",
    body:
      "Jagonews: minimum application eligibility kept in spirit, but required marks in certain admission-test subjects and minimum grades in certain HSC subjects were reduced. Re-eval candidates still in. Supplementary failures still out of this window. That is a precision cut — more passers from the published HSC list, not a general amnesty.",
    punch: "Relaxation inside the club is not the same as opening the club.",
    sourceLabel: "Jagonews · DU committee, 9 Nov 2026 evening",
    sourceUrl: "https://www.jagonews24.com/en/education/news/98078",
    published: "2026-11-09",
  },
  {
    id: "n0911-what-matters-now",
    heat: "HOT",
    kicker: "NEXT 36 HOURS · ONLY THREE TRIGGERS",
    headline:
      "1) DU portal at noon Wednesday. 2) BUET notice. 3) Ministry pressure on DU. Everything else is noise.",
    body:
      "If the form takes money on 11 November, the UGC floor is optional for the flagship. If ministry force lands first, the PVC quote becomes a footnote. If BUET mirrors DU, engineering sprints. If BUET mirrors UGC, the season stays two-speed through winter. The desk fires alerts when those three move — not when another talk show restates the morning briefing.",
    punch: "Watch the submit button. Ignore the panel discussion.",
    sourceLabel: "Desk standing order — midnight cycle, 9–10 Nov 2026",
    sourceUrl: "https://www.tbsnews.net/bangladesh/education/du-hold-admission-tests-scheduled-despite-ugc-request-defer-1597571",
    published: "2026-11-09",
  },
];
