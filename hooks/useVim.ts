import { useState, useRef, useEffect, KeyboardEvent, ChangeEvent } from "react";

export type VimMode = "NORMAL" | "INSERT" | "VISUAL" | "VISUAL_LINE" | "COMMAND";

export function useVim(initialText: string, onWq?: (finalText: string) => void, onQuit?: () => void) {
  const [text, setText] = useState(initialText);
  const [mode, setMode] = useState<VimMode>("NORMAL");
  const [commandText, setCommandText] = useState("");
  const [cursor, setCursor] = useState({ start: 0, end: 0 });
  const [historyLine, setHistoryLine] = useState<string[]>([]);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const bufferRef = useRef<string>("");
  const clipboardRef = useRef<string>("");

  useEffect(() => {
    setText(initialText);
    setHistoryLine([initialText]);
    setMode("NORMAL");
    setCursor({ start: 0, end: 0 });
    bufferRef.current = "";
  }, [initialText]);

  const commitHistory = (newText: string) => {
    setText(newText);
    setHistoryLine(prev => [...prev, newText]);
  };

  // Sync cursor visually
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.setSelectionRange(cursor.start, cursor.end);
    }
  }, [cursor, text]);

  const updateCursor = (pos: number) => {
    const safePos = Math.max(0, Math.min(pos, text.length));
    setCursor({ start: safePos, end: safePos });
  };

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

  const applyMotion = (pos: number, motion: string, count: number): number | null => {
    const MAX = text.length;
    let curr = pos;
    for (let c = 0; c < count; c++) {
      switch (motion) {
        case "h": curr = Math.max(0, curr - 1); break;
        case "l": curr = Math.min(MAX, curr + 1); break;
        case "j": {
          const info = getLineInfo(curr);
          const lines = text.split("\n");
          if (info.lineIndex + 1 < lines.length) {
            const nextLineStart = info.lineEnd + 1;
            const nextLineLen = lines[info.lineIndex + 1].length;
            curr = nextLineStart + Math.min(info.col, nextLineLen);
          }
          break;
        }
        case "k": {
          const info = getLineInfo(curr);
          const lines = text.split("\n");
          if (info.lineIndex - 1 >= 0) {
            const prevLine = lines[info.lineIndex - 1];
            const prevLineStart = info.lineStart - prevLine.length - 1;
            curr = prevLineStart + Math.min(info.col, prevLine.length);
          }
          break;
        }
        case "w": {
          // move to start of next word
          while (curr < MAX && /\w/.test(text[curr])) curr++; // skip current word
          while (curr < MAX && /\W/.test(text[curr]) && text[curr] !== '\n') curr++; // skip spaces
          break;
        }
        case "b": {
          curr = Math.max(0, curr - 1);
          while (curr > 0 && /\W/.test(text[curr]) && text[curr] !== '\n') curr--; // skip spaces
          while (curr > 0 && /\w/.test(text[curr - 1])) curr--; // go to word start
          break;
        }
        case "e": {
          curr = Math.min(MAX - 1, curr + 1);
          while (curr < MAX && /\W/.test(text[curr]) && text[curr] !== '\n') curr++;
          while (curr < MAX - 1 && /\w/.test(text[curr + 1])) curr++;
          break;
        }
        case "$": {
          const info = getLineInfo(curr);
          curr = info.lineEnd;
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
    return curr;
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

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    let key = e.key;

    if (mode === "COMMAND") {
      e.preventDefault();
      if (key === "Escape") {
        setMode("NORMAL");
        setCommandText("");
        return;
      }
      if (key === "Enter") {
        if (commandText === "wq" && onWq) {
          onWq(text);
        } else if (commandText === "q" || commandText === "q!") {
          if (onQuit) {
            onQuit();
          } else if (onWq) {
             onWq(initialText); // or cancel it out entirely without saving
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

    if (mode === "INSERT") {
      if (key === "Escape") {
        e.preventDefault();
        setMode("NORMAL");
        commitHistory(text); // commit the typed text change into history for undo
        updateCursor(Math.max(0, cursor.start - 1));
      }
      return;
    }

    e.preventDefault();

    if (key === "Escape") {
      bufferRef.current = "";
      setMode("NORMAL");
      updateCursor(cursor.start);
      return;
    }

    // Normal mode arrow mapping
    if (key === "ArrowLeft") key = "h";
    if (key === "ArrowDown") key = "j";
    if (key === "ArrowUp") key = "k";
    if (key === "ArrowRight") key = "l";

    // Ignore pure modifier keys
    if (["Shift", "Control", "Alt", "Meta", "CapsLock", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(key)) return;

    if (key === ":") {
      setMode("COMMAND");
      setCommandText("");
      bufferRef.current = "";
      return;
    }

    bufferRef.current += key;
    const buf = bufferRef.current;
    
    // VISUAL MODE
    if (mode === "VISUAL" || mode === "VISUAL_LINE") {
      if (buf === "d" || buf === "y" || buf === "x") {
        const start = Math.min(cursor.start, cursor.end);
        const end = Math.max(cursor.start, cursor.end);
        
        if (buf === "y") {
           clipboardRef.current = text.slice(start, end);
        } else {
           clipboardRef.current = text.slice(start, end);
           commitHistory(text.slice(0, start) + text.slice(end));
        }
        setMode("NORMAL");
        updateCursor(start);
        bufferRef.current = "";
        return;
      }

      const newPos = applyMotion(cursor.end, key, 1);
      if (newPos !== null) {
        setCursor({ start: cursor.start, end: newPos });
        bufferRef.current = "";
      }
      return;
    }

    // NORMAL MODE
    // Single immediate actions
    if (buf === "i" || buf === "a" || buf === "v" || buf === "V" || buf === "p" || buf === "u") {
      if (buf === "i") {
        setMode("INSERT");
      } else if (buf === "a") {
        setMode("INSERT");
        updateCursor(cursor.start + 1);
      } else if (buf === "v") {
        setMode("VISUAL");
        setCursor({ start: cursor.start, end: cursor.start + 1 });
      } else if (buf === "V") {
        setMode("VISUAL_LINE");
        const info = getLineInfo(cursor.start);
        setCursor({ start: info.lineStart, end: info.lineEnd });
      } else if (buf === "p") {
        const paste = clipboardRef.current;
        commitHistory(text.slice(0, cursor.start + 1) + paste + text.slice(cursor.start + 1));
        updateCursor(cursor.start + 1 + paste.length);
      } else if (buf === "u") {
        if (historyLine.length > 1) {
          const newHistory = historyLine.slice(0, -1);
          setHistoryLine(newHistory);
          setText(newHistory[newHistory.length - 1]);
        }
      }
      bufferRef.current = "";
      return;
    }

    // Motions: e.g. w, b, j, k, $
    if (buf.match(/^([hjklwbe$0])$/)) {
      const newPos = applyMotion(cursor.start, buf, 1);
      if (newPos !== null) updateCursor(newPos);
      bufferRef.current = "";
      return;
    }

    // Motion with count
    const motionMatch = buf.match(/^(\d+)([hjklwbe$0])$/);
    if (motionMatch) {
      const count = parseInt(motionMatch[1], 10);
      const motion = motionMatch[2];
      const newPos = applyMotion(cursor.start, motion, count);
      if (newPos !== null) updateCursor(newPos);
      bufferRef.current = "";
      return;
    }

    // action + count + motion : e.g. d3w, y$ 
    const actionMotionMatch = buf.match(/^([dyv])(\d*)([hjklwbe$0])$/);
    if (actionMotionMatch) {
      const action = actionMotionMatch[1];
      const count = actionMotionMatch[2] ? parseInt(actionMotionMatch[2], 10) : 1;
      const motion = actionMotionMatch[3];
      
      const newPos = applyMotion(cursor.start, motion, count);
      if (newPos !== null) {
        const start = Math.min(cursor.start, newPos);
        const end = Math.max(cursor.start, newPos);
        
        if (action === "v") {
          setMode("VISUAL");
          setCursor({ start, end });
        } else {
          clipboardRef.current = text.slice(start, end);
          if (action === "d") {
            commitHistory(text.slice(0, start) + text.slice(end));
            updateCursor(start);
          }
        }
      }
      bufferRef.current = "";
      return;
    }

    // action + i/a + object : e.g. diw, vit, ya"
    const actionObjectMatch = buf.match(/^([dyv])([ia])([w()"'t])$/);
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
        } else {
          clipboardRef.current = text.slice(start, end);
          if (action === "d") {
            commitHistory(text.slice(0, start) + text.slice(end));
            updateCursor(start);
          }
        }
      }
      bufferRef.current = "";
      return;
    }

    // Two-key same-action e.g. dd, yy
    const doubleMatch = buf.match(/^([dy])\1$/);
    if (doubleMatch) {
      const action = doubleMatch[1];
      const info = getLineInfo(cursor.start);
      // include the newline if possible
      const end = info.lineEnd + (text[info.lineEnd] === '\n' ? 1 : 0);
      clipboardRef.current = text.slice(info.lineStart, end);
      
      if (action === "d") {
        commitHistory(text.slice(0, info.lineStart) + text.slice(end));
        updateCursor(info.lineStart);
      }
      bufferRef.current = "";
      return;
    }

    // If buffer length is growing too long and doesn't match anything 
    // Wait... what if it's "d3" waiting for "w"?
    const partialMatch = /^[dyv]?\d*[ia]?[w()"'t]?$/.test(buf);
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
    cursor,
    textareaRef,
    handleKeyDown,
    handleChange,
    handleSelect
  };
}
