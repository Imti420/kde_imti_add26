# Desk board — live claims

## Parallel GO UPDATE — anti-stampede protocol

When the owner pastes the **same** prompt into several chats at once:

### Phase 0 — WAIT (mandatory)
1. Read `DESK_HANDOFF.md` + this file + `ROSTER.md`.
2. **Sleep 5–25 seconds** before any git write.  
   Use a stagger so five agents do not push the same second:  
   `sleep $((5 + RANDOM % 20))` (or mentally count if no shell yet).
3. `git pull --rebase` (or fresh clone).

### Phase 1 — CLAIM ONLY (one tiny commit)
4. Pick the **first free** callsign in roster order (Abrar → Raju → Savar → Tejgaon → Kuril → Float).
5. Prefer that callsign’s default lane if **OPEN**; else next OPEN lane on the table.
6. Edit **only** `crew/BOARD.md`: set lane status to your callsign, add an Active claim (`CLAIMED`).
7. Commit message must start with `crew-claim:` and **must not** touch `src/`.
8. Push. If push/rebase **loses** the claim → do not force. Pull, take another OPEN lane, claim again.

### Phase 2 — WORK
9. Only after your claim is on `origin/main`, edit your lane’s files.
10. One lane per agent unless you are clearly solo (board empty of WORKING claims).

### Phase 3 — DONE
11. Commit product changes. Then mark claim **DONE** (hash + free the lane to OPEN).
12. Append `DESK_HANDOFF.md` Changelog (short).

**Forbidden**
- Inventing callsigns or “Lane A/B”
- Product files inside the claim commit
- Starting heavy research/edit before a successful claim push
- All five agents rewriting `DESK_HANDOFF.md` instead of doing lane work

---

## Lanes

| Lane | Owns | Status |
|------|------|--------|
| `SPICE` | `src/data/desk-spice.ts` | **OPEN** |
| `CIRCULARS` | `src/data/circulars.ts` | **OPEN** |
| `WATCH` | `src/data/watch.ts` | **OPEN** |
| `VOICES` | `src/data/voices.ts` | **OPEN** |
| `UNIVERSITIES` | `src/data/universities.ts` | **OPEN** |
| `DISCOVERY` | crawl / `data/ops` / discovery UI | **OPEN** |
| `NEWSWIRE` | crawl wire / `data/wire` / newswire UI | **OPEN** |
| `I18N` | `src/lib/i18n.tsx` (en **and** bn) | **OPEN** |
| `UI` | shell, cards, motion, styles | **OPEN** |
| `SETTINGS` | settings, desk-push, Naughty, SCREAM NOW | **OPEN** |
| `HANDOFF` | `DESK_HANDOFF.md`, `crew/*` only | **OPEN** |

---

## Active claims

_None — board cleared after 10 Nov stampede. Next parallel run uses Phase 0–3 above._

---

## Recent DONE

- **2026-11-10 Raju / SPICE** — `n1010e-*` spice cycle (DU noon 11 Nov) @ `6647dcf`
- **2026-11-10 (swarm)** — circulars/watch also updated under ad-hoc names RADAR / Nuke Watch / WIRE (protocol broken; product mostly OK). Next time: roster + stagger only.
