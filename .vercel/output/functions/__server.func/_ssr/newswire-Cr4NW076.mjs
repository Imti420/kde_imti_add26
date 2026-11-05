import { i as __toESM } from "../_runtime.mjs";
import { n as cn } from "./cn-D6R9yezT.mjs";
import { C as require_jsx_runtime, X as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as PageHead } from "./marks-BXE2ueSK.mjs";
import { n as nextWireAt, r as wireDeskStatus } from "./gate-B1XciLmY.mjs";
import { a as useWire, i as formatWireWhen, r as ago, t as WireHeadline } from "./newswire-DJ470Xmh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/newswire-Cr4NW076.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var NAMED = {
	amp: "&",
	lt: "<",
	gt: ">",
	quot: "\"",
	apos: "'",
	nbsp: " ",
	mdash: "—",
	ndash: "–",
	hellip: "…",
	lsquo: "‘",
	rsquo: "’",
	ldquo: "“",
	rdquo: "”"
};
function safeChar(code) {
	if (!Number.isFinite(code) || code < 32 || code > 1114111 || code >= 55296 && code <= 57343) return " ";
	return String.fromCodePoint(code);
}
/** Strip markup and decode entities. Does not rewrite wording. */
function decodeEntities(raw) {
	return raw.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").replace(/<[^>]+>/g, " ").replace(/&#x([0-9a-f]+);/gi, (_, hex) => safeChar(Number.parseInt(hex, 16))).replace(/&#(\d+);/g, (_, dec) => safeChar(Number.parseInt(dec, 10))).replace(/&([a-z]+);/gi, (match, name) => NAMED[name.toLowerCase()] ?? match).replace(/\s+/g, " ").trim();
}
var MONTHS = {
	jan: 0,
	feb: 1,
	mar: 2,
	apr: 3,
	may: 4,
	jun: 5,
	jul: 6,
	aug: 7,
	sep: 8,
	oct: 9,
	nov: 10,
	dec: 11
};
/**
* Parse a feed timestamp. Returns ISO or null.
* A missing or unreadable date stays null — it is never replaced with "now".
*/
function parseFeedDate(raw) {
	if (!raw) return null;
	const text = decodeEntities(raw).replace(/\s+/g, " ").trim();
	if (!text) return null;
	const direct = Date.parse(text);
	if (Number.isFinite(direct)) {
		const parsed = new Date(direct);
		if (parsed.getUTCFullYear() >= 2e3 && parsed.getUTCFullYear() <= 2100) return parsed.toISOString();
	}
	const match = text.match(/^(?:[A-Za-z]{3},?\s+)?(\d{1,2})\s+([A-Za-z]{3})\s+(\d{2,4})(?:\s+(\d{2}):(\d{2})(?::(\d{2}))?)?(?:\s*(GMT|UTC|Z|[+-]\d{4}))?$/);
	if (!match) return null;
	const month = MONTHS[match[2].toLowerCase()];
	if (month == null) return null;
	let year = Number(match[3]);
	if (match[3].length === 2) year += year >= 70 ? 1900 : 2e3;
	const day = Number(match[1]);
	const hour = Number(match[4] ?? "0");
	const minute = Number(match[5] ?? "0");
	const second = Number(match[6] ?? "0");
	const zone = match[7] ?? "Z";
	let offsetMin = 0;
	if (zone !== "GMT" && zone !== "UTC" && zone !== "Z") {
		const sign = zone.startsWith("-") ? -1 : 1;
		const digits = zone.slice(1);
		offsetMin = sign * (Number(digits.slice(0, 2)) * 60 + Number(digits.slice(2)));
	}
	const utc = Date.UTC(year, month, day, hour, minute, second) - offsetMin * 6e4;
	const parsed = new Date(utc);
	if (Number.isNaN(parsed.getTime())) return null;
	if (parsed.getUTCFullYear() < 1990 || parsed.getUTCFullYear() > 2100) return null;
	return parsed.toISOString();
}
var FILTERS = [
	"all",
	"official",
	"reported",
	"community",
	"unverified",
	"corrected"
];
var DESK = {
	never: "NO WIRE YET",
	running: "CYCLE RUNNING",
	current: "ON SCHEDULE",
	late: "UPDATE LATE",
	stale: "WIRE IS STALE",
	failed: "LAST CYCLE FAILED",
	degraded: "SOME SOURCES FAILED"
};
var STATUS_LABEL = {
	not_yet_checked: "NOT CHECKED",
	ok: "REACHED",
	no_change: "NO CHANGE",
	empty: "NO FEED",
	unreachable: "UNREACHABLE",
	blocked: "BLOCKED",
	not_authorised: "NOT AUTHORISED",
	manual_only: "MANUAL ONLY"
};
var DESK_KEY = "admission26.wire.desk.v1";
function readDesk() {
	try {
		const parsed = JSON.parse(localStorage.getItem(DESK_KEY) ?? "[]");
		if (!Array.isArray(parsed)) return [];
		return parsed.filter((row) => {
			if (!row || typeof row !== "object") return false;
			const item = row;
			return typeof item.headline === "string" && typeof item.url === "string" && (item.verification === "community" || item.verification === "unverified");
		});
	} catch {
		return [];
	}
}
function NewswirePage() {
	const { live, phase, seenAt, arrivedAt, freshIds, reloadNote, reloading, reload } = useWire();
	const [now, setNow] = (0, import_react.useState)(() => /* @__PURE__ */ new Date());
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [query, setQuery] = (0, import_react.useState)("");
	const [desk, setDesk] = (0, import_react.useState)([]);
	const [headline, setHeadline] = (0, import_react.useState)("");
	const [url, setUrl] = (0, import_react.useState)("");
	const [sourceName, setSourceName] = (0, import_react.useState)("");
	const [published, setPublished] = (0, import_react.useState)("");
	const [verification, setVerification] = (0, import_react.useState)("unverified");
	const [formNote, setFormNote] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		setDesk(readDesk());
		const clock = window.setInterval(() => setNow(/* @__PURE__ */ new Date()), 3e4);
		return () => window.clearInterval(clock);
	}, []);
	const status = wireDeskStatus(phase === "ready" ? live : null, now);
	const next = nextWireAt(live);
	const pulsing = status === "running" || arrivedAt != null;
	const deskItems = (0, import_react.useMemo)(() => desk.map((item) => ({
		id: item.id,
		headline: item.headline,
		summary: "Saved on this desk only. It is not in the shared wire.",
		sourceId: "desk",
		sourceName: item.sourceName,
		sourceUrl: item.url,
		sourceCategory: "community",
		platform: "web",
		verification: item.verification,
		publishedAt: item.publishedAt,
		discoveredAt: item.addedAt,
		contentHash: item.id,
		importance: "normal",
		origin: "manual"
	})), [desk]);
	const rows = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		return [...live?.items ?? [], ...deskItems].filter((item) => {
			if (filter !== "all" && item.verification !== filter) return false;
			if (!q) return true;
			return [
				item.headline,
				item.summary ?? "",
				item.sourceName,
				item.verification
			].join(" ").toLowerCase().includes(q);
		});
	}, [
		live,
		deskItems,
		filter,
		query
	]);
	const saveDesk = (event) => {
		event.preventDefault();
		const cleanHeadline = headline.replace(/\s+/g, " ").trim();
		const cleanUrl = url.trim();
		if (cleanHeadline.length < 8 || cleanHeadline.length > 300) {
			setFormNote("Headline must be the original wording, 8 to 300 characters.");
			return;
		}
		if (!/^https?:\/\//i.test(cleanUrl)) {
			setFormNote("A public http or https link is required.");
			return;
		}
		const nextItem = {
			id: `desk-${Date.now().toString(36)}`,
			headline: cleanHeadline,
			url: cleanUrl,
			sourceName: sourceName.trim() || "Public link",
			publishedAt: published.trim() ? parseFeedDate(published.trim()) : null,
			verification,
			addedAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		if (published.trim() && !nextItem.publishedAt) {
			setFormNote("That publication time could not be read, so it was not stored. Leave it blank rather than guess.");
			return;
		}
		const stored = [nextItem, ...desk].slice(0, 30);
		localStorage.setItem(DESK_KEY, JSON.stringify(stored));
		setDesk(stored);
		setHeadline("");
		setUrl("");
		setSourceName("");
		setPublished("");
		setFormNote("Saved on this desk. It is not an official circular and it is not shared.");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			kicker: "ADMISSION SEASON · 55-MINUTE CYCLE",
			title: "Newswire",
			lede: "Headlines from public admission sources. A news report is not a circular. A community note is not an official announcement. Facebook pages in the registry are listed, not monitored.",
			aside: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "h-11 border border-ink px-4 font-mono text-xs tracking-widest hover:bg-ink hover:text-paper disabled:opacity-50",
				onClick: reload,
				disabled: reloading,
				children: reloading ? "READING" : "RELOAD WIRE"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 border border-ink px-3 py-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("inline-block h-3 w-3 border border-ink", pulsing ? "wire-live bg-accent" : "bg-transparent"),
						"aria-hidden": true
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: cn("font-display text-3xl font-bold uppercase leading-none", status === "failed" || status === "stale" || status === "late" ? "text-accent" : ""),
						children: phase === "loading" ? "READING" : DESK[status]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 font-mono text-xs leading-relaxed text-mute",
					children: live?.note ?? "No published note."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 font-mono text-xs text-mute",
					children: [
						"LAST CYCLE ",
						live?.completedAt ? `${formatWireWhen(live.completedAt)} · ${ago(live.completedAt, now)}` : "NEVER",
						" · ",
						"NEXT EXPECTED ",
						next ? formatWireWhen(next.toISOString()) : "UNKNOWN",
						seenAt ? ` · THIS DESK READ THE FILE ${ago(seenAt.toISOString(), now)}` : ""
					]
				}),
				status === "late" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 font-mono text-xs tracking-widest text-accent",
					children: "THE 55-MINUTE MARK HAS PASSED. NO NEWER FILE HAS BEEN PUBLISHED."
				}) : null,
				status === "stale" || status === "failed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 font-mono text-xs tracking-widest text-accent",
					children: "THIS WIRE IS NOT CURRENT. FAILED OR LATE RUNS ARE NOT SHOWN AS A FRESH SCAN."
				}) : null,
				reloadNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 font-mono text-xs text-ink",
					children: reloadNote
				}) : null,
				arrivedAt ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 font-mono text-xs tracking-widest text-accent",
					children: "NEW WIRE ARRIVED"
				}) : null
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-col gap-2 md:flex-row",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "sr-only",
					htmlFor: "wire-search",
					children: "Filter headlines"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					id: "wire-search",
					value: query,
					onChange: (event) => setQuery(event.target.value),
					placeholder: "FILTER HEADLINES",
					className: "h-11 flex-1 border border-ink bg-paper px-3 font-mono text-xs uppercase tracking-widest outline-none placeholder:text-mute"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2 overflow-x-auto",
					role: "tablist",
					"aria-label": "Verification",
					children: FILTERS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						role: "tab",
						"aria-selected": filter === item,
						className: cn("h-11 shrink-0 border border-ink px-3 font-mono text-xs tracking-widest", filter === item ? "bg-ink text-paper" : "bg-paper"),
						onClick: () => setFilter(item),
						children: item.toUpperCase()
					}, item))
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "filter-swap border border-ink",
			children: [
				phase === "loading" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rule-wait px-3 py-4 font-mono text-xs tracking-widest text-mute",
					children: "READING THE PUBLISHED WIRE."
				}) : null,
				phase !== "loading" && rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "px-3 py-4 font-mono text-xs tracking-widest text-mute",
					children: "NOTHING IN THIS FILTER. THE WIRE WAS NOT FILLED IN."
				}) : null,
				rows.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [!item.publishedAt && rows.slice(0, index).some((row) => row.publishedAt) && (index === 0 || rows[index - 1]?.publishedAt) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "border-b border-ink bg-ink px-3 py-2 font-mono text-xs tracking-widest text-paper",
					children: "NO PUBLICATION TIME ON THE SOURCE"
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WireHeadline, {
					item,
					fresh: freshIds.includes(item.id),
					now
				})] }, item.id))
			]
		}, `${filter}|${query}`),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-4xl font-bold uppercase leading-none",
					children: "Source registry"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-3xl text-sm",
					children: "A source is monitored only after an authorised read succeeds. Facebook pages and groups stay closed until a Meta app token is approved for that Page or installed by a group admin. Manual links stay on this desk."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 border border-ink",
					children: [(live?.sources ?? []).map((source) => {
						const closed = source.status === "not_authorised" || source.status === "manual_only";
						const bad = source.status === "blocked" || source.status === "unreachable" || source.status === "empty";
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: cn("border-b border-ink px-3 py-3", closed || bad ? "border-l-4 border-l-accent" : "border-l-4 border-l-ink"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-mono text-xs tracking-widest text-mute",
									children: [
										source.category.toUpperCase(),
										" · ",
										source.platform.toUpperCase(),
										" · ",
										source.accessMethod.toUpperCase(),
										" · ",
										source.automatedAuthorised ? "AUTO AUTHORISED" : "AUTO NOT AUTHORISED"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-1 font-display text-2xl font-bold uppercase leading-none",
									children: source.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: cn("mt-1 font-mono text-xs tracking-widest", closed || bad ? "text-accent" : ""),
									children: [
										STATUS_LABEL[source.status],
										source.httpStatus ? ` · HTTP ${source.httpStatus}` : "",
										" · LAST SUCCESS ",
										source.lastSuccessAt ? formatWireWhen(source.lastSuccessAt) : "NEVER",
										source.itemsFound ? ` · ${source.itemsFound} KEPT` : ""
									]
								}),
								source.error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 font-mono text-xs text-accent",
									children: source.error
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-pretty",
									children: source.note
								}),
								source.url.startsWith("http") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 font-mono text-xs",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: source.url,
										target: "_blank",
										rel: "noreferrer",
										className: "underline underline-offset-4",
										children: source.url
									})
								}) : null
							]
						}, source.id);
					}), phase === "ready" && (live?.sources.length ?? 0) === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "px-3 py-4 font-mono text-xs text-mute",
						children: "THE WIRE FILE HAS NO SOURCE ROWS."
					}) : null]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8 border border-ink p-3 md:p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl font-bold uppercase leading-none",
					children: "Record a public link"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-3xl text-sm",
					children: "For a Facebook post or group note that cannot be read automatically. It is stored in this browser, marked community or unverified, and never becomes a circular."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "mt-3 grid gap-2",
					onSubmit: saveDesk,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: headline,
							onChange: (event) => setHeadline(event.target.value),
							placeholder: "ORIGINAL HEADLINE",
							className: "h-11 border border-ink bg-paper px-3 font-mono text-xs outline-none"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: url,
							onChange: (event) => setUrl(event.target.value),
							placeholder: "PUBLIC URL",
							className: "h-11 border border-ink bg-paper px-3 font-mono text-xs outline-none",
							inputMode: "url"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: sourceName,
							onChange: (event) => setSourceName(event.target.value),
							placeholder: "SOURCE NAME",
							className: "h-11 border border-ink bg-paper px-3 font-mono text-xs outline-none"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: published,
							onChange: (event) => setPublished(event.target.value),
							placeholder: "PUBLICATION TIME, IF THE SOURCE PRINTS ONE",
							className: "h-11 border border-ink bg-paper px-3 font-mono text-xs outline-none"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex gap-2",
							children: ["unverified", "community"].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: cn("h-11 flex-1 border border-ink font-mono text-xs tracking-widest", verification === item ? "bg-ink text-paper" : ""),
								onClick: () => setVerification(item),
								children: item.toUpperCase()
							}, item))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "h-11 border border-ink font-mono text-xs tracking-widest hover:bg-ink hover:text-paper",
							children: "SAVE ON THIS DESK"
						}),
						formNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs",
							children: formNote
						}) : null
					]
				})
			]
		})
	] });
}
//#endregion
export { NewswirePage as component };
