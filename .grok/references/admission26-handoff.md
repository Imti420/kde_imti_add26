# ADMISSION//26 — Agent Handoff

**Read this before any upgrade.** Different Grok instances do not share memory.
This file is the continuity layer. After every meaningful change, append a short
dated entry under **Changelog** and update the **Current state** section.

Repo: https://github.com/Imti420/kde_imti_add26  
Live: https://kdeimtiadd26.vercel.app  
**Multi-agent board:** `.grok/desk/BOARD.md` — claim a callsign + one work slice when several agents get the same prompt.  
Owner protocol: plain `GO UPDATE` = hunt circulars + refresh data/watch/notes (split on the board).  
`GO UPDATE NEWS` = rewrite all 9 desk-spice cards for that day’s news.

---

## Current state (as of 10 Nov 2026)

### Stack
- TanStack Router + React/TSX, Tailwind + custom CSS variables
- Data is mostly baked in `src/data/*` (not a live DB for circulars/spice)
- Wire crawler: 55-minute cycle, published to `public/wire/` style artifacts
- LocalStorage keys in use: `a26-naughty`, `a26-theme`, `admission26.wire.desk.v1`

### Signature features already shipped
1. **Desk spice (9 cards)** — `src/data/desk-spice.ts`  
   Hand-written spicy briefings, not crawler headlines. Heat tags: HOT / SYSTEM / MARKET / WAR / STREET / SCAM / **NUKE**.

2. **UGC Nuke Super-Head** — `src/components/newswire.tsx` → `UgcNukeSuperHead`  
   Full-width black/red breaking banner on `/newswire` and homepage `WireStrip`.  
   Lead story: UGC 9 Nov 2026 postponed *all* public uni admission tests. Apps from 1 Jan 2027, tests after 1 Feb. DU was opening 11 Nov.

3. **People’s thought lines** — every university card carries raw street voice (can be negative). See uni card components + any `voices` / notes data.

4. **Naughty / desk-experiment mode** (creator-only, buried)  
   - Toggle in Settings → collapsible “desk experiment” panel  
   - localStorage `a26-naughty`  
   - Hot-pink palette, throb / heart-beat / label-pulse animations in `src/styles.css`  
   - `NaughtyBadge` next to ThemeToggle in shell  
   - Implementation: `src/components/theme.tsx` (`applyNaughty`, `resolveNaughty`)

5. **Circular archive** — `src/data/circulars.ts`  
   DU and BUET currently flagged **SUPERSEDED / UNDER UGC PRESSURE** after the 9 Nov decision. Medical (DGME) still on 18 Dec track (not under UGC).

6. **Watch board** — `src/data/watch.ts`  
   Lead item is the UGC calendar nuke; then DU window ghost; medical orphan under DGME.

7. **Newswire page** — `/newswire`  
   Status strip (55-min cycle) → **UgcNukeSuperHead** → nine spice cards labelled “FALLOUT FROM THE NUKE” → crawler feed + manual desk form.

8. **Notifications** — UI surface exists (bell + count in chrome). Treat as live; do not regress the count/badge wiring.

9. **i18n / `t()`** — previous “t() not found” issue was fixed. Do not reintroduce bare `t()` calls without the i18n harness that is already in the tree.

10. **Phone / mobile capabilities** — recent work improved mobile layout and touch targets. Keep responsive grids (spice cards are 1/2/3 col) and do not break the shell nav on small screens.

### Important files
| Path | Role |
|------|------|
| `src/data/desk-spice.ts` | The 9 spicy cards (edit on `GO UPDATE NEWS`) |
| `src/data/circulars.ts` | Circular archive (edit on `GO UPDATE`) |
| `src/data/watch.ts` | Short watch list on homepage / desk |
| `src/components/newswire.tsx` | WireStrip + UgcNukeSuperHead + WireHeadline |
| `src/routes/newswire.tsx` | Full newswire page |
| `src/components/theme.tsx` | Theme + naughty mode |
| `src/styles.css` | All custom animations (including nuke + naughty) |
| `src/routes/settings.tsx` | Buried desk-experiment toggle |

### Push method note
Local git in the sandbox is often sparse / incomplete. Prefer **GitHub Contents API** pushes with the owner’s token when `git push` is unreliable. Always update this handoff in the same session as the code change.

### Editorial voice
Spicy, desk-written, Bangladesh admission-season register. Negative street voice is allowed on uni cards. Source every factual claim. Distinguish “news report” from “official circular”.

---

## Changelog (append only)

### 2026-11-10 — Multi-agent desk board
- Added `.grok/desk/BOARD.md`: callsigns + claimable work slices so several agents can split a `GO UPDATE` instead of all doing the same job.
- Callsigns: Circular Hound, Spice Desk, Wire Runner, Nuke Watch, Street Voice, Medical Orphan, Coaching Street, Shell Boss.
- Root `DESK-HANDOFF.md` now points at the board; protocol is claim → work → done → push.
- Files: `.grok/desk/BOARD.md`, `DESK-HANDOFF.md`, this handoff.

### 2026-11-09 / 2026-11-10 — UGC Nuke + Super-Head
- UGC postponed all public uni admissions (apps 1 Jan 2027, tests after 1 Feb). Integrated as lead.
- Added `UgcNukeSuperHead` (massive breaking banner) + NUKE heat class + scanline/pulse CSS.
- Rewrote all 9 `SPICE_CARDS`; lead id `spice-ugc-nuke`.
- Marked DU circular SUPERSEDED PENDING LOCAL NOTICE; BUET UNDER UGC PRESSURE.
- Watch board rewritten around the nuke / DU ghost / medical orphan.
- Files: `desk-spice.ts`, `newswire.tsx` (component + route), `styles.css`, `circulars.ts`, `watch.ts`.

### Earlier (pre-handoff, still true)
- 9 spicy desk cards replaced sad headline grid.
- Naughty mode (hot-pink, throb badge) buried in Settings.
- People’s-thought lines on every university card.
- Wire crawler + 55-minute desk status.
- Notifications chrome present.
- `t()` resolution fixed; mobile shell improved.

---

## Protocol for the next agent

1. Read this file + `DESK-HANDOFF.md` + **`.grok/desk/BOARD.md`**.
2. If other agents may be live on the same prompt: **claim a callsign and one slice on the board**, push the claim, then work.
3. Do the requested upgrade (only your slice if coordinated).
4. Write results to board “Done this cycle”; append a Changelog entry here if user-visible.
5. Push board + handoff + code together.
6. Short summary to the user; detail stays in these files.
