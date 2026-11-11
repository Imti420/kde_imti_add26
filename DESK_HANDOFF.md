# ADMISSION//26 — Agent handoff (read before any upgrade)

**Repo:** https://github.com/Imti420/kde_imti_add26  
**Live:** https://kdeimtiadd26.vercel.app  
**Owner / product voice:** Imti — Grok agents are the *brain*; the crawler is dumb. Prefer researched desk copy over raw crawl noise.

**Multi-agent:** If several chats get the same `GO UPDATE`, coordinate via [`DESK_CREW.md`](./DESK_CREW.md) + [`DESK_RADIO.md`](./DESK_RADIO.md) — check-in on radio first, claim a lane, don’t all edit the same files.

**Standing commands the user reuses across agents:**
- `GO UPDATE` → hunt web for new/changed circulars (DU, BUET, medical, GST, privates…), update `circulars` / `watch` / desk notes, push if anything moved.
- `GO UPDATE NEWS` → fresh research on that day’s admission + edtech mess, **replace all 9 spicy cards** with new desk pieces, push.
- After every upgrade: **append Changelog** at the bottom of **this file** so the next bot is not amnesiac.

---

## Multi-agent crew (parallel GO UPDATE)

**Anti-stampede (mandatory):** sleep 4–12s → radio check-in on `DESK_RADIO.md` → wait ~25s → claim on `DESK_CREW.md` → only then touch `src/`.  
Callsigns: RADAR WIRE PULSE SHELL SIREN ARCHIVIST.  
**NEWS = only ONE writer on `desk-spice.ts`.**

---

## What this product is

Bangladesh public-university admission desk for session **2026–27**: universities, circulars (dates/seats/eligibility), calendar, discovery/crawl log, newswire (editorial spice cards), settings, desk alerts / OS notifications, Bangla mode, Naughty mode.

Stack: TanStack Start / Vite / Tailwind, data in `src/data/*`, client personal state in localStorage, GitHub Actions crawlers, Vercel deploy from `main`.

---

## Critical paths

| Area | Path |
|------|------|
| Spice / newswire | `src/data/desk-spice.ts` |
| Circulars | `src/data/circulars.ts` |
| Watch | `src/data/watch.ts` |
| Alerts feed | `public/alerts-feed.json` |
| Desk push | `src/lib/desk-push.ts` |
| Uni cards | `src/components/university-card.tsx` |
| Shell | `src/components/shell.tsx` |
| Handoff / crew / radio | `DESK_HANDOFF.md` · `DESK_CREW.md` · `DESK_RADIO.md` |

---

## Season snapshot (as of 11 Nov 2026 desk · Agent 03)

- **Directory:** **84 universities + 3 systems = 87** records (matches historical ~87). Circular coverage: **14** records only.
- **DU:** Applications **OPEN** 11 Nov 12:00 → 25 Nov 23:59; tests Dec 5–26; fee raised on four units. Held vs UGC.
- **BUET:** **Official notice 10 Nov** — test **16 Jan 2027** holds (rejects UGC). Apps open **21 Nov**; **close NOT ANNOUNCED**. GPA wall intact.
- **KUET:** Official circular — apps **10 Nov 10:00 → 10 Dec 17:00**; test **8 Jan 2027**; ~1,105 seats.
- **Medical/dental:** DGME **18 Dec** still the line; **formal circular STILL MISSING** as of 11 Nov; apps expected mid-Nov, not locked.
- **UGC:** Jan apps / Feb tests still the commission floor. DU + BUET are both off-script.
- Do **not** invent application closes, fees, or medical circular content.

**Current spice cycle:** see Agent 02 / WIRE (not owned by Agent 03).


## Non-negotiables (short)

Desk > crawler · ~9 spice cards with rotating ids · circular truth over invention · `useT()` everywhere · Naughty kept · honest push limits · Bangla via ChromeToggles · discovery crawler ~45 min / live UI.

---

## Upgrade checklist

1. Read this file + latest Changelog.
2. On swarm: radio → crew claim → product.
3. NEWS → new spice ids + alerts-feed.
4. Append Changelog here after every upgrade.

