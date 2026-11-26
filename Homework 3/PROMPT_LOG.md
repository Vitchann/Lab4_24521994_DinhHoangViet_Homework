# Prompt log

Actual user messages are stored verbatim once. Generated task plans and executed development records are separate. Dates use Asia/Saigon; exact request receipt time was not provided. No backdated or invented history.

| ID | Date | Tasks | Actual prompt | Result |
| --- | --- | --- | --- | --- |
| U001 | 2026-11-25 | P3-01–P3-05 | Verbatim below | Completed sequentially across pause/resume: setup/contracts/fixtures/routing RED/UI GREEN, actual hw3 commits. Stopped after P3-05; no push. |
| U002 | 2026-11-25 | Pause | tôi ngắt bạn một chút, tí nx tôi prompt lại thì làm nhé | Paused immediately during P3-03 after the actual RED run; no task marked complete. |
| U003 | 2026-11-26 | Resume | continue to do | Completed P3-03–P3-05 from existing state: frontend 33/backend scaffold 1 tests pass; lint/build/syntax and production-browser/deep-link checks pass. No other project changed or pushed. |
| U004 | 2026-11-26 | P3-06 through P3-10 | Verbatim below | Completed sequentially: contracts/RED, Context form, pure matrix, SLA RED and absolute-clock timer. Final 88 frontend + 1 backend tests, lint/build/syntax and production Chrome checks pass. Actual hw3 task commits; stopped after P3-10, no push. |
| U005 | 2026-11-26 | P3-11 through P3-16 | Verbatim below | In progress; sequential full-stack tasks with real verification and commits. |

## U001 — verbatim user prompt

```text
**Project Setup**

- Initialize React 19 and Vite frontend.
- Initialize Node.js and Express backend.
- Configure React Router v7, Mongoose 8, Vitest, React Testing Library and Supertest.
- Use JavaScript ES Modules and native CSS.
- Configure development scripts, environment variables and Git ignore rules.
- Establish a modular directory structure.

**Product and Domain Architecture**

- Analyze functional and non-functional requirements.
- Define Player, Dossier, Evidence, Sanction and Appeal domain models.
- Define system boundaries, business rules and data relationships.
- Document interface contracts and acceptance criteria.

**Demonstration Dataset**

- Prepare clearly labeled simulation data inspired by the Himass and TanVuu case study.
- Include player profiles, case summaries, evidence references and demonstration sanctions.
- Do not invent real-world accusations or present simulated disciplinary outcomes as verified facts.

**Routing Architecture**

- Write failing routing tests before implementation.
- Implement React Router v7 using Routes, Route, NavLink, Outlet and useParams.
- Implement shared navigation and nested layouts.
- Implement dynamic routing through /dossier/:playerID.
- Handle invalid player IDs and unknown routes.
- Support direct URL access and deep linking.

**Dossier Interface**

- Create reusable PlayerDossier, EvidenceList, SanctionSummary and CaseTimeline components.
- Use semantic HTML and responsive layouts.
- Create a professional esports dashboard foundation.

**Engineering Workflow**\
For each task:

1. Define the contract.
2. Write failing tests where applicable.
3. Implement the feature.
4. Execute tests.
5. Refactor and verify.
6. Create an actual atomic Git commit.

Use Conventional Commit messages with the hw3 scope.

Update TASK_DECOMPOSITION.md and PROMPT_LOG.md after each task. Record actual commit hashes, executed commands and verification results.

Document observed implementation failures in AI_FAILURE_AUDIT.md.

Do not fabricate test results or Git history.

Stop after P3-05. Do not implement the complete appeal form or backend API yet. Do not modify Homework 1 or Homework 2. Do not push to GitHub.

Report completed tasks, modified files, actual test results and commit history.



execute p3.01 to p3.05
```

## Development records

### Intake and P3-01 in progress

