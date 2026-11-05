import { i as formatDay, n as cn, r as daysUntil } from "./cn-D6R9yezT.mjs";
import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as SYSTEM_LABEL, y as TRACK_LABEL } from "./router-DRETjPZG.mjs";
import { s as StatusPill } from "./marks-BXE2ueSK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/university-card-DLC4D2LA.js
var import_jsx_runtime = require_jsx_runtime();
/**
* Playful campus lines for browsing. Not official descriptions, not facts,
* and not a substitute for a circular. Edit freely.
*/
var VOICES = {
	du: "Political hub of the country. Don't get scared.",
	ru: "Rajshahi calm, until the form actually opens.",
	cu: "Hill campus, long walks, and a date still marked probable.",
	ju: "Deer on the roads. The 2026 circular is not in this drawer.",
	iu: "Kushtia. Do not file it under GST until a circular does.",
	ku: "Khulna runs its own test. The river is not an admit card.",
	jnu: "Jagannath. Not Jahangirnagar. The letters are a trap.",
	cou: "Cumilla has a deadline in the timeline. The rest is still blank.",
	jkkniu: "Trishal, Nazrul's name, and no notice in the archive yet.",
	brur: "Rangpur. Also a Dhaka outside centre, which is not a BRUR circular.",
	bu: "Barishal's file is quiet. Quiet is not a date.",
	rub: "Shahjadpur. Rabindra's campus, no 2026 notice stored.",
	neu: "Netrokona is on the map. The circular is not.",
	kiu: "Kishoreganj, still wearing an old web address. No notice stored.",
	nau: "Naogaon. UGC did not even publish a website. We will not invent one.",
	meu: "Meherpur. New campus energy, empty circular folder.",
	thu: "Thakurgaon. North corner of the directory, nothing dated.",
	ub: "Bogura. The archive has the name and not the notice.",
	dcu: "Dhaka Central. Easy to confuse, nothing announced here.",
	buet: "The country's favourite pressure cooker. Bring a spare weekend.",
	cuet: "A proposed test day. Proposed is not the same as printed.",
	kuet: "The council picked a day. The paper said the circular was still coming.",
	ruet: "Provisionally fixed. That word is doing a lot of work.",
	duet: "Diploma-to-degree country. Not the BUET-style HSC queue.",
	sust: "Sylhet science. Being a Dhaka exam centre is not a SUST circular.",
	hstu: "Dinajpur science campus. The folder is still empty.",
	mbstu: "Tangail. Santosh, and no 2026 notice on file.",
	pstu: "Patuakhali, between the river and a blank circular.",
	nstu: "Noakhali science. The notice has not reached this desk.",
	just: "Jashore, still spelled Jessore on the UGC list. No notice stored.",
	pust: "Pabna science. Name on the directory, dates not yet.",
	gstu: "Gopalganj science. Not the GST cluster. The letters are teasing you.",
	rmstu: "Rangamati hills. No admission notice stored.",
	jstu: "Jamalpur, old hostname and all. Circular not on file.",
	cstu: "Chandpur science. Waiting on a real notice.",
	sstu: "Sunamganj. Haor country, empty admission file.",
	prstu: "Pirojpur science. Nothing dated in this archive.",
	lstu: "Lakshmipur. No public website on the UGC list, no notice here.",
	nrstu: "Narayanganj science. Close to Dhaka, far from a stored circular.",
	uftb: "Frontier technology, Gazipur. The circular has not arrived.",
	bau: "Mymensingh farms. A Dhaka exam centre is not a BAU circular.",
	gau: "Gazipur agricultural. Cluster membership was not published.",
	sau: "Sher-e-Bangla is coordinating the farm cluster. The nine names were not listed.",
	sylau: "Sylhet Agricultural. Different campus, different website, from Sher-e-Bangla.",
	kau: "Khulna agricultural. Not KU, not KUET. No notice stored.",
	hau: "Hobiganj, spelled the UGC way. Circular not on file.",
	kurau: "Kurigram agricultural. The file is a blank field.",
	shau: "Shariatpur agricultural. No website on the list, no notice here.",
	cvasu: "Vets and animals, Chattogram. Not the medical cluster.",
	"bmu-med": "Medical. Not maritime. The initials collide on purpose, apparently.",
	cmu: "Chattogram medical university. MBBS still goes through DGHS.",
	rmu: "Rajshahi medical. The national test is a different record.",
	smu: "Sylhet medical, old web address included. Not a campus circular.",
	kmu: "Khulna medical. Easy to mix up with the maritime one. Don't.",
	bup: "Professionals, Mirpur, own admission. The 2026 notice is not stored.",
	mist: "Cited by the paper. The application window was not in that report.",
	butex: "Textiles. Looms, not a GST unit. No notice on file.",
	maru: "Maritime. Not medical. Read the host before you apply to the wrong ocean.",
	aaub: "Lalmonirhat, aviation. The runway is real. The circular is not stored.",
	iut: "Board Bazar, OIC campus. Not a private UGC university.",
	nu: "The affiliated-college galaxy. Not a GST university.",
	bou: "Open university. A different door from the campus tests.",
	iau: "Madrasa affiliates. Own system, no 2026 notice stored.",
	nsu: "Bashundhara semester clock. Not an HSC cluster.",
	bracu: "BRAC's private intake. The public-university panic does not apply.",
	iub: "Independent by name, private by calendar. Nothing dated here.",
	aust: "Tejgaon labs. Private engineering, no circular stored.",
	aiub: "Kuril private campus. The admission window is not on file.",
	ewu: "Aftabnagar. Semester intake, blank circular.",
	uiu: "Madani Avenue, engineering tilt, dates not stored.",
	diu: "Daffodil runs its own intake. Not a public cluster.",
	uap: "Green Road private engineering. No circular on file.",
	ulab: "Liberal arts, private calendar, nothing dated here.",
	iubat: "Uttara's long name. The file is still short.",
	bubt: "Mirpur business campus. Intake not on file.",
	green: "Green University. This particular file is still blank.",
	seu: "Southeast, Tejgaon. No notice stored.",
	iiuc: "Chattogram private campus. Not the University of Chittagong.",
	uits: "Information in the name. Not yet in the circular file.",
	puc: "Premier, Chattogram. Private, and not CU.",
	lus: "Leading, Sylhet. Not SUST, and not dated here.",
	eastern: "Eastern, Dhaka. No 2026–27 circular stored.",
	baust: "Saidpur cantonment campus. Private file, blank dates.",
	stamford: "Stamford's own intake. Nothing dated on this desk.",
	gst: "Twenty universities, three March days, and a membership list this archive will not guess.",
	agri: "Nine agricultural universities. The report named the coordinator, not the nine.",
	dghs: "One national medical test. Tentative until a circular says otherwise."
};
var FALLBACK = "Personality pending. The facts stay blank until a source arrives.";
function campusVoice(id) {
	return VOICES[id] ?? FALLBACK;
}
var FEATURE = /* @__PURE__ */ new Set([
	"du",
	"buet",
	"ru",
	"sust",
	"gst",
	"dghs"
]);
function earliestExam(circular) {
	if (!circular) return null;
	const days = [...circular.units.map((unit) => unit.examDate), circular.examDate].filter((day) => Boolean(day));
	if (!days.length) return null;
	return [...days].sort()[0] ?? null;
}
function shortDay(iso) {
	if (!iso) return "";
	return formatDay(iso).replace(/ \d{4}$/, "");
}
function UniversityCard({ uni, related, status, index }) {
	const primary = related[0] ?? null;
	const seats = primary?.seats ?? null;
	const exam = earliestExam(primary);
	const closes = primary?.applicationCloses ?? null;
	const closeDays = closes ? daysUntil(closes) : null;
	const hot = status === "open" || closeDays != null && closeDays >= 0 && closeDays <= 14;
	const nameClass = uni.shortName.length >= 6 ? "is-long" : uni.shortName.length >= 4 ? "is-mid" : "";
	const system = primary ? SYSTEM_LABEL[primary.system] : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/universities/$id",
		params: { id: uni.id },
		"aria-label": `Open ${uni.shortName} profile, ${uni.name}`,
		"data-track": uni.track,
		className: cn("uni-card", FEATURE.has(uni.id) && "uni-card-feature", index < 12 && "rise"),
		style: index < 12 ? { animationDelay: `${index * 42}ms` } : void 0,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "uni-card-kicker",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: TRACK_LABEL[uni.track] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: String(index + 1).padStart(2, "0") })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("uni-card-name", nameClass),
				children: uni.shortName
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "uni-card-full",
				children: uni.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "uni-card-side",
				children: uni.city || "CITY NOT LOGGED"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "uni-card-facts",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status }),
					system ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "uni-fact",
						children: system
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "uni-fact",
						children: "Cluster not on file"
					}),
					closes ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: cn("uni-fact", hot && "uni-fact-hot"),
						children: ["Closes ", shortDay(closes)]
					}) : null,
					exam ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "uni-fact",
						children: ["Exam ", shortDay(exam)]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "uni-fact",
						children: seats == null ? "Seats not on file" : `${seats.toLocaleString("en-BD")} seats`
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "uni-card-tease",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "uni-card-line",
					children: campusVoice(uni.id)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "uni-card-go",
					children: "OPEN PROFILE →"
				})]
			})
		]
	});
}
//#endregion
export { campusVoice as n, earliestExam as r, UniversityCard as t };