---

## Changelog (append only)

### 2026-11-11 ~16:10 +06 — Agent 05 (Platform / Frontend) — representation audit

**Live:** `/`, `/newswire`, `/calendar` HTTP 200. Identity (desk/brutalist) intact.

**Synced with Agents 02–03 data:** `n1111-du-open` spice + circulars OPEN already on main (Agent 02 day cycle). Super-head selector already prefers `n1111-` / `du-open`.

**Frontend fix this pass:**
- `WireStrip` no longer emits duplicate `id="wire"` (homepage owns the jump anchor).

**Feature map check (code present, not full browser QA):**
- Newswire + UgcNukeSuperHead + 9 spice cards ✓
- NoticeBell + alerts-feed cycle `n1111-day-news` ✓
- Circular PDF row (Open PDF | NOT ON FILE) ✓
- University cards + street voice ✓
- Calendar route ✓
- Watch board on homepage ✓
- Shell mobile menu + dock ✓
- `useT` / Bangla boot ✓
- Naughty boot class ✓

**Open for Agent 06:** visual mobile, real notification permission, PDF open-in-viewer when `pdfUrl` non-null, Bangla full pass.

**Files:** `src/components/newswire.tsx`, this handoff, `DESK_CREW.md`.


### 2026-11-11 ~15:50 +06 — Agent 03 (Admissions Data & Circulars) — first audit

**Directory count verified:** 84 universities + 3 systems (**87** total).

**Circular coverage:** 14 circular records. ~73 directory rows have **no** circular — shown as not-on-file, not invented.

**Data changes:**
- **DU (`c-du`):** Applications **OPEN** (11 Nov); fee note aligned; `updatedOn` → 2026-11-11.
- **BUET (`c-buet`):** Upgraded to `notice` after **10 Nov official website notice** (16 Jan holds, rejects UGC). Apps 21 Nov; **applicationCloses null**. `updatedOn` → 2026-11-11.
- **KUET (`c-kuet`):** Official window 10 Nov 10:00 → 10 Dec 17:00; fee centres; `opensAt`/`closesAt`; `updatedOn` → 2026-11-11.
- **DGHS (`c-dghs`):** 18 Dec retained as `reported`; formal circular **still missing**; `updatedOn` → 2026-11-11.
- **Watch:** Rewritten for 11 Nov (DU open, BUET notice, medical circular gap).

**Sources:** DU portal; Channel I/TBS/Observer/Jago (DU); Prothom Alo/Jago (BUET notice); admission.kuet.ac.bd; Daily Campus/Star/Observer/bdnews24 (DGME).

**Outstanding:** No DGME PDF; BUET close/fee not announced; no supersession schema fields; `pdfUrl` mostly null; JU/GST members directory-only.

**Files:** `src/data/circulars.ts`, `src/data/watch.ts`, this handoff, `DESK_CREW.md`.


### 2026-11-10 ~22:15 +06 — GO UPDATE NEWS (night cycle n1022-*)
- Solo (not swarm). Replaced all 9 `SPICE_CARDS` with **`n1022-*`** ids for alert fan-out.
- Lead: DU hours-to-noon; UGC vs DU still split; **DGME confirmed 18 Dec** medical test (Daily Campus 10 Nov); KUET live; BUET wall; Star clash grid; retake math; coaching; tonight triggers.
- `public/alerts-feed.json` cycle `n1022-night-news`.
- Files: `src/data/desk-spice.ts`, `public/alerts-feed.json`, this handoff, `DESK_CREW.md` session note.
- Sources: DU portal, TBS, bdnews24, Observer, Daily Campus DGME, Daily Star clash map, KUET circular guides.

### 2026-11-10 ~20:30 +06 — IMTI KUET APPROVED desk blast
- User asked to notify users: IMTI KUET APPLICATION APPROVED.
- Spice id `imti-kuet-approved-2030` + alerts-feed lead (no central push server — local/SW only).

