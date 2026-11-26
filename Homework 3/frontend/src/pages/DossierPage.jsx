import { Link, useParams } from 'react-router-dom'
import { findDossier, simulation } from '../data/simulation.js'
import { formatUtc } from '../domain/formatUtc.js'
import PlayerDossier from '../components/PlayerDossier.jsx'
import EvidenceList from '../components/EvidenceList.jsx'
import SanctionSummary from '../components/SanctionSummary.jsx'
import CaseTimeline from '../components/CaseTimeline.jsx'
import { NotFoundPage } from './WorkspacePages.jsx'

export default function DossierPage() {
  const { playerID } = useParams()
  const dossier = findDossier(playerID)
  if (!dossier) return <NotFoundPage dossier />
  const player = simulation.players.find((item) => item.playerID === dossier.playerID)
  const evidence = dossier.evidenceIDs.map((id) => simulation.evidence.find((item) => item.id === id))
  const sanction = simulation.sanctions.find((item) => item.id === dossier.sanctionID)
  return <>
    <Link className="back-link" to="/dossiers">← All dossiers</Link>
    <PlayerDossier player={player} dossier={dossier} />
    <div className="dossier-layout"><div className="case-content">
      <section className="panel case-context"><p className="eyebrow">CASE CONTEXT · SIMULATION</p><h2>{dossier.title}</h2><p>{dossier.summary}</p><div className="context-facts"><span>Opened <time dateTime={dossier.openedAt}>{formatUtc(dossier.openedAt)}</time></span><span>{player.role}</span></div></section>
      <EvidenceList entries={evidence} /><CaseTimeline events={dossier.timeline} />
    </div><aside className="case-aside"><SanctionSummary sanction={sanction} />
      <section className="panel deadline-panel"><p className="eyebrow">EXERCISE DEADLINE</p><h2><time dateTime={dossier.appealDeadline}>{formatUtc(dossier.appealDeadline)}</time></h2><p>Illustrative date only. No live countdown or appeal submission is enabled.</p></section>
      <section className="reference-note"><h2>Reference, not an allegation</h2><p>Case-study label: <strong>{player.referenceLabel}</strong>. This player profile, evidence and outcome are invented and are not findings about that person.</p><Link to="/about">Read the simulation guide →</Link></section>
    </aside></div>
  </>
}
