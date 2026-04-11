import { useState, useEffect } from "react";
import { LEVELS } from "../../lib/levels";
import { useVim } from "../../hooks/useVim";
import { useTerminal } from "../../hooks/useTerminal";

interface GameScreenProps {
  user: { name: string; isAdmin: boolean };
  currentStage: number;
  completedStages: string[];
  adminUnlockedStageLimit: number;
  onProgress: (newStage: number, completed: string[]) => void;
  logActivity: (msg: string) => void;
  onLogout: () => void;
}

export default function GameScreen({ user, currentStage, completedStages, adminUnlockedStageLimit, onProgress, logActivity, onLogout }: GameScreenProps) {
  const [feedback, setFeedback] = useState<{ type: 'success' | 'fail', msg: string } | null>(null);
  const [showWinner, setShowWinner] = useState(false);
  const [scrollPosition, setScrollPosition] = useState({ scrollTop: 0, scrollLeft: 0 });
  const [showNoArrows, setShowNoArrows] = useState(false);
  const [openedReadme, setOpenedReadme] = useState<"README.md" | "README.org" | null>(null);

  const readmeLevel = {
    id: "readme",
    title: openedReadme || "README",
    description: "Documentation file.",
    cheatsheet: [ {key: ":q", desc: "Quit editor"} ],
    task: "Read the documentation. Type <code>:q</code> and press Enter to return.",
    startText: `#+title: VIM in Motion\n\n* Modes\n- It\`s a Modal text editor, where each mode changes what your keys do.\n- Your keys don\`t just type, they also serve as different ways of interacting with text through keybinds.\n- In VIM, there are 3 modes.\n** Normal Mode (default)\n- This is where you navigate and edit\n- Keys do actions, not typing\n** Insert Mode\n- This is where you actually type text\nPress ~Esc~ to go back to Normal mode`,
    check: (text: string) => false, // No winning condition
  };

  const level = openedReadme ? readmeLevel : LEVELS[currentStage];

  const handleCheck = (finalText: string) => {
    if (!level) return;

    if (openedReadme) {
      setIsTerminal(true);
      return;
    }

    const isPass = level.check(finalText);
    if (isPass) {
      setFeedback({ type: "success", msg: "✓ Correct! Well done." });
      
      const newCompleted = [...completedStages];
      if (!newCompleted.includes(level.id)) {
        newCompleted.push(level.id);
      }
      
      logActivity(`completed Stage ${currentStage + 1}: ${level.title}`);
      onProgress(currentStage, newCompleted);
      
      setTimeout(() => setShowWinner(true), 400);
    } else {
      setFeedback({ type: "fail", msg: "✗ Not quite — check the task description and try again." });
    }
  };

  // Initialize VIM Engine
  const vim = useVim(level ? level.startText : "", handleCheck, () => setIsTerminal(true));

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
  } = useTerminal(user, completedStages, (filename) => {
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
  });

  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    setScrollPosition({
      scrollTop: e.currentTarget.scrollTop,
      scrollLeft: e.currentTarget.scrollLeft 
    });
  };

  const handleKeyDownInterceptor = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Stage 2 (index 1) arrow key blocking
    if (currentStage === 1 && vim.mode === "NORMAL" && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
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

    if (vim.mode === "NORMAL") {
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
                if (line.includes("$ ")) {
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
                <span style={{ marginRight: "0.5rem", color: "#4af626", fontSize: "1rem" }}>{user?.name || "anonymous"}@vim-in-motion:{cwd}$</span>
                <input
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyDown={handleTerminalKeyDown}
                  style={{ background: "transparent", color: "inherit", border: "none", outline: "none", flex: 1, fontFamily: "inherit", fontSize: "1rem", padding: 0, margin: 0 }}
                  autoFocus
                  autoComplete="off"
                  spellCheck="false"
                />
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
                  {feedback && (
                    <div className={`feedback ${feedback.type}`} style={{display: 'block'}}>
                      {feedback.msg}
                    </div>
                  )}
                </div>
              )}

              <div className="vim-editor-wrap" data-mode={vim.mode === "NORMAL" ? "NORMAL" : vim.mode === "COMMAND" ? ":" + vim.commandText : "-- " + vim.mode + " --"}>
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
        <div className="winner-overlay show">
          <div className="winner-box">
            <div className="winner-title">{currentStage + 1 < LEVELS.length ? "🎉 Stage Clear!" : "🏆 All Done!"}</div>
            <div className="winner-sub">
              {currentStage + 1 < LEVELS.length 
                ? (currentStage + 1 <= adminUnlockedStageLimit 
                  ? `"${level.title}" complete. Ready for the next challenge?`
                  : `"${level.title}" complete. Waiting for Instructor to unlock the next stage...`)
                : "You've completed all stages. You're a VIM ninja! 🥷"}
            </div>
            <button className="btn btn-primary" style={{marginTop:"1.5rem", width:"auto", padding:".6rem 2rem"}} onClick={handleDismissWinner}>
              {currentStage + 1 < LEVELS.length && currentStage + 1 > adminUnlockedStageLimit ? "Close" : "Continue →"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
