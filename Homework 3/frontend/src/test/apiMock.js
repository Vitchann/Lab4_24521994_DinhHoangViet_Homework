import { simulation } from '../../../shared/data/simulation.js'

export const persistedAppeal = { id: '11111111-1111-4111-8111-111111111111', dossierID: 'demo-001', playerID: 'sim-himass', status: 'SUBMITTED', submittedAt: '2026-11-26T12:00:00.000Z', simulation: true }
export const jsonResponse = (data, status = 200) => ({ ok: status >= 200 && status < 300, status, json: async () => data })
export function createApiMock() {
  const appeals = new Map()
  return async (url, options = {}) => {
    const path = new URL(url, 'http://test.local').pathname.replace(/^\/api/, '')
    if (path === '/dossiers') return jsonResponse({ data: simulation })
    const id = decodeURIComponent(path.split('/')[2] || '')
    const dossier = simulation.dossiers.find((item) => item.playerID === id)
    if (!dossier) return jsonResponse({ error: { code: 'NOT_FOUND', message: 'Simulation record not found.' } }, 404)
    if (path.endsWith('/appeal')) return jsonResponse({ data: appeals.get(id) || null })
    if (options.method === 'POST') {
      if (appeals.has(id)) return jsonResponse({ error: { code: 'DUPLICATE_APPEAL', message: 'Already submitted.' } }, 409)
      const appeal = { ...persistedAppeal, playerID: id, dossierID: dossier.dossierID }
      appeals.set(id, appeal)
      return jsonResponse({ data: appeal }, 201)
    }
    return jsonResponse({ data: { player: simulation.players.find((item) => item.playerID === id), dossier, evidence: simulation.evidence.filter((item) => item.dossierID === dossier.dossierID), sanction: simulation.sanctions.find((item) => item.id === dossier.sanctionID) }, meta: { serverNow: '2026-11-26T12:00:00.000Z' } })
  }
}
