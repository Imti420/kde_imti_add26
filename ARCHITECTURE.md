# ADMISSION//26 — Architecture (Agent 01)

**Owner:** Agent 01 (Chief Engineer)  
**Human owner:** Imti  
**Commander:** ChatGPT (priorities)  
**Baseline commit inspected:** `55fb7bb` (2026-11-11)  
**Live:** https://kdeimtiadd26.vercel.app

This file is the **shared technical contract**. Departments edit their surfaces; they do not invent parallel schemas, dual handoffs, or competing data owners.

---

## 1. What the product is

Client-first Bangladesh public-university admission desk (session **2026–27**):

| Surface | Role |
|---------|------|
| Desk / shortlist / tracker | Personal local state |
| Universities + circulars | Canonical admission facts |
| Calendar | Derived from circulars + personal events |
| Newswire | Editorial spice cards (desk-authored) |
| Discovery / monitor | Crawler health + source verification |
| Settings | Theme, Bangla, Naughty, desk alerts |

**Not:** a multi-tenant SaaS. Personal data is **localStorage**. Auth/DB exist in the platform template but are **not** the admission product spine.

---

## 2. Stack (verified)

| Layer | Choice |
|-------|--------|
| UI | React 19 + TanStack Router / Start |
| Styling | Tailwind v4 + `src/styles.css` component classes |
| State (personal) | `src/lib/store.ts` (localStorage) |
| Domain data | Static TypeScript modules under `src/data/*` |
| Crawl outputs | `public/ops`, `public/wire`, `public/verification`, `public/alerts-feed.json` |
| Automation | GitHub Actions: discover-admissions, crawl-newswire, verify-monitor |
| Deploy | Vercel from `main` |
| Notifications | Client + `public/sw.js` + `src/lib/desk-push.ts` (no central VAPID store) |

---

## 3. Data flow

```text
[GitHub Actions crawlers]
        │ write JSON / reports
        ▼
 public/ops · public/wire · public/verification · alerts-feed.json
        │
        │  UI polls / imports
        ▼
 src/routes/*  ◄── imports ──  src/data/*  (seed truth)
        │                         ▲
        │                         │ Agent 02/03 edit seeds
        ▼
 src/lib/catalog · status · calendar · desk-push
        │
        ▼
 localStorage (shortlist, progress, notes, push seen-ids)
```

**Hard rule:** Desk-authored newswire (`desk-spice.ts`) is **not** overwritten by the crawler. Crawler feeds discovery/monitor/wire artifacts; humans/agents own circular confidence and spice voice.

---

## 4. Canonical types (`src/data/types.ts`)

Shared contracts — **do not fork**:

- `University` — id, names, track, city, website, admissionUrl
- `Circular` — dates, seats, eligibility, units, `publication`, `confidence`, pdfUrl, sources
- `WatchItem` — desk watch list
- `AppStatus` / `Confidence` / `Publication` — status language
- Personal: `PersonalEvent`, `DeskNote`, `Progress`, desk layout

Spice cards live in `desk-spice.ts` as `SpiceCard` (id, heat, kicker, headline, body, punch, sources).

**Id rules**

- University ids: stable short keys (`du`, `buet`, `kuet`, …)
- Circular ids: `c-*`
- Spice ids: rotate on every NEWS cycle (`n1022-*`, …) so alert fan-out treats them as new

---

## 5. File ownership (one writer)

