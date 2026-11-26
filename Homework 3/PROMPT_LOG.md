# Prompt log

Actual user messages are stored verbatim once. Generated task plans and executed development records are separate. Dates use Asia/Saigon; exact request receipt time was not provided. No backdated or invented history.

| ID | Date | Tasks | Actual prompt | Result |
| --- | --- | --- | --- | --- |
| U001 | 2026-11-25 | P3-01–P3-05 | Verbatim below | In progress; sequential task records follow. |
| U002 | 2026-11-25 | Pause | tôi ngắt bạn một chút, tí nx tôi prompt lại thì làm nhé | Paused immediately during P3-03 after the actual RED run; no task marked complete. |
| U003 | 2026-11-26 | Resume | continue to do | Resuming P3-03–P3-05 from existing commits/stubs/RED evidence; no repeated setup/install. |

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
