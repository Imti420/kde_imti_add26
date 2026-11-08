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


const DAILY_SUN_MED: SourceRef = {
  label: "Daily Sun — medical & dental tests scheduled for 18 December",
  url: "http://www.daily-sun.com/health/907914/medical-dental-admission-tests-scheduled-for-18-december",
  published: "2026-11-08",
};

const DAILYBD_MED: SourceRef = {
  label: "Daily Bangladesh — medical test shifted toward 18 Dec",
  url: "https://www.daily-bangladesh.com/education/540904",
  published: "2026-11-08",
};

const SEATS_COMP: SourceRef = {
  label: "Admission desk compilation — public university seat numbers 2026–27",
  url: "https://admissionnotice.com/en/public-university-seat-number-2026-27/",
  published: "2026-11-02",
};

const GST_OBS: SourceRef = {
  label: "The Daily Observer — GST cluster test dates",
  url: "https://observerbd.com/news/594050",
  published: "2026-09-18",
};

const DU_PORTAL: SourceRef = {
  label: "Dhaka University admission portal",
  url: "https://admission.eis.du.ac.bd/",
  published: "2026-11-08",
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
      "Five-unit undergraduate intake. Applications 11–25 Nov 2026. Tests 5–26 Dec. About 6,125 own seats reported for the session. Unit-level seat splits below use the last published unit breakdown where the 2026–27 PDF is not yet on file.",
    system: "own",
    publication: "notice",
    confidence: "notice",
    confidenceNote:
      "Dates and GPA bars from DU press / portal and major newsrooms. Total own seats from 2026–27 public compilations. Unit seat splits marked as prior-session pattern until the PDF is stored.",
    sources: [STAR_DU, TBS_DU, DU_PORTAL, SEATS_COMP, STAR_CLASH],
    updatedOn: "2026-11-08",
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
    ],
  }),

  C({
    id: "c-buet",
    universityId: "buet",
    title: "BUET undergraduate admission test 2026–27",
    summary:
      "Written test 16 Jan 2027. Applications expected from 21 Nov. 1,309 seats across Group A (Engineering & URP) and Group B (Architecture). No preliminary MCQ. About 10,000 candidates will be allowed to sit.",
    system: "engineering",
    publication: "decision",
    confidence: "reported",
    confidenceNote:
      "Date, application open and eligibility retained from committee briefings (TBS / Prothom Alo / bdnews24, 7 Nov). Seat total 1,309 from session compilations and education desks citing UGC-facing figures. Full PDF circular not stored here.",
    sources: [TBS_BUET, PROTHOM_BUET, BDNEWS_BUET, SEATS_COMP, STAR_RETAKE],
    updatedOn: "2026-11-08",
    applicationOpens: "2026-11-21",
    examDate: "2027-01-16",
    seats: 1309,
    feeBdt: null,
    feeNote:
      "Recent cycle pattern: Group A (Engineering/URP) ৳1,300; Group B (Architecture) ৳1,500. 2026–27 fee still awaits the formal circular.",
    eligibility: [
      "Science group only.",
      "SSC GPA ≥ 4.00; HSC GPA 5.00 with A+ (GPA 5.00) separately in Physics, Chemistry and Higher Mathematics — criteria retained from last year per committee briefings.",
      "Roughly 10,000 examinees will be shortlisted if applications exceed capacity.",
    ],
    units: [
      {
        code: "Group A",
        detail:
          "Engineering & URP — Civil; Water Resources; Mechanical; Naval Architecture & Marine; Industrial & Production; Electrical & Electronic; Computer Science & Engineering; Biomedical; Chemical; Materials & Metallurgical; Urban & Regional Planning (and related engineering departments on the current BUET map).",
        examDate: "2027-01-16",
        examTime: null,
        centre: "BUET campus / as notified",
      },
      {
        code: "Group B",
        detail: "Architecture (5-year programme). Drawing module applies.",
        examDate: "2027-01-16",
        examTime: null,
        centre: "BUET campus / as notified",
      },
    ],
    notes: [
      "No preliminary MCQ screening (same pattern as 2025–26).",
      "Not delaying for HSC retake results.",
      "Application close date still to be fixed in the formal circular.",
    ],
  }),

  C({
    id: "c-kuet",
    universityId: "kuet",
    title: "KUET undergraduate admission test 2026–27",
    summary:
      "MCQ test on 8 Jan 2027 in Khulna, Dhaka and Rajshahi. About 1,105 seats. Application window reported mid-Nov to mid-Dec in secondary desks; treat as pending the official circular.",
    system: "engineering",
    publication: "decision",
    confidence: "notice",
    confidenceNote: "Test date from Academic Council decision (Star, Aug 2026). Seats from 2026–27 public compilations.",
    sources: [STAR_CLASH, SEATS_COMP, STAR_RETAKE],
    updatedOn: "2026-11-08",
    applicationOpens: "2026-11-10",
    applicationCloses: "2026-12-10",
    examDate: "2027-01-08",
    seats: 1105,
    eligibility: [
      "HSC/equivalent 2026 Science.",
      "Secondary desks cite SSC GPA ≥ 4.00 and strong PCM + English scores at HSC — confirm in KUET circular before applying.",
    ],
    units: [
      {
        code: "Engineering",
        detail: "Single undergraduate engineering admission test covering KUET departments (CE, EEE, ME, CSE, ECE, LE, URP, Architecture, and others on the current map).",
        examDate: "2027-01-08",
        examTime: "09:30–12:30",
        centre: "Khulna, Dhaka, Rajshahi",
      },
    ],
    notes: ["Application procedure and final eligibility live only in the KUET circular."],
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
    summary: "Tests 18–19 Dec 2026 across seven divisional cities. Unit C on 18 Dec; Units A & B on 19 Dec.",
    system: "specialized",
    publication: "notice",
    confidence: "notice",
    confidenceNote: "Schedule from institutional notice cited by Star / Tribune.",
    sources: [STAR_CLASH],
    updatedOn: "2026-11-08",
    examDate: "2026-12-18",
    eligibility: ["Eligibility and seat counts belong in the MIST circular."],
    units: [
      { code: "C", detail: "Unit C (as defined in MIST circular).", examDate: "2026-12-18", examTime: null, centre: "Seven divisional cities" },
      { code: "A", detail: "Unit A.", examDate: "2026-12-19", examTime: null, centre: "Seven divisional cities" },
      { code: "B", detail: "Unit B.", examDate: "2026-12-19", examTime: null, centre: "Seven divisional cities" },
    ],
    notes: ["Centres: Dhaka, Rajshahi, Rangpur, Khulna, Chattogram, Sylhet, Mymensingh."],
  }),

  C({
    id: "c-jnu",
    universityId: "jnu",
    title: "Jagannath University undergraduate admission 2026–27",
    summary:
      "Five-unit MCQ schedule in Dhaka. Applications 15 Nov – 10 Dec 2026. Tests from 1 Jan 2027. Seat compilations put own seats near 2,900; some secondary guides cite ≈2,500 — treat the lower figure as provisional until the unit circular lands. Flat application fee ৳400.",
    system: "own",
    publication: "notice",
    confidence: "notice",
    confidenceNote:
      "Schedule from official release cited by Star. Seat total from 2026–27 compilations (some guides list lower). Fee from VarsityAdmission-style summaries pending official circular confirmation.",
    sources: [STAR_CLASH, SEATS_COMP],
    updatedOn: "2026-11-08",
    applicationOpens: "2026-11-15",
    opensAt: "12:00",
    applicationCloses: "2026-12-10",
    closesAt: "23:59",
    examDate: "2027-01-01",
    examTime: "10:00–11:00",
    seats: 2957,
    feeBdt: 400,
    feeNote: "Flat ৳400 reported across secondary admission guides. Confirm on the JnU portal when the circular is live.",
    eligibility: ["GPA bars were not fully in the stored press release — check JnU circular before applying."],
    units: [
      {
        code: "A",
        detail: "Science unit (Science + Life & Earth Sciences faculties).",
        examDate: "2027-01-01",
        examTime: "10:00–11:00",
        centre: "Dhaka",
      },
      {
        code: "E",
        detail: "Fine Arts unit.",
        examDate: "2027-01-08",
        examTime: "10:00–11:00",
        centre: "Dhaka",
      },
      {
        code: "B",
        detail: "Arts / Law unit.",
        examDate: "2027-01-15",
        examTime: "10:00–11:00",
        centre: "Dhaka",
      },
      {
        code: "C",
        detail: "Business Studies unit.",
        examDate: "2027-01-22",
        examTime: "10:00–11:00",
        centre: "Dhaka",
      },
      {
        code: "D",
        detail: "Social Science unit.",
        examDate: "2027-01-23",
        examTime: "10:00–11:00",
        centre: "Dhaka",
      },
    ],
    notes: ["All tests MCQ, Dhaka centres only.", "Unit-wise seat quotas still pending the full circular."],
  }),

  C({
    id: "c-ru",
    universityId: "ru",
    title: "University of Rajshahi undergraduate admission 2026–27",
    summary:
      "Applications 12–27 Nov 2026. Unit tests: B 8 Jan, C 9 Jan, A 16 Jan 2027. About 3,956 own seats. Tests at Rajshahi plus outside centres in Dhaka, Chattogram, Khulna, Sylhet, Mymensingh and Rangpur.",
    system: "own",
    publication: "decision",
    confidence: "preliminary",
    confidenceNote:
      "Dates from RU admissions sub-committee / PR (still labelled preliminary in some coverage). Centres expanded from committee reports. Seats from 2026–27 compilations. Full eligibility and unit seat splits still await the circular.",
    sources: [STAR_CLASH, SEATS_COMP],
    updatedOn: "2026-11-08",
    applicationOpens: "2026-11-12",
    applicationCloses: "2026-11-27",
    examDate: "2027-01-08",
    seats: 3956,
    eligibility: ["Unit-wise GPA bars belong in the RU circular — not yet fully published in the sources used here."],
    units: [
      {
        code: "B",
        detail: "Business Studies unit.",
        examDate: "2027-01-08",
        examTime: null,
        centre: "Rajshahi + Dhaka / Chattogram / Khulna / Sylhet / Mymensingh / Rangpur",
      },
      {
        code: "C",
        detail: "Science unit.",
        examDate: "2027-01-09",
        examTime: null,
        centre: "Rajshahi + Dhaka / Chattogram / Khulna / Sylhet / Mymensingh / Rangpur",
      },
      {
        code: "A",
        detail: "Arts / Humanities unit.",
        examDate: "2027-01-16",
        examTime: null,
        centre: "Rajshahi + Dhaka / Chattogram / Khulna / Sylhet / Mymensingh / Rangpur",
      },
    ],
    notes: [
      "Treat the schedule as preliminary until the formal circular hardens.",
      "Outside-centre list from committee coverage — final admit-card centres may differ.",
    ],
  }),

  C({
    id: "c-cu",
    universityId: "cu",
    title: "University of Chittagong undergraduate admission 2026–27",
    summary: "Probable tests 29 Jan – 8 Feb 2027. Applications 15 Nov – 10 Dec. About 4,033 own seats.",
    system: "own",
    publication: "decision",
    confidence: "preliminary",
    confidenceNote: "Dates described as probable. Seats from 2026–27 compilations.",
    sources: [STAR_CLASH, SEATS_COMP],
    updatedOn: "2026-11-08",
    applicationOpens: "2026-11-15",
    applicationCloses: "2026-12-10",
    examDate: "2027-01-29",
    seats: 4033,
    eligibility: ["Unit GPA bars in the CU circular."],
    units: [
      { code: "C", detail: "Unit C.", examDate: "2027-01-29", examTime: null, centre: "CU / DU / RU campuses for some papers" },
      { code: "A", detail: "Unit A.", examDate: "2027-01-30", examTime: null, centre: "As notified" },
      { code: "B1", detail: "Sub-unit B1.", examDate: "2027-02-03", examTime: null, centre: "CU campus" },
      { code: "B2", detail: "Sub-unit B2.", examDate: "2027-02-04", examTime: null, centre: "CU campus" },
      { code: "B", detail: "Unit B.", examDate: "2027-02-05", examTime: null, centre: "As notified" },
      { code: "D", detail: "Unit D.", examDate: "2027-02-06", examTime: null, centre: "As notified" },
      { code: "D1", detail: "Sub-unit D1.", examDate: "2027-02-08", examTime: null, centre: "CU campus" },
    ],
    notes: ["Probable schedule — confirm on CU notice."],
  }),

  C({
    id: "c-ku",
    universityId: "ku",
    title: "Khulna University undergraduate admission 2026–27",
    summary: "Tests 17–18 Dec 2026. About 1,109 own seats.",
    system: "own",
    publication: "notice",
    confidence: "notice",
    confidenceNote: "Schedule from university notice cited in national press. Seats from 2026–27 compilations.",
    sources: [STAR_CLASH, SEATS_COMP],
    updatedOn: "2026-11-08",
    examDate: "2026-12-17",
    seats: 1109,
    eligibility: ["Eligibility in the KU circular."],
    units: [
      { code: "C", detail: "Unit C.", examDate: "2026-12-17", examTime: null, centre: "Khulna" },
      { code: "D", detail: "Unit D.", examDate: "2026-12-17", examTime: null, centre: "Khulna" },
      { code: "A", detail: "Unit A.", examDate: "2026-12-18", examTime: null, centre: "Khulna" },
      { code: "B", detail: "Unit B.", examDate: "2026-12-18", examTime: null, centre: "Khulna" },
    ],
    notes: [],
  }),

  C({
    id: "c-cou",
    universityId: "cou",
    title: "Comilla University undergraduate admission 2026–27",
    summary: "Only an application deadline fragment is on file. Seat count not confirmed for this archive.",
    system: "own",
    publication: "decision",
    confidence: "preliminary",
    confidenceNote: "Star timeline fragment only.",
    sources: [STAR_RETAKE],
    updatedOn: "2026-11-08",
    eligibility: ["Not in the stored reports."],
    notes: ["Do not treat this as an open circular."],
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
      "Nine universities, combined test on 2 Jan 2027 (working date in national timelines). Prior session offered about 3,701 seats; treat 2026–27 seat total as pending the ACAS circular. Coordinator reported as Sher-e-Bangla Agricultural University for this cycle’s planning notes.",
    system: "agricultural",
    publication: "decision",
    confidence: "reported",
    confidenceNote: "Test date from Star retake/timeline coverage. Seat split below is the last published cluster map (2025–26 pattern) used as a working reference only.",
    sources: [STAR_RETAKE, SEATS_COMP],
    updatedOn: "2026-11-08",
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
      "Test date settled on 18 Dec 2026 in DGME messaging. Circular still pending. Applications expected mid-November. Two new government medical colleges (Thakurgaon, Narsingdi — 50 seats each) join the pool.",
    system: "medical",
    publication: "decision",
    confidence: "preliminary",
    confidenceNote: "18 Dec line from DGME / DGHS messaging in Daily Sun, Daily Star and others (7–8 Nov). Not a signed circular; application window still not published.",
    sources: [STAR_RETAKE, DAILYBD_MED, DAILY_SUN_MED],
    updatedOn: "2026-11-08",
    examDate: "2026-12-18",
    eligibility: ["HSC Science; exact bars and seat totals in the DGHS circular."],
    units: [
      {
        code: "MBBS / BDS",
        detail: "Central MCQ for government and private medical & dental colleges. New government colleges: Thakurgaon and Narsingdi (50 seats each) reported for this session.",
        examDate: "2026-12-18",
        examTime: null,
        centre: "Nationwide centres",
      },
    ],
    notes: [
      "HSC retake cohort is largely locked out if applications open mid-November and results arrive end-December.",
      "Application window NOT ANNOUNCED in this archive.",
    ],
  }),
];

export const EVIDENCE_COPY = [
  "OFFICIAL NOTICE CITED — a news report quotes a university notice, press release, or signed decision. The PDF is linked only when this archive actually has a URL.",
  "REPORTED — a newsroom or compilation stated the figure. This desk has not stored the underlying PDF.",
  "REPORTED · NOT FINAL — the source itself calls the date proposed, probable, provisional or tentative.",
  "NOT ANNOUNCED — this archive does not have the fact. Empty is honest.",
];
