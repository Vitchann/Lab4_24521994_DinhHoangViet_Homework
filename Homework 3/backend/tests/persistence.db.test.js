import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createTestDatabase } from './helpers/database.js'
import { validAppeal } from './helpers/appeal.js'
import { connectDatabase } from '../src/config/database.js'
import { createApp } from '../src/app.js'
import { seedDatabase } from '../src/seed.js'

describe.skipIf(process.env.RUN_MONGODB_TESTS !== '1')('real persistence across connections and app recreation', () => {
  let database, reopened
  beforeAll(async () => { database = await createTestDatabase(); await seedDatabase(database.models) })
  afterAll(async () => { await reopened?.connection.close(); await database?.cleanup() })
  it('returns 503 after disconnection then restores the same stored status after reconnect', async () => {
    const app = createApp({ models: database.models, now: () => Date.parse('2026-11-26T12:00:00.000Z') })
    const before = await request(app).post('/api/dossiers/sim-himass/appeals').send(validAppeal()).expect(201)
    await database.connection.close()
    expect((await request(app).get('/api/dossiers').expect(503)).body.error.code).toBe('DATABASE_UNAVAILABLE')
    reopened = await connectDatabase(database.uri)
    const restarted = createApp({ models: reopened.models })
    const restored = await request(restarted).get('/api/dossiers/sim-himass/appeal').expect(200)
    expect(restored.body.data).toEqual(before.body.data)
    expect(await seedDatabase(reopened.models)).toEqual({ inserted: 0, simulation: true })
    expect(await reopened.models.Appeal.countDocuments()).toBe(1)
    expect(await reopened.models.Evidence.countDocuments()).toBe(4)
  })
})