| Path | Primary owner | Notes |
|------|---------------|-------|
| `src/data/types.ts` | **Agent 01** | Schema changes need Commander approval |
| `src/data/circulars.ts` | Agent 03 (RADAR / A) | Truth + confidence |
| `src/data/universities.ts` | Agent 03 | Directory |
| `src/data/watch.ts` | Agent 03 | Desk watch notes |
| `src/data/desk-spice.ts` | Agent 02 (WIRE / B) | **Only one writer** |
| `src/data/voices.ts` | Agent 02 / 05 | Street voice lines |
| `src/data/source-manifest.ts` | Agent 04 | Crawl targets |
| `public/alerts-feed.json` | Agent 02 (+ 01 if contract break) | Alert fan-out companion |
| `public/ops/**`, `public/wire/**`, `public/verification/**` | Agent 04 | Automation output |
| `scripts/crawl-*.ts`, `.github/workflows/*` | Agent 04 | Infrastructure |
| `src/lib/desk-push.ts`, `public/sw.js` | Agent 06 + 01 | Notifications reliability |
| `src/lib/i18n.tsx` | Agent 05 | EN/BN dictionary |
| `src/components/shell.tsx`, `styles.css`, uni cards | Agent 05 | UI / mobile |
| `src/routes/calendar.tsx` | Agent 05 | Must keep `useT()` |
| `src/lib/store.ts`, `catalog.ts`, `status.ts` | Agent 01 | Shared integration |
| `DESK_HANDOFF.md` | All (append-only changelog) | Operational memory |
| `DESK_CREW.md` / `DESK_RADIO.md` | Coordination | Claims, not product |
| `ARCHITECTURE.md` | **Agent 01** | This contract |

**Legacy callsign map** (keep both labels in docs until Commander retires one):

| New agent | Callsign | Lane |
|-----------|----------|------|
| 01 Arch | (cross-cutting) | types, store, integration |
| 02 Intel | WIRE | B spice / wire |
| 03 Admissions | RADAR | A circulars / watch |
| 04 Infra | PULSE | C crawler / ops |
| 05 Creative | SHELL | D UI / i18n |
| 06 QA | SIREN | E push / verification |

---

## 6. Integration risks (current)

1. **Dual handoff files** — `DESK_HANDOFF.md` and `DESK-HANDOFF.md` both exist. Canonical = **`DESK_HANDOFF.md`**. Do not write the hyphen variant.
2. **Dual crew systems** — RADAR/WIRE lanes vs Agent 01–06. Use the map above; claim on `DESK_CREW.md` before product edits on swarm prompts.
3. **Spice ↔ alerts** — NEWS must update **both** `desk-spice.ts` **and** `alerts-feed.json` with **new ids**, or notifications stay quiet for users who already saw old ids.
4. **Circular confidence** — UI (`status.ts`, pills) assumes `Confidence` / `Publication` enums. Do not invent free-string statuses.
5. **i18n footgun** — any `t(...)` usage requires `const t = useT()`. Broken builds / runtime `t is not defined` are known.
6. **Push honesty** — no server-side subscriber list. Do not claim “all users notified.”
7. **Auth/DB template** — `src/lib/db.ts`, better-auth, migrations exist; admission product must not depend on them unless Commander turns accounts ON.
8. **Crawl vs desk** — automated commits (`chore(ops)`, `chore(wire)`) must not clobber hand-authored circular confidence or spice.

---

## 7. Change protocol

1. Swarm / parallel work → radio → claim → product (see `DESK_CREW.md`).
2. Schema or shared lib change → Agent 01 reviews; large cross-dept → Commander.
3. After product work → append **Changelog** on `DESK_HANDOFF.md` (date, files, risks).
4. Prefer `npm run typecheck` / existing tests under `src/lib/**/*.test.ts` before large merges.

---

## 8. Non-goals (Agent 01)

- Redesigning the whole app
- Rewriting Agent 02/03 content for voice preference
- Inventing a second notification backend without Commander approval
- Manufacturing commits to look busy

---

## 9. Next engineering priorities (recommendations to Commander)

1. Delete or redirect `DESK-HANDOFF.md` → single handoff.  
2. Align Agent 01–06 labels into `DESK_CREW.md` permanently.  
3. Document spice + alerts-feed dual-write as a one-line checklist in Agent 02 prompts.  
4. Keep circular PDF/portal fields as the CTA contract for university profiles.
