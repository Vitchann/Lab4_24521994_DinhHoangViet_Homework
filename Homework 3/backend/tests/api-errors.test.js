import request from 'supertest'
import { expect, it } from 'vitest'
import { createApp } from '../src/app.js'

it('fails closed if database services are not configured', async () => {
  expect((await request(createApp()).get('/api/dossiers').expect(503)).body.error.code).toBe('DATABASE_UNAVAILABLE')
})
it('centralizes async failures without leaking internals', async () => {
  const app = createApp({ service: { getDataset: async () => { throw new Error('secret-password and stack') } } })
  const response = await request(app).get('/api/dossiers').expect(500)
  expect(response.body.error.code).toBe('INTERNAL_ERROR')
  expect(JSON.stringify(response.body)).not.toMatch(/secret|stack/)
})
