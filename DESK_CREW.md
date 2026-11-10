# ADMISSION//26 — Crew board (multi-agent coordination)

**This is the fun place.** Multiple Grok agents cannot share one brain, but they **can** share this file on `main`. When Imti says **GO UPDATE** (or the same prompt) in several chats at once, each agent:

1. Reads **this file first** (after `DESK_HANDOFF.md`)
2. Picks a **free lane** (or the lane matching their **callsign**)
3. **Claims** it by editing this file + pushing
4. Does **only** that lane’s work
5. Marks the lane **done**, appends a one-liner here and a full note in `DESK_HANDOFF.md` Changelog

No claim → no work on that lane. Two agents in the same lane = wasted motion.

Live: https://kdeimtiadd26.vercel.app  
Repo: https://github.com/Imti420/kde_imti_add26

---

## Callsigns (you have names now)

Pick one when you claim. If taken, pick another. Stay that name for the session.

| Callsign | Vibe | Best lanes |
|----------|------|------------|
| **RADAR** | Circular hunter | A — circulars / watch / PDFs |
| **WIRE** | Desk journalist | B — spice cards / GO UPDATE NEWS |
| **PULSE** | Crawl & discovery | C — workflows / discovery UX / monitor |
| **SHELL** | UI / mobile / Bangla | D — calendar, shell, i18n, theme |
| **SIREN** | Alerts & PWA | E — notifications, SW, SCREAM NOW |
| **ARCHIVIST** | Docs & continuity | F — DESK_HANDOFF / this board only |

Imti can assign: e.g. `GO UPDATE — you are RADAR` in one chat, `you are WIRE` in another.

---

## Active mission

**Mission id:** `mission-2026-11-10-go`  
**Opened by:** Imti (multi-window GO UPDATE experiment)  
**Status:** `open`  
**Objective:** Parallel desk upgrade without five agents rewriting the same handoff.

When the mission is finished, set status to `closed` and clear claims (or start a new mission id).

---

## Lanes (claim → work → done)

Status values: `open` | `claimed` | `done` | `blocked`

| Lane | Scope (do only this) | Status | Callsign | Notes |
|------|----------------------|--------|----------|-------|
| **A** | `circulars.ts` / `watch.ts` — web hunt DU, BUET, medical, GST, privates; PDFs/portals | done | RADAR | KUET live; BUET 21 Nov/16 Jan; DU+DGHS portals | done | RADAR | KUET live; BUET 21 Nov/16 Jan; DU+DGHS portals |
| **A** | `circulars.ts` / `watch.ts` — web hunt DU, BUET, medical, GST, privates; PDFs/portals | done | RADAR | 10 Nov: DU T-1, medical 18 Dec, BUET 21 Nov/16 Jan |
| **B** | `desk-spice.ts` — replace all ~9 cards, **new ids**; alerts feed if needed | claimed | WIRE | 15:22 +06 DU portal tomorrow confirmed |
| **C** | Crawler schedule, discovery log live feel, monitor report hygiene | open | — | |
| **D** | UI: calendar mobile, Bangla strings, shell chrome, theme/Naughty | open | — | |
| **E** | Notifications, frantic day-of, SCREAM NOW, SW reliability | open | — | |
| **F** | Handoff/crew docs only — no product code unless fixing this protocol | open | — | |

### How to claim (copy pattern)

```markdown
| **A** | … | claimed | RADAR | 15:20 +06 starting DU/BUET pass |
```

Push that edit **before** large data edits so another agent sees the claim.

### How to finish

```markdown
| **A** | … | done | RADAR | DU window confirmed; watch updated |
```

One line under **Session log** below.

---

## Session log (append only, newest at top)

- `2026-11-10 ~15:25 +06` — **RADAR** done lane **A**: BUET hold + portal, DU/DGHS pdfUrl, KUET+BUET watch items.
- `2026-11-10 ~15:25 +06` — **RADAR** lane **A done**: watch + circulars refreshed (DU apps open 11 Nov noon; medical exam 18 Dec; BUET 21 Nov / 16 Jan). Sources: TBS, DGME press, portal.
- `2026-11-10 ~15:22 +06` — **WIRE** claimed lane **B** (NEWS). Portal-confirmed DU open tomorrow + BUET Nov 21 / Jan 16.
- `2026-11-10 ~15:20 +06` — **RADAR** claimed lane **A** (circulars/watch). Starting web hunt.
- `2026-11-10 ~15:20 +06` — **ARCHIVIST** opened crew board + callsigns. Mission `mission-2026-11-10-go` status `open`.

---

## Protocol (short)

```
GO UPDATE in N chats
  → each agent: HANDOFF → CREW board
  → claim free lane (or assigned callsign’s lane)
  → work only that scope
  → mark done + session log + DESK_HANDOFF changelog
  → if blocked, status=blocked + note, pick another open lane
```

**Do not:** five agents rewrite `DESK_HANDOFF.md` with the same essay.  
**Do:** one line in Changelog per real upgrade; board holds the parallel state.

---

## Fun rules

1. Callsigns stick for the session.
2. Stealing a `claimed` lane is a desk crime (unless stuck >30 min / `blocked`).
3. `SCREAM NOW` still works; SIREN owns that maze.
4. If you only see docs work left, you are ARCHIVIST — improve the board, then stop.
5. Winning = more lanes `done`, not more words about coordination.

---

## Imti one-liners (paste per window)

```text
You are RADAR. Read DESK_HANDOFF.md + DESK_CREW.md. Claim lane A. GO UPDATE circulars only.
```

```text
You are WIRE. Read DESK_HANDOFF.md + DESK_CREW.md. Claim lane B. GO UPDATE NEWS only.
```

```text
You are PULSE. Read DESK_HANDOFF.md + DESK_CREW.md. Claim lane C. Discovery/crawler only.
```

```text
You are SHELL. Read DESK_HANDOFF.md + DESK_CREW.md. Claim lane D. UI/Bangla/calendar only.
```

```text
You are SIREN. Read DESK_HANDOFF.md + DESK_CREW.md. Claim lane E. Notifications only.
```

Same prompt in all five without names → everyone must still **self-claim different lanes** using this board. First push wins the claim.
