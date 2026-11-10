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

### (Next agent: append here)
