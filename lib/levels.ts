export interface Cheat {
  key: string;
  desc: string;
}

export interface Level {
  id: string;
  title: string;
  description: string;
  cheatsheet: Cheat[];
  startText: string;
  task: string;
  check: (text: string) => boolean;
}

export const LEVELS: Level[] = [
  {
    id: "stage-1",
    title: "Enter the Editor",
    description: "VIM starts in Normal mode. To type text, you need to enter Insert mode. Press <kbd>i</kbd> to insert before the cursor, or <kbd>a</kbd> to append after. Press <kbd>Esc</kbd> to return to Normal mode.",
    cheatsheet: [
      { key: "i", desc: "enter insert mode (before cursor)" },
      { key: "a", desc: "enter insert mode (after cursor)" },
      { key: "Esc", desc: "return to normal mode" },
    ],
    startText: "Hello, _____!",
    task: `Replace <span class="target">_____</span> with <span class="target">World</span> so the text reads: <strong>Hello, World!</strong>`,
    check: (text: string) => text.trim() === "Hello, World!"
  },
  {
    id: "stage-2",
    title: "Moving Around",
    description: "In Normal mode, use <kbd>h</kbd> <kbd>j</kbd> <kbd>k</kbd> <kbd>l</kbd> to move left/down/up/right. Use <kbd>w</kbd> to jump forward a word, <kbd>b</kbd> to jump back. Try to navigate without arrow keys!",
    cheatsheet: [
      { key: "h / l", desc: "left / right" },
      { key: "j / k", desc: "down / up" },
      { key: "w", desc: "next word" },
      { key: "b", desc: "previous word" },
    ],
    startText: `The quick brown fox\njumps over the lazy dog\nVIM is fast and efficient`,
    task: `The third line says <span class="target">efficient</span>. Change it to <span class="target">powerful</span>. Navigate there using VIM keys (no arrow keys!), then edit.`,
    check: (text: string) => text.includes("powerful") && !text.includes("efficient")
  },
  {
    id: "stage-3",
    title: "Delete Like a Pro",
    description: "VIM's delete command is <kbd>d</kbd> followed by a motion. <kbd>dw</kbd> deletes a word, <kbd>d$</kbd> deletes to end of line, <kbd>dd</kbd> deletes the whole line. You can add a count: <kbd>d3w</kbd> deletes 3 words.",
    cheatsheet: [
      { key: "dw", desc: "delete word forward" },
      { key: "dd", desc: "delete entire line" },
      { key: "d$", desc: "delete to end of line" },
      { key: "d3w", desc: "delete 3 words" },
    ],
    startText: `Keep this line safe\nDELETE DELETE DELETE this entire line\nThis line should stay too`,
    task: `Delete the <span class="target">entire middle line</span> (the one with DELETE). The other two lines should remain untouched.`,
    check: (text: string) => {
      const lines = text.trim().split('\n').filter(l => l.trim());
      return lines.length === 2 && !text.includes("DELETE");
    }
  },
  {
    id: "stage-4",
    title: "The Motion Formula",
    description: "The VIM motion formula is: <strong>action + count + motion</strong>. For example <kbd>d2w</kbd> deletes 2 words. Practice combining these for powerful editing in very few keystrokes.",
    cheatsheet: [
      { key: "d2w", desc: "delete 2 words" },
      { key: "3dd", desc: "delete 3 lines" },
      { key: "y$", desc: "yank to end of line" },
      { key: "p", desc: "paste" },
    ],
    startText: `The cat sat on the the mat in the the garden`,
    task: `Remove the <span class="target">duplicate words</span>: the two extra <strong>"the"</strong> instances. The result should read: <em>The cat sat on the mat in the garden</em>`,
    check: (text: string) => text.trim() === "The cat sat on the mat in the garden"
  },
  {
    id: "stage-5",
    title: "Text Objects",
    description: "Text objects let you select structured pieces of text. <kbd>i</kbd> means <em>inside</em>, <kbd>a</kbd> means <em>around</em>. Use them after <kbd>d</kbd>, <kbd>y</kbd>, or <kbd>v</kbd>: <kbd>diw</kbd> deletes inside word, <kbd>di\"</kbd> deletes inside quotes.",
    cheatsheet: [
      { key: "diw", desc: "delete inside word" },
      { key: "di\"", desc: "delete inside quotes" },
      { key: "ci(", desc: "change inside parens" },
      { key: "yiw", desc: "yank inside word" },
    ],
    startText: `print("Hello, placeholder!")`,
    task: `Change the text inside the quotes to <span class="target">VIM is awesome!</span>. Use <kbd>ci"</kbd> to change inside the double quotes.`,
    check: (text: string) => text.trim() === `print("VIM is awesome!")`
  }
];