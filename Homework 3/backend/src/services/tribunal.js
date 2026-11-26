import { randomUUID } from 'node:crypto'
import { SIMULATION_NOTICE, PLAYER_ID_PATTERN } from '../../../shared/domain/models.js'
import { validateDataset } from '../../../shared/domain/validateDataset.js'
import { createAppealValues, validateAppeal } from '../../../shared/domain/appealValidation.js'
import { HttpError } from '../middleware/errors.js'

const plain = (document) => JSON.parse(JSON.stringify(document))
const missing = () => new HttpError(404, 'NOT_FOUND', 'Simulation record not found.')
export function publicAppeal(record) {
  const { id, dossierID, playerID, status, submittedAt, simulation } = plain(record)
  return { id, dossierID, playerID, status, submittedAt, simulation }
}

export function createTribunalService(models, now = Date.now) {
  function requireDatabase() { if (!models || models.Player.db.readyState !== 1) throw new HttpError(503, 'DATABASE_UNAVAILABLE', 'Database unavailable. Retry later.') }
  async function getDataset() {
    requireDatabase()
    const [players, dossiers, evidence, sanctions] = await Promise.all(['Player', 'Dossier', 'Evidence', 'Sanction'].map((name) => models[name].find().sort({ _id: 1 }).then(plain)))
    const data = { notice: SIMULATION_NOTICE, players, dossiers, evidence, sanctions }
    validateDataset(data)
    return data
  }
  async function getCase(playerID) {
    if (!PLAYER_ID_PATTERN.test(playerID)) throw new HttpError(400, 'INVALID_ID', 'Malformed player ID.')
    const data = await getDataset()
    const dossier = data.dossiers.find((item) => item.playerID === playerID)
    if (!dossier) throw missing()
    return { player: data.players.find((item) => item.playerID === playerID), dossier, evidence: dossier.evidenceIDs.map((id) => data.evidence.find((item) => item.id === id)), sanction: data.sanctions.find((item) => item.id === dossier.sanctionID) }
  }
  async function getDossierAppeal(playerID) {
    const { dossier } = await getCase(playerID)
    const record = await models.Appeal.findOne({ dossierID: dossier.dossierID })
    return record ? publicAppeal(record) : null
  }
  async function submitAppeal(playerID, payload) {
    const context = await getCase(playerID)
    const fields = Object.assign(Object.create(null), validateAppeal(payload, context))
    const required = Object.keys(createAppealValues())
    if (!payload || Array.isArray(payload) || typeof payload !== 'object') throw new HttpError(422, 'VALIDATION_FAILED', 'Invalid appeal fields.', { fields })
    for (const key of required) if (!Object.hasOwn(payload, key)) fields[key] = 'This field is required.'
    for (const key of Object.keys(payload)) if (!required.includes(key)) fields[key] = 'Unexpected field.'
    for (const key of ['authorized', 'acknowledged']) if (typeof payload[key] !== 'boolean') fields[key] = 'Use a boolean value.'
    if (Object.keys(fields).length) throw new HttpError(422, 'VALIDATION_FAILED', 'Invalid appeal fields.', { fields })
    const existing = await models.Appeal.findOne({ dossierID: context.dossier.dossierID })
    const duplicate = (record) => new HttpError(409, 'DUPLICATE_APPEAL', 'This dossier already has an appeal.', { appeal: publicAppeal(record) })
    if (existing) throw duplicate(existing)
    const acceptedAt = now()
    if (!Number.isFinite(acceptedAt) || acceptedAt >= Date.parse(context.dossier.appealDeadline)) throw new HttpError(410, 'DEADLINE_EXPIRED', 'The appeal deadline has expired.')
    try {
      const record = await models.Appeal.create({ ...payload, applicantName: payload.applicantName.trim(), applicantEmail: payload.applicantEmail.trim().toLowerCase(), grounds: payload.grounds.trim(), id: randomUUID(), dossierID: context.dossier.dossierID, playerID, status: 'SUBMITTED', submittedAt: new Date(acceptedAt), simulation: true })
      return publicAppeal(record)
    } catch (error) {
      if (error.code === 11000) {
        const winner = await models.Appeal.findOne({ dossierID: context.dossier.dossierID })
        if (winner) throw duplicate(winner)
      }
      throw error
    }
  }
  async function getEvidence(id) {
    if (!/^ev-[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) throw new HttpError(400, 'INVALID_ID', 'Malformed evidence ID.')
    const record = (await getDataset()).evidence.find((item) => item.id === id)
    if (!record) throw missing()
    return record
  }
  async function getAppeal(id) {
    if (!/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/.test(id)) throw new HttpError(400, 'INVALID_ID', 'Malformed appeal ID.')
    requireDatabase()
    const record = await models.Appeal.findOne({ id })
    if (!record) throw missing()
    return publicAppeal(record)
  }
  return { getDataset, getCase, getDossierAppeal, submitAppeal, getEvidence, getAppeal }
}
