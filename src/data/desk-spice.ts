/**
 * Desk-written spicy briefings — not crawler headlines.
 * 10 Nov 2026: DU DEFY is the lead. UGC floor cracked on day one.
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
    id: "spice-du-defy",
    heat: "NUKE",
    kicker: "DU DEFY · 10 NOV · APPS OPEN TOMORROW",
    headline: "DU told UGC to get lost. Applications open 11 Nov at noon. Tests still December. The national calendar just split in half.",
    body:
      "UGC + VCs on Monday: every public university waits until January. Same afternoon, Dhaka University’s General Admission Committee met and said no. Pro-VC Mohammed Almujaddade Alfasane on the record: schedule holds. Portal still counts down to 11 November 12:00. Close 25 Nov 23:59. Unit tests 5–26 December. Re-evaluation results due 23 Nov — those students get two days inside the window. UGC’s floor is still on the books for everyone else. DU just became the exception that breaks the rule.",
    punch: "One university ignored the commission. The season now has two calendars.",
    sourceLabel: "TBS · Daily Campus · bdnews24 · Observer · Prothom Alo · DU portal, 9–10 Nov 2026",
    sourceUrl: "https://admission.eis.du.ac.bd/",
    published: "2026-11-10",
  },
  {
    id: "spice-ugc-floor-cracked",
    heat: "WAR",
    kicker: "UGC · NATIONAL FLOOR · DAY-ONE CRACK",
    headline: "The commission sold January/February. DU bought December. Who follows whom is the rest of the week.",
    body:
      "Official UGC line remains: applications from 1 January 2027, tests after 1 February, so re-evaluation and supplementary cohorts are not locked out. That was unanimous in the VC room — except DU’s VC was not in the room. Hours later DU published defiance. Every other public university now has to choose: obey the commission or follow the biggest brand on the map. The feud is no longer theoretical.",
    punch: "A national floor that the flagship ignores is just a suggestion with better PR.",
    sourceLabel: "bdnews24 · Daily Star · UGC briefing · desk, 9–10 Nov 2026",
    sourceUrl: "https://bdnews24.com/education/5ntai555o0",
    published: "2026-11-10",
  },
  {
    id: "spice-portal-live",
    heat: "HOT",
    kicker: "PORTAL · COUNTDOWN · 11 NOV NOON",
    headline: "The DU admission portal is not bluffing. Clock is real. Window is real. Submit button arrives tomorrow.",
    body:
      "https://admission.eis.du.ac.bd/ still shows application start 11 November 12:00 and end 25 November 23:59. IBA 5 Dec, Science 12 Dec, Arts/Law/Social 19 Dec, Fine Arts 22 Dec, Business 26 Dec. Some subject and GPA bars were relaxed for selected departments at the same committee meeting that rejected the UGC delay. Students who waited for a national postponement just got told the train did not stop.",
    punch: "If you are aiming at DU, the debate is over. The form is the debate.",
    sourceLabel: "DU portal · Observer · TBS, 9–10 Nov 2026",
    sourceUrl: "https://admission.eis.du.ac.bd/",
    published: "2026-11-10",
  },
  {
    id: "spice-buet-silent",
    heat: "SYSTEM",
    kicker: "BUET · NO NEW NOTICE · OLD LINE STANDS",
    headline: "BUET has not spoken since UGC. Last public line: 21 Nov apps, 16 Jan test, GPA wall intact.",
    body:
      "Committee chair Kamrul Hasan’s 7–8 November statements still govern the archive: applications from 21 November, written test 16 January 2027, about 10,000 examinees, hard A+ in Physics/Chem/Higher Math. No post-UGC circular found on 10 November. DU’s defiance raises the odds BUET holds too — both have autonomy culture and both already said they would not wait for retakers. Silence is not confirmation. It is also not a postponement.",
    punch: "Until BUET posts, treat 21 Nov as live and watch the notices board like a hawk.",
    sourceLabel: "TBS · Prothom Alo · bdnews24, 7–8 Nov 2026 · desk pass 10 Nov",
    sourceUrl: "https://www.tbsnews.net/bangladesh/education/buet-admission-applications-open-21-nov-test-set-16-jan-1595726",
    published: "2026-11-10",
  },
  {
    id: "spice-reeval-two-days",
    heat: "SYSTEM",
    kicker: "RE-EVAL · RESULTS 23 NOV · WINDOW CLOSES 25 NOV",
    headline: "DU’s answer to the retake problem: two days. Re-eval results 23 Nov, apps close 25 Nov.",
    body:
      "UGC wanted the whole calendar shifted so supplementary and re-evaluation students could breathe. DU’s compromise is narrower: students whose HSC results improve on 23 November still have 24–25 November to hit submit. Failed students who need the December supplementary exams are still outside. The university is protecting its December test block and March class start. The 4.23 lakh retake cohort is not DU’s problem under this design.",
    punch: "A two-day mercy window is not a second chance for everyone who failed a subject.",
    sourceLabel: "TBS · Prothom Alo · DU committee line, 9–10 Nov 2026",
    sourceUrl: "https://www.tbsnews.net/bangladesh/education/du-undergraduate-admission-applications-open-tomorrow-1598041",
    published: "2026-11-10",
  },
  {
    id: "spice-medical-orphan",
    heat: "SYSTEM",
    kicker: "MEDICAL · DGME · 18 DEC STILL ON THE BOARD",
    headline: "Medical is not in the UGC fight. DGME still points at 18 December. Formal circular still thin.",
    body:
      "MBBS/BDS sits under health education, not the University Grants Commission. While public universities argue about January versus December, medical remains on the mid-December track reported earlier. Applications window was expected mid-November. Retakers who win a January university door may still find the medical door shut. Two systems, two clocks, same stressed cohort.",
    punch: "Winning the UGC argument does not automatically open a medical seat.",
    sourceLabel: "Observer · Daily Sun · bdnews24 · DGME file, 7–10 Nov 2026",
    sourceUrl: "https://observerbd.com/news/604606",
    published: "2026-11-10",
  },
  {
    id: "spice-coaching-whiplash",
    heat: "STREET",
    kicker: "COACHING · SOLD THE OLD CALENDAR · NOW WHAT",
    headline: "Batch plans built on a quiet December just hit a DU-shaped truck. Street is rewriting flyers in real time.",
    body:
      "For two weeks the big houses sold certainty: DU window, unit order, test denseness in December. UGC’s Monday bomb looked like a two-month holiday. DU’s Monday-night defiance put the original density back on the table for the flagship. ACS, Udvash, Hulkenstein and the neighbourhood rooms now run split messaging — DU track hot, other public unis maybe cold. Panic products love uncertainty. This week is product.",
    punch: "The coaching economy does not need a winner. It needs a moving target.",
    sourceLabel: "desk synthesis · portal clocks · street observation, 10 Nov 2026",
    sourceUrl: "https://admission.eis.du.ac.bd/",
    published: "2026-11-10",
  },
  {
    id: "spice-other-unis",
    heat: "HOT",
    kicker: "EVERYONE ELSE · CHOOSE A SIDE",
    headline: "JnU, RU, CU, GST cluster and the rest have not all spoken. DU made the first move. Copy or comply.",
    body:
      "UGC’s instruction was collective. DU’s refusal was unilateral. Universities that already printed January-leaning language must decide whether to rip it up. Universities that stayed quiet can still lean on the commission. The next 72 hours of notices will tell you whether DU is an outlier or the new template. Watch the boards, not the talk shows.",
    punch: "In a coordination failure, the loudest calendar becomes the default.",
    sourceLabel: "UGC briefing · DU committee · desk, 9–10 Nov 2026",
    sourceUrl: "https://bdnews24.com/education/5ntai555o0",
    published: "2026-11-10",
  },
  {
    id: "spice-what-students-do",
    heat: "STREET",
    kicker: "STUDENTS · TWO CLOCKS · ONE BRAIN",
    headline: "If DU is your first choice, apply. If you need the retake result, read the fine print. If you need medical, ignore the uni fight.",
    body:
      "Practical split: DU applicants treat 11–25 November as real. BUET applicants treat 21 November as real until a notice says otherwise. Medical aspirants watch DGME, not UGC. Everyone else waits for their university’s own PDF. The national story is chaos. Your story is whichever portal actually opens for your name. Screenshot every circular. Do not trust a secondary headline when the primary form is live.",
    punch: "The desk can track five calendars. You only need the one that prints your admit card.",
    sourceLabel: "desk · portal · committee lines, 10 Nov 2026",
    sourceUrl: "https://admission.eis.du.ac.bd/",
    published: "2026-11-10",
  },
];
