import mongoose from 'mongoose'

const { Schema } = mongoose
const text = (extra = {}) => ({ type: String, required: true, trim: true, ...extra })
const simulation = { type: Boolean, required: true, validate: (value) => value === true }
const options = { strict: 'throw', versionKey: false, toJSON: { transform: (_doc, value) => { delete value._id; return value } } }
const unique = () => text({ unique: true, immutable: true })
const ids = { type: [String], required: true, default: undefined, validate: (value) => new Set(value).size === value.length }

export function createModels(connection) {
  if (connection.models.Player) return Object.fromEntries(['Player', 'Dossier', 'Evidence', 'Sanction', 'Appeal'].map((name) => [name, connection.models[name]]))
  const player = new Schema({ playerID: text({ unique: true, immutable: true, match: /^sim-[a-z0-9]+(?:-[a-z0-9]+)*$/ }), handle: text(), displayName: text(), team: text(), role: text(), referenceLabel: text(), simulation }, options)
  const event = new Schema({ id: text(), at: { type: Date, required: true }, title: text(), description: text() }, { _id: false, strict: 'throw' })
  const dossier = new Schema({ dossierID: unique(), playerID: text({ unique: true, immutable: true }), title: text(), summary: text(), status: text({ enum: ['DEMO_REVIEW'] }), openedAt: { type: Date, required: true }, appealDeadline: { type: Date, required: true }, evidenceIDs: ids, sanctionID: text(), timeline: { type: [event], required: true, default: undefined }, simulation }, options)
  dossier.pre('validate', function () {
    if (!(this.appealDeadline > this.openedAt)) this.invalidate('appealDeadline', 'Deadline must follow opening')
    if (this.timeline?.some((item, index, events) => index > 0 && item.at < events[index - 1].at) || new Set(this.timeline?.map((item) => item.id)).size !== this.timeline?.length) this.invalidate('timeline', 'Timeline must be ordered with unique IDs')
  })
  const evidence = new Schema({ id: unique(), dossierID: text({ index: true }), title: text(), kind: text({ enum: ['REPLAY', 'DOCUMENT', 'STATEMENT'] }), summary: text(), reference: text({ match: /^simulation:\/\// }), availability: text({ enum: ['SIMULATED'] }), simulation }, options)
  const sanction = new Schema({ id: unique(), dossierID: text({ unique: true }), type: text({ enum: ['CAUTION', 'TEMPORARY_RESTRICTION'] }), description: text(), durationDays: { type: Number, required: true, min: 0, validate: Number.isInteger }, issuedAt: { type: Date, required: true }, effectiveUntil: { type: Date, default: null }, status: text({ enum: ['DEMONSTRATION'] }), simulation }, options)
  sanction.pre('validate', function () {
    const valid = this.type === 'CAUTION' ? this.durationDays === 0 && this.effectiveUntil === null : this.durationDays > 0 && this.effectiveUntil - this.issuedAt === this.durationDays * 86400000
    if (!valid) this.invalidate('effectiveUntil', 'Inconsistent sanction duration')
  })
  const appeal = new Schema({ id: unique(), dossierID: text({ unique: true, immutable: true }), playerID: text({ immutable: true }), applicantName: text({ minlength: 2, maxlength: 80 }), applicantEmail: text({ lowercase: true, maxlength: 254, match: /^\S+@\S+\.\S+$/ }), relationship: text({ enum: ['PLAYER', 'REPRESENTATIVE'] }), authorized: { type: Boolean, required: true }, reason: text({ enum: ['PROCESS', 'NEW_EVIDENCE', 'PROPORTIONALITY'] }), grounds: text({ minlength: 30, maxlength: 4000 }), evidenceIDs: ids, requestedOutcome: text({ enum: ['REVIEW', 'REDUCE', 'REMOVE'] }), acknowledged: { type: Boolean, required: true, validate: (value) => value === true }, status: text({ enum: ['SUBMITTED', 'UNDER_REVIEW', 'RESOLVED'] }), submittedAt: { type: Date, required: true, immutable: true }, simulation }, options)
  appeal.pre('validate', function () {
    if (this.relationship === 'REPRESENTATIVE' && this.authorized !== true) this.invalidate('authorized', 'Authorization required')
    if (this.reason === 'NEW_EVIDENCE' && !this.evidenceIDs?.length) this.invalidate('evidenceIDs', 'Supporting reference required')
    if (this.reason === 'PROPORTIONALITY' && this.requestedOutcome === 'REVIEW') this.invalidate('requestedOutcome', 'Reduction or removal required')
  })
  return Object.fromEntries([['Player', player], ['Dossier', dossier], ['Evidence', evidence], ['Sanction', sanction], ['Appeal', appeal]].map(([name, schema]) => [name, connection.model(name, schema, name === 'Evidence' ? 'evidence' : `${name.toLowerCase()}s`)]))
}
