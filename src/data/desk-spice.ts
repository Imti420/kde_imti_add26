/**
 * Desk-written spicy briefings — not crawler headlines.
 * 9 Nov 2026: UGC BOMB is the lead. Everything else is fallout.
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
    id: "spice-ugc-nuke",
    heat: "NUKE",
    kicker: "WHO GAVE A SHIT BOUT UGC?? · 9 NOV · STREET EDITION",
    headline: "WHO GAVE A SHIT BOUT UGC?? চেয়ারম্যান বললেন সব পাবলিক ইউনি ভর্তি জানুয়ারি থেকে — গ্রুপে এখনো 'DU কি ইনক্লুডেড?' নিয়ে ঝগড়া।",
    body:
      "সোজা কথা। ইউজিসি চেয়ারম্যান বললেন — সব পাবলিক বিশ্ববিদ্যালয়ের ভর্তি কার্যক্রম জানুয়ারি থেকে, পরীক্ষা ১ ফেব্রুয়ারি থেকে। অফিসিয়াল কারণ: সাড়ে চার লাখ HSC রিটেক। আনঅফিসিয়াল বাস্তবতা: DU আগামীকালই ফর্ম খুলছিল, BUET ২১ নভেম্বর, মেডিকেল ১৮ ডিসেম্বর লক। কোচিং হাউজগুলো পুরোনো ক্যালেন্ডার বেচে বসে আছে। গ্রুপে ছেড়ো ঝগড়া — 'DU কি ইনক্লুডেড?' 'VC ঘুমাচ্ছিল নাকি?' কেউ সার্কুলার দেখে না, সবাই স্ক্রিনশট দেখে। ইউজিসি যাই বলুক, যতক্ষণ না DU-BUET-মেডিকেল নিজের নোটিশ না ছাড়ে, ততক্ষণ এটা শুধু একটা বিবৃতি। তারপরও ক্যালেন্ডারটা এক দিনে দুই মাস পিছিয়ে গেল। হ্যাঁ ভাই — who gave a shit bout UGC? এখন সবাই দিচ্ছে।",
    punch: "সার্কুলার ছাড়া কোনো তারিখ বিশ্বাস কোরো না। ইউজিসি বিবৃতি ≠ ইউনিভার্সিটি নোটিশ।",
    sourceLabel: "Udvash Unmesh group · UGC chairman statement · desk, 9 Nov 2026",
    sourceUrl: "https://bdnews24.com/education/5ntai555o0",
    published: "2026-11-09",
  },
  {
    id: "spice-du-chaos",
    heat: "HOT",
    kicker: "DU · PORTAL WAS LIVE · WINDOW WAS TOMORROW",
    headline: "Dhaka University's 11–25 November window is now a ghost. The portal still shows the old countdown.",
    body:
      "For weeks the desk treated 11 November noon as fixed law. Five unit tests in December. Classes March 2027. Then UGC said every public university must wait until January. DU has not yet published a formal pull-back notice as of this desk pass — but the commission's line is unanimous and the VCs were in the room. Students who planned to hit submit tomorrow are staring at a portal that has not been told the war is over. Expect a DU notice within hours or days. Until then the archive marks the old dates as SUPERSEDED PENDING LOCAL NOTICE.",
    punch: "A live application portal and a dead calendar can coexist for exactly one news cycle.",
    sourceLabel: "DU portal · UGC briefing · desk, 9 Nov 2026",
    sourceUrl: "https://admission.eis.du.ac.bd/",
    published: "2026-11-09",
  },
  {
    id: "spice-retake-won",
    heat: "SYSTEM",
    kicker: "4.23 LAKH RETAKERS · THE DOOR FINALLY OPENED",
    headline: "The retake army forced the system to blink. UGC says they get a seat at the table.",
    body:
      "Supplementary exams start 1 December. Results promised by 31 December. For two weeks DU, BUET and medical looked ready to run without them. Today the commission flipped the table: admission activity after all HSC results are in. Whether every university actually obeys — and whether medical (DGME, not UGC) follows — is the next fight. But the political signal is clear. Leaving 4.23 lakh kids outside the 2026–27 cycle was not going to hold.",
    punch: "A second chance only matters if the gates are still open when the result arrives.",
    sourceLabel: "UGC · Star · Prothom Alo retake file, 9 Nov 2026",
    sourceUrl: "https://www.thedailystar.net/news/education/news/public-university-admission-procedures-begin-after-december-31-4319011",
    published: "2026-11-09",
  },
  {
    id: "spice-buet-standoff",
    heat: "WAR",
    kicker: "BUET · SAID IT WOULD NOT WAIT · NOW WHAT",
    headline: "BUET spent a week saying the 16 January test and 21 November apps were final. UGC just overruled the vibe.",
    body:
      "Committee chair Prof Kamrul Hasan had been explicit: eligibility stays hard, calendar stays, retakers are not a reason to slip. That was the line on 7–8 November. On 9 November the UGC meeting — with VCs present — set a national floor: no public university admission process before January. BUET is autonomous enough to try to hold the old line. It is also inside the same political weather as everyone else. Watch the next BUET notice like a hawk.",
    punch: "Autonomy meets a commission that just nationalised the calendar.",
    sourceLabel: "TBS · Prothom Alo · UGC, 7–9 Nov 2026",
    sourceUrl: "https://www.tbsnews.net/bangladesh/education/buet-admission-applications-open-21-nov-test-set-16-jan-1595726",
    published: "2026-11-09",
  },
  {
    id: "spice-medical-orphan",
    heat: "SYSTEM",
    kicker: "MEDICAL · DGME NOT UGC · 18 DEC STILL ON THE BOARD",
    headline: "Medical is not a university. The 18 December test may still happen while the unis wait until February.",
    body:
      "DGME locked medical/dental to 18 December days ago. UGC's postponement covers public universities. MBBS/BDS sits under health education. That gap is about to become the loudest argument in the country: retakers might get university doors opened in January while the medical door still slams in mid-December. Unless the ministry forces DGME into the same winter, two parallel realities will run at once.",
    punch: "Same students. Two regulators. Two calendars. One crisis.",
    sourceLabel: "DGME confirmations · UGC briefing, 8–9 Nov 2026",
    sourceUrl: "https://observerbd.com/news/604606",
    published: "2026-11-09",
  },
  {
    id: "spice-coaching-meltdown",
    heat: "MARKET",
    kicker: "COACHING · BATCHES SOLD ON A DEAD CALENDAR",
    headline: "ACS, Udvash and the whole street just watched their November–December product evaporate.",
    body:
      "Model tests timed to DU's old December units. Crash courses sold against a 21 November BUET open. Medical batches locked to mid-December. UGC moved the entire public university season into 2027. Refund fights, batch reshuffles, and 'new schedule orientation' SMS storms start tonight. The coaching economy prices certainty. Today certainty was recalled by the manufacturer.",
    punch: "You cannot sell a seat on a date the commission just deleted.",
    sourceLabel: "Desk synthesis — coaching street + UGC, 9 Nov 2026",
    sourceUrl: "https://bdnews24.com/education/5ntai555o0",
    published: "2026-11-09",
  },
  {
    id: "spice-coordination-committee",
    heat: "SYSTEM",
    kicker: "NEW BODY · UGC + MINISTRY + UNIVERSITIES",
    headline: "They are building a permanent calendar police so this never happens cleanly again.",
    body:
      "The same meeting floated a central coordination committee — UGC, education ministry, university reps — to run admission schedules year-round, kill date clashes, and factor in Ramadan. That is the long game. The short game is forcing every VC who already printed a leaflet to eat it. Coordination sounds boring until you realise it is the state admitting the free-for-all was a disaster.",
    punch: "Centralisation is what you get when every campus runs its own war.",
    sourceLabel: "Dhaka Tribune · Star UGC briefing, 9 Nov 2026",
    sourceUrl: "https://www.dhakatribune.com/bangladesh/424094/public-university-admission-tests-to-begin-in",
    published: "2026-11-09",
  },
  {
    id: "spice-students-in-limbo",
    heat: "STREET",
    kicker: "STUDENTS · TWO WEEKS OF WHIPLASH",
    headline: "One week ago the fear was missing the bus. Today the bus was cancelled and rescheduled for winter.",
    body:
      "Retakers celebrate. Regular passers who built December strategy cry. Families who paid coaching on the old map want blood or refunds. Portals still show dead countdowns. Group chats are unreadable. This is what a national calendar reset feels like from the ground: not a press release, a collective nervous breakdown with PDFs.",
    punch: "Admission 26's shining moment is pure procedural chaos.",
    sourceLabel: "Desk · campus channels · UGC day coverage, 9 Nov 2026",
    sourceUrl: "https://english.thedailycampus.com/university-admission/3886",
    published: "2026-11-09",
  },
  {
    id: "spice-what-next",
    heat: "HOT",
    kicker: "NEXT 72 HOURS · WATCH THESE NOTICES",
    headline: "DU notice. BUET notice. DGME statement. That is the only scoreboard that matters now.",
    body:
      "UGC set the floor. Each institution still has to publish its own rewritten circular. Until DU formally kills the 11 November open, the portal is Schrödinger's application window. Until BUET speaks, 21 November and 16 January are undead dates. Until DGME lines up with or against the university winter, medical is a separate timeline. The desk will update the archive the hour those notices land.",
    punch: "The commission spoke. The campuses have not all answered.",
    sourceLabel: "Desk standing order, 9 Nov 2026",
    sourceUrl: "https://www.thedailystar.net/news/education/news/public-university-admission-procedures-begin-after-december-31-4319011",
    published: "2026-11-09",
  },
];
