import type { Circular, SourceRef } from "@/data/types";

const STAR_DU: SourceRef = {
  label: "The Daily Star — DU applications open 11 Nov",
  url: "https://online.thedailystar.net/campus/news/dhaka-university-admission-applications-open-nov-11-2026-27-session-4238521",
  published: "2026-08-02",
};

const STAR_CLASH: SourceRef = {
  label: "The Daily Star — eight institutions announce schedules",
  url: "https://online.thedailystar.net/news/education/news/university-admission-tests-2026-27-date-clashes-emerge-8-institutions-announce-schedules-4260196",
  published: "2026-08-30",
};

const STAR_RETAKE: SourceRef = {
  label: "The Daily Star — schedules and the HSC retake",
  url: "https://www.thedailystar.net/news/bangladesh/education/news/admission-schedule-medical-colleges-univs-mull-relief-hsc-retakers-4315036",
  published: "2026-11-04",
};

const TBS_DU: SourceRef = {
  label: "The Business Standard — DU applications open 11 Nov",
  url: "https://www.tbsnews.net/bangladesh/education/du-undergraduate-admission-applications-open-11-november-1594166",
  published: "2026-11-05",
};

const TBS_BUET: SourceRef = {
  label: "The Business Standard — BUET applications 21 Nov, test 16 Jan",
  url: "https://www.tbsnews.net/bangladesh/education/buet-admission-applications-open-21-nov-test-set-16-jan-1595726",
  published: "2026-11-07",
};

const PROTHOM_BUET: SourceRef = {
  label: "Prothom Alo — BUET keeps 2026–27 test on schedule",
  url: "https://en.prothomalo.com/youth/education/n2vti9k72r",
  published: "2026-11-07",
};

const BDNEWS_BUET: SourceRef = {
  label: "bdnews24 — BUET test 16 Jan, applications open 21 Nov",
  url: "https://bdnews24.com/bangladesh/3lvn1kwzzs",
  published: "2026-11-07",
};

const DAILYBD_MED: SourceRef = {
  label: "Daily Bangladesh — medical test shifted toward 18 Dec",
  url: "https://www.daily-bangladesh.com/education/540904",
  published: "2026-11-08",
};

const COACH_ALIGN: SourceRef = {
  label: "Udvas–Unmesh Varsity KA / Engineering MT routine 2026 (coaching calendar — not a university circular)",
  url: "https://udvash-unmesh.com/media/Files/Routine/2026/AP26/Ka/VarsityKA26FMT.pdf",
  published: "2026-11",
};

const BDNEWS_SPLIT: SourceRef = {
  label: "bdnews24 — DU/BUET hold; RU Feb tests + resit window; JnU resit door",
  url: "https://bdnews24.com/education/wk2v9xuw49",
  published: "2026-11-11",
};

const SEATS_COMP: SourceRef = {
  label: "Admission desk compilation — public university seat numbers 2026–27",
  url: "https://admissionnotice.com/en/public-university-seat-number-2026-27/",
  published: "2026-11-02",
};

const KUET_OFFICIAL: SourceRef = {
  label: "KUET official UG Admission Circular 2026–27 (PDF)",
  url: "https://admission.kuet.ac.bd/uploads/notices/1.UG-Admission-2026-Circular.pdf",
  published: "2026-11-03",
};

const KUET_PORTAL: SourceRef = {
  label: "KUET Undergraduate Admission Portal 2026–27",
  url: "https://admission.kuet.ac.bd/",
  published: "2026-11-10",
};

const GST_OBS: SourceRef = {
  label: "The Daily Observer — GST cluster test dates",
  url: "https://observerbd.com/news/594050",
  published: "2026-09-18",
};

const OBS_MED: SourceRef = {
  label: "The Daily Observer — medical/dental test 18 Dec confirmed",
  url: "https://observerbd.com/news/604606",
  published: "2026-11-08",
};

const BDNEWS_MED: SourceRef = {
  label: "bdnews24 — medical tests rescheduled to Dec 18",
  url: "https://bdnews24.com/bangladesh/v368yyqzfm",
  published: "2026-11-08",
};

const SUN_MED: SourceRef = {
  label: "Daily Sun — medical/dental tests 18 December",
  url: "http://www.daily-sun.com/health/907914/medical-dental-admission-tests-scheduled-for-18-december",
  published: "2026-11-08",
};

const DU_PORTAL: SourceRef = {
  label: "Dhaka University admission portal",
  url: "https://admission.eis.du.ac.bd/",
  published: "2026-11-09",
};

function C(
  partial: Pick<
    Circular,
    | "id"
    | "universityId"
    | "title"
    | "summary"
    | "system"
    | "publication"
    | "confidence"
    | "confidenceNote"
    | "sources"
    | "updatedOn"
  > &
    Partial<Circular>,
): Circular {
  return {
    session: "2026-27",
    pdfUrl: null,
    applicationOpens: null,
    opensAt: null,
    applicationCloses: null,
    closesAt: null,
    admitCardOn: null,
    examDate: null,
    examTime: null,
    resultOn: null,
    classesBegin: null,
    feeBdt: null,
    feeNote: "",
    seats: null,
    eligibility: [],
    units: [],
    notes: [],
    ...partial,
  };
}

