import { formatUtc } from '../domain/formatUtc.js'
import Icon from './Icon.jsx'

export default function SanctionSummary({ sanction }) {
  return <section className="panel sanction-panel" aria-labelledby="sanction-heading">
    <div className="panel-heading"><h2 id="sanction-heading">Demonstration sanction</h2><Icon name="shield" /></div>
    <span className="small-badge amber">ILLUSTRATIVE OUTCOME</span>
    <h3>{sanction.durationDays === 0 ? 'Written caution' : `${sanction.durationDays}-day training restriction`}</h3>
    <p>{sanction.description}</p>
    <dl className="detail-list"><div><dt>Recorded</dt><dd><time dateTime={sanction.issuedAt}>{formatUtc(sanction.issuedAt)}</time></dd></div><div><dt>Duration</dt><dd>{sanction.durationDays === 0 ? 'No restriction' : `${sanction.durationDays} days (demo)`}</dd></div></dl>
  </section>
}
