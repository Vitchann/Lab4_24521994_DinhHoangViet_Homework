import { useForm } from '../context/FormContext.js'

export default function ShowData() {
  const { values, dossier, evidence, receipt } = useForm()
  return <section className="draft-review" aria-label="Appeal data review"><h3>Appeal data review</h3><p>Live draft for {dossier.dossierID}. No data is sent or saved.</p><dl><dt>Applicant</dt><dd>{values.applicantName || 'Not entered'}</dd><dt>Email</dt><dd>{values.applicantEmail || 'Not entered'}</dd><dt>Reason / outcome</dt><dd>{values.reason} / {values.requestedOutcome}</dd><dt>Supporting references</dt><dd>{values.evidenceIDs.length ? values.evidenceIDs.map((id) => evidence.find((item) => item.id === id)?.title).join(', ') : 'None selected'}</dd><dt>Appeal reasons</dt><dd className="draft-grounds">{values.grounds || 'Not entered'}</dd></dl>{receipt && <p role="status" className="review-success">Local review generated. Nothing was sent to a server. Edit any field to revise the draft.</p>}</section>
}
