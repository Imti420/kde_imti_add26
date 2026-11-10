# Desk board — live claims

**How parallel `GO UPDATE` works**

1. Read [`../DESK_HANDOFF.md`](../DESK_HANDOFF.md) then this board.
2. Pick a **free** callsign from [`ROSTER.md`](./ROSTER.md).
3. **Claim** one lane (edit this file, commit, push) before heavy work.
4. Do **only** that lane unless the board is empty and you are solo.
5. Push code + mark claim **DONE** + append `DESK_HANDOFF.md` Changelog.

If two agents claim the same lane, **later push rebases** — the first solid commit wins; the other switches lane.

---

## Lanes

| Lane | Owns (files) | Status |
|------|----------------|--------|
| `SPICE` | `src/data/desk-spice.ts` | **OPEN** |
| `CIRCULARS` | `src/data/circulars.ts` | **OPEN** |
| `WATCH` | `src/data/watch.ts` | **OPEN** |
| `VOICES` | `src/data/voices.ts` | **OPEN** |
| `UNIVERSITIES` | `src/data/universities.ts` | **OPEN** |
| `DISCOVERY` | crawl scripts, `data/ops`, discovery UI motion | **OPEN** |
| `NEWSWIRE` | crawl newswire, `data/wire`, newswire UI | **OPEN** |
| `I18N` | `src/lib/i18n.tsx` (always both `en` + `bn`) | **OPEN** |
| `UI` | shell, cards, motion, styles | **OPEN** |
| `SETTINGS` | settings route, desk-push, Naughty, SCREAM NOW | **OPEN** |
| `HANDOFF` | `DESK_HANDOFF.md`, `crew/*` only | **OPEN** |

---

## Active claims

_Format:_

```
### YYYY-MM-DD HH:MM +06 — CALLSIGN — LANE
- Status: CLAIMED | WORKING | DONE
- Scope: one sentence
- Commit: (hash when DONE)
```

### (no active claims — board clear)

---

## Recent DONE (keep last ~10, oldest drop)

_None yet under the crew system._
