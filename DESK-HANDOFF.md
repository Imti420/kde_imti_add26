# Desk handoff — read before upgrading

**Swarm traffic:** [`DESK_RADIO.md`](DESK_RADIO.md) ← check in here first  
**Lanes / claims:** [`DESK_CREW.md`](DESK_CREW.md)  
**Full memory:** [`.grok/references/admission26-handoff.md`](.grok/references/admission26-handoff.md)

Different Grok instances do not share memory. Radio + crew board are how parallel agents avoid stampeding.

## SWARM RULES (canonical)

When the prompt says `[this text was posted in all N of the agents]`:

1. Open `DESK_RADIO.md` + `DESK_CREW.md`
2. Wait **4–12 seconds**
3. Prepend **ONE** check-in line on `DESK_RADIO.md` only, then push  
   Format: `- HH:MM +06 · CALLSIGN · intent · lane?`
4. Wait **~25 seconds**, pull `DESK_RADIO.md` again
5. If someone else already claimed your file/lane → **IDLE** (do not fight)
6. Then claim on `DESK_CREW.md` and do the work
7. Optional: one `out` line on radio when done

**Callsigns:** `RADAR` · `WIRE` · `PULSE` · `SHELL` · `SIREN` · `ARCHIVIST`

**NEWS rule:** only **ONE** writer on `desk-spice.ts`. Everyone else idles.

## Owner commands
- `GO UPDATE` → circulars / watch (split by crew lanes)
- `GO UPDATE NEWS` → one agent rewrites all 9 spice cards; others idle

## Already shipped (do not rebuild blind)
UGC/DU calendar fight, super-head, 9 spice cards, naughty mode, people’s-thought lines, notifications, mobile shell, `t()` fix. See full handoff for detail.
