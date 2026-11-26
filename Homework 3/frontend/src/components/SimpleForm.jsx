import { useEffect, useRef, useState } from 'react'
import { FormContext } from '../context/FormContext.js'
import { createAppealValues, validateAppeal } from '../domain/appealValidation.js'
import InputField from './InputField.jsx'
import ShowData from './ShowData.jsx'
import AppealSlaTimer from './AppealSlaTimer.jsx'
import { useAppealSlaTimer } from '../hooks/useAppealSlaTimer.js'
import { calculateSla } from '../domain/appealSla.js'
import { useApiResource } from '../hooks/useApiResource.js'
import { requestApi, parseAppeal } from '../api/client.js'
import RemoteState from './RemoteState.jsx'

export default function SimpleForm({ dossier, evidence }) {
  const [values, setValues] = useState(createAppealValues)
  const [attempted, setAttempted] = useState(false)
  const [submission, setSubmission] = useState({ status: 'idle' })
  const statusResource = useApiResource(`/dossiers/${dossier.playerID}/appeal`, parseAppeal)
  const pending = useRef(false)
  const requestController = useRef(null)
  useEffect(() => () => requestController.current?.abort(), [])
  const receipt = submission.appeal || statusResource.data
  const submitting = submission.status === 'pending'
  const errors = { ...validateAppeal(values, { dossier, evidence }), ...submission.error?.fields }
  const sla = useAppealSlaTimer(dossier.appealDeadline)
  function updateField(name, value) {
    if (pending.current || receipt) return
    setValues((previous) => ({ ...previous, [name]: typeof value === 'function' ? value(previous[name]) : value }))
    setSubmission({ status: 'idle' })
  }
  async function handleSubmit(event) {
    event.preventDefault()
    if (pending.current || receipt || statusResource.status !== 'ready') return
    setAttempted(true)
    // Recheck the actual clock even if the browser has delayed the display tick.
    sla.refresh()
    if (calculateSla(dossier.appealDeadline, Date.now()).status !== 'active') {
      return
    }
    if (Object.keys(errors).length) return
    pending.current = true
    const controller = new AbortController()
    requestController.current = controller
    setSubmission({ status: 'pending' })
    try {
      const appeal = await requestApi(`/dossiers/${dossier.playerID}/appeals`, { method: 'POST', body: JSON.stringify(values), signal: controller.signal }, parseAppeal)
      if (!controller.signal.aborted) setSubmission({ status: 'success', appeal })
    } catch (error) {
      if (!controller.signal.aborted) {
        setSubmission({ status: 'error', error })
        // Read back status after any failed response; the write may have committed.
        statusResource.retry()
      }
    } finally { pending.current = false }
  }
  return <FormContext.Provider value={{ values, errors, attempted, updateField, dossier, evidence, receipt, sla, disabled: submitting || Boolean(receipt) }}><section className="panel appeal-panel"><p className="eyebrow">SIMULATION APPEAL</p><h2>Prepare a demonstration appeal</h2><p>Use fictional details only. A successful submission saves the simulation appeal to the database. Unsubmitted drafts are cleared on navigation or reload.</p><AppealSlaTimer />
    {statusResource.status !== 'ready' && <RemoteState resource={statusResource} label="appeal status" />}
    {submission.error && !receipt && <p role="alert">Submission failed. {submission.error.message} Status is checked before another attempt.</p>}
    <form aria-label="Demo appeal form" noValidate onSubmit={handleSubmit}>
    {attempted && Object.keys(errors).length > 0 && <p role="alert" className="error-summary">Please correct the highlighted fields. {errors.form}</p>}
    <div className="form-grid"><InputField name="applicantName" label="Applicant name" /><InputField name="applicantEmail" label="Email" type="email" /></div>
    <InputField name="relationship" label="Relationship" type="select" options={[[ 'PLAYER', 'Player' ], [ 'REPRESENTATIVE', 'Representative' ]]} />
    {values.relationship === 'REPRESENTATIVE' && <InputField name="authorized" label="I am authorized to represent the applicant." type="checkbox" />}
    <InputField name="reason" label="Reason category" type="select" options={[[ 'PROCESS', 'Process review' ], [ 'NEW_EVIDENCE', 'New evidence' ], [ 'PROPORTIONALITY', 'Proportionality' ]]} />
    <InputField name="grounds" label="Appeal reasons" type="textarea" hint="Required: 30 to 4000 characters. Explain the fictional context." />
    <InputField name="evidenceIDs" label="Supporting evidence references" type="checkbox-group" options={evidence.map((item) => [item.id, item.title])} hint="Select existing simulation references; no files are uploaded." />
    <InputField name="requestedOutcome" label="Requested outcome" type="select" options={[[ 'REVIEW', 'Review' ], [ 'REDUCE', 'Reduce' ], [ 'REMOVE', 'Remove' ]]} />
    <InputField name="acknowledged" label="I understand this is a local simulation." type="checkbox" />
    <button className="primary-link" type="submit" disabled={sla.status !== 'active' || submitting || Boolean(receipt) || statusResource.status !== 'ready' || submission.error?.code === 'DEADLINE_EXPIRED'}>{submitting ? 'Submitting…' : 'Submit simulation appeal'}</button>
  </form><ShowData /></section></FormContext.Provider>
}
