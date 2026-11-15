/**
 * Desk-written spicy briefings — not crawler headlines.
 * Cycle n1115 · 15 Nov 2026 afternoon — RU portal live · DU ~10 days · JnU check portal · BUET Friday.
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
    id: "n1115-ru-live",
    heat: "HOT",
    kicker: "RU · LIVE TODAY",
    headline:
      "Rajshahi applications are open — 15 Nov noon through 30 Nov. Tests in February.",
    body:
      "Official portal admission.ru.ac.bd lists online application 15 Nov 12:00 – 30 Nov 23:59. Unit tests: B (Business) 12 Feb · C (Science) 13 Feb · A (Arts) 20 Feb. Supplementary passers get a later window after results. Tea first, then the form.",
    punch: "RU is open. The calendar can wait.",
    sourceLabel: "admission.ru.ac.bd · Prothom Alo · 15 Nov 2026",
    sourceUrl: "https://admission.ru.ac.bd/",
    published: "2026-11-15",
    circularId: "c-ru",
  },
  {
    id: "n1115-du",
    heat: "HOT",
    kicker: "DU · ~10 DAYS",
    headline:
      "Dhaka University still open through 25 November 23:59. December tests unchanged.",
    body:
      "About ten days left on the portal. Only the 2026 HSC batch; second-timers out. Science 8.0 · Arts/Business 7.5 · Fine Arts 6.5 · IBA 8.0. Finish DU this week if it is on your list.",
    punch: "Quiet clock. Real deadline.",
    sourceLabel: "admission.eis.du.ac.bd · 15 Nov 2026",
    sourceUrl: "https://admission.eis.du.ac.bd/",
    published: "2026-11-15",
    circularId: "c-du",
  },
  {
    id: "n1115-jnu",
    heat: "SYSTEM",
    kicker: "JnU · CHECK PORTAL",
    headline:
      "Jagannath: some notices say 15 Nov, signed-circular lines say 25 Nov. Open admission.jnu.ac.bd before you pay.",
    body:
      "Star / All Result still print 15 Nov–10 Dec. Dhaka Tribune, Ittefaq and Bangla Press cite the Acting Registrar for 25 Nov noon start. Unit grid is stable: A 1 Jan · E 8 Jan · B 15 Jan · C 22 Jan · D 23 Jan. Fees ৳1,200 / ৳1,500.",
    punch: "Portal wins the argument.",
    sourceLabel: "admission.jnu.ac.bd · desk · 15 Nov 2026",
    sourceUrl: "https://admission.jnu.ac.bd/",
    published: "2026-11-15",
    circularId: "c-jnu",
  },
  {
    id: "n1115-buet",
    heat: "SYSTEM",
    kicker: "BUET · FRIDAY",
    headline:
      "BUET applications open Friday 21 November. Written test stays 16 January.",
    body:
      "Six days out. GPA wall unchanged. No preliminary MCQ. Close date still not on the stored notice — watch the BUET site mid-week.",
    punch: "Engineering form next week.",
    sourceLabel: "BUET notice · TBS · 15 Nov 2026",
    sourceUrl: "https://www.buet.ac.bd/",
    published: "2026-11-15",
    circularId: "c-buet",
  },
  {
    id: "n1115-kuet",
    heat: "HOT",
    kicker: "KUET · STILL OPEN",
    headline:
      "KUET applications running through 10 December 17:00. Test 8 January. PDF on the archive.",
    body:
      "1,105 seats. Centres Khulna, Dhaka, Rajshahi. Eligible list targeted 20 Dec. Cleanest engineering paper on the desk.",
    punch: "Already open. Keep counting.",
    sourceLabel: "admission.kuet.ac.bd · 15 Nov 2026",
    sourceUrl: "https://admission.kuet.ac.bd/",
    published: "2026-11-15",
    circularId: "c-kuet",
  },
  {
    id: "n1115-board",
    heat: "STREET",
    kicker: "DESK · 15 NOV",
    headline:
      "Today’s board: RU live · DU ~10 days · JnU portal check · KUET open · BUET Friday.",
    body:
      "No new national circular dropped this morning. Form season is just more portals lighting up. Write what is open; ignore the rumour graphic.",
    punch: "Forms today. Arguments optional.",
    sourceLabel: "Admission//26 desk · 15 Nov 2026",
    sourceUrl: "/newswire",
    published: "2026-11-15",
    circularId: null,
  },
];