- Read TASK_DECOMPOSITION.md; project_rule.md was an existing empty file (0 bytes), and no app/dependencies existed. Added scoped rules reflecting this request. Other projects were not changed; existing Homework 1 modification preserved, Homework 2 dev servers left alone.
- Agent-generated sequence: setup/verify/commit P3-01; contract/commit P3-02; fixture tests/data/commit P3-03; actual routing RED/commit P3-04; routing/UI/GREEN/deep-link QA/commit P3-05. Stop there.
- Using Sites skill's local-only existing-checkout workflow; no hosting registration or publication. Chose native CSS and original code-native initials/icons, so no image service or external asset downloads are needed.
- Added isolated npm workspace manifests, frontend/backend scaffold/config, env examples and safe ignores. Ports 5174/3002 avoid Homework 2's 5173/3001. Started npm.cmd install --cache .npm-cache --no-audit --no-fund --fetch-retries=0 --fetch-timeout=20000; actual result pending.

### P3-01 — completed

- Install command completed: 344 packages added in 46s; no existing-project package or lockfile changed. Resolved React/React DOM 19.3.1, React Router DOM 7.18.7, Mongoose 8.24.11, Vitest 5.1.2 and Vite 8.3.8.
- Commands from Homework 3: npm.cmd test (frontend 1 passed; backend 1 passed), npm.cmd run lint (passed), npm.cmd run build (passed, 16 modules, 263ms), npm.cmd run check:backend (passed), npm.cmd ls react react-dom react-router-dom mongoose --depth=1 (resolved), git check-ignore --no-index for private .env/cache/dependencies/dist (all ignored).
- Actual test output: verification/P3-01-tests.txt. Setup used verification rather than fictional behavioral RED. No database/API behavior is claimed. Updated checklist and prepared chore(hw3): initialize isolated application workspace.

### P3-02 — contract completed

- P3-01 actual commit: 0740ff6d4a90bee005f6ccab072ced88b233e8c1 — chore(hw3): initialize isolated application workspace.
- Defined Player, Dossier, Evidence, Sanction and Appeal models plus route/dataset interfaces, stable-ID/relationship rules, UTC chronology/deadline boundaries, future appeal lifecycle/validation and explicit current/future system boundaries in DOMAIN_CONTRACT.md and JSDoc.
- Manually checked all requested domain/routing/data requirements. Reference names remain inspiration only; no research/factual allegation/sanction is asserted. Fixtures must use synthetic handles/local avatars and simulation:// references. No form/API implementation introduced.
- Documentation task uses contract review/lint rather than invented RED. Actual npm.cmd run lint passed (exit 0); checklist updated before fixture work.

## U002 — verbatim user prompt

```text
tôi ngắt bạn một chút, tí nx tôi prompt lại thì làm nhé
```

## U003 — verbatim user prompt

```text
continue to do
```

### Resume inspection (2026-11-26)

- P3-02 actual commit: 2761e43c83fb4870afdc3f53dbdbf7948c5f7840 — docs(hw3): define product and domain contracts.
- Re-read rules/checklist/log and inspected uncommitted fixture tests/stubs plus existing RED output. P3-01/P3-02 are complete; no dependency reinstall needed. Homework 1's pre-existing modification remains; Homework 2 clean and untouched.
- Original P3-03 RED ran before pause: 16 failed / 1 scaffold passed, exit 1. Failures include deliberate stubs/empty fixtures; invalid-fixture mutators could not run against empty arrays. Preserve original output; strengthen malformed-data assertions to require TypeError and capture a fresh pre-implementation RED.

### P3-03 — completed (2026-11-26)

- Fresh pre-implementation RED: npm.cmd run test --workspace frontend -- --reporter=verbose; 16 failed / 1 passed, exit 1 (P3-03-resume-RED.txt), including missing fixture/stub behavior. No missing-module failure was substituted for assertions; the original pre-pause output is retained too.
- Implemented deeply frozen simulation snapshot and safe ID lookup, plus pure dataset validation for identities, labels, relationships, UTC chronology, evidence provenance and demonstration sanction duration. SIMULATION_DATA.md documents synthetic provenance. No real-world evidence, allegations or disciplinary findings are asserted.
- Actual GREEN: same command, 17 tests passed / 2 files, exit 0 (P3-03-GREEN.txt). npm.cmd run lint passed. No accidental implementation failure observed. Checklist updated before routing test task.

