/**
 * Desk-written briefings — cycle n1120b · 20 Nov 2026 night.
 * Full replace. Soft tone. Calendar lock facts only.
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
    id: "n1120b-du",
    heat: "HOT",
    kicker: "DU · CLOSES TUE",
    headline: "Dhaka University forms close 25 November at 23:59.",
    body:
      "About five days left on admission.eis.du.ac.bd. Unit tests stay in December: IBA 5 · Science 12 · Arts 19 · Fine Arts 22 · Business 26. 2026 HSC batch only — no second-timers.",
    punch: "Finish DU before Tuesday night.",
    sourceLabel: "admission.eis.du.ac.bd · 20 Nov 2026",
    sourceUrl: "https://admission.eis.du.ac.bd/",
    published: "2026-11-20",
    circularId: "c-du",
  },
  {
    id: "n1120b-buet",
    heat: "SYSTEM",
    kicker: "BUET · NEW DATE",
    headline: "BUET admission test is now 1 February 2027.",
    body:
      "The 16 January date is off the board. Applications reported from about 21 November through 7 January 23:59. GPA wall unchanged. Confirm fee and groups on buet.ac.bd.",
    punch: "Engineering calendar shifted.",
    sourceLabel: "BUET revised schedule · desk · 20 Nov",
    sourceUrl: "https://www.buet.ac.bd/",
    published: "2026-11-20",
    circularId: "c-buet",
  },
  {
    id: "n1120b-ru",
    heat: "HOT",
    kicker: "RU · OPEN",
    headline: "Rajshahi applications run through 30 November.",
    body:
      "Unit tests: B 12 Feb · C 13 Feb · A 20 Feb 2027. Supplementary passers get a short extra window after results. Any January unit grid on old cards is wrong.",
    punch: "RU is a February exam.",
    sourceLabel: "admission.ru.ac.bd · 20 Nov 2026",
    sourceUrl: "https://admission.ru.ac.bd/",
    published: "2026-11-20",
    circularId: "c-ru",
  },
  {
    id: "n1120b-jnu",
    heat: "HOT",
    kicker: "JnU · OPEN",
    headline: "Jagannath applications through 10 December.",
    body:
      "Five MCQ units from 1–23 January: A 1 Jan · E 8 Jan · B 15 Jan · C 22 Jan · D 23 Jan. Fee around ৳1,000–1,200 by unit — check admission.jnu.ac.bd before you pay.",
    punch: "Portal first, then fee.",
    sourceLabel: "admission.jnu.ac.bd · 20 Nov 2026",
    sourceUrl: "https://admission.jnu.ac.bd/",
    published: "2026-11-20",
    circularId: "c-jnu",
  },
  {
    id: "n1120b-cu",
    heat: "SYSTEM",
    kicker: "CU · JAN–FEB",
    headline: "Chittagong unit tests run 29 January to 8 February.",
    body:
      "Applications 15 November – 10 December. Grid: C 29 Jan · A 30 Jan · B1 3 Feb · B2 4 Feb · B 5 Feb · D 6 Feb · D1 8 Feb. December test days are withdrawn.",
    punch: "CU is a winter exam.",
    sourceLabel: "CU schedule · desk · 20 Nov",
    sourceUrl: "/circulars/c-cu",
    published: "2026-11-20",
    circularId: "c-cu",
  },
  {
    id: "n1120b-ju",
    heat: "SYSTEM",
    kicker: "JU · SUNDAY",
    headline: "Jahangirnagar applications open 22 November at 10:00.",
    body:
      "Window through 15 December 23:59. Tests tentatively 10–21 January on campus (no Fri/Sat). Unit-day list still soft — lock the form window first.",
    punch: "JU form this Sunday.",
    sourceLabel: "JU circular line · 20 Nov 2026",
    sourceUrl: "/circulars/c-ju",
    published: "2026-11-20",
    circularId: "c-ju",
  },
  {
    id: "n1120b-ku",
    heat: "SYSTEM",
    kicker: "KU · MOVED",
    headline: "Khulna University tests moved to 4–5 February 2027.",
    body:
      "The mid-December dates are gone. Application notice still pending on this desk. About 1,109 seats. Watch the KU board before you plan travel.",
    punch: "KU is early February now.",
    sourceLabel: "KU reschedule · desk · 20 Nov",
    sourceUrl: "/circulars/c-ku",
    published: "2026-11-20",
    circularId: "c-ku",
  },
  {
    id: "n1120b-kuet",
    heat: "HOT",
    kicker: "KUET · OPEN",
    headline: "KUET applications still open through 10 December.",
    body:
      "Test 8 January 2027. Centres Khulna, Dhaka, Rajshahi. PDF remains the cleanest engineering circular on the archive. Eligible list targeted late December.",
    punch: "Already open. Keep counting.",
    sourceLabel: "admission.kuet.ac.bd · 20 Nov 2026",
    sourceUrl: "https://admission.kuet.ac.bd/",
    published: "2026-11-20",
    circularId: "c-kuet",
  },
  {
    id: "n1120b-board",
    heat: "STREET",
    kicker: "DESK MAP",
    headline: "What the board says tonight: DU · RU · JnU · KUET open; BUET and KU dates moved.",
    body:
      "Agri site from 25 November. SUST tests 17–18 January. GST stays March. If an old card still shows BUET on 16 Jan or KU in December, hard-refresh — those lines are dead.",
    punch: "Trust the circular cards.",
    sourceLabel: "Admission//26 desk · 20 Nov 2026",
    sourceUrl: "/calendar",
    published: "2026-11-20",
    circularId: null,
  },
];
