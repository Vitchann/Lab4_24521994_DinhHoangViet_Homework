# Prompt log

Each actual user message received while working on this project is appended verbatim once. The table records Codex results separately from user text. Agent-generated plans are development records, not user prompts. Times use Asia/Saigon (UTC+07:00); this request's exact receipt time was not supplied.

## Prompt / result table

| ID | Date | Tasks | User prompt | Codex result |
| --- | --- | --- | --- | --- |
| U001 | 2026-11-24 | P2-01–P2-04 | Full verbatim text below | Completed sequentially. RED 47 failed → GREEN 47 passed; lint/build and backend setup checks passed. Stopped at P2-04. |
| U002 | 2026-11-24 | P2-05–P2-08 | Full verbatim text below | Completed sequentially; 99 tests pass, lint/build pass, Chrome layout and input QA pass. Stopped after P2-08. |
| U003 | 2026-11-24 | Commit scope advice | giờ commit những j nhỉ | Inspected Git status: entire Homework 2 is untracked. Recommended committing the current P2-01–P2-08 project milestone with source, tests, assets, manifests/lockfiles, environment examples, docs and verification evidence. No staging, commit or push performed. |
| U004 | 2026-11-24 | Next-step advice | oke giờ làm j tiếp | Reviewed remaining checklist. Next task is P2-09 API/persistence contract; following backend range is P2-09–P2-12. Observed files staged, without a completed commit visible in status. No implementation/staging/commit performed. |
| U005 | 2026-11-25 | Progress recap | mình đã làm j r nhỉ | Confirmed P2-01–P2-08 complete; latest recorded suite 99 passed, lint/build and browser checks passed. P2-09 onward pending. Git shows staged project additions; no commit for Homework 2 returned by git log. |
| U006 | 2026-11-25 | Commit scope advice | giờ nên commit những j | Confirmed 73 staged Homework 2 files and unstaged prompt-log additions. Recommended the completed P2-01–P2-08 milestone, including source/tests/assets, configuration/lockfiles and documentation/verification evidence. No staging, commit or push performed. |

| User request | Task | Codex result | Actual verification |
| --- | --- | --- | --- |
| U001 | P2-01 | Setup, scripts, environment templates, modular Express factory and documentation | Dependency trees resolved; frontend lint/build; empty Vitest setup runs; Express/CORS smoke; ignore probes |
| U001 | P2-02 | Models and domain contract with accepted/rejected examples | Contract reviewed before tests/behavior; lint passed |
| U001 | P2-03 | Tests and deliberate stubs; corrected array fixtures before implementation | 47/47 failed, exit 1; P2-03-RED.txt |
| U001 | P2-04 | Immutable swipe/undo and derived score/current card/progress | 47/47 passed, exit 0; lint/build/backend setup passed; P2-04-GREEN.txt |
| U002 | P2-05 | Vietnamese shell, six fictional adults and local illustrations | RED 3 failed / 47 passed; GREEN 50 passed |
| U002 | P2-06 | Reusable components and button interactions, derived score/card | RED 7 failed / 50 passed; GREEN 57 passed |
| U002 | P2-07 | Scoped accessible keyboard interaction | RED 7 failed / 68 passed; GREEN 75 passed |
| U002 | P2-08 | Mouse/touch gestures and interruption/duplicate guards | RED 12 failed / 86 passed; extra blur RED 1 failed / 98 passed; final GREEN 99 passed; lint/build and Chrome QA passed |

## U001 — verbatim user prompt

```text
I am developing a full-stack web application named "Hẹn hò nhưng không yêu — Interactive Card-Swipe Deck".



The project is located in the "Homework 2" directory of the current workspace. The frontend and backend have been partially initialized.



Before implementation:

- Read project-rules.md and TASK_DECOMPOSITION.md.
- Inspect the existing codebase and dependencies.
- Create PROMPT_LOG.md and AI_FAILURE_AUDIT.md if they do not exist.
- Record this user prompt verbatim in PROMPT_LOG.md.

Execute tasks P2-01 through P2-04 sequentially.



**Project Setup and Architecture**

- Complete the existing React 19 and Express.js setup.
- Configure testing tools, environment variables and development scripts.
- Organize the source code using a modular architecture.
- Do not reinstall dependencies unnecessarily.

**Domain Modeling**

- Define Profile, SwipeAction and InteractionHistory models.
- Establish business rules and interface contracts.
- Map swipe left to DISLIKE, right to LIKE and up to SKIP.
- Define LIKE as +10 points and other swipe actions as -5 points.

**Test-Driven Development**

- Write failing unit tests before implementation.
- Test swipe operations, LIFO undo, asymmetric scoring, immutable updates, empty history and empty deck behavior.
- Execute the tests and record actual RED results.

**Core Implementation**

- Implement the swipe engine and score calculator.
- Implement LIFO undo using immutable history.
- Calculate the score and current card as derived state.
- Avoid redundant useState and useEffect synchronization.
- Execute all tests and resolve observed failures.

This request authorizes executing the specified task range sequentially, while preserving individual task verification and atomic development boundaries.



After each task, update TASK_DECOMPOSITION.md and append an actual development record to PROMPT_LOG.md.



Record real implementation failures in AI_FAILURE_AUDIT.md.



Stop after P2-04. Do not implement the complete frontend or backend API yet. Do not modify other projects or push to GitHub.



Report completed tasks, modified files, actual test results and remaining limitations.



nhớ làm 1 bảng các prompt và results của codex trong prompt_log, mỗi lần tôi gửi thì sẽ lưu vào log
```

