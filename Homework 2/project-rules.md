# Project rules

The earlier `project_rule.md` is no longer present. This file now contains the project rules, preserving the requirements read during U001.

The current user request U002 explicitly authorizes P2-05 through P2-08 sequentially, with verification and documentation after each task. Stop after P2-08. Keep changes inside Homework 2 and do not commit or push without explicit permission.

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
- Keep atomic task boundaries and suggest conventional commits. Never commit/push without permission.
- Use Vitest, React Testing Library and Supertest; separate unit/integration/database checks. Mocked tests do not verify real persistence. Run lint/build before release.
- Semantic HTML, accessible names, visible focus, keyboard controls, sufficient contrast, reduced motion; target WCAG 2.2 AA. Check 375px, 768px and desktop; fix overflow. Do not claim browser/manual verification that did not run.
- MongoDB URI belongs in environment variables. Provide placeholder .env.example; ignore .env, credentials, node_modules, dist and coverage. Never print or commit secrets.
- Maintain README.md, project-rules.md, TASK_DECOMPOSITION.md, AI_FAILURE_AUDIT.md and PROMPT_LOG.md. Update task status after verification, append real changes/commands/results/blockers, distinguish user prompts from generated subtasks.
- Record observed AI implementation failures with evidence, cause, correction and retest. Distinguish expected TDD RED and environment failures. Never invent test output, errors or checks; mark unexecuted checks Not Verified.
- At task completion report files, results, limitations and suggested commit. An explicitly authorized sequential task range may continue after each documented boundary.
