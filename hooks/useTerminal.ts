import { useState, KeyboardEvent } from "react";

interface User {
  name: string;
  isAdmin: boolean;
}

const STAGES = Array.from({ length: 10 }, (_, i) => `stage-${i + 1}.level`);
const DIRS: Record<string, string[]> = {
  "~": ["README.md", "README.org", "levels/"],
  "~/levels": STAGES,
};

function resolvePath(currentCwd: string, target: string): string | null {
  if (!target || target === "~") return "~";
  
  // Clean up extra slashes
  target = target.replace(/\/+$/, "");

  if (target.startsWith("~/")) {
    return target;
  }

  if (currentCwd === "~") {
    if (target === "levels") return "~/levels";
    if (target === "levels/") return "~/levels";
    if (target === "README.md" || target === "README.org") return `~/${target}`;
    if (target.startsWith("levels/stage-") && target.endsWith(".level")) return `~/${target}`;
  }

  if (currentCwd === "~/levels") {
    if (target === "..") return "~";
    if (target === "../README.md" || target === "../README.org") return `~/${target.replace("../", "")}`;
    if (target.startsWith("stage-")) return `~/levels/${target}`;
  }

  // Handle explicit up directories from ~
  if (currentCwd === "~" && target === "..") {
    return "~"; // already at top for this simulation
  }

  return null;
}

