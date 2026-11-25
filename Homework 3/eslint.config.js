import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['**/node_modules/**', '**/dist/**', '.npm-cache/**', '**/coverage/**'] },
  { ...js.configs.recommended, files: ['**/*.{js,jsx,mjs}'], languageOptions: { globals: globals.node, parserOptions: { ecmaFeatures: { jsx: true } } } },
  { files: ['frontend/src/**/*.{js,jsx}'], languageOptions: { globals: globals.browser }, plugins: { 'react-hooks': reactHooks, 'react-refresh': reactRefresh }, rules: { ...reactHooks.configs.recommended.rules, ...reactRefresh.configs.vite.rules } },
]
