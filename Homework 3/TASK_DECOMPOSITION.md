Task Decomposition
Project
Esports Fair-Play Appeal Tribunal

U001 completed P3-01 through P3-05; U004 completed P3-06 through P3-10. U005 authorizes P3-11 through P3-16 sequentially with individual verification and atomic commits. Stop after P3-16.
P3-01 — Inspect and initialize setup
- [x] Complete and verify task.
Scope: Create isolated React/Vite and Express/Mongoose applications as needed; configure scripts, ignore rules, env template and docs.

Acceptance criteria: Packages install and scaffold is verified; no other projects modified.

Evidence / status: Complete 2026-11-25. Independent npm workspace installed 344 packages; React 19.3.1/Router 7.18.7/Mongoose 8.24.11 resolve. Frontend/backend each pass one scaffold test. Lint, Vite production build (16 modules), backend syntax and ignore probes pass. Other projects preserved. Evidence verification/P3-01-tests.txt; actual commit recorded in PROMPT_LOG.md after creation.
P3-02 — Product and domain contract
- [x] Complete and verify task.
Scope: Define dossier, player, evidence, sanction, appeal, lifecycle, deadline and validation rules.

Acceptance criteria: Document relationships and assumptions; distinguish simulation from fact.

Evidence / status: Complete 2026-11-25. DOMAIN_CONTRACT.md and JSDoc models define five models, ownership/IDs, chronology/lifecycle/deadline assumptions, pure fixture interfaces, routing/deep-link/404 contracts and explicit non-factual simulation boundaries. Manual requirement review before fixture and route implementation; lint verification recorded in prompt log.
P3-03 — Simulation dataset
- [x] Complete and verify task.
Scope: Prepare clearly labeled Himass/TanVuu demonstration records with stable IDs and no unsupported factual accusations.

Acceptance criteria: Validate fixture structure and simulation labeling.

Evidence / status: Complete 2026-11-26. Two deeply frozen synthetic players/dossiers, four simulation evidence references and two demonstration sanctions; no real accusations or sourced findings. Validator checks labels, IDs/ownership, UTC chronology and sanction duration. Before implementation RED 16 failed/1 passed; after GREEN 17 frontend tests passed and lint passed. Provenance in SIMULATION_DATA.md; outputs verification/P3-03-*.txt.
P3-04 — Routing tests
- [x] Complete and verify task.
Scope: Write failing tests for dynamic dossier routes, navigation and unknown IDs.

Acceptance criteria: Capture RED evidence before implementation.

Evidence / status: Complete 2026-11-26. Resolvable route stub plus 16 routing cases and strengthened semantic app smoke test executed before implementation: 17 failures/16 existing fixture passes, exit 1. Tests cover MemoryRouter/default BrowserRouter deep links, nested layout retention, NavLink active state, both dossier IDs, case isolation, evidence/sanction/timeline, invalid IDs, missing/unknown routes and recovery. Failures are DOM assertions, not missing imports. Output verification/P3-04-RED.txt.
P3-05 — Routing and dossier UI
- [x] Complete and verify task.
Scope: Implement React Router v7, shared layout and semantic dossier view.

Acceptance criteria: Routing tests pass; deep links and 404 behavior verified.

Evidence / status: Complete 2026-11-26. React Router v7 Routes/Route/NavLink/Outlet/useParams, shared nested layout, dynamic dossier, registry/guide and both 404 states implemented. PlayerDossier/EvidenceList/SanctionSummary/CaseTimeline reusable semantic views. Final frontend 33/33 and backend scaffold 1/1 tests pass; lint/build/backend syntax pass. Production Chrome verifies nine direct routes, keyboard SPA navigation, dossier reload, no overflow at 320/375/768/1440 and reduced motion; screenshots visually inspected. Real API/appeal/SLA/persistence not implemented. Actual first failures/corrections in audit; evidence verification/P3-05-*. Stopped before P3-06.
P3-06 — Appeal form contract and RED tests
- [x] Complete and verify task.
Scope: Define fields, validation rules and cross-field dependencies; test invalid and valid values.

Acceptance criteria: Document contract and capture failing tests.

Evidence / status: Complete 2026-11-26. APPEAL_CONTRACT.md defines fields, cross-field validation, local review boundary, matrix assumptions and absolute-deadline contract. Actual pre-implementation frontend run: 20 new tests failed / 33 existing passed, exit 1. Resolvable functions throw explicit not-implemented errors. Evidence verification/P3-06-RED.txt.
P3-07 — Context form engine
- [x] Complete and verify task.
Scope: Implement FormContext, SimpleForm, InputField and ShowData with synchronous validation.

Acceptance criteria: Validation tests pass; no useEffect validation waterfall.

Evidence / status: Complete 2026-11-26. Context provider, reusable accessible fields, live ShowData and pure cross-field validation. Validation errors derived synchronously, no validation effect/state. Component RED: 24 failed / 33 passed including previous validation RED. GREEN: 57 frontend + 1 backend tests pass; lint passes. Local memory only; keyed dossier changes reset drafts. Evidence verification/P3-07-*.txt.
P3-08 — Disproportionality matrix
- [x] Complete and verify task.
Scope: Define illustrative weights/criteria, write tests and implement pure calculation and table.