### 2026-11-10 afternoon — multi-agent swarm + anti-stampede + radio
- Parallel GO UPDATE tests; `DESK_RADIO.md` + anti-stampede rules; lanes A/B/C worked with git noise then process fix.
- CARD upgraded `university-card.tsx` (always-on street voice).
- SHELL chrome polish; PULSE discovery snappier.


### 2026-11-11 ~15:50 +06 — Agent 02 intelligence audit (no product rewrite)

**Role:** Director of Intelligence & Newswire (Agent 02). Reports to Commander / Imti.

**What is genuinely implemented**
- **Desk spice track:** `src/data/desk-spice.ts` — hand-authored ~9 heat-tagged cards; drives newswire hero strip + homepage desk strip; current cycle **`n1022-*`** (10 Nov night).
- **Wire crawler track:** `src/lib/wire/*` + `scripts/crawl-newswire.ts` + Actions `crawl-newswire.yml` (pins :12/:42). Live artifact `public/wire/live.json` (verified 11 Nov: status completed, **40 items**, 17 sources, 11 reached, 2 newItems).
- **Verification labels:** official | reported | community | unverified | corrected — UI filters on `/newswire`.
- **Source registry:** UGC, DU, BUET, DGHS, coaching web, newsrooms; Facebook rows intentionally `not_authorised` / manual_only (no Meta token).
- **Manual desk submissions:** localStorage `admission26.wire.desk.v1` on newswire page.
- **Notifications:** `desk-push.ts` triggers on new spice ids, circular PDFs, frantic day-of; `public/alerts-feed.json`; Settings SCREAM NOW.
- **Integrity stance in code:** wire note “News is not a circular”; coaching caveats on headlines.

**What is broken / stale**
- **`UgcNukeSuperHead` hardcodes** badge “10 NOV 2026”, title “APPS OPEN TOMORROW”, and looks up spice id **`spice-du-defy`** which **does not exist** in current `SPICE_CARDS` (falls back to `[0]`). On **11 Nov** the “tomorrow” copy is wrong — apps are already open. Coordinate with Agent 05 for presentation; Agent 02 owns the fact pattern.
- **Wire relevance gaps:** live feed includes hospital/fire “ভর্তি” false positives (e.g. burn-unit admissions). Heuristic classifier active; **aiClassified: 0** on last cycle.
- **Spice history:** rotating ids replace prior cycles; no durable in-app archive of old spice sets (only git history).
- **alerts-feed `news`:** thin vs full spice set; can lag spice cycle if not updated together.

**What is planned / partial**
- Gemini enrich path exists (`src/lib/wire/ai.ts`) but last cycle was heuristic-only.
- Supersession of announcements is not a first-class wire field (no explicit “this item replaces X”).
- Cross-link from wire item → Agent 03 circular record is not automated (dates in `detectedDates` optional).

**Do not recreate:** full wire engine, spice card system, desk-push, UGC nuke *layout* (fix data binding / date accuracy instead).

**Coordination**
- Agent 03: any wire/spice claim that changes deadlines must match `circulars.ts` / `watch.ts`.
- Agent 04: ingestion/crawl changes only with them.
- Agent 05: nuke superhead date/id binding is a presentation+data fix.
- Agent 06: verify after any integrity patch.

**Verification status:** audit only — read live.json, routes, desk-push, registry. No production data rewrite this pass.


### 2026-11-11 ~16:05 +06 — Agent 06 FINAL AUDIT (integration / QA)

**Scope:** Independent verification of Agents 01–05 claims vs `main` + production `https://kdeimtiadd26.vercel.app`. QA did **not** ship product fixes.

#### AUDIT 1 — CIRCULARS · **PARTIAL**
| Check | Result |
|-------|--------|
| Key 2026–27 records present (DU, BUET, KUET, DGHS, GST, …) | **PASS** — 14 seed circulars; DU/BUET/KUET/DGHS `updatedOn` 2026-11-11 |
| DU apps 11–25 Nov, unit tests Dec | **PASS** (matches portal + press) |
| BUET apps 21 Nov / test 16 Jan 2027 | **PASS** on stored notice |
| KUET window live | **PASS** on stored notice |
| Medical formal circular / PDF | **FAIL** — exam 18 Dec reported; formal circular still missing (`confidence: reported`) · **Agent 03** |
| PDFs in archive | **FAIL** — all inspected `pdfUrl` values **null** · **Agent 03** (+ portal links may exist on uni profiles) |
| Superseded marking | **FAIL** — no supersession usage in circular seed · **Agent 03** |
| Coverage vs full BD public map | **PARTIAL** — directory of unis larger than circular set; expected for thin notices |