export function useTerminal(
  user: User | null,
  completedStages: string[],
  onOpenFile?: (filename: string) => void
) {
  const [history, setHistory] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState<string>("");
  const [cwd, setCwd] = useState<string>("~");
  const [isTerminal, setIsTerminal] = useState<boolean>(true);
  const [autocompleteOptions, setAutocompleteOptions] = useState<string[]>([]);
  const [autocompleteIndex, setAutocompleteIndex] = useState<number>(0);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  const handleTerminalKeyDown = (
    e: KeyboardEvent<HTMLInputElement> | KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (autocompleteOptions.length > 0) {
      if (e.key === "Tab" || e.key === "ArrowDown") {
        e.preventDefault();
        setAutocompleteIndex((prev) => (prev + 1) % autocompleteOptions.length);
        return;
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setAutocompleteIndex((prev) => (prev - 1 + autocompleteOptions.length) % autocompleteOptions.length);
        return;
      } else if (e.key === "Enter") {
        e.preventDefault();
        const parts = currentInput.split(" ");
        parts[parts.length - 1] = autocompleteOptions[autocompleteIndex];
        setCurrentInput(parts.join(" "));
        setAutocompleteOptions([]);
        return;
      } else if (e.key === "Escape") {
        e.preventDefault();
        setAutocompleteOptions([]);
        return;
      } else {
        // Any other key just dismisses the box and continues typing
        setAutocompleteOptions([]);
      }
    }

    if (e.key === "Tab") {
      e.preventDefault();
      const parts = currentInput.split(" ");
      const currentWord = parts[parts.length - 1];
      
      let matches: string[] = [];
      if (parts.length === 1) {
        // Command completion
        const commands = ["ls", "cd", "cat", "vim", "clear", "sudo", "help", "mkdir"];
        matches = commands.filter(cmd => cmd.startsWith(currentWord));
      } else {
        // File completions based on cwd
        const availableFiles = DIRS[cwd] || [];
        matches = availableFiles.filter(f => f.startsWith(currentWord));
      }

      if (matches.length === 1) {
        // Auto-complete immediately if only 1 match
        parts[parts.length - 1] = matches[0];
        setCurrentInput(parts.join(" "));
      } else if (matches.length > 1) {
        setAutocompleteOptions(matches);
        setAutocompleteIndex(0);
      }
      return;
    }

    if (e.key === "ArrowUp" && autocompleteOptions.length === 0) {
      e.preventDefault();
      if (commandHistory.length > 0) {
        let nextIndex = historyIndex;
        if (historyIndex === -1) {
          nextIndex = commandHistory.length - 1;
        } else if (historyIndex > 0) {
          nextIndex = historyIndex - 1;
        }
        setHistoryIndex(nextIndex);
        setCurrentInput(commandHistory[nextIndex]);
      }
      return;
    }

    if (e.key === "ArrowDown" && autocompleteOptions.length === 0) {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIndex = historyIndex + 1;
        if (nextIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentInput("");
        } else {
          setHistoryIndex(nextIndex);
          setCurrentInput(commandHistory[nextIndex]);
        }
      }
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      
      const command = currentInput.trim();
      if (command) {
        setCommandHistory((prev) => [...prev, command]);
      }
      setHistoryIndex(-1);

      const newHistory = [...history, `${user?.name || "anonymous"}@vim-in-motion:${cwd}$ ${command}`];
      
      if (!command) {
        setHistory(newHistory);
        setCurrentInput("");
        return;
      }

      const args = command.split(" ");
      const baseCmd = args[0];

      switch (baseCmd) {
        case "ls":
          const files = DIRS[cwd] || [];
          newHistory.push(files.join("   "));
          break;
        case "cd":
          const cdTarget = args[1];
          if (!cdTarget || cdTarget === "~") {
            setCwd("~");
          } else {
            const resolvedDir = resolvePath(cwd, cdTarget);
            if (resolvedDir && DIRS[resolvedDir]) {
              setCwd(resolvedDir);
            } else if (resolvedDir === "~" || resolvedDir === "~/levels") {
               setCwd(resolvedDir);
            } else {
              newHistory.push(`cd: ${cdTarget}: No such file or directory`);
            }
          }
          break;
        case "mkdir":
          newHistory.push("mkdir: Permission denied.");
          break;
        case "sudo":
          if (user?.isAdmin) {
            newHistory.push("Superuser access granted.");
          } else {
            newHistory.push(`User ${user?.name || "anonymous"} is not in the sudoers file. This incident will be reported.`);
          }
          break;
        case "cat":
          const catTarget = args[1];
          if (!catTarget) {
            newHistory.push("cat: missing filename");
          } else {
            const resolvedPath = resolvePath(cwd, catTarget);
            if (resolvedPath === "~/README.md" || resolvedPath === "~/README.org") {
              newHistory.push(
                "#+title: VIM in Motion",
                "",
                "* Modes",
                "- It`s a Modal text editor, where each mode changes what your keys do.",
                "- Your keys don`t just type, they also serve as different ways of interacting with text through keybinds.",
                "- In VIM, there are 3 modes.",
                "** Normal Mode (default)",
                "- This is where you navigate and edit",
                "- Keys do actions, not typing",
                "** Insert Mode",
                "- This is where you actually type text",
                "Press ~Esc~ to go back to Normal mode"
              );
            } else {
              newHistory.push(`cat: ${catTarget}: No such file or directory`);
            }
          }
          break;
        case "clear":
          setHistory([]);
          setCurrentInput("");
          return;
        case "help":
          newHistory.push(
            "Available commands:",
            "  ls     - List directory contents",
            "  cd     - Change directory",
            "  cat    - Print file contents",
            "  vim    - Edit a file (e.g., vim stage-1.level)",
            "  clear  - Clear terminal output",
            "  sudo   - Execute a command as superuser",
            "  help   - Show this help message"
          );
          break;
        case "vim":
          const vimTarget = args[1];
          if (!vimTarget) {
            newHistory.push("vim: missing filename");
          } else {
            const resolvedPath = resolvePath(cwd, vimTarget);
            if (resolvedPath === "~/README.md" || resolvedPath === "~/README.org") {
              newHistory.push(`Opening ${vimTarget}...`);
              if (onOpenFile) {
                onOpenFile(resolvedPath.replace("~/", ""));
              }
              setIsTerminal(false);
            } else if (resolvedPath && resolvedPath.startsWith("~/levels/stage-")) {
              newHistory.push(`Opening ${vimTarget}...`);
              if (onOpenFile) {
                const stageIdMatch = resolvedPath.match(/stage-(\d+)\.level/);
                if (stageIdMatch) {
                  onOpenFile(`stage-${stageIdMatch[1]}.level`);
                } else {
                  // Fallback
                  const targetMatch = vimTarget.match(/stage-(\d+)\.level/);
                  onOpenFile(targetMatch ? `stage-${targetMatch[1]}.level` : vimTarget);
                }
              }
              setIsTerminal(false);
            } else {
              newHistory.push(`vim: ${vimTarget}: File not found or access denied.`);
            }
          }
          break;
        default:
          newHistory.push(`bash: ${baseCmd}: command not found`);
          break;
      }

      setHistory(newHistory);
      setCurrentInput("");
    }
  };

  return {
    history,
    setHistory,
    currentInput,
    setCurrentInput,
    cwd,
    setCwd,
    isTerminal,
    setIsTerminal,
    handleTerminalKeyDown,
    autocompleteOptions,
    autocompleteIndex,
    commandHistory,
    historyIndex
  };
}

