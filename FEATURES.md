# VIM in Motion - Current Feature List

This document lists the features currently implemented in the online Vim editor/workshop app.

## App Flow

- Player account creation with separate username, student email, and password fields.
- Student email must match `bl.en.u4xxxxxxxx`.
- Player login accepts either username or email, plus password.
- Player usernames and emails are unique; one username is mapped to one email.
- Player information is stored separately from progress in Firebase.
- Instructor login requires admin username and password.
- Browser session restore through `localStorage`.
- Simulated terminal entry point before opening stage files.
- Stage completion through `:wq`.
- Pressing Enter on the stage-clear dialog triggers the Continue/Close action.
- Completed stages award three independent stars:
  - 1 star for matching the target text.
  - 1 star for using the expected Vim actions.
  - 1 star for finishing within the stage time limit.
- The stage-clear popup shows which stars were earned and why any missed star was not awarded.
- Reattempting a level shows `NEW PB!` with the current time when the player beats their previous best time for that level.
- Beating `vim_god`'s raw best time awards a secret fourth red star.
- The secret red star is stored separately from the normal three-star score and appears off-center without an outline.
- Stage time limits use `vim_god` benchmarks when available: `vim_god`'s best time for that stage plus 15 seconds.
- If `vim_god` or a stage benchmark is unavailable, the default 3-star time limit is 180 seconds.
- The best star count per stage is saved with player progress.
- The best completion time per stage is saved with player progress.
- README files can be opened and exited with `:q`.

Current instructor credentials:

- Username: `instructor`
- Password: `vimworkshop2024`

## Workshop Terminal

- Home directory: `~`
- Documentation files: `README.md`, `README.org`
- Levels directory: `~/levels`
- Stage files are generated dynamically from `LEVELS.length`.
- `ls`, `cd`, `cat`, `vim`, `clear`, `reset`, `sudo`, `help`, and `mkdir` are supported.
- Tab completion supports commands and file names.
- Arrow keys browse terminal command history when autocomplete is closed.
- The terminal uses a custom thick block cursor that follows the real input caret.
- The block cursor renders the covered character in black while visible and white while blinking off.
- Stage files respect completion locks and instructor unlock limits.
- `reset` asks for `y/n` confirmation in the terminal, then clears Firebase progress for the current account.
- Reset clears completed stages, stars, and best times while keeping the player account and browser session.

## Vim Modes

- Normal mode for navigation and commands.
- Insert mode through `i` and `a`.
- Insert-at-line commands: `I` inserts at the first non-blank character, `A` appends at the end of the line.
- Open-line insert commands: `o` opens a line below, `O` opens a line above.
- Visual character mode through `v`.
- Visual line mode through `V`.
- Command mode through `:`.
- Search mode through `/`.

## Motions

- `h`, `j`, `k`, `l`
- `w`, `b`, `e`
- `0`, `$`
- Counted motions such as `3w`, `2j`, and `5l`
- Stage 2 onward blocks arrow keys in Normal mode.

## Operators And Editing

- `x` deletes the character under the cursor.
- `X` deletes the character before the cursor.
- `dw`, `de`, `d$`, `dd`
- `D` is supported as shorthand for `d$`.
- `C` is supported as shorthand for `c$`.
- `S` is supported as shorthand for `cc`.
- `dj`, `d2j`, `dk`, `d2k`
- `d[count][motion]`
- Counted vertical deletes such as `d2j` delete complete line ranges without consuming the first character of the following line.
- `yy`, `yw`, `y$`
- `Y` yanks the current line.
- `p` pastes after the cursor.
- `P` pastes before the cursor.
- `u`
- `Ctrl+r`
- `.` repeats the last tracked edit.

## Visual Editing

- `v` starts character-wise selection.
- `V` starts line-wise selection.
- Motions adjust visual selection.
- `d`, `x`, and `y` act on the selected range.

## Text Objects

- `iw`, `aw`
- `i"`, `a"`
- `i'`, `a'`
- `i(`, `a(`, `i)`, `a)`
- `it`
- Supported with `d`, `y`, `c`, and `v`.

## Search

- `/pattern` searches forward.
- `n` jumps to the next match.
- `N` jumps to the previous match.
- Search wraps through the file.
- Search usage is tracked for command-aware stages.

## Substitution And Regex

- `:s/find/replace/g` replaces on the current line.
- `:%s/find/replace/g` replaces through the whole file.
- `:3,8s/find/replace/g` replaces within a line range.
- JavaScript regular expressions are supported in substitution patterns.
- Substitution, ranged substitution, global substitution, and regex usage are tracked.

## Macros

- `q{register}` starts recording a macro.
- `q` stops recording.
- `@{register}` replays a macro.
- `@@` replays the last macro.
- Counted macro replay such as `5@a` is supported.
- Macro recording and replay are tracked for stage validation.

## Command Tracking

- The Vim engine tracks exact commands and semantic action IDs.
- Examples of exact commands: `dw`, `3dd`, `ci"`, `/error`, `:%s/a/b/g`, `qa`, `@a`, `Ctrl+r`.
- Examples of semantic actions: `motion:w`, `operator:d`, `text-object:quote`, `search`, `substitution`, `regex`, `macro:record`, `macro:replay`.
- Level requirements use unordered contains checks.
- If final text is correct but required actions are missing, the app reports the untracked actions instead of completing the stage.

## Curriculum

The app now defines 19 practical Vim core stages:

1. Enter the Editor
2. Move Without Arrows
3. Words Are Faster Than Characters
4. Delete Precisely
5. Counts Multiply Power
6. Yank And Paste
7. Undo, Redo, Repeat
8. Visual Selection
9. Text Objects: Words And Quotes
10. Text Objects: Parentheses And Tags
11. Search To Jump
12. Search Then Edit
13. Substitute A Word Everywhere
14. Substitute In A Range
15. Regex Basics
16. Regex Cleanup
17. Record A Macro
18. Macros At Scale
19. Final Practical Edit

## Instructor Dashboard

- Live player list.
- Player username and email display.
- Separate player profile page opens by clicking a player card or player table row.
- Player profile includes a Back button to return to the main admin dashboard.
- Player profile shows levels completed, total stars, per-level completion, per-level stars, and time taken per level.
- Active/idle status.
- Current stage and completion counts.
- Total stars earned across all stages.
- Progress percentages.
- Live activity log.
- Global max-stage unlock control.
- Admins can delete players directly from the dashboard.
- Deleting a player removes their Firebase player record and frees their email mapping.

## Realtime Data

When Firebase is configured:

- Player signup stores `username`, `email`, password hash, progress, and activity metadata.
- Email uniqueness is tracked through a `playerEmails` index.
- Player progress is saved to Firebase Realtime Database.
- Per-stage best times are saved and used for the `vim_god` benchmark account.
- Completed stages, stars, and best times are synced from the live Firebase player record.
- Existing progress loads when players rejoin.
- Activity logs are pushed live for account creation, login, and stage activity.
- Instructor unlock limits are synced live.

Without Firebase, browser session restore still uses `localStorage`.
