/**
 * Desk-written spicy briefings — not crawler headlines.
 * GO UPDATE NEWS 10 Nov 2026 evening — Raju / SPICE.
 * Portal countdown: DU opens in ~20h. New ids → alert fan-out.
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
    id: "n1010n-du-20h",
    heat: "NUKE",
    kicker: "DU PORTAL · ~20 HOURS · admission.eis.du.ac.bd",
    headline:
      "Dhaka University applications open TOMORROW — 11 November 12:00. Close 25 November 23:59. The countdown is live on the official site.",
    body:
      "Not a rumour thread. The university portal is counting down to noon Wednesday. Fees on the page: IBA ৳1500, other units ৳1200. Tests: IBA 5 Dec · Science 12 Dec · Arts/Law/Social 19 Dec · Fine Arts 22 Dec · Business 26 Dec. Re-evaluation results 23 Nov give revised-result kids two days before close. Supplementary failures stay outside. UGC asked for January. DU’s committee said no on 9 November.",
    punch: "Screenshot the portal. Charge the phone. Noon is a hard edge.",
    sourceLabel: "admission.eis.du.ac.bd · TBS · bdnews24 · 9–10 Nov 2026",
    sourceUrl: "https://admission.eis.du.ac.bd/",
    published: "2026-11-10",
  },
  {
    id: "n1010n-ugc-du-war",
    heat: "WAR",
    kicker: "UGC JANUARY · DU DECEMBER · SAME AFTERNOON",
    headline:
      "UGC told the country: apps in January, tests in February. DU kept November–December the same day.",
    body:
      "Chairman Mamun Ahmed after meeting VCs: wait for re-eval + supplementary results by 31 December, then national public-university motion, mind Ramadan. DU VC skipped that room. Pro-VC Alfasane: stick to the old map; re-eval passers still fit; failures do not; session delay for everyone is not charity. Two calendars, one country, zero apology.",
    punch: "Pick the PDF that can actually reject you.",
    sourceLabel: "bdnews24 · Daily Star · TBS · 9–10 Nov 2026",
    sourceUrl: "https://bdnews24.com/campus/qf1q223ws4",
    published: "2026-11-10",
  },
  {
    id: "n1010n-retake-math",
    heat: "SYSTEM",
    kicker: "4.23 LAKH · SUPP FROM 1 DEC · DU CLOSES 25 NOV",
    headline:
      "Supplementary exams begin 1 December. Flagship application closes six days earlier. That is the whole policy.",
    body:
      "Ministry sold a one-month second chance. Board arithmetic lands results near year-end. DU, BUET, and the medical mid-December whisper do not move. Re-scrutiny kids (results 23 Nov) still have a slit through DU’s door. One-or-two-subject fail kids do not — not for the elite gates that already printed December and January.",
    punch: "A second chance after the lock is a headline, not a roll number.",
    sourceLabel: "Daily Star · ministry timeline · Nov 2026",
    sourceUrl: "https://www.thedailystar.net/news/education/exams-and-results/news/hsc-retake-examinees-miss-out-du-admission-test-despite-ugc-request-4319441",
    published: "2026-11-10",
  },
  {
    id: "n1010n-buet-wall",
    heat: "HOT",
    kicker: "BUET · APPS 21 NOV · TEST 16 JAN · NO SOFTENING",
    headline:
      "BUET keeps GPA-5 + A+ in Physics, Chemistry, Higher Math. About 10,000 may sit. Retakers are not in the frame.",
    body:
      "Apps from 21 November, written 16 January. GPA-5 pool shrank hard this cycle; the wall did not. Same stubborn line as DU against the ministry’s soft landing. Engineering prestige still prices itself in exclusion.",
    punch: "The pressure cooker does not do extensions.",
    sourceLabel: "bdnews24 · TBS · 7–8 Nov 2026",
    sourceUrl: "https://bdnews24.com/bangladesh/3lvn1kwzzs",
    published: "2026-11-10",
  },
  {
    id: "n1010n-kuet-live",
    heat: "HOT",
    kicker: "KUET · APPS LIVE · TEST 8 JAN",
    headline:
      "KUET application window is already open (from 10 November). Test 8 January in Khulna, Dhaka, Rajshahi.",
    body:
      "While UGC narrates February, KUET is taking forms now. Engineering campuses are not one bloc: BUET 16 Jan, KUET 8 Jan, RUET/CUET still carrying separate January dates in the compilations. Read the campus circular, not the commission quote.",
    punch: "Live window beats a press conference.",
    sourceLabel: "students.bd · Daily Star schedules · Nov 2026",
    sourceUrl: "https://students.bd/admission",
    published: "2026-11-10",
  },
  {
    id: "n1010n-medical",
    heat: "SYSTEM",
    kicker: "MBBS / BDS · ~18 DEC · CIRCULAR PENDING",
    headline:
      "Medical and dental still pointed at mid-December. Formal circular not locked; retake cohort still looks shut out.",
    body:
      "4 December working date is dead. Desk and ministry-adjacent reporting cluster around 18 December, applications likely mid-November. Thakurgaon and Narsingdi add seats without adding time for failed-but-eligible HSC kids. MBBS remains status gold. The calendar remains iron.",
    punch: "More colleges. Same closed arithmetic.",
    sourceLabel: "Daily Star · Samakal · Nov 2026",
    sourceUrl: "https://www.thedailystar.net/news/education/news/medical-dental-entrance-exams-likely-dec-18-shutting-out-hsc-retake-candidates-4317776",
    published: "2026-11-10",
  },
  {
    id: "n1010n-relax-not-calendar",
    heat: "STREET",
    kicker: "DU · DEPARTMENT RELAXATIONS · CALENDAR UNTOUCHED",
    headline:
      "DU softened some subject thresholds and department bars on 9 November. It did not soften the dates.",
    body:
      "Emergency general admission committee: lower marks in selected test subjects / HSC grade floors for some departments and institutes. Overall application eligibility frame stays. Schedule stays. The story is not ‘DU went soft.’ The story is ‘DU went precise about who still misses the bus.’",
    punch: "Relaxed marks. Unrelaxed noon.",
    sourceLabel: "Observer · Jago News · 9 Nov 2026",
    sourceUrl: "https://observerbd.com/news/604971",
    published: "2026-11-10",
  },
  {
    id: "n1010n-market",
    heat: "MARKET",
    kicker: "GPA-5 CRASH · COACHING STILL CASHING",
    headline:
      "Pass rate in the low 50s. GPA-5 collapsed. The coaching economy did not.",
    body:
      "Families who prepaid ‘certainty’ for DU/BUET/medical now watch a portal open tomorrow while retake results sit in December. The invoice was never a seat. It was adrenaline with a bKash number. Elite gates still price scarcity the old way.",
    punch: "The market is solvent. The cohort is not.",
    sourceLabel: "Board results · desk synthesis · Nov 2026",
    sourceUrl: "https://www.tbsnews.net/bangladesh/education/du-undergraduate-admission-applications-open-tomorrow-1598041",
    published: "2026-11-10",
  },
  {
    id: "n1010n-desk",
    heat: "STREET",
    kicker: "DESK · IF YOU NEED DU THIS CYCLE",
    headline:
      "Tomorrow noon: portal, payment proof, backup number, charged battery. Not vibes.",
    body:
      "Re-eval track: results 23 Nov, deadline 25 Nov — treat those 48 hours as sacred. Fail-one-or-two track: DU and BUET already answered. Medical still looks closed on the same math. KUET is live now. GST March is another film. The flagship stops being theoretical at 12:00.",
    punch: "Discipline is a screenshot and a second SIM.",
    sourceLabel: "Admission desk · 10 Nov 2026",
    sourceUrl: "https://admission.eis.du.ac.bd/",
    published: "2026-11-10",
  },
];
