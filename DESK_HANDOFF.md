# ADMISSION//26 — Agent handoff (read before any upgrade)

**Repo:** https://github.com/Imti420/kde_imti_add26  
**Live:** https://kdeimtiadd26.vercel.app  
**Owner / product voice:** Imti — Grok agents are the *brain*; the crawler is dumb. Prefer researched desk copy over raw crawl noise.

**Multi-agent:** If several chats get the same `GO UPDATE`, coordinate via [`DESK_CREW.md`](./DESK_CREW.md) — callsigns WIRE / CIRC / SIGNAL / SHELL / SCOUT, claim a lane, don’t all edit the same files.

**Standing commands the user reuses across agents:**
- `GO UPDATE` → hunt web for new/changed circulars (DU, BUET, medical, GST, privates…), update `circulars` / `watch` / desk notes, push if anything moved.
- `GO UPDATE NEWS` → fresh research on that day’s admission + edtech mess, **replace all 9 spicy cards** with new desk pieces, push.
- After every upgrade: **append Changelog** at the bottom of **this file** so the next bot is not amnesiac.

---

## Multi-agent crew (parallel GO UPDATE)

When the owner pastes **GO UPDATE** into several chats at once:

1. Open [`crew/BOARD.md`](crew/BOARD.md) + [`crew/ROSTER.md`](crew/ROSTER.md).
2. Claim a **callsign** and **one lane** on the board (commit that claim first).
3. Work only your lane; do not all rewrite spice cards.
4. Mark DONE + append Changelog here.

Solo sessions may take every lane but should still sign the board.

---

## What this product is

Bangladesh public-university admission desk for session **2026–27**: universities, circulars (dates/seats/eligibility), calendar, discovery/crawl log, newswire (editorial spice cards), settings, desk alerts / OS notifications, Bangla mode, Naughty mode.

Stack: TanStack Start / Vite / Tailwind, data in `src/data/*`, client personal state in localStorage, GitHub Actions crawlers, Vercel deploy from `main`.

---

## Critical paths (do not wander blind)

| Area | Path |
|------|------|
| Spice / newswire cards | `src/data/desk-spice.ts` (`SPICE_CARDS`, ~9 cards) |
| Circulars | `src/data/circulars.ts` |
| Watch / desk notes | `src/data/watch.ts` |
| Universities seed | `src/data/universities.ts` (or catalog builders under `src/lib/catalog`) |
| i18n EN/BN | `src/lib/i18n.tsx` — `useT()`, `LangProvider`, `LangToggle` |
| Theme + Naughty + Chrome toggles | `src/components/theme.tsx` — `ChromeToggles` = বাংলা + Day/Night |
| Shell / nav | `src/components/shell.tsx` |
| Calendar | `src/routes/calendar.tsx` |
| Discovery log UI | `src/routes/discovery.tsx` |
| Notifications / frantic alerts | settings + SW / `desk-push` style modules (see recent commits) |
| Crawler schedule | `.github/workflows/discover-admissions.yml` — **cron every 45 min** (`*/45 * * * *`) |
| Newswire crawl | `.github/workflows/crawl-newswire.yml` |
| Global motion / CSS | `src/styles.css`, `src/components/motion.tsx` |

---

## Non-negotiable product decisions (do not undo)

| Decision | Detail |
|----------|--------|
| **Desk > crawler** | Spicy news is authored in `desk-spice.ts`. Crawler feeds discovery/monitor; it does not own the newswire voice. |
| **~9 spice cards** | Editorial cards with heat tags (`HOT` / `SYSTEM` / `MARKET` / `WAR` / `STREET` / `SCAM` / etc.), not a sad headline grid. Rotate **ids** when replacing so alert fan-out treats them as new. |
| **Circular truth** | Seats, subjects, GPA, fees on circular records. Prefer `confidence` + `confidenceNote` over inventing certainty. |
| **University CTAs** | Uni detail: **Official portal**, **Circular / PDF**, **Open circular page**. Grid badges when portal/PDF on file. |
| **Bangla is whole-site** | Expand `i18n.tsx` dictionary; do not leave half-translated chrome. Toggle lives in header via `ChromeToggles`. |
| **Calendar / i18n crash** | Any component using `t(...)` **must** `const t = useT()`. Past production break: `t is not defined`. Never write `setError("{t(\"…\")}")` or `confirm("t(\"…\")")` — call `t()` as a function. |
| **Naughty / horny mode** | Settings secret → `html.naughty` pink theme. User asked for it; keep it. Theme color + badge in `theme.tsx`. |
| **Desk alerts** | OS notifications for news, new circular PDFs, **frantic day-of** open/close/exam stacks (several pings). Settings: enable + **SCREAM NOW** test. |
| **Honest push limits** | No central VAPID push server yet. Alerts when installed app/tab runs the checker. Do not claim SMS / guaranteed background push. |
| **Mobile calendar** | Phone-first: sticky dock, count badges on month cells, snap week cards, sheet-style day panel. |
| **Discovery feels alive** | Snappier motion, poll ~20s, live/refresh bars, stronger ACTIVE pulse, crawler **every 45 minutes** (not 3h). |
| **Security** | User has pasted GitHub PATs in chat before — treat as compromised; never echo tokens; prefer rotating. |