### P3-04 — actual routing RED captured (2026-11-26)

- P3-03 actual commit: f9a55f8f6b6d3021e1d8f99d8bc022947098dc9e — feat(hw3): add validated simulation dossier fixtures.
- Added resolvable AppRoutes contract stub and 16 routing acceptance cases. Upgraded the initial generic text smoke assertion to a semantic named Simulation notice, preserving/strengthening its original intent for the final application.
- Tests require nested shared-layout retention, primary NavLink active state, registry navigation, both dynamic dossiers, correct case-specific evidence, demonstration sanction/timestamps, six invalid IDs, three unknown/missing paths, recovery, simulation guide and default BrowserRouter initial deep linking.
- Before any routing implementation: npm.cmd run test --workspace frontend -- --reporter=verbose, exit 1; **17 failed / 16 passed, 33 total**. All failures are missing expected UI/DOM assertions with resolved modules; existing fixtures still pass. Full output verification/P3-04-RED.txt. Intentional RED commit is requested by this task; no fabricated GREEN.

### P3-05 — completed (2026-11-26)

- P3-04 actual commit: f6129d7d5c59918d3bc72a0d29d8a223d9f27bfb — test(hw3): capture failing dossier routing contracts.
- Implemented BrowserRouter wrapper and independent AppRoutes using Routes/Route/NavLink/Outlet/useParams, shared dashboard layout, overview/registry/guide, dynamic dossier and explicit player/route 404 recovery. Reusable PlayerDossier, EvidenceList, SanctionSummary and CaseTimeline use frozen fixtures and derived route selection; no redundant state/effect synchronization.
- Added native CSS esports dashboard foundation with neutral synthetic avatars, visible focus/skip link, responsive side navigation/cards and reduced-motion override. Simulation notice is shared across all pages; per-case evidence/outcomes reiterate fictional provenance. No real allegation or disciplinary outcome asserted.
- First feature run: 1 failed / 32 passed (P3-05-first-failure.txt). The decorative registry count polluted its accessible name. Fixed aria-hidden on the badge and derived count from fixture size; tests unchanged.
- Final npm.cmd test: **33 frontend tests / 3 files passed, 1 backend scaffold test passed**, exit 0 (P3-05-GREEN.txt). npm.cmd run lint passed, npm.cmd run build passed (37 modules, 312ms; HTML 0.63kB, CSS 14.75kB, JS 280.10kB/gzip 88.16kB), npm.cmd run check:backend passed. No backend business behavior or real DB check claimed.
- Started npm.cmd run preview --workspace frontend at 127.0.0.1:4174. Added independent local Chrome/CDP QA helper. Its first run failed a nested-selector quoting expression (P3-05-browser-first-failure.txt), corrected the helper rather than weakening checks.
- QA_NO_SANDBOX=1 node scripts/verify-browser.mjs then passed nine direct routes, both dynamic IDs, invalid/missing paths and simulation guide; native Enter navigated internally without document reload; reloading the Beta deep link restored Beta. All eight overview/dossier width cases at 320/375/768/1440 had one main landmark and no horizontal overflow. Reduced motion none/0s; no observed console, JS, network or HTTP errors. Report P3-05-BROWSER.json and screenshots stored. Desktop overview/dossier, mobile overview and tablet dossier visually inspected.
- Browser helper lint passed after repair. Physical touch/screen-reader/Lighthouse/full WCAG and real persistence remain Not Verified. Static deployment requires documented index.html fallback; unknown UI routes show a client 404 with HTTP 200 SPA fallback.
- Updated checklist/README/audit before final task commit. Final message: feat(hw3): implement nested dossier dashboard and routing. The resulting self-hash and full actual five-task ledger are recorded after creation in its attached local Git development note, avoiding invented self-referential hashes. No push or history rewrite.

