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
    id: "spice-acs-udvash",
    heat: "WAR",
    kicker: "ACS vs UDVASH · THE REAL ADMISSION WAR",
    headline: "The admission war is not DU vs BUET. It is ACS vs Udvash and the FOMO machine.",
    body:
      "Reddit threads and YouTube comment sections are the real battlefield. ACS gets called overhyped — FOMO marketing, mixed teacher quality, English-version students complaining terms get mangled. Udvash fans say depth and EV sources are cleaner. Meanwhile both centres pack Science Lab corridors with kids who treat the coaching ID card like a campus badge. The product is not a seat. The product is the feeling that everyone else already bought the right one.",
    punch: "Pick a side. The receipt is the same either way.",
    sourceLabel: "r/Dhaka · YouTube reviews · campus chatter, 2025–26",
    sourceUrl: "https://www.reddit.com/r/Dhaka/comments/1pf1npz/udvash_vs_acs/",
    published: "2026-11-08",
  },
  {
    id: "spice-hulkenstein",
    heat: "MARKET",
    kicker: "HULKENSTEIN · HULK + EINSTEIN + HYPE",
    headline: "Hulkenstein sold the myth of cheap, scalable certainty. The coaching street still owns the fear.",
    body:
      "BUET undergrad co-founder, Hulk-meets-Einstein branding, claims of millions of learners, online courses that undercut the big offline machines. Edge Course, books, exam batches, even stationery and housing in the ecosystem pitch. The marketing is clean. The underlying anxiety is not. Families still pour money into ACS, Udvash and neighbourhood rooms because the exam calendar does not care about your app subscription. Cheap access is real. Replacing the street-level FOMO is the hard part.",
    punch: "Edtech can lower the price of content. It cannot lower the price of panic.",
    sourceLabel: "Hulkenstein site · Business Inspection · desk synthesis",
    sourceUrl: "https://hulkenstein.com/",
    published: "2026-11-08",
  },
  {
    id: "spice-hsc-crash",
    heat: "HOT",
    kicker: "52.12% PASS · GPA-5 CUT IN HALF",
    headline: "Half the country failed HSC. The coaching bill still arrived on time.",
    body:
      "Pass rate 52.12% across boards. GPA-5 collapsed to roughly 40,000 from nearly 70,000 last year. Hundreds of institutions posted zero passers. Education minister called it unsatisfactory. Parents who already spent on coaching now stare at retake calendars while DU and BUET keep their own clocks. The results are a national mood. The coaching invoices are a national constant.",
    punch: "The system graded harder. The market did not.",
    sourceLabel: "Board results · Dhaka Tribune · Prothom Alo · Daily Star, 31 Oct–1 Nov 2026",
    sourceUrl: "https://www.dhakatribune.com/bangladesh/education/423401/hsc-results-hit-six-year-low-as-pass-rate-gpa-5",
    published: "2026-11-08",
  },
  {
    id: "spice-second-chance",
    heat: "HOT",
    kicker: "4.23 LAKH RETAKERS · GATES ALREADY CLOSING",
    headline: "The government handed out a second chance. The universities already spent it.",
    body:
      "Almost 4.23 lakh HSC candidates who failed one or two subjects were promised supplementary exams from early December. Dhaka University still opens applications on 11 November and closes on the 25th. BUET is lining up 21 November for applications and 16 January for the written test — and has said it is not waiting. A second chance that arrives after the elite gates close is not a chance. It is a press release.",
    punch: "Ministry coordination meeting ≠ university delay. The calendar is the policy.",
    sourceLabel: "Prothom Alo · Daily Star · TBS, 4–8 Nov 2026",
    sourceUrl: "https://en.prothomalo.com/youth/education/1vba0jjm65",
    published: "2026-11-08",
  },
  {
    id: "spice-coaching-ban",
    heat: "SYSTEM",
    kicker: "25 YEARS OF BANS · ZERO CLOSURES",
    headline: "Every education minister promises to kill coaching. The centres keep opening branches.",
    body:
      "Draft Education Act language, press conferences, moral panic — same script since 2009. Registered centres alone sit at 6,587 serving nearly a million students. Unregistered rooms multiply the number. Monthly coaching often costs more than school fees. Local government issues the trade licences; the ministry issues the statements. The parallel system is not a bug. It is the operating system.",
    punch: "Policy without enforcement is just content for the next election cycle.",
    sourceLabel: "Bangladesh Post · Bonik Barta · BBS survey, 2025–26",
    sourceUrl: "https://www.bangladeshpost.net/posts/bangladesh-s-coaching-centre-policy-25-years-zero-closures-168414",
    published: "2026-11-08",
  },
  {
    id: "spice-college-clash",
    heat: "STREET",
    kicker: "DHAKA COLLEGE × CITY COLLEGE · UDVASH ID CARD",
    headline: "Two colleges threw bricks because of a coaching-centre ID card fight.",
    body:
      "Science Lab. Mirpur Road jammed. Students from Dhaka College and City College chasing each other with sticks and bricks after a quarrel at Udvash over ID cards and seating. Police batons, injured students, injured cops, traffic frozen. The same corridor has seen this movie before. The coaching centre is not a neutral classroom. It is contested territory where campus rivalries get a second stage.",
    punch: "When the coaching hall becomes the campus, the street becomes the exam hall.",
    sourceLabel: "bdnews24 · Voice7 · New Nation, Aug 2025",
    sourceUrl: "https://bdnews24.com/campus/05dab6bc8995",
    published: "2026-11-08",
  },
  {
    id: "spice-teacher-tuition",
    heat: "MARKET",
    kicker: "CLASSROOM EMPTY · PRIVATE ROOM FULL",
    headline: "Teachers mark low in school, then sell the recovery after school.",
    body:
      "Parents report paying several times the monthly school fee for the same teachers in private rooms. Some schools see Bangla or Islamiyat marks tank midyear, then the same teacher’s private batch fills up. Policy says disclose up to ten private students. Practice says look the other way. The public classroom becomes the teaser. The paid room is the product.",
    punch: "If the school taught the syllabus, the second school would starve.",
    sourceLabel: "TIMES · Daily Star roundtables · parent reports, 2026",
    sourceUrl: "https://tob.news/?p=289937",
    published: "2026-11-08",
  },
  {
    id: "spice-medical-lock",
    heat: "SYSTEM",
    kicker: "MBBS / BDS · DATE SHUFFLE",
    headline: "Medical tests drift to 18 December — and still leave the retakers outside.",
    body:
      "The old 4 December working date is dead. Directorate messaging points at 18 December, circular still pending, applications likely mid-November. Retake exams start around 1–2 December; results not due until month-end. Two new government medical colleges — Thakurgaon and Narsingdi, 50 seats each — join the pool. Seat map expands. Timeline for the failed-but-eligible does not.",
    punch: "More colleges. Same closed door for the retake cohort.",
    sourceLabel: "Daily Star · Daily Bangladesh, 7–8 Nov 2026",
    sourceUrl: "https://www.thedailystar.net/news/education/news/medical-dental-entrance-exams-likely-dec-18-shutting-out-hsc-retake-candidates-4317776",
    published: "2026-11-08",
  },
  {
    id: "spice-zero-pass",
    heat: "SCAM",
    kicker: "293 INSTITUTIONS · ZERO PASSERS",
    headline: "Hundreds of schools produced nobody. Somewhere a result still got fixed.",
    body:
      "293 institutions recorded zero successful HSC candidates — up 91 from last year. 100% pass institutions collapsed. Meanwhile Chattogram board had a case where scripts showed zeros and the published marksheet showed forties. Four people named in a case. Mass failure and selective miracle marks can live in the same system. Trust is the real casualty.",
    punch: "When the average collapses, every outlier needs a receipt.",
    sourceLabel: "Daily Campus · TBS · board results, Oct–Nov 2026",
    sourceUrl: "https://english.thedailycampus.com/college/3842",
    published: "2026-11-08",
  },
];
