import { i as __toESM } from "../_runtime.mjs";
import { n as cn } from "./cn-D6R9yezT.mjs";
import { C as require_jsx_runtime, X as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as ExternalLink } from "./marks-BXE2ueSK.mjs";
import { t as createServerFn } from "./ssr.mjs";
import { t as createSsrRpc } from "./createSsrRpc-C1p7zOu_.mjs";
import { n as nextWireAt, r as wireDeskStatus, t as isWireLive } from "./gate-B1XciLmY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/newswire-DJ470Xmh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var fetchPublishedWire = createServerFn({ method: "POST" }).handler(createSsrRpc("c2b7300fbadeeb6dd993af171e1a24a60f9d11bac88e02bf5c40648cb3d45619"));
async function pullLocal() {
	try {
		const response = await fetch(`/wire/live.json?t=${Date.now()}`, { cache: "no-store" });
		if (!response.ok) return null;
		const json = await response.json();
		return isWireLive(json) ? json : null;
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
function useWire() {
	const [live, setLive] = (0, import_react.useState)(null);
	const [phase, setPhase] = (0, import_react.useState)("loading");
	const [seenAt, setSeenAt] = (0, import_react.useState)(null);
	const [arrivedAt, setArrivedAt] = (0, import_react.useState)(null);
	const [freshIds, setFreshIds] = (0, import_react.useState)([]);
	const [reloadNote, setReloadNote] = (0, import_react.useState)(null);
	const [reloading, setReloading] = (0, import_react.useState)(false);
	const liveRef = (0, import_react.useRef)(null);
	const seenIds = (0, import_react.useRef)(/* @__PURE__ */ new Set());
	const booted = (0, import_react.useRef)(false);
	const lastReload = (0, import_react.useRef)(0);
	const load = (0, import_react.useCallback)(async (manual) => {
		if (manual) {
			const nowMs = Date.now();
			if (nowMs - lastReload.current < 2e4) {
				setReloadNote("Reload is limited to once every 20 seconds. The file was not read again.");
				return;
			}
			lastReload.current = nowMs;
			setReloading(true);
		}
		const before = liveRef.current?.generatedAt ?? null;
		const local = await pullLocal();
		let remote = null;
		try {
			remote = await fetchPublishedWire();
		} catch {
			remote = null;
		}
		const next = newer(local, remote);
		setSeenAt(/* @__PURE__ */ new Date());
		if (!next) {
			setPhase((current) => current === "ready" ? "ready" : "missing");
			if (manual) {
				setReloadNote("No wire file came back. This was not a refresh.");
				setReloading(false);
			}
			return;
		}
		const ids = next.items.map((item) => item.id);
		if (booted.current) setFreshIds(ids.filter((id) => !seenIds.current.has(id)));
		else {
			booted.current = true;
			setFreshIds([]);
		}
		for (const id of ids) seenIds.current.add(id);
		if (before != null && next.generatedAt !== before) setArrivedAt(Date.now());
		liveRef.current = next;
		setLive(next);
		setPhase("ready");
		if (manual) {
			setReloadNote(next.generatedAt === before ? "No newer wire. The published file is unchanged." : "A newer published wire arrived.");
			setReloading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		load(false);
		const poll = window.setInterval(() => void load(false), 6e4);
		return () => window.clearInterval(poll);
	}, [load]);
	(0, import_react.useEffect)(() => {
		if (!arrivedAt) return;
		const timer = window.setTimeout(() => setArrivedAt(null), 8e3);
		return () => window.clearTimeout(timer);
	}, [arrivedAt]);
	return {
		live,
		phase,
		seenAt,
		arrivedAt,
		freshIds,
		reloadNote,
		reloading,
		reload: () => void load(true)
	};
}
var VERIFY = {
	official: "OFFICIAL",
	reported: "REPORTED",
	community: "COMMUNITY",
	unverified: "UNVERIFIED",
	corrected: "CORRECTED"
};
var DESK = {
	never: "NO WIRE YET",
	running: "CYCLE RUNNING",
	current: "ON SCHEDULE",
	late: "UPDATE LATE",
	stale: "WIRE IS STALE",
	failed: "LAST CYCLE FAILED",
	degraded: "SOME SOURCES FAILED"
};
function formatWireWhen(iso) {
	if (!iso) return "NO PUBLICATION TIME";
	const then = Date.parse(iso);
	if (Number.isNaN(then)) return "NO PUBLICATION TIME";
	return `${new Intl.DateTimeFormat("en-GB", {
		timeZone: "Asia/Dhaka",
		day: "2-digit",
		month: "short",
		hour: "2-digit",
		minute: "2-digit",
		hourCycle: "h23"
	}).format(then)} DHAKA`;
}
function ago(iso, now) {
	if (!iso) return "NEVER";
	const then = Date.parse(iso);
	if (Number.isNaN(then)) return "UNKNOWN";
	const minutes = Math.floor(Math.max(0, now.getTime() - then) / 6e4);
	if (minutes < 1) return "JUST NOW";
	if (minutes < 60) return `${minutes} MIN AGO`;
	const hours = Math.floor(minutes / 60);
	if (hours < 48) return `${hours} HR AGO`;
	const days = Math.floor(hours / 24);
	return `${days} DAY${days === 1 ? "" : "S"} AGO`;
}
function kindLabel(item) {
	if (item.origin === "manual") return "MANUAL";
	if (item.sourceId.startsWith("udvash") || item.sourceId.startsWith("acs") || item.sourceId.startsWith("apars") || item.sourceId.startsWith("fb-apars") || item.sourceId === "fb-udvash") return "COACHING";
	if (item.sourceCategory === "news") return "NEWSROOM";
	if (item.sourceCategory === "community") return "COMMUNITY";
	return "INSTITUTION";
}
function caveat(item) {
	if (item.verification === "reported") return "News report. Not the original circular.";
	if (item.verification === "community" || item.verification === "unverified") return "Not an official announcement.";
	if (kindLabel(item) === "COACHING") return "Coaching announcement. Not a university circular.";
	if (item.verification === "corrected") return "Correction from the institution. Read the source.";
	return null;
}
function WireHeadline({ item, fresh, now }) {
	const alert = item.importance === "official-alert";
	const note = caveat(item);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: cn("border-b border-ink px-3 py-2", alert && "border-l-4 border-l-accent bg-panel", fresh && "wire-in"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-baseline gap-x-3 gap-y-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs text-mute",
					children: item.publishedAt ? formatWireWhen(item.publishedAt) : "PUBLICATION TIME NOT ON THE SOURCE"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: cn("font-mono text-xs tracking-widest", alert ? "text-accent" : "text-ink"),
					children: [
						VERIFY[item.verification],
						" · ",
						kindLabel(item)
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-1 font-display text-xl font-bold uppercase leading-tight md:text-2xl",
				children: item.headline
			}),
			item.summary ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 max-w-4xl text-sm text-pretty",
				children: item.summary
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 font-mono text-xs text-mute",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
						href: item.sourceUrl,
						children: item.sourceName
					}),
					" · FOUND ",
					ago(item.discoveredAt, now),
					note ? ` · ${note}` : ""
				]
			})
		]
	});
}
function WireStrip() {
	const { live, phase, arrivedAt } = useWire();
	const now = /* @__PURE__ */ new Date();
	const status = wireDeskStatus(phase === "ready" ? live : null, now);
	const items = (live?.items ?? []).slice(0, 5);
	const next = nextWireAt(live);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "wire",
		className: "window desk-anchor mt-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3 border-b border-ink px-3 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs tracking-widest text-accent",
					children: "ADMISSION SEASON NEWSWIRE"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 font-display text-4xl font-bold uppercase leading-none",
					children: "The wire"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/newswire",
					className: "font-mono text-xs tracking-widest underline underline-offset-4",
					children: "FULL WIRE"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-3 border-b border-ink px-3 py-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("inline-block h-3 w-3 border border-ink", status === "running" || arrivedAt != null ? "wire-live bg-accent" : "bg-transparent"),
						"aria-hidden": true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: cn("font-mono text-xs tracking-widest", status === "failed" || status === "stale" || status === "late" ? "text-accent" : "text-mute"),
						children: phase === "loading" ? "READING THE WIRE" : DESK[status]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-xs text-mute",
						children: [live?.completedAt ? `LAST CYCLE ${ago(live.completedAt, now)}` : "NO COMPLETED CYCLE", next ? ` · NEXT EXPECTED ${formatWireWhen(next.toISOString())}` : ""]
					})
				]
			}),
			phase === "missing" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-3 py-4 font-mono text-xs tracking-widest text-mute",
				children: "NO WIRE FILE. NOTHING HERE IS A HEADLINE."
			}) : null,
			items.length === 0 && phase === "ready" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-3 py-4 font-mono text-xs tracking-widest text-mute",
				children: "NO ADMISSION HEADLINE IS IN THE PUBLISHED WIRE."
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn(arrivedAt ? "filter-swap" : void 0),
				children: items.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [!item.publishedAt && (index === 0 || items[index - 1]?.publishedAt) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "border-b border-ink bg-ink px-3 py-2 font-mono text-xs tracking-widest text-paper",
					children: "NO PUBLICATION TIME ON THE SOURCE"
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WireHeadline, {
					item,
					fresh: Boolean(arrivedAt),
					now
				})] }, item.id))
			})
		]
	});
}
//#endregion
export { useWire as a, formatWireWhen as i, WireStrip as n, ago as r, WireHeadline as t };
