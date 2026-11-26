import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { readFile, writeFile } from 'node:fs/promises'
import { createTestDatabase } from '../backend/tests/helpers/database.js'
import { seedDatabase } from '../backend/src/seed.js'
import { createApp } from '../backend/src/app.js'
import { connectDatabase } from '../backend/src/config/database.js'

// Uses a fresh guarded HW3 database, never existing user/demo appeals.
const database = await createTestDatabase()
let server, reopened
try {
  await seedDatabase(database.models)
  server = createApp({ models: database.models, clientOrigin: process.env.PREVIEW_URL || 'http://127.0.0.1:4174' }).listen(3002, '127.0.0.1')
  await new Promise((resolve, reject) => { server.once('listening', resolve); server.once('error', reject) })
  const code = await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, ['scripts/verify-browser.mjs'], { env: { ...process.env, QA_REPORT_PREFIX: 'P3-16' }, stdio: 'inherit', windowsHide: true })
    child.once('error', reject)
    child.once('exit', resolve)
  })
  assert.equal(code, 0, 'Browser verification must pass')
  const browser = JSON.parse(await readFile('verification/P3-16-BROWSER.json', 'utf8'))
  assert.equal(await database.models.Appeal.countDocuments(), 1)
  const stored = await database.models.Appeal.findOne({ id: browser.persistedID })
  assert.equal(stored.playerID, 'sim-tanvuu')
  assert.equal(stored.status, 'SUBMITTED')
  await new Promise((resolve) => server.close(resolve))
  server = null
  await database.connection.close()
  reopened = await connectDatabase(database.uri)
  const restored = await reopened.models.Appeal.findOne({ id: browser.persistedID })
  assert.equal(restored.status, 'SUBMITTED')
  assert.equal(restored.submittedAt.toISOString(), stored.submittedAt.toISOString())
  assert.equal((await reopened.models.Dossier.findOne({ playerID: 'sim-himass' })).appealDeadline.toISOString(), '2026-12-05T09:00:00.000Z')
  const report = { database: 'real MongoDB, isolated hw3_test_ database', browserAppealID: restored.id, actualAppeals: 1, status: restored.status, persistedAfterAllOriginalConnectionsClosed: true, originalFixedDeadlinePreserved: true, cleanup: 'runner closes its listener/connections and drops only its generated guarded test database', limitations: 'No public deployment, real disciplinary data or authentication. Existing main simulation database is untouched by browser QA.' }
  await writeFile('verification/P3-16-FULL-STACK.json', JSON.stringify(report, null, 2))
  console.log(JSON.stringify(report, null, 2))
} finally {
  if (server) await new Promise((resolve) => server.close(resolve))
  await reopened?.connection.close()
  await database.cleanup()
}
