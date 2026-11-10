# ADMISSION//26 — Desk Crew (multi-agent playground)

**Purpose:** When Imti says `GO UPDATE` in **several chats at once**, agents do **not** all do the same job.  
They **coordinate through this file** (git is the radio). Names are mandatory. Claims are mandatory. Overlap is a foul.

This is the fun place. Be a character. Still ship real code.

---

## The crew (pick one name per session — sticky for that chat)

| Callsign | Color vibe | Default lane (when splitting a full GO UPDATE) |
|----------|------------|--------------------------------------------------|
| **WIRE** | newsprint yellow | `desk-spice.ts` — spicy news only. Research + replace cards. Alerts feed news ids. |
| **CIRC** | stamp red | `circulars.ts` + uni portals/PDFs. New circulars, seats, dates. NEW CIRCULAR notify. |
| **SIGNAL** | radio green | `desk-push.ts` / `sw.js` / Settings alerts / frantic / SCREAM NOW. Notification path only. |
| **SHELL** | terminal cyan | UI routes/components: calendar `useT`, uni CTA bar, Bangla strings, Naughty, mobile shell. |
| **SCOUT** | field khaki | Research only — no code. Writes findings into `DESK_CREW.md` → **Scout drop** for CIRC/WIRE. |

If only **one** agent is in the room: ignore lanes, do the full job, sign the changelog as **SOLO**.

If **two+** agents get the same `GO UPDATE`: each must **claim a free lane** before editing product files.

---

## How to coordinate (the protocol)

### 1. On wake (every agent, every GO UPDATE)

1. `git pull` (or fresh clone of `main`).
2. Read `DESK_HANDOFF.md` (product law).
3. Read **this file** — active claims + scout drops.
4. Pick a **callsign** not currently claimed for this wave.
5. **Commit a claim** before heavy work (see template).

### 2. Claim template (append under Active wave)

```markdown
### Claim · <CALLSIGN> · <YYYY-MM-DD HH:MM +06>
- Wave id: <user phrase or date-time, e.g. GO-UPDATE-2026-11-10-1517>
- Lane: WIRE | CIRC | SIGNAL | SHELL | SCOUT
- Intent: one line
- Status: claimed
```

Push that claim **alone** first if others might be racing. Then do the work.

### 3. While working

- **Touch only your lane’s files** unless SCOUT left you a drop.
- If you need a file another lane owns → note it under **Handoffs**, don’t silent-edit.
- Prefer small commits: `crew(<CALLSIGN>): …`

### 4. When done

Append:

```markdown
### Done · <CALLSIGN> · <time>
- Wave id: …
- Shipped: 3–6 bullets
- Commit: <hash>
- Status: done
```

And append the usual block to `DESK_HANDOFF.md` Changelog (mention your callsign).

### 5. Conflicts

- Two claims, same lane, same wave → **later claim switches lane** or waits.
- Merge conflict on this file → keep **both** claim/done blocks; don’t delete another agent’s name.
- Never force-push `main`.

---

## Active wave

_Wave id: (none — next multi-agent GO UPDATE starts a wave)_

<!-- agents append Claim / Done blocks below -->

---

## Scout drops (research → builders)

_SCOUT pastes findings here. CIRC/WIRE consume and clear or mark used._

<!-- example
### Drop · SCOUT · 2026-11-10
- KUET: apps open … source URL
- Used by: —
-->

---

## Handoffs / sticky notes

- Notifications delivery = `registration.showNotification` from page (see handoff). Don’t reintroduce postMessage-only.
- KUET open day frantic copy pattern is sacred to Imti’s humor — keep the AHHHHHHHH energy.
- Naughty mode stays.

---

## Why this works (honest physics)

Agents do **not** share live brain cells.  
They **do** share git.  
So the repo is the group chat. Claims prevent five WIREs rewriting spice at once. Names make the log readable. Fun is allowed; collisions are not.

When Imti opens five windows and yells **GO UPDATE** everywhere:  
**WIRE / CIRC / SIGNAL / SHELL / SCOUT** — pick a seat, claim it, ship your lane.
