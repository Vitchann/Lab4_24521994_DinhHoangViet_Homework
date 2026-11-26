# Esports Fair-Play Appeal Tribunal

Isolated Homework 3 simulation workspace. **P3-01–P3-10 completed**, with actual task commits and verification. Overview, registry, dynamic dossiers, shared navigation, local Context appeal review, illustrative comparison matrix and absolute-deadline SLA countdown are implemented. Business API, identity and MongoDB persistence remain later tasks.

Use Node 24 and npm 11 (verified v24.18.0/11.16.0). From Homework 3 run `npm.cmd ci` on a fresh checkout only, then `npm.cmd run dev:frontend` (127.0.0.1:5174). In a separate terminal run `npm.cmd run dev:backend` (port 3002). Use `npm` on non-Windows systems. No backend/database is needed for local frontend fixtures.

Checks: `npm.cmd test`, `npm.cmd run lint`, `npm.cmd run build`, `npm.cmd run check:backend`. Root npm workspaces share development tools, while each app declares runtime dependencies. Root package-lock.json pins the installed tree. Backend runs native Node ES modules and does not have a fictitious bundling build step.

P3-01 verified React/DOM 19.3.1, Router DOM 7.18.7, Mongoose 8.24.11, Vitest 5.1.2 and Vite 8.3.8. Initial frontend/backend scaffold tests, lint/build and backend syntax passed. Actual task evidence and subsequent results are in PROMPT_LOG.md.

Backend .env.example contains PORT, CLIENT_ORIGIN and a reserved MONGODB_URI placeholder. Frontend VITE_API_BASE_URL is reserved/public, never a secret. MongoDB connection and seeding are not implemented. Do not mistake installed Mongoose or skeleton HTTP checks for persistence.

Architecture: frontend/src/domain (models, pure dataset/form validation, matrix and SLA calculations), data (deeply frozen simulation snapshot), context (form values/update contract), hooks (absolute-clock timer lifecycle), routing (Routes/Route tree), components (shared layout, dossier/form/matrix/timer views), pages (overview/registry/dossier/guide/404); backend/src (transport factory/listener only). App wraps the route tree in BrowserRouter; tests use the independently exported AppRoutes with MemoryRouter. Selection derives from useParams, not synchronized state/effects.

## Simulation boundaries and domain contracts

The user supplied Himass/TanVuu as inspiration labels. Synthetic Player Alpha/SIM-HM and Player Beta/SIM-TV use invented teams, roles, summaries, dates, references and outcomes. They are not factual dossiers about real people. Every page shows the simulation notice; evidence and sanctions reiterate their illustrative nature. No external evidence, actual footage or real sanction is asserted.

See [DOMAIN_CONTRACT.md](DOMAIN_CONTRACT.md) for Player/Dossier/Evidence/Sanction/Appeal models, relationships, lifecycle/deadline assumptions and interface acceptance. See [SIMULATION_DATA.md](SIMULATION_DATA.md) for provenance. All references use simulation:// identifiers displayed as text, not supposed source links. Original SVG icon/initial avatars use no external photographs, fonts or downloaded assets.

## Routes and components

| Route | Behavior |
| --- | --- |
| `/` | Overview with fixture-derived counts and dossier cards |
| `/dossiers` | Registry with accessible case links |
| `/dossier/sim-himass` | Synthetic Player Alpha dossier |
| `/dossier/sim-tanvuu` | Synthetic Player Beta dossier |
| `/dossier/:playerID` with unknown/invalid ID | Dossier not found, shared notice/navigation and recovery link |
| `/about` | Simulation boundaries and provenance guide |
| Missing ID or unknown route | Page not found within the shared layout |

DashboardLayout uses NavLink and Outlet. Nested dossier routes select with useParams. Reusable PlayerDossier, EvidenceList, SanctionSummary, CaseTimeline and SimpleForm compose each case page. Dates display in UTC; the countdown uses the absolute simulation deadline, not a server-authoritative submission window.

## Local review, matrix and timer

The dossier form shares values and functional updates through FormContext.js. InputField provides controlled, labeled inputs with hint/error associations; ShowData previews current values. SimpleForm calculates validation errors during render, stores no error state and uses no validation effect. Draft state is reset by a dossier key; editing clears the prior local review. Valid review generates an in-memory acknowledgment only, with no API request, appeal ID or durable submitted status.

Required fields: applicant name (2–80 trimmed characters), email (up to 254, simple format), relationship, reason, grounds (30–4000), requested outcome and simulation acknowledgment. Representatives must confirm authorization. New-evidence reasons require at least one unique same-dossier reference; proportionality requires REDUCE or REMOVE. Use fictional contact details. See [APPEAL_CONTRACT.md](APPEAL_CONTRACT.md) for exact contracts and accepted/rejected examples.

The overview matrix derives each row from dossier-linked sanctions and evidence. Arbitrary training weights: restriction 10 units/day, caution 5, baseline 40, reference credit 5 each capped at 3, statement context credit 10. Excess is max(0, load − baseline − reference credit − context credit); Alpha = 20, Beta = 0. All inputs and assumptions appear beside an accessible table. These values measure no real culpability or evidence quality and are not disciplinary judgments. Two cheap rows do not justify useMemo.

useAppealSlaTimer samples an absolute clock every second and on visible visibilitychange. Remaining milliseconds are max(0, deadline − Date.now()); callbacks never decrement a counter. Intervals/listeners are cleaned on unmount, including StrictMode. Invalid deadlines fail closed. The action is disabled at expiry and the submit handler checks a fresh timestamp even if the displayed tick was delayed. The timer has aria-live="off" to avoid second-by-second announcements. Tests control the clock; normal rendering may lag by one callback, but late local review is still rejected. Client clocks can be changed and are not security authority.

