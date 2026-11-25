import assert from 'node:assert/strict'
import { execFileSync, spawnSync } from 'node:child_process'
import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../../', import.meta.url))
const git = (args) => execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim()
const parseExample = async (relative) => Object.fromEntries((await readFile(new URL(`../../${relative}`, import.meta.url), 'utf8')).trim().split(/\r?\n/).map((line) => line.split('=')))
const backend = await parseExample('backend/.env.example')
const frontend = await parseExample('frontend/.env.example')
assert.equal(backend.PORT, '3001')
assert.equal(new URL(backend.CLIENT_ORIGIN).origin, 'http://localhost:5173')
assert.equal(backend.MONGODB_URI, 'mongodb://127.0.0.1:27017/interactive_card_deck')
assert.equal(new URL(frontend.VITE_API_BASE_URL).origin, 'http://localhost:3001')
const ignoredPaths = ['frontend/.env', 'backend/.env', 'backend/.env.production', 'frontend/.env.local', 'frontend/node_modules/probe', 'backend/node_modules/probe', 'frontend/dist/probe', 'frontend/coverage/probe']
const ignored = git(['check-ignore', '--no-index', '--', ...ignoredPaths]).split(/\r?\n/)
assert.equal(ignored.length, ignoredPaths.length)
const tracked = git(['ls-files']).split(/\r?\n/)
const forbiddenTracked = tracked.filter((name) => /(^|\/)(node_modules|dist|coverage)\//.test(name) || /(^|\/)\.env($|\.)/.test(name) && !name.endsWith('/.env.example'))
assert.deepEqual(forbiddenTracked, [])
const examplesIgnored = spawnSync('git', ['check-ignore', '--no-index', '--', 'backend/.env.example', 'frontend/.env.example'], { cwd: root })
assert.equal(examplesIgnored.status, 1, 'Environment examples must remain trackable')
const invalidPort = spawnSync(process.execPath, ['src/server.js'], { cwd: new URL('../../backend/', import.meta.url), env: { ...process.env, PORT: '0', DOTENV_CONFIG_QUIET: 'true' }, timeout: 5000, encoding: 'utf8' })
assert.equal(invalidPort.status, 1)
assert.match(invalidPort.stderr, /PORT must be an integer between 1 and 65535/)
const report = { examplesValid: true, ignoredPaths: ignored, forbiddenTracked, examplesTrackable: true, invalidPortRejected: true, mongoConnection: 'Not Verified: MONGODB_URI is a reserved placeholder; no database code exists', secretNote: 'Filename/ignore checks only; no private environment values read or printed. This is not a comprehensive secret scan.' }
await writeFile(new URL('../../verification/P2-16-environment.json', import.meta.url), JSON.stringify(report, null, 2))
console.log(JSON.stringify(report, null, 2))
