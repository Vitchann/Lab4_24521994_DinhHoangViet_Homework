import { formatUtc } from '../domain/formatUtc.js'

export default function CaseTimeline({ events }) {
  return <section className="panel" aria-labelledby="timeline-heading"><h2 id="timeline-heading">Case timeline</h2><p className="section-description">A fictional chronology for this training exercise.</p>
    {events.length === 0 ? <p>No demonstration events recorded.</p> : <ol className="timeline" aria-label="Case timeline">{events.map((event) => <li key={event.id}><time dateTime={event.at}>{formatUtc(event.at)}</time><h3>{event.title}</h3><p>{event.description}</p></li>)}</ol>}
  </section>
}
