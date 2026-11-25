import { describe, expect, it } from 'vitest'
import request from 'supertest'
import { createApp } from '../../src/app.js'

describe('P2-16 Express skeleton release contract', () => {
  it.each([
    ['get', '/api/profiles'], ['post', '/api/swipe'], ['get', '/api/history'],
  ])('%s %s truthfully reports an unimplemented route', async (method, url) => {
    const response = await request(createApp())[method](url)
    expect(response.status).toBe(404)
    expect(response.body).toEqual({ error: { code: 'NOT_FOUND', message: 'Route not found' } })
    expect(response.headers['content-type']).toMatch(/application\/json/)
  })

  it('does not advertise the Express implementation header', async () => {
    const response = await request(createApp()).get('/')
    expect(response.headers['x-powered-by']).toBeUndefined()
  })

  it('restricts CORS to the configured demo origin rather than a wildcard', async () => {
    const origin = 'https://demo.example.test'
    const response = await request(createApp({ clientOrigin: origin }))
      .options('/api/profiles').set('Origin', origin).set('Access-Control-Request-Method', 'GET')
    expect(response.status).toBe(204)
    expect(response.headers['access-control-allow-origin']).toBe(origin)
  })

  it('returns safe JSON for malformed JSON without a stack or reflected payload', async () => {
    const response = await request(createApp()).post('/api/swipe')
      .set('Content-Type', 'application/json').send('{invalid-test-payload')
    expect(response.status).toBe(400)
    expect(response.body).toEqual({ error: { code: 'INVALID_JSON', message: 'Request body must be valid JSON' } })
    expect(response.text).not.toMatch(/SyntaxError|stack|invalid-test-payload|node_modules/)
  })

  it('enforces the existing 16kb JSON limit with a safe 413 response', async () => {
    const response = await request(createApp()).post('/api/swipe')
      .send({ bio: 'x'.repeat(17000) })
    expect(response.status).toBe(413)
    expect(response.body).toEqual({ error: { code: 'BODY_TOO_LARGE', message: 'Request body exceeds 16kb' } })
    expect(response.text).not.toMatch(/PayloadTooLargeError|stack|node_modules/)
  })

  it('handles an unsupported JSON charset without leaking parser internals', async () => {
    const response = await request(createApp()).post('/api/swipe')
      .set('Content-Type', 'application/json; charset=unknown-test-charset').send('{}')
    expect(response.status).toBe(415)
    expect(response.body).toEqual({ error: { code: 'UNSUPPORTED_BODY', message: 'Unsupported request body encoding' } })
    expect(response.text).not.toMatch(/UnsupportedMediaTypeError|stack|node_modules/)
  })
})
