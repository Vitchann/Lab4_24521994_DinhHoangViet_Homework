import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'

export default function DossierCards({ dataset: simulation }) {
  return <ul className="dossier-grid" aria-label="Simulation dossiers">{simulation.dossiers.map((dossier, index) => {
    const player = simulation.players.find((item) => item.playerID === dossier.playerID)
    return <li key={dossier.dossierID}><article className="dossier-card">
      <div className="card-topline"><span className="record-id">{dossier.dossierID.toUpperCase()}</span><span className="status-badge">Demo review</span></div>
      <div className="card-player"><span className={`player-avatar tone-${index}`} aria-hidden="true">{index === 0 ? 'A' : 'B'}</span><div><h3>{player.displayName}</h3><p>{player.handle} <span aria-hidden="true">·</span> {player.role}</p></div></div>
      <h4>{dossier.title}</h4><p className="card-summary">{dossier.summary}</p>
      <div className="card-meta"><span><Icon name="file" />{dossier.evidenceIDs.length} simulated references</span><span>Fictional case</span></div>
      <Link className="card-action" to={`/dossier/${player.playerID}`} aria-label={`Open dossier for ${player.displayName}`}>Open dossier<Icon name="arrow" /></Link>
    </article></li>
  })}</ul>
}
