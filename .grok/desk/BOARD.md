# DESK BOARD — multi-agent coordination

Agents cannot talk to each other live. This file is the shared table.
**Read it first. Claim a name + a work slice. Do only that slice. Write results back. Push.**

Owner trigger:
- `GO UPDATE` → circular hunt + data/watch refresh (split the slices)
- `GO UPDATE NEWS` → rewrite the 9 spice cards (one agent should own the whole rewrite unless split by card groups)

---

## How to join a session

1. Read this board + `DESK-HANDOFF.md` + `.grok/references/admission26-handoff.md`
2. Pick a **free callsign** below (change `[ ]` → `[x] @ your short note`)
3. Claim **one open slice** in the Work queue (add your callsign + timestamp)
4. Do the work
5. Move the slice to **Done this cycle** with a 1–3 line result
6. Push board + code together
7. If you finish early, take another free slice — do not steal a claimed one

If two agents claim the same thing in the same minute: the later push loses; re-read board and take something still free.

---

## Callsigns (claim one per session)

| Free | Callsign | Vibe |
|------|----------|------|
| [ ] | **Circular Hound** | Official notices, PDFs, portal dates |
| [ ] | **Spice Desk** | The 9 spicy cards, headlines, punch lines |
| [ ] | **Wire Runner** | Crawler feed, wire status, source health |
| [x] | **Nuke Watch** | UGC fallout, DU/BUET supersession, calendar ghosts — *claimed 10 Nov 15:20 Dhaka* |
| [ ] | **Street Voice** | People’s-thought lines on uni cards |
| [ ] | **Medical Orphan** | DGME / MBBS-BDS track (not under UGC) |
| [ ] | **Coaching Street** | ACS / Udvash / Hulkenstein / edtech noise |
| [ ] | **Shell Boss** | UI, naughty mode, notifications, mobile, i18n |

Only one agent per callsign per cycle. Release when you leave (set back to `[ ]`).

---

## Work queue — open slices

### GO UPDATE slices (circular / data)
- [ ] `circ-du` — Check DU portal + notices for formal pull-back of 11–25 Nov window
- [ ] `circ-buet` — Check whether BUET published anything after UGC floor
- [ ] `circ-medical` — DGME / medical circular status (still 18 Dec?)
- [ ] `circ-others` — Any other public uni that moved (JnU, RU, CU, GST cluster…)
- [ ] `watch-refresh` — Rewrite `src/data/watch.ts` from whatever the hunters found
- [ ] `circulars-annotate` — Flag superseded dates in `src/data/circulars.ts`

### GO UPDATE NEWS slices (only if owner said NEWS)
- [ ] `spice-lead` — Card 1
- [ ] `spice-fallout-a` — Cards 2–5
- [ ] `spice-fallout-b` — Cards 6–9
- [ ] `spice-voice-pass` — Street register + sources pass

### Always-on / product
- [ ] `handoff-update` — Append Changelog entry in admission26-handoff.md
- [ ] `board-cleanup` — Clear stale claims older than 2 hours

---

## Claims (live locks)

| Callsign | Slice | Claimed (Dhaka) | Status |
|----------|-------|-----------------|--------|
| Nuke Watch | `circ-du` | 2026-11-10 15:20 | working |
| Nuke Watch | `circ-buet` | 2026-11-10 15:20 | working |

---

## Done this cycle

| Callsign | Slice | Result (short) | When |
|----------|-------|----------------|------|
| — | — | — | — |

---

## Last board write

- By: Nuke Watch
- At: 2026-11-10 15:20 Dhaka
- Note: claimed circ-du + circ-buet for UGC fallout check
