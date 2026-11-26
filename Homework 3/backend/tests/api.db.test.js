import request from 'supertest'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { createApp } from '../src/app.js'
import { createTestDatabase } from './helpers/database.js'
import { validAppeal } from './helpers/appeal.js'
import { seedDatabase } from '../src/seed.js'
import { simulation } from '../../shared/data/simulation.js'

const base = '/api/dossiers/sim-himass'
describe.skipIf(process.env.RUN_MONGODB_TESTS !== '1')('REST API with real MongoDB', () => {
  let database, app
  beforeAll(async () => { database = await createTestDatabase(); await seedDatabase(database.models) })
  beforeEach(async () => {
    await database.models.Appeal.deleteMany({})
    app = createApp({ models: database.models, now: () => Date.parse('2026-11-26T12:00:00.000Z') })
  })
  afterAll(async () => { await database?.cleanup() })
  it('returns a normalized simulation snapshot without database internals', async () => {
    const response = await request(app).get('/api/dossiers').expect(200)
    expect(response.body.data).toEqual(simulation)
    expect(response.headers['cache-control']).toBe('no-store')
    expect(response.body).not.toHaveProperty('data.players.0._id')
  })
  it('resolves both individual dossiers and their owned evidence', async () => {
    for (const [index, playerID] of ['sim-himass', 'sim-tanvuu'].entries()) {
      const response = await request(app).get(`/api/dossiers/${playerID}`).expect(200)
      expect(response.body.data.player.playerID).toBe(playerID)
      expect(response.body.data.dossier).toEqual(simulation.dossiers[index])
      expect(response.body.meta.serverNow).toBe('2026-11-26T12:00:00.000Z')
      const evidence = await request(app).get(`/api/dossiers/${playerID}/evidence`).expect(200)
      expect(evidence.body.data).toEqual(simulation.evidence.filter((item) => item.dossierID === simulation.dossiers[index].dossierID))
    }
    expect((await request(app).get('/api/evidence/ev-hm-replay').expect(200)).body.data).toEqual(simulation.evidence[0])
  })
  it.each(['toString', 'SIM-HIMASS', 'bad$id'])('rejects malformed player ID %s', async (id) => {
    expect((await request(app).get(`/api/dossiers/${id}`).expect(400)).body.error.code).toBe('INVALID_ID')
  })
  it('returns stable JSON not-found errors for unknown valid IDs and resources', async () => {
    for (const path of ['/api/dossiers/sim-missing', '/api/evidence/ev-missing', '/api/missing']) expect((await request(app).get(path).expect(404)).body.error.code).toBe('NOT_FOUND')
  })
  it('returns null for an unsubmitted appeal and persists a valid server-owned submission', async () => {
    expect((await request(app).get(`${base}/appeal`).expect(200)).body.data).toBeNull()
    const response = await request(app).post(`${base}/appeals`).send(validAppeal()).expect(201)
    expect(response.body.data).toMatchObject({ dossierID: 'demo-001', playerID: 'sim-himass', status: 'SUBMITTED', submittedAt: '2026-11-26T12:00:00.000Z', simulation: true })
    expect(response.body.data).not.toHaveProperty('applicantEmail')
    expect(response.headers.location).toBe(`/api/appeals/${response.body.data.id}`)
    expect((await request(app).get(response.headers.location).expect(200)).body.data).toEqual(response.body.data)
    expect((await request(app).get(`${base}/appeal`).expect(200)).body.data).toEqual(response.body.data)
    expect(await database.models.Appeal.countDocuments()).toBe(1)
  })
  it.each(Object.keys(validAppeal()))('rejects missing required field %s', async (field) => {
    const payload = validAppeal(); delete payload[field]
    expect((await request(app).post(`${base}/appeals`).send(payload).expect(422)).body.error.fields).toHaveProperty(field)
    expect(await database.models.Appeal.countDocuments()).toBe(0)
  })
  it.each([
    ['applicantName', ''], ['applicantEmail', 'bad'], ['grounds', 'short'], ['acknowledged', false], ['authorized', 'true'],
    ['relationship', 'OTHER'], ['reason', 'OTHER'], ['requestedOutcome', 'PUNISH'], ['evidenceIDs', ['ev-tv-notice']], ['evidenceIDs', ['ev-hm-replay', 'ev-hm-replay']],
  ])('rejects invalid %s %j', async (field, value) => {
    const response = await request(app).post(`${base}/appeals`).send({ ...validAppeal(), [field]: value }).expect(422)
    expect(response.body.error).toMatchObject({ code: 'VALIDATION_FAILED', fields: { [field]: expect.any(String) } })
  })
  it.each([
    [{ relationship: 'REPRESENTATIVE' }, 'authorized'], [{ reason: 'NEW_EVIDENCE' }, 'evidenceIDs'], [{ reason: 'PROPORTIONALITY' }, 'requestedOutcome'],
  ])('enforces cross-field rules %j', async (patch, field) => {
    expect((await request(app).post(`${base}/appeals`).send({ ...validAppeal(), ...patch }).expect(422)).body.error.fields).toHaveProperty(field)
  })
  it('accepts authorized proportionality appeals with same-dossier evidence', async () => {
    await request(app).post(`${base}/appeals`).send({ ...validAppeal(), relationship: 'REPRESENTATIVE', authorized: true, reason: 'PROPORTIONALITY', requestedOutcome: 'REDUCE', evidenceIDs: ['ev-hm-replay'] }).expect(201)
  })
  it.each([0, 1])('enforces server deadline at/past expiry by %s ms', async (offset) => {
    app = createApp({ models: database.models, now: () => Date.parse(simulation.dossiers[0].appealDeadline) + offset })
    expect((await request(app).post(`${base}/appeals`).send(validAppeal()).expect(410)).body.error.code).toBe('DEADLINE_EXPIRED')
    expect(await database.models.Appeal.countDocuments()).toBe(0)
  })
  it('returns a duplicate status even if a repeat arrives after the deadline', async () => {
    const first = await request(app).post(`${base}/appeals`).send(validAppeal()).expect(201)
    app = createApp({ models: database.models, now: () => Date.parse('2027-01-01T00:00:00.000Z') })
    const duplicate = await request(app).post(`${base}/appeals`).send(validAppeal()).expect(409)
    expect(duplicate.body.error).toMatchObject({ code: 'DUPLICATE_APPEAL', appeal: first.body.data })
  })
  it('atomically allows only one of two concurrent valid submissions', async () => {
    const responses = await Promise.all([1, 2].map(() => request(app).post(`${base}/appeals`).send(validAppeal())))
    expect(responses.map((item) => item.status).sort()).toEqual([201, 409])
    expect(await database.models.Appeal.countDocuments({ dossierID: 'demo-001' })).toBe(1)
  })
  it('rejects payload injection, null/array bodies, wrong media type, malformed and oversized JSON', async () => {
    for (const payload of [{ ...validAppeal(), status: 'RESOLVED' }, [], {}]) await request(app).post(`${base}/appeals`).send(payload).expect(422)
    await request(app).post(`${base}/appeals`).type('text').send('hello').expect(415)
    expect((await request(app).post(`${base}/appeals`).type('json').send('{').expect(400)).body.error.code).toBe('INVALID_JSON')
    expect((await request(app).post(`${base}/appeals`).send({ ...validAppeal(), grounds: 'x'.repeat(33000) }).expect(413)).body.error.code).toBe('PAYLOAD_TOO_LARGE')
  })
  it('distinguishes malformed appeal IDs from valid missing UUIDs', async () => {
    expect((await request(app).get('/api/appeals/not-a-uuid').expect(400)).body.error.code).toBe('INVALID_ID')
    expect((await request(app).get('/api/appeals/00000000-0000-4000-8000-000000000000').expect(404)).body.error.code).toBe('NOT_FOUND')
  })
  it('rejects prototype-named unexpected fields as validation errors', async () => {
    const payload = Object.fromEntries([...Object.entries(validAppeal()), ['__proto__', 'unexpected']])
    expect((await request(app).post(`${base}/appeals`).send(payload).expect(422)).body.error.code).toBe('VALIDATION_FAILED')
    expect(await database.models.Appeal.countDocuments()).toBe(0)
  })
  it('returns a safe 400 for malformed URL percent encoding', async () => {
    expect((await request(app).get('/api/dossiers/%ZZ').expect(400)).body.error.code).toBe('INVALID_ID')
  })
})
