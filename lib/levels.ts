export interface Cheat {
  key: string;
  desc: string;
}

export interface RequiredAction {
  id: string;
  label: string;
  matches: string[];
}

export interface Level {
  id: string;
  title: string;
  description: string;
  cheatsheet: Cheat[];
  startText: string;
  task: string;
  check: (text: string) => boolean;
  requiredActions?: RequiredAction[];
  starTimeLimitSeconds?: number;
}

const clean = (text: string) => text.replace(/\r\n/g, "\n").trim();
const includesAll = (text: string, values: string[]) => values.every(value => text.includes(value));

export const LEVELS: Level[] = [
  {
    id: "stage-1",
    title: "Enter the Editor",
    description: "Vim starts in Normal mode. Use <kbd>i</kbd> or <kbd>a</kbd> to type, then <kbd>Esc</kbd> to return to Normal mode. Finish with <kbd>:wq</kbd>.",
    cheatsheet: [
      { key: "i", desc: "insert before cursor" },
      { key: "a", desc: "append after cursor" },
      { key: "Esc", desc: "return to normal mode" },
      { key: ":wq", desc: "save and check" },
    ],
    startText: "Hello, _____!\nThe editor is waiting for you.",
    task: `Replace <span class="target">_____</span> with <span class="target">World</span>. The first line should read <strong>Hello, World!</strong>`,
    check: (text: string) => includesAll(text, ["Hello, World!", "The editor is waiting for you."]) && !text.includes("_____"),
    requiredActions: [
      { id: "insert-mode", label: "Enter Insert mode with i or a", matches: ["i", "a", "mode:insert"] },
      { id: "escape-normal", label: "Return to Normal mode with Esc", matches: ["Esc", "mode:normal"] },
    ],
  },
  {
    id: "stage-2",
    title: "Move Without Arrows",
    description: "Use <kbd>h</kbd>, <kbd>j</kbd>, <kbd>k</kbd>, and <kbd>l</kbd> to move by character and line. Arrow keys are blocked from this stage onward.",
    cheatsheet: [
      { key: "h / l", desc: "left / right" },
      { key: "j / k", desc: "down / up" },
      { key: "i / a", desc: "edit once you arrive" },
    ],
    startText: `North gate: closed\nEast gate: closed\nSouth gate: clased\nWest gate: closed`,
    task: `Fix the third line so it says <span class="target">South gate: closed</span>. Use Vim movement keys, not arrows.`,
    check: (text: string) => includesAll(text, ["North gate: closed", "East gate: closed", "South gate: closed", "West gate: closed"]) && !text.includes("clased"),
    requiredActions: [
      { id: "vertical-motion", label: "Move between lines with j or k", matches: ["j", "k", "motion:j", "motion:k"] },
      { id: "horizontal-motion", label: "Move across a line with h or l", matches: ["h", "l", "motion:h", "motion:l"] },
    ],
  },
  {
    id: "stage-3",
    title: "Words Are Faster Than Characters",
    description: "Character movement works, but word and line motions are the payoff. Use <kbd>w</kbd>, <kbd>b</kbd>, <kbd>e</kbd>, <kbd>0</kbd>, and <kbd>$</kbd> to cross text quickly.",
    cheatsheet: [
      { key: "w / b", desc: "next / previous word" },
      { key: "e", desc: "end of word" },
      { key: "0 / $", desc: "start / end of line" },
    ],
    startText: `The release notes are almost ready.\nChange the final word of this line from slow to fast\nReturn to the start of this line and fix erorr before shipping`,
    task: `Make the document say <span class="target">fast</span> instead of <span class="target">slow</span>, and <span class="target">error</span> instead of <span class="target">erorr</span>.`,
    check: (text: string) => includesAll(text, ["from fast to fast", "fix error before shipping"]) && !text.includes("slow") && !text.includes("erorr"),
    requiredActions: [
      { id: "word-motion", label: "Use word motion with w, b, or e", matches: ["w", "b", "e", "motion:w", "motion:b", "motion:e"] },
      { id: "line-edge-motion", label: "Use 0 or $ to jump across a line", matches: ["0", "$", "motion:0", "motion:$"] },
    ],
  },
  {
    id: "stage-4",
    title: "Delete Precisely",
    description: "Deletion is an operator plus a target. Use <kbd>x</kbd>, <kbd>dw</kbd>, <kbd>de</kbd>, <kbd>d$</kbd>, and <kbd>dd</kbd> to remove exactly what is wrong.",
    cheatsheet: [
      { key: "x", desc: "delete character under cursor" },
      { key: "dw / de", desc: "delete word / to word end" },
      { key: "d$", desc: "delete to line end" },
      { key: "dd", desc: "delete current line" },
    ],
    startText: `server_port = 3000x\nmode = production keep-this-only # remove this noisy explanation\nDELETE_THIS_LINE completely\ncache = enabled`,
    task: `Clean the config: remove the stray <span class="target">x</span>, remove the comment after <span class="target">keep-this-only</span>, and delete the full DELETE line.`,
    check: (text: string) => clean(text) === clean(`server_port = 3000\nmode = production keep-this-only\ncache = enabled`),
    requiredActions: [
      { id: "delete-char", label: "Use x to delete one character", matches: ["x"] },
      { id: "delete-motion", label: "Use a delete motion such as dw, de, or d$", matches: ["dw", "de", "d$", "operator:d"] },
      { id: "delete-line", label: "Use dd to delete a full line", matches: ["dd", "line"] },
    ],
  },
  {
    id: "stage-5",
    title: "Counts Multiply Power",
    description: "Counts make commands scale. Use counted motions and operators such as <kbd>3w</kbd>, <kbd>d2w</kbd>, <kbd>3dd</kbd>, <kbd>dj</kbd>, and <kbd>dk</kbd>.",
    cheatsheet: [
      { key: "3w", desc: "move three words" },
      { key: "d2w", desc: "delete two words" },
      { key: "3dd", desc: "delete three lines" },
      { key: "dj / dk", desc: "delete current plus next / previous line" },
    ],
    startText: `Keep: write tests\nREMOVE alpha beta gamma\nREMOVE delta epsilon zeta\nREMOVE eta theta iota\nKeep: ship clean build`,
    task: `Remove the three REMOVE lines and leave only the two Keep lines.`,
    check: (text: string) => clean(text) === clean(`Keep: write tests\nKeep: ship clean build`),
    requiredActions: [
      { id: "counted-command", label: "Use a counted motion or operator", matches: ["motion:counted", "line:counted", "3dd", "d2w"] },
      { id: "line-delete", label: "Use a linewise delete", matches: ["dd", "dj", "dk", "line"] },
    ],
  },
  {
    id: "stage-6",
    title: "Yank And Paste",
    description: "Yank means copy. Use <kbd>yy</kbd>, <kbd>yw</kbd>, <kbd>y$</kbd>, and <kbd>p</kbd> to reuse correct text instead of retyping it.",
    cheatsheet: [
      { key: "yy", desc: "yank current line" },
      { key: "y$", desc: "yank to end of line" },
      { key: "p", desc: "paste after cursor" },
    ],
    startText: `template: status=ready owner=team-alpha\nservice-api: \nservice-web: \nservice-worker: `,
    task: `Copy the template status into all three service lines so every service has <span class="target">status=ready owner=team-alpha</span>.`,
    check: (text: string) => {
      const lines = clean(text).split("\n");
      return lines.slice(1).every(line => line.includes("status=ready owner=team-alpha"));
    },
    requiredActions: [
      { id: "yank", label: "Yank reusable text", matches: ["yy", "yw", "y$", "operator:y", "yank"] },
      { id: "paste", label: "Paste with p", matches: ["p", "paste"] },
    ],
  },
  {
    id: "stage-7",
    title: "Undo, Redo, Repeat",
    description: "Vim lets you experiment. Use <kbd>u</kbd> to undo, <kbd>Ctrl+r</kbd> to redo, and <kbd>.</kbd> to repeat the last edit.",
    cheatsheet: [
      { key: "u", desc: "undo" },
      { key: "Ctrl+r", desc: "redo" },
      { key: ".", desc: "repeat last edit" },
    ],
    startText: `alpha: draft\nbeta: draft\ngamma: draft\ndelta: draft`,
    task: `Change every <span class="target">draft</span> to <span class="target">done</span>. Use undo/redo at least once, and use repeat for one repeated edit.`,
    check: (text: string) => clean(text) === clean(`alpha: done\nbeta: done\ngamma: done\ndelta: done`),
    requiredActions: [
      { id: "undo", label: "Undo once with u", matches: ["u", "undo"] },
      { id: "redo", label: "Redo once with Ctrl+r", matches: ["Ctrl+r", "redo"] },
      { id: "repeat", label: "Repeat an edit with .", matches: [".", "repeat"] },
    ],
  },
  {
    id: "stage-8",
    title: "Visual Selection",
    description: "Visual mode is useful when you can see the chunk you want. Use <kbd>v</kbd> or <kbd>V</kbd>, then <kbd>d</kbd> or <kbd>y</kbd>.",
    cheatsheet: [
      { key: "v", desc: "visual character mode" },
      { key: "V", desc: "visual line mode" },
      { key: "d / y", desc: "delete / yank selection" },
    ],
    startText: `Release notes\nKEEP: login flow works\nREMOVE: duplicate bullet\nREMOVE: stale bullet\nKEEP: dashboard updates live`,
    task: `Remove the two <span class="target">REMOVE</span> lines using Visual mode.`,
    check: (text: string) => clean(text) === clean(`Release notes\nKEEP: login flow works\nKEEP: dashboard updates live`),
    requiredActions: [
      { id: "visual", label: "Use Visual mode", matches: ["v", "V", "visual"] },
      { id: "visual-delete", label: "Delete from Visual mode", matches: ["delete", "operator:d"] },
    ],
  },
  {
    id: "stage-9",
    title: "Text Objects: Words And Quotes",
    description: "Text objects target meaningful units. Use <kbd>diw</kbd>, <kbd>daw</kbd>, <kbd>ci\"</kbd>, and <kbd>yiw</kbd>.",
    cheatsheet: [
      { key: "diw", desc: "delete inside word" },
      { key: "daw", desc: "delete around word" },
      { key: "ci\"", desc: "change inside quotes" },
      { key: "yiw", desc: "yank inside word" },
    ],
    startText: `const label = "PLACEHOLDER";\nconst mode = "draft";\nremove_me should disappear`,
    task: `Change the label to <span class="target">Launch Ready</span>, change mode to <span class="target">stable</span>, and remove <span class="target">remove_me</span>.`,
    check: (text: string) => includesAll(text, [`const label = "Launch Ready";`, `const mode = "stable";`]) && !text.includes("remove_me"),
    requiredActions: [
      { id: "word-object", label: "Use a word text object", matches: ["diw", "daw", "yiw", "text-object:word"] },
      { id: "quote-object", label: "Use a quote text object", matches: ["ci\"", "di\"", "text-object:quote"] },
    ],
  },
  {
    id: "stage-10",
    title: "Text Objects: Parentheses And Tags",
    description: "Text objects also work on structure. Use <kbd>ci(</kbd>, <kbd>ya(</kbd>, <kbd>dit</kbd>, and <kbd>vit</kbd>.",
    cheatsheet: [
      { key: "ci(", desc: "change inside parentheses" },
      { key: "ya(", desc: "yank around parentheses" },
      { key: "dit", desc: "delete inside tag" },
      { key: "vit", desc: "select inside tag" },
    ],
    startText: `renderButton("old label", disabled)\n<div>temporary text</div>\ncalculate(total, placeholder)`,
    task: `Update the button arguments to <span class="target">"Save", enabled</span>, clear the div content, and change <span class="target">placeholder</span> to <span class="target">tax</span>.`,
    check: (text: string) => includesAll(text, [`renderButton("Save", enabled)`, `<div></div>`, `calculate(total, tax)`]),
    requiredActions: [
      { id: "paren-object", label: "Use a parenthesis text object", matches: ["ci(", "ya(", "text-object:paren"] },
      { id: "tag-object", label: "Use a tag text object", matches: ["dit", "vit", "text-object:tag"] },
    ],
  },
  {
    id: "stage-11",
    title: "Search To Jump",
    description: "Use <kbd>/pattern</kbd> to jump directly to text. Use <kbd>n</kbd> and <kbd>N</kbd> to move between matches.",
    cheatsheet: [
      { key: "/text", desc: "search forward" },
      { key: "n", desc: "next match" },
      { key: "N", desc: "previous match" },
    ],
    startText: `alpha item is fine\nTODO_RENAME api_client\nmiddle item is fine\nTODO_RENAME web_client\nlast item is fine\nTODO_RENAME worker_client`,
    task: `Find each <span class="target">TODO_RENAME</span> marker and change it to <span class="target">renamed</span>.`,
    check: (text: string) => !text.includes("TODO_RENAME") && (text.match(/renamed/g) || []).length === 3,
    requiredActions: [
      { id: "search", label: "Search with /pattern", matches: ["search"] },
      { id: "next-search", label: "Move between matches with n or N", matches: ["n", "N", "search:next"] },
    ],
  },
  {
    id: "stage-12",
    title: "Search Then Edit",
    description: "Search gets you to the right place; operators perform the edit. Combine <kbd>/</kbd>, <kbd>n</kbd>, and change/delete commands.",
    cheatsheet: [
      { key: "/blocked", desc: "find a target word" },
      { key: "n", desc: "next match" },
      { key: "cw", desc: "change word" },
    ],
    startText: `task-101 status=blocked owner=maya\ntask-102 status=ready owner=jo\ntask-103 status=blocked owner=ren\ntask-104 status=ready owner=lee\ntask-105 status=blocked owner=avi`,
    task: `Search for <span class="target">blocked</span> and change every blocked status to <span class="target">ready</span>.`,
    check: (text: string) => !text.includes("blocked") && (text.match(/status=ready/g) || []).length === 5,
    requiredActions: [
      { id: "search", label: "Search with /pattern", matches: ["search"] },
      { id: "change-or-delete", label: "Use a change or delete command after searching", matches: ["operator:c", "operator:d", "change", "delete"] },
    ],
  },
  {
    id: "stage-13",
    title: "Substitute A Word Everywhere",
    description: "For repeated replacements, use substitution. <kbd>:%s/old/new/g</kbd> changes matches across the whole file.",
    cheatsheet: [
      { key: ":%s/old/new/g", desc: "replace in the whole file" },
      { key: ":wq", desc: "save and check" },
    ],
    startText: `product: VimSprint\nurl: /vimsprint/start\nemail: hello@vimsprint.test\nfooter: VimSprint beta`,
    task: `Rename <span class="target">VimSprint</span> / <span class="target">vimsprint</span> to <span class="target">VimMotion</span> / <span class="target">vimmotion</span> using substitutions.`,
    check: (text: string) => includesAll(text, ["product: VimMotion", "/vimmotion/start", "hello@vimmotion.test", "footer: VimMotion beta"]) && !/VimSprint|vimsprint/.test(text),
    requiredActions: [
      { id: "global-substitution", label: "Use a whole-file substitution", matches: ["substitution:global"] },
      { id: "substitution", label: "Use substitution", matches: ["substitution"] },
    ],
  },
  {
    id: "stage-14",
    title: "Substitute In A Range",
    description: "Not every replacement should be global. Use a range such as <kbd>:3,6s/draft/published/g</kbd> to edit only part of a file.",
    cheatsheet: [
      { key: ":s/a/b/g", desc: "replace on current line" },
      { key: ":3,6s/a/b/g", desc: "replace inside a line range" },
    ],
    startText: `Archive section\n- draft note from January\n- draft note from February\nPublish section\n- draft article one\n- draft article two\n- draft article three`,
    task: `Change <span class="target">draft</span> to <span class="target">published</span> only in the Publish section. Archive lines must stay draft.`,
    check: (text: string) => includesAll(text, ["- draft note from January", "- draft note from February", "- published article one", "- published article two", "- published article three"]),
    requiredActions: [
      { id: "range-substitution", label: "Use a ranged substitution", matches: ["substitution:range"] },
    ],
  },
  {
    id: "stage-15",
    title: "Regex Basics",
    description: "Substitution patterns can be regular expressions. Use character classes and quantifiers to replace many similar values.",
    cheatsheet: [
      { key: ":%s/user-[0-9]+/user/g", desc: "regex replacement" },
      { key: "[0-9]+", desc: "one or more digits" },
    ],
    startText: `owner=user-001 role=admin\nowner=user-024 role=editor\nowner=user-305 role=viewer`,
    task: `Normalize every owner to <span class="target">owner=user</span> using a regex substitution.`,
    check: (text: string) => clean(text) === clean(`owner=user role=admin\nowner=user role=editor\nowner=user role=viewer`),
    requiredActions: [
      { id: "regex-substitution", label: "Use regex in a substitution", matches: ["regex"] },
      { id: "substitution", label: "Use substitution", matches: ["substitution"] },
    ],
  },
  {
    id: "stage-16",
    title: "Regex Cleanup",
    description: "Regex becomes powerful for cleanup. Use more than one substitution to normalize messy text.",
    cheatsheet: [
      { key: ":%s/  +/ /g", desc: "collapse repeated spaces" },
      { key: ":%s/!+/!/g", desc: "collapse repeated punctuation" },
    ],
    startText: `WARN   login   failed!!!\nINFO    cache    warmed!!\nERROR   worker   stopped!!!!`,
    task: `Collapse repeated spaces to one space and repeated exclamation marks to one mark.`,
    check: (text: string) => clean(text) === clean(`WARN login failed!\nINFO cache warmed!\nERROR worker stopped!`),
    requiredActions: [
      { id: "regex-substitution", label: "Use regex substitution", matches: ["regex"] },
      { id: "substitution", label: "Use substitution", matches: ["substitution"] },
    ],
  },
  {
    id: "stage-17",
    title: "Record A Macro",
    description: "Macros record keystrokes. Use <kbd>qa</kbd> to record into register a, <kbd>q</kbd> to stop, and <kbd>@a</kbd> to replay.",
    cheatsheet: [
      { key: "qa", desc: "record macro a" },
      { key: "q", desc: "stop recording" },
      { key: "@a", desc: "replay macro a" },
    ],
    startText: `TODO write parser\nTODO add tests\nTODO update docs\nDONE keep changelog`,
    task: `Remove the <span class="target">TODO </span> prefix from the first three lines by recording and replaying a macro.`,
    check: (text: string) => clean(text) === clean(`write parser\nadd tests\nupdate docs\nDONE keep changelog`),
    requiredActions: [
      { id: "macro-record", label: "Record a macro with q{register}", matches: ["macro:record"] },
      { id: "macro-replay", label: "Replay a macro with @", matches: ["macro:replay"] },
    ],
  },
  {
    id: "stage-18",
    title: "Macros At Scale",
    description: "Macros compound with counts. Record one row cleanup and replay it many times with <kbd>5@a</kbd> or repeated <kbd>@@</kbd>.",
    cheatsheet: [
      { key: "qa", desc: "record macro a" },
      { key: "5@a", desc: "replay macro five times" },
      { key: "@@", desc: "repeat last macro" },
    ],
    startText: `TODO alpha task\nTODO beta task\nTODO gamma task\nTODO delta task\nTODO epsilon task\nTODO zeta task`,
    task: `Remove <span class="target">TODO </span> from every line using macro replay at scale.`,
    check: (text: string) => clean(text) === clean(`alpha task\nbeta task\ngamma task\ndelta task\nepsilon task\nzeta task`),
    requiredActions: [
      { id: "macro-record", label: "Record a macro", matches: ["macro:record"] },
      { id: "macro-counted", label: "Replay a macro more than once", matches: ["macro:counted", "@@"] },
    ],
  },
  {
    id: "stage-19",
    title: "Final Practical Edit",
    description: "Choose the right tool for each edit: motions, text objects, search, substitution, visual mode, yank/paste, and macros.",
    cheatsheet: [
      { key: "/ n", desc: "search and move between matches" },
      { key: ":%s/a/b/g", desc: "bulk replace" },
      { key: "ci\"", desc: "change inside quotes" },
      { key: "qa @a", desc: "record and replay a macro" },
    ],
    startText: `project = "OLD_NAME"\nstatus: draft\nTODO remove prefix one\nTODO remove prefix two\nnotes: OLD_NAME should launch soon\n<div>placeholder</div>\nstatus: draft`,
    task: `Finish the file: rename <span class="target">OLD_NAME</span> to <span class="target">VimMotion</span>, change both statuses to published, remove TODO prefixes, and clear the div text.`,
    check: (text: string) => includesAll(text, [`project = "VimMotion"`, "status: published", "remove prefix one", "remove prefix two", "notes: VimMotion should launch soon", "<div></div>"]) && !/OLD_NAME|draft|TODO|placeholder/.test(text),
    requiredActions: [
      { id: "search", label: "Use search", matches: ["search"] },
      { id: "substitution", label: "Use substitution", matches: ["substitution"] },
      { id: "text-object", label: "Use a text object", matches: ["text-object:quote", "text-object:tag", "text-object:word"] },
      { id: "macro", label: "Use a macro", matches: ["macro:record", "macro:replay"] },
    ],
  },
];
