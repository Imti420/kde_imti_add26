/**
 * Desk-written spicy briefings — not crawler headlines.
 * DAY CYCLE 10 Nov 2026 evening (Raju / SPICE): DU portal opens in hours.
 * New IDs force notification fan-out.
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
    id: "n1010e-du-hours",
    heat: "NUKE",
    kicker: "DU · HOURS LEFT · admission.eis.du.ac.bd",
    headline:
      "Dhaka University applications open TOMORROW at noon — 11 November 12:00. Close 25 November 23:59. UGC asked them to wait. They said no.",
    body:
      "Portal: admission.eis.du.ac.bd. Tests stay locked: IBA 5 Dec · Science 12 Dec · Arts/Law/Social 19 Dec · Fine Arts 22 Dec · Business 26 Dec. Re-evaluation results are due 23 Nov — two days before the gate shuts — so re-scrutiny kids can still apply. Supplementary fail kids cannot. Pro-VC Alfasane: we do not agree with UGC; session delay for the whole campus is not a gift to the failed cohort. Some department subject thresholds were relaxed on 9 Nov. The calendar was not.",
    punch: "Tomorrow noon is not a rumour. It is a submit button.",
    sourceLabel: "DU portal · Daily Star · TBS · Observer · 9–10 Nov 2026",
    sourceUrl: "https://admission.eis.du.ac.bd/",
    published: "2026-11-10",
  },
  {
    id: "n1010e-ugc-split",
    heat: "WAR",
    kicker: "UGC · JANUARY NATION · DU DECEMBER",
    headline:
      "UGC still sells January applications and February tests for public universities. DU kept November–December. Both stories are live on the same afternoon.",
    body:
      "Chairman Mamun Ahmed after the VC meeting: wait for HSC re-eval + supplementary results by 31 December; then apps; then tests in February; mind Ramadan. Pass count sank from 700k+ last cycle toward ~600k. Several campuses were told to reconsider. DU’s general admission committee met in emergency on 9 Nov and kept the old map unanimously. National equity speech vs one university’s session discipline — pick which PDF owns your year.",
    punch: "A commission press conference does not close a university portal.",
    sourceLabel: "Daily Star · TBS · Prothom Alo · 9–10 Nov 2026",
    sourceUrl: "https://www.thedailystar.net/news/education/exams-and-results/news/hsc-retake-examinees-miss-out-du-admission-test-despite-ugc-request-4319441",
    published: "2026-11-10",
  },
  {
    id: "n1010e-retake-wall",
    heat: "SYSTEM",
    kicker: "4.23 LAKH · SUPPLEMENTARY FROM 1 DEC",
    headline:
      "Supplementary exams start 1 December. DU application closes 25 November. Arithmetic is policy.",
    body:
      "Education ministry promised a one-month second chance for students who failed one or two HSC subjects. Results hoped for by year-end. DU will not wait. BUET is on the same stubborn track (apps from 21 Nov, written 16 Jan). Medical messaging still drifts toward mid-December tests — also before retake results land. The ‘second chance’ is real for the board. It is not real for the elite gates that already printed their calendars.",
    punch: "A retake after the deadline is a story, not a seat.",
    sourceLabel: "Daily Star · ministry timeline · 7–10 Nov 2026",
    sourceUrl: "https://www.thedailystar.net/news/education/news/medical-dental-entrance-exams-likely-dec-18-shutting-out-hsc-retake-candidates-4317776",
    published: "2026-11-10",
  },
  {
    id: "n1010e-buet-hold",
    heat: "HOT",
    kicker: "BUET · APPS 21 NOV · TEST 16 JAN",
    headline:
      "BUET will not loosen GPA-5 + A+ in Phy/Chem/HM. Applications from 21 November. Written test 16 January.",
    body:
      "Same eligibility wall as last cycle despite the GPA-5 collapse (~40k total, ~26.7k science/home-ec). Only a tight slice will even be allowed to sit; the university has talked about capping the test cohort near 10k. Retakers are outside the frame. Abroad pipeline does not care about the ministry’s soft landing.",
    punch: "Pressure cooker keeps the lid on.",
    sourceLabel: "bdnews24 · TBS · Network BD · 7–8 Nov 2026",
    sourceUrl: "https://bdnews24.com/bangladesh/3lvn1kwzzs",
    published: "2026-11-10",
  },
  {
    id: "n1010e-medical-18",
    heat: "SYSTEM",
    kicker: "MBBS / BDS · ~18 DEC WHISPER",
    headline:
      "Medical and dental tests still drifting toward mid-December. Retake cohort still locked out.",
    body:
      "Old 4 Dec working date is dead. Directorate chatter and desk compilations point at ~18 December, circular still pending, applications likely mid-November. Two new government medical colleges (Thakurgaon, Narsingdi — 50 seats each) expand the map without expanding the timeline for failed-but-eligible HSC kids. MBBS remains marriage-market gold. The calendar remains iron.",
    punch: "More colleges. Same closed door.",
    sourceLabel: "Daily Star · desk synthesis · 7–10 Nov 2026",
    sourceUrl: "https://www.thedailystar.net/news/education/news/medical-dental-entrance-exams-likely-dec-18-shutting-out-hsc-retake-candidates-4317776",
    published: "2026-11-10",
  },
  {
    id: "n1010e-kuet-window",
    heat: "HOT",
    kicker: "KUET · WINDOW LIVE · TEST 8 JAN",
    headline:
      "KUET application window is in play. Written test fixed for 8 January — another engineering clock that did not wait for UGC’s February dream.",
    body:
      "Engineering campuses are not moving as one bloc. BUET 16 Jan, KUET 8 Jan, RUET/CUET still carrying provisional January dates in the compilations. If you are hunting engineering seats, the cluster fantasy is secondary to each campus’s own PDF.",
    punch: "Read the campus circular, not the commission quote.",
    sourceLabel: "Campus compilations · engineering desks · Nov 2026",
    sourceUrl: "https://alormela.org/admission/govt-university-admission/government-university-admission-bangladesh",
    published: "2026-11-10",
  },
  {
    id: "n1010e-gpa-crash",
    heat: "MARKET",
    kicker: "GPA-5 COLLAPSE · COACHING STILL RICH",
    headline:
      "Pass rate in the low 50s. GPA-5 in free fall. The coaching machine never blinked.",
    body:
      "About 40,000 GPA-5 this cycle; science slice thinner than families budgeted for. Meanwhile the shadow industry that sells ‘certainty’ for DU / BUET / medical keeps the receipts. Parents who already spent lakhs now watch DU open tomorrow while retake results sit in December. The product was never a guaranteed seat. It was hope with a bKash number.",
    punch: "The market is fine. The students are not.",
    sourceLabel: "Board results · desk synthesis · Nov 2026",
    sourceUrl: "https://www.tbsnews.net/bangladesh/education/du-hold-admission-tests-scheduled-despite-ugc-request-defer-1597571",
    published: "2026-11-10",
  },
  {
    id: "n1010e-jnu-ru",
    heat: "STREET",
    kicker: "JnU · RU · CU · OTHER CLOCKS",
    headline:
      "Jagannath apps mid-November into December. Rajshahi and Chittagong windows also moving while UGC talks January.",
    body:
      "Not every public campus is DU, and not every campus obeyed the February sermon. JnU has been listed for apps from mid-November with tests into January. RU/CU compilations show November–December application talk and January–February tests. The season is fragmented on purpose: each senate still thinks it owns time.",
    punch: "One country. Many calendars. No single saviour PDF.",
    sourceLabel: "Desk compilations · campus notices · Nov 2026",
    sourceUrl: "https://banglageek.com/university-admission-dates/",
    published: "2026-11-10",
  },
  {
    id: "n1010e-portal-discipline",
    heat: "STREET",
    kicker: "DESK NOTE · TOMORROW",
    headline:
      "If you need DU this cycle: portal, payment, screenshot, spare battery. Not vibes.",
    body:
      "Re-eval kids: results 23 Nov, deadline 25 Nov — do not sleep on those 48 hours. Failed-one-or-two cohort: DU and BUET have already told you the answer. Medical still looks closed for the same arithmetic. GST March cluster is a different movie. Tomorrow at noon the flagship stops being theoretical.",
    punch: "Discipline is a USB cable and a backup number.",
    sourceLabel: "Admission desk · 10 Nov 2026",
    sourceUrl: "https://admission.eis.du.ac.bd/",
    published: "2026-11-10",
  },
];
