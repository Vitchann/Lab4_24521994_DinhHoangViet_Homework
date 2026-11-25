import assert from 'node:assert/strict'
import request from 'supertest'
import { createApp } from '../src/app.js'

const app = createApp()
await request(app).get('/api/profiles').expect(404)
const response = await request(app).options('/api/profiles')
assert.equal(response.headers['access-control-allow-origin'], 'http://localhost:5173')
console.log('Setup smoke passed: Express responds; CORS configured; API remains pending.')
