import { i as __toESM } from "../_runtime.mjs";
import { n as cn } from "./cn-D6R9yezT.mjs";
import { C as require_jsx_runtime, X as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/viz-C16qtz8v.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function usePrefersReducedMotion() {
	const [reduced, setReduced] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const media = window.matchMedia("(prefers-reduced-motion: reduce)");
		const apply = () => setReduced(media.matches);
		apply();
		media.addEventListener("change", apply);
		return () => media.removeEventListener("change", apply);
	}, []);
	return reduced;
}
function CountUp({ value, pad = 2 }) {
	const reduced = usePrefersReducedMotion();
	const [display, setDisplay] = (0, import_react.useState)(value);
	(0, import_react.useEffect)(() => {
		if (reduced) {
			setDisplay(value);
			return;
		}
		let raf = 0;
		let start = null;
		const tick = (now) => {
			if (start == null) start = now;
			const p = Math.min(1, (now - start) / 780);
			const eased = 1 - (1 - p) ** 3;
			setDisplay(Math.round(value * eased));
			if (p < 1) raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, [reduced, value]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "tabular-nums",
		children: String(display).padStart(pad, "0")
	});
}
function Reveal({ index = 0, className, children, style }) {
	const delay = Math.min(index, 12) * 50;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn(index < 12 ? "rise" : void 0, className),
		style: {
			...style,
			animationDelay: `${delay}ms`
		},
		children
	});
}
function useDraw() {
	const reduced = usePrefersReducedMotion();
	const [on, setOn] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (reduced) {
			setOn(true);
			return;
		}
		const id = requestAnimationFrame(() => setOn(true));
		return () => cancelAnimationFrame(id);
	}, [reduced]);
	return on;
}
function Plate({ kicker, title, caption, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "window flex h-full flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "window-bar",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: kicker })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "window-body flex flex-1 flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-3xl font-bold uppercase leading-none",
					children: title
				}),
				caption ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-pretty",
					children: caption
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 flex-1",
					children
				})
			]
		})]
	});
}
function RankBars({ kicker, title, caption, rows, empty }) {
	const on = useDraw();
	const visible = rows.filter((row) => row.value > 0);
	const max = Math.max(1, ...visible.map((row) => row.value));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plate, {
		kicker,
		title,
		caption,
		children: visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "border border-dashed border-ink px-3 py-4 font-mono text-xs tracking-widest text-mute",
			children: empty
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", { children: visible.map((row) => {
			const pct = Math.max(4, Math.round(row.value / max * 100));
			const peak = row.value === max;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "border-t border-ink py-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-lg font-semibold uppercase leading-none",
							children: row.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-xs tabular-nums",
							children: String(row.value).padStart(2, "0")
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1.5 h-2 border border-ink",
						"aria-hidden": true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("h-full transition-[width] duration-700 ease-out", peak ? "bg-accent" : "bg-ink"),
							style: { width: on ? `${pct}%` : "0%" }
						})
					}),
					row.hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-mono text-xs text-mute",
						children: row.hint
					}) : null
				]
			}, row.id);
		}) })
	});
}
function SplitMeter({ kicker, title, caption, parts, empty }) {
	const on = useDraw();
	const total = parts.reduce((sum, part) => sum + part.value, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plate, {
		kicker,
		title,
		caption,
		children: total === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "border border-dashed border-ink px-3 py-4 font-mono text-xs tracking-widest text-mute",
			children: empty
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex h-8 border border-ink",
			"aria-hidden": true,
			children: parts.filter((part) => part.value > 0).map((part) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("h-full border-r border-paper transition-[width] duration-700 ease-out last:border-r-0", part.tone === "accent" && "bg-accent", part.tone === "ink" && "bg-ink", part.tone === "mute" && "bg-mute", part.tone === "panel" && "bg-panel"),
				style: { width: on ? `${part.value / total * 100}%` : "0%" }
			}, part.id))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-3 space-y-1",
			children: parts.map((part) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-baseline justify-between gap-3 font-mono text-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "tracking-widest",
					children: part.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "tabular-nums",
					children: [String(part.value).padStart(2, "0"), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-mute",
						children: [
							" · ",
							total ? Math.round(part.value / total * 100) : 0,
							"%"
						]
					})]
				})]
			}, part.id))
		})] })
	});
}
function Proximity({ kicker, title, caption, rows, empty }) {
	const on = useDraw();
	const max = Math.max(1, ...rows.map((row) => row.days), 1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plate, {
		kicker,
		title,
		caption,
		children: rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "border border-dashed border-ink px-3 py-4 font-mono text-xs tracking-widest text-mute",
			children: empty
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", { children: rows.map((row) => {
			const pct = Math.max(8, Math.round((1 - row.days / max) * 100));
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "border-t border-ink py-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-baseline justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-xl font-bold uppercase leading-none",
						children: row.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("font-mono text-xs", row.hot ? "text-accent" : "text-mute"),
						children: row.meta
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1.5 h-1.5 border border-ink",
					"aria-hidden": true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("h-full transition-[width] duration-700 ease-out", row.hot ? "bg-accent" : "bg-ink"),
						style: { width: on ? `${pct}%` : "0%" }
					})
				})]
			}, row.id);
		}) })
	});
}
function SeatPlate({ known, missing, rows }) {
	if (known === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Plate, {
		kicker: "Seats · not estimated",
		title: "No verified seat count",
		caption: `${missing} circular${missing === 1 ? "" : "s"} on file. None record a seat total. A distribution would be fiction, so the plate stays empty.`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-7xl font-bold leading-none text-mute",
			children: "—"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 font-mono text-xs tracking-widest text-mute",
			children: "NOT ON FILE · NOT GUESSED"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RankBars, {
		kicker: "Seats · verified only",
		title: "Where seats are on file",
		caption: `${known} circular${known === 1 ? "" : "s"} name a seat total. ${missing} still do not, and they are left off this chart.`,
		empty: "NO VERIFIED SEAT COUNT.",
		rows: rows.map((row) => ({
			id: row.id,
			label: row.label,
			value: row.seats
		}))
	});
}
//#endregion
export { SeatPlate as a, Reveal as i, Proximity as n, SplitMeter as o, RankBars as r, CountUp as t };
