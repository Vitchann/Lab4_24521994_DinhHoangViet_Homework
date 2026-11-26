# AI failure audit

Record actual implementation failures with evidence, root cause, correction and retest. Expected RED test runs are development evidence rather than accidental regressions. Environment failures are identified separately.

No implementation failure observed at initialization. No claims of API or MongoDB verification.

P3-03 expected RED context: the empty fixture/stub contract produced 16 failures, including attempts to mutate nonexistent fixture entries. The resumed tests strengthened invalid-input assertions to TypeError and reran before implementation; final data/validator passed all 17 frontend tests. These are recorded scaffolding/feature RED failures, not fabricated runtime regressions. No accidental implementation failure was observed in this task.

| Task | Actual failure / evidence | Root cause | Correction | Retest |
| --- | --- | --- | --- | --- |
| P3-05 | First UI run: 1 failed / 32 passed; registry navigation could not find link named Dossier registry (P3-05-first-failure.txt) | Decorative count became part of the accessible link name, yielding Dossier registry02 | Hide decorative badge from accessible naming with aria-hidden=true; derive its visual count from fixtures | Same assertions unchanged: 33 frontend/1 backend tests pass; native browser navigation also passes |
| P3-05 / QA tooling | First browser helper failed with SyntaxError: missing ) after argument list (P3-05-browser-first-failure.txt) | Nested quoting in a CDP-evaluated CSS selector produced invalid JavaScript | Use template literals with single-quoted selector expressions; no application/test assertion changed | Nine direct routes, keyboard/internal navigation, deep reload, four widths and error diagnostics pass; P3-05-BROWSER.json |

P3-05 historical scope: appeal form, SLA/matrix and API/persistence were not implemented at that point. Later U004 work is recorded below; no real disciplinary finding is asserted.

### P3-06 verification boundary

Expected TDD RED: 20 validation cases fail on explicit unimplemented functions; 33 existing cases pass (verification/P3-06-RED.txt). This is planned evidence, not an accidental implementation failure. No new observed implementation defect to report.

| P3-07 / documentation tooling | P3-06 commit did not include TASK_DECOMPOSITION.md despite intended update | Exact string replacement assumed LF and did not match CRLF; no assertion checked match | Use CRLF-tolerant task-block expressions; explicitly inspect checkboxes | P3-06/P3-07 checked and evidence updated in the P3-07 commit. Application tests remain unchanged and pass 57/57. |

### P3-08 observed test-fixture failure

Initial post-implementation run: 1 frontend failed / 61 passed; backend 1 passed. The duration-change test set an unused endsAt property instead of the model effectiveUntil property, leaving duration and end date inconsistent. Dataset validation correctly threw Invalid sanction end date. Corrected the fixture field only; expected load 140/excess 90 and all other assertions preserved. Retest: 62 frontend + 1 backend passed. Evidence: verification/P3-08-first-failure.txt and P3-08-GREEN.txt.

### P3-09 expected RED

22 new tests fail before SLA implementation while 62 existing tests pass. Three form tests expose the intentionally missing deadline gate/timer, including a late local receipt after the deadline. This planned coverage defines the P3-10 correction; no completed timer is claimed. Raw evidence verification/P3-09-RED.txt.

### P3-10 observed validation gap and correction

Review found the P3-07 Context guard accepted a dossier without evidenceIDs or incomplete/unknown references, and null evidence could throw. Added four contract cases and executed before correction: 4 failed / 84 passed, exit 1 (verification/P3-10-context-first-failure.txt). Root cause: checking only dossierID and evidence ownership did not establish the required Context shape. Corrective action: verify the reference-ID array, nonnull entries, ownership/membership and complete reference resolution before field validation. No assertions weakened. Final 88 frontend + 1 backend tests pass (P3-10-GREEN.txt); lint/build/backend syntax and production browser pass.

### P3-10 timing verification and remaining boundaries

The first timer implementation passed 84 frontend + 1 backend tests immediately; no accidental drift/cleanup failure observed. Controlled tests demonstrate exact-boundary expiry, delayed callbacks, background-tab synchronization, StrictMode listener/interval cleanup and stale-clock submit rejection. Native production Chrome also rejected a late review with a stale display. This is evidence for the local clock implementation, not server deadline enforcement. Physical devices, assistive technology, full WCAG/Lighthouse, authentication, real adjudication and database/API persistence remain unverified/unimplemented in this range. No scores, findings or history were fabricated.

