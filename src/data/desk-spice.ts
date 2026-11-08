/**
 * Desk-written spicy briefings — not crawler headlines.
 * Updated by hand when the season moves. Keep claims sourced.
 */
export interface SpiceCard {
  id: string;
  heat: "HOT" | "SYSTEM" | "MARKET";
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
    id: "spice-second-chance",
    heat: "HOT",
    kicker: "422,905 STUDENTS · ONE BROKEN CALENDAR",
    headline: "The government handed out a second chance. The universities already spent it.",
    body:
      "Almost 4.23 lakh HSC candidates who failed one or two subjects were promised supplementary exams from early December, with results hoped for by year-end. Dhaka University still opens applications on 11 November and closes on the 25th. BUET is lining up 21 November for applications and 16 January for the written test — and has said, in plain language, it is not waiting. A 'second chance' that arrives after the elite gates close is not a chance. It is a press release.",
    punch: "Ministry coordination meeting ≠ university delay. The calendar is the policy.",
    sourceLabel: "Prothom Alo · Daily Star · TBS, 4–8 Nov 2026",
    sourceUrl: "https://en.prothomalo.com/youth/education/1vba0jjm65",
    published: "2026-11-08",
  },
  {
    id: "spice-medical-lock",
    heat: "SYSTEM",
    kicker: "MBBS / BDS · DATE SHUFFLE",
    headline: "Medical tests drift to 18 December — and still leave the retakers outside.",
    body:
      "The old 4 December medical working date is dead. Directorate messaging now points at 18 December, with a circular still pending and applications likely to open mid-November. Retake exams only start around 1–2 December; results are not due until the end of the month. Do the arithmetic. Two brand-new government medical colleges — Thakurgaon and Narsingdi, each with 50 seats and each in a political home district — will join the 2026–27 pool. The seat map expands. The timeline for the failed-but-eligible does not.",
    punch: "More colleges. Same closed door for the retake cohort.",
    sourceLabel: "Daily Star · Daily Bangladesh, 7–8 Nov 2026",
    sourceUrl: "https://www.thedailystar.net/news/education/news/medical-dental-entrance-exams-likely-dec-18-shutting-out-hsc-retake-candidates-4317776",
    published: "2026-11-08",
  },
  {
    id: "spice-gpa-crash",
    heat: "MARKET",
    kicker: "GPA-5 COLLAPSE · COACHING ECONOMY STILL RICH",
    headline: "Pass rates in the low 50s, GPA-5 in free fall — and the coaching machine never blinked.",
    body:
      "Only about 40,000 students locked GPA-5 this year (science+home economics slice ~26.7k). Pass rate around 52%. Meanwhile the shadow coaching economy that sells 'certainty' for BUET / medical / DU keeps printing money. Families who already spent lakhs on coaching now watch the retake calendar and the elite gates close in the same month. The product being sold was never a guaranteed seat. It was hope with a receipt.",
    punch: "The market is fine. The students are not.",
    sourceLabel: "Board results · admission desk synthesis, Nov 2026",
    sourceUrl: "https://www.tbsnews.net/bangladesh/education/du-undergraduate-admission-applications-open-11-november-1594166",
    published: "2026-11-08",
  },
];