---

## Features already shipped (multi-agent history)

Do not re-implement from scratch; extend these.

### From early / parallel agents
- **Notifications** — reliable `registration.showNotification`; Settings **SCREAM NOW**; frantic 4–5 stacks on reg open / close / exam days.
- **Big news / spice cycles** — rotating `SPICE_CARDS` (e.g. `n0911-*` and later cycles); new ids force alert fan-out.
- **Circular PDF / portal on profiles** — `pdfUrl`, admission URLs, CTA bar, `CIRCULAR ✓` / `PORTAL ✓` style badges.
- **Naughty (horny) mode** — `a26-naughty` localStorage, `html.naughty`, pink theme-color, “Soaked” badge.
- **`t()` not found fix** — calendar `EventDetail` and form paths must call `useT()`.
- **Phone capabilities** — mobile calendar redesign; press/snap polish in CSS.

### From this thread’s agents (Nov 8–10 2026)
- **Crawler schedule** aligned to **45 min** in Actions + UI copy (`INTERVAL_MINUTES = 45`).
- **Snappier global animations** — shorter durations, sharper easing, faster CountUp, tighter log-in stagger.
- **Discovery log** — faster poll, scan bar while refreshing, `LIVE · CRAWLING` / `REFRESHING LOG` labels.
- **Desk data cycles** — DU apps 11–25 Nov 2026; BUET apps ~21 Nov / test 16 Jan 2027 hard GPA wall; medical ~18 Dec (circular often still pending); HSC retake pressure documented in `watch.ts`.
- **Bangla mode** — `src/lib/i18n.tsx`, `LANG_BOOT`, Noto Sans Bengali, header **বাংলা / EN** beside Day/Night via **`ChromeToggles`** (must ship as one group or production tree-shakes `LangToggle`).
- **Calendar mobile UI** — sticky controls, larger targets, agenda/week/month polish.

---

## Season snapshot (verify before rewriting)

- **DU 2026–27:** Apps **11–25 Nov 2026**; tests Dec 5–26 (IBA → Science → Arts → Fine Arts → Business); classes ~28 Mar 2027. Portal: `admission.eis.du.ac.bd`.
- **BUET:** Apps from **~21 Nov**; test **16 Jan 2027**; strict GPA-5 + A+ Phy/Chem/Higher Math; ~10k sit.
- **Medical/dental:** Test messaging **~18 Dec 2026**; circular/application window often still thin; retake cohort at risk.
- **GST / clusters:** Fragmentation — some unis prefer own tests; engineering cluster already independent in places.
- Do **not** silently move DU to January without a new primary source.

---

## Known footguns

- **Vercel build red** → live stays on last green deploy. Always fix syntax before assuming “user can’t see feature.”
- **Tree-shaking** → isolated `LangToggle` import was dropped from prod bundle; keep language control inside `ChromeToggles` with ThemeToggle.
- **Broken i18n stringification** → `setError("{t(\"key\")}")` breaks parse/build; use `setError(t("key"))`.
- **Vercel chunk cache** → `Failed to fetch dynamically imported module` after deploys; hard refresh.
- **universities.ts wipe** → restore from git history if seeds vanish.
- **Actions git races** → use existing publish/rebase patterns when crawlers push.
- **Alert enabled but quiet** → Focus Assist, frantic keys already seen, or SW not running — use SCREAM NOW.

---

## Upgrade checklist (mandatory)

