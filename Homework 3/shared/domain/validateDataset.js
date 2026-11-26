import { EVIDENCE_KINDS, PLAYER_ID_PATTERN, SIMULATION_NOTICE } from './models.js'

const text = (value) => typeof value === 'string' && value.length > 0 && value.trim() === value
const record = (value) => value !== null && typeof value === 'object' && !Array.isArray(value)
function requireValid(condition, message) { if (!condition) throw new TypeError(message) }
function iso(value) {
  requireValid(text(value) && Number.isFinite(Date.parse(value)) && new Date(value).toISOString() === value, 'Expected canonical UTC ISO date')
  return Date.parse(value)
}
function index(records, key, fields) {
  requireValid(Array.isArray(records), 'Expected record array')
  const map = new Map()
  for (const item of records) {
    requireValid(record(item) && item.simulation === true && [key, ...fields].every((field) => text(item[field])), 'Invalid simulated record')
    requireValid(!map.has(item[key]), 'Duplicate identifier')
    map.set(item[key], item)
  }
  return map
}

export function validateDataset(data) {
  requireValid(record(data) && data.notice === SIMULATION_NOTICE, 'Missing simulation notice')
  const players = index(data.players, 'playerID', ['handle', 'displayName', 'team', 'role', 'referenceLabel'])
  const dossiers = index(data.dossiers, 'dossierID', ['playerID', 'title', 'summary'])
  const evidence = index(data.evidence, 'id', ['dossierID', 'title', 'kind', 'summary', 'reference'])
  const sanctions = index(data.sanctions, 'id', ['dossierID', 'type', 'description', 'status'])
  requireValid(players.size === dossiers.size, 'Expected one dossier per demo player')
  for (const player of players.values()) requireValid(PLAYER_ID_PATTERN.test(player.playerID), 'Invalid player ID')
  const dossierPlayers = new Set()
  for (const dossier of dossiers.values()) {
    requireValid(players.has(dossier.playerID) && !dossierPlayers.has(dossier.playerID) && dossier.status === 'DEMO_REVIEW', 'Invalid dossier/player relationship')
    dossierPlayers.add(dossier.playerID)
    const opened = iso(dossier.openedAt)
    requireValid(iso(dossier.appealDeadline) > opened, 'Deadline must follow opening')
    requireValid(Array.isArray(dossier.evidenceIDs) && new Set(dossier.evidenceIDs).size === dossier.evidenceIDs.length, 'Invalid evidence list')
    for (const id of dossier.evidenceIDs) requireValid(evidence.get(id)?.dossierID === dossier.dossierID, 'Broken or cross-case evidence link')
    requireValid(sanctions.get(dossier.sanctionID)?.dossierID === dossier.dossierID, 'Broken sanction link')
    requireValid(Array.isArray(dossier.timeline), 'Invalid timeline')
    let previous = opened
    const eventIDs = new Set()
    for (const event of dossier.timeline) {
      requireValid(record(event) && ['id', 'title', 'description'].every((key) => text(event[key])) && !eventIDs.has(event.id), 'Invalid timeline event')
      const at = iso(event.at)
      requireValid(at >= previous, 'Timeline must be chronological')
      previous = at
      eventIDs.add(event.id)
    }
  }
  for (const item of evidence.values()) {
    requireValid(EVIDENCE_KINDS.includes(item.kind) && item.availability === 'SIMULATED' && item.reference.startsWith('simulation://'), 'Invalid evidence provenance')
    requireValid(dossiers.get(item.dossierID)?.evidenceIDs.includes(item.id), 'Orphan evidence')
  }
  for (const sanction of sanctions.values()) {
    requireValid(dossiers.get(sanction.dossierID)?.sanctionID === sanction.id && sanction.status === 'DEMONSTRATION', 'Invalid sanction ownership/status')
    const issued = iso(sanction.issuedAt)
    requireValid(Number.isInteger(sanction.durationDays) && sanction.durationDays >= 0, 'Invalid sanction duration')
    if (sanction.type === 'CAUTION') requireValid(sanction.durationDays === 0 && sanction.effectiveUntil === null, 'Invalid caution')
    else {
      requireValid(sanction.type === 'TEMPORARY_RESTRICTION' && sanction.durationDays > 0, 'Invalid sanction type')
      requireValid(iso(sanction.effectiveUntil) - issued === sanction.durationDays * 86400000, 'Invalid sanction end date')
    }
  }
  return true
}