export const seedCirculars: Circular[] = [
  C({
    id: "c-du",
    universityId: "du",
    title: "University of Dhaka undergraduate admission 2026–27",
    summary:
      "DU APPLICATIONS ARE OPEN (from 11 Nov 12:00 through 25 Nov 23:59). Despite UGC’s 9 Nov national floor (apps from 1 Jan, tests after 1 Feb), Dhaka University kept its published schedule. Unit tests 5–26 Dec (IBA first). Re-evaluation candidates (results due 23 Nov) can still apply before the 25 Nov cutoff. About 6,125 own seats. Some subject/GPA bars relaxed for selected departments. Science/Arts/Business fee ৳1,200 (raised); IBA ৳1,500.",
    system: "own",
    publication: "notice",
    confidence: "notice",
    confidenceNote:
      "Portal live 11 Nov (Channel I, TBS, Observer, Jago News). DU held against UGC 9 Nov floor. Re-eval results due 23 Nov still fit the 25 Nov close. Fee raised on four units (Science/Arts/Business ৳1,200).",
    sources: [STAR_DU, TBS_DU, DU_PORTAL, SEATS_COMP, STAR_CLASH],
    updatedOn: "2026-11-23",
    applicationOpens: "2026-11-11",
    opensAt: "12:00",
    applicationCloses: "2026-11-25",
    closesAt: "23:59",
    examDate: "2026-12-05",
    classesBegin: "2027-03-28",
    feeBdt: 1200,
    feeNote: "Portal lists unit fees: Science / Arts / Business ৳1,200; Fine Arts ৳1,400; IBA ৳1,500.",
    seats: 6125,
    eligibility: [
      "SSC/equivalent passed 2021–2024; HSC/equivalent passed 2026 only (no second-time HSC batch).",
      "Science unit: Science group combined GPA ≥ 8.00 (min 3.50 each exam); Humanities/Business may apply with combined ≥ 7.50 (min 3.00 each).",
      "Arts, Law & Social Science: combined ≥ 7.50 (min 3.00); Science applicants need combined ≥ 8.00 (min 3.50).",
      "Business Studies: combined ≥ 7.50 (min 3.00); Science applicants need combined ≥ 8.00 (min 3.50).",
      "Fine Arts: combined ≥ 6.50 (min 3.00 each).",
      "Total evaluation 120 marks = 100 test + 20 from SSC/HSC GPA.",
    ],
    units: [
      {
        code: "IBA",
        detail: "Institute of Business Administration. ~120 seats (prior pattern). 70 MCQ + 30 descriptive.",
        examDate: "2026-12-05",
        examTime: "10:00–12:00",
        centre: "IBA campus / as on admit card",
      },
      {
        code: "Science",
        detail: "Science unit. ~1,891 seats (2025–26 pattern). Subjects span physical & life sciences faculties. 60 MCQ + 40 written. English-medium science paper available.",
        examDate: "2026-12-12",
        examTime: "11:00–12:30",
        centre: "Dhaka + divisional centres",
      },
      {
        code: "Arts / Law / Social Science",
        detail: "Largest unit. ~2,934 seats (2025–26 pattern). Humanities, law and social science departments.",
        examDate: "2026-12-19",
        examTime: "11:00–12:30",
        centre: "Dhaka + divisional centres",
      },
      {
        code: "Fine Arts",
        detail: "Fine Arts unit. ~130–135 seats. 40 MCQ + 60 drawing.",
        examDate: "2026-12-22",
        examTime: "11:00–12:30",
        centre: "As on admit card",
      },
      {
        code: "Business Studies",
        detail: "Business Studies unit. ~1,050 seats (2025–26 pattern). Faculty of Business Studies departments.",
        examDate: "2026-12-26",
        examTime: "11:00–12:30",
        centre: "Dhaka + divisional centres",
      },
    ],
    notes: [
      "Official portal: admission.eis.du.ac.bd",
      "HSC retake candidates are not accommodated under the published window.",
      "Science unit 12 Dec aligns with national Varsity KA coaching routines marking DU 'Ka' that day — formal schedule remains the DU notice.",
    ],
  }),

  C({
    id: "c-buet",
    universityId: "buet",
    title: "BUET undergraduate admission test 2026–27",
    summary:
      "REVISED: admission test moved to 1 February 2027 (was 16 January). Applications reported open from ~21 November 2026 through 7 January 2027 23:59. Group C written test on 1 Feb. Hard GPA wall unchanged (SSC ≥4.00 science; HSC GPA 5.00 with A+ in Physics, Chemistry, Higher Math). ~1,309 seats.",
    system: "engineering",
    publication: "notice",
    confidence: "notice",
    confidenceNote:
      "Desk 20 Nov: exam date revised to 1 Feb 2027; application close reported 7 Jan 2027. Confirm fee and group map on buet.ac.bd before paying.",
    sources: [TBS_BUET, PROTHOM_BUET, BDNEWS_BUET, SEATS_COMP, STAR_RETAKE],
    updatedOn: "2026-11-23",
    applicationOpens: "2026-11-21",
    applicationCloses: "2027-01-07",
    closesAt: "23:59",
    examDate: "2027-02-01",
    seats: 1309,
    feeBdt: null,
    feeNote: "Last cycle: Engineering/URP ৳1,300; Architecture ৳1,500. 2026–27 fee — confirm on portal.",
    eligibility: [
      "Science group only.",
      "SSC GPA ≥ 4.00; HSC GPA 5.00 with A+ (GPA 5.00) separately in Physics, Chemistry and Higher Mathematics.",
      "Roughly 10,000 examinees will be shortlisted if applications exceed capacity.",
    ],
    units: [
      {
        code: "Group A / C",
        detail: "Engineering & URP departments — written admission test.",
        examDate: "2027-02-01",
        examTime: null,
        centre: "BUET campus / as notified",
      },
      {
        code: "Group B",
        detail: "Architecture (5-year programme). Drawing module applies.",
        examDate: "2027-02-01",
        examTime: null,
        centre: "BUET campus / as notified",
      },
    ],
    notes: [
      "SUPERSEDED: 16 Jan 2027 test day is withdrawn on this desk.",
      "Application close 7 Jan 2027 23:59 (reported).",
      "No preliminary MCQ screening (same pattern as 2025–26).",
    ],
  }),

  C({
    id: "c-kuet",
    universityId: "kuet",
    title: "KUET undergraduate admission test 2026–27",
    summary:
      "Official circular published: online applications 10 Nov 10:00 → 10 Dec 17:00. MCQ test 8 Jan 2027 (09:30–12:30) at KUET, DU and RUET centres. About 1,105 seats across 17 departments. Fee: Khulna centre ৳1,500; Dhaka/Rajshahi centres ৳1,800. Direct PDF available from the admission portal.",
    system: "engineering",
    publication: "notice",
    confidence: "notice",
    confidenceNote:
      "Official PDF on admission.kuet.ac.bd (1.UG-Admission-2026-Circular.pdf). Archived copy at /circulars/c-kuet.pdf (sha256 6d86886d9fb2813ad20d796e26913146cf7a26a2a53fc6f27dd5da3c9291ac3f, 494729 bytes, ~2 pages, fetched 2026-11-11, officialHost). Apps live; test 8 Jan 2027. Eligible-list due 20 Dec; result pattern 21 Jan. doc field pending A01 types.ts.",
    sources: [KUET_OFFICIAL, KUET_PORTAL, STAR_CLASH, SEATS_COMP, STAR_RETAKE],
    updatedOn: "2026-11-23",
    pdfUrl: "https://admission.kuet.ac.bd/uploads/notices/1.UG-Admission-2026-Circular.pdf",
    applicationOpens: "2026-11-10",
    opensAt: "10:00",
    applicationCloses: "2026-12-10",
    closesAt: "17:00",
    examDate: "2027-01-08",
    seats: 1105,
    feeBdt: 1500,
    feeNote:
      "Centre-based: Khulna ৳1,500; Dhaka or Rajshahi ৳1,800 (plus gateway charges). Confirm exact amount and payment flow on admission.kuet.ac.bd before paying.",
    eligibility: [
      "HSC/equivalent 2026 Science group.",
      "SSC GPA ≥ 4.00; HSC Physics + Chemistry + Math + English combined GPA ≥ 16.00 (relaxed from prior 18.00) — exact lines in the official PDF.",
      "Confirm all bars, department seat split and foreign-student rules in the KUET circular PDF before applying.",
    ],
    units: [
      {
        code: "Engineering",
        detail:
          "Single undergraduate MCQ covering KUET departments (CE, EEE, ME, CSE, ECE, LE, URP, Architecture, AICS and others on the current 17-department map).",
        examDate: "2027-01-08",
        examTime: "09:30–12:30",
        centre: "Khulna (KUET), Dhaka (DU), Rajshahi (RUET)",
      },
    ],
    notes: [
      "Official PDF: https://admission.kuet.ac.bd/uploads/notices/1.UG-Admission-2026-Circular.pdf",
      "Eligible-candidate list pattern ~20 Dec; result pattern ~21 Jan — confirm on portal.",
      "Portal shows applications open and ~30 days remaining as of 11 Nov.",
      "8 Jan test day matches Engineering MT coaching calendars; formal KUET circular already on desk with PDF.",
    ],
  }),

  C({
    id: "c-cuet",
    universityId: "cuet",
    title: "CUET undergraduate admission test 2026–27",
    summary: "Proposed test 23 Jan 2027. About 931 seats. Full circular still thin in this archive.",
    system: "engineering",
    publication: "decision",
    confidence: "preliminary",
    confidenceNote: "Date described as proposed in Star timelines. Seats from 2026–27 compilations.",
    sources: [STAR_RETAKE, SEATS_COMP],
    updatedOn: "2026-11-08",
    examDate: "2027-01-23",
    seats: 931,
    eligibility: ["Eligibility belongs in the CUET circular — not fully stored here."],
    units: [
      {
        code: "Engineering",
        detail: "CUET undergraduate engineering & architecture departments (CE, EEE, ME, CSE, and others on the current map).",
        examDate: "2027-01-23",
        examTime: null,
        centre: "Not stated in stored reports.",
      },
    ],
    notes: ["Application window NOT ANNOUNCED in this archive."],
  }),

  C({
    id: "c-ruet",
    universityId: "ruet",
    title: "RUET undergraduate admission test 2026–27",
    summary: "About 1,235 seats across engineering and architecture departments. Test date in stored clash timelines pointed at mid-January; confirm against RUET notice.",
    system: "engineering",
    publication: "decision",
    confidence: "reported",
    confidenceNote: "Seats and department map from session compilations and RUET-facing desks. Exact 2026–27 test day still soft in this archive.",
    sources: [STAR_CLASH, SEATS_COMP],
    updatedOn: "2026-11-08",
    examDate: "2027-01-14",
    seats: 1235,
    eligibility: ["Science group; exact GPA bars in the RUET circular."],
    units: [
      {
        code: "Engineering / Architecture",
        detail:
          "Departments include ME, CE, CSE, EEE, ETE, ECE, IPE, GCE, MTE, MSE, CFPE, URP, Architecture, BECM (seat split varies by department; ~30–180 per dept in recent maps).",
        examDate: "2027-01-14",
        examTime: null,
        centre: "Not confirmed in stored reports.",
      },
    ],
    notes: ["Do not treat mid-January date as final until RUET publishes the circular."],
  }),

  C({
    id: "c-mist",
    universityId: "mist",
    title: "MIST undergraduate admission tests 2026–27",
    summary: "Applications 5 January – 21 January 2027. Fees: A ৳1,300; A+B ৳1,500; C ৳1,100. Unit tests previously listed mid-February on desk — confirm current exam days on mist.ac.bd (app window from compiled schedule).",
    system: "specialized",
    publication: "notice",
    confidence: "reported",
    confidenceNote: "App window + fees from 21 Nov compiled schedule graphic. Earlier Dec exam line may be superseded; do not treat exam day as locked until portal confirms.",
    sources: [STAR_CLASH],
    updatedOn: "2026-11-23",
    applicationOpens: "2027-01-05",
    applicationCloses: "2027-01-21",
    feeBdt: 1300,
    feeNote: "A ৳1,300; A+B ৳1,500; C ৳1,100.",
    examDate: "2027-02-05",
    eligibility: ["Eligibility and seat counts belong in the MIST circular."],
    units: [
      { code: "C", detail: "MIST unit C. Eligible: as defined in MIST circular (check science / engineering bars).", examDate: "2027-02-05", examTime: "10:00", centre: "Seven divisional cities" },
      { code: "A", detail: "MIST unit A. Eligible: as defined in MIST circular.", examDate: "2027-02-06", examTime: "10:00", centre: "Seven divisional cities" },
      { code: "B", detail: "MIST unit B. Eligible: as defined in MIST circular.", examDate: "2027-02-06", examTime: "15:00", centre: "Seven divisional cities" },
      "14 Jan test day matches Engineering MT coaching calendars; formal RUET circular still not archived here.",
    ],
    notes: ["Centres: Dhaka, Rajshahi, Rangpur, Khulna, Chattogram, Sylhet, Mymensingh."],
  }),

  C({
    id: "c-jnu",
    universityId: "jnu",
    title: "Jagannath University undergraduate admission 2026–27",
    summary:
      "REGISTRATION: applications 25 November through 10 December 2026 23:59. Five MCQ units: A 1 Jan · E 8 Jan · B 15 Jan · C 22 Jan · D 23 Jan 2027. Fees A–D ৳1,200; E ৳1,500.",
    system: "own",
    publication: "notice",
    confidence: "reported",
    confidenceNote:
      "App window revised to 25 Nov–10 Dec per 21 Nov compiled schedule graphic; unit grid retained from prior portal digests. Confirm on admission.jnu.ac.bd.",
    sources: [STAR_CLASH, SEATS_COMP],
    updatedOn: "2026-11-23",
    applicationOpens: "2026-11-25",
    opensAt: "12:00",
    applicationCloses: "2026-12-10",
    closesAt: "23:59",
    feeBdt: 1200,
    feeNote: "A, B, C, D ৳1,200; E ৳1,500.",
    examDate: "2027-01-01",
    seats: null,
    eligibility: [
      "Regular students only; second-time applicants not allowed on current line.",
      "Unit GPA bars in the JnU circular (A higher than B/C/D; E lowest).",
    ],
    units: [
      { code: "A", detail: "Science and Life & Earth Sciences.", examDate: "2027-01-01", examTime: "10:00–11:00", centre: "Dhaka" },
      { code: "E", detail: "Fine Arts.", examDate: "2027-01-08", examTime: "10:00–11:00", centre: "Dhaka" },
      { code: "B", detail: "Arts and Law.", examDate: "2027-01-15", examTime: "10:00–11:00", centre: "Dhaka" },
      { code: "C", detail: "Business Studies.", examDate: "2027-01-22", examTime: "10:00–11:00", centre: "Dhaka" },
      { code: "D", detail: "Social Sciences.", examDate: "2027-01-23", examTime: "10:00–11:00", centre: "Dhaka" },
    ],
    notes: [
      "Calendar events: application opens 15 Nov · closes 10 Dec · unit exams January.",
      "Portal: admission.jnu.ac.bd",
    ],
  }),

  C({
    id: "c-ru",
    universityId: "ru",
    title: "University of Rajshahi undergraduate admission 2026–27",
    summary:
      "Applications 15–30 November 2026. Unit tests: B 12 Feb · C 13 Feb · A 20 Feb 2027. Separate short window for supplementary / HSC-resit passers after results. About 3,956 own seats. Prior January unit grid SUPERSEDED.",
    system: "own",
    publication: "decision",
    confidence: "reported",
    confidenceNote:
      "Official admission portal + national desk compilations as of 20 Nov. Formal PDF not mirrored here — confidence stays reported.",
    sources: [BDNEWS_SPLIT, STAR_CLASH, SEATS_COMP],
    updatedOn: "2026-11-23",
    applicationOpens: "2026-11-15",
    applicationCloses: "2026-11-30",
    feeBdt: 1320,
    feeNote: "A, C ৳1,320; B ৳1,100 — from compiled schedule graphic; confirm on portal.",
    closesAt: "23:59",
    examDate: "2027-02-12",
    seats: 3956,
    eligibility: [
      "Unit-wise GPA bars belong in the RU circular (science combined ~7.00 / 3.50 each reported under revision).",
      "Supplementary / HSC-resit passers: separate seven-day application window after results publish — confirm on RU notice.",
    ],
    units: [
      { code: "B", detail: "Unit B — Business Studies track.", examDate: "2027-02-12", examTime: null, centre: "RU + divisional centres" },
      { code: "C", detail: "Unit C — Science track.", examDate: "2027-02-13", examTime: null, centre: "RU + divisional centres" },
      { code: "A", detail: "Unit A — Humanities / Arts track.", examDate: "2027-02-20", examTime: null, centre: "RU + divisional centres" },
    ],
    notes: [
      "SUPERSEDED: any January unit grid on this desk is withdrawn.",
      "Eight regional centres listed on recent notices — confirm on admission.ru.ac.bd.",
    ],
  }),

  C({
    id: "c-cu",
    universityId: "cu",
    title: "University of Chittagong undergraduate admission 2026–27",
    summary:
      "REGISTRATION: applications 10 December 2026 – 10 January 2027. Fee ৳1,000. Unit tests late Jan–early Feb 2027 (C 29 Jan · A 30 Jan · B1 3 Feb · B2 4 Feb · B 5 Feb · D 6 Feb · D1 8 Feb). About 4,033 own seats.",
    system: "own",
    publication: "decision",
    confidence: "reported",
    confidenceNote:
      "App window 10 Dec–10 Jan 2027 from 21 Nov compiled schedule graphic; exam grid retained from prior schedule coverage. Portal is source of truth.",
    sources: [STAR_CLASH, SEATS_COMP],
    updatedOn: "2026-11-23",
    applicationOpens: "2026-12-10",
    opensAt: "12:00",
    applicationCloses: "2027-01-10",
    closesAt: "23:59",
    feeBdt: 1000,
    feeNote: "৳1,000 — confirm on CU admission portal before paying.",
    examDate: "2027-01-29",
    seats: 4033,
    eligibility: ["Unit GPA bars in the CU circular."],
    units: [
      { code: "C", detail: "Business Studies unit.", examDate: "2027-01-29", examTime: null, centre: "As notified" },
      { code: "A", detail: "Science unit.", examDate: "2027-01-30", examTime: null, centre: "As notified" },
      { code: "B1", detail: "Humanities sub-unit B1 (CU campus only).", examDate: "2027-02-03", examTime: null, centre: "CU campus" },
      { code: "B2", detail: "Humanities sub-unit B2 (CU campus only).", examDate: "2027-02-04", examTime: null, centre: "CU campus" },
      { code: "B", detail: "Humanities unit B.", examDate: "2027-02-05", examTime: null, centre: "As notified" },
      { code: "D", detail: "Social Science unit D.", examDate: "2027-02-06", examTime: null, centre: "As notified" },
      { code: "D1", detail: "Social Science sub-unit D1 (CU campus only).", examDate: "2027-02-08", examTime: null, centre: "CU campus" },
    ],
    notes: [
      "Calendar: app open 15 Nov · close 10 Dec · exams late Jan–early Feb.",
      "Sub-units B1/B2/D1 on CU campus only.",
      "SUPERSEDED: December 2026 unit grid withdrawn.",
    ],
  }),

  C({
    id: "c-ku",
    universityId: "ku",
    title: "Khulna University undergraduate admission 2026–27",
    summary:
      "REVISED: admission tests moved to 4–5 February 2027 (was 17–18 December 2026). Application notice still pending on this desk. About 1,109 own seats.",
    system: "own",
    publication: "notice",
    confidence: "reported",
    confidenceNote:
      "Desk 20 Nov: tests rescheduled to 4–5 Feb 2027. Application window not yet locked here.",
    sources: [STAR_CLASH, SEATS_COMP],
    updatedOn: "2026-11-20",
    examDate: "2027-02-04",
    seats: 1109,
    eligibility: ["Eligibility in the KU circular."],
    units: [
      { code: "C/D", detail: "Units C and D.", examDate: "2027-02-04", examTime: null, centre: "Khulna" },
      { code: "A/B", detail: "Units A and B.", examDate: "2027-02-05", examTime: null, centre: "Khulna" },
    ],
    notes: [
      "SUPERSEDED: 17–18 Dec 2026 test days are withdrawn.",
      "Application start/end still TBA — watch KU notice board.",
    ],
  }),

  C({
    id: "c-cou",
    universityId: "cou",
    title: "Comilla University undergraduate admission 2026–27",
    summary:
      "Applications delayed to 10–31 December 2026. Own tests early February: A unit 5 Feb 11:00 (Science & Engineering), B unit 6 Feb 15:00 (Arts/SS/Law), C unit 7 Feb 11:00 (Business). HSC 2026 supplementary candidates may apply. Not GST.",
    system: "own",
    publication: "decision",
    confidence: "reported",
    confidenceNote:
      "Prothom Alo / Times of Bangladesh / Kaler Kantho (11–12 Nov) citing VC MM Shariful Karim’s central admission committee. Formal PDF not on this desk.",
    sources: [STAR_RETAKE, SEATS_COMP],
    updatedOn: "2026-11-23",
    applicationOpens: "2026-12-10",
    applicationCloses: "2026-12-31",
    feeBdt: 1000,
    feeNote: "৳1,000.",
    examDate: "2027-02-05",
    eligibility: [
      "HSC 2026 and supplementary candidates per committee line — confirm on CoU circular.",
    ],
    units: [
      { code: "A", detail: "Science & Engineering.", examDate: "2027-02-05", examTime: "11:00", centre: "As notified" },
      { code: "B", detail: "Arts / Social Science / Law.", examDate: "2027-02-06", examTime: "15:00", centre: "As notified" },
      { code: "C", detail: "Business.", examDate: "2027-02-07", examTime: "11:00", centre: "As notified" },
    ],
    notes: [
      "November open is dead — do not show up mid-November for CoU forms.",
      "Own test, not GST cluster.",
    ],
  }),

  C({
    id: "c-gst",
    universityId: "gst",
    title: "GST cluster admission tests 2026–27",
    summary:
      "Twenty public universities (three more may join). Combined tests: B 19 Mar, C & D 20 Mar, A 27 Mar 2027. Cluster seats commonly cited around 13,500+; exact 2026–27 total lands with the circular. PSTU is coordinating.",
    system: "gst",
    publication: "decision",
    confidence: "reported",
    confidenceNote: "Unit dates from VC meeting coverage (Observer / Business Times, Sep 2026). Member list from the same reports. Seat total is a working figure until the circular.",
    sources: [GST_OBS, STAR_RETAKE, SEATS_COMP],
    updatedOn: "2026-11-08",
    examDate: "2027-03-19",
    seats: 13500,
    eligibility: ["Unit-wise GPA bars will be in the GST circular — not published in the stored reports."],
    units: [
      {
        code: "B",
        detail: "Humanities. 19 Mar 2027, 11:00–12:00. Member universities include IU, MBSTU, PSTU, NSTU, JKKNIU, JUST, PUST, BRUR, GSTU Gopalganj, Barishal, RMSTU, RUB, UFTB, Netrokona, Jamalpur STU, Chandpur STU, Kishoreganj, Sunamganj STU, Pirojpur STU, Naogaon (and possible new joiners).",
        examDate: "2027-03-19",
        examTime: "11:00–12:00",
        centre: "Cluster centres nationwide",
      },
      {
        code: "C",
        detail: "Business Studies. 20 Mar 2027, 11:00–12:00.",
        examDate: "2027-03-20",
        examTime: "11:00–12:00",
        centre: "Cluster centres nationwide",
      },
      {
        code: "D",
        detail: "Architecture. 20 Mar 2027, 15:00–16:00.",
        examDate: "2027-03-20",
        examTime: "15:00–16:00",
        centre: "Cluster centres nationwide",
      },
      {
        code: "A",
        detail: "Science. 27 Mar 2027, 11:00–12:00.",
        examDate: "2027-03-27",
        examTime: "11:00–12:00",
        centre: "Cluster centres nationwide",
      },
    ],
    notes: [
      "Not in GST: DU, RU, CU, JnU, KU, SUST and the engineering universities run their own tests.",
      "Bogura / Thakurgaon / Meherpur may join pending UGC approval.",
      "Application window NOT ANNOUNCED yet in this archive.",
    ],
  }),

  C({
    id: "c-agri",
    universityId: "agri",
    title: "Agricultural cluster combined test 2026–27",
    summary:
      "Nine universities, combined test on 2 January 2027. Application site reported open from 25 November; expected close around 15 December 2026. Prior session ~3,701 seats — treat 2026–27 total as pending the ACAS circular.",
    system: "agricultural",
    publication: "decision",
    confidence: "reported",
    confidenceNote: "Desk 20 Nov: site opens 25 Nov; test 2 Jan 2027. Seat split is prior-session working reference.",
    sources: [STAR_RETAKE, SEATS_COMP],
    updatedOn: "2026-11-23",
    applicationOpens: "2026-11-25",
    applicationCloses: "2026-12-15",
    feeBdt: 1600,
    feeNote: "৳1,600 (cluster).",
    examDate: "2027-01-02",
    seats: 3701,
    eligibility: ["Science group. Exact GPA bars in the ACAS circular."],
    units: [
      {
        code: "ACAS",
        detail:
          "Single combined MCQ. Member map (prior session seats): BAU Mymensingh ~1,006; SAU Dhaka ~705; Gazipur AU ~510; PSTU agri-side ~452; Sylhet AU ~431; CVASU ~275; Khulna AU ~150; Habiganj AU ~90; Kurigram AU ~82.",
        examDate: "2027-01-02",
        examTime: null,
        centre: "Cluster centres / as on admit card",
      },
    ],
    notes: [
      "Subjects: agriculture, veterinary, fisheries and allied undergraduate programmes across the nine campuses.",
      "Portal historically: acas.edu.bd — confirm for 2026–27.",
    ],
  }),

  C({
    id: "c-dghs",
    universityId: "dghs",
    title: "MBBS and BDS admission test 2026–27",
    summary:
      "DGME line remains 18 December 2026 for the combined medical/dental test. Formal circular still not published as of 11 Nov desk pass. Online applications still expected mid-November (15–18 Nov reported) — not locked. Two new government medical colleges (Thakurgaon, Narsingdi — 50 seats each) reported for the pool. Retake eligibility still with the ministry.",
    system: "medical",
    publication: "decision",
    confidence: "reported",
    confidenceNote: "18 Dec repeated by DGME DG (Daily Campus 10 Nov; Star/Observer/bdnews24 7–8 Nov). Formal circular STILL MISSING. Application opens are expected, not official.",
    sources: [OBS_MED, BDNEWS_MED, SUN_MED, STAR_RETAKE, DAILYBD_MED],
    updatedOn: "2026-11-11",
    applicationOpens: "2026-11-15",
    applicationCloses: null,
    examDate: "2026-12-18",
    eligibility: ["HSC Science; exact GPA bars and seat totals in the DGME circular when published."],
    units: [
      {
        code: "MBBS / BDS",
        detail: "Medical & dental (central). Eligible: science HSC with biology; female/male sessions as DGME notifies. New govt colleges: Thakurgaon + Narsingdi (50 seats each) reported.",
        examDate: "2026-12-18",
        examTime: "10:00",
        centre: "Nationwide centres",
      },
    ],
    notes: [
      "Originally targeted 4 Dec; slipped past HSC result delay and BCS written on 11 Dec.",
      "HSC retake starts 1 Dec; results hoped end-December — retakers are largely locked out of this cycle unless ministry intervenes.",
      "Formal circular still pending as of 9 Nov desk pass.",
      "18 Dec medical line also appears on Engineering MT coaching routines; formal DGME circular still thin on this desk.",
    ],
  }),
C({
    id: "c-sust",
    universityId: "sust",
    title: "SUST undergraduate admission 2026–27",
    summary:
      "REGISTRATION (working desk line): applications 1 December 2026 10:00 through 25 December 2026 23:59 on admission.sust.edu.bd. Tests 17–18 January 2027 (moved from 26–27 Jan). Formal circular may still firm fees and unit split.",
    system: "own",
    publication: "decision",
    confidence: "reported",
    confidenceNote:
      "Test days from official SUST press (1 Nov). Application window from secondary admission timelines (1–25 Dec) — not yet a mirrored official PDF; confidence stays reported.",
    sources: [STAR_CLASH, SEATS_COMP],
    updatedOn: "2026-11-23",
    applicationOpens: "2026-12-01",
    opensAt: "10:00",
    applicationCloses: "2026-12-25",
    closesAt: "23:59",
    examDate: "2027-01-17",
    seats: 1636,
    feeBdt: 1250,
    feeNote: "Prior-cycle reference: A1 ৳1,250 · A2 ৳1,400 · B ৳1,200 — confirm 2026–27 on portal.",
    eligibility: ["Eligibility in the SUST circular when published."],
    units: [
      { code: "A", detail: "Science / engineering track (day 1).", examDate: "2027-01-17", examTime: null, centre: "SUST + DU and other centres" },
      { code: "B", detail: "Mixed streams track (day 2).", examDate: "2027-01-18", examTime: null, centre: "SUST + other centres" },
    ],
    notes: [
      "Calendar: app open 1 Dec · close 25 Dec · exams 17–18 Jan.",
      "Portal: admission.sust.edu.bd",
      "SUPERSEDED: 26–27 Jan test days.",
    ],
  }),
  C({
    id: "c-bup",
    universityId: "bup",
    title: "BUP undergraduate admission 2026–27",
    summary:
      "Applications 1 December 2026 – 5 January 2027. Fee ৳1,200. Bangladesh University of Professionals — confirm faculty/unit grid and test days on bup.edu.bd.",
    system: "specialized",
    publication: "decision",
    confidence: "reported",
    confidenceNote:
      "App window + fee from 21 Nov compiled schedule graphic (Admission Updates – Reading Zone). Full circular/PDF not yet archived on this desk.",
    sources: [STAR_CLASH],
    updatedOn: "2026-11-23",
    applicationOpens: "2026-12-01",
    applicationCloses: "2027-01-05",
    feeBdt: 1200,
    feeNote: "৳1,200 — confirm on BUP admission portal.",
    eligibility: ["Eligibility belongs in the BUP circular — not fully archived here."],
    units: [],
    notes: [
      "Calendar: app open 1 Dec · close 5 Jan 2027.",
      "Source is a compiled public schedule graphic — verify on official BUP channels before applying.",
    ],
  }),

];


