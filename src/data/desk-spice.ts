/**
 * Desk-written spicy briefings — not crawler headlines.
 * 9 Nov 2026 EVENING: DU keeps Nov 11 window after UGC said January. Season split live.
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
    id: "spice-du-defies-ugc",
    heat: "NUKE",
    kicker: "DU · EVENING EMERGENCY MEETING · 9 NOV AFTER 6PM",
    headline:
      "DU just told UGC to sit down. Emergency admission committee kept 11–25 Nov apps and December unit tests — even after the commission ordered every public uni to wait until January.",
    body:
      "Morning: UGC + VCs agreed apps from 1 January, tests after 1 February, so ~4.23 lakh HSC retakers are not locked out. Evening: DU held an emergency general admission committee under VC Prof ABM Obaidul Islam and unanimously kept the published schedule — online apps from noon 11 November to 23:59 on 25 November, IBA 5 Dec, Science 12, Arts/Law/Social 19, Fine Arts 22, Business 26. Re-evaluation candidates still in if revised results land 23 November. Some department mark bars were eased. Jagonews, Star Bangla, TOB all carried the same line after 6pm: previous schedule stands. The national floor and the biggest campus just diverged in one afternoon.",
    punch: "UGC set a floor. DU just walked on the ceiling. Watch the portal at noon 11 November.",
    sourceLabel: "Jagonews · Star Bangla · TOB · DU committee, 9 Nov 2026 evening",
    sourceUrl: "https://www.jagonews24.com/en/education/news/98078",
    published: "2026-11-09",
  },
  {
    id: "spice-ugc-vs-campus",
    heat: "WAR",
    kicker: "UGC FLOOR · CAMPUS ROOF · SAME DAY",
    headline:
      "Commission said January. Dhaka University said November. The 2026–27 calendar is now a two-speed war.",
    body:
      "UGC Chairman Prof Mamun Ahmed told the press: HSC re-eval + supplementary results by 31 December; public university admission activity after that; apps from January; tests from February; universities that already published schedules must adjust. DU's evening notice is the first hard public refusal. BUET had already been talking hard about 21 Nov apps / 16 Jan test. Medical under DGME still points at mid-December. Students now face three clocks — UGC's winter, DU's December sprint, and whoever else holds or folds in the next 48 hours.",
    punch: "A national floor that the flagship campus ignores is not a floor. It is a press release.",
    sourceLabel: "Daily Star · TBS · Daily Campus · DU evening coverage, 9 Nov 2026",
    sourceUrl: "https://www.thedailystar.net/news/education/news/public-university-admission-procedures-begin-after-december-31-4319011",
    published: "2026-11-09",
  },
  {
    id: "spice-retake-split",
    heat: "SYSTEM",
    kicker: "4.23 LAKH RETAKERS · DOOR HALF OPEN",
    headline:
      "Retakers forced UGC to blink in the morning. DU's evening decision may slam the door on them again for the biggest campus.",
    body:
      "Supplementary exams are still set to start around 1 December with results by year-end. UGC's whole argument was that those students must be able to sit public university tests. If DU really opens on 11 November and tests in December, the retake cohort is outside that window unless DU invents a second lane. That is the political bomb under tonight's notice. Either other campuses follow DU and the commission loses face, or ministry pressure forces a second rewrite within days.",
    punch: "A second chance only works if the gates stay open when the result arrives.",
    sourceLabel: "UGC briefing · DU evening line · desk, 9 Nov 2026",
    sourceUrl: "https://english.thedailycampus.com/university-admission/3886",
    published: "2026-11-09",
  },
  {
    id: "spice-buet-watch",
    heat: "HOT",
    kicker: "BUET · NEXT NOTICE IS THE MATCH",
    headline:
      "BUET spent days saying 21 Nov apps and 16 Jan test would not slip. UGC said wait. DU just held. BUET's silence is now the loudest room in the country.",
    body:
      "Committee chair Prof Kamrul Hasan had locked hard GPA walls and a January 16 written test with a 10,000-examinee cap. That was pre-UGC-floor talk. After DU's evening defiance, every engineering campus has a binary choice: follow the commission's January floor or follow the flagship's December sprint. No new BUET circular landed in this evening pass. The archive keeps 21 Nov / 16 Jan as the last local line — confidence preliminary until they speak.",
    punch: "Autonomy is easy to claim until the other giant campuses pick a side.",
    sourceLabel: "TBS · bdnews24 · UGC · DU evening, 7–9 Nov 2026",
    sourceUrl: "https://www.tbsnews.net/bangladesh/education/buet-admission-applications-open-21-nov-test-set-16-jan-1595726",
    published: "2026-11-09",
  },
  {
    id: "spice-medical-orphan",
    heat: "SYSTEM",
    kicker: "MEDICAL · DGME NOT UGC · MID-DEC STILL ON THE BOARD",
    headline:
      "Medical is still a different regulator. Mid-December DGME dates can run while universities argue about January vs November.",
    body:
      "MBBS/BDS sits under health education, not the UGC VC meeting. Reports still point medical/dental toward mid-December unless the ministry drags DGME into the same winter. Retakers could theoretically get university doors in January while the medical door still hits in December — or get neither if DU's sprint becomes the template and medical refuses to move. Three regulators. Three moods. One cohort.",
    punch: "Same students. Different ministries. Parallel calendars.",
    sourceLabel: "DGME file · UGC day · desk evening, 8–9 Nov 2026",
    sourceUrl: "https://observerbd.com/news/604606",
    published: "2026-11-09",
  },
  {
    id: "spice-coaching-whiplash",
    heat: "MARKET",
    kicker: "COACHING · TWO MESSAGES IN ONE DAY",
    headline:
      "Morning SMS: season postponed. Evening SMS: DU still opens Wednesday. The street is eating itself.",
    body:
      "Coaching houses sold November–December product against DU's old map, then spent the afternoon rewriting batches for a January floor, then got punched by DU's evening hold. Refund fights, batch reshuffles, and 'orientation on the new-new schedule' calls start tonight. Certainty is the product. Today the manufacturer recalled it twice.",
    punch: "You cannot invoice a seat on a date that flips twice before dinner.",
    sourceLabel: "Desk synthesis — coaching street + UGC/DU day, 9 Nov 2026",
    sourceUrl: "https://www.jagonews24.com/en/education/news/98078",
    published: "2026-11-09",
  },
  {
    id: "spice-portal-clock",
    heat: "HOT",
    kicker: "PORTAL · 48 HOURS TO NOON 11 NOV",
    headline:
      "admission.eis.du.ac.bd is no longer a ghost countdown. It is a live threat clock.",
    body:
      "If the evening committee line holds, forms open at 12:00 on Wednesday 11 November and die at 23:59 on 25 November. Fees on the portal pattern: Science/Arts/Business ৳1,200 · Fine Arts ৳1,400 · IBA ৳1,500. Re-eval kids whose revised sheets land 23 November are told they can still apply. That is an aggressive operational claim. Screenshot the portal the hour it flips from maintenance to form.",
    punch: "The only date that counts is the one the submit button respects.",
    sourceLabel: "DU portal · evening committee coverage, 9 Nov 2026",
    sourceUrl: "https://admission.eis.du.ac.bd/",
    published: "2026-11-09",
  },
  {
    id: "spice-students-limbo",
    heat: "STREET",
    kicker: "STUDENTS · WHIPLASH²",
    headline:
      "Morning they cancelled the bus. Evening Dhaka University put the bus back on the road and left everyone else at the stop.",
    body:
      "Retakers celebrated the UGC floor. Regular passers who built December strategy cried, then got a second jolt when DU held. Group chats are unreadable. Families who paid coaching on the old map want blood, refunds, or a single adult in the room. This is admission season as procedural trauma — not a circular, a nervous system event.",
    punch: "Admission 26's brand moment is pure calendar violence.",
    sourceLabel: "Desk · campus channels · 9 Nov day/night coverage",
    sourceUrl: "https://bangla.thedailystar.net/youth/education/news-3948591",
    published: "2026-11-09",
  },
  {
    id: "spice-what-next-night",
    heat: "HOT",
    kicker: "NEXT 72 HOURS · SCOREBOARD",
    headline:
      "1) Does the DU portal actually open 11 Nov. 2) Does BUET publish. 3) Does ministry lean on DU. That is the whole game.",
    body:
      "Everything else is noise. If the portal takes money on Wednesday, the UGC floor is optional for the flagship. If ministry force arrives before then, the evening notice dies. If BUET mirrors DU, the engineering cluster follows the sprint. If BUET mirrors UGC, the season stays two-speed. The desk updates the archive the hour any of those three move.",
    punch: "Press conferences do not admit students. Portals do.",
    sourceLabel: "Desk standing order — evening pass, 9 Nov 2026",
    sourceUrl: "https://www.jagonews24.com/en/education/news/98078",
    published: "2026-11-09",
  },
];
