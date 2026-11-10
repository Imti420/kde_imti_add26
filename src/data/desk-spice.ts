/**
 * Desk-written spicy briefings — not crawler headlines.
 * DAY CYCLE 10 Nov 2026 ~15:30 (WIRE / GO UPDATE NEWS round 2).
 * New IDs force notification fan-out after n1010e-*.
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
    id: "n1030w-du-noon",
    heat: "NUKE",
    kicker: "DU · T-MINUS HOURS · 11 NOV 12:00",
    headline:
      "Flagship portal opens tomorrow at noon. UGC wanted January. DU kept November. The submit button does not care about the press conference.",
    body:
      "admission.eis.du.ac.bd goes live 11 Nov 12:00 through 25 Nov 23:59. IBA 5 Dec, Science 12, Arts/Law/Social 19, Fine Arts 22, Business 26. Re-eval results ~23 Nov still fit inside the window. Supplementary failers do not. Pro-VC Alfasane has already said the quiet part: session delay is not a gift to the retake cohort. Some subject bars were softened 9 Nov. The calendar was not.",
    punch: "If DU is the plan, tomorrow is the job.",
    sourceLabel: "DU portal · TBS · bdnews24 · TOB · 9–10 Nov 2026",
    sourceUrl: "https://admission.eis.du.ac.bd/",
    published: "2026-11-10",
  },
  {
    id: "n1030w-ugc-jan",
    heat: "WAR",
    kicker: "UGC · APPS JANUARY · TESTS FEBRUARY",
    headline:
      "Commission still sells a national winter: public-uni applications in January, tests in February, retakers inside the tent.",
    body:
      "Chairman Mamun Ahmed after the VC huddle: re-eval + supplementary results by 31 Dec, then the season. Pass count slid from 700k+ toward ~600k. Ramadan is on the briefing notes. Several campuses nodded. DU did not. The country now runs two clocks — commission equity vs senate discipline — and students are supposed to guess which PDF wins their year.",
    punch: "A national calendar that one flagship ignores is a suggestion.",
    sourceLabel: "Daily Star · TBS · TOB · 9–10 Nov 2026",
    sourceUrl: "https://online.thedailystar.net/news/bangladesh/news/universities-push-admission-tests-february-4319641",
    published: "2026-11-10",
  },
  {
    id: "n1030w-retake-math",
    heat: "SYSTEM",
    kicker: "4.23 LAKH · RETAKE FROM 1 DEC",
    headline:
      "Supplementary starts 1 December. DU closes 25 November. The gap is the policy.",
    body:
      "Ministry sold a second chance for one-or-two-subject failures. Results hoped by year-end. Elite gates already printed older maps: DU December sprint, BUET 21 Nov apps / 16 Jan test, medical leaning 18 Dec. Retake is real for the board. It is theatre for any campus that refused to slip.",
    punch: "Hope after the deadline is content, not a roll number.",
    sourceLabel: "Daily Star · ministry timeline · 7–10 Nov 2026",
    sourceUrl: "https://www.thedailystar.net/news/education/news/medical-dental-entrance-exams-likely-dec-18-shutting-out-hsc-retake-candidates-4317776",
    published: "2026-11-10",
  },
  {
    id: "n1030w-buet-wall",
    heat: "HOT",
    kicker: "BUET · 21 NOV · 16 JAN · GPA WALL",
    headline:
      "BUET keeps the hard line: applications from 21 November, written test 16 January, GPA-5 + A+ Phy/Chem/Higher Math.",
    body:
      "Committee talk still points at ~10k examinees for ~1,309 seats. HSC failers are outside the frame even after the national retake promise. Engineering time is not UGC time until a new BUET notice says so.",
    punch: "Pressure cooker. Same lid.",
    sourceLabel: "TBS · Prothom Alo · bdnews24 · 7–8 Nov 2026",
    sourceUrl: "https://www.tbsnews.net/bangladesh/education/buet-admission-applications-open-21-nov-test-set-16-jan-1595726",
    published: "2026-11-10",
  },
  {
    id: "n1030w-medical-18",
    heat: "SYSTEM",
    kicker: "MBBS/BDS · 18 DEC · CIRCULAR PENDING",
    headline:
      "DGME locked 18 December for the combined medical-dental test. Formal circular still not on the desk.",
    body:
      "Original 4 Dec idea is dead. Apps may open mid-November. Thakurgaon and Narsingdi government colleges (50 seats each) expand the map. Retake kids remain the arithmetic problem: their results arrive after this gate. Health ministry still owns the final eligibility line.",
    punch: "Date without PDF is still a clock.",
    sourceLabel: "bdnews24 · Daily Sun · DGME · 8–10 Nov 2026",
    sourceUrl: "https://bdnews24.com/bangladesh/v368yyqzfm",
    published: "2026-11-10",
  },
  {
    id: "n1030w-kuet-eng",
    heat: "HOT",
    kicker: "ENGINEERING CLUSTER · MANY CLOCKS",
    headline:
      "KUET test 8 January. BUET 16 January. CUET/RUET still provisional. There is no single engineering day.",
    body:
      "UGC’s February sermon does not merge the engineering PDFs. Each campus is still publishing its own gravity. If your plan is ‘the cluster,’ read each circular like it is the only one that exists — because for your admit card, it is.",
    punch: "Cluster is a word. Circular is a date.",
    sourceLabel: "Campus desks · compilations · Nov 2026",
    sourceUrl: "https://en.prothomalo.com/youth/education/n2vti9k72r",
    published: "2026-11-10",
  },
  {
    id: "n1030w-gpa-market",
    heat: "MARKET",
    kicker: "GPA-5 CRASH · COACHING FLOATS",
    headline:
      "Pass rate in the low 50s. GPA-5 gutted. Coaching centres still take bKash like nothing happened.",
    body:
      "Families bought certainty packages for a year that refused to stay certain. DU opens tomorrow anyway. The shadow market does not refund narrative. It sells the next module.",
    punch: "The industry is healthy. The cohort is not.",
    sourceLabel: "Board results · desk · Nov 2026",
    sourceUrl: "https://www.tbsnews.net/bangladesh/education/public-university-admission-applications-open-january-tests-february-1597276",
    published: "2026-11-10",
  },
  {
    id: "n1030w-other-unis",
    heat: "STREET",
    kicker: "JnU · RU · CU · NOT ONLY DU",
    headline:
      "Other public campuses are also moving on November–January maps while UGC talks February.",
    body:
      "Jagannath, Rajshahi, Chittagong and friends are not waiting for a single national freeze. Fragmentation is the season: each senate still believes it owns the clock. Track the campus you actually want, not the quote that sounds fairest.",
    punch: "One republic. Many deadlines.",
    sourceLabel: "Desk compilations · Nov 2026",
    sourceUrl: "https://tob.news/season-of-expectation-public-univ-admission-applications-to-open-in-january/",
    published: "2026-11-10",
  },
  {
    id: "n1030w-desk-discipline",
    heat: "STREET",
    kicker: "DESK · TOMORROW NOON",
    headline:
      "Practical note: portal, payment proof, screenshot, charged phone. Not group-chat courage.",
    body:
      "Re-eval lane: ~23 Nov results, 25 Nov close — forty-eight hours, no romance. Failed-one-or-two: DU/BUET/medical maps already answered you. GST March is a different film. Tomorrow noon the flagship stops being a thread and becomes a form.",
    punch: "Bring a backup number. Leave the manifesto.",
    sourceLabel: "Admission desk · WIRE 10 Nov 2026",
    sourceUrl: "https://admission.eis.du.ac.bd/",
    published: "2026-11-10",
  },
];
