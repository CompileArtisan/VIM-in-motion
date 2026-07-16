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
  lastActive: number;
}

export interface ActivityLog {
  time: number;
  player: string;
  msg: string;
}

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

    const sanitizedName = playerName.replace(/[.#$[\]]/g, '_');
    const playerRef = ref(db, `players/${sanitizedName}`);
    const unsubscribe = onValue(playerRef, (snapshot) => {
      setPlayerData(snapshot.exists() ? snapshot.val() as PlayerData : null);
    });

    return () => unsubscribe();
  }, [isFirebaseReady, playerName]);

  // Save Progress
  const saveProgress = async (stageData: StageData) => {
    if (!isFirebaseReady || !playerName) return;
    
    // Clean player name to be a valid Firebase Realtime DB key
    const sanitizedName = playerName.replace(/[.#$[\]]/g, '_');
    const playerRef = ref(db, `players/${sanitizedName}`);
    
    const data: Partial<PlayerData> = {
      name: playerName,
      username: playerName,
      currentStage: stageData.currentStage,
      completedStages: stageData.completedStages,
      stageStars: stageData.stageStars || {},
      stageBestTimes: stageData.stageBestTimes || {},
      stageSecretStars: stageData.stageSecretStars || {},
      lastActive: Date.now(),
      totalStages: stageData.totalStages,
    };
    
    await update(playerRef, data);
  };

  // Load Progress
  const loadProgress = async (): Promise<PlayerData | null> => {
    if (!isFirebaseReady || !playerName) return null;
    
    const sanitizedName = playerName.replace(/[.#$[\]]/g, '_');
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

    const sanitizedName = playerName.replace(/[.#$[\]]/g, '_');
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
        setPlayers(snapshot.val());
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
      updates[`playerEmails/${player.email.replace(/[.#$[\]]/g, '_')}`] = null;
    }

    await update(ref(db), updates);
  };

  return { players, activityLogs, unlockedStageLimit, setGlobalUnlockLimit, deletePlayer };
}