### Changed files / handoff

- Project docs/config/lockfile plus isolated frontend/backend npm workspaces. Domain models/validator, frozen data/provenance, route tests/tree, reusable components/pages/CSS and browser QA helper. Real outputs/screenshots under verification/.
- P3-06 onward remains unchecked; no appeal form, matrix, live SLA, business API or MongoDB persistence added. Homework 1/2 source and runtime processes were not modified by this work; pre-existing Homework 1 task-list modification preserved.
- Final document/evidence consistency check passed: seven documentation files, no broken local Markdown links, three actual prompt blocks, exactly P3-01–P3-05 checked and P3-06–P3-19 pending; parsed browser report and verified captured 33/1 test counts. Evidence verification/P3-05-doc-check.json. Owned preview stopped; QA browser closed. New P3-05 text captures normalized to UTF-8 without changing observed content.

## U004 — verbatim user prompt

```text
Continue developing the "Esports Fair-Play Appeal Tribunal" application.



Read project-rules.md, TASK_DECOMPOSITION.md and previous development records before making changes.



Record this actual user prompt verbatim in PROMPT_LOG.md.



Execute tasks P3-06 through P3-10 sequentially.



**Appeal Form Contract**

- Define appeal submission fields, business rules and validation requirements.
- Include applicant information, appeal reasons and supporting evidence references.
- Define required fields and appropriate cross-field validation rules.
- Write and execute failing validation tests before implementation.

**Context Form Engine**

- Implement FormContext.js.
- Implement SimpleForm.jsx.
- Implement reusable InputField components.
- Implement ShowData.jsx for reviewing form data.
- Share form values and update handlers through React Context.
- Calculate validation errors synchronously during render.
- Do not store redundant validation state.
- Do not use useEffect to synchronize form validation.
- Provide accessible labels, error descriptions and validation feedback.
- Prevent invalid submissions.

**Disproportionality Matrix**

- Define transparent demonstration scoring criteria for sanction comparisons.
- Implement matrix calculations as pure functions.
- Derive matrix values from dossier data.
- Use useMemo only where appropriate.
- Display comparison results in an accessible table.
- Document all scoring assumptions.
- Do not present simulated results as authoritative disciplinary judgments.

**SLA Timer Testing**

- Write failing unit tests for countdown calculations.
- Test active, expired and invalid deadlines.
- Test delayed interval execution.
- Test background-tab synchronization.
- Test interval and event-listener cleanup.

**Zero-Drift SLA Countdown**

- Implement the custom hook useAppealSlaTimer().
- Use an absolute deadline timestamp as the source of truth.
- Calculate remaining time using deadline - Date.now().
- Clamp remaining time to zero.
- Do not implement the timer by decrementing a counter every second.
- Resynchronize on visibilitychange.
- Clean up intervals and event listeners.
- Disable appeal submission after the deadline.

**Engineering Verification**

- Execute existing and new tests.
- Fix observed failures without weakening test assertions.
- Verify Context state management and derived validation.
- Verify that the SLA timer does not accumulate interval drift.

Create actual atomic Git commits after completing each logically independent task.



Update TASK_DECOMPOSITION.md, PROMPT_LOG.md and AI_FAILURE_AUDIT.md using actual development evidence.



Stop after P3-10. Use local demonstration data until backend integration. Do not modify other projects or push to GitHub.



Report implemented features, actual test results, commit hashes and unresolved limitations.
```

### U004 — intake (2026-11-26)

