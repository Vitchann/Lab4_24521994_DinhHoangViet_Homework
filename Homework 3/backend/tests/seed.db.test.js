import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createTestDatabase } from './helpers/database.js'
import { seedDatabase } from '../src/seed.js'
import { simulation } from '../../shared/data/simulation.js'

describe.skipIf(process.env.RUN_MONGODB_TESTS !== '1')('real MongoDB seed and indexes', () => {
  let database
  beforeAll(async () => { database = await createTestDatabase() })
  afterAll(async () => { await database?.cleanup() })
  it('seeds ten source records and reruns without extending deadlines or deleting data', async () => {
    expect(await seedDatabase(database.models)).toEqual({ inserted: 10, simulation: true })
    expect(await seedDatabase(database.models)).toEqual({ inserted: 0, simulation: true })
    expect(await database.models.Dossier.countDocuments()).toBe(2)
    const first = await database.models.Dossier.findOne({ dossierID: 'demo-001' })
    expect(first.appealDeadline.toISOString()).toBe(simulation.dossiers[0].appealDeadline)
  })
  it('has real unique indexes and refuses conflicting source records without overwriting', async () => {
    await expect(database.models.Player.create(simulation.players[0])).rejects.toMatchObject({ code: 11000 })
    const changed = structuredClone(simulation)
    changed.players[0].displayName = 'Conflict'
    await expect(seedDatabase(database.models, changed)).rejects.toThrow('Conflicting')
    expect((await database.models.Player.findOne({ playerID: 'sim-himass' })).displayName).toBe('Player Alpha')
  })
  it('detects nested timeline conflicts instead of silently accepting changed source data', async () => {
    const changed = structuredClone(simulation)
    changed.dossiers[0].timeline[0].description = 'Changed nested context'
    await expect(seedDatabase(database.models, changed)).rejects.toThrow('Conflicting')
  })
})
