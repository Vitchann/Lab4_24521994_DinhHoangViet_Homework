import { useForm } from '../context/FormContext.js'

export default function ShowData() {
  const { values, dossier, evidence, receipt } = useForm()
  return <section className="draft-review" aria-label="Appeal data review"><h3>Appeal data review</h3><p>Draft for {dossier.dossierID}. Submit explicitly to save the simulation appeal.</p><dl><dt>Applicant</dt><dd>{values.applicantName || 'Not entered'}</dd><dt>Email</dt><dd>{values.applicantEmail || 'Not entered'}</dd><dt>Reason / outcome</dt><dd>{values.reason} / {values.requestedOutcome}</dd><dt>Supporting references</dt><dd>{values.evidenceIDs.length ? values.evidenceIDs.map((id) => evidence.find((item) => item.id === id)?.title).join(', ') : 'None selected'}</dd><dt>Appeal reasons</dt><dd className="draft-grounds">{values.grounds || 'Not entered'}</dd></dl>{receipt && <div className="review-success"><p role="status">Persisted appeal status: {receipt.status}</p><dl><dt>Appeal ID</dt><dd>{receipt.id}</dd><dt>Server accepted at</dt><dd><time dateTime={receipt.submittedAt}>{receipt.submittedAt}</time></dd></dl><p>Simulation only. No official disciplinary decision.</p></div>}</section>
}
