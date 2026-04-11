import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { ref, set, get, onValue, push } from 'firebase/database';

export interface StageData {
  currentStage: number;
  completedStages: string[];
  totalStages: number;
}

export interface PlayerData extends StageData {
  name: string;
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

  // Save Progress
  const saveProgress = async (stageData: StageData) => {
    if (!isFirebaseReady || !playerName) return;
    
    // Clean player name to be a valid Firebase Realtime DB key
    const sanitizedName = playerName.replace(/[.#$[\]]/g, '_');
    const playerRef = ref(db, `players/${sanitizedName}`);
    
    const data: PlayerData = {
      name: playerName,
      currentStage: stageData.currentStage,
      completedStages: stageData.completedStages,
      lastActive: Date.now(),
      totalStages: stageData.totalStages,
    };
    
    await set(playerRef, data);
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

  return { playerData, isFirebaseReady, adminUnlockedStageLimit, saveProgress, loadProgress, logActivity };
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

  return { players, activityLogs, unlockedStageLimit, setGlobalUnlockLimit };
}
