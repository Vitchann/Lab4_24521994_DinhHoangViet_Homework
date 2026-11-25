# AI failure audit

Record observed implementation failures with evidence, root cause, correction and retest. Expected TDD RED runs are tracked separately in PROMPT_LOG.md and are not accidental regressions.

## Environment observations

| Task | Evidence | Cause | Correction | Retest |
| --- | --- | --- | --- | --- |
| P2-01 | `npm --version` / `npm ls` raised PSSecurityException, UnauthorizedAccess | PowerShell blocks npm.ps1 | Invoke npm.cmd, preserving execution policy | npm.cmd 11.16.0; both dependency trees resolved successfully |

## Implementation failures

| Task | Observed failure | Root cause | Correction | Retest |
| --- | --- | --- | --- | --- |
| P2-01 | Inline `node --input-type=module -e` smoke command failed with `SyntaxError: Unexpected token '.'` | Windows command argument handling removed JS string quotes | Move verification into `backend/scripts/verify-setup.js` and execute the file | `node scripts/verify-setup.js` passed Express/CORS checks |
| P2-03 | First RED output labeled array fixtures as individual records; review found malformed-deck/history cases passed first array item, so prefix cases would test the wrong input | Vitest it.each spreads array rows into callback arguments | Wrap each array-valued fixture in a one-argument row using map | Re-run RED before implementing behavior; final evidence in P2-03-RED.txt |

## Final retest — P2-04

Corrected fixtures ran against stubs before implementation: 47 failed, exit 1. The same corrected tests then ran against the engine: 47 passed, exit 0 (P2-04-GREEN.txt). Frontend lint/build and backend syntax/Express/CORS smoke also passed. No engine implementation failures were observed during GREEN. No API or real database verification was performed.

## U002 — P2-05 through P2-08

| Category / task | Actual evidence | Cause | Corrective action | Retest |
| --- | --- | --- | --- | --- |
| Tooling / P2-05 | apply_patch rejected delete+add operations targeting App.jsx twice in one patch, before applying changes | Unsupported patch structure | Separate deletion and addition patches | App shell suite 50 passed; later lint/build passed |
| Environment / P2-08 | Headless Chrome opened debugging endpoint, but Page.enable and Runtime.evaluate timed out; browser-level Browser.getVersion responded | Renderer did not respond under the restricted environment's normal browser sandbox; diagnosis supported by successful local QA with sandbox disabled | Optional QA_NO_SANDBOX=1 for isolated local headless QA only; no application workaround or global browser setting change | verify-browser.mjs passed native input, screenshots and overflow checks; report records qaNoSandbox=true |
| Implementation / P2-08 | After the initial 98 passing tests, new focus-loss regression failed: expected zero history entries after window blur + release, received one (P2-08-BLUR-RED.txt) | Gesture ref survived window focus loss; pointercancel/lost capture alone did not cover interruption | Add window blur cancellation, clear drag/ref, release pointer capture, remove listener on unmount | Same assertion unchanged; final 99 passed, lint/build passed, browser QA rerun passed |

Expected feature RED runs are captured separately in the prompt log. P2-05 initial missing-fixture import was test scaffolding, followed by an actual assertion RED run before implementation. No other component/engine regressions were observed in U002. Physical touch, screen readers and real database behavior remain unverified.

## U007 — final review findings

| Task / category | Observed issue and evidence | Root cause | Corrective action | Verification |
| --- | --- | --- | --- | --- |
| P2-15 / implementation | Last-swipe and last-undo accessibility regressions failed (P2-15-RED.txt) | Focus remained on a button that became disabled, interrupting shortcut navigation | Move existing deck focus to its stable focusable region before disabling the control; no focus synchronization effect | Same tests passed; full suite 103 passed in P2-15-GREEN.txt |
| P2-15 / implementation | Containing-form test observed submit called once after Like | Buttons omitted type and inherited submit behavior | Explicit type=button for all action controls | Unchanged assertion passes; 103-test suite green |
| P2-15 / maintainability and accessibility | Inspection found 8–11px utility text, faint history notes, dead starter assets/styles and ref not cleared before unmount release | Starter remnants and incomplete presentation/lifecycle cleanup | Increase typography/contrast, remove unused assets/CSS and clear gesture ref before releasing capture on unmount | Browser 375/768/1440 checks and visual inspection passed; 10 sampled contrast ratios 4.62–5.75, reduced motion none/0s; no console/network errors |
| P2-16 / verification gap | Plain backend npm test exited 1: no test files found (P2-16-backend-initial.txt) | Backend had only a smoke script and runner configuration | Add real skeleton integration and error-boundary unit tests; do not hide missing tests with passWithNoTests | 10 tests/2 files passed; no business API/database coverage claimed |
| P2-16 / security | Backend RED run: six failures/two passes; parser errors returned HTML/development stack details and unknown routes lacked documented JSON errors | Express default fallbacks had no project error boundary | Centralized safe 400/413/415/500 JSON errors and JSON 404 fallback; preserve size/CORS constraints | Unchanged integration assertions pass; redaction/headers-sent tests pass; backend lint, syntax and smoke checks pass |
| P2-16 / environment limit | No Lighthouse command/local package; npm global lookup reports ENOENT for missing global npm directory | Lighthouse CLI is unavailable in this environment | Do not fabricate a score or install unrelated tooling; provide manual DevTools audit steps | Lighthouse Not Verified; independent production-browser QA passed |

