import { validateDataset } from '../domain/validateDataset.js'
import { SIMULATION_NOTICE, PLAYER_ID_PATTERN } from '../domain/models.js'

export class ApiError extends Error {
  constructor(message, status, code, fields) { super(message); Object.assign(this, { status, code, fields }) }
}
const invalid = () => new ApiError('The API returned an invalid response.', 502, 'INVALID_RESPONSE')
const base = (import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:3002').replace(/\/$/, '')

export async function requestApi(path, options = {}, parse = (value) => value) {
  const response = await fetch(`${base}/api${path}`, { ...options, headers: { Accept: 'application/json', ...(options.body ? { 'Content-Type': 'application/json' } : {}), ...options.headers } })
  let body
  try { body = await response.json() } catch { throw invalid() }
  if (!response.ok) throw new ApiError(body?.error?.message || 'API request failed.', response.status, body?.error?.code || 'REQUEST_FAILED', body?.error?.fields)
  if (!body || !Object.hasOwn(body, 'data')) throw invalid()
  try { return parse(body.data, path, body.meta) } catch { throw invalid() }
}

export function parseDataset(data) { validateDataset(data); return data }
export function parseCase(data, path, meta) {
  if (!data || data.player?.playerID !== decodeURIComponent(path.split('/')[2]) || !Number.isFinite(Date.parse(meta?.serverNow))) throw invalid()
  validateDataset({ notice: SIMULATION_NOTICE, players: [data.player], dossiers: [data.dossier], evidence: data.evidence, sanctions: [data.sanction] })
  return data
}
export function parseAppeal(data, path) {
  if (data === null && path.endsWith('/appeal')) return null
  if (!data || !/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/.test(data.id) || !PLAYER_ID_PATTERN.test(data.playerID) || typeof data.dossierID !== 'string' || !['SUBMITTED', 'UNDER_REVIEW', 'RESOLVED'].includes(data.status) || data.simulation !== true || !Number.isFinite(Date.parse(data.submittedAt)) || new Date(data.submittedAt).toISOString() !== data.submittedAt || data.playerID !== decodeURIComponent(path.split('/')[2])) throw invalid()
  return data
}
