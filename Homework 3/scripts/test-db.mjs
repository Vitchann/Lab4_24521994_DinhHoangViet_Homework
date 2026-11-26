import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const result = spawnSync(process.execPath, [fileURLToPath(new URL('../node_modules/vitest/vitest.mjs', import.meta.url)), 'run', '--config', 'vitest.config.js'], { cwd: fileURLToPath(new URL('../backend', import.meta.url)), env: { ...process.env, RUN_MONGODB_TESTS: '1' }, stdio: 'inherit' })
process.exitCode = result.status ?? 1
