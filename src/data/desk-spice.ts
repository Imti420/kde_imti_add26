/**
 * Desk-written spicy briefings — not crawler headlines.
 * Updated by hand when the season moves. Keep claims sourced.
 * Go harder. The country has no bounds when it comes to fun news.
 */
export interface SpiceCard {
  id: string;
  heat: "HOT" | "SYSTEM" | "MARKET" | "WAR" | "STREET" | "SCAM";
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
    id: "spice-du-window",
    heat: "HOT",
    kicker: "DU · THREE DAYS TO GO",
    headline: "Dhaka University opens at noon on 11 November. The clock is louder than any coaching slogan.",
    body:
      "Online applications start 12:00 on 11 Nov and die at 23:59 on 25 Nov. IBA test 5 Dec, Science 12 Dec, Arts/Law/Social 19 Dec, Fine Arts 22 Dec, Business 26 Dec. Classes for the batch begin 28 March 2027. The portal is live, the eligibility bars are published, and every student still waiting on an HSC retake result is already outside the room. Three days. That is the entire remaining runway.",
    punch: "If you are still deciding whether to apply, the window will not wait for your decision.",
    sourceLabel: "DU PRO · TBS · Observer · Daily Star, 5–8 Nov 2026",
    sourceUrl: "https://admission.eis.du.ac.bd/",
    published: "2026-11-08",
  },
  {
    id: "spice-buet-hardline",
    heat: "SYSTEM",
    kicker: "BUET · NO RELAXATION",
    headline: "BUET keeps the GPA-5 + A+ Physics/Chem/Higher Math wall and will still only let ~10,000 sit the 16 January test.",
    body:
      "Applications expected from 21 November. Test fixed for 16 January 2027. Committee chief Kamrul Hasan is explicit: last year’s eligibility stays. Only about 10,000 candidates will be allowed into the hall even if far more apply. HSC retake students are not part of the plan. The engineering cluster already fractured; BUET is simply refusing to bend for the late-result cohort.",
    punch: "The filter is the policy. The calendar is the message.",
    sourceLabel: "TBS · Prothom Alo · bdnews24 · Channel i, 7–8 Nov 2026",
    sourceUrl: "https://www.tbsnews.net/bangladesh/education/buet-admission-applications-open-21-nov-test-set-16-jan-1595726",
    published: "2026-11-08",
  },
  {
    id: "spice-medical-18dec",
    heat: "SYSTEM",
    kicker: "MBBS / BDS · 18 DECEMBER",
    headline: "Medical and dental tests lock onto 18 December. Circular still missing. Retakers remain locked out.",
    body:
      "DGME messaging has settled on 18 December after the old 4 December working date died. Applications are expected mid-November (15–18 Nov window floated). Two new government medical colleges — Thakurgaon and Narsingdi, 50 seats each — join the map. Retake exams start around 1 December; results hoped for by month-end. The timeline does not wait for revised marksheets. Circular still not on the desk.",
    punch: "More seats. Same closed door for anyone still sitting a subject again.",
    sourceLabel: "Daily Sun · Daily Star · Daily Bangladesh, 7–8 Nov 2026",
    sourceUrl: "http://www.daily-sun.com/health/907914/medical-dental-admission-tests-scheduled-for-18-december",
    published: "2026-11-08",
  },
  {
    id: "spice-acs-udvash",
    heat: "WAR",
    kicker: "ACS vs UDVASH · STILL THE REAL WAR",
    headline: "While universities publish calendars, the real battlefield remains Science Lab Road and the comment sections.",
    body:
      "ACS packs the FOMO machine; Udvash claims cleaner depth and EV sources. Both sell the same anxiety with different packaging. Students treat coaching ID cards like campus badges. The product is not a seat at DU or BUET. The product is the feeling that everyone else already bought the right batch. Edtech apps try to undercut the street; the street still owns the fear.",
    punch: "Pick a side. The receipt looks the same either way.",
    sourceLabel: "r/Dhaka · YouTube reviews · campus chatter · desk, 2026",
    sourceUrl: "https://www.reddit.com/r/Dhaka/comments/1pf1npz/udvash_vs_acs/",
    published: "2026-11-08",
  },
  {
    id: "spice-hsc-crash-aftermath",
    heat: "HOT",
    kicker: "52% PASS · GPA-5 HALVED",
    headline: "The HSC crash is still writing the admission season. Fewer perfect scores, harder shortlists, louder panic.",
    body:
      "Pass rate around 52%. GPA-5 numbers roughly halved. Boards and ministry scrambled into a December retake window for one- or two-subject failures. Top universities answered by keeping their original calendars. The result: a smaller eligible pool for the hardest tests and a large cohort that may never catch the 2026–27 train. Every coaching centre is now selling recovery as much as preparation.",
    punch: "The system broke the average. The elite filters did not soften.",
    sourceLabel: "Board results · ministry briefings · desk synthesis, Oct–Nov 2026",
    sourceUrl: "https://www.thedailystar.net/news/bangladesh/education/news/admission-schedule-medical-colleges-univs-mull-relief-hsc-retakers-4315036",
    published: "2026-11-08",
  },
  {
    id: "spice-gst-fracture",
    heat: "STREET",
    kicker: "GST CLUSTER · CRACKS SHOWING",
    headline: "The GST cluster is bleeding universities that want their own tests. The central calendar is no longer sacred.",
    body:
      "Several general and science-technology universities have signalled they prefer independent exams. Engineering cluster already walked. Remaining GST dates sit in March 2027 territory while DU, BUET, JnU and the medical system run their own December–January races. Students face overlapping calendars and no single map. Cluster logic was sold as fairness. Fragmentation is the lived experience.",
    punch: "One exam for many universities sounded efficient until the universities stopped agreeing.",
    sourceLabel: "Daily Star · GST desks · university notices, 2026",
    sourceUrl: "https://online.thedailystar.net/news/bangladesh/news/public-universities-admission-woes-deepen-students-3808361",
    published: "2026-11-08",
  },
  {
    id: "spice-teacher-tuition",
    heat: "MARKET",
    kicker: "CLASSROOM EMPTY · PRIVATE ROOM FULL",
    headline: "Teachers mark low in school, then sell the recovery after school. The second school is the real business.",
    body:
      "Parents still report paying several times the monthly school fee for the same teachers in private rooms. Policy says disclose limited private students. Practice looks the other way. Public classrooms become trailers. The paid room is the feature film. When HSC results collapse, the private market does not shrink — it expands into recovery batches and panic packs.",
    punch: "If the school taught the syllabus, the second school would starve.",
    sourceLabel: "TIMES · Daily Star roundtables · parent reports, 2026",
    sourceUrl: "https://tob.news/?p=289937",
    published: "2026-11-08",
  },
  {
    id: "spice-zero-pass",
    heat: "SCAM",
    kicker: "293 INSTITUTIONS · ZERO PASSERS",
    headline: "Hundreds of schools produced nobody. Somewhere a result still got fixed.",
    body:
      "293 institutions recorded zero successful HSC candidates — up sharply from the previous year. 100% pass institutions collapsed. Parallel stories of scripts showing zeros and published sheets showing forties keep surfacing. Mass failure and selective miracle marks can live in the same system. Trust is the real casualty of the season.",
    punch: "When the average collapses, every outlier needs a receipt.",
    sourceLabel: "Daily Campus · TBS · board results, Oct–Nov 2026",
    sourceUrl: "https://english.thedailycampus.com/college/3842",
    published: "2026-11-08",
  },
  {
    id: "spice-edtech-vs-street",
    heat: "MARKET",
    kicker: "APP vs CORRIDOR",
    headline: "Edtech promises cheap, scalable certainty. The coaching street still owns the calendar and the fear.",
    body:
      "Online platforms undercut the big offline machines on price and reach. Some claim millions of learners. Families still pour money into ACS, Udvash and neighbourhood rooms because the exam calendar does not care about your subscription. Content is cheaper than ever. Panic is not. The product that sells is not video lectures — it is the feeling that you are not falling behind the kid who already bought the right batch.",
    punch: "You can digitise the notes. You cannot digitise the FOMO.",
    sourceLabel: "Platform sites · Business Inspection · desk synthesis, 2026",
    sourceUrl: "https://hulkenstein.com/",
    published: "2026-11-08",
  },
];