Acceptance criteria: Expected calculations pass; assumptions shown in UI/docs.

Evidence / status: Complete 2026-11-26. Five matrix/table tests captured RED (5 failed / 57 passed). Pure dossier-linked calculations with explicit weights and accessible overview table; no redundant memoization/state. Final 62 frontend + 1 backend tests and lint pass. Initial test fixture date-field error fixed without changing expected results; audit/evidence P3-08-*.
P3-09 — SLA timer RED tests
- [x] Complete and verify task.
Scope: Test absolute time delta, expiry, invalid input, visibility changes and cleanup with controlled time.

Acceptance criteria: Capture actual failing tests.

Evidence / status: Complete 2026-11-26. 22 calculation/hook/form expiry tests executed before behavior: 22 failed / 62 existing passed, exit 1. Explicit stubs resolve; form failures assert missing timer, enabled invalid/late action and unwanted late receipt. Includes exact-boundary, invalid clock/deadline, delayed callback, visibility, replacement, explicit refresh and StrictMode cleanup. Evidence verification/P3-09-RED.txt.
P3-10 — Zero-drift timer
- [x] Complete and verify task.
Scope: Implement useAppealSlaTimer and countdown interface.

Acceptance criteria: Timer tests pass; no counter drift or leaked listeners.

Evidence / status: Complete 2026-11-26. Absolute-deadline calculation, hook, visible-tab resampling, cleanup and event-time submission gate implemented. First run 84 frontend + 1 backend passed. Four additional malformed-Context cases reproduced validation gaps, corrected without assertion changes. Final 88 frontend + 1 backend pass; lint, production build and backend syntax pass. Production Chrome verifies nine routes, native form review/expiry, focus, reduced motion and no document overflow at 320/375/768/1440; no console/network/JS/HTTP errors. Evidence verification/P3-10-*. Stopped here; P3-11 onward pending.
P3-11 — API contract
- [x] Complete and verify task.
Scope: Design dossier retrieval, appeal submission/status endpoints, deadline authority, validation and duplicate handling.

Acceptance criteria: Document HTTP examples and failure cases.

Evidence / status: Complete 2026-11-26. API_CONTRACT.md defines seven endpoints, schemas, strict payload/cross-field rules, server-time deadline, unique one-appeal-per-dossier guard, sanitized HTTP errors, DB startup/seed and frontend recovery boundaries before implementation. MongoDB service running and actual dedicated HW3 database ping passed.
P3-12 — MongoDB models and seed
- [x] Complete and verify task.
Scope: Implement Mongoose models, indexes, safe configuration and simulation seed.

Acceptance criteria: Schema/seed checks recorded; real DB verification separate.

Evidence / status: Complete 2026-11-26. Five strict Mongoose schemas, unique indexes, shared pure domain/fixture modules, dedicated URI connection and non-destructive seed. Schema RED 3 failed / 1 passed. Initial standard run 88 frontend + 4 backend passed (2 DB skipped); explicit real MongoDB run finally 7/7 passed, including repeat seed, unique index and nested-conflict checks. Actual main HW3 seed inserted 10 records. Lint passes. Evidence P3-12-*.
P3-13 — RED API tests
- [ ] Complete and verify task.
Scope: Write tests for dossier retrieval, valid/invalid appeals, expired deadlines and duplicates.

Acceptance criteria: Capture actual failing tests.

Evidence / status: Pending.
P3-14 — GREEN Express API
- [ ] Complete and verify task.
Scope: Implement API handlers and server-side deadline/validation checks.

Acceptance criteria: API tests pass; errors handled safely.

Evidence / status: Pending.
P3-15 — Full-stack integration
- [ ] Complete and verify task.
Scope: Connect dossier loading, form submission and status display to API; handle cancellation and failures.

Acceptance criteria: Verify valid/invalid submissions and reload persistence where DB available.

Evidence / status: Pending.
P3-16 — Integration and timer verification
- [ ] Complete and verify task.
Scope: Test routing, context form, matrix, SLA and API interactions together.

Acceptance criteria: Actual test results recorded; no claims based only on mock persistence.

Evidence / status: Pending.
P3-17 — UI, responsiveness and accessibility
- [ ] Complete and verify task.
Scope: Refine dashboard layout, labels, focus, validation feedback and reduced motion.

Acceptance criteria: 375/768/desktop checks and manual accessibility evidence.

Evidence / status: Pending.
P3-18 — Release verification
- [ ] Complete and verify task.
Scope: Run lint, tests, build and Lighthouse where possible; fix observed defects.

Acceptance criteria: Report real results and unresolved limitations.

Evidence / status: Pending.
P3-19 — Documentation and handoff
- [ ] Complete and verify task.
Scope: Finalize README, task checklist, AI audit and prompt log.

Acceptance criteria: Reproducible instructions and verified evidence; suggest commit, no push.

Evidence / status: Pending.