- Read project_rule.md (the existing canonical rules filename), TASK_DECOMPOSITION.md, domain contract and previous records; inspected clean Homework 3 state at baseline 30f2a7f. Existing unrelated Homework 1 modification remains untouched.
- Generated sequence: P3-06 contract/validation RED; P3-07 pure validation/Context form/GREEN; P3-08 matrix contract/RED/pure calculations/table/GREEN; P3-09 timer calculation/hook/cleanup/expiry RED; P3-10 absolute clock hook and form expiry/GREEN. One actual hw3 task commit after verification each time, no push.
- Existing dependencies reused; no backend integration or database behavior inferred. Domain fixture dates stay fixed, and all new outcomes/reviews remain explicitly local simulations.

### P3-06 development record (agent-generated task)

- Defined APPEAL_CONTRACT.md and 20 validation tests before behavior.
- Executed `npm.cmd run test --workspace frontend -- --reporter=verbose`: exit 1, 20 failed / 33 passed. Expected RED from explicit unimplemented draft/validator; existing tests remain green. Evidence: verification/P3-06-RED.txt.
- This task intentionally ends at RED; implementation follows in P3-07. No implementation defect observed in this task.

### P3-07 development record (agent-generated task)

- Previous task commit: b60c4a9 (test(hw3): define appeal validation contracts and capture red).
- Before UI implementation, `npm.cmd run test --workspace frontend -- --reporter=verbose` returned exit 1: 24 failed / 33 passed (P3-07-RED.txt).
- Implemented pure validation, Context values/handlers, accessible fields, synchronous derived errors, live review, local receipt reset on edit and keyed dossier draft reset. No API request or persistence.
- `npm.cmd test`: 57 frontend + 1 backend tests passed, exit 0 (P3-07-GREEN.txt). `npm.cmd run lint`: exit 0.
- Corrected P3-06 checklist: earlier scripted exact match did not handle CRLF. Verified replacement against actual task text.

### P3-08 development record (agent-generated task)

- P3-07 commit: 836a225 feat(hw3): implement accessible context appeal form.
- Defined transparent formula in APPEAL_CONTRACT.md before behavior. Wrote four pure tests and an accessible table test; frontend RED 5 failed / 57 passed, exit 1 (P3-08-RED.txt).
- Implemented dataset-validated pure matrix, linked by IDs, reference-credit cap, same-case statement credit and nonnegative result. Overview table shows every component and assumptions; two rows require no useMemo.
- Initial GREEN attempt: 1 failed / 61 passed frontend, backend 1 passed. Test fixture mistakenly changed endsAt rather than effectiveUntil and validator correctly rejected inconsistent dates. Corrected fixture property, preserved assertions; evidence P3-08-first-failure.txt.
- `npm.cmd test`: 62 frontend + 1 backend pass, exit 0 (P3-08-GREEN.txt). `npm.cmd run lint`: exit 0. No official judgment or backend behavior claimed.

### P3-09 development record (agent-generated task)

- P3-08 commit: 24f2f0f feat(hw3): add transparent demonstration sanction matrix.
- Added 13 pure absolute-time cases, 6 hook lifecycle/drift cases and 3 form deadline cases before timer implementation. Resolvable calculation/hook stubs and the existing form generated actual RED.
- `npm.cmd run test --workspace frontend -- --reporter=verbose`: exit 1, 22 failed / 62 passed (verification/P3-09-RED.txt). Late submit test confirms current form incorrectly accepts a valid draft after expiry; implementation belongs to P3-10.
- Captured all timing requirements, including hidden-to-visible resampling and identical callback removal in StrictMode. No production hook behavior implemented in this task.

### P3-10 development record (agent-generated task)

