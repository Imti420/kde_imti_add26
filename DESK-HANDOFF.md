# Desk handoff — read before upgrading

**Full continuity file:** [`.grok/references/admission26-handoff.md`](.grok/references/admission26-handoff.md)  
**Multi-agent board:** [`.grok/desk/BOARD.md`](.grok/desk/BOARD.md)

Different Grok instances do not share memory. The handoff is continuity; the **board** is how several agents split work when the owner pastes `GO UPDATE` into multiple chats at once.

### Quick start for any agent
1. Read this file + the full handoff + **BOARD.md**
2. Claim a **callsign** and **one work slice** on the board (push the claim)
3. Do only that slice
4. Write result into “Done this cycle”, append handoff Changelog if needed, push

Owner commands:
- `GO UPDATE` → circular hunt + data/watch (split via board slices)
- `GO UPDATE NEWS` → rewrite the 9 spice cards (prefer one Spice Desk owner, or split lead / fallout-a / fallout-b)

### Already shipped (do not re-build blind)
UGC nuke super-head, 9 spice cards, naughty mode, people’s-thought lines, circular supersession flags (DU/BUET), notifications chrome, mobile shell, `t()` fix. Details in the full handoff.