#### AUDIT 2 — NEWSWIRE · **FAIL** (integrity)
| Check | Result |
|-------|--------|
| Wire crawler live | **PASS** — `public/wire/live.json` = prod `/wire/live.json`, completed 2026-11-11T07:07Z, 40 items |
| Dual track (spice + wire) | **PASS** (architecture) |
| Breaking DU copy on **production** | **FAIL** — UI still “APPS OPEN **TOMORROW**” / “10 NOV 2026”; spice `n1022-du-tminus` still “HOURS LEFT · NOON TOMORROW” on **11 Nov** when apps are open · **Agent 02 + Agent 05** |
| `UgcNukeSuperHead` binds `spice-du-defy` | **FAIL** — id missing; falls back to `[0]` · **Agent 05** (bind) / **02** (facts) |
| Source links on spice | **PASS** (present) |
| Wire noise (hospital/fire “ভর্তি”) | **FAIL** — still in live feed · **Agent 02/04** relevance |
| Duplicates | **PARTIAL** — EN/BN pairs for same story (acceptable if labeled) |
| Old-as-breaking | **FAIL** — nuke superhead · **02/05** |

#### AUDIT 3 — CALENDAR · **PARTIAL**
| Check | Result |
|-------|--------|
| Events derived from circular seed | **PASS** (architecture) |
| Unannounced filled as fact | **PASS** pattern — nulls/confidence notes used on soft dates |
| Postponements / UGC floor vs DU hold | **PARTIAL** — data holds DU schedule; UI narrative lags · **02/05** |
| Full interactive calendar on prod | **UNTESTED** deep UX (route HTTP 200 only) · **Agent 05** |

#### AUDIT 4 — UNIVERSITY DATABASE · **PARTIAL**
| Check | Result |
|-------|--------|
| Core unis + admission URLs (DU portal etc.) | **PASS** |
| Seat/eligibility on circulars vs profiles | **PARTIAL** — seats live mainly on circular records |
| Consistency circular `universityId` ↔ directory | **PASS** for seeded set |
| Full seat truth for every campus | **PARTIAL** — not all unis have own circular |

#### AUDIT 5 — PLATFORM · **PARTIAL**
| Check | Result |
|-------|--------|
| `/` `/newswire` `/calendar` `/universities` `/discovery` HTTP | **PASS** 200 |
| Bangla toggle present in chrome | **PASS** |
| Wire JSON on prod | **PASS** |
| Notifications / SCREAM NOW end-to-end | **UNTESTED** (requires permissioned browser) · **Agent 05/SIREN** |
| Mobile calendar UX | **UNTESTED** device pass · **Agent 05** |
| Crawler health (discovery + newswire Actions) | **PARTIAL** — artifacts fresh; newswire UI can show STALE relative to 55-min desk copy |

#### AUDIT 6 — DEPLOYMENT · **PASS** (pipeline)
| Stage | Result |
|-------|--------|
| `main` status | **PASS** — Vercel deployment success |
| Prod serves latest wire artifact | **PASS** — same `generatedAt` as GitHub `public/wire/live.json` |
| Prod serves fixed DU breaking narrative | **FAIL** — stale copy still live (code not corrected) |

#### P0 blockers (students can misread)
1. **Newswire breaking head + spice still say DU opens tomorrow** on 11 Nov · **Agents 02 + 05**
2. **No circular PDFs stored** (`pdfUrl` null) · **Agent 03**
3. **Medical formal circular still absent** · **Agent 03**

#### Sign-off
ADMISSION//26 is **deployed and largely wired**, but **not fully trustworthy on the flagship DU status narrative** until P0 copy is fixed and redeployed. QA does not clear “genuinely up to date” until P0 is verified on production.

