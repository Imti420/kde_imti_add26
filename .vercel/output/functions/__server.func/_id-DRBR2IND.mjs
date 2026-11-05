import { i as formatDay, n as cn, r as daysUntil } from "./_ssr/cn-D6R9yezT.mjs";
import { C as require_jsx_runtime, b as Link, x as useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { i as blankCircular, l as useCatalog, m as usePersonal, n as Route, v as SYSTEM_LABEL, y as TRACK_LABEL } from "./_ssr/router-DRETjPZG.mjs";
import { d as eventsFor, n as EvidenceStamp, o as SectionLabel, r as ExternalLink, s as StatusPill, t as Announced, u as deriveStatus } from "./_ssr/marks-BXE2ueSK.mjs";
import { n as AmendUniversity } from "./_ssr/amend-6dR3LVGB.mjs";
import { n as ProgressSelect, r as RecordActions, t as NoteBox } from "./_ssr/actions-DoDVSLOu.mjs";
import { n as campusVoice, r as earliestExam } from "./_ssr/university-card-DLC4D2LA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_id-DRBR2IND.js
var import_jsx_runtime = require_jsx_runtime();
function phaseOf(day) {
	if (!day) return "missing";
	const n = daysUntil(day);
	if (n > 0) return "upcoming";
	if (n === 0) return "today";
	return "expired";
}
var PHASE_LABEL = {
	missing: "NOT ON FILE",
	today: "TODAY",
	upcoming: "UPCOMING",
	expired: "EXPIRED"
};
function PhaseMark({ day }) {
	const phase = phaseOf(day);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("phase", `phase-${phase}`),
		children: PHASE_LABEL[phase]
	});
}
function UniversityPage() {
	const { id } = Route.useParams();
	const navigate = useNavigate();
	const { universities, circulars } = useCatalog();
	const addCircular = usePersonal((s) => s.addCircular);
	const hideUniversity = usePersonal((s) => s.hideUniversity);
	const uni = universities.find((item) => item.id === id);
	if (!uni) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "window",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "window-bar",
			children: "Missing record"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "window-body",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-5xl font-bold uppercase",
				children: "Not in the directory"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/universities",
				className: "press mt-4",
				children: "Back to all universities"
			})]
		})]
	});
	const related = circulars.filter((item) => item.universityId === uni.id);
	const primary = related[0] ?? null;
	const timeline = primary ? eventsFor(primary) : [];
	const examDay = earliestExam(primary);
	const voice = campusVoice(uni.id);
	const nameClass = uni.shortName.length >= 6 ? "text-5xl sm:text-7xl" : uni.shortName.length >= 4 ? "text-6xl sm:text-8xl" : "text-7xl sm:text-9xl";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "font-mono text-xs tracking-widest text-mute",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/universities",
					className: "underline underline-offset-4",
					children: "ALL UNIVERSITIES"
				}),
				" / ",
				uni.id.toUpperCase()
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "window mt-4",
			"data-track": uni.track,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "window-bar",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					TRACK_LABEL[uni.track],
					" · ",
					uni.city || "CITY NOT LOGGED",
					" · ",
					uni.kind === "system" ? "SYSTEM" : "INSTITUTION"
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: primary ? SYSTEM_LABEL[primary.system] : "CLUSTER NOT ON FILE" })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "window-body",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "sticker",
							children: "Campus commentary · not a fact"
						}), primary ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: deriveStatus(primary) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "phase phase-missing",
							children: "NOT ANNOUNCED"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: cn("mt-4 font-display font-bold uppercase leading-[0.8]", nameClass),
						children: uni.shortName
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-3xl text-lg",
						children: uni.name
					}),
					uni.nameBn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-mute",
						children: uni.nameBn
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-3xl font-display text-3xl font-bold uppercase leading-none md:text-4xl",
						children: voice
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex flex-wrap gap-2",
						children: [uni.website ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							className: "press press-accent",
							href: uni.website,
							target: "_blank",
							rel: "noreferrer",
							children: "Official site"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "press",
							"aria-disabled": "true",
							children: "Site not listed"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/universities",
							className: "press",
							children: "Back to grid"
						})]
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Strip, {
					k: "Seats",
					v: primary?.seats == null ? "—" : primary.seats.toLocaleString("en-BD"),
					note: primary?.seats == null ? "NOT YET VERIFIED" : "ON CIRCULAR"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Strip, {
					k: "Closes",
					v: primary?.applicationCloses ? formatDay(primary.applicationCloses) : "—",
					note: primary?.applicationCloses ? PHASE_LABEL[phaseOf(primary.applicationCloses)] : "NOT ON FILE"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Strip, {
					k: "Exam",
					v: examDay ? formatDay(examDay) : "—",
					note: examDay ? PHASE_LABEL[phaseOf(examDay)] : "NOT ON FILE"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Strip, {
					k: "Fee",
					v: primary?.feeBdt == null ? "—" : `৳${primary.feeBdt.toLocaleString("en-BD")}`,
					note: primary?.feeBdt == null ? "NOT ANNOUNCED" : primary.feeNote || "ON CIRCULAR"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex flex-wrap gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecordActions, {
				universityId: uni.id,
				circularId: primary?.id
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "press",
				onClick: () => {
					const circular = blankCircular(uni.id, `${uni.shortName} admission 2026–27`);
					addCircular(circular);
					navigate({
						to: "/circulars/$id",
						params: { id: circular.id }
					});
				},
				children: "Log a circular"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "window",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "window-bar",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Admission · dates on file" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "window-body",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, { children: "The window" }),
								primary ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DateBoard, { circular: primary }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm",
									children: "No notice is on file. Opening, closing, admit card, test, result and fee are not announced in this archive."
								}),
								timeline.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
									className: "mt-4 border-t border-ink",
									children: timeline.map((event, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "grid grid-cols-[2rem_1fr_auto] items-baseline gap-3 border-b border-ink py-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono text-xs text-mute",
												children: String(index + 1).padStart(2, "0")
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block font-display text-2xl font-bold uppercase leading-none",
												children: event.label
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Announced, {
												day: event.day,
												time: event.time
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhaseMark, { day: event.day })
										]
									}, event.id))
								}) : null,
								related.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-4 space-y-3",
									children: related.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "border-t border-ink pt-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-wrap items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: deriveStatus(item) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EvidenceStamp, { circular: item })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "mt-2 font-display text-3xl font-bold uppercase leading-none",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
													to: "/circulars/$id",
													params: { id: item.id },
													className: "hover:text-accent",
													children: item.title
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-2 max-w-3xl text-sm text-pretty",
												children: item.summary
											}),
											item.pdfUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-2",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
													href: item.pdfUrl,
													children: "Official PDF"
												})
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-2 font-mono text-xs text-mute",
												children: "PDF NOT ON FILE"
											})
										]
									}, item.id))
								}) : null
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "window",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "window-bar",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Seats and subjects" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: primary?.seats == null ? "Seats not verified" : "Seats on circular" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "window-body",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-xs tracking-widest text-mute",
									children: "TOTAL SEATS"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: cn("seat-num", primary?.seats == null && "text-mute"),
									children: primary?.seats == null ? "—" : primary.seats.toLocaleString("en-BD")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 max-w-xl text-sm",
									children: primary?.seats == null ? "No verified seat total is stored. This page will not estimate one." : "Taken from the circular on file. Not a guess."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono text-xs tracking-widest text-mute",
										children: "UNITS AND SUBJECTS"
									}), primary && primary.units.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "mt-3 grid gap-3 sm:grid-cols-2",
										children: primary.units.map((unit) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "rounded-2xl border-[3px] border-ink p-3",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "font-display text-4xl font-bold uppercase leading-none",
													children: unit.code
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-2 text-sm",
													children: unit.detail || "Detail not on file."
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "mt-2 font-mono text-xs text-mute",
													children: [unit.examDate ? formatDay(unit.examDate) : "EXAM NOT ON FILE", unit.centre ? ` · ${unit.centre}` : ""]
												})
											]
										}, unit.code))
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 rounded-2xl border-[3px] border-dashed border-ink p-4 text-sm",
										children: "Unit-wise seats, faculties and departments are not yet verified for this record."
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
									className: "mt-4 rounded-2xl border-[3px] border-ink",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
										className: "cursor-pointer px-3 py-3 font-display text-xl font-bold uppercase",
										children: "Eligibility"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "border-t-[3px] border-ink px-3 py-3",
										children: primary && primary.eligibility.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
											className: "list-disc space-y-2 pl-5 text-sm",
											children: primary.eligibility.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: line }, line))
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-mono text-sm text-mute",
											children: "NOT ANNOUNCED"
										})
									})]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "window",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "window-bar",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Campus culture" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "window-body grid gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
									className: "rounded-2xl border-[3px] border-ink bg-yellow p-4 text-onyellow",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-mono text-xs tracking-widest",
											children: "COMMUNITY COMMENTARY · NOT VERIFIED"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 font-display text-3xl font-bold uppercase leading-none",
											children: voice
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-sm",
											children: "A browsing line. It is not an official description and it is not a fact."
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
									className: "rounded-2xl border-[3px] border-ink p-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono text-xs tracking-widest text-mute",
										children: "ARCHIVE NOTE"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm text-pretty",
										children: uni.directoryNote || "No directory note is stored."
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
									className: "rounded-2xl border-[3px] border-dashed border-ink p-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono text-xs tracking-widest text-mute",
										children: "SOURCED CAMPUS PROFILE"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm",
										children: "Clubs, debate societies, campus traditions and student life are not stored for this institution yet. This archive will not invent them."
									})]
								})
							]
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "window h-fit",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "window-bar",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Record" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "window-body space-y-3 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
							label: "Application status",
							children: primary ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: deriveStatus(primary) }) : "NOT ANNOUNCED"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Fact, {
							label: "Opens",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Announced, {
									day: primary?.applicationOpens ?? null,
									time: primary?.opensAt
								}),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhaseMark, { day: primary?.applicationOpens ?? null })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Fact, {
							label: "Closes",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Announced, {
									day: primary?.applicationCloses ?? null,
									time: primary?.closesAt
								}),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhaseMark, { day: primary?.applicationCloses ?? null })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Fact, {
							label: "Admit card",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Announced, { day: primary?.admitCardOn ?? null }),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhaseMark, { day: primary?.admitCardOn ?? null })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Fact, {
							label: "Result",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Announced, { day: primary?.resultOn ?? null }),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhaseMark, { day: primary?.resultOn ?? null })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
							label: "Fee",
							children: primary?.feeBdt == null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-sm text-mute",
								children: "NOT ANNOUNCED"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-mono text-sm",
								children: ["BDT ", primary.feeBdt.toLocaleString("en-BD")]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
							label: "Official website",
							children: uni.website ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
								href: uni.website,
								children: uni.website.replace(/^https?:\/\//, "")
							}) : "NOT LISTED"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
							label: "Application portal",
							children: uni.admissionUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
								href: uni.admissionUrl,
								children: uni.admissionUrl.replace(/^https?:\/\//, "")
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-sm text-mute",
								children: "NOT ANNOUNCED"
							})
						}),
						primary?.sources.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs tracking-widest text-mute",
							children: "SOURCES"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-1 space-y-1",
							children: primary.sources.map((source) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
								href: source.url,
								children: source.label
							}) }, source.url))
						})] }) : null
					]
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "window mt-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "window-bar",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "This computer · your desk" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "window-body grid gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoteBox, {
						id: uni.id,
						label: "Personal note — stays on this computer"
					}),
					primary ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "max-w-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-xs tracking-widest text-mute",
							children: "APPLICATION PROGRESS"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressSelect, { id: primary.id })]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AmendUniversity, { university: uni }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "press text-accent",
						onClick: () => {
							if (confirm(`Hide ${uni.shortName} from this desk?`)) {
								hideUniversity(uni.id);
								navigate({ to: "/universities" });
							}
						},
						children: "Hide from directory"
					})
				]
			})]
		})
	] });
}
function DateBoard({ circular }) {
	const rows = [
		["Applications open", circular.applicationOpens],
		["Applications close", circular.applicationCloses],
		["Admit card", circular.admitCardOn],
		["Examination", circular.examDate],
		["Result", circular.resultOn],
		["Classes begin", circular.classesBegin]
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "mt-4 grid gap-2 sm:grid-cols-2",
		children: rows.map(([label, day]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "flex items-center justify-between gap-3 rounded-xl border-2 border-ink px-3 py-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block font-mono text-xs tracking-widest text-mute",
				children: label.toUpperCase()
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("font-display text-2xl font-bold uppercase leading-none", !day && "text-mute"),
				children: day ? formatDay(day) : "—"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhaseMark, { day })]
		}, label))
	});
}
function Fact({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "font-mono text-xs tracking-widest text-mute",
		children: label.toUpperCase()
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-1 flex flex-wrap items-center gap-2",
		children
	})] });
}
function Strip({ k, v, note }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "window",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "window-body",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs tracking-widest text-mute",
					children: k.toUpperCase()
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: cn("mt-2 font-display text-2xl font-bold uppercase leading-none md:text-3xl", v === "—" && "text-mute"),
					children: v
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 font-mono text-xs text-mute",
					children: note
				})
			]
		})
	});
}
//#endregion
export { UniversityPage as component };