## Development records

### P2-01 — inspection (2026-11-24)

- Read existing `project_rule.md` and `TASK_DECOMPOSITION.md`; inspected both manifests, frontend starter, configs and file inventory. Backend contained dependencies and manifests only.
- Node v24.18.0; npm 11.16.0. `npm.cmd ls --depth=0 --prefix frontend` and the equivalent backend command resolve all declared dependencies. No install was performed.
- Environment issue: PowerShell rejects `npm.ps1` under its execution policy. Use `npm.cmd`; no policy changes needed.
- Existing unrelated workspace modifications are outside this project's scope and will be preserved. No Git commit or push authorized.

### P2-01 — completed (2026-11-24)

- Added environment templates, safe project ignore rules, README, rules-name entry point, frontend Vitest/RTL setup and scripts, backend Vitest config, Express factory/server and setup smoke script. Preserved the React starter and lockfiles.
- Actual checks: frontend lint passed; Vite production build passed (20 modules); frontend/backend `test -- --passWithNoTests` exited 0 with no tests, setup verification only. Backend `run check` passed; `node scripts/verify-setup.js` passed Express response/CORS checks. `git check-ignore --no-index` confirmed .env, node_modules, dist and coverage ignored; `git ls-files --cached -- ../` from backend returned no tracked project files.
- Inline smoke command initially failed from Windows quoting; audit records correction and successful file-based rerun. No API routes, DB connection or UI features added.
- Suggested atomic commit (not executed): `chore: finish project setup and verification scripts`.

### P2-02 — completed (2026-11-24)

- Defined Profile, SwipeAction and InteractionHistory using JSDoc and frozen direction/points constants. Wrote DOMAIN_CONTRACT.md with API signatures, validation/error types, prefix/uniqueness invariants, immutable updates, LIFO undo, derived score/current card/progress, empty states and accepted/rejected examples.
- Reviewed contract against project rules: left DISLIKE/right LIKE/up SKIP, +10/-5/-5, caller-owned fixed-deck session; persistence and Mongoose schemas explicitly deferred. No engine behavior implemented yet.
- Actual verification: `npm.cmd run lint` passed; manual review confirmed required behaviors and examples are documented before tests.
- Suggested atomic commit (not executed): `docs: define swipe domain contracts and models`.

### P2-03 — completed, RED captured before implementation (2026-11-24)

- Added 47 Vitest cases covering all directions, scoring including negative totals, immutable frozen inputs, current card/progress, LIFO undo for each action, replacement after undo, empty/completed deck/history and invalid inputs/history prefix.
- Added exported throwing stubs only so imports resolve and RED is behavioral rather than a missing-module failure.
- Actual command from frontend: `npm.cmd test -- --reporter=verbose` (stdout/stderr captured to `P2-03-RED.txt`). First run: 47 failures. Reviewed fixture names/output and found it.each spread nested array inputs; corrected one-argument rows, then repeated before engine implementation: **1 test file failed, 47/47 tests failed, exit 1**, duration 1.41s. Failures include `Not implemented: swipe` and assertions expecting TypeError/RangeError. No import/module resolution failure.
- `AI_FAILURE_AUDIT.md` records the actual test-fixture defect and correction. Expected RED itself is not an accidental implementation failure.
- Suggested atomic commit (not executed): `test: capture red swipe domain behavior contracts`.

### P2-04 — completed, GREEN verified (2026-11-24)

