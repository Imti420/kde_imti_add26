import { i as __toESM } from "../_runtime.mjs";
import { i as formatDay, o as relativeDay, r as daysUntil, s as todayISO } from "./cn-D6R9yezT.mjs";
import { C as require_jsx_runtime, X as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as useCatalog, y as TRACK_LABEL } from "./router-DRETjPZG.mjs";
import { d as eventsFor, h as publishedNotice, n as EvidenceStamp, o as SectionLabel, p as isUrgent, r as ExternalLink, s as StatusPill, t as Announced, u as deriveStatus } from "./marks-BXE2ueSK.mjs";
import { t as UniversityCard } from "./university-card-DLC4D2LA.mjs";
import { n as systemStatus, t as isLiveFile } from "./gate-BQY2Hn-W.mjs";
import { a as SeatPlate, i as Reveal, n as Proximity, o as SplitMeter, r as RankBars, t as CountUp } from "./viz-C16qtz8v.mjs";
import { n as WireStrip } from "./newswire-DJ470Xmh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Bw8lzWDN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var watchItems = [{
	id: "hsc-retake-2026",
	title: "HSC retake may shift these dates",
	body: "On 4 Nov 2026 The Daily Star reported that universities and the medical admission bodies may revise 2026–27 schedules so students who failed one or two HSC subjects can sit proposed supplementary exams. Boards were described as needing December to hold those exams and publish results, with 31 Dec 2026 named as the hoped-for result day. No revised circular is stored here. Every date in this archive is the pre-retake timeline.",
	sourceLabel: "The Daily Star, 4 Nov 2026",
	sourceUrl: "https://www.thedailystar.net/news/bangladesh/education/news/admission-schedule-medical-colleges-univs-mull-relief-hsc-retakers-4315036",
	published: "2026-11-04"
}];
function usePublishedLive() {
	const [live, setLive] = (0, import_react.useState)(null);
	const [phase, setPhase] = (0, import_react.useState)("loading");
	(0, import_react.useEffect)(() => {
		let stop = false;
		const load = async () => {
			try {
				const response = await fetch(`/ops/live.json?t=${Date.now()}`, { cache: "no-store" });
				if (!response.ok) throw new Error("missing");
				const json = await response.json();
				if (!isLiveFile(json)) throw new Error("shape");
				if (!stop) {
					setLive(json);
					setPhase("ready");
				}
			} catch {
				if (!stop) setPhase((current) => current === "ready" ? "ready" : "missing");
			}
		};
		load();
		const poll = window.setInterval(() => void load(), 6e4);
		return () => {
			stop = true;
			window.clearInterval(poll);
		};
	}, []);
	return {
		live,
		phase
	};
}
var PANELS = [
	["universe", "Universities"],
	["wire", "Newswire"],
	["urgent", "Deadlines"],
	["exams", "Exams"],
	["fresh", "Circulars"],
	["picture", "Picture"],
	["seats", "Seats"],
	["ops", "Discovery"]
];
var TRACKS = ["all", ...Object.keys(TRACK_LABEL)];
var LEAD = [
	"gst",
	"agri",
	"dghs",
	"du",
	"buet",
	"ru",
	"cu",
	"ju",
	"sust",
	"kuet",
	"ruet",
	"cuet",
	"nsu",
	"bracu",
	"bup",
	"ku",
	"mist",
	"bau",
	"nu"
];
var DESK_STATUS = {
	never: "NOT STARTED",
	active: "ACTIVE",
	idle: "IDLE",
	degraded: "DEGRADED",
	failed: "FAILED",
	stale: "STALE"
};
var EVENT_LABEL = {
	cycle_start: "Cycle start",
	cycle_end: "Cycle end",
	connect: "Connect",
	fetched: "Fetched",
	no_change: "No change",
	discover: "New link",
	skip: "Skipped",
	fail: "Failed",
	cap: "Cap"
};
function Overview() {
	const { universities, circulars, byId } = useCatalog();
	const { live, phase } = usePublishedLive();
	const [track, setTrack] = (0, import_react.useState)("all");
	const [gridQuery, setGridQuery] = (0, import_react.useState)("");
	const now = /* @__PURE__ */ new Date();
	const today = todayISO(now);
	const unis = universities.filter((item) => item.kind === "university");
	const published = circulars.filter(publishedNotice);
	const openCount = circulars.filter((item) => deriveStatus(item, now) === "open").length;
	const deadlines = circulars.filter((item) => item.applicationCloses && item.applicationCloses >= today);
	const exams = new Set(circulars.flatMap((item) => eventsFor(item).filter((event) => event.kind === "exam" && event.day >= today).map((event) => event.id)));
	const recentCut = new Date(now);
	recentCut.setDate(recentCut.getDate() - 14);
	const recentCutISO = todayISO(recentCut);
	const recent = circulars.filter((item) => item.updatedOn >= recentCutISO);
	const latest = [...circulars].sort((a, b) => b.updatedOn.localeCompare(a.updatedOn)).slice(0, 5);
	const upcoming = circulars.flatMap((item) => eventsFor(item)).filter((event) => event.day >= today && (event.kind === "opens" || event.kind === "closes" || event.kind === "exam")).sort((a, b) => a.day.localeCompare(b.day) || a.label.localeCompare(b.label));
	const deadlineRows = upcoming.filter((event) => event.kind === "closes" || event.kind === "opens");
	const urgentDeadlines = deadlineRows.filter((event) => isUrgent(event, now));
	const radar = (urgentDeadlines.length ? urgentDeadlines : deadlineRows.length ? deadlineRows : upcoming).slice(0, 6);
	const examRows = upcoming.filter((event) => event.kind === "exam").slice(0, 6);
	const stats = [
		{
			k: "01",
			label: "Universities tracked",
			value: unis.length,
			hint: `${universities.length - unis.length} admission systems`
		},
		{
			k: "02",
			label: "Published circulars",
			value: published.length,
			hint: "Notice cited · PDF only if linked"
		},
		{
			k: "03",
			label: "Upcoming deadlines",
			value: deadlines.length,
			hint: "Close date still ahead"
		},
		{
			k: "04",
			label: "Open applications",
			value: openCount,
			hint: openCount ? "Window is live" : "None live today"
		},
		{
			k: "05",
			label: "Upcoming examinations",
			value: exams.size,
			hint: "Unit papers still ahead"
		},
		{
			k: "06",
			label: "Recent intelligence",
			value: recent.length,
			hint: "Updated in 14 days"
		}
	];
	const trackRows = Object.keys(TRACK_LABEL).map((track) => ({
		id: track,
		label: TRACK_LABEL[track],
		value: universities.filter((uni) => uni.track === track).length
	}));
	const statusCounts = {
		open: 0,
		upcoming: 0,
		closed: 0,
		not_announced: 0
	};
	for (const item of circulars) statusCounts[deriveStatus(item, now)] += 1;
	const confidenceRows = [
		{
			id: "notice",
			label: "Notice cited",
			value: circulars.filter((item) => item.confidence === "notice").length
		},
		{
			id: "reported",
			label: "Reported",
			value: circulars.filter((item) => item.confidence === "reported").length
		},
		{
			id: "preliminary",
			label: "Preliminary",
			value: circulars.filter((item) => item.confidence === "preliminary").length
		},
		{
			id: "blank",
			label: "Not announced",
			value: circulars.filter((item) => item.confidence === "not-announced").length
		}
	];
	const coveredIds = new Set(circulars.map((item) => item.universityId));
	const covered = universities.filter((uni) => coveredIds.has(uni.id)).length;
	const seatRows = circulars.filter((item) => item.seats != null).map((item) => ({
		id: item.id,
		label: byId.get(item.universityId)?.shortName ?? item.universityId,
		seats: item.seats
	}));
	const soon = upcoming.filter((event) => event.kind === "closes" || event.kind === "exam").slice(0, 8).map((event) => ({
		id: event.id,
		label: `${byId.get(event.universityId)?.shortName ?? "—"}`,
		meta: `${event.kind === "exam" ? "EXAM" : "CLOSES"} · ${relativeDay(event.day, now)}`,
		days: Math.max(0, daysUntil(event.day, now)),
		hot: isUrgent(event, now)
	}));
	const deskStatus = systemStatus(phase === "ready" ? live : null, now);
	const eventRows = countEvents(live?.events ?? []);
	const sameHour = eventsShareOneHour(live?.events ?? []);
	const leadRank = (0, import_react.useMemo)(() => new Map(LEAD.map((id, index) => [id, index])), []);
	const grid = (0, import_react.useMemo)(() => {
		const query = gridQuery.trim().toLowerCase();
		const rows = universities.map((uni) => {
			const related = circulars.filter((item) => item.universityId === uni.id).sort((a, b) => b.updatedOn.localeCompare(a.updatedOn));
			const primary = related[0] ?? null;
			return {
				uni,
				related,
				status: primary ? deriveStatus(primary, now) : "not_announced"
			};
		}).filter(({ uni }) => {
			if (track !== "all" && uni.track !== track) return false;
			if (!query) return true;
			return [
				uni.name,
				uni.shortName,
				uni.nameBn,
				uni.city,
				uni.id
			].join(" ").toLowerCase().includes(query);
		});
		rows.sort((a, b) => {
			if (track === "all" && !query) {
				const ar = leadRank.get(a.uni.id) ?? 500;
				const br = leadRank.get(b.uni.id) ?? 500;
				if (ar !== br) return ar - br;
			}
			return a.uni.shortName.localeCompare(b.uni.shortName);
		});
		return rows;
	}, [
		universities,
		circulars,
		track,
		gridQuery,
		leadRank,
		now
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "rise",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-end justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-xs tracking-widest text-mute",
						children: ["VOL. 01 · DHAKA DESK · ", formatDay(today)]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "sticker",
						children: "HSC 2026–27"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mt-3 max-w-5xl font-display text-6xl font-bold uppercase leading-[0.82] tracking-tight text-balance sm:text-7xl md:text-8xl",
					children: [
						"Admission",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-accent",
							children: "//"
						}),
						"26"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-xl font-display text-2xl uppercase leading-none md:text-4xl",
					children: "The university universe, on one desk."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-2xl text-base text-pretty",
					children: "Big cards, real circulars, and blanks where the archive does not know. Not a portal. A season catalogue."
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			className: "mt-6 flex gap-2 overflow-x-auto pb-2",
			"aria-label": "Desk sections",
			children: PANELS.map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: `#${id}`,
				className: "press shrink-0",
				children: label
			}, id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			id: "universe",
			className: "desk-anchor mt-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 flex flex-wrap items-end justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs tracking-widest text-accent",
						children: "01 · THE DIRECTORY"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 font-display text-5xl font-bold uppercase leading-none md:text-6xl",
						children: "Universities"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/universities",
						className: "press",
						children: "Full directory"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-3xl text-sm text-pretty",
					children: "Every institution already in the registry. Hover a card for a campus joke — commentary, not a fact — then open the profile. Missing seats, dates and subjects stay labelled as not on file."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-col gap-3 lg:flex-row lg:items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sr-only",
							children: "Filter universities"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: gridQuery,
							onChange: (event) => setGridQuery(event.target.value),
							placeholder: "FILTER BY NAME, CITY, SHORT NAME",
							className: "h-11 w-full rounded-xl border-[3px] border-ink bg-paper px-3 font-mono text-xs uppercase tracking-widest outline-none placeholder:text-mute focus:bg-panel"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-2 overflow-x-auto pb-1",
						role: "tablist",
						"aria-label": "University category",
						children: TRACKS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							role: "tab",
							"aria-selected": track === item,
							"aria-pressed": track === item,
							className: "press shrink-0",
							onClick: () => setTrack(item),
							children: item === "all" ? "All" : TRACK_LABEL[item].split(" ")[0]
						}, item))
					})]
				}),
				grid.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "window mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "window-body block font-mono text-xs tracking-widest text-mute",
						children: "NO UNIVERSITY MATCHES THAT FILTER."
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "uni-grid mt-5",
					children: grid.map((row, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UniversityCard, {
						uni: row.uni,
						related: row.related,
						status: row.status,
						index
					}, row.uni.id))
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6",
			"aria-label": "Season counts",
			children: stats.map((stat, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
				index,
				className: "window",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "window-bar",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: stat.k })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "window-body",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-4xl font-bold leading-none",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CountUp, { value: stat.value })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-display text-lg font-semibold uppercase leading-none",
							children: stat.label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-mono text-xs text-mute",
							children: stat.hint
						})
					]
				})]
			}, stat.k))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WireStrip, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.8fr)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "urgent",
				className: "desk-anchor",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 flex items-end justify-between gap-3 border-b border-ink pb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, {
							index: "07",
							children: urgentDeadlines.length ? "Deadlines approaching" : deadlineRows.length ? "Nearest deadlines" : "Nearest marks"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/radar",
							className: "font-mono text-xs tracking-widest underline underline-offset-4",
							children: "FULL RADAR"
						})]
					}),
					radar.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "border border-dashed border-ink p-4 font-mono text-xs tracking-widest text-mute",
						children: "NO FUTURE DATE IS ON FILE."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", { children: radar.map((event, index) => {
						const uni = byId.get(event.universityId);
						const hot = isUrgent(event, now);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "rise border-b border-ink",
							style: { animationDelay: `${index * 40}ms` },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/circulars/$id",
								params: { id: event.circularId },
								className: "grid grid-cols-[auto_1fr] gap-4 py-3 hover:bg-panel md:grid-cols-[4.5rem_8rem_1fr_auto]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-xs text-mute",
										children: String(index + 1).padStart(2, "0")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: `font-mono text-xs ${hot ? "text-accent" : "text-ink"}`,
										children: [formatDay(event.day), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mt-1 block",
											children: relativeDay(event.day, now)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-display text-3xl font-bold uppercase leading-none",
										children: uni?.shortName
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-1 block text-sm",
										children: event.label
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `font-mono text-xs ${hot ? "text-accent" : "text-mute"}`,
										children: hot ? "URGENT" : "ON FILE"
									})
								]
							})
						}, event.id);
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-mono text-xs text-mute",
						children: urgentDeadlines.length ? "RED MEANS A CLOSE INSIDE 14 DAYS, OR AN OPENING INSIDE 7." : deadlineRows.length ? "NO OPENING OR CLOSE IS INSIDE THE URGENT WINDOW. THESE ARE THE NEXT APPLICATION WINDOWS ON FILE." : "NO APPLICATION WINDOW IS DATED. THESE ARE THE NEXT MARKS ON FILE."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "exams",
				className: "desk-anchor",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 flex items-end justify-between gap-3 border-b border-ink pb-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, {
						index: "08",
						children: "Examinations"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/calendar",
						className: "font-mono text-xs tracking-widest underline underline-offset-4",
						children: "CALENDAR"
					})]
				}), examRows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "border border-dashed border-ink p-4 font-mono text-xs text-mute",
					children: "NO UPCOMING EXAM DATE IS ON FILE."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "border-t border-ink",
					children: examRows.map((event) => {
						const uni = byId.get(event.universityId);
						const hot = isUrgent(event, now);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "border-b border-ink",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/circulars/$id",
								params: { id: event.circularId },
								className: "block py-3 hover:bg-panel",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-baseline justify-between gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-display text-3xl font-bold uppercase leading-none",
											children: uni?.shortName
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `font-mono text-xs ${hot ? "text-accent" : "text-mute"}`,
											children: relativeDay(event.day, now)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm",
										children: event.label
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 font-mono text-xs",
										children: formatDay(event.day)
									})
								]
							})
						}, event.id);
					})
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			id: "fresh",
			className: "desk-anchor mt-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex items-end justify-between gap-3 border-b border-ink pb-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, {
					index: "09",
					children: "Recently cited"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/circulars",
					className: "font-mono text-xs tracking-widest underline underline-offset-4",
					children: "ARCHIVE"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "grid gap-px bg-ink md:grid-cols-2",
				children: latest.map((item, index) => {
					const uni = byId.get(item.universityId);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "rise bg-paper",
						style: { animationDelay: `${index * 50}ms` },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/circulars/$id",
							params: { id: item.id },
							className: "block p-4 hover:bg-panel",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-display text-3xl font-bold uppercase leading-none",
											children: uni?.shortName
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: deriveStatus(item, now) }),
										item.updatedOn >= recentCutISO ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-xs text-accent",
											children: "REVISED"
										}) : null
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm",
									children: item.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 font-mono text-xs text-mute",
									children: ["CITED ", formatDay(item.updatedOn)]
								})
							]
						})
					}, item.id);
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			id: "picture",
			className: "desk-anchor mt-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, {
					index: "10",
					children: "Picture of the file"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-3xl text-sm",
					children: "Counts from the directory and the circulars already stored. Bars are headcounts, not seat estimates."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid gap-4 lg:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RankBars, {
							kicker: "Directory",
							title: "Records by cluster",
							caption: "Every university and admission system on the desk. This does not say who is admitting.",
							empty: "THE DIRECTORY IS EMPTY.",
							rows: trackRows
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SplitMeter, {
							kicker: "Circulars only",
							title: "Application stage",
							caption: `${circulars.length} circulars are stored. Universities without a circular are not in this mix.`,
							empty: "NO CIRCULARS ARE ON FILE.",
							parts: [
								{
									id: "open",
									label: "OPEN",
									value: statusCounts.open,
									tone: "accent"
								},
								{
									id: "upcoming",
									label: "UPCOMING",
									value: statusCounts.upcoming,
									tone: "ink"
								},
								{
									id: "closed",
									label: "CLOSED",
									value: statusCounts.closed,
									tone: "mute"
								},
								{
									id: "blank",
									label: "NOT ANNOUNCED",
									value: statusCounts.not_announced,
									tone: "panel"
								}
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SplitMeter, {
							kicker: "Coverage",
							title: "Who has a circular",
							caption: "A record counts as covered when at least one circular is stored for it. Absence is not a rumour.",
							empty: "NOTHING IS IN THE DIRECTORY.",
							parts: [{
								id: "yes",
								label: "CIRCULAR ON FILE",
								value: covered,
								tone: "ink"
							}, {
								id: "no",
								label: "NO CIRCULAR",
								value: universities.length - covered,
								tone: "panel"
							}]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RankBars, {
							kicker: "Evidence",
							title: "How sure the circulars are",
							caption: "Confidence is the archive's grade of the source, not a prediction.",
							empty: "NO CIRCULARS ARE GRADED.",
							rows: confidenceRows
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Proximity, {
							kicker: "Horizon",
							title: "Closes and exams",
							caption: "Longer mark means sooner. Only dates written on a circular. Same-day clashes still live on the radar.",
							empty: "NO FUTURE CLOSE OR EXAM DATE IS ON FILE.",
							rows: soon
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							id: "seats",
							className: "desk-anchor",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeatPlate, {
								known: seatRows.length,
								missing: circulars.length - seatRows.length,
								rows: seatRows
							})
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			id: "ops",
			className: "desk-anchor mt-10 border border-ink p-4 md:p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-end justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs tracking-widest text-mute",
						children: "11 · DISCOVERY"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 font-display text-4xl font-bold uppercase leading-none",
						children: "Crawler health"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/discovery",
						className: "font-mono text-xs tracking-widest underline underline-offset-4",
						children: "OPEN THE LOG"
					})]
				}),
				phase === "loading" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rule-wait mt-4 font-mono text-xs tracking-widest text-mute",
					children: "READING THE PUBLISHED LOG."
				}) : null,
				phase === "missing" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 border border-dashed border-ink p-4 font-mono text-xs tracking-widest text-mute",
					children: "NO DISCOVERY FILE. NOTHING HERE IS A SCAN."
				}) : null,
				live ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `inline-block h-3 w-3 border border-ink ${deskStatus === "active" ? "crawl-live bg-accent" : "bg-transparent"}`,
								"aria-hidden": true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: `font-display text-3xl font-bold uppercase leading-none ${deskStatus === "failed" || deskStatus === "stale" ? "text-accent" : ""}`,
								children: DESK_STATUS[deskStatus]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-mono text-xs tracking-widest text-mute",
								children: ["FILE SAYS ", live.status.toUpperCase()]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-3xl font-mono text-xs leading-relaxed text-mute",
						children: live.note
					}),
					sameHour && (live.events.length ?? 0) > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-mono text-xs text-mute",
						children: "EVERY EVENT IN THIS FILE SHARES ONE HOUR. A TIME SERIES WOULD BE A SINGLE MARK, SO IT IS NOT DRAWN."
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid gap-4 lg:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SplitMeter, {
							kicker: "Last published counts",
							title: "What the cycle counted",
							caption: "Taken from the cycle's own counters. Not recomputed, not filled in.",
							empty: "THE CYCLE RECORDED NO COUNTS.",
							parts: [
								{
									id: "reached",
									label: "REACHED",
									value: live.counts.reached,
									tone: "ink"
								},
								{
									id: "failed",
									label: "FAILED",
									value: live.counts.failed,
									tone: "accent"
								},
								{
									id: "skipped",
									label: "SKIPPED",
									value: live.counts.skipped,
									tone: "mute"
								},
								{
									id: "unchecked",
									label: "NOT CHECKED",
									value: live.counts.notChecked,
									tone: "panel"
								}
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RankBars, {
							kicker: "Event list",
							title: "Lines in the log",
							caption: live.events.length ? `${live.events.length} lines are in the published list. The list is capped, so this is not a full history.` : "The file has a count block but no event lines.",
							empty: "NO EVENTS HAVE BEEN RECORDED.",
							rows: eventRows
						})]
					})
				] }) : null
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-10 border border-ink border-l-4 border-l-accent p-4 md:p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs tracking-widest text-accent",
				children: "WATCH ITEM · NOT A CONFIRMED CIRCULAR"
			}), watchItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "mt-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-4xl font-bold uppercase leading-none",
						children: item.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-4xl text-sm text-pretty",
						children: item.body
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 font-mono text-xs",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
							href: item.sourceUrl,
							children: item.sourceLabel
						})
					})
				]
			}, item.id))]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, {
				index: "12",
				children: "Systems on the desk"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid gap-px bg-ink md:grid-cols-3",
				children: universities.filter((item) => item.kind === "system").map((item, index) => {
					const circular = circulars.find((entry) => entry.universityId === item.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/universities/$id",
						params: { id: item.id },
						className: "rise bg-paper p-4 hover:bg-panel",
						style: { animationDelay: `${index * 60}ms` },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-xs text-mute",
								children: TRACK_LABEL[item.track]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-2 font-display text-4xl font-bold uppercase leading-none",
								children: item.shortName
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm",
								children: item.name
							}),
							circular ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex flex-wrap items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EvidenceStamp, { circular }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Announced, { day: circular.examDate })]
							}) : null
						]
					}, item.id);
				})
			})]
		})
	] });
}
function countEvents(events) {
	const totals = /* @__PURE__ */ new Map();
	for (const event of events) totals.set(event.type, (totals.get(event.type) ?? 0) + 1);
	return [...totals.entries()].map(([type, value]) => ({
		id: type,
		label: EVENT_LABEL[type],
		value
	})).sort((a, b) => b.value - a.value || a.label.localeCompare(b.label));
}
function eventsShareOneHour(events) {
	if (events.length < 2) return false;
	const hour = events[0]?.at.slice(0, 13);
	return events.every((event) => event.at.slice(0, 13) === hour);
}
//#endregion
export { Overview as component };
