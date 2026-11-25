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
| U007 | 2026-11-25 | P2-15–P2-17 | Full verbatim text below | Completed sequential review/preparation for the local demo. Frontend 103 and backend skeleton 10 tests passed; lint/build, production audits, browser/environment/docs checks passed. Lighthouse not run. Full-stack release blocked by pending P2-09–P2-14. No commit/deploy/push. |
| U008 | 2026-11-25 | Atomic Git commits | Full verbatim text below | Preserved baseline; verified and committed actual frontend, backend and release-tooling groups. Final documentation checkpoint records this workflow and its own resulting hash through an attached local Git note. Automatic task commits authorized; no push/history rewrite. |
| U009 | 2026-11-25 | GitHub commit and push | Full verbatim text below | Explicit authorization to commit/push to the existing GitHub origin. Verified previous Homework 2 commits use Dinh Hoang Viet as author/committer with no AI co-author trailers; publication verification follows in final output/local Git note. |
| U010 | 2026-11-25 | Repeat P2-15–P2-17 review | Full verbatim text below | In progress: fresh review of the current committed demo; task commits authorized, no push authorized. |

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
| U007 | P2-15 | Focus/form fixes, typography/contrast, dead asset cleanup and responsive accessibility review | RED 3 failed / 100 passed; GREEN 103 passed; browser/visual checks passed |
| U007 | P2-16 | Safe Express errors, real skeleton tests, lint/environment/production verification | Backend RED 6 failed / 2 passed; final frontend 103 and backend 10 passed; both lint/audits and frontend build passed |
| U007 | P2-17 | Complete English release documentation and honest scope/limitations | Eight docs checked, no broken local links, nine required README sections, seven unique ordered prompt blocks, valid JSON evidence |

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

## U007 — verbatim user prompt

```text
Perform the final engineering review and release preparation of the "Hẹn hò nhưng không yêu — Interactive Card-Swipe Deck" application.



Read all project documentation and inspect the complete frontend and backend implementation.



Record this user prompt verbatim in PROMPT_LOG.md.



Execute tasks P2-15 through P2-17 sequentially.



**Code Review and Refactoring**

- Review the architecture and separation of concerns.
- Detect duplicated logic, redundant state and unnecessary useEffect usage.
- Detect race conditions, memory leaks and stale closures.
- Review keyboard and pointer event handling.
- Verify LIFO undo correctness and asymmetric score calculations.
- Review API validation, database consistency and security.
- Remove unused imports, dead code and deprecated APIs.

**UI/UX and Accessibility**

- Improve visual consistency, typography, spacing and card presentation.
- Verify responsiveness at 375px, 768px and desktop widths.
- Detect and resolve horizontal overflow.
- Verify keyboard navigation and focus visibility.
- Ensure icon-only buttons have accessible labels.
- Support reduced-motion preferences.
- Target WCAG 2.2 AA accessibility without claiming compliance based only on automated scores.

**Release Verification**

- Run all frontend and backend tests.
- Run lint checks.
- Run production builds.
- Verify environment variable configuration.
- Verify that node_modules, dist and secret .env files are excluded from Git.
- Check browser console and network errors if browser access is available.
- Run Lighthouse if supported by the environment; otherwise provide instructions for manual verification.
- Fix observed failures and rerun relevant tests.

**Documentation**\
Complete the following files in English:

- README.md
- project-rules.md
- TASK_DECOMPOSITION.md
- AI_FAILURE_AUDIT.md
- PROMPT_LOG.md

The README must include:

- Product overview.
- System architecture.
- Technology stack.
- Functional requirements.
- Directory structure.
- Business rules.
- REST API documentation.
- Database configuration.
- Installation instructions.
- Testing instructions.
- Actual test results.
- Known limitations.

The prompt log must contain actual user prompts and development records, clearly distinguishing user requests from agent-generated implementation tasks.



The AI failure audit must contain observed issues, root causes, verification evidence and corrective actions.



Do not fabricate test results, Lighthouse scores, Git commits or historical interactions.



Prepare appropriate atomic Git commit messages and provide commands for running and publishing the project.



Do not push to GitHub without my permission. Do not modify other projects.



Provide a final completion report covering implemented features, actual test results, build status, unresolved issues and startup commands.
```

### U007 — review intake (2026-11-25)

