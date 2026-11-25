# Hẹn hò nhưng không yêu — frontend

React 19 + Vite + native CSS. From this directory run `npm.cmd run dev` and open the printed Local URL (normally http://localhost:5173). Dependencies are already installed. No backend or environment file is required for the local fictional demo.

Run `npm.cmd test`, `npm.cmd run lint` and `npm.cmd run build` for verification. Reviewed on 2026-11-25: 103 frontend tests passed; build/lint passed. The separate backend skeleton has 10 passing tests; business API/database integration remains unimplemented.

Use the buttons, focus the deck for ArrowLeft/Right/Up and Backspace, or drag a card left/right/up at least 50px. Reload resets the session. See [project README](../README.md), [domain contract](../DOMAIN_CONTRACT.md), [asset sources](public/profiles/ASSETS.md) and [development records](../PROMPT_LOG.md) for architecture, evidence and remaining work.

Production preview: `npm.cmd run preview -- --host 127.0.0.1 --port 4173 --strictPort` after building. Optional release QA scripts are `node scripts/verify-environment.mjs` and `node scripts/verify-browser.mjs`; browser configuration and limitations are documented in the project README. Publish only the built dist directory to a root-path static host after reviewing the release limitations.

U010 repeat review: fixed a body minimum-width overflow at 320px. Browser reflow checks now cover 320/375/768/1440; fresh frontend 103 tests, backend 10 tests, lint/build and production-browser checks pass. See the project README's latest review table and verification/U010-* evidence. Task commits are local; this review does not authorize a push.