export const EVIDENCE_COPY = [
  "OFFICIAL NOTICE CITED — a news report quotes a university notice, press release, or signed decision. The PDF is linked only when this archive actually has a URL.",
  "REPORTED — a newsroom or compilation stated the figure. This desk has not stored the underlying PDF.",
  "REPORTED · NOT FINAL — the source itself calls the date proposed, probable, provisional or tentative.",
  "NOT ANNOUNCED — this archive does not have the fact. Empty is honest.",
  C({
    id: "c-ju",
    universityId: "ju",
    title: "Jahangirnagar University undergraduate admission 2026–27",
    summary:
      "REGISTRATION: applications 22 November 2026 10:00 through 15 December 2026 23:59. Fees A–D ৳800; E ৳700; C1/IBA ৳600 (+1.2% service fee). Tests tentatively 10–21 January 2027 on JU campus.",
    system: "own",
    publication: "decision",
    confidence: "reported",
    confidenceNote:
      "Apps 22 Nov–15 Dec locked; fees from 21 Nov compiled schedule graphic; tests tentative 10–21 Jan.",
    sources: [STAR_CLASH, SEATS_COMP],
    updatedOn: "2026-11-23",
    applicationOpens: "2026-11-22",
    opensAt: "10:00",
    applicationCloses: "2026-12-15",
    closesAt: "23:59",
    examDate: "2027-01-10",
    feeBdt: 800,
    feeNote: "A,B,C,D ৳800; E ৳700; C1/IBA ৳600 (+1.2% service fee).",
    seats: null,
    eligibility: ["Criteria belong in the JU circular — not fully archived on this desk."],
    units: [
      { code: "A", detail: "Mathematical & Physical sciences cluster.", examDate: "2027-01-10", examTime: null, centre: "JU campus" },
      { code: "D", detail: "Biological sciences cluster.", examDate: "2027-01-14", examTime: null, centre: "JU campus" },
      { code: "B/C", detail: "Social sciences & Arts cluster window.", examDate: "2027-01-18", examTime: null, centre: "JU campus" },
      { code: "IBA", detail: "IBA unit (within the 10–21 Jan window).", examDate: "2027-01-20", examTime: null, centre: "JU campus" },
    ],
    notes: [
      "Calendar: app open 22 Nov · close 15 Dec · exams mid-January.",
      "Tests typically not on Fri/Sat.",
    ],
  }),
  C({
    id: "c-butex",
    universityId: "butex",
    title: "BUTEX undergraduate admission test 2026–27",
    summary:
      "Applications 1 December 2026 – 10 January 2027. Preliminary fee ৳300; final ৳1,200. BSc Textile Engineering test previously reported 29 January 2027 (~630 seats). Confirm portal and test day on butex.edu.bd.",
    system: "engineering",
    publication: "decision",
    confidence: "reported",
    confidenceNote:
      "App window + fees from 21 Nov compiled schedule graphic. Test day from earlier registrar line — re-check when formal circular lands.",
    sources: [SEATS_COMP],
    updatedOn: "2026-11-23",
    applicationOpens: "2026-12-01",
    opensAt: null,
    applicationCloses: "2027-01-10",
    closesAt: null,
    examDate: "2027-01-29",
    feeBdt: 1200,
    feeNote: "Primary ৳300; final ৳1,200 — confirm stages on portal.",
    seats: 630,
    eligibility: [
      "Science group; exact GPA bars in the BUTEX circular.",
    ],
    units: [
      {
        code: "Textile Engineering",
        detail: "BSc in Textile Engineering — 11 departments (Wet Process, Yarn, Fabric, Apparel, TEM, Fashion, IPE, Machinery, Dyes, Environment, Materials).",
        examDate: "2027-01-29",
        examTime: null,
        centre: "As notified by BUTEX",
      },
    ],
    notes: [
      "Calendar: app open 1 Dec · close 10 Jan 2027.",
      "Fee is two-stage on the compiled schedule (primary + final).",
    ],
  }),

];
