import { useState } from 'react'
import { FormContext } from '../context/FormContext.js'
import { createAppealValues, validateAppeal } from '../domain/appealValidation.js'
import InputField from './InputField.jsx'
import ShowData from './ShowData.jsx'
import AppealSlaTimer from './AppealSlaTimer.jsx'
import { useAppealSlaTimer } from '../hooks/useAppealSlaTimer.js'
import { calculateSla } from '../domain/appealSla.js'

export default function SimpleForm({ dossier, evidence }) {
  const [values, setValues] = useState(createAppealValues)
  const [attempted, setAttempted] = useState(false)
  const [receipt, setReceipt] = useState(null)
  const errors = validateAppeal(values, { dossier, evidence })
  const sla = useAppealSlaTimer(dossier.appealDeadline)
  function updateField(name, value) {
    setValues((previous) => ({ ...previous, [name]: typeof value === 'function' ? value(previous[name]) : value }))
    setReceipt(null)
  }
  function handleSubmit(event) {
    event.preventDefault()
    setAttempted(true)
    // Recheck the actual clock even if the browser has delayed the display tick.
    sla.refresh()
    if (calculateSla(dossier.appealDeadline, Date.now()).status !== 'active') {
      setReceipt(null)
      return
    }
    if (Object.keys(errors).length === 0) setReceipt({ ...values, evidenceIDs: [...values.evidenceIDs] })
  }
  return <FormContext.Provider value={{ values, errors, attempted, updateField, dossier, evidence, receipt, sla }}><section className="panel appeal-panel"><p className="eyebrow">LOCAL REVIEW EXERCISE</p><h2>Prepare a demonstration appeal</h2><p>Use fictional details only. This draft stays in memory and is cleared on navigation or reload.</p><AppealSlaTimer /><form aria-label="Demo appeal form" noValidate onSubmit={handleSubmit}>
    {attempted && Object.keys(errors).length > 0 && <p role="alert" className="error-summary">Please correct the highlighted fields. {errors.form}</p>}
    <div className="form-grid"><InputField name="applicantName" label="Applicant name" /><InputField name="applicantEmail" label="Email" type="email" /></div>
    <InputField name="relationship" label="Relationship" type="select" options={[[ 'PLAYER', 'Player' ], [ 'REPRESENTATIVE', 'Representative' ]]} />
    {values.relationship === 'REPRESENTATIVE' && <InputField name="authorized" label="I am authorized to represent the applicant." type="checkbox" />}
    <InputField name="reason" label="Reason category" type="select" options={[[ 'PROCESS', 'Process review' ], [ 'NEW_EVIDENCE', 'New evidence' ], [ 'PROPORTIONALITY', 'Proportionality' ]]} />
    <InputField name="grounds" label="Appeal reasons" type="textarea" hint="Required: 30 to 4000 characters. Explain the fictional context." />
    <InputField name="evidenceIDs" label="Supporting evidence references" type="checkbox-group" options={evidence.map((item) => [item.id, item.title])} hint="Select existing simulation references; no files are uploaded." />
    <InputField name="requestedOutcome" label="Requested outcome" type="select" options={[[ 'REVIEW', 'Review' ], [ 'REDUCE', 'Reduce' ], [ 'REMOVE', 'Remove' ]]} />
    <InputField name="acknowledged" label="I understand this is a local simulation." type="checkbox" />
    <button className="primary-link" type="submit" disabled={sla.status !== 'active'}>Review demo appeal</button>
  </form><ShowData /></section></FormContext.Provider>
}
