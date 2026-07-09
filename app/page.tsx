"use client";
import React, { useState, useEffect } from "react";
import { LEVELS } from "../lib/levels";
import { useFirebasePlayer, useAdminDashboard } from "../hooks/useFirebase";
import { db } from "../lib/firebase";
import { ref, get, push, update } from "firebase/database";

// Sub-components to keep things relatively clean
import AdminDashboard from "./components/AdminDashboard";
import GameScreen from "./components/GameScreen";

const ADMIN_USERNAME = "instructor";
const ADMIN_PASSWORD = "vimworkshop2024";

interface User {
  name: string;
  username: string;
  email?: string;
  isAdmin: boolean;
}

const STUDENT_EMAIL_PATTERN = /^bl\.en\.u4[a-z0-9]{8}$/i;

const sanitizeFirebaseKey = (value: string) => value.replace(/[.#$[\]]/g, "_");

const logPlayerActivity = async (player: string, msg: string) => {
  await push(ref(db, "activity"), {
    time: Date.now(),
    player,
    msg,
  });
};

const sha256Fallback = (bytes: Uint8Array) => {
  const rightRotate = (value: number, amount: number) => (value >>> amount) | (value << (32 - amount));
  const k = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
  ];
  const h = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];
  const bitLength = bytes.length * 8;
  const paddedLength = (((bytes.length + 9 + 63) >> 6) << 6);
  const padded = new Uint8Array(paddedLength);
  padded.set(bytes);
  padded[bytes.length] = 0x80;
  const view = new DataView(padded.buffer);
  view.setUint32(paddedLength - 4, bitLength, false);

  for (let offset = 0; offset < paddedLength; offset += 64) {
    const w = new Array<number>(64);
    for (let i = 0; i < 16; i++) w[i] = view.getUint32(offset + i * 4, false);
    for (let i = 16; i < 64; i++) {
      const s0 = rightRotate(w[i - 15], 7) ^ rightRotate(w[i - 15], 18) ^ (w[i - 15] >>> 3);
      const s1 = rightRotate(w[i - 2], 17) ^ rightRotate(w[i - 2], 19) ^ (w[i - 2] >>> 10);
      w[i] = (w[i - 16] + s0 + w[i - 7] + s1) >>> 0;
    }

    let [a, b, c, d, e, f, g, hash] = h;
    for (let i = 0; i < 64; i++) {
      const s1 = rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25);
      const ch = (e & f) ^ (~e & g);
      const temp1 = (hash + s1 + ch + k[i] + w[i]) >>> 0;
      const s0 = rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22);
      const maj = (a & b) ^ (a & c) ^ (b & c);
      const temp2 = (s0 + maj) >>> 0;
      hash = g;
      g = f;
      f = e;
      e = (d + temp1) >>> 0;
      d = c;
      c = b;
      b = a;
      a = (temp1 + temp2) >>> 0;
    }

    h[0] = (h[0] + a) >>> 0;
    h[1] = (h[1] + b) >>> 0;
    h[2] = (h[2] + c) >>> 0;
    h[3] = (h[3] + d) >>> 0;
    h[4] = (h[4] + e) >>> 0;
    h[5] = (h[5] + f) >>> 0;
    h[6] = (h[6] + g) >>> 0;
    h[7] = (h[7] + hash) >>> 0;
  }

  return h.map(value => value.toString(16).padStart(8, "0")).join("");
};

const hashPassword = async (password: string) => {
  const bytes = new TextEncoder().encode(password);
  if (!globalThis.crypto?.subtle) return sha256Fallback(bytes);

  const digest = await globalThis.crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map(byte => byte.toString(16).padStart(2, "0"))
    .join("");
};

