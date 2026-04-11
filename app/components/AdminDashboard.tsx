import { useMemo } from 'react';
import type { PlayerData, ActivityLog } from '../../hooks/useFirebase';

interface AdminDashboardProps {
  players: Record<string, PlayerData>;
  activityLogs: ActivityLog[];
  totalLevels: number;
  unlockedStageLimit: number;
  setGlobalUnlockLimit: (limit: number) => void;
  onLogout: () => void;
}

export default function AdminDashboard({ players, activityLogs, totalLevels, unlockedStageLimit, setGlobalUnlockLimit, onLogout }: AdminDashboardProps) {
  const timeAgo = (ts: number) => {
    const diff = Math.floor((Date.now() - ts) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff/60)}m ago`;
    return `${Math.floor(diff/3600)}h ago`;
  };

  const fiveMinAgo = Date.now() - 5 * 60 * 1000;
  
  const playersList = useMemo(() => {
    return Object.values(players || {}).sort((a,b) => (b.completedStages?.length || 0) - (a.completedStages?.length || 0));
  }, [players]);

  const activePlayers = playersList.filter(p => p.lastActive > fiveMinAgo).length;
  const completedPlayers = playersList.filter(p => p.completedStages?.length === totalLevels).length;

  return (
    <div id="screen-admin" className="screen active">
      <div className="admin-header">
        <div className="admin-logo">VIM in Motion <span>// Instructor</span></div>
        <div style={{display:"flex", gap:".75rem", alignItems:"center"}}>
          <button className="btn btn-danger" onClick={onLogout}>Logout</button>
        </div>
      </div>
      
      <div className="admin-body">
        <div className="admin-sidebar" style={{overflowY: "auto"}}>
          <div className="admin-sidebar-title">Players Online</div>
          <div id="admin-player-list">
            {playersList.length === 0 ? <div style={{color:"var(--muted)", fontSize:".75rem"}}>No players yet...</div> : null}
            {playersList.map(p => {
              const active = p.lastActive > fiveMinAgo;
              const stageNum = (p.currentStage || 0) + 1;
              return (
                <div key={p.name} className="player-card">
                  <div className="pc-name">{active && <span className="online-dot"></span>}{p.name}</div>
                  <div className="pc-meta">{p.completedStages?.length || 0}/{totalLevels} stages done</div>
                  <div className="pc-stage">S{stageNum}</div>
                </div>
              )
            })}
          </div>
        </div>
        
        <div className="admin-main">
          <div className="admin-stats">
            <div className="stat-box">
              <div className="stat-val">{playersList.length}</div>
              <div className="stat-label">Players Joined</div>
            </div>
            <div className="stat-box">
              <div className="stat-val">{activePlayers}</div>
              <div className="stat-label">Active Now</div>
            </div>
            <div className="stat-box">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button 
                  className="btn btn-ghost" 
                  disabled={unlockedStageLimit <= 0}
                  onClick={() => setGlobalUnlockLimit(Math.max(0, unlockedStageLimit - 1))}
                  style={{ padding: "0.2rem 0.5rem", minWidth: "30px" }}
                >-</button>
                <div className="stat-val">{unlockedStageLimit + 1}</div>
                <button 
                  className="btn btn-ghost" 
                  disabled={unlockedStageLimit >= totalLevels - 1}
                  onClick={() => setGlobalUnlockLimit(Math.min(totalLevels - 1, unlockedStageLimit + 1))}
                  style={{ padding: "0.2rem 0.5rem", minWidth: "30px" }}
                >+</button>
              </div>
              <div className="stat-label">Max Stage Unlocked</div>
            </div>
            <div className="stat-box">
              <div className="stat-val">{totalLevels}</div>
              <div className="stat-label">Total Stages</div>
            </div>
          </div>

          <div className="admin-table-title">
            <span>Player Progress</span>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>Player</th>
                <th>Stage</th>
                <th>Progress</th>
                <th>Status</th>
                <th>Last Active</th>
              </tr>
            </thead>
            <tbody>
              {playersList.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{color:"var(--muted)", textAlign:"center", padding:"2rem"}}>
                    Waiting for players to join...
                  </td>
                </tr>
              ) : playersList.map(p => {
                const done = p.completedStages?.length || 0;
                const pct = Math.round((done / totalLevels) * 100);
                const active = p.lastActive > fiveMinAgo;

                return (
                  <tr key={p.name}>
                    <td style={{fontWeight:700}}>{p.name}</td>
                    <td>
                      <span style={{color:"var(--accent2)"}}>S{(p.currentStage || 0) + 1}</span> 
                    </td>
                    <td>
                      <div style={{display:"flex", alignItems:"center", gap:".5rem"}}>
                        <div className="progress-bar-wrap"><div className="progress-bar-fill" style={{width: `${pct}%`}}></div></div>
                        <span style={{fontSize:".7rem", color:"var(--muted)"}}>{pct}%</span>
                      </div>
                    </td>
                    <td>
                      {done === totalLevels ? (
                        <span className="badge badge-green">Done</span>
                      ) : active ? (
                        <span className="badge badge-blue">Active</span>
                      ) : (
                        <span className="badge badge-red">Idle</span>
                      )}
                    </td>
                    <td style={{color:"var(--muted)", fontSize:".72rem"}}>{timeAgo(p.lastActive)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          <div className="live-log" style={{height: "180px", overflowY: "auto"}}>
            <div className="live-log-title">Live Activity Log</div>
            <div id="live-log-entries">
              {activityLogs.length === 0 ? <div style={{color:"var(--muted)", fontSize:".75rem"}}>No activity yet</div> : null}
              {activityLogs.map((e, idx) => (
                <div key={idx} className="log-entry">
                  <span className="log-time">{new Date(e.time).toLocaleTimeString()}</span>
                  <span className="log-player" style={{marginLeft: '.5rem', marginRight: '.5rem', color: "var(--accent2)"}}>{e.player}</span>
                  <span className="log-msg">{e.msg}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