### (Next agent: append here)

### 2026-11-11 ~15:50 +06 — Agent 05 (Creative / Frontend) first mission audit
**Role:** Creative Director & Frontend Lead under Project Commander. Human: Imti.

**Verified live** (`kdeimtiadd26.vercel.app`):
- Shell identity intact: rail nav Desk/Tools, yellow active, paper/ink/accent, neo-brutalist edges.
- Newswire spice cycle on file is **n1022-*** (night of 10 Nov). Hero still reads “apps open **tomorrow**” — on **11 Nov** that copy is stale (Agent 02 should refresh cycle / tense).
- Notices badge can show **200** unread from monitor changelog flood; UX: badge now caps **99+**, panel shows unread count + “showing 12/N”.
- Calendar uses `useT()` (historical `t is not defined` fixed earlier — still present).
- Uni cards: `pdfUrl` / `admissionUrl` CTAs when data exists; people’s-thought line guarded for mobile.
- Circular detail: Open PDF / portal facts.
- Intro sequence: sessionStorage once-per-tab; intentional Imti file-note (not a circular).
- Mobile: bottom dock + More drawer; safe-area padding present.

**Shipped this pass:** `src/components/notifications.tsx` only (badge + panel hierarchy).

**Not touched:** desk-spice, circulars data, styles/theme tokens, backend.

**Handoffs:**
- Agent 02: refresh newswire/home banner tense for DU **open now** (11 Nov).
- Agent 03: confirm PDF links remain on KUET/CUET/etc. cards.
- Agent 06: regression on NoticeBell MARK READ + badge after large changelog.


---

## QA baseline — Agent 06 (2026-11-11 ~15:50 +06)

Independent verification. Labels: **PASS** | **FAIL** | **PARTIAL** | **UNTESTED** | **BLOCKED**.

### Production / deploy
| Check | Result | Evidence |
|-------|--------|----------|
| Live site responds | **PASS** | https://kdeimtiadd26.vercel.app returns 200 |
| Core routes 200 | **PASS** | `/` `/newswire` `/settings` `/calendar` `/discovery` `/monitor` `/universities` `/circulars` `/desk` `/radar` `/shortlist` `/tracker` |
| `/directory` | **FAIL** | 404 (likely renamed to `/universities` — nav must not promise it) |
| Vercel + Actions | **PASS** | Actions green today: Discovery, Newswire, Monitor workflows completed success 11 Nov morning |
| Service worker | **PARTIAL** | `/sw.js` 200; `/service-worker.js` 404 |
| PWA manifest | **PASS** | `/manifest.webmanifest` valid name/icons |

### Newswire & breaking
| Check | Result | Evidence |
|-------|--------|----------|
| `/newswire` renders | **PASS** | 200; spice cards + super-head content in HTML |
| 9 spice cards present | **PASS** | `desk-spice.ts` has 9 `n1022-*` cards; live page shows NUKE/WAR/HOT cards |
| Time-sensitive copy current | **FAIL** | On **11 Nov afternoon**, watch + spice still say DU apps open “TOMORROW” / “hours left / noon tomorrow”. DU window opened 11 Nov 12:00. Live desk is a day behind its own calendar. |
| Alerts feed | **PARTIAL** | `/alerts-feed.json` 200, 3 news items, `updated: 2026-11-10T22:15:00+06:00` — not refreshed for opening day |
| Super-head vs spice alignment | **PARTIAL** | Page shows both “calendar died / UGC” framing and DU-defy lead; not wrong, but mixed eras of messaging |