1. **Read this file** (especially Changelog + Non-negotiables).
2. Work on `main` of `Imti420/kde_imti_add26`; confirm live hash after push.
3. Research only what the user asked; cite sources on circular/spice claims.
4. News cycle → **new spice `id`s**; wire feed/SW if alerts should see them.
5. Circular PDF/portal → set URLs; expect NEW CIRCULAR alerts.
6. Touch calendar / i18n / settings → keep `useT`, Naughty, SCREAM NOW, ChromeToggles.
7. Prefer typecheck/build when possible; **do not leave `main` red on Vercel**.
8. **Append Changelog** below: date, what changed, files, footguns for the next agent.

---

## Changelog (append only)

### 2026-11-10 ~15:10 +06 — agent continuity + notification reliability
- Added `DESK_HANDOFF.md` so agents share memory across sessions.
- Notifications: page-side `registration.showNotification`; Settings **SCREAM NOW**; frantic stacks on open/close/exam days.
- KUET / portal+PDF CTAs; desk spice cycles; Naughty, Bangla, calendar `useT` fix still in force.

### 2026-11-10 ~15:15 +06 — expand handoff (this message)
- User asked every agent to leave context after upgrades; this file is that contract.
- Documented multi-agent feature set: notifications, big news, circular PDFs, Naughty mode, `t()` fix, phone calendar, discovery 45‑min crawl, Bangla `ChromeToggles`, animation polish.
- Recorded production footguns: Vercel red builds, LangToggle tree-shake, broken `t()` stringification.

### 2026-11-10 ~15:20 +06 — continuity confirmed (this agent)
- User reported notifications OK; asked that **every** agent leave a small context pack for the next bot.
- Confirmed `DESK_HANDOFF.md` already exists and is the contract — do not fork a second handoff file.
- This session: no product code change; verified feature map still matches tree (voices, desk-spice n1011 cycle, desk-push + SCREAM NOW, pdfUrl, i18n `t()`, Naughty/horny experiment, university-card campusVoice).
- Next agent: read Changelog + Non-negotiables first; on **GO UPDATE** refresh research + spice/circulars; always append here.

### 2026-11-10 ~15:25 +06 — crew board (parallel agents)
- Added `crew/ROSTER.md` (callsigns: Abrar, Raju, Savar, Tejgaon, Kuril, Float).
- Added `crew/BOARD.md` (lanes + claim protocol).
- Parallel `GO UPDATE`: each agent claims one lane on the board before editing product files.
- Still one product brain: this handoff file + board; no five competing handoffs.


### 2026-11-10 ~15:20 +06 — crew board (ARCHIVIST)
- Added/refreshed `DESK_CREW.md`: callsigns, lanes A–F, claim protocol for parallel `GO UPDATE`.
- Handoff points at crew board so agents split work instead of cloning the same doc pass.

### 2026-11-10 ~15:30 +06 — Raju / SPICE lane (parallel GO UPDATE test)
- Claimed SPICE only on crew board; did not touch circulars/voices/i18n.
- Replaced all spice cards with **n1010e-*** ids (alert fan-out): DU opens **tomorrow noon**, UGC vs DU, retake wall, BUET hold, medical ~18 Dec, KUET, GPA crash, other public clocks, desk discipline note.
- Sources: DU portal, Daily Star, TBS, Observer, bdnews24 (9–10 Nov).


### 2026-11-10 ~15:25 +06 — RADAR lane A (GO UPDATE circulars)
- Callsign RADAR; claimed+finished lane A only.
- `watch.ts`: DU opens 11 Nov noon (held vs UGC); medical 18 Dec confirmed, circular pending; BUET 21 Nov / 16 Jan; season split note.
- `circulars.ts`: DU/medical stamps → 2026-11-10; TBS “open tomorrow” source; medical note still no PDF.

### (Next agent: append here — date, bullets, files touched)

### 2026-11-10 ~15:17 +06 — DESK_CREW multi-agent board
- Added `DESK_CREW.md`: named lanes (WIRE/CIRC/SIGNAL/SHELL/SCOUT), claim protocol, scout drops.
- Parallel `GO UPDATE` across chats should split work via git claims, not five identical upgrades.

### 2026-11-10 ~15:25 +06 — RADAR (lane A) circular pass
- **KUET** already live on file (apps today → 10 Dec); watch item added.
- **BUET** hardened: 21 Nov apps / 16 Jan test / GPA wall / 1309 seats; portal `ugadmission.buet.ac.bd` as pdfUrl.
- **DU** + **DGHS** portal links on circular records; medical still 18 Dec, circular pending.
- Crew mission `mission-2026-11-10-go` lane A → done.
