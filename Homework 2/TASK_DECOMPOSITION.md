Task Decomposition
Project
Hẹn hò nhưng không yêu — Interactive Card-Swipe Deck

Inspect existing work before marking any task complete. U001 completed P2-01–P2-04. U002 authorizes sequential P2-05–P2-08 with individual verification; stop after P2-08.
P2-01 — Inspect and finish setup
- [x] Complete and verify task.
Scope: Inspect existing frontend/backend, verify dependencies and scripts, create safe ignore rules and documentation skeletons.

Acceptance criteria: Both packages install; scripts and environment template documented; no secrets tracked.

Evidence / status: Complete 2026-11-24. Both existing dependency trees resolve with npm.cmd ls; no reinstall. Frontend lint/build passed; both Vitest configs start with --passWithNoTests (0 tests, setup only). Backend syntax and Express/CORS smoke passed. Ignore probes passed; no tracked project files/secrets. See PROMPT_LOG.md. Suggested commit: chore: finish project setup and verification scripts.
P2-02 — Product and domain contract
- [x] Complete and verify task.
Scope: Define profile/action shapes, direction mapping, history invariants, score formula, deck completion and session scope.

Acceptance criteria: Document accepted/rejected examples and edge cases before implementation.

Evidence / status: Complete 2026-11-24. DOMAIN_CONTRACT.md and domain/models.js define models, session ownership, strict direction/action mapping, prefix history, immutable operations, derived selectors and accepted/rejected examples before behavior/tests. Manual contract review and frontend lint passed. Suggested commit: docs: define swipe domain contracts and models.
P2-03 — RED domain tests
- [x] Complete and verify task.
Scope: Write failing unit tests for swipe, immutable history, LIFO undo, score and empty states.

Acceptance criteria: Capture actual failing run; distinguish missing module from assertion failure.

Evidence / status: Complete 2026-11-24. 47 domain tests executed against throwing contract stubs BEFORE behavior implementation. Actual RED: 1 file failed, 47 tests failed, exit 1; errors are Not implemented and assertion failures, not missing modules. Corrected parameterized array fixtures and reran RED. Full output: P2-03-RED.txt. Suggested commit: test: capture red swipe domain behavior contracts.
P2-04 — GREEN swipe engine
- [x] Complete and verify task.
Scope: Implement pure domain logic and derived selectors.

Acceptance criteria: Domain tests pass; no redundant score state.

Evidence / status: Complete 2026-11-24. Pure engine validates models/history, appends immutable swipes and performs LIFO undo. Score uses history.reduce; card/progress derive from history. 47/47 tests passed (exit 0; P2-04-GREEN.txt). Frontend lint/build and backend syntax/Express/CORS smoke passed. Backend runner has no API/DB tests yet. Suggested commit: feat: implement immutable swipe engine and derived selectors. Stopped before P2-05.
P2-05 — Frontend shell and data
- [x] Complete and verify task.
Scope: Build app layout and fictional sample profiles for isolated UI development.

Acceptance criteria: App renders; fixtures use stable IDs and documented assets.

Evidence / status: Complete 2026-11-24. App shell, Vietnamese metadata, responsive CSS and six frozen fictional adult profiles with unique stable IDs/original local SVG portraits. Tests before implementation: 3 failed, 47 passed; after: 50 passed. Evidence P2-05-RED.txt/P2-05-GREEN.txt. Asset provenance in public/profiles/ASSETS.md. Suggested commit: feat: add application shell and fictional profile fixtures.
P2-06 — Card deck and controls
- [x] Complete and verify task.
Scope: Test and implement profile card, swipe buttons, progress, score and history UI.

Acceptance criteria: Actions and undo work via buttons; empty state is visible.

Evidence / status: Complete 2026-11-24. Reusable ProfileCard/SwipeDeck/SwipeControls/ScoreBoard/InteractionHistory components integrate unchanged pure engine; one history state, derived score/card/progress. Seven new tests failed before implementation, then all 57 passed. Covers each action, mixed-action LIFO undo and empty/completed deck. Evidence P2-06-RED.txt/P2-06-GREEN.txt. Suggested commit: feat: integrate deck components and derived interaction state.
P2-07 — Keyboard interactions
- [x] Complete and verify task.
Scope: Test and implement arrow and Backspace handlers, focus and repeat guards.