### Circulars / PDFs / university records
| Check | Result | Evidence |
|-------|--------|----------|
| Circular detail routes | **PASS** | `/circulars/c-du` … `/circulars/c-ru` 200 |
| Circular count | **PASS** | 14 circulars in `circulars.ts` (DU, BUET, KUET, CUET, RUET, MIST, JnU, RU, CU, KU, CoU, GST, AGRI, DGHS) |
| PDF viewing | **FAIL** | `pdfUrl` field exists; values effectively null / unused. **No PDF links stored.** Users cannot open official PDFs from the archive. |
| Source citations | **PARTIAL** | Sources as `SourceRef` objects (STAR_DU, DU_PORTAL, etc.); portal links work (DU portal 200). Not the same as storing the circular PDF. |
| Confidence tags | **PASS** | Mix of notice / reported / preliminary present |
| DU record content | **PASS** | Reflects UGC defy + 11–25 Nov apps + Dec tests (data quality OK; **presentation tense is stale**) |
| Medical (DGHS) | **PARTIAL** | 18 Dec locked in data; formal circular still “expected” — matches public reporting as of 10 Nov; needs re-check if DGME published since |

### Watch board
| Check | Result | Evidence |
|-------|--------|----------|
| Watch data exists | **PASS** | 3 items: du-defies-ugc, ugc-floor-vs-du, medical-18-dec-orphan |
| Watch tense | **FAIL** | Lead title still “applications open TOMORROW (11 Nov)” on 11 Nov after noon |

### Calendar
| Check | Result | Evidence |
|-------|--------|----------|
| `/calendar` loads | **PASS** | 200, large payload |
| ICS / personal events | **UNTESTED** | Code paths in `calendar.ts` / settings export; no browser exercise this audit |

### Discovery / crawler
| Check | Result | Evidence |
|-------|--------|----------|
| Actions run | **PASS** | University Discovery Crawler + Newswire workflows success multiple times 11 Nov |
| Discovery UI shows log | **FAIL / PARTIAL** | Live `/discovery` HTML shows “WAITING FOR THE PUBLISHED LOG” / loading copy — published cycle not visible to user despite green Actions |
| Monitor verification report | **FAIL** | `/monitor` shows “No published report”, universities “NOT CHECKED”, 0 reached — Actions “success” does not equal user-visible verification |

### Notifications
| Check | Result | Evidence |
|-------|--------|----------|
| Code + settings UI | **PASS** | `desk-push.ts`, NoticeBell, settings enable/disable/screamNow present |
| alerts-feed consumed | **PARTIAL** | Feed exists and is current to 10 Nov night |
| Real OS push delivery | **UNTESTED** | Cannot confirm permission → push → device without browser client session |

### Mobile / shell / i18n / experimental
| Check | Result | Evidence |
|-------|--------|----------|
| Shell + nav | **PASS** | `shell.tsx` NAV + mobile DOCK; Bangla toggle; NoticeBell; NaughtyBadge |
| i18n keys | **PARTIAL** | Extensive `i18n.tsx` dictionary; completeness of BN coverage not fully audited |
| Naughty mode | **UNTESTED** | Code in theme/settings; no runtime toggle verification this pass |
| Mobile layout visual QA | **UNTESTED** | No device lab this pass — mark for Agent 05 + QA follow-up |

### Data integrity risks (regression)
1. **Opening-day tense** — any “tomorrow / hours left” copy must be date-aware or daily-refreshed (Agent 03 + 02).
2. **Published report pipeline** — crawler success ≠ desk visibility (Agent 04).
3. **PDF gap** — archive claims circular coverage without file-level artifacts (Agent 03).
4. **Stale alerts-feed** after NEWS cycles if feed not rewritten same commit as spice.

### Outstanding issues (priority)
| # | Issue | Owner hint | Severity |
|---|--------|------------|----------|
| 1 | DU / watch / spice still say “tomorrow” on open day | 03 Admissions + 02 Intel + 05 Creative | **P0** |
| 2 | Monitor + Discovery show no published report | 04 Infrastructure | **P0** |
| 3 | No circular PDFs in data | 03 Admissions | **P1** |
| 4 | alerts-feed not refreshed 11 Nov | 02 / WIRE lane | **P1** |
| 5 | `/directory` 404 if linked anywhere | 01 / 05 | **P2** |
| 6 | OS notification end-to-end | 06 QA + 04 | **P2** |