Release verdict: the local demonstration is verified within the checks recorded above. P2-09–P2-14 are absent, so a complete full-stack release remains blocked. Production dependency audits report zero vulnerabilities at execution time; this is not proof of complete application security or WCAG conformance.

| Task / category | Observed issue and evidence | Root cause | Corrective action | Verification |
| --- | --- | --- | --- | --- |
| P2-17 / verification tooling | Inline PowerShell-piped Node doc checker asserted 0 prompt blocks versus expected 7, despite visible headings in the file | Unicode delimiter handling in the inline script pipeline; the same assertions succeed from a UTF-8 source file | Save verify-docs.mjs as UTF-8, preserve all prompts, compare unique ordered table IDs with verbatim blocks | Seven blocks/current U007 once, eight documents/no broken links, nine README sections and JSON reports validated; no assertion weakened |

Final U007 verification: 103 frontend and 10 backend-skeleton tests passed, both lint checks and frontend production build passed, backend syntax/setup passed, production browser diagnostics contain no observed console/network errors. Lighthouse and real persistence remain Not Verified as documented in README and task checklist.

Final tooling note: forcing core.autocrlf=false during a diagnostic diff check misclassified existing CRLF terminators as trailing whitespace. The repository-configured git diff --check rerun exited 0. This was a checker configuration issue; no source/history rewrite was needed.

U008 Git review: staging previously untracked raw verification outputs exposed terminal trailing spaces/blank lines to git diff --cached --check. Those files are permanent evidence and were preserved verbatim; source-only staged whitespace checks passed. Fresh frontend 103/backend 10 tests, lint/build/syntax/smoke and environment/docs checks passed. No new implementation failure was observed. Existing baseline/history and unrelated projects were preserved; missing backend/persistence tasks were not fabricated as completed commits.

## U010 — repeat release review

| Task / category | Observed issue | Root cause | Corrective action | Actual retest |
| --- | --- | --- | --- | --- |
| P2-15 / responsive implementation | New 320px browser assertion failed: scrollWidth=320, clientWidth=305, exit 1 (U010-P2-15-RED.txt) | Fixed body min-width:320px exceeded the width available after a classic scrollbar | Remove the fixed minimum; keep layout responsive and assertion unchanged, without overflow hiding | Browser checks pass at 320/375/768/1440; screenshots visually inspected, 103 frontend tests and lint pass; U010-P2-15-BROWSER.json |

U010 P2-16: no new backend/runtime failure was observed. Fresh backend tests (10), lint/syntax/smoke, production build and browser/environment checks passed; final frontend source has 103 passing tests. Both production dependency audits report zero vulnerabilities. The known absence of P2-09–P2-14 remains a full-stack release blocker, not a fabricated test failure or completion. Lighthouse is still not installed; no score is claimed.

U010 P2-17 documentation correction: the README's original publication wording predated U009 and incorrectly still said the push command had never run. Updated it to distinguish the actual prior authorized publication from U010's no-push scope. Fresh documentation validation passes for all required sections, ten actual prompts and current evidence; no historical interaction, commit or Lighthouse score was invented. Prior review failures and their original evidence remain preserved.

## U011 — acceptance gaps, not new feature implementation

| Observed gap/evidence | Root cause | Acceptance action | Verification/status |
| --- | --- | --- | --- |
| npm.cmd run seed exits 1: Missing script: seed (U011-seed-attempt.txt) | P2-10 has no seeder, schemas or connection module | Report the missing command honestly; do not add an unrequested feature or invent seed results | Seeding NOT MET; P2-10 remains unchecked |
| MongoDB probe succeeds while application persistence cannot be demonstrated (U011-mongodb.json) | A reachable database endpoint is independent of the absent application persistence/API path | Run read-only connection/admin ping only; no arbitrary document writes presented as app persistence | Connectivity PASS; application persistence NOT VERIFIED/NOT MET |
| Six task criteria P2-09–P2-14 remain unmet | Business API/session contract, models/seed, API tests/routes and full-stack integration were never implemented | Preserve unchecked status and document criterion-by-criterion rejection | U011-acceptance.md; full-stack acceptance NOT PASSED |
| Four development entries contain three distinct texts (U011-prompt-audit.json) | U010 is a real repetition of U007, not a missing backend phase | Compare all four entries to committed originals and preserve original requests; invent no interaction | Four entries intact; no P2-09–P2-14 prompt fabricated |

Fresh U011 tests/lint/build/syntax/environment/browser checks passed (103 frontend/10 skeleton backend tests). No new source regression was observed; acceptance blockers are existing implementation gaps. No source feature, database write, history rewrite or push was performed.
