/**
 * Desk-written spicy briefings — not crawler headlines.
 * Cycle n1114 · 14 Nov 2026 night — weekend form week: DU countdown · RU/JnU live · BUET in 7 days.
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
  circularId: string | null;
}

export const SPICE_CARDS: SpiceCard[] = [
  {
    id: "n1114-weekend-forms",
    heat: "NUKE",
    kicker: "14 NOV · WEEKEND FORM WEEK",
    headline:
      "Three portals matter this weekend: DU still open · RU and JnU in the application window · KUET already counting.",
    body:
      "DU close is 25 Nov 23:59 — about 11 days left. RU apps 15–30 Nov. JnU: most desk lines still say 15 Nov–10 Dec; Dhaka Tribune cites a signed circular opening 25 Nov — check admission.jnu.ac.bd before you pay. KUET running to 10 Dec. BUET form opens Friday 21 Nov.",
    punch: "Portal first. Facebook graphic later.",
    sourceLabel: "DU portal · Observer · Dhaka Tribune · students.bd · 14 Nov 2026",
    sourceUrl: "https://admission.eis.du.ac.bd/",
    published: "2026-11-14",
    circularId: "c-du",
  },
  {
    id: "n1114-du",
    heat: "HOT",
    kicker: "DU · ~11 DAYS",
    headline:
      "Dhaka University applications close 25 November 23:59. December unit tests do not move.",
    body:
      "Portal live since 11 Nov. Only 2026 HSC batch; second-timers out. Science GPA 8.0 (3.5 each); Arts/Business 7.5; Fine Arts 6.5; IBA 8.0. Fees ৳1,200 / ৳1,400 / ৳1,500. Tests 5–26 Dec. Admit cards from 2 Dec (IBA/Science) and 7 Dec (rest) on circular digests.",
    punch: "If DU is the target, finish the form this weekend.",
    sourceLabel: "DU portal · duadmission.bd · Observer · 14 Nov 2026",
    sourceUrl: "https://admission.eis.du.ac.bd/",
    published: "2026-11-14",
    circularId: "c-du",
  },
  {
    id: "n1114-jnu",
    heat: "HOT",
    kicker: "JnU · CHECK THE PORTAL",
    headline:
      "Jagannath applications are in play — unit tests still 1–23 January. Confirm open day on admission.jnu.ac.bd.",
    body:
      "Observer / Alormela / Star lines: 15 Nov–10 Dec. Dhaka Tribune (11 Nov) cites Acting Registrar circular opening 25 Nov noon to 10 Dec. Fees ৳1,200 (A–D) / ৳1,500 (E). Tests A 1 Jan · E 8 Jan · B 15 Jan · C 22 Jan · D 23 Jan. Resit door for ≤2 subjects still on campus wires.",
    punch: "Don’t argue the date online. Open the portal.",
    sourceLabel: "Dhaka Tribune · Observer · Alormela · 11–14 Nov 2026",
    sourceUrl: "https://www.dhakatribune.com/bangladesh/campus1/424358/jnu-announces-admission-test-schedule-for-2026-27",
    published: "2026-11-14",
    circularId: "c-jnu",
  },
  {
    id: "n1114-ru",
    heat: "SYSTEM",
    kicker: "RU · APPS LIVE · TESTS FEB",
    headline:
      "Rajshahi applications 15–30 November. Tests: Business 12 Feb · Science 13 Feb · Arts 20 Feb.",
    body:
      "January unit grid is dead on this desk. Supplementary passers get a separate ~7-day window after results. GPA bars under revision — science combined ~7.00 reported. Formal PDF still thin; committee/Prothom Alo lines drive the calendar.",
    punch: "RU is on the late clock. Form is not.",
    sourceLabel: "Prothom Alo · students.bd · 11–14 Nov 2026",
    sourceUrl: "https://www.prothomalo.com/education/admission/syafosa3pv",
    published: "2026-11-14",
    circularId: "c-ru",
  },
  {
    id: "n1114-buet",
    heat: "WAR",
    kicker: "BUET · 7 DAYS",
    headline:
      "BUET applications open 21 November. Written test holds 16 January. No UGC blink.",
    body:
      "GPA wall unchanged. ~1,309 seats. No preliminary MCQ. Application close still not in the stored notice. Flagship engineering clock ignores the floor.",
    punch: "Next Friday the engineering form opens.",
    sourceLabel: "BUET notice · TBS · Pratidin · 8–14 Nov 2026",
    sourceUrl: "https://en.bd-pratidin.com/national/2026/11/08/73062",
    published: "2026-11-14",
    circularId: "c-buet",
  },
  {
    id: "n1114-kuet",
    heat: "HOT",
    kicker: "KUET · LIVE + PDF",
    headline:
      "KUET applications live through 10 December 17:00. Test 8 January. Official PDF on archive.",
    body:
      "1,105 seats. Centres Khulna / Dhaka / Rajshahi. Fee ৳1,500 / ৳1,800. Eligible list targeted 20 Dec. Cleanest engineering PDF on the desk.",
    punch: "Already open. Already counting.",
    sourceLabel: "KUET admission portal · desk · 14 Nov 2026",
    sourceUrl: "https://admission.kuet.ac.bd/",
    published: "2026-11-14",
    circularId: "c-kuet",
  },
  {
    id: "n1114-ju",
    heat: "SYSTEM",
    kicker: "JU · 25 NOV",
    headline:
      "Jahangirnagar applications from 25 November. Tests 10–21 January on campus.",
    body:
      "Digests: apps 25 Nov → 18 Dec. Test window 10–21 Jan, typically Fri/Sat off, JU campus only. Unit-day precision soft until formal PDF. On the board as c-ju.",
    punch: "Not missing anymore. Still soft on unit days.",
    sourceLabel: "students.bd · Observer digests · 14 Nov 2026",
    sourceUrl: "https://students.bd/admission/ju-admission",
    published: "2026-11-14",
    circularId: "c-ju",
  },
  {
    id: "n1114-medical",
    heat: "HOT",
    kicker: "MEDICAL · 18 DEC",
    headline:
      "National MBBS/BDS still pointing at 18 December. Formal DGME circular PDF still missing.",
    body:
      "Coaching calendars and campus wires keep the day. Application window expected when DGME publishes — no invented fee on this desk.",
    punch: "Reported day. Missing paper.",
    sourceLabel: "Observer · desk · 14 Nov 2026",
    sourceUrl: "https://observerbd.com/news/605584",
    published: "2026-11-14",
    circularId: "c-dghs",
  },
  {
    id: "n1114-desk",
    heat: "STREET",
    kicker: "DESK · SATURDAY NIGHT",
    headline:
      "This weekend’s list: DU form · RU/JnU portals · KUET clock · BUET Friday · medical PDF hunt.",
    body:
      "Eleven days on DU. RU is live. JnU — open the official site, sources still split on 15 vs 25 Nov start. BUET in seven days. CoU not until December. Write the board; ignore the rumour graphic.",
    punch: "Forms this weekend. Arguments next week.",
    sourceLabel: "Admission//26 desk · 14 Nov 2026",
    sourceUrl: "/newswire",
    published: "2026-11-14",
    circularId: null,
  },
];
