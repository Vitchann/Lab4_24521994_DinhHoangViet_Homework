import mongoose from 'mongoose'
import { afterAll, expect, it } from 'vitest'
import { createModels } from '../src/models/index.js'
import { simulation } from '../../frontend/src/data/simulation.js'

const connection = mongoose.createConnection()
afterAll(() => connection.close())
it('defines five strict schemas with unique business and duplicate-appeal indexes', () => {
  const models = createModels(connection)
  expect(Object.keys(models)).toEqual(['Player', 'Dossier', 'Evidence', 'Sanction', 'Appeal'])
  expect(models.Appeal.schema.indexes()).toContainEqual([{ dossierID: 1 }, expect.objectContaining({ unique: true })])
  expect(models.Dossier.schema.indexes()).toContainEqual([{ playerID: 1 }, expect.objectContaining({ unique: true })])
  expect(() => new models.Player({ ...simulation.players[0], unexpected: true })).toThrow()
})
it('accepts the validated synthetic seed records', async () => {
  const models = createModels(connection)
  for (const [name, entries] of [['Player', simulation.players], ['Dossier', simulation.dossiers], ['Evidence', simulation.evidence], ['Sanction', simulation.sanctions]]) {
    for (const entry of entries) await expect(new models[name](entry).validate()).resolves.toBeUndefined()
  }
})
it('rejects false simulation flags and invalid relationships/dates/lengths at schema level', async () => {
  const models = createModels(connection)
  await expect(new models.Player({ ...simulation.players[0], simulation: false }).validate()).rejects.toThrow()
  await expect(new models.Dossier({ ...simulation.dossiers[0], appealDeadline: '2026-01-01' }).validate()).rejects.toThrow()
  await expect(new models.Sanction({ ...simulation.sanctions[0], durationDays: -1 }).validate()).rejects.toThrow()
  await expect(new models.Evidence({ ...simulation.evidence[0], reference: 'https://invented.test' }).validate()).rejects.toThrow()
  await expect(new models.Appeal({ applicantName: 'x' }).validate()).rejects.toThrow()
})
