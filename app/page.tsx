"use client";
import React, { useState, useEffect } from "react";
import { LEVELS } from "../lib/levels";
import { useFirebasePlayer, useAdminDashboard } from "../hooks/useFirebase";

// Sub-components to keep things relatively clean
import AdminDashboard from "./components/AdminDashboard";
import GameScreen from "./components/GameScreen";

const ADMIN_PASSWORD = "vimworkshop2024";

interface User {
  name: string;
  isAdmin: boolean;
}

export default function Home() {
  const [screen, setScreen] = useState<"login" | "admin-login" | "game" | "admin">("login");
  const [user, setUser] = useState<User | null>(null);
  
  // Game state
  const [currentStage, setCurrentStage] = useState(0);
  const [completedStages, setCompletedStages] = useState<string[]>([]);

  // Login inputs
  const [loginName, setLoginName] = useState("");
  const [loginError, setLoginError] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const [adminError, setAdminError] = useState("");

  const { isFirebaseReady, saveProgress, loadProgress, logActivity, adminUnlockedStageLimit } = useFirebasePlayer(user?.name);
  const adminData = useAdminDashboard(user?.isAdmin);

  // Restore session
  useEffect(() => {
    const savedUser = localStorage.getItem("vim-session-user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      if (parsedUser.isAdmin) {
        setScreen("admin");
      } else {
        setScreen("game");
      }
    }
  }, []);

  // --- Handlers ---
  const handleLoginPlayer = async () => {
    const name = loginName.trim();
    if (!name) {
      setLoginError("Please enter your name");
      return;
    }
    setLoginError("");
    const newUser = { name, isAdmin: false };
    setUser(newUser);
    localStorage.setItem("vim-session-user", JSON.stringify(newUser));

    setScreen("game");
  };

  const handleLoginAdmin = () => {
    if (adminPass !== ADMIN_PASSWORD) {
      setAdminError("Incorrect password");
      return;
    }
    setAdminError("");
    const newUser = { name: "Instructor", isAdmin: true };
    setUser(newUser);
    localStorage.setItem("vim-session-user", JSON.stringify(newUser));
    setScreen("admin");
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentStage(0);
    setCompletedStages([]);
    setLoginName("");
    setAdminPass("");
    setScreen("login");
    localStorage.removeItem("vim-session-user");
  };

  // Automatically wrap load progress on user set
  useEffect(() => {
    if (user && !user.isAdmin && isFirebaseReady) {
      loadProgress().then((saved) => {
        if (saved) {
          setCurrentStage(saved.currentStage || 0);
          setCompletedStages(saved.completedStages || []);
        } else {
          // Initialize new game progress
           saveProgress({ currentStage: 0, completedStages: [], totalStages: LEVELS.length });
           logActivity("joined the workshop");
        }
      });
    }
  }, [user, isFirebaseReady]);

  // Sync state upward when game ticks
  const onGameProgress = (newStage: number, newCompleted: string[]) => {
    setCurrentStage(newStage);
    setCompletedStages(newCompleted);
    saveProgress({ currentStage: newStage, completedStages: newCompleted, totalStages: LEVELS.length });
  };

  return (
    <>
      <div id="screen-login" className={`screen ${screen === "login" ? "active" : ""}`}>
        <div className="login-bg"></div>
        <div className="login-box">
          <div className="logo">VIM <span>in</span> Motion</div>
          <div className="tagline">// workshop · learn by doing</div>
          <div className="field-group">
            <label>Your Name</label>
            <input 
              type="text" 
              placeholder="e.g. ada_lovelace" 
              value={loginName}
              onChange={(e) => setLoginName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLoginPlayer()}
            />
          </div>
          <button className="btn btn-primary" onClick={handleLoginPlayer}>Join Workshop →</button>
          {loginError && <div className="error-msg" style={{display: 'block'}}>{loginError}</div>}
          <div className="admin-toggle">
            <p>Conducting the workshop?</p>
            <button className="btn btn-ghost" onClick={() => setScreen("admin-login")}>Instructor Login</button>
          </div>
        </div>
      </div>

      <div id="screen-admin-login" className={`screen ${screen === "admin-login" ? "active" : ""}`} style={{alignItems:"center", justifyContent:"center", padding:"2rem"}}>
        <div className="login-box">
          <div className="logo" style={{fontSize:"2rem"}}>Instructor <span>Panel</span></div>
          <div className="tagline">// admin access only</div>
          <div className="field-group">
            <label>Admin Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={adminPass}
              onChange={(e) => setAdminPass(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLoginAdmin()}
            />
          </div>
          <button className="btn btn-primary" onClick={handleLoginAdmin}>Enter Dashboard →</button>
          {adminError && <div className="error-msg" style={{display: 'block'}}>{adminError}</div>}
          <div className="admin-toggle">
            <button className="btn btn-ghost" onClick={() => setScreen("login")}>← Back</button>
          </div>
        </div>
      </div>

      {screen === "game" && user && (
        <GameScreen 
          user={user} 
          currentStage={currentStage} 
          completedStages={completedStages} 
          adminUnlockedStageLimit={adminUnlockedStageLimit}
          onProgress={onGameProgress}
          logActivity={logActivity}
          onLogout={handleLogout} 
        />
      )}

      {screen === "admin" && user && (
        <AdminDashboard 
          players={adminData.players} 
          activityLogs={adminData.activityLogs} 
          totalLevels={LEVELS.length} 
          unlockedStageLimit={adminData.unlockedStageLimit}
          setGlobalUnlockLimit={adminData.setGlobalUnlockLimit}
          onLogout={handleLogout} 
        />
      )}
    </>
  );
}
