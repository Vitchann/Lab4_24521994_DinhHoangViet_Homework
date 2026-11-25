import { expect, it } from 'vitest'
import request from 'supertest'
import { createApp } from '../src/app.js'

it('starts the isolated Express skeleton without inventing API routes', async () => {
  const response = await request(createApp()).get('/api/dossiers')
  expect(response.status).toBe(404)
  expect(response.body.error.code).toBe('NOT_FOUND')
  expect(response.headers['x-powered-by']).toBeUndefined()
})