- Read project documentation and inspected source inventory. P2-01–P2-08 are implemented; backend still has only an Express factory/listener. P2-09–P2-14 have not been implemented. This request authorizes review/preparation P2-15–P2-17, not fabrication of missing API/database features.
- Working tree for Homework 2 was clean at intake; unrelated Homework 1 changes and Homework 3 files are preserved. No commit/push will be executed.
- Agent-generated implementation tasks: review and refine existing UI/input behavior (P2-15), run release/security/environment checks and repair observed defects (P2-16), then complete truthful English release documentation (P2-17).

### P2-15 — completed (2026-11-25, U007)

- Reviewed complete frontend source, domain contracts, test suites and styles. Domain state is immutable history only; card/progress/score derive from it. Input hooks have only focus-lifecycle effects, no state synchronization; history functional updates and gesture revision guard avoid stale decisions. Cleared active gesture ref before capture release on unmount to avoid reentrant lost-capture handling.
- Added four release accessibility regressions before behavior changes. RED: 3 failed / 100 passed (verification/P2-15-RED.txt). Observed failures: focused control becomes disabled at final swipe/undo; swipe button submits a containing form. Composition/default-prevented exclusion already passed. Added stable deck-ref focus restoration and explicit button type, preserving assertions. GREEN: 103 passed (verification/P2-15-GREEN.txt).
- Added skip navigation, increased utility text from 8–11px to 12px and profile body to 14px, darkened faint history/count/note text, increased Undo target to 46px, enabled long profile text wrapping. Removed unused Vite/React art, hero.png, icons.svg/favicon.svg and shell-placeholder CSS.
- Expanded local Sites-workflow QA helper with report prefixes, runtime/network diagnostics, first-Tab skip-link check, reduced-motion emulation and ten sampled text contrasts. Used existing local Chrome, QA_NO_SANDBOX=1 as previously required, no dependencies installed.
- Actual browser run: REPORT_PREFIX=P2-15 node scripts/verify-browser.mjs, exit 0; HTTP 200, native keyboard/mouse, emulated touch/undo, visible solid focus and loaded portraits passed. No console errors, exceptions, failed network loads or HTTP errors. 375/768/1440 screenshots visually inspected; scrollWidth=clientWidth at all sizes. Reduced motion: animation none, transition 0s; sampled text ratios 4.62–5.75. Evidence verification/P2-15-BROWSER.json and screenshots. No full accessibility compliance claim.
- Updated checklist before P2-16. Suggested atomic commit, not executed: fix: preserve deck focus and improve accessible presentation.

### P2-16 — verification completed with release limitations (2026-11-25, U007)

