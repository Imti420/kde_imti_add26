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

const UNIT_UNKNOWN = "Subject group not named in the stored reports.";

export const seedCirculars: Circular[] = [
  C({
    id: "c-du",
    universityId: "du",
    title: "University of Dhaka undergraduate admission 2026–27",
    summary:
      "The General Admission Committee, chaired by Vice-Chancellor Prof ABM Obaidul Islam, set the application window and five unit tests. Reported from a university press release. The PDF circular is not stored in this archive.",
    system: "own",
    publication: "notice",
    confidence: "notice",
    confidenceNote:
      "Dates come from a Daily Star report of the 2 Aug 2026 committee decision and a university press release. Restated as the existing timeline on 4 Nov 2026. No official PDF is linked here.",
    sources: [STAR_DU, STAR_CLASH, STAR_RETAKE, TBS_DU],
    updatedOn: "2026-11-08",
    applicationOpens: "2026-11-11",
    opensAt: "12:00",
    applicationCloses: "2026-11-25",
    closesAt: "23:59",
    examDate: "2026-12-05",
    classesBegin: "2027-03-28",
    eligibility: [
      "HSC or equivalent must be 2026. Applicants from earlier HSC batches are not eligible (The Daily Star, 4 Nov 2026).",
      "Unit-wise minimum GPA figures were not printed in the Daily Star reports stored here.",
      "Arts, Law and Social Science, Science, and Business Studies papers: 60 marks MCQ and 40 marks written (The Daily Star, 2 Aug 2026).",
      "Fine Arts: 40-mark MCQ and 60-mark drawing. IBA: 70-mark MCQ and 30-mark descriptive (The Daily Star, 2 Aug 2026).",
      "English-medium candidates in the Science unit get a separate question paper (The Daily Star, 2 Aug 2026).",
    ],
    units: [
      {
        code: "IBA",
        detail: "Institute of Business Administration. 70 MCQ + 30 descriptive.",
        examDate: "2026-12-05",
        examTime: null,
        centre: "Outside centres were not stated for IBA.",
      },
      {
        code: "Science",
        detail: "Science unit. Separate paper for English-medium candidates. 60 MCQ + 40 written.",
        examDate: "2026-12-12",
        examTime: null,
        centre: "Dhaka, RU, CU, KU, University of Barishal, SUST, BAU Mymensingh, BRUR.",
      },
      {
        code: "A/Law/Social",
        detail: "Arts, Law and Social Science. 60 MCQ + 40 written.",
        examDate: "2026-12-19",
        examTime: null,
        centre: "Dhaka, RU, CU, KU, University of Barishal, SUST, BAU Mymensingh, BRUR.",
      },
      {
        code: "Fine Arts",
        detail: "40-mark MCQ and 60-mark drawing.",
        examDate: "2026-12-22",
        examTime: null,
        centre: "Outside centres were not stated for Fine Arts.",
      },
      {
        code: "Business",
        detail: "Business Studies. 60 MCQ + 40 written.",
        examDate: "2026-12-26",
        examTime: null,
        centre: "Dhaka, RU, CU, KU, University of Barishal, SUST, BAU Mymensingh, BRUR.",
      },
    ],
    notes: [
      "First-year classes are scheduled to begin 28 Mar 2027.",
      "Application fee, seat count and admit-card date were not in the stored reports.",
      "A later retake policy may still move these dates. See the watch item on the overview.",
    ],
  }),
  C({
    id: "c-jnu",
    universityId: "jnu",
    title: "Jagannath University undergraduate admission 2026–27",
    summary:
      "An official university release set a five-unit MCQ schedule, all of it in Dhaka. The PDF is not stored in this archive.",
    system: "own",
    publication: "notice",
    confidence: "notice",
    confidenceNote: "The Daily Star (30 Aug 2026) cites an official university release. Restated 4 Nov 2026.",
    sources: [STAR_CLASH, STAR_RETAKE],
    updatedOn: "2026-11-04",
    applicationOpens: "2026-11-15",
    opensAt: "12:00",
    applicationCloses: "2026-12-10",
    closesAt: "23:59",
    examDate: "2027-01-01",
    examTime: "10:00–11:00",
    eligibility: ["Eligibility and GPA bars were not in the stored reports."],
    units: [
      {
        code: "A",
        detail: "Science and Life and Earth Sciences. MCQ.",
        examDate: "2027-01-01",
        examTime: "10:00–11:00",
        centre: "Dhaka",
      },
      {
        code: "E",
        detail: UNIT_UNKNOWN + " MCQ.",
        examDate: "2027-01-08",
        examTime: "10:00–11:00",
        centre: "Dhaka",
      },
      {
        code: "B",
        detail: UNIT_UNKNOWN + " MCQ.",
        examDate: "2027-01-15",
        examTime: "10:00–11:00",
        centre: "Dhaka",
      },
      {
        code: "C",
        detail: UNIT_UNKNOWN + " MCQ.",
        examDate: "2027-01-22",
        examTime: "10:00–11:00",
        centre: "Dhaka",
      },
      {
        code: "D",
        detail: UNIT_UNKNOWN + " MCQ.",
        examDate: "2027-01-23",
        examTime: "10:00–11:00",
        centre: "Dhaka",
      },
    ],
    notes: [
      "All five tests are one hour, 10:00 to 11:00, in Dhaka.",
      "Fee, seats, admit card and result date were not in the stored reports.",
    ],
  }),
  C({
    id: "c-ru",
    universityId: "ru",
    title: "University of Rajshahi undergraduate admission 2026–27",
    summary:
      "Preliminary application window and three unit dates, recommended by an admission sub-committee. Not described as a final circular.",
    system: "own",
    publication: "decision",
    confidence: "preliminary",
    confidenceNote:
      "The Public Relations Office told The Daily Star the dates were recommended at a sub-committee meeting on 16 Aug 2026. The 30 Aug report calls them preliminary.",
    sources: [STAR_CLASH, STAR_RETAKE],
    updatedOn: "2026-11-04",
    applicationOpens: "2026-11-12",
    applicationCloses: "2026-11-27",
    examDate: "2027-01-08",
    eligibility: ["Eligibility was not in the stored reports."],
    units: [
      { code: "B", detail: UNIT_UNKNOWN, examDate: "2027-01-08", examTime: null, centre: "Not stated." },
      { code: "C", detail: UNIT_UNKNOWN, examDate: "2027-01-09", examTime: null, centre: "Not stated." },
      { code: "A", detail: UNIT_UNKNOWN, examDate: "2027-01-16", examTime: null, centre: "Not stated." },
    ],
    notes: [
      "The 12–27 Nov window is a preliminary application period, not confirmed here as the final circular.",
      "Fee, seats and admit-card date were not in the stored reports.",
    ],
  }),
  C({
    id: "c-cu",
    universityId: "cu",
    title: "University of Chittagong undergraduate admission 2026–27",
    summary:
      "Probable test dates from a notice signed by the secretary of the admission committee. The article itself calls the dates probable.",
    system: "own",
    publication: "notice",
    confidence: "preliminary",
    confidenceNote:
      "The Daily Star (30 Aug 2026) says CU set probable dates and cites a notice signed by the admission committee secretary. Treat the calendar as not final.",
    sources: [STAR_CLASH, STAR_RETAKE],
    updatedOn: "2026-11-04",
    applicationOpens: "2026-11-15",
    applicationCloses: "2026-12-10",
    examDate: "2027-01-29",
    eligibility: ["Eligibility was not in the stored reports."],
    units: [
      { code: "C", detail: UNIT_UNKNOWN, examDate: "2027-01-29", examTime: null, centre: "CU, DU and RU campuses." },
      { code: "A", detail: UNIT_UNKNOWN, examDate: "2027-01-30", examTime: null, centre: "CU, DU and RU campuses." },
      { code: "B1", detail: "Sub-unit. Subject not named.", examDate: "2027-02-03", examTime: null, centre: "CU campus only." },
      { code: "B2", detail: "Sub-unit. Subject not named.", examDate: "2027-02-04", examTime: null, centre: "CU campus only." },
      { code: "B", detail: UNIT_UNKNOWN, examDate: "2027-02-05", examTime: null, centre: "CU, DU and RU campuses." },
      { code: "D", detail: UNIT_UNKNOWN, examDate: "2027-02-06", examTime: null, centre: "CU, DU and RU campuses." },
      { code: "D1", detail: "Sub-unit. Subject not named.", examDate: "2027-02-08", examTime: null, centre: "CU campus only." },
    ],
    notes: [
      "Main unit tests at the CU, DU and RU campuses. Sub-unit tests only at CU.",
      "Opening time of day was not stated. Fee, seats and admit card were not stated.",
    ],
  }),
  C({
    id: "c-cou",
    universityId: "cou",
    title: "Comilla University application deadline 2026–27",
    summary:
      "Only a closing date is on file. Opening day, units and the test calendar were not in the stored report.",
    system: "own",
    publication: "decision",
    confidence: "reported",
    confidenceNote:
      "The Daily Star (4 Nov 2026) says Comilla University has set 10 Dec 2026 as the application deadline, with tests planned for later dates. No notice URL is stored here.",
    sources: [STAR_RETAKE],
    updatedOn: "2026-11-04",
    applicationCloses: "2026-12-10",
    eligibility: ["Eligibility was not in the stored report."],
    notes: ["Do not invent an opening date or an examination date for CoU."],
  }),
  C({
    id: "c-ku",
    universityId: "ku",
    title: "Khulna University undergraduate admission 2026–27",
    summary:
      "Test days from an official notice signed by acting registrar Prof SM Mahbubur Rahman, after a Central Admission Committee meeting on 24 Aug 2026. Application dates were not in the report.",
    system: "own",
    publication: "notice",
    confidence: "notice",
    confidenceNote: "The Daily Star (30 Aug 2026) cites the signed notice. Application window is still unknown.",
    sources: [STAR_CLASH, STAR_RETAKE],
    updatedOn: "2026-11-04",
    examDate: "2026-12-17",
    eligibility: ["Eligibility was not in the stored reports."],
    units: [
      { code: "C & D", detail: UNIT_UNKNOWN, examDate: "2026-12-17", examTime: null, centre: "Not stated." },
      { code: "A & B", detail: UNIT_UNKNOWN, examDate: "2026-12-18", examTime: null, centre: "Not stated." },
    ],
    notes: ["Application opening, closing, fee, seats and admit card were not in the stored reports."],
  }),
  C({
    id: "c-kuet",
    universityId: "kuet",
    title: "KUET undergraduate admission test 2026–27",
    summary:
      "The special Academic Council on 25 Aug 2026 fixed the test. The same report said application procedure, eligibility and other details would be announced later in the admission circular.",
    system: "engineering",
    publication: "decision",
    confidence: "notice",
    confidenceNote:
      "Test date is from a cited Academic Council decision. The circular itself was explicitly not yet published as of the 30 Aug 2026 report.",
    sources: [STAR_CLASH, STAR_RETAKE],
    updatedOn: "2026-11-04",
    examDate: "2027-01-08",
    eligibility: ["Eligibility will be in the circular. It was not announced in the stored reports."],
    notes: [
      "MCQ test, held the same day in Khulna, Dhaka and Rajshahi.",
      "Do not treat 8 Jan 2027 as proof that applications are open.",
    ],
  }),
  C({
    id: "c-mist",
    universityId: "mist",
    title: "MIST undergraduate admission tests 2026–27",
    summary: "A notice from the institute set two test days. Application dates were not in the report.",
    system: "specialized",
    publication: "notice",
    confidence: "notice",
    confidenceNote: "The Daily Star (30 Aug 2026) says the dates come from a notice published by the institute.",
    sources: [STAR_CLASH, STAR_RETAKE],
    updatedOn: "2026-11-04",
    examDate: "2026-12-18",
    eligibility: ["Eligibility was not in the stored reports."],
    units: [
      { code: "C", detail: "Science.", examDate: "2026-12-18", examTime: null, centre: "Not stated." },
      {
        code: "A & B",
        detail: "Engineering and Architecture.",
        examDate: "2026-12-19",
        examTime: null,
        centre: "Not stated.",
      },
    ],
    notes: ["Application window, fee, seats and admit card were not in the stored reports."],
  }),
  C({
    id: "c-ruet",
    universityId: "ruet",
    title: "RUET undergraduate admission test 2026–27",
    summary: "The admission-test steering committee provisionally fixed a date on 29 Aug 2026.",
    system: "engineering",
    publication: "decision",
    confidence: "preliminary",
    confidenceNote: "The Daily Star calls the 14 Jan 2027 date provisional. Application details were not published in that report.",
    sources: [STAR_CLASH, STAR_RETAKE],
    updatedOn: "2026-11-04",
    examDate: "2027-01-14",
    eligibility: ["Eligibility was not in the stored reports."],
    notes: ["Do not treat this as an open circular."],
  }),
  C({
    id: "c-buet",
    universityId: "buet",
    title: "BUET undergraduate admission test 2026–27",
    summary:
      "BUET is holding the 2026–27 undergraduate written test on 16 Jan 2027 and expects online applications to open on 21 Nov 2026. The admission-test committee head confirmed the plan to newsrooms on 7 Nov; an academic-council meeting may still firm remaining details. Full circular (fee, seats, exact close date) is not stored here.",
    system: "engineering",
    publication: "decision",
    confidence: "reported",
    confidenceNote:
      "Application open date and 16 Jan test restated by TBS, Prothom Alo and bdnews24 on 7 Nov 2026, citing the BUET admission-test committee. No BUET PDF circular is linked in this archive. Fee and exact application close remain NOT ANNOUNCED here.",
    sources: [STAR_RETAKE, TBS_BUET, PROTHOM_BUET, BDNEWS_BUET],
    updatedOn: "2026-11-08",
    applicationOpens: "2026-11-21",
    examDate: "2027-01-16",
    eligibility: [
      "News reports say last year's bar is retained: high HSC Science GPA with A+ in Physics, Chemistry and Higher Mathematics — exact numeric cut-offs belong in the circular, not invented here.",
      "Committee comments say about 10,000 candidates will be allowed to sit the written test.",
    ],
    notes: [
      "Written test only — no preliminary MCQ screening (same pattern as the previous session, per news desks).",
      "BUET is not delaying the test for HSC retake candidates; that is the reported institutional position as of 7 Nov 2026.",
      "Application close date, fee and seat plan are NOT ANNOUNCED in this archive.",
    ],
  }),
  C({
    id: "c-cuet",
    universityId: "cuet",
    title: "CUET undergraduate admission test 2026–27",
    summary: "Only a proposed test date is on file.",
    system: "engineering",
    publication: "decision",
    confidence: "preliminary",
    confidenceNote: "The Daily Star (4 Nov 2026) says CUET has proposed 23 Jan 2027. It does not cite a published circular.",
    sources: [STAR_RETAKE],
    updatedOn: "2026-11-04",
    examDate: "2027-01-23",
    eligibility: ["Eligibility was not in the stored report."],
    notes: ["Application window is NOT ANNOUNCED."],
  }),
  C({
    id: "c-gst",
    universityId: "gst",
    title: "GST cluster admission tests 2026–27",
    summary:
      "Twenty universities. Tests on three days in March 2027. Application dates were not announced, and the member list was not published in the stored report.",
    system: "gst",
    publication: "decision",
    confidence: "reported",
    confidenceNote:
      "The Daily Star (4 Nov 2026) says there may be more room to move these dates because applications are not open yet. Membership is intentionally blank in this archive.",
    sources: [STAR_RETAKE],
    updatedOn: "2026-11-04",
    examDate: "2027-03-19",
    eligibility: ["Eligibility was not in the stored report."],
    units: [
      { code: "B", detail: "Humanities cluster day (reported split).", examDate: "2027-03-19", examTime: null, centre: "Not stated." },
      { code: "C / R / D", detail: "Commerce and related papers on one day (reported split).", examDate: "2027-03-20", examTime: null, centre: "Not stated." },
      { code: "A", detail: "Science cluster day (reported split).", examDate: "2027-03-27", examTime: null, centre: "Not stated." },
    ],
    notes: [
      "Do not mark a university as a GST member until the official list is logged.",
      "Universities already running their own tests in the stored reports — DU, RU, CU, JnU, KU — are not placed in this cluster.",
    ],
  }),
  C({
    id: "c-agri",
    universityId: "agri",
    title: "Agricultural cluster combined test 2026–27",
    summary:
      "Nine universities, coordinated by Sher-e-Bangla Agricultural University. Combined test on 2 Jan 2027. Detailed application arrangements were not announced.",
    system: "agricultural",
    publication: "decision",
    confidence: "reported",
    confidenceNote:
      "The Daily Star (4 Nov 2026) says the cluster has fixed 2 January. It does not name the nine universities or the application window.",
    sources: [STAR_RETAKE],
    updatedOn: "2026-11-04",
    examDate: "2027-01-02",
    eligibility: ["Eligibility was not in the stored report."],
    notes: [
      "Coordinator cited: Sher-e-Bangla Agricultural University.",
      "This archive does not assign individual agricultural universities to the cluster.",
    ],
  }),
  C({
    id: "c-dghs",
    universityId: "dghs",
    title: "MBBS and BDS admission test 2026–27",
    summary:
      "The earlier tentative 4 Dec medical/dental test is no longer the working date. Directorate General of Health Education messaging on 8 Nov points toward 18 Dec 2026, with the admission circular still expected within days and online applications possibly from mid-November. Nothing from a signed circular is stored here yet.",
    system: "medical",
    publication: "decision",
    confidence: "preliminary",
    confidenceNote:
      "4 Dec was always tentative (Daily Star, 4 Nov). Daily Bangladesh (8 Nov) quotes the DGHS director general on a move to 18 Dec to avoid clash with BCS written exams. Treat 18 Dec as provisional until the circular lands.",
    sources: [STAR_RETAKE, DAILYBD_MED],
    updatedOn: "2026-11-08",
    examDate: "2026-12-18",
    eligibility: ["Eligibility, fee and seat counts belong in the DGHS circular — not announced in the stored reports."],
    notes: [
      "This is the DGHS / government medical & dental college test, not a postgraduate medical university admission.",
      "HSC retake candidates may still be squeezed by the calendar; that risk is political/administrative, not settled in a circular stored here.",
      "Application window is NOT ANNOUNCED in this archive.",
    ],
  }),
];

export const EVIDENCE_COPY = [
  "OFFICIAL NOTICE CITED — a news report quotes a university notice, press release, or signed decision. The PDF is linked only when this archive actually has a URL.",
  "REPORTED — a newsroom stated the date. This desk has not stored the underlying document.",
  "REPORTED · NOT FINAL — the source itself calls the date proposed, probable, provisional or tentative.",
  "NOT ANNOUNCED — this archive does not have the fact. It is not a guess and it is not last year's number.",
  "MARKED VERIFIED ON THIS DESK — your own check. It does not rewrite the source grade.",
];
