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
    updatedOn: "2026-11-11",
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
      "BUET official notice (10 Nov) keeps the test on 16 Jan 2027 — rejects UGC’s after-1-Feb floor. Applications open 21 Nov; application close and full fee still to be announced in a subsequent notice. Hard GPA wall unchanged (SSC ≥4.00 science; HSC GPA 5.00 with A+ in Physics, Chemistry, Higher Math). ~10,000 examinees cap, ~1,309 seats.",
    system: "engineering",
    publication: "notice",
    confidence: "notice",
    confidenceNote:
      "BUET website notice 10 Nov confirmed by Prothom Alo / Jago News (10–11 Nov): exam date holds. Apps from 21 Nov. Close date NOT ANNOUNCED in that notice. GPA criteria unchanged from prior circular pattern.",
    sources: [TBS_BUET, PROTHOM_BUET, BDNEWS_BUET, SEATS_COMP, STAR_RETAKE],
    updatedOn: "2026-11-11",
    applicationOpens: "2026-11-21",
    examDate: "2027-01-16",
    seats: 1309,
    feeBdt: null,
    feeNote: "Last cycle: Engineering/URP ৳1,300; Architecture ৳1,500. 2026–27 fee not confirmed in this archive.",
    eligibility: [
      "Science group only.",
      "SSC GPA ≥ 4.00; HSC GPA 5.00 with A+ (GPA 5.00) separately in Physics, Chemistry and Higher Mathematics — criteria retained from last year per committee.",
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
      "Official circular published: online applications 10 Nov 10:00 → 10 Dec 17:00. MCQ test 8 Jan 2027 (09:30–12:30) at KUET, DU and RUET centres. About 1,105 seats across 17 departments. Fee: Khulna centre ৳1,500; Dhaka/Rajshahi centres ৳1,800. Direct PDF available from the admission portal.",
    system: "engineering",
    publication: "notice",
    confidence: "notice",
    confidenceNote:
      "Official PDF on admission.kuet.ac.bd (1.UG-Admission-2026-Circular.pdf). Archived copy at /circulars/c-kuet.pdf (sha256 6d86886d9fb2813ad20d796e26913146cf7a26a2a53fc6f27dd5da3c9291ac3f, 494729 bytes, ~2 pages, fetched 2026-11-11, officialHost). Apps live; test 8 Jan 2027. Eligible-list due 20 Dec; result pattern 21 Jan. doc field pending A01 types.ts.",
    sources: [KUET_OFFICIAL, KUET_PORTAL, STAR_CLASH, SEATS_COMP, STAR_RETAKE],
    updatedOn: "2026-11-11",
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
      "Five-unit MCQ schedule in Dhaka still starts 1 January 2027. Application window reported as 25 Nov – 10 Dec (shifted later than the earlier 15 Nov open). bdnews24 (11 Nov): candidates sitting supplementary exams in up to two subjects may register using SSC qualifications. About 2,957 own seats. Not a full slide to UGC’s February floor — a targeted resit accommodation.",
    system: "own",
    publication: "notice",
    confidence: "reported",
    confidenceNote:
      "Test grid from earlier institutional release (Star). App window + resit door from bdnews24 11 Nov campus line. Formal JnU circular PDF for the resit rule not yet on this desk — confidence reported for the accommodation; test dates still the prior notice pattern until superseded.",
    sources: [BDNEWS_SPLIT, STAR_CLASH, SEATS_COMP],
    updatedOn: "2026-11-12",
    applicationOpens: "2026-11-25",
    opensAt: "12:00",
    applicationCloses: "2026-12-10",
    closesAt: "23:59",
    examDate: "2027-01-01",
    examTime: "10:00–11:00",
    seats: 2957,
    eligibility: [
      "GPA bars were not fully in the stored press release — check JnU circular.",
      "Supplementary candidates (up to two subjects): may apply on SSC qualifications per 11 Nov campus line (bdnews24) — confirm on JnU notice before relying on it.",
    ],
    units: [
      { code: "A", detail: "Science and Life & Earth Sciences.", examDate: "2027-01-01", examTime: "10:00–11:00", centre: "Dhaka" },
      { code: "E", detail: "Unit E (as defined by JnU).", examDate: "2027-01-08", examTime: "10:00–11:00", centre: "Dhaka" },
      { code: "B", detail: "Unit B.", examDate: "2027-01-15", examTime: "10:00–11:00", centre: "Dhaka" },
      { code: "C", detail: "Unit C.", examDate: "2027-01-22", examTime: "10:00–11:00", centre: "Dhaka" },
      { code: "D", detail: "Unit D.", examDate: "2027-01-23", examTime: "10:00–11:00", centre: "Dhaka" },
    ],
    notes: [
      "All tests MCQ, Dhaka centres.",
      "Resit accommodation is reported (news), not yet archived as a formal PDF on this desk.",
    ],
  }),

  C({
    id: "c-ru",
    universityId: "ru",
    title: "University of Rajshahi undergraduate admission 2026–27",
    summary:
      "RU is bending toward the UGC timeline. VC line (bdnews24, 11 Nov): admission tests begin 12 February 2027 with the Business faculty unit; initial applications mid-November (reported 15–30 Nov); a separate seven-day application window for supplementary/HSC-resit passers after those results publish. Prior January unit dates on this desk are SUPERSEDED by that VC line until a formal RU circular PDF lands. About 3,956 own seats.",
    system: "own",
    publication: "decision",
    confidence: "reported",
    confidenceNote:
      "bdnews24 11 Nov cites RU VC Prof Md Faridul Islam: tests from 12 Feb; initial apps ~15–30 Nov; seven-day late window for supplementary candidates. Not yet a scanned RU circular PDF — confidence stays reported. Old Jan 8/9/16 unit grid is withdrawn from this record.",
    sources: [BDNEWS_SPLIT, STAR_CLASH, SEATS_COMP],
    updatedOn: "2026-11-12",
    applicationOpens: "2026-11-15",
    applicationCloses: "2026-11-30",
    examDate: "2027-02-12",
    seats: 3956,
    eligibility: [
      "Unit-wise GPA bars belong in the RU circular.",
      "Supplementary / HSC-resit passers: separate seven-day application window after results publish (VC line via bdnews24) — confirm on RU notice before relying on it.",
    ],
    units: [
      {
        code: "Business",
        detail: "Business faculty unit — first in the revised sequence (VC line).",
        examDate: "2027-02-12",
        examTime: null,
        centre: "Not stated in stored reports.",
      },
      {
        code: "Other units",
        detail: "Remaining unit order and exact dates to be fixed in formal RU circular. Do not reuse the withdrawn January grid.",
        examDate: null,
        examTime: null,
        centre: "Not stated.",
      },
    ],
    notes: [
      "SUPERSEDED: prior desk line of B 8 Jan / C 9 Jan / A 16 Jan 2027 is withdrawn after the 11 Nov VC line.",
      "Formal circular PDF still not on this archive — treat close dates and late window as reported until RU publishes.",
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
        detail: "Central MCQ for government and private medical & dental colleges. New government colleges: Thakurgaon and Narsingdi (50 seats each) reported for this session.",
        examDate: "2026-12-18",
        examTime: null,
        centre: "Nationwide centres",
      },
    ],
    notes: [
      "Originally targeted 4 Dec; slipped past HSC result delay and BCS written on 11 Dec.",
      "HSC retake starts 1 Dec; results hoped end-December — retakers are largely locked out of this cycle unless ministry intervenes.",
      "Formal circular still pending as of 9 Nov desk pass.",
    ],
  }),
];

export const EVIDENCE_COPY = [
  "OFFICIAL NOTICE CITED — a news report quotes a university notice, press release, or signed decision. The PDF is linked only when this archive actually has a URL.",
  "REPORTED — a newsroom or compilation stated the figure. This desk has not stored the underlying PDF.",
  "REPORTED · NOT FINAL — the source itself calls the date proposed, probable, provisional or tentative.",
  "NOT ANNOUNCED — this archive does not have the fact. Empty is honest.",
];
