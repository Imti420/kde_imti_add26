import { i as __toESM } from "../_runtime.mjs";
import { n as cn } from "./cn-D6R9yezT.mjs";
import { C as require_jsx_runtime, X as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as PageHead, r as ExternalLink } from "./marks-BXE2ueSK.mjs";
import { t as createServerFn } from "./ssr.mjs";
import { n as systemStatus, t as isLiveFile } from "./gate-BQY2Hn-W.mjs";
import { r as RankBars, t as CountUp } from "./viz-C16qtz8v.mjs";
import { t as createSsrRpc } from "./createSsrRpc-C1p7zOu_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/discovery-B18ifa5X.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var fetchPublishedLog = createServerFn({ method: "POST" }).handler(createSsrRpc("c6c30c7dc7da09d7bac0bd582ab434215cd57c2b593c968e34f1e90ad57a9303"));
var REACH_LABEL = {
	not_yet_checked: "NOT YET CHECKED",
	success: "SUCCESS",
	no_change: "NO CHANGE",
	new_document: "NEW DOCUMENT",
	unreachable: "SOURCE UNREACHABLE",
	retry_scheduled: "RETRY SCHEDULED",
	source_broken: "SOURCE BROKEN",
	skipped_robots: "SKIPPED",
	no_official_url: "NO OFFICIAL URL"
};
var SYSTEM_LABEL = {
	never: "NOT STARTED",
	active: "ACTIVE",
	idle: "IDLE",
	degraded: "DEGRADED",
	failed: "FAILED",
	stale: "STALE"
};
var EVENT_STAMP = {
	cycle_start: "START",
	cycle_end: "END",
	connect: "OPEN",
	fetched: "GET",
	no_change: "SAME",
	discover: "DOC",
	skip: "SKIP",
	fail: "FAIL",
	cap: "CAP"
};
function relativePast(iso, now) {
	if (!iso) return "NEVER";
	const then = Date.parse(iso);
	if (Number.isNaN(then)) return "UNKNOWN";
	const minutes = Math.floor(Math.max(0, now.getTime() - then) / 6e4);
	if (minutes < 1) return "JUST NOW";
	if (minutes < 60) return `${minutes} MINUTE${minutes === 1 ? "" : "S"} AGO`;
	const hours = Math.floor(minutes / 60);
	if (hours < 48) return `${hours} HOUR${hours === 1 ? "" : "S"} AGO`;
	const days = Math.floor(hours / 24);
	return `${days} DAY${days === 1 ? "" : "S"} AGO`;
}
async function pull(url) {
	try {
		const response = await fetch(`${url}${url.includes("?") ? "&" : "?"}t=${Date.now()}`, { cache: "no-store" });
		if (!response.ok) return null;
		const json = await response.json();
		return isLiveFile(json) ? json : null;
	} catch {
		return null;
	}
}
function newer(left, right) {
	if (!left) return right;
	if (!right) return left;
	const a = Date.parse(left.generatedAt ?? "") || 0;
	return (Date.parse(right.generatedAt ?? "") || 0) > a ? right : left;
}
function eventMatches(event, filter) {
	if (filter === "all") return true;
	if (filter === "discover") return event.type === "discover";
	if (filter === "fetched") return event.type === "fetched" || event.type === "connect";
	if (filter === "same") return event.type === "no_change";
	if (filter === "fail") return event.type === "fail" || event.level === "error";
	return event.type === "skip" || event.type === "cap";
}
function eventClass(event) {
	if (event.type === "discover") return "border-l-4 border-l-accent";
	if (event.type === "fail" || event.level === "error") return "border-l-4 border-l-accent bg-panel";
	if (event.type === "skip" || event.type === "cap" || event.type === "no_change") return "border-l-4 border-l-mute";
	if (event.type === "cycle_start" || event.type === "cycle_end") return "bg-ink text-paper";
	return "border-l-4 border-l-ink";
}
function reachClass(reach) {
	if (reach === "new_document") return "border-l-4 border-l-accent bg-panel";
	if (reach === "unreachable" || reach === "retry_scheduled" || reach === "source_broken") return "border-l-4 border-l-accent";
	if (reach === "success" || reach === "no_change") return "border-l-4 border-l-ink";
	return "border-l-4 border-l-mute";
}
function DiscoveryPage() {
	const [live, setLive] = (0, import_react.useState)(null);
	const [phase, setPhase] = (0, import_react.useState)("loading");
	const [now, setNow] = (0, import_react.useState)(() => /* @__PURE__ */ new Date());
	const [seenAt, setSeenAt] = (0, import_react.useState)(null);
	const [query, setQuery] = (0, import_react.useState)("");
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [eventFilter, setEventFilter] = (0, import_react.useState)("all");
	(0, import_react.useEffect)(() => {
		let stop = false;
		const load = async () => {
			const local = await pull("/ops/live.json");
			if (stop) return;
			if (local) {
				setLive((current) => newer(current, local));
				setPhase("ready");
				setSeenAt(/* @__PURE__ */ new Date());
			}
			let remote = null;
			try {
				remote = await fetchPublishedLog();
			} catch {
				remote = null;
			}
			if (stop) return;
			const next = newer(local, remote);
			if (next) {
				setLive((current) => newer(current, next));
				setPhase("ready");
			} else if (!local) setPhase("missing");
			setSeenAt(/* @__PURE__ */ new Date());
		};
		load();
		const poll = window.setInterval(() => void load(), 3e4);
		const clock = window.setInterval(() => setNow(/* @__PURE__ */ new Date()), 3e4);
		return () => {
			stop = true;
			window.clearInterval(poll);
			window.clearInterval(clock);
		};
	}, []);
	const status = systemStatus(phase === "ready" ? live : null, now);
	const sources = (0, import_react.useMemo)(() => {
		const rows = live?.sources ?? [];
		const q = query.trim().toLowerCase();
		return rows.filter((source) => {
			if (filter === "failed" && ![
				"unreachable",
				"retry_scheduled",
				"source_broken"
			].includes(source.reachability)) return false;
			if (filter === "reached" && ![
				"success",
				"no_change",
				"new_document"
			].includes(source.reachability)) return false;
			if (filter === "new" && source.reachability !== "new_document") return false;
			if (filter === "unchecked" && source.reachability !== "not_yet_checked" && source.reachability !== "no_official_url") return false;
			if (!q) return true;
			return [
				source.universityName,
				source.shortName,
				source.sourceName,
				source.url ?? "",
				source.error ?? "",
				source.note
			].join(" ").toLowerCase().includes(q);
		});
	}, [
		live,
		query,
		filter
	]);
	const events = (0, import_react.useMemo)(() => {
		return (live?.events ?? []).map((event, index) => ({
			event,
			key: `${event.at}|${index}|${event.type}|${event.url ?? ""}`
		})).reverse().filter((row) => eventMatches(row.event, eventFilter));
	}, [live, eventFilter]);
	const reachRows = (0, import_react.useMemo)(() => {
		const counts = /* @__PURE__ */ new Map();
		for (const source of live?.sources ?? []) counts.set(source.reachability, (counts.get(source.reachability) ?? 0) + 1);
		return Object.keys(REACH_LABEL).map((id) => ({
			id,
			label: REACH_LABEL[id],
			value: counts.get(id) ?? 0
		})).filter((row) => row.value > 0);
	}, [live]);
	const nextAt = live?.completedAt ? new Date(Date.parse(live.completedAt) + 27e5) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			kicker: "Discovery",
			title: "Discovery log",
			lede: "What the crawler actually opened. This page does not start a scan, and it does not publish admission dates. The job runs on GitHub about every 45 minutes even if nobody has the site open. GitHub may start it late."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBanner, {
			status,
			phase,
			live,
			now,
			seenAt,
			nextAt
		}),
		phase === "loading" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 border border-ink p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rule-wait font-mono text-xs tracking-widest text-mute",
					children: "READING THE PUBLISHED LOG"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "rule-wait mt-4 h-px bg-ink" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "rule-wait mt-2 h-px w-2/3 bg-ink" })
			]
		}) : null,
		live ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-6 grid grid-cols-2 border border-ink md:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					k: "Universities",
					v: live.counts.universities,
					hint: `${live.counts.systems} admission systems`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					k: "Sources",
					v: live.counts.sources,
					hint: `${live.counts.checked} checked this cycle`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					k: "Reached",
					v: live.counts.reached,
					hint: `${live.counts.failed} failed · ${live.counts.unchanged} unchanged`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					k: "New links",
					v: live.counts.newDocuments + live.counts.newPages,
					hint: `${live.counts.newDocuments} documents · ${live.counts.newPages} pages`
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RankBars, {
				kicker: "Sources in the file",
				title: "How sources answered",
				caption: "Counted from the published source list. A new document is a link the crawler had not stored. It is not an admission date.",
				empty: "THIS FILE HAS NO SOURCE LIST YET.",
				rows: reachRows
			})
		})] }) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-4xl font-bold uppercase",
					children: "Activity"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-3xl text-sm",
					children: "Only events written by the crawler. Nothing here is simulated. New lines enter when a newer log arrives."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: [
						["all", "All"],
						["discover", "New links"],
						["fetched", "Fetched"],
						["same", "Unchanged"],
						["fail", "Failed"],
						["skip", "Skipped"]
					].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setEventFilter(id),
						className: `h-11 border px-3 font-mono text-xs tracking-widest ${eventFilter === id ? "border-ink bg-ink text-paper" : "border-ink bg-paper"}`,
						children: label
					}, id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
					className: "log-feed filter-swap mt-4 max-h-[32rem] overflow-y-auto border border-ink",
					children: [
						phase === "loading" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "p-4 font-mono text-xs tracking-widest text-mute",
							children: "WAITING FOR THE PUBLISHED LOG."
						}) : null,
						phase !== "loading" && (live?.events.length ?? 0) === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "p-4 font-mono text-xs tracking-widest text-mute",
							children: "NO EVENTS HAVE BEEN RECORDED."
						}) : null,
						phase !== "loading" && (live?.events.length ?? 0) > 0 && events.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "p-4 font-mono text-xs tracking-widest text-mute",
							children: "NO EVENTS MATCH THIS FILTER."
						}) : null,
						events.map(({ event, key }, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: cn("border-b border-ink", eventClass(event), index < 16 && "log-in"),
							style: index < 16 ? { animationDelay: `${index * 24}ms` } : void 0,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
								className: "grid gap-2 px-3 py-2 md:grid-cols-[4.5rem_6.5rem_1fr]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-xs tracking-widest",
										children: EVENT_STAMP[event.type]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("time", {
										className: "font-mono text-xs",
										dateTime: event.at,
										children: [event.at.slice(11, 19), " UTC"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("font-mono text-xs", event.level === "error" || event.type === "fail" ? "text-accent" : ""),
										children: event.message
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "px-3 pb-3 font-mono text-xs leading-relaxed",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									event.type.toUpperCase(),
									" · ",
									event.level.toUpperCase(),
									event.universityId ? ` · ${event.universityId.toUpperCase()}` : ""
								] }), event.url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 truncate",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
										href: event.url,
										children: event.url
									})
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-mute",
									children: "NO URL ON THIS LINE"
								})]
							})] })
						}, key))
					]
				}, eventFilter)
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3 border-b border-ink pb-3 md:flex-row md:items-end md:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-4xl font-bold uppercase",
						children: "Sources"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: query,
						onChange: (event) => setQuery(event.target.value),
						placeholder: "Search university or URL",
						className: "h-11 w-full border border-ink bg-paper px-3 font-sans text-sm md:max-w-xs",
						"aria-label": "Search sources"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: [
						["all", "All"],
						["failed", "Failed"],
						["reached", "Reached"],
						["new", "New links"],
						["unchecked", "Not checked"]
					].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setFilter(id),
						className: `h-11 border px-3 font-mono text-xs tracking-widest ${filter === id ? "border-ink bg-ink text-paper" : "border-ink bg-paper"}`,
						children: label
					}, id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "filter-swap mt-4 border-t border-ink",
					children: [
						phase === "loading" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "py-4 font-mono text-xs text-mute",
							children: "WAITING FOR THE PUBLISHED LOG."
						}) : null,
						phase !== "loading" && live && live.sources.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "py-4 font-mono text-xs text-mute",
							children: "THIS FILE HAS NO SOURCE LIST YET."
						}) : null,
						phase !== "loading" && (live?.sources.length ?? 0) > 0 && sources.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "py-4 font-mono text-xs text-mute",
							children: "NO SOURCES MATCH."
						}) : null,
						sources.map((source) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourceRow, {
							source,
							now
						}, source.id))
					]
				}, filter)
			]
		})
	] });
}
function StatusBanner({ status, phase, live, now, seenAt, nextAt }) {
	const tone = status === "failed" || status === "stale" ? "border-accent text-accent" : "border-ink";
	const liveNow = status === "active";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `border p-4 ${tone}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `inline-block h-3 w-3 border border-current ${liveNow ? "crawl-live bg-accent" : "bg-transparent"}`,
						"aria-hidden": true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-3xl font-bold uppercase leading-none",
						children: phase === "loading" ? "LOADING" : SYSTEM_LABEL[status]
					}),
					liveNow ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs tracking-widest",
						children: "LIVE"
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs tracking-widest",
						children: "TARGET EVERY 45 MIN · NOT A GUARANTEED CLOCK"
					})
				]
			}),
			phase === "loading" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 font-mono text-xs",
				children: "Reading the last published cycle."
			}) : null,
			phase === "missing" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 font-mono text-xs",
				children: "NO DISCOVERY FILE. NOTHING ON THIS PAGE IS A SCAN."
			}) : null,
			live ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 font-mono text-xs leading-relaxed",
				children: [
					"LAST CYCLE ",
					live.completedAt ? `${live.completedAt} · ${relativePast(live.completedAt, now)}` : "NOT FINISHED",
					nextAt ? ` · NEXT EXPECTED ${nextAt.toISOString().slice(0, 16)}Z` : "",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"FILE READ ",
					seenAt ? relativePast(seenAt.toISOString(), now) : "—",
					" · BROWSER CLOCK ",
					now.toISOString().slice(11, 19),
					"Z",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					live.note
				]
			}) : null,
			status === "stale" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 font-mono text-xs",
				children: "THE LAST CYCLE IS OVER 90 MINUTES OLD. IT IS NOT RUNNING NOW."
			}) : null,
			status === "active" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 font-mono text-xs",
				children: "A CYCLE WAS MARKED IN PROGRESS. IF THAT STAMP IS OLD, THIS PAGE WILL NOT KEEP CALLING IT LIVE."
			}) : null
		]
	});
}
function Stat({ k, v, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "border-ink border-r border-b p-4 md:border-b-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-5xl font-bold leading-none",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CountUp, { value: v })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-2 font-display text-lg font-semibold uppercase leading-none",
				children: k
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 font-mono text-xs text-mute",
				children: hint
			})
		]
	});
}
function SourceRow({ source, now }) {
	const bad = [
		"unreachable",
		"retry_scheduled",
		"source_broken"
	].includes(source.reachability);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
		className: cn("border-b border-ink", reachClass(source.reachability)),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
			className: "group",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
				className: "px-3 py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-baseline justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-3xl font-bold uppercase leading-none",
							children: source.shortName
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: `font-mono text-xs tracking-widest ${bad || source.reachability === "new_document" ? "text-accent" : ""}`,
							children: REACH_LABEL[source.reachability]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm",
						children: source.sourceName
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 font-mono text-xs text-mute",
						children: [
							"CHECKED ",
							relativePast(source.lastCheckedAt, now),
							" · OPEN FOR URL AND NOTE"
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-3 pb-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-xs text-mute",
						children: [
							source.kind === "system" ? "ADMISSION SYSTEM · " : "",
							source.type.toUpperCase(),
							source.lastSuccessAt ? ` · LAST SUCCESS ${relativePast(source.lastSuccessAt, now)}` : "",
							source.documentsFound ? ` · DOCUMENTS ${source.documentsFound}` : ""
						]
					}),
					source.url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 truncate font-mono text-xs",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
							href: source.url,
							children: source.url
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-mono text-xs text-mute",
						children: "NO OFFICIAL URL"
					}),
					source.lastDiscoveredDocument ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 truncate font-mono text-xs",
						children: ["LAST DOCUMENT ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
							href: source.lastDiscoveredDocument,
							children: source.lastDiscoveredDocument
						})]
					}) : null,
					source.error || source.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm",
						children: [source.error ? `${source.error}. ` : "", source.note]
					}) : null
				]
			})]
		})
	});
}
//#endregion
export { DiscoveryPage as component };