- Replaced stubs with pure swipe, undo, calculateScore, getCurrentProfile and getProgress. Shared input validation rejects malformed profiles/actions, duplicate IDs and non-prefix histories. Uses immutable array spread/slice; score uses history.reduce; no React hooks or redundant score/card state introduced.
- Ran the unchanged corrected RED suite: `npm.cmd test -- --reporter=verbose`, captured stdout/stderr in `P2-04-GREEN.txt`: **1 test file passed, 47/47 tests passed, exit 0**, duration 513ms. No observed engine failures required a fix after implementation.
- Final checks: frontend `npm.cmd run lint` passed; `npm.cmd run build` passed (20 modules, 216ms). Backend `npm.cmd run check` and `node scripts/verify-setup.js` passed. Backend `npm.cmd test -- --passWithNoTests` exited 0 with no tests; this is runner setup evidence only, not API/persistence verification.
- Reviewed engine for reduce/slice and absence of useState/useEffect. Git status still shows unrelated work outside Homework 2; no changes were made there. `git diff --check -- "Homework 2"` returned clean, but project files are untracked so this check alone does not validate their whitespace.
- No dependencies reinstalled, lockfiles changed, commits made or GitHub pushes performed. Stopped at P2-04. UI controls, keyboard/pointer, API routes, Mongoose persistence, durable sessions, accessibility/layout and real database tests remain for P2-05 onward; Not Verified here.
- Suggested atomic commit (not executed): `feat: implement immutable swipe engine and derived selectors`.

### Files added or modified by this request

All paths relative to Homework 2; generated frontend/dist is ignored.

- Project: `.gitignore`, `project-rules.md`, `README.md`, `DOMAIN_CONTRACT.md`, `TASK_DECOMPOSITION.md`, `PROMPT_LOG.md`, `AI_FAILURE_AUDIT.md`, `P2-03-RED.txt`, `P2-04-GREEN.txt`.
- Frontend: `package.json`, `.env.example`, `vitest.config.js`, `src/test/setup.js`, `src/domain/models.js`, `src/domain/swipeEngine.js`, `src/domain/swipeEngine.test.js`.
- Backend: `package.json`, `.env.example`, `vitest.config.js`, `src/app.js`, `src/server.js`, `scripts/verify-setup.js`.

## U002 — verbatim user prompt

```text
Continue developing the "Hẹn hò nhưng không yêu" application.



Read project-rules.md, TASK_DECOMPOSITION.md and previous development records before making changes.



Record this user prompt verbatim in PROMPT_LOG.md.



Execute tasks P2-05 through P2-08 sequentially.



**Frontend Development**

- Build the main application layout.
- Create realistic fictional adult profile data.
- Implement reusable ProfileCard, SwipeDeck, SwipeControls, ScoreBoard and InteractionHistory components.
- Integrate the existing tested swipe engine.
- Display the current profile, remaining cards, interaction history and derived score.
- Implement empty-deck and empty-history states.

**UI/UX Design**

- Design a modern dating-inspired interface.
- Use a pink, purple, white and neutral color palette.
- Create a visually appealing card deck with smooth transitions.
- Use native CSS instead of unnecessary UI frameworks.
- Support desktop, tablet and mobile layouts.

**Keyboard Events**

- ArrowLeft: Dislike.
- ArrowRight: Like.
- ArrowUp: Skip.
- Backspace: Undo.
- Prevent unintended key-repeat actions.
- Avoid conflicts with editable input elements.
- Support visible keyboard focus and accessible controls.

**Pointer Events**

- Implement swipe gestures using pointerdown, pointermove, pointerup and pointercancel.
- Support mouse and touchscreen interactions.
- Apply a 50px gesture threshold.
- Handle horizontal and upward gestures.
- Prevent accidental swipes and duplicate actions.
- Reset gesture state correctly.

**Engineering Verification**

- Write relevant component and interaction tests before implementing each feature.
- Execute existing and new tests.
- Fix observed failures without weakening assertions.
- Verify that the score is calculated from interaction history rather than stored separately.

Update TASK_DECOMPOSITION.md and PROMPT_LOG.md after each task.



Document observed AI-generated implementation failures in AI_FAILURE_AUDIT.md.



Stop after P2-08. Use local demonstration data until backend integration is implemented. Do not modify other projects or push to GitHub.



Report actual test results and instructions for running the frontend.
```

### U002 — inspection before P2-05

- Read project-rules.md, task checklist, prior prompt records, audit, existing pure engine and frontend setup. The referenced project_rule.md is missing; restore the previously read rules directly into project-rules.md rather than keeping a broken reference.
- U002 authorizes sequential P2-05–P2-08 and supersedes U001's stopping boundary. Existing React/Vitest/RTL dependencies will be reused. Backend and other projects remain out of scope.
- Apply Sites skill's local-only workflow to the existing checkout; no registration, publication or source synchronization.

