import { expect, it } from 'vitest'
import request from 'supertest'
import { createApp } from '../src/app.js'

it('preserves safe JSON 404 responses and disables the framework header', async () => {
  const response = await request(createApp()).get('/api/not-implemented')
  expect(response.status).toBe(404)
  expect(response.body.error.code).toBe('NOT_FOUND')
  expect(response.headers['x-powered-by']).toBeUndefined()
})
