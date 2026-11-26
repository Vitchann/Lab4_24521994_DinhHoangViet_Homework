# AI failure audit

Record actual implementation failures with evidence, root cause, correction and retest. Expected RED test runs are development evidence rather than accidental regressions. Environment failures are identified separately.

No implementation failure observed at initialization. No claims of API or MongoDB verification.

P3-03 expected RED context: the empty fixture/stub contract produced 16 failures, including attempts to mutate nonexistent fixture entries. The resumed tests strengthened invalid-input assertions to TypeError and reran before implementation; final data/validator passed all 17 frontend tests. These are recorded scaffolding/feature RED failures, not fabricated runtime regressions. No accidental implementation failure was observed in this task.

| Task | Actual failure / evidence | Root cause | Correction | Retest |
| --- | --- | --- | --- | --- |
| P3-05 | First UI run: 1 failed / 32 passed; registry navigation could not find link named Dossier registry (P3-05-first-failure.txt) | Decorative count became part of the accessible link name, yielding Dossier registry02 | Hide decorative badge from accessible naming with aria-hidden=true; derive its visual count from fixtures | Same assertions unchanged: 33 frontend/1 backend tests pass; native browser navigation also passes |
| P3-05 / QA tooling | First browser helper failed with SyntaxError: missing ) after argument list (P3-05-browser-first-failure.txt) | Nested quoting in a CDP-evaluated CSS selector produced invalid JavaScript | Use template literals with single-quoted selector expressions; no application/test assertion changed | Nine direct routes, keyboard/internal navigation, deep reload, four widths and error diagnostics pass; P3-05-BROWSER.json |

Final scope: no real disciplinary finding is asserted. API/persistence, appeal form, SLA/matrix, physical devices, screen readers and full accessibility/Lighthouse checks were not implemented/verified; no fabricated result or history.

### P3-06 verification boundary

Expected TDD RED: 20 validation cases fail on explicit unimplemented functions; 33 existing cases pass (verification/P3-06-RED.txt). This is planned evidence, not an accidental implementation failure. No new observed implementation defect to report.

| P3-07 / documentation tooling | P3-06 commit did not include TASK_DECOMPOSITION.md despite intended update | Exact string replacement assumed LF and did not match CRLF; no assertion checked match | Use CRLF-tolerant task-block expressions; explicitly inspect checkboxes | P3-06/P3-07 checked and evidence updated in the P3-07 commit. Application tests remain unchanged and pass 57/57. |

### P3-08 observed test-fixture failure

Initial post-implementation run: 1 frontend failed / 61 passed; backend 1 passed. The duration-change test set an unused endsAt property instead of the model effectiveUntil property, leaving duration and end date inconsistent. Dataset validation correctly threw Invalid sanction end date. Corrected the fixture field only; expected load 140/excess 90 and all other assertions preserved. Retest: 62 frontend + 1 backend passed. Evidence: verification/P3-08-first-failure.txt and P3-08-GREEN.txt.