### P2-05 — completed (2026-11-24, U002)

- Wrote shell/fixture tests first. Initial run hit unresolved fixture import; supplied an empty fixture export as a RED contract and reran: 3 assertion failures, 47 existing tests passed, exit 1 (P2-05-RED.txt).
- Implemented Vietnamese app shell/metadata, native CSS palette, mobile breakpoints and reduced-motion rule. Added six frozen fictional adults and original SVG portraits, documented in public/profiles/ASSETS.md. No network assets/dependencies.
- GREEN command: npm.cmd test -- --reporter=verbose; 50 passed, exit 0 (P2-05-GREEN.txt). Updated task checklist before starting P2-06.
- Tooling observation: a combined delete/add patch for the same filename was rejected before application; split it into separate patches. No application/runtime defect resulted.
- Suggested commit, not executed: feat: add application shell and fictional profile fixtures.

### P2-06 — completed (2026-11-24, U002)

- Wrote seven component integration tests before implementing components. RED: 7 failed / 50 passed, exit 1 (P2-06-RED.txt).
- Added reusable ProfileCard, SwipeDeck, SwipeControls, ScoreBoard and InteractionHistory plus a small native SVG Icon component. Integrated the unchanged engine with functional immutable history updates. Score derives through calculateScore(history); current card/progress via selectors. Added live announcements, native disabled controls, remaining count and empty states.
- Native CSS provides a three-column desktop composition, two-column tablet view, single-column mobile view, local portrait cards, entry transitions and reduced-motion override.
- GREEN: npm.cmd test -- --reporter=verbose; 57 passed, exit 0 (P2-06-GREEN.txt). No implementation failures observed. Updated checklist before P2-07.
- Suggested commit, not executed: feat: integrate deck components and derived interaction state.

### P2-07 — completed (2026-11-24, U002)

- Added 18 keyboard cases before implementation: mapping, Backspace restoration, held/repeat suppression, focus scope, five editable contexts, four modifiers, focus-leave reset, native Enter and empty states. RED: 7 failed / 68 passed, exit 1 (P2-07-RED.txt); non-interception checks already passed while handlers were absent.
- Implemented useDeckKeyboard with refs for held keys, deck event handlers and window-blur cleanup. No document-wide shortcut interception. Inputs, textareas, selects, contenteditable ancestors, role=textbox, composition and modifiers are excluded. Deck is focusable with CSS focus outlines and ARIA keyboard hints.
- GREEN: npm.cmd test -- --reporter=verbose; 75 passed, exit 0 (P2-07-GREEN.txt). No implementation failures observed. Updated checklist before P2-08.
- Suggested commit, not executed: feat: add scoped accessible keyboard deck controls.

### P2-08 — completed (2026-11-24, U002)

- Wrote 23 pointer cases before implementation. RED: 12 failed / 86 passed, exit 1 (P2-08-RED.txt). Cases that merely reject gestures already passed with no handlers.
- Implemented useSwipeGesture: pointerdown/move/up/cancel/lost-capture, pointer capture, primary-button/ID guards, 50px inclusive threshold and dominant-axis mapping. Downward or exactly ambiguous diagonals do nothing. Final displacement determines the action. Reset before dispatch prevents duplicate releases; a history-reference revision guard invalidates drags when a button/keyboard operation changes history.
- Added transient drag offsets/animation only; history remains the single source for score/card/progress. No synchronization effect was introduced. useEffect is limited to browser focus lifecycle cleanup.
- Initial GREEN: 98 tests passed. Further interruption review found no window-blur cancellation. Added regression BEFORE repair: 1 failed / 98 passed, exit 1 (P2-08-BLUR-RED.txt). Added focus-loss cancellation and pointer-capture cleanup; unchanged regression and full suite now pass: **99/99 tests, 5 files, exit 0** (P2-08-GREEN.txt). Audit records the defect/cause/fix.
- Final commands: npm.cmd test -- --reporter=verbose; npm.cmd run lint; npm.cmd run build. All passed; build transformed 28 modules in 190ms. No new dependencies or lockfile edits.
- Started Vite with npm.cmd run dev -- --host 127.0.0.1 --strictPort; HTTP 200. Optional Node/CDP QA helper uses installed Chrome with isolated temporary profile, no browser dependencies. Initial renderer CDP requests timed out; browser-level protocol responded. QA_NO_SANDBOX=1 allowed this environment's headless renderer to run; application source was not changed to work around it.
- Browser QA rerun after the blur fix passed: viewport widths 375/768/1440, scrollWidth equals clientWidth (360/753/1425 respectively, excluding 15px scrollbar), all portrait images loaded, visible solid focus outline. Native CDP keyboard/right, mouse/left, emulated touch/up and Backspace undo produced expected derived scores. See verification/P2-08-BROWSER.json and three screenshots, all visually inspected. This is headless/emulated verification; physical touchscreen, screen reader, complete WCAG audit and Lighthouse are Not Verified.
- Updated checklist and README. Backend unchanged; local state resets on reload and no persistence/network integration exists. Stopped before P2-09; no commits or pushes.
- Suggested commit, not executed: feat: add guarded pointer swipes and interruption recovery.
- Final housekeeping: browser helper syntax check passed; final test output contained no warnings/act errors. Closed the owned headless QA browser and stopped the owned Vite preview session. The frontend can be restarted with the README command.

