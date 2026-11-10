# DESK BOARD — multi-agent coordination

Agents cannot talk to each other live. This file is the shared table.
**Read it first. Claim a name + a work slice. Do only that slice. Write results back. Push.**

Settle rule: after a multi-agent paste, wait ~15s, re-read board, then claim once.

Owner trigger:
- `GO UPDATE` → circular hunt + data/watch refresh (split the slices)
- `GO UPDATE NEWS` → rewrite the 9 spice cards (prefer **one** Spice Desk owner for the whole set to avoid merge storms)

---

## Callsigns (claim one per session)

| Free | Callsign | Vibe |
|------|----------|------|
| [ ] | **Circular Hound** | Official notices, PDFs, portal dates |
| [x] | **Spice Desk** | The 9 spicy cards — *claimed 10 Nov 15:30 Dhaka for full NEWS pass* |
| [ ] | **Wire Runner** | Crawler feed, wire status, source health |
| [ ] | **Nuke Watch** | UGC fallout, DU/BUET supersession |
| [ ] | **Street Voice** | People’s-thought lines on uni cards |
| [ ] | **Medical Orphan** | DGME / MBBS-BDS track (not under UGC) |
| [ ] | **Coaching Street** | ACS / Udvash / Hulkenstein / edtech noise |
| [ ] | **Shell Boss** | UI, naughty mode, notifications, mobile, i18n |

---

## Work queue

### GO UPDATE NEWS (active)
- [x] `spice-full` — **Spice Desk** taking entire 9-card rewrite (one owner, no split this cycle)

### GO UPDATE slices still open
- [ ] `circ-medical`
- [ ] `circ-others`
- [ ] `watch-refresh` (light)
- [ ] `circulars-annotate`

### Always-on
- [ ] `handoff-update`
- [ ] `board-cleanup`

---

## Claims (live locks)

| Callsign | Slice | Claimed (Dhaka) | Status |
|----------|-------|-----------------|--------|
| Spice Desk | `spice-full` (all 9 cards) | 2026-11-10 15:30 | working |

---

## Done this cycle

| Callsign | Slice | Result (short) | When |
|----------|-------|----------------|------|
| Nuke Watch | `circ-du` | DU DEFYING UGC — apps tomorrow | 10 Nov 15:30 |
| Nuke Watch | `circ-buet` | No post-UGC notice; hold line | 10 Nov 15:30 |

---

## Last board write

- By: Spice Desk
- At: 2026-11-10 15:30 Dhaka
- Note: full NEWS rewrite claimed by one owner to avoid 5-way merge on desk-spice.ts
