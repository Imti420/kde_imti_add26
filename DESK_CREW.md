# ADMISSION//26 — Crew board

**Repo radio for parallel Grok agents.** Not a brain share — a traffic light.

When Imti pastes the **same** prompt in N windows (and says it was posted in all of them): **do not stampede.**

Live: https://kdeimtiadd26.vercel.app  
Repo: https://github.com/Imti420/kde_imti_add26

---

## Desk radio (talk first)

Before swarm product work, check in on **`DESK_RADIO.md`**: one line, push, wait ~25s, re-pull, *then* claim a lane.

## ANTI-STAMPEDE

1. Wait 4–12s on swarm prompts  
2. Radio check-in only  
3. Wait ~25s, re-pull  
4. Claim lane on this file  
5. Then product  
**NEWS = one writer on desk-spice.ts**

---


## Command structure (parallel track)

| Agent | Role | Notes |
|-------|------|-------|
| **Commander** | ChatGPT (GPT-6) | Project command |
| **01** | Chief Engineer | Architecture / integration |
| **02** | Intelligence Director | Research / sources |
| **03** | Admissions Director | Circulars / dates |
| **04** | Infrastructure Engineer | Crawler / Actions / deploy |
| **05** | Creative Director | UI / editorial |
| **06 · QA** | Director of Quality Assurance & Reliability | Independent verification — does not ship features; challenges claims |

**QA lane:** verification only. Register failures on this board; do not silently “fix” by reading code.

## Callsigns

| Callsign | Lane | Scope |
|----------|------|--------|
| **RADAR** | A | circulars / watch / PDFs |
| **WIRE** | B | desk-spice / NEWS |
| **PULSE** | C | crawler / discovery |
| **SHELL** | D | UI / calendar / i18n |
| **SIREN** | E | notifications / SW |
| **ARCHIVIST** | F | handoff / board / radio |

---

## Active mission

**Mission id:** `mission-2026-11-10-n1022`  
**Status:** `cooling`  
**Note:** Solo GO UPDATE NEWS night cycle shipped `n1022-*`.

### Lanes

| Lane | Scope | Status | Callsign | Notes |
|------|--------|--------|----------|-------|
| **A** | circulars / watch | done | RADAR | prior afternoon |
| **B** | desk-spice / NEWS | done | WIRE | **n1022-*** night cycle 22:15 |
| **C** | crawler / discovery | done | PULSE | prior |
| **D** | UI / Bangla / calendar | claimed | Agent05 | audit + notice chrome |
| **E** | notifications / SW | open | — | |
| **F** | docs / board | done | ARCHIVIST | anti-stampede + radio |

### Session log (newest first)

- `2026-11-11 ~15:50 +06` — **Agent 03 (data)** circular audit: directory **87** verified; DU OPEN; BUET 10 Nov notice; KUET official window; DGHS formal circular still missing.


- `2026-11-11 ~15:50 +06` — **Agent 06 (QA)** registered. Baseline audit started. Independent of RADAR/WIRE/PULSE lanes.


- `2026-11-11 ~15:50 +06` — **AGENT 02 (Intelligence / Newswire)** online under Commander. Audit complete: dual track (spice desk + wire crawler). No product rewrite this pass — inventory + integrity gaps logged in handoff.
- `2026-11-11 ~15:50 +06` — **Agent 05 / SHELL** onboarded: frontend audit + NoticeBell 99+ cap. Lane D UX notes in handoff.
- `2026-11-11 ~15:55 +06` — **Agent 04 (Infrastructure)** audit + stuck-run heal + stop always-`--force` on schedule.

- `2026-11-10 ~22:15 +06` — **WIRE** lane **B done** (solo GO UPDATE NEWS): spice **n1022-*** (9 cards) + alerts-feed `n1022-night-news`. DU T-minus, DGME 18 Dec locked, KUET live, BUET wall, clash grid. Handoff changelog appended.
- `2026-11-10 ~15:47 +06` — **RADAR** A refresh: DU portal T-minus; medical circular still missing.
- `2026-11-10 ~15:48 +06` — **PULSE** C done: discovery poll/cron snappier.
- `2026-11-10 ~15:35 +06` — **WIRE** B earlier cycles n1030w / n1010p.
- `2026-11-10 ~15:28 +06` — **ARCHIVIST** anti-stampede + radio.

---

## Imti driver prompts

```text
You are WIRE. Claim B only. GO UPDATE NEWS.
```
```text
You are RADAR. Claim A only. GO UPDATE circulars.
```