### Test coverage this pass
- HTTP smoke: routes, alerts-feed, manifest, sw, DU portal
- Static data: circulars, spice, watch, universities tree
- Actions API: recent workflow conclusions
- **Not covered:** real browser push, visual mobile, Bangla full pass, PDF open-in-viewer, auth gates

*Agent 06 will not mark a feature PASS because code exists. Re-test after P0 fixes.*

### 2026-11-11 ~15:55 +06 — Agent 04 (Infrastructure) — crawler audit + reliability

**Verified live state (not historical assumptions):**
- Discovery `state.json`: last **completed** `2026-11-11T07:03:37Z` (~13:03 +06), `intervalMinutes: 45`, cursor present.
- Last cycle counts: **84 universities + 3 systems**, **233 sources**, checked 226, reached 198, failed 28, skipped 7, newDocuments 1.
- Reachability mix: no_change 182, unreachable 10, success 15, retry_scheduled 14, no_official_url 7, new_document 1, source_broken 4.
- Some `lastCheckedAt` ages run to **days** — intentional `revisitMs` backoff for cold/unchanged sources (not silent drop of the registry).
- Ops git publishes are real (`chore(ops)` commits). Gap ~02:20→06:00Z today shows GH schedule drift, not fake timestamps.
- Newswire: 17 sources, last completed `07:07Z`, 40 items, 2 new; 4 notAuthorised; Gemini optional (`aiClassified: 0` that run).

**Architecture (honest):**
- HostGate **900ms** per host; concurrency **4**; timeout **10s**; maxFetches **500**.
- Checkpoint via `onProgress` (registry, discoveries, seen, cursor) while `status=running`.
- Crash path marks **failed**, does not publish success. SIGKILL/job timeout could leave `running` until next heal.
- Workflows previously always passed **`--force`**, bypassing the 45/55-minute cycle gate every cron tick (per-source revisit still applied).

**Shipped this pass:**
- `healStuckRunningState()` in `src/lib/crawl/gate.ts` — stuck `running` >30m → `failed` with explicit note (not a success).
- Wired into `scripts/crawl-admissions.ts` and `scripts/crawl-newswire.ts`.
- Schedules no longer always `--force`; `workflow_dispatch` can still force.
- Tests for healer added; pre-existing 403 test expects `unreachable` but code returns `retry_scheduled` (open for Agent 06).

**Open issues (not fixed this pass):**
- GH Actions best-effort cron → multi-hour quiet periods still possible.
- Campus **403/WAF** from GitHub runners remains a coverage ceiling.
- Pre-existing test mismatch: 403 → `retry_scheduled` vs expected `unreachable`.

### 2026-11-11 ~16:00 +06 — Agent 03 (Chief Calendar) Nov–Jan audit
**Calendar source of truth:** `archiveEvents(circulars)` via `eventsFor` in `src/lib/status.ts` — every OPEN/CLOSE/TEST on `/calendar` is derived from `src/data/circulars.ts`. No invented dates.

**Verified operational grid (11 Nov desk):**
| Institution | Apps | Tests | vs UGC 9 Nov floor | Calendar status |
|-------------|------|-------|--------------------|----------------|
| DU | 11–25 Nov (OPEN) | 5–26 Dec units | **Held** local notice | On calendar |
| BUET | 21 Nov; close NOT ANNOUNCED | 16 Jan 2027 | **Held** notice 10 Nov | On calendar |
| KUET | 10 Nov–10 Dec LIVE | 8 Jan 2027 | Own engineering track | On calendar |
| Medical (DGME) | mid-Nov expected | 18 Dec | Not UGC | Exam on calendar; apps expected |
| JnU | 15 Nov–10 Dec | from 1 Jan | UGC asked reconsider; no slip | Local line kept |
| RU | 12–27 Nov prelim | 8/9/16 Jan | UGC pressure; prelim | Local line kept |
| CU | 15 Nov–10 Dec | 29 Jan–8 Feb probable | Partial overlap UGC | Probable line kept |
| GST | NOT ANNOUNCED | 19/20/27 Mar reported | Long fuse | Tests only |
| Agri cluster | NOT ANNOUNCED | 2 Jan reported | — | Test only |

