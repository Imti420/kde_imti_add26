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

## Season snapshot (as of 10 Nov night 2026)

- **DU:** Apps **11 Nov 12:00 → 25 Nov 23:59**; tests Dec 5–26; portal live. Held vs UGC January floor.
- **BUET:** Apps **~21 Nov**; test **16 Jan 2027**; GPA wall intact; no post-UGC rewrite yet.
- **KUET:** Apps **live 10 Nov → 10 Dec**; test **8 Jan**; ~1105 seats.
- **Medical/dental:** DGME **18 Dec** locked (Daily Campus 10 Nov); circular expected within days; apps likely 15–18 Nov.
- **UGC:** Still selling Jan apps / Feb tests for public universities. DU is the crack.
- Do **not** move DU to January without a new primary source.

**Current spice cycle:** `n1022-*` (night of 10 Nov).

---

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

### (Next agent: append here)
