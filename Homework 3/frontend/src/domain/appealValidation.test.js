// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { simulation } from '../data/simulation.js'
import { createAppealValues, validateAppeal } from './appealValidation.js'

const context = { dossier: simulation.dossiers[0], evidence: simulation.evidence.filter((item) => item.dossierID === 'demo-001') }
const valid = () => ({ applicantName: 'Demo Applicant', applicantEmail: 'demo@example.test', relationship: 'PLAYER', authorized: false, reason: 'PROCESS', grounds: 'Please review the fictional briefing context and demonstration record.', evidenceIDs: [], requestedOutcome: 'REVIEW', acknowledged: true })

describe('P3-06 appeal validation', () => {
  it('creates fresh empty drafts and independent reference arrays', () => {
    const a = createAppealValues(), b = createAppealValues()
    expect(a.applicantName).toBe('')
    expect(a.acknowledged).toBe(false)
    expect(a.evidenceIDs).toEqual([])
    expect(a).not.toBe(b)
    expect(a.evidenceIDs).not.toBe(b.evidenceIDs)
  })
  it('accepts valid simulated applicant data without mutating inputs', () => {
    const values = Object.freeze({ ...valid(), evidenceIDs: Object.freeze([]) })
    expect(validateAppeal(values, context)).toEqual({})
  })
  it.each([
    ['applicantName', ' '], ['applicantName', 'x'.repeat(81)], ['applicantEmail', 'bad-address'], ['applicantEmail', 'x'.repeat(255)],
    ['grounds', 'short'], ['grounds', 'x'.repeat(4001)], ['relationship', 'OTHER'], ['reason', 'UNKNOWN'],
    ['requestedOutcome', 'PUNISH'], ['acknowledged', false], ['acknowledged', 'true'], ['evidenceIDs', 'ev-hm-replay'],
    ['evidenceIDs', ['ev-tv-notice']], ['evidenceIDs', ['ev-hm-replay', 'ev-hm-replay']],
  ])('rejects invalid %s %j', (field, value) => {
    expect(validateAppeal({ ...valid(), [field]: value }, context)).toHaveProperty(field)
  })
  it('requires representative authorization', () => {
    expect(validateAppeal({ ...valid(), relationship: 'REPRESENTATIVE' }, context)).toHaveProperty('authorized')
    expect(validateAppeal({ ...valid(), relationship: 'REPRESENTATIVE', authorized: true }, context)).toEqual({})
  })
  it('requires same-dossier references for new-evidence reasons', () => {
    expect(validateAppeal({ ...valid(), reason: 'NEW_EVIDENCE' }, context)).toHaveProperty('evidenceIDs')
    expect(validateAppeal({ ...valid(), reason: 'NEW_EVIDENCE', evidenceIDs: ['ev-hm-replay'] }, context)).toEqual({})
  })
  it('requires a specified reduction/removal for proportionality', () => {
    expect(validateAppeal({ ...valid(), reason: 'PROPORTIONALITY' }, context)).toHaveProperty('requestedOutcome')
    expect(validateAppeal({ ...valid(), reason: 'PROPORTIONALITY', requestedOutcome: 'REDUCE' }, context)).toEqual({})
  })
  it('counts trimmed grounds and handles malformed payload/context without crashing', () => {
    expect(validateAppeal({ ...valid(), grounds: ' '.repeat(30) }, context)).toHaveProperty('grounds')
    expect(validateAppeal(null, context)).toHaveProperty('form')
    expect(validateAppeal(valid(), {})).toHaveProperty('form')
  })
})
