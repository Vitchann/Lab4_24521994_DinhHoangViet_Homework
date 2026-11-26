import { expect, it, vi } from 'vitest'
import { requestApi, parseDataset, parseCase, parseAppeal } from './client.js'
import { simulation } from '../data/simulation.js'
import { jsonResponse, persistedAppeal } from '../test/apiMock.js'

it('requests actual API paths with AbortSignal and validates the normalized dataset', async () => {
  const controller = new AbortController()
  expect(await requestApi('/dossiers', { signal: controller.signal }, parseDataset)).toEqual(simulation)
  expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/api/dossiers'), expect.objectContaining({ signal: controller.signal }))
})
it('rejects malformed JSON and structurally invalid successes', async () => {
  vi.mocked(fetch).mockResolvedValueOnce({ ok: true, status: 200, json: async () => { throw new SyntaxError('html') } })
  await expect(requestApi('/dossiers', {}, parseDataset)).rejects.toMatchObject({ code: 'INVALID_RESPONSE' })
  vi.mocked(fetch).mockResolvedValueOnce(jsonResponse({ data: {} }))
  await expect(requestApi('/dossiers', {}, parseDataset)).rejects.toMatchObject({ code: 'INVALID_RESPONSE' })
})
it('rejects cross-case data and malformed persisted status instead of showing the wrong player', async () => {
  const wrong = await (await fetch('http://test/api/dossiers/sim-tanvuu')).json()
  vi.mocked(fetch).mockResolvedValueOnce(jsonResponse(wrong))
  await expect(requestApi('/dossiers/sim-himass', {}, parseCase)).rejects.toMatchObject({ code: 'INVALID_RESPONSE' })
  vi.mocked(fetch).mockResolvedValueOnce(jsonResponse({ data: { ...persistedAppeal, submittedAt: 'bad' } }))
  await expect(requestApi('/dossiers/sim-himass/appeal', {}, parseAppeal)).rejects.toMatchObject({ code: 'INVALID_RESPONSE' })
})
it('retains structured server rejection codes without converting errors into success', async () => {
  vi.mocked(fetch).mockResolvedValueOnce(jsonResponse({ error: { code: 'DEADLINE_EXPIRED', message: 'Window closed.' } }, 410))
  await expect(requestApi('/dossiers/sim-himass/appeals', { method: 'POST' }, parseAppeal)).rejects.toMatchObject({ status: 410, code: 'DEADLINE_EXPIRED' })
})
it('propagates network and abort errors for loader handling', async () => {
  vi.mocked(fetch).mockRejectedValueOnce(new TypeError('Network failed'))
  await expect(requestApi('/dossiers', {}, parseDataset)).rejects.toThrow('Network failed')
})
