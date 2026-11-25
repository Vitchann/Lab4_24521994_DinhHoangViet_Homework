import { createRequire } from 'node:module'

// Reuse this project's installed frontend tooling; no duplicate lint dependencies.
const requireTool = createRequire(new URL('../frontend/package.json', import.meta.url))
const js = requireTool('@eslint/js')
const globals = requireTool('globals')

export default [
  { ignores: ['node_modules/**', 'coverage/**', 'dist/**'] },
  { ...js.configs.recommended, files: ['**/*.js'], languageOptions: { globals: globals.node } },
]
