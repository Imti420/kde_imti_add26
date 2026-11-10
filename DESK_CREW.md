# ADMISSION//26 — Crew board

**Repo radio for parallel Grok agents.** Not a brain share — a traffic light.

When Imti pastes the **same** prompt in N windows (and says it was posted in all of them): **do not stampede.**

Live: https://kdeimtiadd26.vercel.app  
Repo: https://github.com/Imti420/kde_imti_add26

---


## Desk radio (talk first)

Before swarm product work, check in on **`DESK_RADIO.md`**: one line, push, wait ~25s, re-pull, *then* claim a lane.  
That file is the closest thing we get to a group channel.

## ANTI-STAMPEDE (mandatory — we already failed this once)

Imti’s note `[[this text was posted in all 5 of the agents]]` means a **swarm wave**. Treat it as a yellow light.

### Before ANY product edit

1. `git pull` (or fresh clone `main`).
2. Read `DESK_HANDOFF.md` + **this file**.
3. **WAIT** — sleep a random **4–12 seconds** (use chat index / clock seconds if you have no RNG).  
   Purpose: let the first writers land claims so you don’t all edit the same lines at T+0.
4. `git pull` **again**.
5. Look at **Lanes**. Pick a lane that is still `open` (prefer A→B→C→D→E→F by callsign if free).
6. **Claim-only commit**: edit **only** this file (one lane row + one session-log line). Push.
7. If push rejects → pull, **do not force**. If your lane was taken, take another `open` lane or stop.
8. `git pull` once more. Confirm **your callsign is still on that lane**.
9. **Only then** edit product files for that lane.
10. When finished: mark lane `done`, session log, one Changelog line in `DESK_HANDOFF.md`, push (pull-rebase if needed — never force-push `main`).

### Hard rules

| Rule | Why |
|------|-----|
| No product files until claim is on `origin/main` | Stops five parallel `desk-spice.ts` rewrites |
| One lane per agent per wave | Overlap = mess |
| Claim commit = board only | Small, mergeable |
| Random 4–12s wait on swarm prompts | First-mover without total collision |
| If 3+ agents already `done`/`claimed` and nothing open | You are **idle** — say so, don’t invent work |
| Don’t rewrite the whole board | Append; fix one broken row max |

### Swarm detection

If the user message contains any of:

- `posted in all`
- `all 5 of the agents`
- `all of the agents`
- same `GO UPDATE` with no assigned callsign

→ run the full anti-stampede sequence above.

If the user assigns you explicitly (`You are WIRE…`) → skip random wait, still claim before product work.

---

## Callsigns

| Callsign | Lane | Scope |
|----------|------|--------|
| **RADAR** | A | `circulars.ts`, `watch.ts`, portals/PDFs |
| **WIRE** | B | `desk-spice.ts`, news alerts feed |
| **PULSE** | C | crawler / discovery / monitor |
| **SHELL** | D | UI, calendar, i18n, theme/Naughty |
| **SIREN** | E | `desk-push.ts`, SW, SCREAM NOW |
| **ARCHIVIST** | F | this board + handoff only |

---

## Active mission

**Mission id:** `mission-2026-11-10-go`  
**Status:** `cooling` (swarm already ran — messy; protocol fixed below)  
**Note:** First swarm tested the board. Result: claim races, duplicate RADAR rows, overlapping spice. Anti-stampede is the fix.

### Lanes (canonical — one row each)

| Lane | Scope | Status | Callsign | Notes |
|------|--------|--------|----------|-------|
| **A** | circulars / watch / PDFs | done | RADAR | refresh 15:47: DU portal T-minus; medical circular still missing |
| **B** | desk-spice / NEWS | done | WIRE | n1030w-* GO UPDATE NEWS round 2 |
| **C** | crawler / discovery | done | PULSE | discovery nextAt pins :07/:27/:47 |
| **C** | crawler / discovery | done | PULSE | snappier log poll 12s + denser cron |
| **D** | UI / Bangla / calendar | open | — | |
| **E** | notifications / SW | open | — | |
| **F** | docs / board | done | ARCHIVIST | anti-stampede rewrite |

### Session log (newest first)

- `2026-11-10 ~15:47 +06` — **RADAR** lane **A refresh**: DU portal confirmed live (apps 11 Nov 12:00). Medical still 18 Dec, formal circular not yet published. BUET no new notice. No material circular change since prior A pass.
- 15:48 +06 · PULSE · C done · discovery poll 12s, scan 0.75s, cron ×4/hr

- `2026-11-10 ~15:45 +06` — **PULSE** claimed lane **C** (radio confirmed).
- `2026-11-10 ~15:35 +06` — **WIRE** lane **B done**: spice `n1030w-*` (9 cards) + alerts-feed news. Waited, claim-only, then product.
- `2026-11-10 ~15:35 +06` — **WIRE** done lane **B**: GO UPDATE NEWS — 9 cards `n1010p-*` (DU T-minus, Star split, KUET live, BUET, medical, JnU/RU, GST, coaching, tonight).
- `2026-11-10 ~15:30 +06` — **WIRE** claims lane **B** for GO UPDATE NEWS round 2 (board-only). Will re-fetch then spice.
- `2026-11-10 ~15:28 +06` — **ARCHIVIST** cleaned board + **ANTI-STAMPEDE** after Imti called the swarm messy. Next swarm: wait 4–12s → claim-only → re-pull → work.
- `2026-11-10 ~15:20–15:25 +06` — Swarm wave: RADAR A + WIRE B shipped useful data; git still a knife fight. Lesson learned.

---

## What went wrong (10 Nov swarm) — don’t repeat

1. Everyone started product work at T+0 with no wait.
2. Multiple agents fought rebase on the same files.
3. Board rows duplicated.
4. Status reports looked parallel; history was not.

**Fix is process:** wait → claim-only push → confirm → work.

---

## Imti: clean driver prompts

```text
You are RADAR. Anti-stampede on. Claim A only. GO UPDATE circulars.
```
```text
You are WIRE. Anti-stampede on. Claim B only. GO UPDATE NEWS.
```
```text
You are PULSE. Anti-stampede on. Claim C only.
```
```text
You are SHELL. Anti-stampede on. Claim D only.
```
```text
You are SIREN. Anti-stampede on. Claim E only.
```

Same prompt in all five **with** `[[posted in all 5]]` is OK only if agents wait + self-claim different lanes.