### Files added or modified by U002

All paths relative to Homework 2; no other project's files modified.

- Project docs: project-rules.md, TASK_DECOMPOSITION.md, PROMPT_LOG.md, AI_FAILURE_AUDIT.md, README.md.
- Frontend: index.html, README.md, src/App.jsx, src/App.css, src/index.css, src/App.test.jsx, src/data/profiles.js; components/Icon.jsx, ProfileCard.jsx, SwipeDeck.jsx, SwipeControls.jsx, ScoreBoard.jsx, InteractionHistory.jsx, SwipeDeck.test.jsx, keyboard.test.jsx, pointer.test.jsx (under src/components); src/hooks/useDeckKeyboard.js and useSwipeGesture.js.
- Local assets: frontend/public/heart.svg; frontend/public/profiles/{linh,minh,an,huy,mai,khoa}.svg and ASSETS.md.
- Verification: frontend/scripts/verify-browser.mjs; P2-05 through P2-08 RED/GREEN text outputs plus P2-08-BLUR-RED.txt; verification/P2-08-BROWSER.json and P2-08-{375,768,1440}.png. Frontend dist is generated/ignored.

## U003 — verbatim user prompt

```text
giờ commit những j nhỉ
```

### U003 — development record (2026-11-24)

- Read project rule header and prompt table; inspected git status --short --untracked-files=all -- "Homework 2" and git ls-files -- "Homework 2". Entire project is still untracked; no project files have been committed yet.
- Recommended one initial milestone snapshot for completed P2-01–P2-08. Include frontend/backend source and setup, domain/component/interaction tests, local assets, package manifests and lockfiles, .env.example, project docs/logs/audit and actual verification outputs/screenshots. Existing ignore rules exclude generated builds, node_modules, coverage and private .env files.
- Supplied scoped Git commands as advice only. No git add, commit or push was executed. No implementation change or test rerun was needed for this advice/documentation update.

## U004 — verbatim user prompt

```text
oke giờ làm j tiếp
```

### U004 — development record (2026-11-24)

- Read pending P2-09–P2-14 scope and inspected project Git status. Project files are staged as additions. Logging this message modifies the working copy of PROMPT_LOG.md after staging; include it with a fresh scoped git add before committing if desired.
- Recommended P2-09 next: define API requests/responses, identity/session scope, history/undo ordering and failure/reload consistency. Subsequent P2-10 models/seed, P2-11 real RED API tests and P2-12 GREEN Express API form the next backend milestone; frontend integration remains P2-13.
- Advice only: no backend code changes, tests, staging, commits or pushes performed. No task marked complete.

## U005 — verbatim user prompt

```text
mình đã làm j r nhỉ
```

### U005 — development record (2026-11-25)

- Read the current checklist and previous log; inspected git status and git log scoped to Homework 2. P2-01–P2-08 are complete; P2-09–P2-17 remain pending. Project files are staged additions; PROMPT_LOG.md also has unstaged updates. No project commit was returned by git log.
- Summarized completed setup/domain/frontend/keyboard/pointer work and the prior actual 99-test/lint/build/browser results. Tests were not rerun for this recap. No implementation, staging, commit or push performed.

## U006 — verbatim user prompt

```text
giờ nên commit những j
```

### U006 — development record (2026-11-25)

- Inspected project status and staged diff statistics: 73 Homework 2 files staged; PROMPT_LOG.md has newer unstaged entries. Recommend committing completed P2-01–P2-08 as the initial project milestone, with code/tests/assets, setup/lockfiles/environment examples, documentation/audit and actual verification outputs.
- Advise refreshing the staged prompt log before commit. No changes to implementation, no test rerun, and no staging/commit/push performed by Codex.
