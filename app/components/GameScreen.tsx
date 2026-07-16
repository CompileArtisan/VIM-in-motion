import { useState, useEffect, useRef } from "react";
import { LEVELS } from "../../lib/levels";
import { useVim } from "../../hooks/useVim";
import type { VimUsage } from "../../hooks/useVim";
import { useTerminal } from "../../hooks/useTerminalHook";

interface GameScreenProps {
  user: { name: string; isAdmin: boolean };
  currentStage: number;
  completedStages: string[];
  stageStars: Record<string, number>;
  stageBestTimes: Record<string, number>;
  benchmarkStageTimes: Record<string, number>;
  adminUnlockedStageLimit: number;
  onProgress: (
    newStage: number,
    completed: string[],
    stageStars?: Record<string, number>,
    stageBestTimes?: Record<string, number>
  ) => void;
  logActivity: (msg: string) => void;
  onLogout: () => void;
  onReset: () => void | Promise<void>;
}

const DEFAULT_STAR_TIME_LIMIT_SECONDS = 180;
const VIM_GOD_TIME_BONUS_SECONDS = 15;
const WINNER_STAR_ANIMATION_MS = 1800;
const WINNER_STAR_STAGGER_MS = 650;

export default function GameScreen({
  user,
  currentStage,
  completedStages,
  stageStars,
  stageBestTimes,
  benchmarkStageTimes,
  adminUnlockedStageLimit,
  onProgress,
  logActivity,
  onLogout,
  onReset
}: GameScreenProps) {
  const [feedback, setFeedback] = useState<{ type: 'success' | 'fail', msg: string } | null>(null);
  const [showWinner, setShowWinner] = useState(false);
  const [winnerAnimationSkipped, setWinnerAnimationSkipped] = useState(false);
  const [winnerSelectedAction, setWinnerSelectedAction] = useState<"retry" | "continue">("continue");
  const [lastAwardedStars, setLastAwardedStars] = useState(0);
  const [lastElapsedSeconds, setLastElapsedSeconds] = useState(0);
  const [scrollPosition, setScrollPosition] = useState({ scrollTop: 0, scrollLeft: 0 });
  const [showNoArrows, setShowNoArrows] = useState(false);
  const [openedReadme, setOpenedReadme] = useState<"README.md" | "README.org" | null>(null);
  const [terminalCursor, setTerminalCursor] = useState(0);
  const [levelStartedAt, setLevelStartedAt] = useState(Date.now());
  const [vimResetToken, setVimResetToken] = useState(0);
  const terminalInputRef = useRef<HTMLInputElement>(null);

  const readmeLevel = {
    id: "readme",
    title: openedReadme || "README",
    description: "Documentation file.",
    cheatsheet: [ {key: ":q", desc: "Quit editor"} ],
    task: "Read the documentation. Type <code>:q</code> and press Enter to return.",
    startText: openedReadme === "README.md" 
      ? `# VIM in Motion\n\n## Modes\n- It\`s a Modal text editor, where each mode changes what your keys do.\n- Your keys don\`t just type, they also serve as different ways of interacting with text through keybinds.\n- In VIM, there are 3 modes.\n### Normal Mode (default)\n- This is where you navigate and edit\n- Keys do actions, not typing\n### Insert Mode\n- This is where you actually type text\nPress \`Esc\` to go back to Normal mode`
      : `#+title: VIM in Motion\n\n* Modes\n- It\`s a Modal text editor, where each mode changes what your keys do.\n- Your keys don\`t just type, they also serve as different ways of interacting with text through keybinds.\n- In VIM, there are 3 modes.\n** Normal Mode (default)\n- This is where you navigate and edit\n- Keys do actions, not typing\n** Insert Mode\n- This is where you actually type text\nPress ~Esc~ to go back to Normal mode`,
    check: (text: string) => false, // No winning condition
    requiredActions: [],
    starTimeLimitSeconds: DEFAULT_STAR_TIME_LIMIT_SECONDS,
  };

  const level = openedReadme ? readmeLevel : LEVELS[currentStage];

  const handleCheck = (finalText: string, vimUsage: VimUsage) => {
    if (!level) return;

    if (openedReadme) {
      setIsTerminal(true);
      return;
    }

    const isPass = level.check(finalText);
    if (isPass) {
      const usedCommands = new Set([...vimUsage.commands, ...vimUsage.actions]);
      const missingActions = (level.requiredActions || []).filter(action => {
        return !action.matches.some(match => usedCommands.has(match));
      });

      const actionsPassed = missingActions.length === 0;
      const elapsedSeconds = Math.floor((Date.now() - levelStartedAt) / 1000);
      const benchmarkSeconds = benchmarkStageTimes[level.id];
      const timeLimitSeconds = Number.isFinite(benchmarkSeconds)
        ? Math.max(0, Math.floor(benchmarkSeconds)) + VIM_GOD_TIME_BONUS_SECONDS
        : (level.starTimeLimitSeconds || DEFAULT_STAR_TIME_LIMIT_SECONDS);
      const timePassed = elapsedSeconds <= timeLimitSeconds;
      const earnedStars = actionsPassed ? (timePassed ? 3 : 2) : 1;

      setFeedback({ type: "success", msg: "✓ Correct! Well done." });
      
      setFeedback({
        type: "success",
        msg: actionsPassed
          ? `Correct. ${earnedStars}/3 stars earned in ${elapsedSeconds}s.`
          : `Correct text. 1/3 stars earned. Missing actions for 2 stars: ${missingActions.map(action => action.label).join(", ")}.`,
      });

      const newCompleted = [...completedStages];
      if (!newCompleted.includes(level.id)) {
        newCompleted.push(level.id);
      }
      
      const bestStars = Math.max(stageStars[level.id] || 0, earnedStars);
      const newStageStars = { ...stageStars, [level.id]: bestStars };
      const previousBestTime = stageBestTimes[level.id];
      const bestTime = Number.isFinite(previousBestTime)
        ? Math.min(previousBestTime, elapsedSeconds)
        : elapsedSeconds;
      const newStageBestTimes = { ...stageBestTimes, [level.id]: bestTime };
      setLastAwardedStars(earnedStars);
      setLastElapsedSeconds(elapsedSeconds);
      setWinnerAnimationSkipped(false);
      setWinnerSelectedAction(earnedStars < 2 ? "retry" : "continue");
      
      logActivity(`completed Stage ${currentStage + 1}: ${level.title} (${earnedStars}/3 stars)`);
      onProgress(currentStage, newCompleted, newStageStars, newStageBestTimes);
      
      setTimeout(() => setShowWinner(true), 400);
    } else {
      setFeedback({ type: "fail", msg: "✗ Not quite — check the task description and try again." });
    }
  };

  // Initialize VIM Engine
  const vim = useVim(level ? level.startText : "", handleCheck, () => setIsTerminal(true), vimResetToken);

  // Initialize Terminal
  const {
    history,
    currentInput,
    setCurrentInput,
    cwd,
    isTerminal,
    setIsTerminal,
    handleTerminalKeyDown,
    autocompleteOptions,
    autocompleteIndex,
    awaitingResetConfirm,
  } = useTerminal(user, completedStages, adminUnlockedStageLimit, (filename) => {
    if (filename === "README.md" || filename === "README.org") {
      setOpenedReadme(filename);
    } else {
      setOpenedReadme(null);
      const stageIdMatch = filename.match(/stage-(\d+)\.level/);
      if (stageIdMatch) {
        const stageIndex = parseInt(stageIdMatch[1], 10) - 1;
        if (!isNaN(stageIndex) && stageIndex >= 0 && stageIndex < LEVELS.length) {
          onProgress(stageIndex, completedStages);
        }
      }
    }
  }, onReset);

  const syncTerminalCursor = (input: HTMLInputElement | null = terminalInputRef.current) => {
    if (!input) return;
    setTerminalCursor(input.selectionStart ?? input.value.length);
  };

  const handleTerminalKeyDownWithCursor = (e: React.KeyboardEvent<HTMLInputElement>) => {
    handleTerminalKeyDown(e);
    requestAnimationFrame(() => syncTerminalCursor());
  };

  const handleTerminalInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentInput(e.target.value);
    syncTerminalCursor(e.target);
  };

  const terminalCursorIndex = Math.min(terminalCursor, currentInput.length);
  const terminalInputBeforeCursor = currentInput.slice(0, terminalCursorIndex);
  const terminalCursorChar = currentInput[terminalCursorIndex] || "\u00a0";
  const terminalInputAfterCursor = currentInput.slice(terminalCursorIndex + 1);
  const currentBestStars = level && !openedReadme ? stageStars[level.id] || 0 : 0;
  const benchmarkTimeSeconds = level && !openedReadme ? benchmarkStageTimes[level.id] : undefined;
  const starTimeLimitSeconds = Number.isFinite(benchmarkTimeSeconds)
    ? Math.max(0, Math.floor(benchmarkTimeSeconds)) + VIM_GOD_TIME_BONUS_SECONDS
    : (level?.starTimeLimitSeconds || DEFAULT_STAR_TIME_LIMIT_SECONDS);
  const renderStars = (count: number) => "★".repeat(count) + "☆".repeat(3 - count);

  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    setScrollPosition({
      scrollTop: e.currentTarget.scrollTop,
      scrollLeft: e.currentTarget.scrollLeft 
    });
  };

  const handleKeyDownInterceptor = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Stage 2 onward arrow key blocking
    if (!openedReadme && currentStage >= 1 && vim.mode === "NORMAL" && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
      e.preventDefault();
      setShowNoArrows(true);
      setTimeout(() => setShowNoArrows(false), 2000);
      return; // Do not pass to vim
    }
    
    // Normal behaviour
    vim.handleKeyDown(e);
  };

  const renderVimOverlay = () => {
    if (vim.mode === "INSERT") return null;

    const text = vim.text;
    const curPos = vim.cursor.start;
    const start = Math.min(vim.cursor.start, vim.cursor.end);
    const end = Math.max(vim.cursor.start, vim.cursor.end);

    if (vim.mode === "NORMAL" || vim.mode === "COMMAND" || vim.mode === "SEARCH") {
      const before = text.slice(0, curPos);
      const char = text[curPos] || " ";
      const after = text.slice(curPos + 1);
      return (
        <>
          {before}
          {char === "\n" ? (
            <><span className="vim-cursor"> </span>{"\n"}</>
          ) : (
            <span className="vim-cursor">{char}</span>
          )}
          {after}
        </>
      );
    } else {
      // Visual modes
      const before = text.slice(0, start);
      const selectedBody = text.slice(start, end);
      const cursorChar = text[end] || " ";
      const after = text.slice(end + 1);

      return (
        <>
          {before}
          <span className="vim-selection">{selectedBody}</span>
          {cursorChar === "\n" ? (
            <><span className="vim-cursor"> </span>{"\n"}</>
          ) : (
            <span className="vim-cursor">{cursorChar}</span>
          )}
          {after}
        </>
      );
    }
  };

  // Reset editor when stage changes
  useEffect(() => {
    if (level) {
      setFeedback(null);
      if (!isTerminal && !openedReadme) {
        setLevelStartedAt(Date.now());
        setLastAwardedStars(0);
        setLastElapsedSeconds(0);
        setWinnerAnimationSkipped(false);
      }
      
      // Auto-focus editor on stage load
      if (vim.textareaRef.current && !isTerminal) {
        vim.textareaRef.current.focus();
      }
    }
  }, [currentStage, level, vim.textareaRef, isTerminal]);

  const handleDismissWinner = () => {
    setShowWinner(false);
    
    // Attempt to automatically go to the next stage, but respect locks
    const nextStage = currentStage + 1;
    if (nextStage < LEVELS.length) {
      const isNextAdminUnlocked = nextStage <= adminUnlockedStageLimit;
      const isNextPrevDone = completedStages.includes(LEVELS[nextStage - 1].id) || level?.id === LEVELS[nextStage - 1].id;
      
      if (isNextAdminUnlocked && isNextPrevDone) {
        onProgress(nextStage, completedStages);
      }
    }

    // After dismissing, return to the terminal
    setIsTerminal(true);
  };

  const handleRetryStage = () => {
    setShowWinner(false);
    setFeedback(null);
    setWinnerAnimationSkipped(false);
    setWinnerSelectedAction("continue");
    setLevelStartedAt(Date.now());
    setVimResetToken(prev => prev + 1);
    setIsTerminal(false);
    window.setTimeout(() => vim.textareaRef.current?.focus(), 0);
  };

  useEffect(() => {
    if (!showWinner) return;

    const handleWinnerKeyDown = (e: globalThis.KeyboardEvent) => {
      const hasRetry = lastAwardedStars < 2;
      if ((e.key === "ArrowLeft" || e.key === "ArrowRight") && hasRetry) {
        e.preventDefault();
        setWinnerSelectedAction(prev => prev === "retry" ? "continue" : "retry");
        return;
      }

      if (e.key !== "Enter") return;
      e.preventDefault();
      if (!winnerAnimationSkipped) {
        setWinnerAnimationSkipped(true);
        return;
      }

      if (hasRetry && winnerSelectedAction === "retry") {
        handleRetryStage();
      } else {
        handleDismissWinner();
      }
    };

    window.addEventListener("keydown", handleWinnerKeyDown);
    return () => window.removeEventListener("keydown", handleWinnerKeyDown);
  }, [showWinner, winnerAnimationSkipped, winnerSelectedAction, lastAwardedStars, currentStage, completedStages, adminUnlockedStageLimit, level]);

  useEffect(() => {
    if (!showWinner || winnerAnimationSkipped) return;

    const earnedStarCount = Math.max(1, lastAwardedStars);
    const animationMs = WINNER_STAR_ANIMATION_MS + (earnedStarCount - 1) * WINNER_STAR_STAGGER_MS + 100;
    const timer = window.setTimeout(() => {
      setWinnerAnimationSkipped(true);
    }, animationMs);

    return () => window.clearTimeout(timer);
  }, [showWinner, winnerAnimationSkipped, lastAwardedStars]);

  if (!level) return null;

  return (
    <div id="screen-game" className="screen active">
      <div className="game-header">
        <div className="logo-sm">VIM ▸ Motion</div>
        <div className="player-info">
          <span>playing as</span>
          <span className="player-name">{user.name}</span>
          <button className="btn-danger btn" onClick={onLogout} style={{padding:".3rem .6rem", fontSize:".65rem"}}>exit</button>
        </div>
      </div>

      <div className={`game-body ${isTerminal ? 'terminal-mode' : ''}`}>
        <div className={`no-arrows-popup ${showNoArrows ? 'show' : ''}`}>
           I said, no arrow keys!
        </div>
        
        {/* Main Area */}
        <div className="vim-area">
          {isTerminal ? (
            <div className="terminal-container" style={{ flex: 1, padding: "1rem", backgroundColor: "#1e1e1e", color: "#d4d4d4", fontFamily: "monospace", overflowY: "auto", display: "flex", flexDirection: "column" }}>
              {history.map((line, i) => {
                if (typeof line === "string" && line.includes("$ ")) {
                  const parts = line.split("$ ");
                  return (
                    <div key={i} style={{ display: "flex", alignItems: "center", minHeight: "1.5rem" }}>
                      <span style={{ marginRight: "0.5rem", color: "#4af626", fontSize: "1rem" }}>{parts[0]}$</span>
                      <span style={{ flex: 1, fontFamily: "inherit", fontSize: "1rem", whiteSpace: "pre-wrap" }}>{parts.slice(1).join("$ ")}</span>
                    </div>
                  );
                }
                return <div key={i} style={{ whiteSpace: "pre-wrap", fontSize: "1rem", minHeight: "1.5rem", display: "flex", alignItems: "center" }}>{line}</div>;
              })}
              <div style={{ display: "flex", alignItems: "center", minHeight: "1.5rem", position: "relative" }}>
                <span style={{ marginRight: "0.5rem", color: awaitingResetConfirm ? "#d4d4d4" : "#4af626", fontSize: "1rem" }}>
                  {awaitingResetConfirm ? "Continue? y/n:" : `${user?.name || "anonymous"}@vim-in-motion:${cwd}$`}
                </span>
                <div className="terminal-input-wrap">
                  <div className="terminal-input-display" aria-hidden="true">
                    <span>{terminalInputBeforeCursor}</span>
                    <span className="terminal-block-cursor">{terminalCursorChar}</span>
                    <span>{terminalInputAfterCursor}</span>
                  </div>
                  <input
                    ref={terminalInputRef}
                    className="terminal-input"
                    type="text"
                    value={currentInput}
                    onChange={handleTerminalInputChange}
                    onKeyDown={handleTerminalKeyDownWithCursor}
                    onKeyUp={(e) => syncTerminalCursor(e.currentTarget)}
                    onClick={(e) => syncTerminalCursor(e.currentTarget)}
                    onSelect={(e) => syncTerminalCursor(e.currentTarget)}
                    autoFocus
                    autoComplete="off"
                    spellCheck="false"
                  />
                </div>
                {autocompleteOptions.length > 0 && (
                  <div style={{
                    position: "absolute",
                    top: "100%",
                    left: `${currentInput.length * 0.6}rem`,
                    backgroundColor: "#252526",
                    border: "1px solid #4af626",
                    zIndex: 50,
                    padding: "0.2rem",
                    display: "flex",
                    flexDirection: "column",
                  }}>
                    {autocompleteOptions.map((opt, i) => (
                      <div
                        key={i}
                        style={{
                          padding: "0.2rem 0.5rem",
                          backgroundColor: i === autocompleteIndex ? "#4af626" : "transparent",
                          color: i === autocompleteIndex ? "#000" : "#d4d4d4",
                          cursor: "pointer",
                        }}
                      >
                        {opt}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              {!openedReadme && (
                <div className="stage-header">
                  <div className="stage-num">0{currentStage + 1}</div>
                  <div>
                    <div className="stage-title">{level.title}</div>
                    <div className="stage-desc" dangerouslySetInnerHTML={{ __html: level.description }}></div>
                  </div>
                </div>
              )}

              {openedReadme && (
                <div className="stage-header">
                  <div className="stage-title">{level.title}</div>
                  <div className="stage-desc" dangerouslySetInnerHTML={{ __html: level.description }}></div>
                </div>
              )}

              <div className="cheatsheet">
                <div className="cs-title">💡 Keys for this {openedReadme ? "file" : "stage"}</div>
                {level.cheatsheet.map((c, i) => (
                   <div key={i}><span className="key">{c.key}</span> — {c.desc}</div>
                ))}
              </div>

              {!openedReadme && (
                <div className="task-box">
                  <div className="task-label">Your Task</div>
                  <div className="task-goal" dangerouslySetInnerHTML={{ __html: level.task }}></div>
                  <div className="stage-score-row">
                    <span>Best: <span className="stage-stars">{renderStars(currentBestStars)}</span></span>
                    <span>3-star time: {starTimeLimitSeconds}s</span>
                  </div>
                  {feedback && (
                    <div className={`feedback ${feedback.type}`} style={{display: 'block'}}>
                      {feedback.msg}
                    </div>
                  )}
                </div>
              )}

              <div className="vim-editor-wrap" data-mode={vim.mode === "NORMAL" ? "NORMAL" : vim.mode === "COMMAND" ? ":" + vim.commandText : vim.mode === "SEARCH" ? "/" + vim.searchText : "-- " + vim.mode + " --"}>
                <div 
                  className="vim-editor-overlay"
                  style={{
                    transform: `translate(${-scrollPosition.scrollLeft}px, ${-scrollPosition.scrollTop}px)`,
                    marginBottom: `-${scrollPosition.scrollTop}px`, // prevent layout jump
                    display: vim.mode === 'INSERT' ? 'none' : 'block'
                  }}
                >
                  {renderVimOverlay()}
                </div>
                <textarea 
                  id="vim-editor" 
                  ref={vim.textareaRef}
                  spellCheck={false}
                  value={vim.text}
                  onChange={vim.handleChange}
                  onScroll={handleScroll}
                  onKeyDown={handleKeyDownInterceptor}
                  onSelect={vim.handleSelect}
                  onClick={vim.handleSelect}
                  onKeyUp={vim.handleSelect}
                  style={{
                    color: vim.mode !== "INSERT" ? "transparent" : "var(--text)",
                    caretColor: vim.mode !== "INSERT" ? "transparent" : "var(--accent)",
                  }}
                />
              </div>
            </>
          )}
        </div>

        {/* Sidebar */}
        {!isTerminal && (
          <div className="game-sidebar">
            <div className="sidebar-tab">
              <button className="tab-btn active">Reference</button>
            </div>
            
            <div className="tab-content active">
               <div className="ref-section">
                  <div className="ref-title">Modes</div>
                  <div className="ref-row"><span className="ref-key">i</span><span className="ref-desc">insert before cursor</span></div>
                  <div className="ref-row"><span className="ref-key">a</span><span className="ref-desc">insert after cursor</span></div>
                  <div className="ref-row"><span className="ref-key">Esc</span><span className="ref-desc">back to normal</span></div>
               </div>
               <div className="ref-section">
                  <div className="ref-title">Motions</div>
                  <div className="ref-row"><span className="ref-key">h j k l</span><span className="ref-desc">← ↓ ↑ →</span></div>
                  <div className="ref-row"><span className="ref-key">w / b</span><span className="ref-desc">word forward/back</span></div>
                  <div className="ref-row"><span className="ref-key">$ / 0</span><span className="ref-desc">end / start of line</span></div>
               </div>
               <div className="ref-section">
                  <div className="ref-title">Actions</div>
                  <div className="ref-row"><span className="ref-key">d / y / p</span><span className="ref-desc">delete / yank / paste</span></div>
                  <div className="ref-row"><span className="ref-key">u / .</span><span className="ref-desc">undo / repeat</span></div>
               </div>
               <div className="ref-section">
                  <div className="ref-title">Template</div>
                  <div className="ref-row"><span className="ref-key">action+count+mo</span><span className="ref-desc"></span></div>
               </div>
            </div>
          </div>
        )}
      </div>

      {/* Winner Modal */}
      {showWinner && (
        <div className={`winner-overlay show ${winnerAnimationSkipped ? "skip-stars" : ""}`}>
          <div className="winner-box">
            <div className="winner-title">{currentStage + 1 < LEVELS.length ? "🎉 Stage Clear!" : "🏆 All Done!"}</div>
            <div className="winner-sub">
              {currentStage + 1 < LEVELS.length 
                ? (currentStage + 1 <= adminUnlockedStageLimit 
                  ? `"${level.title}" complete. Ready for the next challenge?`
                  : `"${level.title}" complete. Waiting for Instructor to unlock the next stage...`)
                : "You've completed all stages. You're a VIM ninja! 🥷"}
            </div>
            <div className="winner-stars">
              <div className="winner-star-row" aria-label={`${lastAwardedStars} out of 3 stars`}>
                {[0, 1, 2].map(index => (
                  <span
                    key={index}
                    className="winner-star-slot"
                  >
                    <span className="winner-star-outline">{"\u2606"}</span>
                    {index < lastAwardedStars && (
                      <span
                        className="winner-star-fill"
                        style={{ animationDelay: `${index * WINNER_STAR_STAGGER_MS}ms` }}
                      >
                        {"\u2605"}
                      </span>
                    )}
                  </span>
                ))}
              </div>
              <span>{lastAwardedStars}/3 stars - {lastElapsedSeconds}s</span>
            </div>
            {lastAwardedStars < 2 ? (
              <div className="winner-actions">
                <button
                  className={`btn winner-action ${winnerSelectedAction === "retry" ? "selected" : ""}`}
                  onClick={handleRetryStage}
                  onMouseEnter={() => setWinnerSelectedAction("retry")}
                >
                  Retry
                </button>
                <button
                  className={`btn winner-action ${winnerSelectedAction === "continue" ? "selected" : ""}`}
                  onClick={handleDismissWinner}
                  onMouseEnter={() => setWinnerSelectedAction("continue")}
                >
                  Continue
                </button>
              </div>
            ) : (
              <button className="btn btn-primary" style={{marginTop:"1.5rem", width:"auto", padding:".6rem 2rem"}} onClick={handleDismissWinner}>
                {currentStage + 1 < LEVELS.length && currentStage + 1 > adminUnlockedStageLimit ? "Close" : "Continue"}
              </button>
            )}          </div>
        </div>
      )}
    </div>
  );
}


