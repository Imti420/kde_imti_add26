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
    id: "spice-coaching-machine",
    heat: "MARKET",
    kicker: "GPA-5 COLLAPSE · ৳25,000+ CRORE SHADOW SYSTEM",
    headline: "HSC scores crashed. The coaching industry did not. Welcome to the real admission economy.",
    body:
      "Pass rates cratered toward the low fifties; GPA-5 counts collapsed into the tens of thousands. Boards talk about ending artificial inflation. Meanwhile Bangladesh still runs thousands of registered coaching centres — and a much larger unregistered swarm — in a parallel market variously estimated north of ৳25,000 crore. Grade-1 lottery is dead; admission exams for children are back; coaching for six-year-olds is already a business plan. University season is when that machine prints the hardest: mock tests, batch fees, 'guaranteed' seats, and panic sold by the hour.",
    punch: "The state grades harder. The market sells certainty. Guess who collects.",
    sourceLabel: "TBS · Bangladesh Post · Daily Sun desk synthesis, Nov 2026",
    sourceUrl: "https://www.tbsnews.net/bangladesh/education/teacher-shortages-learning-gaps-blamed-hsc-results-slump-1588971",
    published: "2026-11-08",
  },
];
