import assert from 'node:assert/strict'
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = fileURLToPath(new URL('../../', import.meta.url))
const read = (relative) => readFileSync(path.join(root, relative), 'utf8')
const docs = ['README.md', 'project-rules.md', 'TASK_DECOMPOSITION.md', 'AI_FAILURE_AUDIT.md', 'PROMPT_LOG.md', 'DOMAIN_CONTRACT.md', 'frontend/README.md', 'frontend/public/profiles/ASSETS.md']
const brokenLinks = []
for (const file of docs) {
  for (const match of read(file).matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
    const target = match[1]
    if (/^(https?:|#)/.test(target)) continue
    if (!existsSync(path.resolve(root, path.dirname(file), target.split('#')[0]))) brokenLinks.push({ file, target })
  }
}
assert.deepEqual(brokenLinks, [])
const requiredSections = ['Technology stack', 'Functional requirements and business rules', 'System architecture', 'Directory structure', 'Installation and startup', 'Environment and database configuration', 'REST API: actual current behavior', 'Tests, lint and production checks', 'Known limitations and release blockers']
for (const heading of requiredSections) assert.ok(read('README.md').includes(`## ${heading}`), heading)
const log = read('PROMPT_LOG.md')
const promptRows = [...log.matchAll(/^\| (U\d+) \| \d{4}-\d{2}-\d{2} \|/gm)].map((match) => match[1])
const promptBlocks = [...log.matchAll(/^## (U\d+) — verbatim user prompt$/gm)].map((match) => match[1])
assert.ok(promptRows.length > 0)
assert.equal(new Set(promptRows).size, promptRows.length)
assert.deepEqual(promptBlocks, promptRows, 'Each actual prompt table row needs one ordered verbatim block')
const currentPrompt = promptRows.at(-1)
assert.equal(promptBlocks.filter((id) => id === currentPrompt).length, 1)
const jsonFiles = readdirSync(path.join(root, 'verification')).filter((name) => /^P2-(15|16)-.*\.json$/.test(name))
for (const name of jsonFiles) JSON.parse(read(`verification/${name}`))
const report = { documentsChecked: docs, brokenLinks, requiredReadmeSections: requiredSections.length, verbatimPromptBlocks: promptBlocks.length, currentPrompt, currentPromptOccurrences: 1, jsonEvidenceParsed: jsonFiles, scope: 'Documentation structure and local link/JSON checks; narrative reviewed manually in English. Original user language preserved verbatim.' }
writeFileSync(path.join(root, 'verification/P2-17-doc-check.json'), JSON.stringify(report, null, 2))
console.log(JSON.stringify(report, null, 2))
