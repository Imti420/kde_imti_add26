# ADMISSION//26 — Crew board (multi-agent coordination)

**Repo:** https://github.com/Imti420/kde_imti_add26  
**Live:** https://kdeimtiadd26.vercel.app  

Multiple Groks do **not** share a brain. This file is the only shared state. If you ignore it, you will collide — as on **2026-11-10 ~15:20** when five windows got the same `GO UPDATE` and several stampeded lane A.

---

## ANTI-STAMPEDE (read before any GO UPDATE)

When the user posts the **same** prompt in multiple chats (look for `[this text was posted in all N of the agents]`):

1. **Stop. Do not edit product files yet.**
2. **Wait 5–15 seconds** (stagger by callsign if assigned; otherwise by whim).
3. **Fetch this file from `main` again** (`DESK_CREW.md`).
4. **Claim exactly one free lane** with a commit whose **only** change is this board (message like `crew: WIRE claims B`).
5. **Re-fetch the board.** If two claims landed on the same lane, the **later** agent **aborts** that lane and takes another `open` one — or stops.
6. **Only then** touch product files in your lane.
7. Finish → mark `done` + one session-log line + short `DESK_HANDOFF.md` changelog.

**Never** start researching + rewriting `circulars.ts` / `desk-spice.ts` before a successful claim push.

**Never** have five agents rewrite the handoff essay. One line of changelog each is enough.

---

## Callsigns

| Callsign | Best lane | If unassigned |
|----------|-----------|----------------|
| **RADAR** | A — circulars / watch / PDFs | First free among A–E by letter |
| **WIRE** | B — spice / news | |
| **PULSE** | C — crawl / discovery | |
| **SHELL** | D — UI / Bangla / calendar | |
| **SIREN** | E — notifications | |
| **ARCHIVIST** | F — docs / this board | |

Imti can pin a name: `You are WIRE. Claim B only.`

---

## Active mission

**Id:** `mission-2026-11-10-go`  
**Status:** `cooling` (stampede cleanup — prefer not to re-open A/B until Imti says so)  
**Lesson:** parallel GO UPDATE without wait+claim = duplicate RADAR rows, merge noise, same story written thrice.

---

## Lanes (single row per lane — do not duplicate)

| Lane | Scope | Status | Callsign | Notes |
|------|-------|--------|----------|-------|
| **A** | `circulars.ts` / `watch.ts` | done | RADAR | 10 Nov: DU T-1 apps, medical 18 Dec, BUET 21 Nov/16 Jan (multiple RADAR pushes — board was messy) |
| **B** | `desk-spice.ts` (~9 cards, new ids) | claimed/done | WIRE / others | n1010e-* spice cycle landed in parallel |
| **C** | crawler / discovery / monitor | open | — | |
| **D** | calendar / shell / i18n / theme | open | — | |
| **E** | notifications / SW / SCREAM NOW | open | — | |
| **F** | handoff + crew protocol only | done | ARCHIVIST | anti-stampede rules added after mess |

---

## Session log (newest first)

- `2026-11-10 ~15:30 +06` — **ARCHIVIST**: stampede post-mortem. Five chats, one prompt, no wait → duplicate lane A claims, overlapping circular/news work. Board cleaned; **anti-stampede** section added. Next parallel test: wait → claim-only commit → re-fetch → then work.
- `2026-11-10 ~15:25 +06` — **RADAR** (several windows): lane A circular/watch updates (DU tomorrow, medical 18 Dec, BUET hard line). Product data mostly aligned; git history noisy.
- `2026-11-10 ~15:22 +06` — **WIRE** / spice agents: lane B news cards (`n1010e-*` etc.).
- `2026-11-10 ~15:20 +06` — Mission opened; agents ignored stagger and rushed.

---

## Imti paste templates (one name per window)

```text
You are RADAR. Read DESK_HANDOFF.md + DESK_CREW.md. WAIT 5s. Claim lane A only if still open (board-only commit first). Then GO UPDATE circulars.
```

```text
You are WIRE. … WAIT 8s. Claim lane B only if open. Then GO UPDATE NEWS.
```

```text
You are PULSE. … WAIT 11s. Claim lane C …
```

```text
You are SHELL. … WAIT 14s. Claim lane D …
```

```text
You are SIREN. … WAIT 17s. Claim lane E …
```

Different **wait** offsets are intentional so claim commits don’t all hit GitHub in the same second.
