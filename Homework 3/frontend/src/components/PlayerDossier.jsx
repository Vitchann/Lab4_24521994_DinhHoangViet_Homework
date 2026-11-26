export default function PlayerDossier({ player, dossier }) {
  return <header className="player-dossier">
    <div className={`player-avatar large ${player.playerID === 'sim-himass' ? 'tone-0' : 'tone-1'}`} aria-hidden="true">{player.displayName.split(' ').at(-1)[0]}</div>
    <div className="player-title"><p className="eyebrow">{dossier.dossierID.toUpperCase()} / FICTIONAL PLAYER PROFILE</p><h1>{player.displayName}</h1><p>{player.handle} <span aria-hidden="true">·</span> {player.team}</p></div>
    <span className="status-badge">Demo review</span>
  </header>
}
