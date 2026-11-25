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
