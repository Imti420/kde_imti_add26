# ADMISSION//26 — Agent handoff (read before any upgrade)

**Repo:** https://github.com/Imti420/kde_imti_add26  
**Live:** https://kdeimtiadd26.vercel.app  
**Owner / product voice:** Imti — Grok agents are the *brain*; the crawler is dumb. Prefer researched desk copy over raw crawl noise.  
**Standing command:** User says `GO UPDATE` → research admissions/edtech, fix data, push. User will reuse this chat pattern across agents.

After **every** upgrade, append a short entry under **Changelog (append only)** at the bottom. Keep this file accurate so the next agent is not amnesiac.

---

## What this product is

Bangladesh public-university admission desk for session **2026–27**: universities, circulars (dates/seats/eligibility), calendar, discovery/crawl log, newswire (editorial spice cards, not sad headline grid), settings, PWA-ish desk alerts.

Stack: TanStack Start / Vite / Tailwind, data in `src/data/*`, client personal state in localStorage, GitHub Actions crawlers, Vercel deploy from `main`.

---

## Non-negotiable product decisions (do not undo)

| Decision | Detail |
|----------|--------|
| **Desk > crawler** | Spicy news is authored in `src/data/desk-spice.ts` (`SPICE_CARDS`). Crawler feeds discovery/monitor; it does not own the newswire voice. |
| **3–9 spice cards** | Newswire is editorial cards with heat tags (`HOT` / `NUKE` / `WAR` / etc.), not a sad grid of headlines. |
| **Circular truth** | Seats, subjects, GPA bars, fees live on circular records in `src/data/circulars.ts`. Prefer `confidence` + `confidenceNote` over inventing certainty. |
| **University profile CTAs** | Uni detail must show **Official portal**, **Circular / PDF**, **Open circular page**. Grid badges: `CIRCULAR ✓` / `PORTAL ✓`. |
| **Bangla is whole-site** | `src/lib/i18n.tsx` + `useT()` — expand dictionary; do not leave half-translated pages. |
| **Calendar crash** | `EventDetail` (and any component using `t(...)`) **must** call `const t = useT()`. Past bug: `t is not defined`. |
| **Naughty mode** | Settings secret toggle → `html.naughty` pink/horny theme via `src/lib/theme.tsx` / theme components. User asked for it; keep it. |
| **Desk alerts** | OS notifications for news, new circular PDFs, and **frantic day-of** open/close/exam stacks. Settings: enable + **SCREAM NOW** test. |
| **Honest about push limits** | No central push server / VAPID store yet. Alerts fire when the installed app/tab runs the checker (open, focus, SW). Do not claim SMS blast to all phones. |

---

## Critical files

| Path | Role |
|------|------|
| `src/data/desk-spice.ts` | Editorial news cards. **New `id`s** = treated as NEW NEWS for alerted devices. |
| `src/data/circulars.ts` | Circulars; set `pdfUrl`, dates, seats, eligibility. |
| `src/data/universities.ts` | `U()` seeds; always set `admissionUrl` when known. |
| `src/lib/desk-push.ts` | Alerts: news, circular PDF, frantic stacks, `screamNow()`. |
| `src/components/desk-push-boot.tsx` | Mounts alert loop in shell. |
| `public/sw.js` | Service worker; prefers `registration.showNotification`. |
| `public/alerts-feed.json` | Feed for SW background peek. |
| `src/routes/universities/$id.tsx` | Portal + PDF CTA bar. |
| `src/routes/settings.tsx` | Desk alerts panel + SCREAM NOW + Naughty. |
| `src/lib/i18n.tsx` | en/bn strings. |
| `src/routes/calendar.tsx` | Must keep `useT()` in every `t()` consumer. |
| `DESK_HANDOFF.md` | **This file** — update after every upgrade. |

### Portals worth keeping (bookmark list)

| Institution | Portal |
|-------------|--------|
| DU | https://admission.eis.du.ac.bd/ |
| JU | https://juadmission.tech/ |
| RU | https://admission.ru.ac.bd/ (or ru.ac.bd) |
| CU | https://admission.cu.ac.bd/ |
| KU | https://admission.ku.ac.bd/ |
| KUET | https://admission.kuet.ac.bd/ |
| BUET | https://ugadmission.buet.ac.bd/ |
| SUST | https://admission.sust.edu.bd/ |
| MIST | https://mist.ac.bd/study-with-us/menu/apply-online |
| BUP | https://bup.edu.bd/ |
| GST | https://gstadmission.ac.bd/ |
| Agri cluster | https://sau.edu.bd/ |