- P3-09 actual commit: 93ae0c9f3a92c9e1f4ececdd3cfd1b276bc396f6 test(hw3): capture absolute SLA and deadline interaction red.
- Implemented pure calculateSla and useAppealSlaTimer with a sampled absolute timestamp, a single interval, visible-tab resynchronization and matched cleanup. No decrementing counter or validation effect. SimpleForm checks a fresh timestamp before local review and fails closed at invalid/expired deadlines; timer output is not announced every second. Deadline shown with UTC date and time.
- Initial `npm.cmd test`: 84 frontend + 1 backend passed (verification/P3-10-first-run.txt), exit 0.
- Review found validator only partially checked Context shape. Added four malformed-context cases before correction; actual 4 failed / 84 passed, exit 1 (P3-10-context-first-failure.txt). Guard now verifies dossier evidence IDs and complete owned references, including null entries. All assertions retained. Form tests pin Date.now so fixed fixture deadlines do not make them time-dependent.
- Final `npm.cmd test`: 88 frontend tests across 10 files + 1 backend scaffold test passed, exit 0 (P3-10-GREEN.txt). `npm.cmd run lint`, `npm.cmd run build`, `npm.cmd run check:backend`: exit 0; outputs P3-10-lint.txt, P3-10-build.txt, P3-10-backend-syntax.txt. Final Vite build: 47 modules; JS 290.96 kB/gzip 91.51 kB, CSS 17.00 kB/gzip 4.35 kB.
- Started owned preview using `npm.cmd run preview --workspace frontend` on 127.0.0.1:4174. Ran `$env:QA_NO_SANDBOX='1'` then `node scripts/verify-browser.mjs`: exit 0. Production Chrome verifies nine direct routes, keyboard SPA navigation/reload, native form typing/error feedback/focus/local review and rejection of stale-clock late submit. No document overflow on overview/dossier at 320/375/768/1440. Reduced motion passes; no console, runtime, network or HTTP errors. Reports/screenshots use P3-10 prefix, preserving P3-05 evidence. Mobile dossier and desktop overview screenshots visually inspected. Browser and owned preview closed after verification.
- `git check-ignore` confirms node_modules, frontend/dist and backend/frontend private .env ignored. No secret/dependency/build artifact staged. Backend remains a skeleton, not an implemented API or database connection.
- Updated README, domain/draft contract, rules, task checklist, prompt table and failure audit from actual evidence. P3-11 onward remains pending; no other project modified by this work and no push. Existing Homework 1 checklist modification is preserved.

### U004 actual commit ledger

| Task | Actual hash | Conventional Commit |
| --- | --- | --- |
| P3-06 | b60c4a95596d1850a929bf212e6ab145dd681b9f | test(hw3): define appeal validation contracts and capture red |
| P3-07 | 836a225dba591c5d764f227d4cdc8ed4784b5145 | feat(hw3): implement accessible context appeal form |
| P3-08 | 24f2f0fe9d9d80aa1280c6ca4a599484145c33fc | feat(hw3): add transparent demonstration sanction matrix |
| P3-09 | 93ae0c9f3a92c9e1f4ececdd3cfd1b276bc396f6 | test(hw3): capture absolute SLA and deadline interaction red |
| P3-10 | Self-hash recorded after commit in refs/notes/homework-3-development | feat(hw3): implement zero-drift appeal deadline timer |

Each task used scoped `git add -- "Homework 3"` then an actual `git commit -m` with the message above. No empty commit, rewrite, backdate, co-author trailer or push. Read the final self-hash/ledger using `git log --show-notes=homework-3-development -1 -- "Homework 3/PROMPT_LOG.md"`. The note is actual local Git metadata written only after the commit exists.

Final documentation QA: initial unanchored heading-count check falsely matched both U004 verbatim and its intake subheading. Anchored level-two check passes: one full verbatim block with all six feature sections and correct opening/closing text. Requested task checkboxes verified. Actual user prompt content remains unchanged.

## U005 — verbatim user prompt

