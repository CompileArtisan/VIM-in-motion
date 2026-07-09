# VIM in Motion - Current Feature List

This document lists the features currently implemented in the online Vim editor/workshop app.

## App Flow

- Player login with a display name.
- Instructor login with a password-protected dashboard.
- Browser session restore through `localStorage`.
- Simulated terminal entry point before opening stage files.
- Stage completion through `:wq`.
- README files can be opened and exited with `:q`.

## Workshop Terminal

- Home directory: `~`
- Documentation files: `README.md`, `README.org`
- Levels directory: `~/levels`
- Stage files are generated dynamically from `LEVELS.length`.
- `ls`, `cd`, `cat`, `vim`, `clear`, `reset`, `sudo`, `help`, and `mkdir` are supported.
- Tab completion supports commands and file names.
- Arrow keys browse terminal command history when autocomplete is closed.
- Stage files respect completion locks and instructor unlock limits.
- `reset` clears browser `localStorage`, resets the React session state, and returns to login.

## Vim Modes

- Normal mode for navigation and commands.
- Insert mode through `i` and `a`.
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
- `dw`, `de`, `d$`, `dd`
- `dj`, `d2j`, `dk`, `d2k`
- `d[count][motion]`
- `yy`, `yw`, `y$`
- `p`
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
- Active/idle status.
- Current stage and completion counts.
- Progress percentages.
- Live activity log.
- Global max-stage unlock control.

## Realtime Data

When Firebase is configured:

- Player progress is saved to Firebase Realtime Database.
- Existing progress loads when players rejoin.
- Activity logs are pushed live.
- Instructor unlock limits are synced live.

Without Firebase, browser session restore still uses `localStorage`.
