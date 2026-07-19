import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { ref, set, get, onValue, push, update } from 'firebase/database';

export interface StageData {
  currentStage: number;
  completedStages: string[];
  stageStars?: Record<string, number>;
  stageBestTimes?: Record<string, number>;
  stageSecretStars?: Record<string, boolean>;
  totalStages: number;
}

export interface PlayerData extends StageData {
  name: string;
  username: string;
  email: string;
  passwordHash?: string;
  joinedAt?: number;
  exempt?: boolean;
  exemptedAt?: number;
  lastActive: number;
}

export interface ActivityLog {
  time: number;
  player: string;
  msg: string;
}

const EXEMPT_AFTER_MS = 24 * 60 * 60 * 1000;

const sanitizeFirebaseKey = (value: string) => value.replace(/[.#$[\]]/g, '_');

const getJoinTime = (player: Partial<PlayerData>) => player.joinedAt || player.lastActive;

const getExemptionUpdates = (playerKey: string, player: Partial<PlayerData>, now = Date.now()) => {
  const joinedAt = getJoinTime(player);
  const updates: Record<string, any> = {};

  if (!player.joinedAt && joinedAt) {
    updates[`players/${playerKey}/joinedAt`] = joinedAt;
  }

  if (joinedAt && !player.exempt && now - joinedAt >= EXEMPT_AFTER_MS) {
    updates[`players/${playerKey}/exempt`] = true;
    updates[`players/${playerKey}/exemptedAt`] = now;
    updates[`exemptPlayers/${playerKey}`] = {
      username: player.username || player.name || playerKey,
      email: player.email || "",
      joinedAt,
      exemptedAt: now,
    };
  }

  return updates;
};

export function useFirebasePlayer(playerName: string | undefined) {
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);
  const [isFirebaseReady, setIsFirebaseReady] = useState(false);
  const [adminUnlockedStageLimit, setAdminUnlockedStageLimit] = useState<number>(0);
  const [vimGodStageTimes, setVimGodStageTimes] = useState<Record<string, number>>({});

  useEffect(() => {
    // Only proceed if API key environment variable is available and valid
    if (process.env.NEXT_PUBLIC_FIREBASE_API_KEY && process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== "AIzaSyDEMO_REPLACE_WITH_YOUR_KEY") {
      setIsFirebaseReady(true);
    }
  }, []);

  useEffect(() => {
    // Listen to admin unlock limits globally
    if (isFirebaseReady) {
      const configRef = ref(db, 'config/unlockedStageLimit');
      onValue(configRef, (snapshot) => {
        setAdminUnlockedStageLimit(snapshot.val() || 0);
      });
    }
  }, [isFirebaseReady]);

  useEffect(() => {
    if (!isFirebaseReady) return;

    const benchmarkRef = ref(db, 'players/vim_god/stageBestTimes');
    const unsubscribe = onValue(benchmarkRef, (snapshot) => {
      setVimGodStageTimes(snapshot.exists() ? snapshot.val() || {} : {});
    });

    return () => unsubscribe();
  }, [isFirebaseReady]);

  useEffect(() => {
    if (!isFirebaseReady || !playerName) {
      setPlayerData(null);
      return;
    }

    const sanitizedName = sanitizeFirebaseKey(playerName);
    const playerRef = ref(db, `players/${sanitizedName}`);
    const unsubscribe = onValue(playerRef, (snapshot) => {
      if (!snapshot.exists()) {
        setPlayerData(null);
        return;
      }

      const data = snapshot.val() as PlayerData;
      setPlayerData(data);

      const exemptionUpdates = getExemptionUpdates(sanitizedName, data);
      if (Object.keys(exemptionUpdates).length > 0) {
        update(ref(db), exemptionUpdates);
      }
    });

    return () => unsubscribe();
  }, [isFirebaseReady, playerName]);

  useEffect(() => {
    if (!isFirebaseReady || !playerName || !playerData || playerData.exempt) return;

    const sanitizedName = sanitizeFirebaseKey(playerName);
    const joinedAt = getJoinTime(playerData);
    if (!joinedAt) return;

    const delay = Math.max(0, joinedAt + EXEMPT_AFTER_MS - Date.now());
    const timer = window.setTimeout(() => {
      const exemptionUpdates = getExemptionUpdates(sanitizedName, playerData);
      if (Object.keys(exemptionUpdates).length > 0) {
        update(ref(db), exemptionUpdates);
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [isFirebaseReady, playerName, playerData]);

  // Save Progress
  const saveProgress = async (stageData: StageData) => {
    if (!isFirebaseReady || !playerName) return;
    
    // Clean player name to be a valid Firebase Realtime DB key
    const sanitizedName = sanitizeFirebaseKey(playerName);
    const playerRef = ref(db, `players/${sanitizedName}`);
    
    const data: Partial<PlayerData> = {
      name: playerName,
      username: playerName,
      joinedAt: playerData?.joinedAt || Date.now(),
      currentStage: stageData.currentStage,
      completedStages: stageData.completedStages,
      stageStars: stageData.stageStars || {},
      stageBestTimes: stageData.stageBestTimes || {},
      stageSecretStars: stageData.stageSecretStars || {},
      lastActive: Date.now(),
      totalStages: stageData.totalStages,
    };
    if (playerData?.exempt) {
      data.exempt = true;
      if (playerData.exemptedAt) data.exemptedAt = playerData.exemptedAt;
    }
    
    await update(playerRef, data);
  };

  // Load Progress
  const loadProgress = async (): Promise<PlayerData | null> => {
    if (!isFirebaseReady || !playerName) return null;
    
    const sanitizedName = sanitizeFirebaseKey(playerName);
    const snapshot = await get(ref(db, `players/${sanitizedName}`));
    
    if (snapshot.exists()) {
      const data = snapshot.val() as PlayerData;
      setPlayerData(data);
      return data;
    }
    return null;
  };

  const resetProgress = async (totalStages: number) => {
    if (!isFirebaseReady || !playerName) return;

    const sanitizedName = sanitizeFirebaseKey(playerName);
    await update(ref(db, `players/${sanitizedName}`), {
      currentStage: 0,
      completedStages: [],
      stageStars: {},
      stageBestTimes: {},
      stageSecretStars: {},
      totalStages,
      lastActive: Date.now(),
    });
  };

  // Log activity
  const logActivity = (msg: string) => {
    if (!isFirebaseReady || !playerName) return;
    
    const activityRef = ref(db, 'activity');
    push(activityRef, {
      time: Date.now(),
      player: playerName,
      msg,
    });
  };

  return { playerData, isFirebaseReady, adminUnlockedStageLimit, vimGodStageTimes, saveProgress, loadProgress, resetProgress, logActivity };
}

export function useAdminDashboard(isAdmin: boolean | undefined) {
  const [players, setPlayers] = useState<Record<string, PlayerData>>({});
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [unlockedStageLimit, setUnlockedStageLimit] = useState<number>(0);

  useEffect(() => {
    if (!isAdmin) return;

    // Listen to configs
    const configRef = ref(db, 'config/unlockedStageLimit');
    const unsubscribeConfig = onValue(configRef, (snapshot) => {
      setUnlockedStageLimit(snapshot.val() || 0);
    });

    // Listen to all players real-time
    const playersRef = ref(db, 'players');
    const unsubscribePlayers = onValue(playersRef, (snapshot) => {
      if (snapshot.exists()) {
        const nextPlayers = snapshot.val() as Record<string, PlayerData>;
        setPlayers(nextPlayers);

        const now = Date.now();
        const exemptionUpdates = Object.entries(nextPlayers).reduce<Record<string, any>>((updates, [playerKey, player]) => {
          return { ...updates, ...getExemptionUpdates(playerKey, player, now) };
        }, {});

        if (Object.keys(exemptionUpdates).length > 0) {
          update(ref(db), exemptionUpdates);
        }
      } else {
        setPlayers({});
      }
    });

    // Listen to activity log in real-time
    const activityRef = ref(db, 'activity');
    const unsubscribeActivity = onValue(activityRef, (snapshot) => {
      if (snapshot.exists()) {
        const rawList = snapshot.val() as Record<string, ActivityLog>;
        const logs = Object.values(rawList).sort((a,b) => b.time - a.time).slice(0, 20); // Top 20 latest
        setActivityLogs(logs);
      } else {
        setActivityLogs([]);
      }
    });

    return () => {
      unsubscribeConfig();
      unsubscribePlayers();
      unsubscribeActivity();
    };
  }, [isAdmin]);

  const setGlobalUnlockLimit = (limit: number) => {
    set(ref(db, 'config/unlockedStageLimit'), limit);
  };

  const deletePlayer = async (playerKey: string) => {
    if (!isAdmin || !playerKey) return;

    const playerSnapshot = await get(ref(db, `players/${playerKey}`));
    const player = playerSnapshot.exists() ? playerSnapshot.val() as Partial<PlayerData> : null;
    const updates: Record<string, null> = {
      [`players/${playerKey}`]: null,
    };

    if (player?.email) {
      updates[`playerEmails/${sanitizeFirebaseKey(player.email)}`] = null;
    }
    updates[`exemptPlayers/${playerKey}`] = null;

    await update(ref(db), updates);
  };

  return { players, activityLogs, unlockedStageLimit, setGlobalUnlockLimit, deletePlayer };
}

