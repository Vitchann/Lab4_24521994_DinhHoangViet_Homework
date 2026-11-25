# Project rules

The earlier `project_rule.md` is no longer present. This file now contains the project rules, preserving the requirements read during U001.

Current request U010 repeats the P2-15–P2-17 engineering review with fresh evidence. U008 still authorizes atomic commits after each independent task. U009's previous GitHub publication is complete; U010 does not authorize any new push. Do not add Codex/AI author or co-author metadata or invite collaborators. P2-09–P2-14 remain pending; do not claim a complete full-stack release. Keep changes inside Homework 2. No deployment, push, backdating, force push or existing-history rewrite is authorized for this review.

Append each new actual user prompt verbatim once to PROMPT_LOG.md and maintain its prompt/results table.

## Product and architecture

- React 19, Vite, JavaScript ES modules, native CSS, Express and Mongoose 8. Use React Router v7 only if routing is needed; avoid unnecessary dependencies.
- LEFT = DISLIKE, RIGHT = LIKE, UP = SKIP. LIKE +10, other recorded swipes -5. Undo removes the latest action, LIFO.
- Derive score using history.reduce and current card/progress from ordered profiles/history. Immutable updates; one source of truth; no redundant state/effect synchronization.
- Keyboard shortcuts scoped to the deck; ignore editable fields and repeats. Mouse/touch Pointer Events use a 50px threshold, explicit direction handling, cancellation and duplicate guards.
- Use fictional adult profiles and local or properly sourced assets. No real matching, messaging, authentication or payments.
- Separate UI, domain logic, API client and persistence. Stable identifiers; async/await; clean up effects and cancel obsolete reads when networking is introduced.
- Preserve future GET /api/profiles and POST /api/swipe. Document session identity/order, history/undo extensions, reload and failure semantics before persistence implementation. Independently validate server inputs, reject duplicate actions, never trust client score, and avoid leaking secrets/stack traces.

## Workflow and verification

- Inspect and preserve existing working code. Execute one authorized task at a time: contract → failing test → implementation → refactor. Run and record actual RED before behavior where feasible; use appropriate setup/documentation checks.
- After each logically independent development task, run relevant verification, update actual development records and create a nonempty Conventional Commit containing only related Homework 2 changes. U008 provides standing authorization for these scoped commits; do not ask again. Inspect the staged diff before every commit. Never include other projects, private .env files, generated builds/dependencies or temporary files. Never push without separate explicit permission.
- Use Vitest, React Testing Library and Supertest; separate unit/integration/database checks. Mocked tests do not verify real persistence. Run lint/build before release.
- Semantic HTML, accessible names, visible focus, keyboard controls, sufficient contrast, reduced motion; target WCAG 2.2 AA. Check 375px, 768px and desktop; fix overflow. Do not claim browser/manual verification that did not run.
- Include the 320px narrow reflow regression as well; a fixed body minimum must not force horizontal scrolling when classic scrollbars reduce available width. Do not hide overflow to pass checks.
- MongoDB URI belongs in environment variables. Provide placeholder .env.example; ignore .env, credentials, node_modules, dist and coverage. Never print or commit secrets.
- Maintain README.md, project-rules.md, TASK_DECOMPOSITION.md, AI_FAILURE_AUDIT.md and PROMPT_LOG.md. Update task status after verification, append real changes/commands/results/blockers, distinguish user prompts from generated subtasks.
- Record observed AI implementation failures with evidence, cause, correction and retest. Distinguish expected TDD RED and environment failures. Never invent test output, errors or checks; mark unexecuted checks Not Verified.
- At task completion report files, verification, limitations and actual commit hash/message. Log real hashes after committing; do not invent historical task boundaries. An explicitly authorized sequential task range may continue after each documented boundary.

## Release review policy

- Separate verified current behavior from planned REST endpoints and database work. Installed Express/Mongoose packages are not evidence of implemented API/persistence.
- Run both package test suites and lint checks. The frontend has a production Vite build; the backend runs native Node ES modules and needs syntax/startup checks rather than a fictitious bundle build.
- Backend lint intentionally reuses frontend development tooling. Install both packages' development dependencies before local verification; production backend startup does not require frontend tooling.
- Never suppress missing tests to claim coverage. Store actual RED/GREEN outputs and identify mock/unit, real HTTP skeleton and database checks separately.
- Record console/network observations from the tested browser flows. Sampled contrast and automated checks support a WCAG 2.2 AA target, not a compliance declaration. Physical assistive-technology checks and Lighthouse must be marked Not Verified unless executed.
- Record audit scope and execution date; a zero-vulnerability production dependency audit is not a complete security assessment.
- Preserve authentic earlier user prompts verbatim, including their original language, while keeping agent-authored documentation and development records in English.

## Mandatory Git Workflow

- Create an atomic Git commit after completing each
  logically independent development task.
- Run relevant tests before committing.
- Use Conventional Commit messages.
- Stage only relevant files.
- Record actual commit hashes in PROMPT_LOG.md.
- Do not fabricate or backdate commit history.
- Do not create empty commits.
- Never commit credentials or generated dependencies.
- Never push without explicit user permission.