Documentation QA correction: an initial prompt-uniqueness script counted the substring "## U004", which also matched the legitimate "### U004" intake heading, and falsely reported duplication. Changed the check to an anchored exact level-two verbatim heading and validated the fenced prompt boundaries/sections. Retest passes; original user text was not edited.

### P3-11

No implementation defect observed during contract review. Actual MongoDB connectivity probe passed; this does not yet verify schemas, seed or appeal persistence. Those checks follow in P3-12/P3-16.

### P3-12 seed comparison defect

A review-added nested-timeline test reproduced 1 failure / 6 passes on real MongoDB (P3-12-first-failure.txt). Root cause: JSON.stringify with a top-level key whitelist also filtered nested keys, hiding changed event descriptions. Replaced it with recursive key ordering and Date normalization; same assertion now passes. Explicit real MongoDB retest 7/7 passed (P3-12-MONGO.txt). Expected schema RED (3 failed/1 passed) remains separate evidence.

### P3-13 expected API RED

Actual pre-implementation run: 37 failed / 8 passed, exit 1 (P3-13-RED.txt). Existing scaffold returns 404 instead of newly contracted REST responses. Planned TDD evidence; no implemented API is claimed. Database setup/seed succeeds, so these are HTTP contract failures.

### P3-14

First implemented API run passed all 45 tests against real MongoDB (P3-14-first-run.txt), including atomic duplicate race and server expiry. No accidental API failure observed. The former skeleton test now requests an unknown endpoint because its original endpoint became implemented; its 404/security assertions are retained. Standard runs skip opt-in database cases explicitly; only test:db execution is real persistence evidence.

### P3-15 test setup and asynchronous migration

Initial new-test run executed no tests because apiMock.js traversed four parent directories instead of three to shared/data. Corrected test-only import and reran before implementation: 10 failed / 88 passed (P3-15-RED.txt). Raw setup failure is P3-15-test-setup-failure.txt.

After API integration, 17 legacy tests failed because they expected synchronous fixtures and a local receipt; those contracts intentionally changed to asynchronous persisted submission. Updated readiness waits and asserted SUBMITTED/locked form instead, retaining case isolation, accessible validation, invalid-draft rejection and exact stale-clock behavior. A missed hydration wait in one deadline case reproduced 1 failure / 97 passes (P3-15-timing-failure.txt); corrected the wait, not the enabled-before-submit assertion. Final 98 frontend tests pass. Lint/build pass. Mocked frontend status restoration is explicitly not claimed as real MongoDB verification.

### P3-16 reproduced integration defects

| Observed failure | Root cause | Corrective action | Actual verification |
| --- | --- | --- | --- |
| Unexpected __proto__ input returned 500 instead of 422 | Plain error-map assignment treated the key as a prototype setter, so strict model validation was reached | Use a null-prototype field-error map before whitelisting payload keys | Same Supertest request now 422; no inserted appeal |
| Malformed percent-encoded ID returned 500 instead of 400 | Central error middleware did not classify Express URIError | Return sanitized INVALID_ID 400 | Same /api/dossiers/%ZZ assertion passes |
| Closed MongoDB connection returned 500 instead of 503 | Service checked only model existence, not connection readiness | Guard readyState and classify disconnected driver errors | Actual close returns 503; fresh connection/app restores exact prior status; reseed preserves appeal |
| Frontend displayed status for a wrong dossierID | Parser checked matching playerID but did not bind status to selected dossier | Stable case-bound callback validates dossierID for GET and POST responses | Same invalid-response test now displays error and keeps submit disabled |

Before fixes: real backend 3 failed / 45 passed (P3-16-backend-first-failure.txt); frontend 1 failed / 105 passed (P3-16-frontend-first-run.txt). Assertions retained. After fixes: 48/48 real MongoDB backend and 106/106 frontend passed. Standard test command separately reports 42 explicit DB skips and 6 independent backend passes; skipped tests are not described as verification.

### P3-16 actual browser/database evidence and limits

Production Chrome with actual Express and isolated real MongoDB passed native submission, same receipt ID after reload, stale-clock rejection, routing, focus, reduced motion and four-width overflow checks. Closed all original connections and reconnected: exact persisted appeal status/timestamp remain. P3-16-BROWSER.json and P3-16-FULL-STACK.json record results. The two invalid-ID HTTP 400s are intentional and explicitly listed; no unexpected console/runtime/network/HTTP errors observed. Main HW3 startup/CORS/read-only probe also passed. No physical-device, screen-reader, Lighthouse or full WCAG compliance claim; no authentication or real adjudication is implemented. All outcomes remain simulation-only.
