/**
 * Desk-written spicy briefings — not crawler headlines.
 * GO UPDATE NEWS · 10 Nov 2026 afternoon (WIRE) — T-minus hours to DU portal.
 * New IDs (n1010p-*) force alert fan-out.
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
    id: "n1010p-du-tminus",
    heat: "NUKE",
    kicker: "DU PORTAL · T-MINUS HOURS · 11 NOV 12:00",
    headline:
      "Tomorrow noon the DU form either takes money or the whole defiance story collapses. Countdown is not a metaphor.",
    body:
      "admission.eis.du.ac.bd is already showing the clock: apps 11 Nov 12:00 → 25 Nov 23:59. IBA 5 Dec, Science 12, Arts/Law/Social 19, Fine Arts 22, Business 26. Fees on the board: ৳1,200 / 1,400 / 1,500 by unit. Re-eval sheets due ~23 Nov still fit the window. If the submit button lights, UGC’s January floor is optional for the flagship. If it doesn’t, yesterday’s PVC quote becomes a footnote.",
    punch: "Refresh the portal, not the talk shows.",
    sourceLabel: "DU portal · Star · TOB · 10 Nov 2026",
    sourceUrl: "https://admission.eis.du.ac.bd/",
    published: "2026-11-10",
  },
  {
    id: "n1010p-star-split",
    heat: "WAR",
    kicker: "DAILY STAR · 10 NOV · TWO CALENDARS",
    headline:
      "Morning paper still sells January apps / February tests. Same page admits DU is sprinting December anyway.",
    body:
      "Star’s 10 Nov line: public universities pushed toward January applications and February tests for HSC retakers; UGC asked campuses that already published to reconsider. Same report: DU keeps 11–25 Nov apps and December units. That is not confusion — that is a split season with the biggest brand on the winter track and the commission on the spring track.",
    punch: "One country. Two admission winters. Pick your PDF.",
    sourceLabel: "The Daily Star, 10 Nov 2026",
    sourceUrl: "https://online.thedailystar.net/news/bangladesh/news/universities-push-admission-tests-february-4319641",
    published: "2026-11-10",
  },
  {
    id: "n1010p-kuet-live-day",
    heat: "HOT",
    kicker: "KUET · APPS LIVE TODAY · DAY 1",
    headline:
      "KUET is not waiting for the UGC seminar. Forms are open right now through 10 December.",
    body:
      "Portal admission.kuet.ac.bd: window 10 Nov 10:00 → 10 Dec 17:00. Test 8 Jan 2027 in Khulna, Dhaka, Rajshahi. ~1,105 seats across 17 departments. Combined HSC GPA in Math+Physics+Chemistry+English lowered to ≥16.00 (was 18). Engineering just started the race while general universities argue about January.",
    punch: "Some portals open. Some press conferences continue.",
    sourceLabel: "KUET admission portal · desk, 10 Nov 2026",
    sourceUrl: "https://admission.kuet.ac.bd/",
    published: "2026-11-10",
  },
  {
    id: "n1010p-buet-21",
    heat: "WAR",
    kicker: "BUET · 21 NOV APPS · 16 JAN TEST",
    headline:
      "BUET still on the September map: 21 November applications, 16 January written test, GPA wall intact.",
    body:
      "Prof Kamrul Hasan (7 Nov, TBS): previous circular stands; academic council may meet; preparations continue for 16 Jan. ~1,309 seats. ~10,000 examinee cap. No soft landing for HSC failers. After DU held, silence from engineering is a strategy — until a new notice, treat 21 Nov as live.",
    punch: "Hard GPA. Hard date. Soft only in the speeches.",
    sourceLabel: "TBS · Prothom Alo · 7–10 Nov 2026",
    sourceUrl: "https://www.tbsnews.net/bangladesh/education/buet-admission-applications-open-21-nov-test-set-16-jan-1595726",
    published: "2026-11-10",
  },
  {
    id: "n1010p-medical-18",
    heat: "SYSTEM",
    kicker: "DGME · MBBS/BDS · 18 DECEMBER",
    headline:
      "Medical is not UGC’s child. Combined test locked for 18 December; circular still the missing PDF.",
    body:
      "DGME DG confirmed 18 Dec after the 4 Dec plan died on HSC delay + BCS written on 11 Dec. Apps may open ~15–18 Nov. Thakurgaon and Narsingdi government colleges (50 seats each) join the map. Retakers starting supplementary on 1 Dec are mostly outside this gate unless the ministry forces a miracle.",
    punch: "Health calendar ≠ university calendar. Plan both or lose one.",
    sourceLabel: "Daily Sun · Observer · bdnews24 · 7–8 Nov 2026",
    sourceUrl: "https://observerbd.com/news/604606",
    published: "2026-11-10",
  },
  {
    id: "n1010p-jnu-ru",
    heat: "HOT",
    kicker: "JnU · RU · STILL ON THE AUTUMN BOARD",
    headline:
      "Jagannath apps 15 Nov–10 Dec; tests from 1 Jan. RU still sketching January units. Not everyone copied UGC’s winter.",
    body:
      "Compilations still list JnU online apps mid-November with A-unit style tests in early January. RU had been on a November application sketch before the UGC meeting. Watch for formal slips — but do not assume every campus rolled to February just because the commission held a presser.",
    punch: "Cluster gossip dies when the local circular lands.",
    sourceLabel: "Alormela schedule board · desk, 9–10 Nov 2026",
    sourceUrl: "https://alormela.org/admission/govt-university-admission/government-university-admission-bangladesh",
    published: "2026-11-10",
  },
  {
    id: "n1010p-gst-march",
    heat: "SYSTEM",
    kicker: "GST · MARCH 2027 TESTS · APPS NOT OUT",
    headline:
      "GST cluster still pointing at 19 / 20 / 27 March 2027. Application window not published. Slow is a feature.",
    body:
      "General, Science and Technology group has the longest fuse on the public board. March tests mean the retake cohort has a theoretical path if results land by year-end — unlike DU’s December sprint. Until gstadmission.ac.bd posts the circular, treat dates as committee smoke, not a form.",
    punch: "Long calendar. Empty portal. Patience is the product.",
    sourceLabel: "GST schedule compilations · 9–10 Nov 2026",
    sourceUrl: "https://gstadmission.ac.bd/",
    published: "2026-11-10",
  },
  {
    id: "n1010p-coaching-sms",
    heat: "MARKET",
    kicker: "COACHING · BATCH SMS · TWO MAPS",
    headline:
      "Coaching centres are selling December DU units and January UGC dreams in the same inbox. Refunds incoming.",
    body:
      "Model tests timed to DU Science on 12 Dec. Crash courses sold against BUET’s 21 Nov open. UGC’s January story landed Monday. DU said no Monday night. KUET opened Tuesday. The product on Banani Road is certainty. The input is a calendar that flips twice before dinner.",
    punch: "If the SMS says ‘final schedule’, screenshot it for the refund fight.",
    sourceLabel: "Desk synthesis — street + Star/TOB, 10 Nov 2026",
    sourceUrl: "https://tob.news/season-of-expectation-public-univ-admission-applications-to-open-in-january/",
    published: "2026-11-10",
  },
  {
    id: "n1010p-tonight",
    heat: "STREET",
    kicker: "TONIGHT · THREE TABS ONLY",
    headline:
      "1) DU portal clock. 2) KUET application ID. 3) BUET notice page. Everything else is noise until noon tomorrow.",
    body:
      "You cannot negotiate with a form that is not open yet. You can pre-fill SSC/HSC data, crop the photo, and sleep. Re-eval kids: 23 Nov results still race the 25 Nov close. Medical aspirants: watch DGME this week. GST kids: March is far — don’t burn out on DU discourse.",
    punch: "Tabs. Not threads.",
    sourceLabel: "Desk standing order — afternoon NEWS pass, 10 Nov 2026",
    sourceUrl: "https://admission.eis.du.ac.bd/",
    published: "2026-11-10",
  },
];
