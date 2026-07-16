import { useState, useRef, useEffect } from "react";
import type { ChangeEvent, KeyboardEvent as ReactKeyboardEvent } from "react";

export type VimMode = "NORMAL" | "INSERT" | "VISUAL" | "VISUAL_LINE" | "COMMAND" | "SEARCH";

export interface VimUsage {
  commands: string[];
  actions: string[];
}

export function useVim(initialText: string, onWq?: (finalText: string, vimUsage: VimUsage) => void, onQuit?: () => void, resetToken = 0) {
  const [text, setText] = useState(initialText);
  const [mode, setMode] = useState<VimMode>("NORMAL");
  const [commandText, setCommandText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [cursor, setCursor] = useState({ start: 0, end: 0 });
  const [historyLine, setHistoryLine] = useState<string[]>([]);
  const [redoLine, setRedoLine] = useState<string[]>([]);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const bufferRef = useRef<string>("");
  const clipboardRef = useRef<string>("");
  const clipboardKindRef = useRef<"char" | "line">("char");
  const lastEditRef = useRef<string>("");
  const usageRef = useRef<VimUsage>({ commands: [], actions: [] });
  const lastSearchRef = useRef("");
  const macroRegistersRef = useRef<Record<string, string[]>>({});
  const macroRecordingRef = useRef<{ register: string; keys: string[] } | null>(null);
  const awaitingMacroRegisterRef = useRef(false);
  const lastMacroRegisterRef = useRef<string | null>(null);
  const replayingMacroRef = useRef(false);
  const visualLineAnchorRef = useRef<number | null>(null);
  const visualLineFocusRef = useRef<number | null>(null);

  useEffect(() => {
    setText(initialText);
    setHistoryLine([initialText]);
    setRedoLine([]);
    setMode("NORMAL");
    setCursor({ start: 0, end: 0 });
    bufferRef.current = "";
    lastEditRef.current = "";
    clipboardRef.current = "";
    clipboardKindRef.current = "char";
    usageRef.current = { commands: [], actions: [] };
    lastSearchRef.current = "";
    macroRegistersRef.current = {};
    macroRecordingRef.current = null;
    awaitingMacroRegisterRef.current = false;
    lastMacroRegisterRef.current = null;
    visualLineAnchorRef.current = null;
    visualLineFocusRef.current = null;
  }, [initialText, resetToken]);

  const trackUsage = (command: string, actions: string[] = []) => {
    usageRef.current = {
      commands: usageRef.current.commands.includes(command)
        ? usageRef.current.commands
        : [...usageRef.current.commands, command],
      actions: actions.reduce((tracked, action) => {
        return tracked.includes(action) ? tracked : [...tracked, action];
      }, usageRef.current.actions),
    };
  };

  const getMotionActions = (motion: string, count = 1) => {
    const actions = [`motion:${motion}`];
    if (count > 1) actions.push("motion:counted");
    return actions;
  };

  const getOperatorActions = (operator: string, count = 1) => {
    const actions = [`operator:${operator}`];
    if (count > 1) actions.push("motion:counted");
    return actions;
  };

  const getTextObjectActions = (obj: string) => {
    const actions = [`text-object:${obj}`];
    if (obj === '"' || obj === "'") actions.push("text-object:quote");
    if (obj === "w") actions.push("text-object:word");
    if (obj === "(" || obj === ")") actions.push("text-object:paren");
    if (obj === "t") actions.push("text-object:tag");
    return actions;
  };

  const commitHistory = (newText: string, force = false) => {
    setText(newText);
    setRedoLine([]);
    setHistoryLine(prev => {
      if (!force && prev[prev.length - 1] === newText) return prev;
      return [...prev, newText];
    });
  };

  const recordMacroKey = (recordedKey: string) => {
    if (macroRecordingRef.current && !replayingMacroRef.current) {
      if (recordedKey === "Esc" || recordedKey === "Ctrl+r") {
        macroRecordingRef.current.keys.push(recordedKey);
      } else {
        macroRecordingRef.current.keys.push(...recordedKey.split(""));
      }
    }
  };

  const dispatchRecordedKey = (recordedKey: string, delay: number) => {
    setTimeout(() => {
      if (!textareaRef.current) return;
      const eventInit = recordedKey === "Ctrl+r"
        ? { key: "r", ctrlKey: true, bubbles: true, cancelable: true }
        : { key: recordedKey, bubbles: true, cancelable: true };
      textareaRef.current.dispatchEvent(new KeyboardEvent("keydown", eventInit));
    }, delay);
  };

  const replayMacro = (register: string, count = 1) => {
    const keys = macroRegistersRef.current[register];
    if (!keys || keys.length === 0) return;

    replayingMacroRef.current = true;
    for (let repeat = 0; repeat < count; repeat++) {
      keys.forEach((recordedKey, idx) => {
        dispatchRecordedKey(recordedKey, (repeat * keys.length + idx) * 20);
      });
    }
    setTimeout(() => {
      replayingMacroRef.current = false;
    }, count * keys.length * 20 + 20);
  };

  // Sync cursor visually
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.setSelectionRange(cursor.start, cursor.end);
    }
  }, [cursor, text]);

  const updateCursor = (pos: number, allowEnd = false) => {
    const max = allowEnd ? text.length : Math.max(0, text.length - 1);
    const safePos = Math.max(0, Math.min(pos, text.length));
    const boundedPos = Math.min(safePos, max);
    setCursor({ start: boundedPos, end: boundedPos });
  };

  const setInsertCursor = (pos: number) => updateCursor(pos, true);

  const getLineInfo = (pos: number) => {
    const lines = text.split("\n");
    let acc = 0;
    for (let i = 0; i < lines.length; i++) {
      if (acc + lines[i].length >= pos) {
        return { lineIndex: i, col: pos - acc, lineStart: acc, lineEnd: acc + lines[i].length, text: lines[i] };
      }
      acc += lines[i].length + 1; // +1 for newline
    }
    return { lineIndex: lines.length - 1, col: 0, lineStart: acc, lineEnd: acc, text: "" };
  };

  const applyMotion = (pos: number, motion: string, count: number, allowEnd = false): number | null => {
    const MAX = text.length;
    let curr = pos;
    const isWord = (char: string | undefined) => !!char && /\w/.test(char);

    if (MAX === 0) return 0;

    for (let c = 0; c < count; c++) {
      switch (motion) {
        case "h": curr = Math.max(0, curr - 1); break;
        case "l": curr = Math.min(allowEnd ? MAX : MAX - 1, curr + 1); break;
        case "j": {
          const info = getLineInfo(curr);
          const lines = text.split("\n");
          if (info.lineIndex + 1 < lines.length) {
            const nextLineStart = info.lineEnd + 1;
            const nextLineLen = lines[info.lineIndex + 1].length;
            const nextLineMax = allowEnd ? nextLineLen : Math.max(0, nextLineLen - 1);
            curr = nextLineStart + Math.min(info.col, nextLineMax);
          }
          break;
        }
        case "k": {
          const info = getLineInfo(curr);
          const lines = text.split("\n");
          if (info.lineIndex - 1 >= 0) {
            const prevLine = lines[info.lineIndex - 1];
            const prevLineStart = info.lineStart - prevLine.length - 1;
            const prevLineMax = allowEnd ? prevLine.length : Math.max(0, prevLine.length - 1);
            curr = prevLineStart + Math.min(info.col, prevLineMax);
          }
          break;
        }
        case "w": {
          if (isWord(text[curr])) {
            while (curr < MAX && isWord(text[curr])) curr++;
          }
          while (curr < MAX && !isWord(text[curr])) curr++;
          break;
        }
        case "b": {
          curr = Math.max(0, curr - 1);
          while (curr > 0 && !isWord(text[curr])) curr--;
          while (curr > 0 && isWord(text[curr - 1])) curr--;
          break;
        }
        case "e": {
          if (curr < MAX - 1) curr++;
          while (curr < MAX && !isWord(text[curr])) curr++;
          while (curr < MAX - 1 && isWord(text[curr + 1])) curr++;
          break;
        }
        case "$": {
          const info = getLineInfo(curr);
          curr = allowEnd ? info.lineEnd : Math.max(info.lineStart, info.lineEnd - 1);
          break;
        }
        case "0": {
          const info = getLineInfo(curr);
          curr = info.lineStart;
          break;
        }
        default:
          return null; // Not a valid motion
      }
    }
    if (allowEnd) return Math.max(0, Math.min(curr, MAX));
    return Math.max(0, Math.min(curr, MAX - 1));
  };

  const isInclusiveMotion = (motion: string) => ["e", "$"].includes(motion);

  const getMotionRange = (pos: number, motion: string, count: number): { start: number, end: number } | null => {
    const motionPos = applyMotion(pos, motion, count, motion === "w");
    if (motionPos === null) return null;

    let start = Math.min(pos, motionPos);
    let end = Math.max(pos, motionPos);
    if (motionPos >= pos && isInclusiveMotion(motion)) {
      end += 1;
    }
    if (motionPos < pos && isInclusiveMotion(motion)) {
      start = motionPos;
      end = pos + 1;
    }

    return {
      start: Math.max(0, Math.min(start, text.length)),
      end: Math.max(0, Math.min(end, text.length)),
    };
  };

  const getLineRange = (pos: number, count: number) => {
    const lines = text.split("\n");
    const info = getLineInfo(pos);
    let start = info.lineStart;
    let end = info.lineEnd;

    for (let i = 1; i < count && info.lineIndex + i < lines.length; i++) {
      end += lines[info.lineIndex + i].length + 1;
    }

    if (end < text.length) end += 1;
    return { start, end };
  };

  const getLineRangeByIndexes = (lineA: number, lineB: number) => {
    const lines = text.split("\n");
    const startLine = Math.max(0, Math.min(lineA, lineB));
    const endLine = Math.min(lines.length - 1, Math.max(lineA, lineB));

    let start = 0;
    for (let i = 0; i < startLine; i++) {
      start += lines[i].length + 1;
    }

    let end = start;
    for (let i = startLine; i <= endLine; i++) {
      end += lines[i].length;
      if (i < lines.length - 1) end += 1;
    }

    return { start, end };
  };

  const setVisualLineSelection = (anchorLine: number, focusLine: number) => {
    visualLineAnchorRef.current = anchorLine;
    visualLineFocusRef.current = focusLine;
    setCursor(getLineRangeByIndexes(anchorLine, focusLine));
  };

  const getLineRangeByMotion = (pos: number, motion: "j" | "k", count: number) => {
    const lines = text.split("\n");
    const info = getLineInfo(pos);
    const targetLine = motion === "j"
      ? Math.min(lines.length - 1, info.lineIndex + count)
      : Math.max(0, info.lineIndex - count);
    return getLineRangeByIndexes(info.lineIndex, targetLine);
  };

  const getLinewisePasteText = () => clipboardRef.current.endsWith("\n")
    ? clipboardRef.current.slice(0, -1)
    : clipboardRef.current;

  const pasteLinewiseBelow = () => {
    const paste = getLinewisePasteText();
    const info = getLineInfo(cursor.start);
    const insertAt = info.lineEnd < text.length ? info.lineEnd + 1 : text.length;
    const newText = text.length === 0
      ? paste
      : info.lineEnd < text.length
        ? text.slice(0, insertAt) + paste + "\n" + text.slice(insertAt)
        : text + "\n" + paste;
    commitHistory(newText);
    setCursor({ start: insertAt, end: insertAt });
  };

  const pasteLinewiseAbove = () => {
    const paste = getLinewisePasteText();
    const info = getLineInfo(cursor.start);
    const insertAt = info.lineStart;
    const newText = text.slice(0, insertAt) + paste + "\n" + text.slice(insertAt);
    commitHistory(newText);
    setCursor({ start: insertAt, end: insertAt });
  };

  const findPattern = (pattern: string, direction: 1 | -1 = 1, fromPos = cursor.start) => {
    if (!pattern) return null;
    const flags = "g";
    let regex: RegExp;
    try {
      regex = new RegExp(pattern, flags);
    } catch {
      regex = new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), flags);
    }

    const matches = [...text.matchAll(regex)].filter(match => match.index !== undefined);
    if (matches.length === 0) return null;

    if (direction === 1) {
      const next = matches.find(match => (match.index || 0) > fromPos);
      return next?.index ?? matches[0].index ?? null;
    }

    const previous = [...matches].reverse().find(match => (match.index || 0) < fromPos);
    return previous?.index ?? matches[matches.length - 1].index ?? null;
  };

  const splitCommandParts = (body: string) => {
    const parts: string[] = [];
    let current = "";
    let escaped = false;

    for (const char of body) {
      if (escaped) {
        current += char;
        escaped = false;
      } else if (char === "\\") {
        current += char;
        escaped = true;
      } else if (char === "/") {
        parts.push(current);
        current = "";
      } else {
        current += char;
      }
    }
    parts.push(current);
    return parts;
  };

  const applySubstitution = (command: string) => {
    const match = command.match(/^(%|\d+,\d+)?s\/(.*)$/);
    if (!match) return false;

    const range = match[1];
    const parts = splitCommandParts(match[2]);
    if (parts.length < 2) return false;

    const [pattern, replacement, flags = ""] = parts;
    let regex: RegExp;
    try {
      regex = new RegExp(pattern, flags.includes("g") ? "g" : "");
    } catch {
      return false;
    }

    const lines = text.split("\n");
    let startLine = 0;
    let endLine = lines.length - 1;

    if (!range) {
      const info = getLineInfo(cursor.start);
      startLine = info.lineIndex;
      endLine = info.lineIndex;
    } else if (range !== "%") {
      const [start, end] = range.split(",").map(value => parseInt(value, 10) - 1);
      if (Number.isNaN(start) || Number.isNaN(end)) return false;
      startLine = Math.max(0, Math.min(start, lines.length - 1));
      endLine = Math.max(0, Math.min(end, lines.length - 1));
    }

    const nextLines = lines.map((line, index) => {
      if (index < startLine || index > endLine) return line;
      return line.replace(regex, replacement);
    });

    const newText = nextLines.join("\n");
    commitHistory(newText);
    updateCursor(Math.min(cursor.start, Math.max(0, newText.length - 1)));
    trackUsage(`:${command}`, [
      "substitution",
      range === "%" ? "substitution:global" : range ? "substitution:range" : "substitution:line",
      /[\\^$.*+?()[\]{}|]/.test(pattern) ? "regex" : "regex:literal",
    ]);
    return true;
  };

  const applyTextObject = (pos: number, modifier: "i" | "a", obj: string): { start: number, end: number } | null => {
    // simplified
    if (obj === "w") {
      let start = pos;
      while (start > 0 && /\w/.test(text[start - 1])) start--;
      let end = pos;
      while (end < text.length && /\w/.test(text[end])) end++;
      
      if (modifier === "a") {
        while (end < text.length && text[end] === " ") end++;
      }
      return { start, end };
    }
    if (obj === "(" || obj === ")") {
      const open = text.lastIndexOf("(", pos);
      const close = text.indexOf(")", pos);
      if (open !== -1 && close !== -1) {
        return modifier === "i" ? { start: open + 1, end: close } : { start: open, end: close + 1 };
      }
    }
    if (obj === '"' || obj === "'") {
      const first = text.lastIndexOf(obj, pos - 1);
      const second = text.indexOf(obj, pos);
      if (first !== -1 && second !== -1) {
         return modifier === "i" ? { start: first + 1, end: second } : { start: first, end: second + 1 };
      }
    }
    if (obj === "t" && modifier === "i") { // Simplified inner tag
      const openEnd = text.lastIndexOf(">", pos);
      const closeStart = text.indexOf("</", pos);
      if (openEnd !== -1 && closeStart !== -1 && openEnd < closeStart) {
        return { start: openEnd + 1, end: closeStart };
      }
    }
    return null;
  };

  const handleKeyDown = (e: ReactKeyboardEvent<HTMLTextAreaElement>) => {
    let key = e.key;

    if (mode === "COMMAND") {
      e.preventDefault();
      if (key === "Escape") {
        setMode("NORMAL");
        setCommandText("");
        trackUsage("Esc", ["mode:normal"]);
        return;
      }
      if (key === "Enter") {
        if (commandText === "wq" && onWq) {
          trackUsage(":wq", ["command:wq"]);
          onWq(text, usageRef.current);
        } else if (applySubstitution(commandText)) {
          // substitution already handled and tracked
        } else if (commandText === "q" || commandText === "q!") {
          trackUsage(`:${commandText}`, ["command:quit"]);
          setText(initialText);
          setHistoryLine([initialText]);
          if (onQuit) {
            onQuit();
          } else if (onWq) {
             onWq(initialText, usageRef.current); // or cancel it out entirely without saving
          }
        }
        setMode("NORMAL");
        setCommandText("");
        return;
      }
      if (key === "Backspace") {
        setCommandText(prev => {
          if (prev.length === 0) {
            setMode("NORMAL");
            return "";
          }
          return prev.slice(0, -1);
        });
        return;
      }
      if (key.length === 1) {
        setCommandText(prev => prev + key);
      }
      return;
    }

    if (mode === "SEARCH") {
      e.preventDefault();
      if (key === "Escape") {
        setMode("NORMAL");
        setSearchText("");
        trackUsage("Esc", ["mode:normal"]);
        return;
      }
      if (key === "Enter") {
        const pattern = searchText;
        lastSearchRef.current = pattern;
        const found = findPattern(pattern, 1);
        if (found !== null) updateCursor(found);
        trackUsage(`/${pattern}`, ["search"]);
        setMode("NORMAL");
        setSearchText("");
        return;
      }
      if (key === "Backspace") {
        setSearchText(prev => prev.slice(0, -1));
        return;
      }
      if (key.length === 1) {
        setSearchText(prev => prev + key);
      }
      return;
    }

    if (mode === "INSERT") {
      if (key === "Escape") {
        e.preventDefault();
        setMode("NORMAL");
        commitHistory(text); // commit the typed text change into history for undo
        updateCursor(Math.max(0, cursor.start - 1));
        trackUsage("Esc", ["mode:normal"]);
      }
      recordMacroKey(key);
      return;
    }

    e.preventDefault();

    if (e.ctrlKey && key.toLowerCase() === "r") {
      if (redoLine.length > 0) {
        const [redoText, ...remainingRedo] = redoLine;
        setHistoryLine(prev => [...prev, redoText]);
        setRedoLine(remainingRedo);
        setText(redoText);
        setCursor({
          start: Math.min(cursor.start, Math.max(0, redoText.length - 1)),
          end: Math.min(cursor.start, Math.max(0, redoText.length - 1)),
        });
      }
      trackUsage("Ctrl+r", ["redo"]);
      recordMacroKey("Ctrl+r");
      return;
    }

    if (key === "Escape") {
      bufferRef.current = "";
      setMode("NORMAL");
      visualLineAnchorRef.current = null;
      visualLineFocusRef.current = null;
      updateCursor(cursor.start);
      trackUsage("Esc", ["mode:normal"]);
      recordMacroKey("Esc");
      return;
    }

    if (awaitingMacroRegisterRef.current) {
      if (/^[a-z]$/.test(key)) {
        macroRecordingRef.current = { register: key, keys: [] };
        awaitingMacroRegisterRef.current = false;
        trackUsage(`q${key}`, ["macro:record"]);
      } else {
        awaitingMacroRegisterRef.current = false;
      }
      return;
    }

    if (macroRecordingRef.current && key === "q") {
      const recording = macroRecordingRef.current;
      macroRegistersRef.current[recording.register] = recording.keys;
      lastMacroRegisterRef.current = recording.register;
      macroRecordingRef.current = null;
      trackUsage("q", ["macro:stop"]);
      return;
    }

    // Normal mode arrow mapping
    if (key === "ArrowLeft") key = "h";
    if (key === "ArrowDown") key = "j";
    if (key === "ArrowUp") key = "k";
    if (key === "ArrowRight") key = "l";

    // Ignore pure modifier keys
    if (["Shift", "Control", "Alt", "Meta", "CapsLock", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(key)) return;

    if (key === "/") {
      setMode("SEARCH");
      setSearchText("");
      bufferRef.current = "";
      trackUsage("/", ["mode:search"]);
      recordMacroKey("/");
      return;
    }

    if (key === ":") {
      setMode("COMMAND");
      setCommandText("");
      bufferRef.current = "";
      trackUsage(":", ["mode:command"]);
      recordMacroKey(":");
      return;
    }

    bufferRef.current += key;
    let buf = bufferRef.current;

    if (buf === ".") {
      trackUsage(".", ["repeat"]);
      if (!lastEditRef.current) {
        bufferRef.current = "";
        return;
      }
      buf = lastEditRef.current;
      bufferRef.current = buf;
    }

    if (buf === "q") {
      awaitingMacroRegisterRef.current = true;
      bufferRef.current = "";
      return;
    }

    const macroReplayMatch = buf.match(/^(\d*)@([a-z@])$/);
    if (macroReplayMatch) {
      const count = macroReplayMatch[1] ? parseInt(macroReplayMatch[1], 10) : 1;
      const register = macroReplayMatch[2] === "@" ? lastMacroRegisterRef.current : macroReplayMatch[2];
      if (register) {
        replayMacro(register, count);
        lastMacroRegisterRef.current = register;
        trackUsage(buf, ["macro:replay", count > 1 ? "macro:counted" : "macro:single"]);
      }
      bufferRef.current = "";
      return;
    }

    if (buf === "n" || buf === "N") {
      const direction = buf === "n" ? 1 : -1;
      const found = findPattern(lastSearchRef.current, direction);
      if (found !== null) updateCursor(found);
      trackUsage(buf, ["search:next"]);
      recordMacroKey(buf);
      bufferRef.current = "";
      return;
    }
    
    // VISUAL MODE
    if (mode === "VISUAL_LINE") {
      if (buf === "d" || buf === "y" || buf === "x") {
        const start = Math.min(cursor.start, cursor.end);
        const end = Math.max(cursor.start, cursor.end);
        clipboardRef.current = text.slice(start, end);
        clipboardKindRef.current = "line";

        if (buf !== "y") {
          commitHistory(text.slice(0, start) + text.slice(end));
        }
        setMode("NORMAL");
        visualLineAnchorRef.current = null;
        visualLineFocusRef.current = null;
        updateCursor(start);
        trackUsage(buf, [
          "visual",
          "mode:visual-line",
          "line",
          buf === "y" ? "operator:y" : "operator:d",
          buf === "y" ? "yank" : "delete",
        ]);
        recordMacroKey(buf);
        bufferRef.current = "";
        return;
      }

      if (key === "j" || key === "k") {
        const lines = text.split("\n");
        const anchorLine = visualLineAnchorRef.current ?? getLineInfo(cursor.start).lineIndex;
        const focusLine = visualLineFocusRef.current ?? anchorLine;
        const nextFocus = key === "j"
          ? Math.min(lines.length - 1, focusLine + 1)
          : Math.max(0, focusLine - 1);
        setVisualLineSelection(anchorLine, nextFocus);
        trackUsage(key, ["visual", "mode:visual-line", ...getMotionActions(key)]);
        recordMacroKey(key);
        bufferRef.current = "";
      }
      bufferRef.current = "";
      return;
    }

    if (mode === "VISUAL") {
      if (buf === "d" || buf === "y" || buf === "x") {
        const start = Math.min(cursor.start, cursor.end);
        const end = Math.max(cursor.start, cursor.end);
        
        if (buf === "y") {
           clipboardRef.current = text.slice(start, end);
           clipboardKindRef.current = "char";
        } else {
           clipboardRef.current = text.slice(start, end);
           clipboardKindRef.current = "char";
           commitHistory(text.slice(0, start) + text.slice(end));
        }
        setMode("NORMAL");
        updateCursor(start);
        trackUsage(buf, [
          "visual",
          buf === "y" ? "operator:y" : "operator:d",
          buf === "y" ? "yank" : "delete",
        ]);
        recordMacroKey(buf);
        bufferRef.current = "";
        return;
      }

      const newPos = applyMotion(cursor.end, key, 1);
      if (newPos !== null) {
        setCursor({ start: cursor.start, end: newPos });
        trackUsage(key, ["visual", ...getMotionActions(key)]);
        recordMacroKey(key);
        bufferRef.current = "";
      }
      return;
    }

    // NORMAL MODE
    // Single immediate actions
    if (["i", "I", "a", "A", "o", "O", "v", "V", "p", "P", "u", "x", "X", "D", "C", "S", "Y"].includes(buf)) {
      if (buf === "i") {
        setMode("INSERT");
        trackUsage("i", ["mode:insert"]);
      } else if (buf === "I") {
        const info = getLineInfo(cursor.start);
        const firstNonBlank = info.text.search(/\S/);
        const insertAt = info.lineStart + (firstNonBlank === -1 ? 0 : firstNonBlank);
        setMode("INSERT");
        setInsertCursor(insertAt);
        trackUsage("I", ["mode:insert", "motion:0"]);
      } else if (buf === "a") {
        setMode("INSERT");
        setInsertCursor(cursor.start + 1);
        trackUsage("a", ["mode:insert"]);
      } else if (buf === "A") {
        const info = getLineInfo(cursor.start);
        setMode("INSERT");
        setInsertCursor(info.lineEnd);
        trackUsage("A", ["mode:insert", "motion:$"]);
      } else if (buf === "o" || buf === "O") {
        const info = getLineInfo(cursor.start);
        const insertAt = buf === "o" ? info.lineEnd : info.lineStart;
        const newText = text.slice(0, insertAt) + "\n" + text.slice(insertAt);
        commitHistory(newText);
        setMode("INSERT");
        setInsertCursor(buf === "o" ? insertAt + 1 : insertAt);
        lastEditRef.current = buf;
        trackUsage(buf, ["mode:insert", "line"]);
      } else if (buf === "v") {
        setMode("VISUAL");
        setCursor({ start: cursor.start, end: cursor.start + 1 });
        trackUsage("v", ["visual", "mode:visual"]);
      } else if (buf === "V") {
        setMode("VISUAL_LINE");
        const info = getLineInfo(cursor.start);
        setVisualLineSelection(info.lineIndex, info.lineIndex);
        trackUsage("V", ["visual", "mode:visual-line"]);
      } else if (buf === "p") {
        if (clipboardKindRef.current === "line") {
          pasteLinewiseBelow();
        } else {
          const paste = clipboardRef.current;
          const insertAt = cursor.start + 1;
          const newText = text.slice(0, insertAt) + paste + text.slice(insertAt);
          const newCursor = Math.max(0, insertAt + paste.length - 1);
          commitHistory(newText);
          setCursor({
            start: Math.min(newCursor, Math.max(0, newText.length - 1)),
            end: Math.min(newCursor, Math.max(0, newText.length - 1)),
          });
        }
        lastEditRef.current = "p";
        trackUsage("p", ["paste"]);
      } else if (buf === "P") {
        if (clipboardKindRef.current === "line") {
          pasteLinewiseAbove();
        } else {
          const paste = clipboardRef.current;
          const insertAt = cursor.start;
          const newText = text.slice(0, insertAt) + paste + text.slice(insertAt);
          const newCursor = Math.max(0, insertAt + paste.length - 1);
          commitHistory(newText);
          setCursor({
            start: Math.min(newCursor, Math.max(0, newText.length - 1)),
            end: Math.min(newCursor, Math.max(0, newText.length - 1)),
          });
        }
        lastEditRef.current = "P";
        trackUsage("P", ["paste"]);
      } else if (buf === "u") {
        if (historyLine.length > 1) {
          const newHistory = historyLine.slice(0, -1);
          const restoredText = newHistory[newHistory.length - 1];
          setHistoryLine(newHistory);
          setRedoLine(prev => [text, ...prev]);
          setText(restoredText);
          setCursor({
            start: Math.min(cursor.start, Math.max(0, restoredText.length - 1)),
            end: Math.min(cursor.start, Math.max(0, restoredText.length - 1)),
          });
        }
        trackUsage("u", ["undo"]);
      } else if (buf === "x") {
        const newText = text.slice(0, cursor.start) + text.slice(cursor.start + 1);
        clipboardRef.current = text[cursor.start] || "";
        clipboardKindRef.current = "char";
        commitHistory(newText);
        updateCursor(cursor.start);
        lastEditRef.current = "x";
        trackUsage("x", ["delete", "operator:d"]);
      } else if (buf === "X") {
        if (cursor.start > 0) {
          const deleteAt = cursor.start - 1;
          const newText = text.slice(0, deleteAt) + text.slice(cursor.start);
          clipboardRef.current = text[deleteAt] || "";
          clipboardKindRef.current = "char";
          commitHistory(newText);
          updateCursor(deleteAt);
          lastEditRef.current = "X";
        }
        trackUsage("X", ["delete", "operator:d"]);
      } else if (buf === "D") {
        const range = getMotionRange(cursor.start, "$", 1);
        if (range) {
          const { start, end } = range;
          clipboardRef.current = text.slice(start, end);
          clipboardKindRef.current = "char";
          commitHistory(text.slice(0, start) + text.slice(end));
          updateCursor(start);
          lastEditRef.current = "D";
          trackUsage("D", ["d$", "delete", "operator:d", ...getMotionActions("$")]);
        }
      } else if (buf === "C") {
        const range = getMotionRange(cursor.start, "$", 1);
        if (range) {
          const { start, end } = range;
          clipboardRef.current = text.slice(start, end);
          clipboardKindRef.current = "char";
          commitHistory(text.slice(0, start) + text.slice(end));
          setMode("INSERT");
          setInsertCursor(start);
          lastEditRef.current = "C";
          trackUsage("C", ["c$", "change", "operator:c", ...getMotionActions("$")]);
        }
      } else if (buf === "S") {
        const { start, end } = getLineRange(cursor.start, 1);
        clipboardRef.current = text.slice(start, end);
        clipboardKindRef.current = "line";
        commitHistory(text.slice(0, start) + text.slice(end));
        setMode("INSERT");
        setInsertCursor(start);
        lastEditRef.current = "S";
        trackUsage("S", ["cc", "change", "operator:c", "line", "line:single"]);
      } else if (buf === "Y") {
        const { start, end } = getLineRange(cursor.start, 1);
        clipboardRef.current = text.slice(start, end);
        clipboardKindRef.current = "line";
        trackUsage("Y", ["yy", "yank", "operator:y", "line", "line:single"]);
      }
      recordMacroKey(buf);
      bufferRef.current = "";
      return;
    }

    // Motions: e.g. w, b, j, k, $
    if (buf.match(/^([hjklwbe$0])$/)) {
      const newPos = applyMotion(cursor.start, buf, 1);
      if (newPos !== null) {
        updateCursor(newPos);
        trackUsage(buf, getMotionActions(buf));
        recordMacroKey(buf);
      }
      bufferRef.current = "";
      return;
    }

    // Motion with count
    const motionMatch = buf.match(/^(\d+)([hjklwbe$0])$/);
    if (motionMatch) {
      const count = parseInt(motionMatch[1], 10);
      const motion = motionMatch[2];
      const newPos = applyMotion(cursor.start, motion, count);
      if (newPos !== null) {
        updateCursor(newPos);
        trackUsage(buf, getMotionActions(motion, count));
        recordMacroKey(buf);
      }
      bufferRef.current = "";
      return;
    }

    // action + count + motion : e.g. d3w, y$ 
    const actionMotionMatch = buf.match(/^([dyvc])(\d*)([hjklwbe$0])$/);
    if (actionMotionMatch) {
      const action = actionMotionMatch[1];
      const count = actionMotionMatch[2] ? parseInt(actionMotionMatch[2], 10) : 1;
      const motion = actionMotionMatch[3];
      
      const range = getMotionRange(cursor.start, motion, count);
      if (range) {
        const { start, end } = range;

        if (action === "v") {
          setMode("VISUAL");
          setCursor({ start, end });
          trackUsage(buf, ["visual", ...getMotionActions(motion, count)]);
        } else {
          let actionStart = start;
          let actionEnd = end;
          const isLinewiseMotion = ["j", "k"].includes(motion);
          if (["j", "k"].includes(motion)) {
            const lineRange = getLineRangeByMotion(cursor.start, motion as "j" | "k", count);
            actionStart = lineRange.start;
            actionEnd = lineRange.end;
          }
          clipboardRef.current = text.slice(actionStart, actionEnd);
          clipboardKindRef.current = isLinewiseMotion ? "line" : "char";
          if (action === "d" || action === "c") {
            commitHistory(text.slice(0, actionStart) + text.slice(actionEnd));
            updateCursor(actionStart);
            lastEditRef.current = buf;
            if (action === "c") setMode("INSERT");
          }
          trackUsage(buf, [
            ...getOperatorActions(action, count),
            ...getMotionActions(motion, count),
            ...(isLinewiseMotion ? ["line", count > 1 ? "line:counted" : "line:single"] : []),
            action === "y" ? "yank" : action === "d" ? "delete" : "change",
          ]);
        }
        recordMacroKey(buf);
      }
      bufferRef.current = "";
      return;
    }

    // action + i/a + object : e.g. diw, vit, ya"
    const actionObjectMatch = buf.match(/^([dyvc])([ia])([w()"'t])$/);
    if (actionObjectMatch) {
      const action = actionObjectMatch[1];
      const modifier = actionObjectMatch[2] as "i" | "a";
      const obj = actionObjectMatch[3];
      
      const range = applyTextObject(cursor.start, modifier, obj);
      if (range) {
        const { start, end } = range;
        if (action === "v") {
          setMode("VISUAL");
          setCursor({ start, end });
          trackUsage(buf, ["visual", ...getTextObjectActions(obj)]);
        } else {
          clipboardRef.current = text.slice(start, end);
          clipboardKindRef.current = "char";
          if (action === "d" || action === "c") {
            commitHistory(text.slice(0, start) + text.slice(end));
            updateCursor(start);
            lastEditRef.current = buf;
            if (action === "c") setMode("INSERT");
          }
          trackUsage(buf, [
            ...getOperatorActions(action),
            ...getTextObjectActions(obj),
            action === "y" ? "yank" : action === "d" ? "delete" : "change",
          ]);
        }
        recordMacroKey(buf);
      }
      bufferRef.current = "";
      return;
    }

    // Two-key same-action e.g. dd, yy, cc
    const doubleMatch = buf.match(/^(\d*)([dyc])\2$/);
    if (doubleMatch) {
      const count = doubleMatch[1] ? parseInt(doubleMatch[1], 10) : 1;
      const action = doubleMatch[2];
      const { start, end } = getLineRange(cursor.start, count);
      clipboardRef.current = text.slice(start, end);
      clipboardKindRef.current = "line";
      
      if (action === "d" || action === "c") {
        commitHistory(text.slice(0, start) + text.slice(end));
        updateCursor(start);
        lastEditRef.current = buf;
        if (action === "c") setMode("INSERT");
      }
      trackUsage(buf, [
        ...getOperatorActions(action, count),
        "line",
        count > 1 ? "line:counted" : "line:single",
        action === "y" ? "yank" : action === "d" ? "delete" : "change",
      ]);
      recordMacroKey(buf);
      bufferRef.current = "";
      return;
    }

    // If buffer length is growing too long and doesn't match anything 
    // Wait... what if it's "d3" waiting for "w"?
    const partialMatch = /^(\d+)?(@)?([dyvc])?(\d+)?([ia])?([hjklwbe$0()"'t@])?$/.test(buf);
    if (!partialMatch && buf.length > 0) {
      bufferRef.current = ""; // Reset since it's an invalid phrase
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (mode === "INSERT") {
      setText(e.target.value);
      setCursor({ start: e.target.selectionStart, end: e.target.selectionEnd });
    }
  };
  
  const handleSelect = (e: any) => {
    if (mode === "INSERT" || mode === "NORMAL") {
      setCursor({ start: e.target.selectionStart, end: e.target.selectionEnd });
    }
  };

  return {
    text,
    mode,
    commandText,
    searchText,
    cursor,
    textareaRef,
    handleKeyDown,
    handleChange,
    handleSelect
  };
}