**Shipped:** confidenceNotes/summaries for JnU/RU/CU (UGC vs local honesty); watch item `cal-officer-11nov`.
**Not done:** inventing January apps for campuses that have not published a slip; admit-card windows still NOT ANNOUNCED unless circular says so.
**Handoff:** Agent 02 should stop “DU tomorrow” copy; Agent 06 verify `/calendar` month views for Nov–Jan chips.

### Changelog — 2026-11-11 ~16:05 +06 · Agent 02 (News Intelligence)
- Replaced spice cycle **n1022-*** → **n1111-*** (9 cards): DU OPEN now, BUET 10 Nov notice, UGC floor still live, DGME 18 Dec circular missing, KUET live, JU hold, AAUB complied, retake split, desk checklist.
- `public/alerts-feed.json` cycle **n1111-day-news** (was stale 10 Nov 22:15).
- Super-head + newswire lede tense fixed (removed TOMORROW / calendar-died-only framing).
- Watch was already current (du-apps-open-11nov) — left intact.
- Verified against: DU portal, TBS, Observer, Prothom Alo, Jago News, Daily Campus, bdnews24, Digi Bangla (AAUB).
### 2026-11-11 ~16:05 +06 — Agent 04 (University DB) — directory + circular accuracy pass

**Scope:** Structured university records + circular fields that drive cards (not spice/news).

**Verified & updated:**
- **DU:** directoryNote → apps **OPEN** 11–25 Nov; portal; ~6,125 seats; five units; not GST. Fee note: pay portal amount (secondary guides disagree ৳1,050 vs ৳1,200).
- **BUET:** 1,309 seats; apps **21 Nov**, close **not announced**; test 16 Jan 2027; GPA wall; rejected UGC floor (10 Nov notice).
- **KUET:** apps **OPEN** 10 Nov–10 Dec; 1,105 seats; feeNote centre ৳1,500/1,800; centres KUET/DU/RUET.
- **CUET / RUET:** directory notes mark test dates as provisional; no invented app windows.
- **JU:** dropped third-party juadmission.tech as admissionUrl → juniv.edu; circular still thin.
- **JnU:** note aligns with 15 Nov–10 Dec / ~2,957 seats from stored circular.

**Not fabricated:** medical formal circular still missing; CUET/RUET app windows; BUET close date; exact DU fee if portal differs from guides.

**Files:** `src/data/universities.ts`, `src/data/circulars.ts`, `src/data/types.ts` (ARCHIVE_STAMP 2026-11-11).

### 2026-11-11 ~16:10 +06 — Agent 01 / RADAR (Admissions Intelligence) — KUET official PDF attached

**Mission:** Comprehensive circular audit + make actual documents accessible.

**What changed:**
- **KUET (`c-kuet`)**: Located and attached the **official PDF**  
  `https://admission.kuet.ac.bd/uploads/notices/1.UG-Admission-2026-Circular.pdf`  
  (live “Download circular” on admission.kuet.ac.bd).  
  - `pdfUrl` set (was null).  
  - Added `KUET_OFFICIAL` + `KUET_PORTAL` SourceRefs.  
  - Eligibility hardened: HSC Science, SSC ≥4.00, PCME combined ≥16.00 (relaxed).  
  - Fee note + centres (Khulna / DU / RUET) + 1,105 seats confirmed from portal.  
  - Summary + confidenceNote + notes updated to point students at the real PDF.

**Verified still true (no invention):**
- DU apps OPEN (portal live 11 Nov).  
- BUET apps from 21 Nov, test 16 Jan 2027; close still unannounced.  
- Medical / DGME formal circular **still missing** (exam 18 Dec reported only).  
- CUET / RUET / others remain thin or provisional.

**Restored:** Accidental PLACEHOLDER overwrite of `circulars.ts` was immediately reverted with full seed + the KUET PDF patch.

**Files:** `src/data/circulars.ts` only.  
**Coordinate:** Agent 03 calendar already derives from this; Agent 06 can verify CIRCULAR ✓ badge + PDF open on `/circulars/c-kuet`.

