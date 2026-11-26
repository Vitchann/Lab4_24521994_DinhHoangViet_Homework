import Icon from './Icon.jsx'

export default function EvidenceList({ entries }) {
  return <section className="panel" aria-labelledby="evidence-heading">
    <div className="panel-heading"><h2 id="evidence-heading">Evidence references</h2><span className="count-label">{String(entries.length).padStart(2, '0')}</span></div>
    <p className="section-description">Simulated metadata only. No actual attachments or verified sources.</p>
    {entries.length === 0 ? <p>No simulated references available.</p> : <ul className="evidence-list">{entries.map((entry) => <li key={entry.id}>
      <span className="evidence-icon"><Icon name="file" /></span><div><div className="evidence-title"><h3>{entry.title}</h3><span className="small-badge">Simulated · {entry.kind.toLowerCase()}</span></div><p>{entry.summary}</p><code>{entry.reference}</code></div>
    </li>)}</ul>}
  </section>
}
