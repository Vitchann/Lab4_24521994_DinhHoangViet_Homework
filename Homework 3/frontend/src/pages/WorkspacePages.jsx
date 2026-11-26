import { Link } from 'react-router-dom'
import DossierCards from '../components/DossierCards.jsx'
import { useTribunal } from '../context/TribunalContext.js'
import RemoteState from '../components/RemoteState.jsx'
import Icon from '../components/Icon.jsx'
import DisproportionalityMatrix from '../components/DisproportionalityMatrix.jsx'

export function OverviewPage() {
  const resource = useTribunal()
  if (resource.status !== 'ready') return <RemoteState resource={resource} />
  const simulation = resource.data
  if (!simulation.dossiers.length) return <section className="panel"><h1>No simulation dossiers</h1><p>Seed the database to load the demonstration dataset.</p><button type="button" onClick={resource.retry}>Reload dossiers</button></section>
  return <>
    <header className="page-heading"><div><p className="eyebrow">ESPORTS FAIR-PLAY / TRIBUNAL</p><h1>Fair play starts with a fair review.</h1><p>A clear record. A considered response. Explore a fair review process.</p></div><Link className="primary-link" to="/dossiers">Explore dossiers<Icon name="arrow" /></Link></header>
    <div className="metrics" aria-label="Demonstration dataset overview">{[
      [simulation.dossiers.length, 'Simulation dossiers', 'Two independent training scenarios', 'folder'],
      [simulation.evidence.length, 'Evidence references', 'Synthetic metadata, no real sources', 'file'],
      [simulation.sanctions.length, 'Illustrative outcomes', 'Demonstrations, not official decisions', 'shield'],
    ].map(([count, title, detail, icon]) => <section className="metric" key={title}><div><h2>{title}</h2><Icon name={icon} /></div><strong>{String(count).padStart(2, '0')}</strong><p>{detail}</p></section>)}</div>
    <div className="overview-heading"><div><p className="eyebrow">THE REVIEW DESK</p><h2>Current dossiers</h2><p>Structured context for thoughtful review.</p></div><Link to="/dossiers">View all dossiers <span aria-hidden="true">↗</span></Link></div>
    <DossierCards dataset={simulation} />
    <DisproportionalityMatrix dataset={simulation} />
    <section className="principles"><div><span className="principle-symbol"><Icon name="shield" /></span><h2>Context before conclusions.</h2><p>Good review starts with a complete picture.</p></div><ol><li><span>01</span><strong>Understand the record</strong><p>Keep context and references together.</p></li><li><span>02</span><strong>Separate facts from assumptions</strong><p>This workspace contains simulation only.</p></li><li><span>03</span><strong>Make the process clear</strong><p>Review chronology and explain the limits.</p></li></ol></section>
  </>
}

export function DossierIndex() {
  const resource = useTribunal()
  if (resource.status !== 'ready') return <RemoteState resource={resource} />
  const simulation = resource.data
  return <><header className="page-heading"><div><p className="eyebrow">SIMULATION REGISTRY</p><h1>Case dossiers</h1><p>Fictional profiles. Traceable references. Clear boundaries.</p></div><span className="outline-badge">{simulation.dossiers.length} DEMO RECORDS</span></header>{simulation.dossiers.length ? <DossierCards dataset={simulation} /> : <p>No simulation dossiers are available.</p>}</>
}

export function AboutPage() {
  return <><header className="page-heading"><div><p className="eyebrow">A NOTE ON CONTEXT</p><h1>About this simulation</h1><p>Reference names are labels, not findings.</p></div></header><section className="panel guide-panel"><h2>Designed to explore a fair process</h2><p>The user supplied Himass and TanVuu as inspiration labels. No external source or case facts are asserted here. Player Alpha and Player Beta, their teams, roles, timelines, evidence and sanctions are fictional training data.</p><h2>What is available</h2><p>Dossier navigation, clearly labeled evidence metadata, a Context-based appeal form, transparent comparison matrix and absolute-deadline countdown. References beginning simulation:// are local identifiers, not real attachments or official sources.</p><h2>What comes later</h2><p>Simulation records and appeal status now load from the REST API and MongoDB. Submitted appeals persist; unsent drafts stay in memory. Authentication and real adjudication remain outside this demonstration.</p><Link className="text-link" to="/dossiers">Explore the demonstration registry →</Link></section></>
}

export function NotFoundPage({ dossier = false }) {
  return <section className="not-found"><span className="empty-symbol"><Icon name="folder" /></span><p className="eyebrow">{dossier ? 'UNKNOWN PLAYER ID' : '404 / UNKNOWN ROUTE'}</p><h1>{dossier ? 'Dossier not found' : 'Page not found'}</h1><p>{dossier ? 'No simulation dossier matches this player ID.' : 'This page is not part of the demonstration workspace.'}</p><Link className="primary-link" to="/dossiers">Back to registry<Icon name="arrow" /></Link></section>
}