```text
Continue developing the "Esports Fair-Play Appeal Tribunal" full-stack application.



Read project-rules.md, TASK_DECOMPOSITION.md, PROMPT_LOG.md and the existing source code.



Record this actual user prompt verbatim in PROMPT_LOG.md.



Execute tasks P3-11 through P3-16 sequentially.



**REST API Contract**\
Design and document REST API endpoints for:

- Retrieving player dossiers.
- Retrieving individual player cases.
- Retrieving evidence.
- Submitting appeals.
- Retrieving appeal status.

Define request payloads, response schemas, validation rules, business constraints and HTTP status codes before implementation.



**MongoDB and Mongoose 8**

- Implement appropriate schemas for Player, Dossier, Evidence, Sanction and Appeal.
- Define relationships, constraints and indexes.
- Create a seed script with clearly labeled simulation data.
- Use process.env.MONGODB_URI.
- Provide .env.example.
- Exclude database credentials from Git.
- Avoid deprecated Mongoose callbacks and connection options.

**Backend Test-Driven Development**

- Write failing API tests using Supertest.
- Test valid and invalid player IDs.
- Test missing and invalid appeal fields.
- Test cross-field validation.
- Test expired appeal deadlines.
- Test duplicate appeal submissions.
- Test appropriate error responses.

**Express API Implementation**

- Implement routes, controllers, services and middleware.
- Use async/await and centralized error handling.
- Enforce validation independently on the server.
- Enforce appeal deadlines using server-side time.
- Prevent duplicate appeal submissions.
- Persist valid appeals and return appropriate submission status.

**Full-stack Integration**

- Replace local demonstration data with API-driven data.
- Integrate dynamic dossier routing with the backend.
- Connect the Context-driven appeal form to the submission API.
- Implement loading, error, empty and retry states.
- Use AbortController where appropriate.
- Prevent concurrent duplicate submissions.
- Display confirmation messages and persisted appeal status.
- Restore relevant persisted information after page reload.

**Integration Verification**

- Execute frontend and backend tests.
- Verify dynamic routing, form validation, matrix calculations and SLA countdown behavior.
- Verify successful and rejected appeal submissions.
- Verify MongoDB persistence using real database integration tests when available.
- Test network failures and invalid API responses.

If MongoDB is unavailable, document the blocker and complete all independent implementation tasks. Do not claim database verification has passed without executing it.



Create actual atomic Git commits after each logically independent task using Conventional Commit messages.



Update TASK_DECOMPOSITION.md, PROMPT_LOG.md and AI_FAILURE_AUDIT.md after each task. Record actual test results and commit hashes.



Stop after P3-16. Do not modify other projects or push to GitHub.



Report API endpoints, database architecture, actual test results, commit history and unresolved limitations.
```

### P3-11 development record (agent-generated task)

Read canonical project_rule.md, task decomposition, prompt/audit/contracts and existing sources at baseline 71dd0dc. Added project-rules.md entry point. Preserved pre-existing Homework 1 checklist modification. Defined seven REST endpoints, public status projection, strict draft validation, server-time acceptance, unique dossier duplicate policy and database/frontend verification contracts before implementation. Actual local MongoDB service is Running; a Mongoose createConnection/admin ping against the dedicated hw3_fair_play_simulation database passed (readyState=1), connection closed. Reviewed official Mongoose 8 unique-index/validation and Express 5 async-error documentation; links in API_CONTRACT.md. Contract review only in this task, no fabricated API tests.

### P3-12 development record (agent-generated task)

- P3-11 commit: 5059ed0 docs(hw3): define REST persistence and integration contracts.
- Added schema tests before behavior: `npm.cmd run test --workspace backend` RED 3 failed / 1 existing passed, exit 1 (P3-12-RED.txt).
- Implemented five strict schemas and index initialization, canonical shared fixture/domain modules (frontend re-exports preserve prior contracts), process.env.MONGODB_URI connection, safe seed CLI and explicit opt-in real database test runner. Test databases have generated hw3_test_ names verified before cleanup; no other databases are dropped.
- Initial `npm.cmd test`: 88 frontend + 4 backend passed, 2 database tests skipped; those skips are not database verification. `npm.cmd run test:db` then passed 6 tests on real local MongoDB.
- Inspection found flat JSON replacer seed comparison ignored nested timeline properties. Added a regression test before correction: 1 failed / 6 passed. Replaced comparison with recursive canonicalization; `npm.cmd run test:db` now 7/7 passed (P3-12-MONGO.txt); failure retained in P3-12-first-failure.txt.
- `$env:MONGODB_URI='mongodb://127.0.0.1:27017/hw3_fair_play_simulation'; npm.cmd run seed --workspace backend`: exit 0, inserted 10 simulation records. `npm.cmd run lint`: exit 0. No appeal records removed or fixed deadlines extended.

