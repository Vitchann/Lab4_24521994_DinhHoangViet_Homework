export function createAppealValues() {
  return { applicantName: '', applicantEmail: '', relationship: 'PLAYER', authorized: false, reason: 'PROCESS', grounds: '', evidenceIDs: [], requestedOutcome: 'REVIEW', acknowledged: false }
}

export function validateAppeal(values, context) {
  const dossier = context?.dossier
  const evidence = context?.evidence
  if (!values || typeof values !== 'object' || Array.isArray(values) || !dossier?.dossierID || !Array.isArray(evidence) || evidence.some((item) => item.dossierID !== dossier.dossierID)) return { form: 'A valid demonstration dossier and draft are required.' }
  const errors = {}
  const length = (value) => typeof value === 'string' ? value.trim().length : 0
  if (length(values.applicantName) < 2 || length(values.applicantName) > 80) errors.applicantName = 'Use 2 to 80 characters for the applicant name.'
  if (typeof values.applicantEmail !== 'string' || length(values.applicantEmail) > 254 || !/^\S+@\S+\.\S+$/.test(values.applicantEmail.trim())) errors.applicantEmail = 'Enter a valid email of at most 254 characters.'
  if (!['PLAYER', 'REPRESENTATIVE'].includes(values.relationship)) errors.relationship = 'Select a valid relationship.'
  if (values.relationship === 'REPRESENTATIVE' && values.authorized !== true) errors.authorized = 'Confirm representative authorization.'
  if (!['PROCESS', 'NEW_EVIDENCE', 'PROPORTIONALITY'].includes(values.reason)) errors.reason = 'Select a valid reason.'
  if (length(values.grounds) < 30 || length(values.grounds) > 4000) errors.grounds = 'Explain the appeal in 30 to 4000 characters.'
  if (!Array.isArray(values.evidenceIDs) || new Set(values.evidenceIDs).size !== values.evidenceIDs.length || values.evidenceIDs.some((id) => typeof id !== 'string' || !dossier.evidenceIDs.includes(id) || !evidence.some((item) => item.id === id))) errors.evidenceIDs = 'Select unique references belonging to this dossier.'
  else if (values.reason === 'NEW_EVIDENCE' && values.evidenceIDs.length === 0) errors.evidenceIDs = 'Select at least one supporting reference for new evidence.'
  if (!['REVIEW', 'REDUCE', 'REMOVE'].includes(values.requestedOutcome)) errors.requestedOutcome = 'Select a valid requested outcome.'
  else if (values.reason === 'PROPORTIONALITY' && values.requestedOutcome === 'REVIEW') errors.requestedOutcome = 'A proportionality appeal must request reduction or removal.'
  if (values.acknowledged !== true) errors.acknowledged = 'Confirm the local simulation notice.'
  return errors
}
