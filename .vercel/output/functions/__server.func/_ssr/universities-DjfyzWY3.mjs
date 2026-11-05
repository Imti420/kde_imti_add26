import { i as __toESM } from "../_runtime.mjs";
import { i as formatDay } from "./cn-D6R9yezT.mjs";
import { C as require_jsx_runtime, X as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as useCatalog, y as TRACK_LABEL } from "./router-DRETjPZG.mjs";
import { a as PageHead, l as controlClass, m as nextRelevantDay, s as StatusPill, u as deriveStatus } from "./marks-BXE2ueSK.mjs";
import { t as UniversityCard } from "./university-card-DLC4D2LA.mjs";
import { o as SplitMeter, r as RankBars, t as CountUp } from "./viz-C16qtz8v.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/universities-DjfyzWY3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TRACKS = ["all", ...Object.keys(TRACK_LABEL)];
function UniversitiesPage() {
	const { universities, circulars } = useCatalog();
	const [q, setQ] = (0, import_react.useState)("");
	const [track, setTrack] = (0, import_react.useState)("all");
	const [status, setStatus] = (0, import_react.useState)("all");
	const [sort, setSort] = (0, import_react.useState)("name");
	const [engineeringOnly, setEngineeringOnly] = (0, import_react.useState)(false);
	const [view, setView] = (0, import_react.useState)("cards");
	const rows = (0, import_react.useMemo)(() => {
		const query = q.trim().toLowerCase();
		const mapped = universities.map((uni) => {
			const related = circulars.filter((item) => item.universityId === uni.id).sort((a, b) => b.updatedOn.localeCompare(a.updatedOn));
			const primary = related[0] ?? null;
			return {
				uni,
				related,
				primary,
				appStatus: primary ? deriveStatus(primary) : "not_announced",
				next: primary ? nextRelevantDay(primary) : null
			};
		}).filter(({ uni, appStatus }) => {
			if (track !== "all" && uni.track !== track) return false;
			if (engineeringOnly && uni.track !== "engineering" && !uni.tags.includes("engineering")) return false;
			if (status !== "all" && appStatus !== status) return false;
			if (!query) return true;
			return [
				uni.name,
				uni.shortName,
				uni.nameBn,
				uni.city,
				uni.id
			].join(" ").toLowerCase().includes(query);
		});
		mapped.sort((a, b) => {
			if (sort === "deadline") return (a.next ?? "9999").localeCompare(b.next ?? "9999");
			if (sort === "city") return a.uni.city.localeCompare(b.uni.city) || a.uni.name.localeCompare(b.uni.name);
			if (sort === "short") return a.uni.shortName.localeCompare(b.uni.shortName);
			return a.uni.name.localeCompare(b.uni.name);
		});
		return mapped;
	}, [
		universities,
		circulars,
		q,
		track,
		status,
		sort,
		engineeringOnly
	]);
	const withCircular = rows.filter((row) => row.primary).length;
	const withUnits = rows.filter((row) => (row.primary?.units.length ?? 0) > 0).length;
	const withSeats = rows.filter((row) => row.primary?.seats != null).length;
	const trackRows = Object.keys(TRACK_LABEL).map((id) => ({
		id,
		label: TRACK_LABEL[id],
		value: rows.filter((row) => row.uni.track === id).length
	})).filter((row) => row.value > 0);
	const statusParts = [
		{
			id: "open",
			label: "OPEN",
			value: rows.filter((row) => row.appStatus === "open").length,
			tone: "accent"
		},
		{
			id: "upcoming",
			label: "UPCOMING",
			value: rows.filter((row) => row.appStatus === "upcoming").length,
			tone: "ink"
		},
		{
			id: "closed",
			label: "CLOSED",
			value: rows.filter((row) => row.appStatus === "closed").length,
			tone: "mute"
		},
		{
			id: "blank",
			label: "NOT ANNOUNCED",
			value: rows.filter((row) => row.appStatus === "not_announced").length,
			tone: "panel"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			kicker: "Directory",
			title: "All universities",
			lede: "Every public university on the UGC list is here, plus the three national admission systems and a set of private universities. A missing circular, seat count or subject list stays blank."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 border border-ink p-3 md:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "md:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-xs tracking-widest text-mute",
						children: "SEARCH"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: controlClass,
						value: q,
						onChange: (e) => setQ(e.target.value),
						placeholder: "Name, short name, city"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-xs tracking-widest text-mute",
					children: "CATEGORY"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					className: controlClass,
					value: track,
					onChange: (e) => setTrack(e.target.value),
					children: TRACKS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: item,
						children: item === "all" ? "ALL CATEGORIES" : TRACK_LABEL[item].toUpperCase()
					}, item))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-xs tracking-widest text-mute",
					children: "STATUS"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					className: controlClass,
					value: status,
					onChange: (e) => setStatus(e.target.value),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "all",
							children: "ALL STATUSES"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "open",
							children: "OPEN"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "upcoming",
							children: "UPCOMING"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "closed",
							children: "CLOSED"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "not_announced",
							children: "NOT ANNOUNCED"
						})
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-xs tracking-widest text-mute",
					children: "SORT"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					className: controlClass,
					value: sort,
					onChange: (e) => setSort(e.target.value),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "name",
							children: "UNIVERSITY NAME"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "short",
							children: "SHORT NAME"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "deadline",
							children: "NEAREST DATE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "city",
							children: "CITY"
						})
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex h-11 items-center gap-2 border border-ink px-3 font-mono text-xs tracking-widest",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: engineeringOnly,
						onChange: (e) => setEngineeringOnly(e.target.checked)
					}), "ENGINEERING INCL. PRIVATE"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex h-11 border border-ink md:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setView("cards"),
						className: `flex-1 font-mono text-xs tracking-widest ${view === "cards" ? "bg-ink text-paper" : ""}`,
						children: "CARDS"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setView("ledger"),
						className: `flex-1 border-l border-ink font-mono text-xs tracking-widest ${view === "ledger" ? "bg-ink text-paper" : ""}`,
						children: "LEDGER"
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 grid grid-cols-2 border border-ink md:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViewStat, {
					k: "In view",
					v: rows.length,
					hint: "After the filters"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViewStat, {
					k: "With a circular",
					v: withCircular,
					hint: "At least one notice"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViewStat, {
					k: "Units named",
					v: withUnits,
					hint: "Subject list on file"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViewStat, {
					k: "Seats verified",
					v: withSeats,
					hint: withSeats ? "On a circular" : "None in this view"
				})
			]
		}),
		rows.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 grid gap-4 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RankBars, {
				kicker: "This view",
				title: "Category mix",
				caption: "Headcount of the records currently on screen. Filtering changes the chart. It is not a seat chart.",
				empty: "NO RECORDS IN THIS VIEW.",
				rows: trackRows
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SplitMeter, {
				kicker: "This view",
				title: "Admission status",
				caption: "Status comes from dates on the latest circular. No circular means not announced.",
				empty: "NO RECORDS IN THIS VIEW.",
				parts: statusParts
			})]
		}) : null,
		rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 border border-ink p-4 font-mono text-xs",
			children: "NO RECORDS MATCH."
		}) : null,
		view === "cards" && rows.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "uni-grid mt-5",
			children: rows.map((row, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UniversityCard, {
				uni: row.uni,
				related: row.related,
				status: row.appStatus,
				index
			}, row.uni.id))
		}) : null,
		view === "ledger" && rows.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "filter-swap mt-4 hidden md:block",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full border-collapse text-left",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-y border-ink font-mono text-xs tracking-widest text-mute",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 pr-3 font-medium",
							children: "ID"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 pr-3 font-medium",
							children: "UNIVERSITY"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 pr-3 font-medium",
							children: "CATEGORY"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 pr-3 font-medium",
							children: "SEATS"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 pr-3 font-medium",
							children: "STATUS"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 font-medium",
							children: "NEXT DATE"
						})
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map(({ uni, primary, appStatus, next }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-ink hover:bg-panel",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-3 pr-3 font-display text-2xl font-bold uppercase leading-none",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/universities/$id",
								params: { id: uni.id },
								children: uni.shortName
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "py-3 pr-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/universities/$id",
								params: { id: uni.id },
								className: "text-sm",
								children: uni.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 block font-mono text-xs text-mute",
								children: uni.city
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-3 pr-3 font-mono text-xs",
							children: TRACK_LABEL[uni.track].toUpperCase()
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-3 pr-3 font-mono text-xs",
							children: primary?.seats == null ? "NOT ON FILE" : primary.seats.toLocaleString("en-BD")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-3 pr-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: appStatus })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-3 font-mono text-xs",
							children: next ? formatDay(next) : "NOT ANNOUNCED"
						})
					]
				}, uni.id)) })]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "filter-swap mt-4 divide-y divide-ink border-y border-ink md:hidden",
			children: rows.map(({ uni, appStatus, next, primary }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/universities/$id",
				params: { id: uni.id },
				className: "block py-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-4xl font-bold uppercase leading-none",
							children: uni.shortName
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: appStatus })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm",
						children: uni.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 font-mono text-xs text-mute",
						children: [
							TRACK_LABEL[uni.track].toUpperCase(),
							" · ",
							uni.city,
							" · ",
							next ? formatDay(next) : "NOT ANNOUNCED",
							" ·",
							" ",
							primary?.seats == null ? "SEATS NOT ON FILE" : `${primary.seats} SEATS`
						]
					})
				]
			}) }, uni.id))
		})] }) : null
	] });
}
function ViewStat({ k, v, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "border-ink border-r border-b p-4 md:border-b-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-4xl font-bold leading-none",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CountUp, { value: v })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-2 font-display text-lg font-semibold uppercase leading-none",
				children: k
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 font-mono text-xs text-mute",
				children: hint
			})
		]
	});
}
//#endregion
export { UniversitiesPage as component };