Acceptance criteria: Each shortcut produces the expected single action.

Evidence / status: Complete 2026-11-24. Deck-scoped ArrowLeft/Right/Up and Backspace, held-key/repeat guards, editable/modifier exclusions, focus/blur reset and ARIA shortcut hints. RED 7 failed / 68 passed; GREEN all 75 passed. Evidence P2-07-RED.txt/P2-07-GREEN.txt. Suggested commit: feat: add scoped accessible keyboard deck controls.
P2-08 — Pointer gestures
- [x] Complete and verify task.
Scope: Test and implement mouse/touch gestures, 50px threshold, up direction and cancellation.

Acceptance criteria: Short/cancelled gestures do not swipe; each valid gesture triggers once.

Evidence / status: Complete 2026-11-24. Pointer capture, 50px dominant-axis left/right/up gestures, ambiguous/downward rejection, pointercancel/lost-capture/window-blur cleanup, primary-pointer and history-revision guards. RED 12 failed / 86 passed; extra interruption regression 1 failed / 98 passed; final GREEN 99/99 passed. Lint/build passed. Headless Chrome verified native mouse/keyboard, emulated touch/undo, loaded local images and no horizontal overflow at 375/768/1440px; screenshots/report in verification/. Physical touch and screen-reader checks Not Verified. Suggested commit: feat: add guarded pointer swipes and interruption recovery. Stop here; P2-09 onward pending.
P2-09 — API and persistence contract
- [ ] Complete and verify task.
Scope: Specify GET /api/profiles, POST /api/swipe and proposed history/undo endpoints, validation, identity and failure semantics.

Acceptance criteria: Document request/response examples, status codes and reload/undo consistency.

Evidence / status: Pending.
P2-10 — MongoDB models and seed
- [ ] Complete and verify task.
Scope: Create Profile and Swipe schemas, constraints, indexes, connection module and seed script.

Acceptance criteria: Validate schema and seed behavior; real DB checks marked separately.

Evidence / status: Pending.
P2-11 — RED API tests
- [ ] Complete and verify task.
Scope: Write API tests for profiles, swipe validation, duplicate handling, history and undo.

Acceptance criteria: Capture actual failing test results before implementing routes.

Evidence / status: Pending.
P2-12 — GREEN Express API
- [ ] Complete and verify task.
Scope: Implement routes, controllers/services, validation and error handling.

Acceptance criteria: API tests pass; Mongoose 8 uses async/await and environment URI.

Evidence / status: Pending.
P2-13 — Full-stack integration
- [ ] Complete and verify task.
Scope: Replace fixture mode with API client; handle loading, failure, duplicate prevention, reload and undo consistency.

Acceptance criteria: Verify client/server state consistency; no silent lost actions.

Evidence / status: Pending.
P2-14 — Integration and persistence tests
- [ ] Complete and verify task.
Scope: Test keyboard/pointer UI, scoring, undo and reload; run real MongoDB verification if available.

Acceptance criteria: Record actual test results and database verification status.

Evidence / status: Pending.
P2-15 — UI, responsiveness and accessibility
- [ ] Complete and verify task.
Scope: Refine styling, keyboard focus, reduced motion and mobile layout.

Acceptance criteria: Check 375/768/desktop, no overflow; record manual and automated checks.

Evidence / status: Pending.
P2-16 — Release verification
- [ ] Complete and verify task.
Scope: Run tests, lint, build and Lighthouse where available; repair observed issues.

Acceptance criteria: Report actual results and any unresolved blockers.

Evidence / status: Pending.
P2-17 — Documentation and handoff
- [ ] Complete and verify task.
Scope: Complete README, audit, task checklist and actual prompt log.

Acceptance criteria: Reproducible run instructions, evidence and suggested Git commit; no invented results.

Evidence / status: Pending.