---

## Alert system (how it actually works)

1. User: Settings → **Turn on desk alerts** → browser permission **granted**.
2. `enableDeskPush()` registers `/sw.js`, seeds news/circular baselines, clears **frantic** day keys, runs pass.
3. `runDeskAlertPass()`:
   - New `SPICE_CARDS` ids → `NEW NEWS · {heat}`
   - Circulars with new `pdfUrl` → `NEW CIRCULAR · {UNI}`
   - Calendar moments for **today** (`applicationOpens` / closes / exam / admit / result) → **4–5 frantic pings**
4. Delivery: **`ServiceWorkerRegistration.showNotification` from the page** (not postMessage-only). Unique tags. Windows was silent when we only postMessaged the worker.
5. **SCREAM NOW** (`screamNow()`): clears frantic seen, forces today's open/close/exam stacks (KUET open guaranteed on 2026-11-10). Use when debugging empty tray.
6. Standing rule: **whenever you add a circular with `pdfUrl`, treat it as notify-worthy** (new id or updated pdf).

### Frantic open-day copy pattern

`KUEEEET ADMISSION REGISTRATION AHHHHHHHH>>>>!!!!!!`  
(+ wake up / hurry / still not applied / last call)

---

## Data highlights (as of last desk pass — verify before changing)

- **KUET (`c-kuet`)**: Circular live. Apps **2026-11-10 10:00 → 2026-12-10 17:00**, test **2027-01-08**, ~**1105** seats, portal PDF link, HSC combined GPA Math+Phy+Chem+Eng **≥ 16.00** (lowered from 18).
- **DU**: Apps **11–25 Nov 2026** (held after evening committee vs UGC January floor). PVC on record. Portal noon 11 Nov is the operational test.
- **UGC floor (9 Nov)**: National line was apps from January / tests after Feb — **DU diverged**. Season is split; do not silently “fix” DU to January without a new primary source.
- **BUET**: Portal on file; formal circular still thin — do not invent a PDF.
- **MIST**: Revised test map mid/late Jan 2027 in archive; app window may still be pending formal circular.
- **SUST**: Tests 17–18 Jan 2027 (reschedule); app window thin.

Spice cycle ids were rotated to `n0911-*` (midnight 9→10 Nov) so alert devices treated them as new.

---

## Known footguns

- **Vercel chunk cache**: users may see `Failed to fetch dynamically imported module` after deploys — hard refresh; avoid broken dynamic imports.
- **`t is not defined`**: missing `useT()` in a component that calls `t`.
- **universities.ts corruption**: once wiped mid-session; restore from git history if U() seeds vanish.
- **Concurrent GitHub Actions** git push races: use existing `git-publish.sh` rebase loop if touching crawler publish.
- **Alert “enabled” but empty tray**: old postMessage path, Focus assist, or frantic keys already marked seen — use SCREAM NOW + `registration.showNotification`.
- **Do not** claim central push to all users without a real subscription backend.

---

## Upgrade checklist (for the next agent)

1. Read **this file** end-to-end (and latest Changelog entries).
2. `git pull` / clone `main`; skim `desk-spice.ts`, `circulars.ts`, `desk-push.ts`.
3. Research only what the user asked; do not mass-rewrite stable circulars without sources.
4. If adding news: **new spice `id`s**, update `public/alerts-feed.json` if SW feed should see them.
5. If adding circular PDF/portal: set `pdfUrl` + uni `admissionUrl`; expect NEW CIRCULAR alerts.
6. If touching calendar/i18n/settings: keep `useT`, Naughty, SCREAM NOW.
7. `npm run typecheck` / build when practical; push `main`.
8. **Append Changelog** below with date, commit, and 3–8 bullet facts for the next bot.

---

## Changelog (append only)

### 2026-11-10 ~15:10 +06 — agent continuity + notification reliability
- Added this `DESK_HANDOFF.md` so agents share memory across sessions.
- Notifications: page-side `registration.showNotification`; Settings **SCREAM NOW**; frantic 4–5 stacks on open/close/exam days.
- KUET circular live on profiles; uni CTA bar (portal + PDF); desk spice `n0911-*` cycle (DU vs UGC, portal countdown, etc.).
- Prior session baggage still in force: Naughty mode, full Bangla push, calendar `useT` fix, discovery snappy crawl UI, Grok-as-brain over dumb crawler.

### (Next agent: append here)
