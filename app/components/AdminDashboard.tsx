import { useEffect, useMemo, useState } from 'react';
import type { PlayerData, ActivityLog } from '../../hooks/useFirebase';
import { LEVELS } from '../../lib/levels';

interface AdminDashboardProps {
  players: Record<string, PlayerData>;
  activityLogs: ActivityLog[];
  totalLevels: number;
  unlockedStageLimit: number;
  setGlobalUnlockLimit: (limit: number) => void;
  deletePlayer: (playerKey: string) => Promise<void>;
  onLogout: () => void;
}

type PlayerListItem = PlayerData & { playerKey: string };

export default function AdminDashboard({ players, activityLogs, totalLevels, unlockedStageLimit, setGlobalUnlockLimit, deletePlayer, onLogout }: AdminDashboardProps) {
  const [selectedPlayerKey, setSelectedPlayerKey] = useState<string | null>(null);
  const [view, setView] = useState<"dashboard" | "profile">("dashboard");

  const timeAgo = (ts: number) => {
    const diff = Math.floor((Date.now() - ts) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff/60)}m ago`;
    return `${Math.floor(diff/3600)}h ago`;
  };

  const fiveMinAgo = Date.now() - 5 * 60 * 1000;
  
  const playersList = useMemo(() => {
    return Object.entries(players || {})
      .map(([playerKey, player]) => ({ ...player, playerKey }))
      .sort((a,b) => (b.completedStages?.length || 0) - (a.completedStages?.length || 0));
  }, [players]);

  const handleDeletePlayer = async (player: PlayerListItem) => {
    await deletePlayer(player.playerKey);
  };

  const activePlayers = playersList.filter(p => p.lastActive > fiveMinAgo).length;
  const exemptPlayers = playersList.filter(p => p.exempt).length;
  const starTotal = (player: PlayerData) => Object.values(player.stageStars || {}).reduce((sum, stars) => sum + stars, 0);
  const secretStarTotal = (player: PlayerData) => Object.values(player.stageSecretStars || {}).filter(Boolean).length;
  const maxStars = totalLevels * 3;
  const bestTimeTotal = (player: PlayerData) => Object.values(player.stageBestTimes || {}).reduce((sum, seconds) => sum + seconds, 0);
  const selectedPlayer = playersList.find(player => player.playerKey === selectedPlayerKey) || playersList[0] || null;
  const playerName = (player: PlayerData) => player.username || player.name;
  const playerLabel = (player: PlayerData) => playerName(player);

  const openPlayerProfile = (playerKey: string) => {
    setSelectedPlayerKey(playerKey);
    setView("profile");
  };

  useEffect(() => {
    if (selectedPlayerKey && playersList.some(player => player.playerKey === selectedPlayerKey)) return;
    setSelectedPlayerKey(playersList[0]?.playerKey || null);
  }, [playersList, selectedPlayerKey]);

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
          <div style={{color:"var(--muted)", fontSize:".7rem", marginBottom:".75rem"}}>{exemptPlayers} on exempt list</div>
          <div id="admin-player-list">
            {playersList.length === 0 ? <div style={{color:"var(--muted)", fontSize:".75rem"}}>No players yet...</div> : null}
            {playersList.map(p => {
              const active = p.lastActive > fiveMinAgo;
              const stageNum = (p.currentStage || 0) + 1;
              return (
                <div
                  key={p.playerKey}
                  className={`player-card ${selectedPlayer?.playerKey === p.playerKey ? "selected" : ""}`}
                  onClick={() => openPlayerProfile(p.playerKey)}
                >
                  <div className="pc-name">{active && <span className="online-dot"></span>}{playerLabel(p)}</div>
                  <div className="pc-meta">{p.completedStages?.length || 0}/{totalLevels} stages done · {starTotal(p)}/{maxStars} stars · {bestTimeTotal(p)}s best{p.exempt ? " · exempt" : ""}</div>
                  <div className="pc-stage">S{stageNum}</div>
                  <button
                    className="btn btn-danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeletePlayer(p);
                    }}
                    style={{marginTop: ".65rem", padding: ".25rem .45rem", fontSize: ".62rem"}}
                  >
                    Delete
                  </button>
                </div>
              )
            })}
          </div>
        </div>
        
        <div className="admin-main">
          {view === "profile" && selectedPlayer ? (
            <div className="player-profile-page">
              <button className="btn btn-ghost" onClick={() => setView("dashboard")}>Back</button>
              <div className="player-profile-header">
                <div>
                  <div className="player-profile-title">{playerLabel(selectedPlayer)}</div>
                  <div className="player-detail-meta">Username: {playerName(selectedPlayer)} · Email: {selectedPlayer.email || "No email recorded"}</div>
                </div>
                <div className="player-detail-summary">
                  <span>{selectedPlayer.completedStages?.length || 0}/{totalLevels} levels complete</span>
                  <span>{starTotal(selectedPlayer)}/{maxStars} stars</span>
                  <span>{secretStarTotal(selectedPlayer)} secret red stars</span>
                  <span>{bestTimeTotal(selectedPlayer)}s total best time</span>
                  {selectedPlayer.exempt && <span>Exempt from admin locks</span>}
                </div>
              </div>

              <div className="level-star-grid profile">
                {LEVELS.slice(0, totalLevels).map((level, index) => {
                  const stars = selectedPlayer.stageStars?.[level.id] || 0;
                  const complete = selectedPlayer.completedStages?.includes(level.id);
                  const bestTime = selectedPlayer.stageBestTimes?.[level.id];
                  const secret = !!selectedPlayer.stageSecretStars?.[level.id];
                  return (
                    <div key={level.id} className={`level-star-row ${complete ? "complete" : ""}`}>
                      <div className="level-star-main">
                        <span className="level-star-num">S{index + 1}</span>
                        <span className="level-star-title">{level.title}</span>
                      </div>
                      <div className="level-star-meta">
                        <span className="level-star-icons">
                          {"\u2605".repeat(stars)}{"\u2606".repeat(3 - stars)}
                          {secret && <span className="level-secret-star"> {"\u2605"}</span>}
                        </span>
                        <span>{complete ? "Complete" : "Incomplete"}</span>
                        <span>{Number.isFinite(bestTime) ? `${bestTime}s taken` : "No time"}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <>
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
                <th>Email</th>
                <th>Stage</th>
                <th>Progress</th>
                <th>Stars</th>
                <th>Status</th>
                <th>Last Active</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {playersList.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{color:"var(--muted)", textAlign:"center", padding:"2rem"}}>
                    Waiting for players to join...
                  </td>
                </tr>
              ) : playersList.map(p => {
                const done = p.completedStages?.length || 0;
                const pct = Math.round((done / totalLevels) * 100);
                const active = p.lastActive > fiveMinAgo;

                return (
                  <tr key={p.playerKey} onClick={() => openPlayerProfile(p.playerKey)} style={{cursor: "pointer"}}>
                    <td style={{fontWeight:700}}>
                      {playerLabel(p)}
                      {p.exempt && <span className="badge badge-blue" style={{marginLeft: ".5rem"}}>Exempt</span>}
                    </td>
                    <td style={{color:"var(--muted)", fontSize:".72rem"}}>{p.email || "-"}</td>
                    <td>
                      <span style={{color:"var(--accent2)"}}>S{(p.currentStage || 0) + 1}</span> 
                    </td>
                    <td>
                      <div style={{display:"flex", alignItems:"center", gap:".5rem"}}>
                        <div className="progress-bar-wrap"><div className="progress-bar-fill" style={{width: `${pct}%`}}></div></div>
                        <span style={{fontSize:".7rem", color:"var(--muted)"}}>{pct}%</span>
                      </div>
                    </td>
                    <td style={{color:"var(--yellow)", fontSize:".72rem"}}>{starTotal(p)}/{maxStars}{secretStarTotal(p) > 0 ? ` +${secretStarTotal(p)} secret` : ""}</td>
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
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeletePlayer(p);
                        }}
                        style={{padding: ".25rem .5rem", fontSize: ".62rem"}}
                      >
                        Delete
                      </button>
                    </td>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