export default function Home() {
  const [screen, setScreen] = useState<"login" | "signup" | "admin-login" | "game" | "admin">("login");
  const [user, setUser] = useState<User | null>(null);
  
  // Game state
  const [currentStage, setCurrentStage] = useState(0);
  const [completedStages, setCompletedStages] = useState<string[]>([]);

  // Login inputs
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [signupError, setSignupError] = useState("");
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const [adminError, setAdminError] = useState("");

  const { isFirebaseReady, saveProgress, loadProgress, logActivity, adminUnlockedStageLimit } = useFirebasePlayer(user?.username || user?.name);
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
    const identifier = loginIdentifier.trim();
    const password = loginPassword;
    if (!identifier || !password) {
      setLoginError("Please enter your username/email and password");
      return;
    }
    if (!isFirebaseReady) {
      setLoginError("Firebase is not configured yet");
      return;
    }

    const playersSnapshot = await get(ref(db, "players"));
    const players = playersSnapshot.exists() ? playersSnapshot.val() as Record<string, any> : {};
    const normalizedIdentifier = identifier.toLowerCase();
    const player = Object.values(players).find((entry: any) => {
      return entry?.username?.toLowerCase() === normalizedIdentifier || entry?.email?.toLowerCase() === normalizedIdentifier;
    });

    if (!player || player.passwordHash !== await hashPassword(password)) {
      setLoginError("Invalid username/email or password");
      return;
    }

    const playerUsername = player.username || player.name;
    const playerKey = sanitizeFirebaseKey(playerUsername);
    await update(ref(db, `players/${playerKey}`), { lastActive: Date.now() });
    await logPlayerActivity(playerUsername, "logged in");

    setLoginError("");
    const newUser = {
      name: playerUsername,
      username: playerUsername,
      email: player.email,
      isAdmin: false,
    };
    setUser(newUser);
    localStorage.setItem("vim-session-user", JSON.stringify(newUser));

    setScreen("game");
  };

  const handleSignupPlayer = async () => {
    const username = signupUsername.trim();
    const email = signupEmail.trim().toLowerCase();
    const password = signupPassword;

    if (!username || !email || !password) {
      setSignupError("Please enter username, email, and password");
      return;
    }
    if (!/^[a-zA-Z0-9_-]{3,24}$/.test(username)) {
      setSignupError("Username must be 3-24 characters using letters, numbers, _ or -");
      return;
    }
    if (!STUDENT_EMAIL_PATTERN.test(email)) {
      setSignupError('Email must match "bl.en.u4xxxxxxxx"');
      return;
    }
    if (password.length < 6) {
      setSignupError("Password must be at least 6 characters");
      return;
    }
    if (!isFirebaseReady) {
      setSignupError("Firebase is not configured yet");
      return;
    }

    const playerKey = sanitizeFirebaseKey(username);
    const emailKey = sanitizeFirebaseKey(email);
    const playerRef = ref(db, `players/${playerKey}`);
    const emailRef = ref(db, `playerEmails/${emailKey}`);
    const existingUsername = await get(playerRef);
    if (existingUsername.exists()) {
      setSignupError("That username is already taken");
      return;
    }

    const existingEmail = await get(emailRef);
    const playersSnapshot = await get(ref(db, "players"));
    const players = playersSnapshot.exists() ? playersSnapshot.val() as Record<string, any> : {};
    const emailTaken = Object.values(players).some((entry: any) => entry?.email?.toLowerCase() === email);
    if (existingEmail.exists() || emailTaken) {
      setSignupError("That email is already registered");
      return;
    }

    const newUser = { name: username, username, email, isAdmin: false };
    const playerData = {
      name: username,
      username,
      email,
      passwordHash: await hashPassword(password),
      currentStage: 0,
      completedStages: [],
      totalStages: LEVELS.length,
      lastActive: Date.now(),
    };
    await update(ref(db), {
      [`players/${playerKey}`]: playerData,
      [`playerEmails/${emailKey}`]: username,
    });
    await logPlayerActivity(username, "created an account");

    setSignupError("");
    setUser(newUser);
    localStorage.setItem("vim-session-user", JSON.stringify(newUser));
    setScreen("game");
  };

  const handleLoginAdmin = () => {
    if (adminUsername.trim().toLowerCase() !== ADMIN_USERNAME || adminPass !== ADMIN_PASSWORD) {
      setAdminError("Incorrect admin username or password");
      return;
    }
    setAdminError("");
    const newUser = { name: "Instructor", username: ADMIN_USERNAME, isAdmin: true };
    setUser(newUser);
    localStorage.setItem("vim-session-user", JSON.stringify(newUser));
    setScreen("admin");
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentStage(0);
    setCompletedStages([]);
    setLoginIdentifier("");
    setLoginPassword("");
    setSignupUsername("");
    setSignupEmail("");
    setSignupPassword("");
    setAdminUsername("");
    setAdminPass("");
    setScreen("login");
    localStorage.removeItem("vim-session-user");
  };

  const handleReset = () => {
    localStorage.clear();
    setUser(null);
    setCurrentStage(0);
    setCompletedStages([]);
    setLoginIdentifier("");
    setLoginPassword("");
    setSignupUsername("");
    setSignupEmail("");
    setSignupPassword("");
    setLoginError("");
    setSignupError("");
    setAdminUsername("");
    setAdminPass("");
    setAdminError("");
    setScreen("login");
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
            <label>Username or Email</label>
            <input 
              type="text" 
              placeholder="ada_lovelace or bl.en.u4xxxxxxxx" 
              value={loginIdentifier}
              onChange={(e) => setLoginIdentifier(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLoginPlayer()}
            />
          </div>
          <div className="field-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="********"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLoginPlayer()}
            />
          </div>
          <button className="btn btn-primary" onClick={handleLoginPlayer}>Login -&gt;</button>
          {loginError && <div className="error-msg" style={{display: 'block'}}>{loginError}</div>}
          <div className="admin-toggle">
            <p>New to the workshop?</p>
            <button className="btn btn-ghost" onClick={() => setScreen("signup")}>Create Player Account</button>
          </div>
          <div className="admin-toggle">
            <p>Conducting the workshop?</p>
            <button className="btn btn-ghost" onClick={() => setScreen("admin-login")}>Instructor Login</button>
          </div>
        </div>
      </div>

      <div id="screen-signup" className={`screen ${screen === "signup" ? "active" : ""}`} style={{alignItems:"center", justifyContent:"center", padding:"2rem"}}>
        <div className="login-bg"></div>
        <div className="login-box">
          <div className="logo" style={{fontSize:"2.5rem"}}>Create <span>Player</span></div>
          <div className="tagline">// username - student email - password</div>
          <div className="field-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="e.g. ada_lovelace"
              value={signupUsername}
              onChange={(e) => setSignupUsername(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSignupPlayer()}
            />
          </div>
          <div className="field-group">
            <label>Email</label>
            <input
              type="text"
              placeholder="bl.en.u4xxxxxxxx"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSignupPlayer()}
            />
          </div>
          <div className="field-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="********"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSignupPlayer()}
            />
          </div>
          <button className="btn btn-primary" onClick={handleSignupPlayer}>Create Account -&gt;</button>
          {signupError && <div className="error-msg" style={{display: 'block'}}>{signupError}</div>}
          <div className="admin-toggle">
            <button className="btn btn-ghost" onClick={() => setScreen("login")}>&lt;- Back to Login</button>
          </div>
        </div>
      </div>

      <div id="screen-admin-login" className={`screen ${screen === "admin-login" ? "active" : ""}`} style={{alignItems:"center", justifyContent:"center", padding:"2rem"}}>
        <div className="login-box">
          <div className="logo" style={{fontSize:"2rem"}}>Instructor <span>Panel</span></div>
          <div className="tagline">// admin access only</div>
          <div className="field-group">
            <label>Admin Username</label>
            <input
              type="text"
              placeholder="instructor"
              value={adminUsername}
              onChange={(e) => setAdminUsername(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLoginAdmin()}
            />
          </div>
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
          onReset={handleReset}
        />
      )}

      {screen === "admin" && user && (
        <AdminDashboard 
          players={adminData.players} 
          activityLogs={adminData.activityLogs} 
          totalLevels={LEVELS.length} 
          unlockedStageLimit={adminData.unlockedStageLimit}
          setGlobalUnlockLimit={adminData.setGlobalUnlockLimit}
          deletePlayer={adminData.deletePlayer}
          onLogout={handleLogout} 
        />
      )}
    </>
  );
}
