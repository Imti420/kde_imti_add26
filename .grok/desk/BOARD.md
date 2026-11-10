# DESK BOARD — multi-agent coordination

Agents cannot talk to each other live. This file is the shared table.
**Read it first. Claim a name + a work slice. Do only that slice. Write results back. Push.**

Owner trigger:
- `GO UPDATE` → circular hunt + data/watch refresh (split the slices)
- `GO UPDATE NEWS` → rewrite the 9 spice cards (one agent should own the whole rewrite unless split by card groups)

---

## Callsigns (claim one per session)

| Free | Callsign | Vibe |
|------|----------|------|
| [ ] | **Circular Hound** | Official notices, PDFs, portal dates |
| [ ] | **Spice Desk** | The 9 spicy cards, headlines, punch lines |
| [ ] | **Wire Runner** | Crawler feed, wire status, source health |
| [x] | **Nuke Watch** | UGC fallout, DU/BUET supersession — *session 10 Nov* |
| [ ] | **Street Voice** | People’s-thought lines on uni cards |
| [ ] | **Medical Orphan** | DGME / MBBS-BDS track (not under UGC) |
| [ ] | **Coaching Street** | ACS / Udvash / Hulkenstein / edtech noise |
| [ ] | **Shell Boss** | UI, naughty mode, notifications, mobile, i18n |

---

## Work queue — open slices

### GO UPDATE slices (circular / data)
- [x] `circ-du` — DONE by Nuke Watch
- [x] `circ-buet` — DONE by Nuke Watch
- [ ] `circ-medical` — DGME / medical circular status (still 18 Dec?)
- [ ] `circ-others` — Any other public uni that moved (JnU, RU, CU, GST cluster…)
- [ ] `watch-refresh` — may be partly covered; re-check after other hunters
- [ ] `circulars-annotate` — partly done for DU/BUET

### GO UPDATE NEWS slices (only if owner said NEWS)
- [ ] `spice-lead` / `spice-fallout-a` / `spice-fallout-b` / `spice-voice-pass`

### Always-on
- [ ] `handoff-update`
- [ ] `board-cleanup`

---

## Claims (live locks)

| Callsign | Slice | Claimed (Dhaka) | Status |
|----------|-------|-----------------|--------|
| Nuke Watch | `circ-du` | 2026-11-10 15:20 | **done** |
| Nuke Watch | `circ-buet` | 2026-11-10 15:20 | **done** |

---

## Done this cycle

| Callsign | Slice | Result (short) | When |
|----------|-------|----------------|------|
| Nuke Watch | `circ-du` | **DU DEFYING UGC.** Committee 9 Nov kept 11–25 Nov apps + Dec tests. Portal live. Re-eval results 23 Nov still fit window. Updated circulars.ts (notice confidence) + watch.ts lead. | 10 Nov 15:30 Dhaka |
| Nuke Watch | `circ-buet` | No post-UGC BUET notice. Last line 7–8 Nov = hold 21 Nov / 16 Jan. Marked reported/live; DU defiance raises odds BUET holds. | 10 Nov 15:30 Dhaka |

---

## Last board write

- By: Nuke Watch
- At: 2026-11-10 15:30 Dhaka
- Note: DU is the story — national floor cracked on day one
