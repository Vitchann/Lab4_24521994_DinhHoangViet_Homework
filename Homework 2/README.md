# Hẹn hò nhưng không yêu — Interactive Card-Swipe Deck

Current scope: P2-01–P2-08 completed. React 19 frontend offers a responsive card deck with fictional local profiles, button/keyboard/pointer controls, LIFO undo and derived score/history. Express remains a setup skeleton without application routes or a database connection.

## Local development

Use Node 24 (verified v24.18.0) and npm 11 (verified 11.16.0). Dependencies already exist in both packages. Run `npm.cmd ci` inside a package only on a fresh checkout or if dependencies need restoring. On Windows PowerShell use `npm.cmd` when policy blocks `npm.ps1`.

From the workspace root in PowerShell:

```powershell
cd 'Homework 2/frontend'
npm.cmd run dev
```

Open the Local URL Vite prints (normally http://localhost:5173). Existing dependencies are reused. **No backend, MongoDB or .env file is needed for this local demo.** Reloading resets history/score.

For future backend work, copy each package's `.env.example` to `.env` as needed. Frontend VITE variables are public; never put secrets in them. From `backend`, `npm.cmd run dev` or `npm.cmd start` launches the skeleton on port 3001 by default.

Backend reads PORT, CLIENT_ORIGIN and, in future persistence tasks, MONGODB_URI. The MongoDB URI is not consumed yet. Frontend VITE_API_BASE_URL is reserved for the future API client; no network integration exists yet.

## Checks

- Frontend: `npm.cmd test`, `npm.cmd run test:watch`, `npm.cmd run lint`, `npm.cmd run build`.
- Backend: `npm.cmd test`, `npm.cmd run test:watch`, `npm.cmd run check`.
- Backend test configuration is ready for separate `tests/unit`, `tests/integration` and `tests/database` suites. There are no backend behavior tests yet; until P2-11, plain backend `npm.cmd test` reports no tests and exits 1. Setup can be checked with `npm.cmd test -- --passWithNoTests`; that is not API or database coverage.
- Frontend Vitest defaults to jsdom with React Testing Library cleanup and jest-dom matchers. Pure domain tests select Node via a file annotation.

## Architecture and boundaries

- `frontend/src/domain/`: pure models, engine and selectors; no React state or HTTP dependencies.
- `frontend/src/test/`: reusable UI test setup.
- `frontend/src/App.jsx`: application shell; `components/`: reusable profile/deck/controls/score/history views.
- `frontend/src/data/profiles.js`: six fictional adults; `public/profiles/ASSETS.md`: original local SVG artwork provenance.
- `frontend/src/hooks/`: scoped keyboard and pointer gesture handling. State consists of history plus transient drag offsets; score/current card/progress are derived. Effects only manage focus-loss listeners and cleanup.
- `backend/src/app.js`: Express factory, independent of the listener and database.
- `backend/src/server.js`: environment and process lifecycle only.
- Future UI components, API client, routes, services and Mongoose models will be added in their assigned tasks, rather than scaffolding unused implementations now.

See `project-rules.md`, `TASK_DECOMPOSITION.md`, `PROMPT_LOG.md` and `AI_FAILURE_AUDIT.md` for rules, progress and actual verification. Session/domain contract is documented separately before implementation. No real matching, messaging, authentication or payments are included.

## Domain verification

Read [DOMAIN_CONTRACT.md](DOMAIN_CONTRACT.md) for models and pure engine interfaces. Domain tests cover swipe mappings, asymmetric scoring, frozen immutable inputs, LIFO undo, restored cards, completion and invalid inputs. Earlier runs: [RED: 47 failed](P2-03-RED.txt), [GREEN: 47 passed](P2-04-GREEN.txt). Current full suite: [99 passed](P2-08-GREEN.txt); frontend lint/build passed on 2026-11-24. P2-05–P2-08 each have actual RED/GREEN output files. Backend checks were performed in U001; no API/database behavior is claimed.

Backend setup smoke: from `backend`, run `node scripts/verify-setup.js`.

## Using the deck

- Buttons: Không thích (−5), Thích (+10), Bỏ qua (−5), Hoàn tác (remove latest decision).
- Tab to the deck/card or a control, then use ArrowLeft / ArrowRight / ArrowUp / Backspace. Held/repeat keys, editable elements and modified shortcuts are ignored. Shortcuts do not intercept keys elsewhere on the page.
- Drag the card left/right/up at least 50px using mouse or touch. The dominant axis wins; downward or equal diagonal movements are ignored. Release commits once; cancel, lost capture or browser focus loss resets the gesture. The card reserves touch movement for swipes; scroll the page outside it.
- Score and remaining card count derive from history. Undo restores the card and its original score contribution. At completion, swipes disable; undo remains available.

## Browser evidence and limitations

Headless Chrome screenshots at [375px](verification/P2-08-375.png), [768px](verification/P2-08-768.png) and [1440px](verification/P2-08-1440.png) were visually inspected. [Browser report](verification/P2-08-BROWSER.json) confirms no horizontal overflow, loaded portraits, visible focus, native keyboard/mouse, emulated touch and undo. Physical touchscreen, screen-reader, full accessibility audit and Lighthouse checks are not verified; later checklist tasks remain open.

Optional QA: with Vite running at 127.0.0.1:5173, run `node scripts/verify-browser.mjs` from frontend. Requires installed Chrome (default Windows path); override CHROME_PATH/PREVIEW_URL if necessary. This restricted environment required `$env:QA_NO_SANDBOX='1'` for the isolated local test renderer; the helper defaults to normal browser sandboxing. It closes its browser and leaves the temporary profile for OS cleanup. No browser dependency is installed.

Session state is in memory only; no authentication, matching, messaging, backend API integration or durable persistence. Stopped after P2-08; P2-09 onward remain pending.