Direct access/reload requires SPA fallback: a static production host must serve frontend/dist/index.html for UI paths such as /dossier/sim-himass. Vite dev/preview fallback was verified. Unknown UI routes intentionally return HTTP 200 index.html and display a client-side 404 view; this is not server-side 404 status support.

## Run and verify

From the Lab4 workspace, frontend terminal:

```powershell
cd 'Homework 3'
npm.cmd run dev:frontend
```

Separate terminal from Lab4, optional backend skeleton:

```powershell
cd 'Homework 3'
npm.cmd run dev:backend
```

All checks, from Homework 3:

```powershell
npm.cmd test
npm.cmd run lint
npm.cmd run build
npm.cmd run check:backend
npm.cmd run preview --workspace frontend
```

Production preview is http://127.0.0.1:4174. It is a local check, not production hosting or a published Site. Optional existing-Chrome browser QA, in another terminal from Homework 3: `node scripts/verify-browser.mjs`. Override CHROME_PATH/PREVIEW_URL if needed. This restricted Windows environment required `$env:QA_NO_SANDBOX='1'` for its isolated headless QA renderer; default browser sandboxing is preserved unless explicitly requested. The helper closes its browser and leaves the temporary profile to OS cleanup; it installs no dependency.

## Actual verification

| Task/check | Observed result |
| --- | --- |
| P3-01 setup | 344 packages installed independently; frontend 1/backend 1 scaffold test passed; lint/build/backend syntax and ignore probes passed |
| P3-02 contracts | Manual contract review and lint passed before fixtures/routing |
| P3-03 fixture TDD | RED 16 failed/1 passed before implementation; GREEN 17 frontend passed; [resumed RED](verification/P3-03-resume-RED.txt), [GREEN](verification/P3-03-GREEN.txt) |
| P3-04 routing RED | **17 failed/16 passed**, assertion failures with resolved modules, before routing implementation; [actual output](verification/P3-04-RED.txt) |
| P3-05 final tests | **33 frontend tests passed / 3 files; 1 backend scaffold test passed**; [output](verification/P3-05-GREEN.txt) |
| P3-06 validation RED | 20 failed / 33 existing passed, exit 1; [output](verification/P3-06-RED.txt) |
| P3-07 Context form | RED 24 failed / 33 passed; GREEN 57 frontend + 1 backend passed; lint passed |
| P3-08 matrix | RED 5 failed / 57 passed; corrected an inconsistent test fixture, then 62 frontend + 1 backend passed; lint passed |
| P3-09 SLA RED | 22 failed / 62 existing passed, exit 1; [output](verification/P3-09-RED.txt) |
| P3-10 final tests | **88 frontend tests / 10 files + 1 backend scaffold test passed**, exit 0; [output](verification/P3-10-GREEN.txt). Includes delayed ticks, tab synchronization, StrictMode cleanup, cross-field validation, malformed Context, stale-clock late submission and matrix ownership/capping |
| P3-10 lint/build/syntax | All passed; [lint](verification/P3-10-lint.txt), [Vite production build](verification/P3-10-build.txt), [backend syntax](verification/P3-10-backend-syntax.txt) |
| P3-10 production Chrome | Nine direct routes, navigation/reload, native form typing/errors/focus/local review, stale-clock deadline rejection, reduced motion, no document overflow at 320/375/768/1440 and no console/JS/network/HTTP errors; [report](verification/P3-10-BROWSER.json). Mobile dossier and desktop overview screenshots inspected |
| P3-05 lint/build/syntax | Passed; Vite build 37 modules, HTML 0.63kB, CSS 14.75kB, JS 280.10kB (gzip JS 88.16kB), 312ms; actual command results recorded in prompt log |
| Production browser | Nine direct routes, in-app keyboard navigation without reload, dossier reload, one main landmark, reduced motion and no overflow at 320/375/768/1440 passed. No observed console/JS/network/HTTP errors; [report](verification/P3-05-BROWSER.json) |
| Visual review | [Desktop overview](verification/P3-05-overview-1440.png), [desktop dossier](verification/P3-05-dossier-1440.png), [mobile overview](verification/P3-05-overview-375.png), [tablet dossier](verification/P3-05-dossier-768.png) inspected |

The first P3-05 UI run failed one accessible-link-name assertion; corrected the decorative count without weakening the assertion. The browser helper first failed a quoting expression; repaired the helper and reran. [AI_FAILURE_AUDIT.md](AI_FAILURE_AUDIT.md) records actual causes and retests. [PROMPT_LOG.md](PROMPT_LOG.md) preserves actual prompts, paused/resumed work, commands and real commit hashes.

## Limits and next tasks

Stopped after P3-10. Local form review, matrix and countdown are simulation-only. No authentication, API business routes, Mongoose schema/connection/seed or persistence. GET /api/dossiers currently returns skeleton JSON 404; future API paths/contracts belong to P3-11 onward. MongoDB and VITE_API_BASE_URL remain reserved; installed libraries are not evidence of implemented persistence. No seed command exists yet. The fixed fixture deadlines expire on 5/6 December 2026; the local review action then correctly disables. Validation tests pin their clock instead of depending on when they run.

Browser QA is headless Chrome with limited visual/keyboard checks. Physical devices, screen readers, full WCAG audit, Lighthouse and real database behavior are Not Verified; no compliance/score claim. No deployment, GitHub push or history rewrite performed. Only Homework 3 is modified. Task commits use hw3 scope; the final commit's self-hash/full ledger is recorded in its attached local Git note, readable with `git log --show-notes=homework-3-development -1 -- 'Homework 3/PROMPT_LOG.md'`.