### P3-13 development record (agent-generated task)

- P3-12 commit: 2f756ea feat(hw3): add MongoDB schemas indexes and safe simulation seed.
- Wrote actual Supertest contracts against existing 404 scaffold before routes/services. `npm.cmd run test:db`: 37 failed / 8 passed across 5 files, exit 1 (P3-13-RED.txt). Real generated MongoDB test databases seeded and cleaned; all failures are HTTP/status assertions, not import failures. Existing schemas/seed tests remain green.
- Cases cover normalized datasets, both players/evidence, invalid and missing IDs, all ten required fields, invalid types and enums, cross-field dependencies, server deadlines, real duplicate index races, status projection, malformed/media/oversized bodies and safe async errors. No API implementation in this task.

### P3-14 development record (agent-generated task)

- P3-13 commit: 670720e test(hw3): capture REST API validation and persistence red.
- Implemented API layers and centralized sanitized errors, server-side complete/type/cross-field validation and acceptance time, same-case ownership, duplicate readback after E11000, public status privacy, JSON/media/body limits and no-store responses. Database connects/indexes initialize before listening on loopback. Environment examples align FE/dev/preview origins.
- `npm.cmd run test:db`: first run 45/45 passed against real MongoDB, exit 0 (P3-14-first-run.txt). Concurrent HTTP requests verify one 201/one 409 and one document.
- Updated former scaffold 404 test to an actually unknown route because /api/dossiers is now implemented; retained safe 404/code/header assertions. Dataset validator now permits the explicitly contracted fully empty snapshot while retaining ownership checks.
- `npm.cmd test`, `npm.cmd run lint`, `npm.cmd run check:backend` executed; standard test output P3-14-GREEN.txt. No accidental API implementation failure observed in this task.

### P3-15 development record (agent-generated task)

- P3-14 commit: c23dcd4 feat(hw3): implement validated persistent tribunal REST API.
- Added five transport and five routing/submission contracts before implementation. First attempt had a test-only relative import path error and executed no tests (P3-15-test-setup-failure.txt); fixed path and reran before behavior: actual RED 10 failed / 88 passed, exit 1 (P3-15-RED.txt).
- Implemented validated API client, abortable keyed resource hook, Context dataset provider, API-driven overview/registry/cases/matrix and empty/error/retry feedback. Removed production fixture imports. Form validation remains render-derived; only external submission/status errors are stored. Uses a synchronous in-flight ref, disabled pending controls, POST abort cleanup, persisted public status and readback after ambiguous failure.
- First integrated run: 17 failed / 81 passed (P3-15-first-run.txt): previous tests assumed synchronous fixture reads/local receipts. Migrated tests to await API readiness and assert actual persisted status/locked submitted form, preserving routing ownership, field errors and deadline assertions. One remaining test did not await appeal-status hydration: 1 failed / 97 passed (P3-15-timing-failure.txt). Added async act readiness; did not remove its stale-clock enabled-before-submit assertion.
- Final `npm.cmd test`: 98 frontend + 6 backend passed; 39 real database cases explicitly skipped by the standard command (P3-15-GREEN.txt). Prior explicit test:db result remains 45 real MongoDB passes; frontend transport tests use a documented mock, not database persistence evidence. `npm.cmd run lint` and `npm.cmd run build`: exit 0.
- Updated README with actual API, database/seed/startup commands and limitations. API calls persist simulated appeals only; no authentication or official decisions are implied.
