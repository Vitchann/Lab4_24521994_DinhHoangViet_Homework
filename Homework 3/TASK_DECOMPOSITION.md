Task Decomposition
Project
Esports Fair-Play Appeal Tribunal

U001 authorizes P3-01–P3-05 sequentially with individual verification and actual atomic commits. Stop after P3-05; later tasks remain pending.
P3-01 — Inspect and initialize setup
- [x] Complete and verify task.
Scope: Create isolated React/Vite and Express/Mongoose applications as needed; configure scripts, ignore rules, env template and docs.

Acceptance criteria: Packages install and scaffold is verified; no other projects modified.

Evidence / status: Complete 2026-11-25. Independent npm workspace installed 344 packages; React 19.3.1/Router 7.18.7/Mongoose 8.24.11 resolve. Frontend/backend each pass one scaffold test. Lint, Vite production build (16 modules), backend syntax and ignore probes pass. Other projects preserved. Evidence verification/P3-01-tests.txt; actual commit recorded in PROMPT_LOG.md after creation.
P3-02 — Product and domain contract
- [ ] Complete and verify task.
Scope: Define dossier, player, evidence, sanction, appeal, lifecycle, deadline and validation rules.

Acceptance criteria: Document relationships and assumptions; distinguish simulation from fact.

Evidence / status: Pending.
P3-03 — Simulation dataset
- [ ] Complete and verify task.
Scope: Prepare clearly labeled Himass/TanVuu demonstration records with stable IDs and no unsupported factual accusations.

Acceptance criteria: Validate fixture structure and simulation labeling.

Evidence / status: Pending.
P3-04 — Routing tests
- [ ] Complete and verify task.
Scope: Write failing tests for dynamic dossier routes, navigation and unknown IDs.

Acceptance criteria: Capture RED evidence before implementation.

Evidence / status: Pending.
P3-05 — Routing and dossier UI
- [ ] Complete and verify task.
Scope: Implement React Router v7, shared layout and semantic dossier view.

Acceptance criteria: Routing tests pass; deep links and 404 behavior verified.

Evidence / status: Pending.
P3-06 — Appeal form contract and RED tests
- [ ] Complete and verify task.
Scope: Define fields, validation rules and cross-field dependencies; test invalid and valid values.

Acceptance criteria: Document contract and capture failing tests.

Evidence / status: Pending.
P3-07 — Context form engine
- [ ] Complete and verify task.
Scope: Implement FormContext, SimpleForm, InputField and ShowData with synchronous validation.

Acceptance criteria: Validation tests pass; no useEffect validation waterfall.

Evidence / status: Pending.
P3-08 — Disproportionality matrix
- [ ] Complete and verify task.
Scope: Define illustrative weights/criteria, write tests and implement pure calculation and table.

Acceptance criteria: Expected calculations pass; assumptions shown in UI/docs.

Evidence / status: Pending.
P3-09 — SLA timer RED tests
- [ ] Complete and verify task.
Scope: Test absolute time delta, expiry, invalid input, visibility changes and cleanup with controlled time.

Acceptance criteria: Capture actual failing tests.

Evidence / status: Pending.
P3-10 — Zero-drift timer
- [ ] Complete and verify task.
Scope: Implement useAppealSlaTimer and countdown interface.

Acceptance criteria: Timer tests pass; no counter drift or leaked listeners.

Evidence / status: Pending.
P3-11 — API contract
- [ ] Complete and verify task.
Scope: Design dossier retrieval, appeal submission/status endpoints, deadline authority, validation and duplicate handling.

Acceptance criteria: Document HTTP examples and failure cases.

Evidence / status: Pending.
P3-12 — MongoDB models and seed
- [ ] Complete and verify task.
Scope: Implement Mongoose models, indexes, safe configuration and simulation seed.

Acceptance criteria: Schema/seed checks recorded; real DB verification separate.

Evidence / status: Pending.
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