- Reviewed all existing backend source/configuration. Initial npm.cmd test failed with exit 1 because no tests existed (P2-16-backend-initial.txt). Added eight real Express-skeleton integration cases before hardening: RED 6 failed/2 passed, exit 1 (P2-16-backend-RED.txt). Existing parser failures exposed development HTML/stack diagnostics.
- Added centralized safe JSON error handling for 400/413/415/500 and explicit JSON 404 fallback, preserving the 16kb body limit and configured CORS origin. Future routes must be registered before the fallback; no business route/model/database implementation was added. Two unit cases additionally verify unexpected-error redaction and headers-sent delegation. Final backend: 10 tests/2 files passed, exit 0 (P2-16-backend-GREEN.txt).
- Added backend ESLint configuration reusing the existing frontend ESLint toolchain without new dependencies. npm.cmd run lint, npm.cmd run check and node scripts/verify-setup.js passed. Backend is unbundled native Node JavaScript; production build is not applicable, syntax/startup/HTTP checks were performed instead.
- Frontend release suite: 103 tests/6 files passed; lint passed including .mjs QA helpers; production build passed (28 modules, 302ms; HTML 0.69kB, CSS 11.08kB, JS 234.88kB, gzip JS 74.16kB). Outputs are in verification/P2-16-frontend-tests.txt, *-lint.txt and P2-16-build.txt.
- Added verify-environment.mjs: example configuration parses, invalid PORT=0 rejected, eight private/generated path probes ignored, .env.example stays trackable, no tracked .env/generated directories. No private environment values printed. MONGODB_URI and VITE_API_BASE_URL remain reserved/unconsumed; MongoDB connection Not Verified because no persistence code exists.
- Actual npm.cmd audit --omit=dev --json --fetch-retries=0 --fetch-timeout=15000 ran successfully for both packages, exit 0, each reports zero production vulnerabilities (verification/*-audit.json). This does not cover dev dependencies or establish complete security.
- Production preview served HTTP 200 at 127.0.0.1:4173. REPORT_PREFIX=P2-16 PREVIEW_URL=http://127.0.0.1:4173 QA_NO_SANDBOX=1 node scripts/verify-browser.mjs passed native keyboard/mouse, emulated touch/undo, focus/skip navigation, reduced motion, sampled contrast and three responsive widths. Diagnostics contain zero console errors, JS exceptions, failed network requests or HTTP errors. Evidence P2-16-BROWSER.json and screenshots.
- Lighthouse: no local package or command found. Global npm discovery also failed with ENOENT for the absent global npm directory; no install attempted. Lighthouse was not run and no score is claimed. Manual Chrome DevTools instructions will be provided in P2-17. Physical touch, screen readers, full WCAG audit, real MongoDB and end-to-end persistence remain Not Verified.
- git diff --check reported no whitespace errors (only local CRLF conversion notices). Updated task checklist before P2-17. No commit, deployment or push performed.
- Suggested atomic commit, not executed: test: harden Express errors and add release verification.

### P2-17 — completed (2026-11-25, U007)

- Rewrote the English README with product overview, actual system architecture/stack, functional requirements, directory tree, business rules, actual REST fallback/error documentation, reserved database/environment variables, fresh-checkout/local/production startup, testing commands and actual evidence. Clearly labeled missing P2-09–P2-14 work and full-stack release blockers.
- Updated project-rules.md to U007 scope and honest release policy; checklist keeps missing backend/integration tasks unchecked. Updated audit with real review findings/root causes/fixes/retests, prompt table with task outcomes, and frontend README to current results. Original user messages remain in their original language, verbatim; agent-generated task records are explicitly labeled.
- Prepared three atomic commit groups/messages plus GitHub/static-host/backend startup commands, without executing commit, push or deployment. Publishing uses only the verified static demo scope; backend deployment is labeled optional skeleton behavior.
- Added verify-docs.mjs for eight documentation files, local Markdown link existence, nine required README sections, one ordered verbatim block per dated prompt-table row and parseable JSON evidence. Actual run passed: no broken links; seven prompt blocks with current U007 once (verification/P2-17-doc-check.json).
- Tooling failure during documentation verification: first inline Node script piped through PowerShell matched zero Unicode-delimited prompt headings, failing 0 != 7. The same seven-block assertions passed when saved in a UTF-8 .mjs file. Then strengthened the persistent checker to compare unique ordered table IDs to verbatim blocks, so future actual prompts do not require hardcoded counts. Audit records this checker issue; no historical prompt was removed or invented.
- Normalized new P2-15/P2-16 text/JSON outputs from PowerShell's UTF-16 redirection to UTF-8 without changing their observed contents. JSON reports parse successfully; historical P2-03–P2-08 evidence remains unchanged.
- Suggested atomic commit, not executed: docs: record verified demo scope and release limitations.

### U007 — changed-file inventory and remaining limitations

- Frontend: App/controls/deck focus handling, pointer cleanup, native CSS/skip link, release accessibility tests, ESLint scope, browser/environment/docs helpers and frontend README. Removed five unused starter assets and unused placeholder CSS.
- Backend: app JSON fallbacks, middleware/errors.js, package scripts, ESLint configuration, eight HTTP-skeleton integration tests and two error-boundary unit tests. No business API/model/connection/seed code added.
- Documentation: README.md, project-rules.md, TASK_DECOMPOSITION.md, AI_FAILURE_AUDIT.md and PROMPT_LOG.md. Actual new outputs/screenshots/reports are under verification/P2-15-*, P2-16-* and P2-17-doc-check.json.
- Verified current demo: 103 frontend tests, 10 backend skeleton tests, both lint checks, native backend syntax/setup, Vite production build, environment/Git-ignore checks and zero reported production dependency vulnerabilities. Production-browser sampled flows passed without console/network errors. No full security/WCAG claim.
- Remaining blockers: P2-09–P2-14 absent; real API/database/reload persistence unverified. Lighthouse, physical touch, screen reader and complete accessibility/zoom audit not executed. No deployment/commit/push made. Other projects preserved.
- Final housekeeping: stopped both owned Vite dev/production-preview sessions; QA browsers were closed by the helper. Lockfiles are unchanged. A diagnostic whitespace check that forced core.autocrlf=false treated existing CRLF terminators as whitespace; the normal repository-configured git diff --check rerun exited 0. No source defect was inferred from the override-only result.

## U008 — verbatim user prompt

```text
Review the current Git repository and all uncommitted changes in the "Homework 2" project.



We have already progressed through the first three development phases, but the changes have not been properly committed.



**Git Workflow Requirements:**

1. Inspect git status, git diff, staged changes, untracked files, and existing commit history.
2. Read project-rules.md and TASK_DECOMPOSITION.md.
3. Group actual changes into logically related atomic commits.
4. Stage only the files or changes relevant to each commit.
5. Use Conventional Commit messages.
6. Execute the Git commits directly, rather than only suggesting commands.
7. Run relevant verification checks where possible.
8. Preserve all existing source code and functionality.

**Suggested commit categories:**

- Project initialization and configuration.
- Domain contracts and business rules.
- Unit tests.
- Swipe engine and LIFO undo.
- Frontend components and styling.
- Keyboard and pointer interactions.
- REST API contracts.
- MongoDB models and configuration.
- Express API implementation.
- Full-stack integration.
- Integration tests.
- Project documentation.

Adapt the commit breakdown to the actual changes in the repository.



**Restrictions:**

- Only commit changes related to Homework 2.
- Do not include node_modules, dist, secret .env files, or temporary files.
- Do not rewrite existing Git history.
- Do not backdate commits or fabricate development history.
- Do not create empty commits.
- Do not push to GitHub.

Save this actual request verbatim in PROMPT_LOG.md.



Record the actual commit hashes and messages in the development log. Update TASK_DECOMPOSITION.md based on verified implementation status.



After completion, show git log --oneline and git status.



From now on, create an atomic Git commit after completing each logically independent development task.
```

### U008 — inspection and commit plan (2026-11-25)

- Inspected complete status, staged diff (empty), unstaged diff, untracked inventory and existing history. Existing baseline e177567 (feat(homework-2): complete swipe deck through P2-08) already contains setup/domain/engine/initial UI/input work. Preserve it; no retrospective reconstruction/backdating.
- Read rules/checklist and reviewed actual changes. Planned commits: frontend accessibility/focus regression fixes; backend safe errors/skeleton tests; release browser/environment tooling and evidence; English documentation/workflow and documentation verification.
- P2-09–P2-14 remain unimplemented. No fake API/MongoDB/full-stack commits or checklist completions will be created. Other projects remain untouched.
- User explicitly authorizes executing scoped atomic commits now and after each future independent development task. No push or existing-history rewrite is authorized.

### U008 — verification and actual commit ledger

- Fresh verification before committing: frontend 103/103 tests, lint and production build passed (28 modules, 367ms); backend 10/10 tests, lint, syntax and Express/CORS smoke passed. Existing release screenshots/audits are preserved as prior actual evidence, not presented as newly executed browser/audit runs.
- `2fc519414d4582bcc8701c9bfc55371bfc1a0b23` — `fix(frontend): preserve deck focus and improve accessibility`. Committed 19 related frontend/test/P2-15-evidence paths; staged scope/source whitespace verified. Raw captured test outputs retain original terminal whitespace; they are permanent verification records, not temporary files.
- `f36f5b7ba3c6e61fe1340b39a1516132434dec27` — `fix(backend): sanitize request errors and test Express skeleton`. Committed 12 backend/test/P2-16-backend-evidence paths; no application success endpoints or persistence are claimed.
- `143a495ef5f72a30a512a94d2afdec9e3b5a4217` — `test(release): add browser and environment verification`. Committed 13 related lint/browser/environment/P2-16-evidence paths. Environment and documentation checks reran successfully; no private/generated paths tracked.
- Final documentation checkpoint message: `docs(homework-2): record release scope and atomic commit workflow`. A commit cannot embed its own resulting hash in its contents. Its actual full hash/message and the complete four-commit ledger are recorded after creation in the local Git note attached to that checkpoint, under `refs/notes/homework-2-development`. Read it with `git log --show-notes=homework-2-development -1 -- "Homework 2/PROMPT_LOG.md"`. Notes add metadata; they do not rewrite the existing branch commits. No note or branch was pushed.
- Checklist reviewed against source and tests: P2-01–P2-08 and P2-15–P2-17 complete for the local demo; P2-09–P2-14 remain unchecked. Updated standing rules to automatically create a scoped nonempty Conventional Commit after each future independent task.
- Documentation checker now finds eight ordered actual prompt blocks, current U008 once, nine required README sections and no broken local links. Backend persistence, Lighthouse and physical-device limitations remain as previously documented; no new claim of those checks.

## U009 — verbatim user prompt

```text
[https://github.com/Vietomato/Lab4_24521994_DinhHoangViet_Homework](https://github.com/Vietomato/Lab4_24521994_DinhHoangViet_Homework)

commit và push lên đây nhé, collaborator k có codex hay AI nào hết
```

### U009 — commit/push authorization and identity review (2026-11-25)

- Confirmed origin fetch/push URL is exactly the repository provided by the user. Current branch is main; existing pending changes in Homework 1 and untracked Homework 3 remain excluded.
- Inspected the five Homework 2 commits: author and committer are Dinh Hoang Viet <24521994@gm.uit.edu.vn>; commit bodies contain no Co-authored-by trailers or AI identity. Do not add Codex/AI co-author metadata or invite any collaborator. Preserve authentic development/audit records.
- User authorizes this commit and push. Refresh origin first, inspect outgoing commits and stage only the new Homework 2 prompt/workflow/doc-check updates. No force push or history rewrite. The resulting commit hash and actual push verification are recorded after execution in its local development Git note/final output, avoiding self-referential hashes in this file.
- Executed `0b441927c2a4ec79f8c17b1cc620d41bb8b426b9` — `docs(homework-2): record GitHub publication request`. Push succeeded (7131bd5..0b44192 main -> main); credential-enabled git ls-remote confirmed the same remote main hash. Author/committer is Dinh Hoang Viet <24521994@gm.uit.edu.vn>, with no AI identity/co-author trailer. No collaborator was invited.
- During the final status check, an additional Mandatory Git Workflow section appeared in project-rules.md. Preserved this newly saved content and included it in a separate scoped documentation follow-up under the same commit/push authorization, rather than overwriting it. Documentation checks rerun; other projects remain excluded. The follow-up's resulting hash/publication verification is recorded in its local Git development note and final output.


## U010 — verbatim user prompt

```text
Perform the final engineering review and release preparation of the "Hẹn hò nhưng không yêu — Interactive Card-Swipe Deck" application.



Read all project documentation and inspect the complete frontend and backend implementation.



Record this user prompt verbatim in PROMPT_LOG.md.



Execute tasks P2-15 through P2-17 sequentially.



**Code Review and Refactoring**

- Review the architecture and separation of concerns.
- Detect duplicated logic, redundant state and unnecessary useEffect usage.
- Detect race conditions, memory leaks and stale closures.
- Review keyboard and pointer event handling.
- Verify LIFO undo correctness and asymmetric score calculations.
- Review API validation, database consistency and security.
- Remove unused imports, dead code and deprecated APIs.

**UI/UX and Accessibility**

- Improve visual consistency, typography, spacing and card presentation.
- Verify responsiveness at 375px, 768px and desktop widths.
- Detect and resolve horizontal overflow.
- Verify keyboard navigation and focus visibility.
- Ensure icon-only buttons have accessible labels.
- Support reduced-motion preferences.
- Target WCAG 2.2 AA accessibility without claiming compliance based only on automated scores.

**Release Verification**

- Run all frontend and backend tests.
- Run lint checks.
- Run production builds.
- Verify environment variable configuration.
- Verify that node_modules, dist and secret .env files are excluded from Git.
- Check browser console and network errors if browser access is available.
- Run Lighthouse if supported by the environment; otherwise provide instructions for manual verification.
- Fix observed failures and rerun relevant tests.

**Documentation**\
Complete the following files in English:

- README.md
- project-rules.md
- TASK_DECOMPOSITION.md
- AI_FAILURE_AUDIT.md
- PROMPT_LOG.md

The README must include:

- Product overview.
- System architecture.
- Technology stack.
- Functional requirements.
- Directory structure.
- Business rules.
- REST API documentation.
- Database configuration.
- Installation instructions.
- Testing instructions.
- Actual test results.
- Known limitations.

The prompt log must contain actual user prompts and development records, clearly distinguishing user requests from agent-generated implementation tasks.



The AI failure audit must contain observed issues, root causes, verification evidence and corrective actions.



Do not fabricate test results, Lighthouse scores, Git commits or historical interactions.



Prepare appropriate atomic Git commit messages and provide commands for running and publishing the project.



Do not push to GitHub without my permission. Do not modify other projects.



Provide a final completion report covering implemented features, actual test results, build status, unresolved issues and startup commands.
```

### U010 — intake (2026-11-25)

- This is a new actual request with text identical to U007; the verbatim block above preserves that received text as a separate interaction. Inspected current history, rules, checklist and complete source inventory; Homework 2 was clean at intake. Read existing documentation and reviewed the unchanged domain/input/UI/Express implementation.
- Agent-generated task sequence: P2-15 repeat responsive/accessibility/input review; P2-16 fresh package tests/lint/build/environment/security checks; P2-17 English documentation refresh. Standing task-commit authorization applies; current request prohibits pushing. Other projects are preserved.

### U010 — P2-15 completed (2026-11-25)

- Re-reviewed domain validation/immutable history, derived selectors, UI components and scoped keyboard/pointer hooks. Existing functional updates, revision guard and focus-listener/capture cleanup remain valid; no new redundant state, synchronization effect or dead import was identified.
- Added 320px to the browser regression widths before changing styles. Actual RED exit 1: No horizontal overflow at 320px, actual scrollWidth=320 versus clientWidth=305 (classic scrollbar reduces available width). Evidence U010-P2-15-RED.txt.
- Removed the body's fixed 320px minimum, allowing the existing responsive layout to fit the available width instead of hiding overflow. Kept the browser assertion unchanged. GREEN: browser exit 0 at 320/375/768/1440, assets loaded, visible focus/skip navigation, reduced motion none/0s, ten sampled text contrasts >=4.5, native keyboard/mouse, emulated touch and undo passed; zero observed console/JS/network/HTTP errors. Screenshots visually inspected. Evidence U010-P2-15-BROWSER.json, GREEN.txt and four PNGs.
- Frontend component/domain/input suite passed 103 tests; frontend lint passed. Captured actual output in U010-P2-15-tests.txt. No WCAG compliance, physical-touch, screen-reader or full zoom audit claim. Updated checklist before P2-16 and create a scoped task commit under U008 authorization; no push.

### U010 — P2-16 completed (2026-11-25)

- Actual P2-15 commit: `62475be898b6473a4fcdedcc03f69d3acedc72ce` — `fix(frontend): prevent overflow at narrow viewport widths`. Created immediately after task verification; no push.
- Re-reviewed the complete Express factory/listener/error middleware and tests. No business API/MongoDB code was added since the previous review; safe JSON parsing limits/CORS/fallback behavior remain correct within the skeleton. API/database/reload consistency remains Not Verified, not silently marked complete.
- Current final frontend source passed 103 tests and lint in P2-15; no source changed afterward, so those results are reused without a redundant run. Fresh backend tests passed 10/10, backend lint and syntax passed, and the Express/CORS smoke script passed. Outputs: verification/U010-P2-16-backend-*.txt.
- Fresh frontend production build passed: 28 modules, 329ms; HTML 0.69kB, CSS 11.07kB, JS 234.88kB (gzip JS 74.16kB). No backend bundle build exists for native Node ES modules; verified syntax/runtime HTTP instead.
- Environment verifier passed: examples parse, invalid PORT rejects, private .env variants/dependency/build/coverage probes ignored, no forbidden tracked files. Reserved MONGODB_URI/VITE_API_BASE_URL still do not establish integration. Copied the current actual environment report to the U010 evidence namespace.
- Ran npm audit --omit=dev for both packages with no retries and a 15s fetch timeout: both exited 0 with zero reported production vulnerabilities. Development dependencies and full security assessment are outside these audit results. Captured fresh JSON reports.
- Production preview at 127.0.0.1:4173 served the new build; browser checks passed at 320/375/768/1440, including reduced motion, sampled contrast, visible focus, native keyboard/mouse, emulated touch and undo. No observed console/JS/network/HTTP errors. Evidence verification/U010-P2-16-BROWSER.json and screenshots. QA browser uses the previously documented isolated no-sandbox option in this restricted environment.
- Lighthouse rechecked: command/local package absent, no score/run claimed; manual DevTools steps remain documented. Physical touchscreen, screen reader, full WCAG/zoom audit and real database behavior are unverified. No dependencies reinstalled, no lockfile changes, no push. Updated task checklist before P2-17.
