# Esports Fair-Play Appeal Tribunal

Homework 3 is a full-stack educational simulation. P3-01 through P3-15 are implemented; P3-16 verification follows. All people, evidence and sanctions are fictional training records. Himass and TanVuu are inspiration labels only, not allegations or findings.

## Architecture and stack

React 19, React Router v7 and Vite use native CSS. Express 5 runs ES modules with Mongoose 8 and MongoDB. Vitest, React Testing Library and Supertest test domain rules, components and HTTP behavior. The installed workspace dependencies are reused; no UI framework or new dependency was added in this task range.

- shared/domain: common models, pure dataset and appeal validation; shared/data: immutable simulation seed input.
- frontend/src/api, hooks, context: validated API transport, abortable loaders, Context form and absolute-clock SLA.
- frontend/src/components, pages, routing: dashboard, dossiers, matrix, form, feedback and nested routes.
- backend/src/models, config, routes, controllers, services, middleware: persistence and HTTP layers.
- backend/scripts/seed.js: guarded non-destructive seed; backend/tests: unit and opt-in real MongoDB tests.
- verification: actual RED/GREEN output and browser evidence. PROMPT_LOG.md distinguishes verbatim requests from agent task records.

The browser never falls back to bundled fixtures after network failure. Shared fixtures are seed/test inputs. UI routes are /, /dossiers, /dossier/:playerID and /about, with missing-ID/unknown-route recovery. Production hosting needs SPA index fallback. Unknown UI paths have a client 404 view after the host serves index.html.

## Features and business rules

Browse API-driven cases, evidence, sanctions and timelines. The Context form provides required applicant information, 30-4000 character reasons and owned evidence references. Representatives require authorization; new-evidence appeals require references; proportionality requires reduction/removal. Validation errors are calculated during render, without error state or validation effects. See APPEAL_CONTRACT.md and API_CONTRACT.md for exact fields, constraints and response schemas.

Submission explicitly saves an appeal to MongoDB. The server validates all fields independently, owns accepted timestamps and enforces the fixed deadline. One appeal is allowed per dossier, guarded by a unique index even under concurrent requests. Original case/evidence/sanction records are preserved. The frontend blocks concurrent POSTs and checks persisted status after an ambiguous error; reload restores status through GET without storing PII in localStorage. No automatic POST retries occur.

The comparison matrix derives from loaded dossier data: restriction 10 units/day, caution 5, baseline 40, reference credit 5 capped at 3 references, statement credit 10. Excess=max(0,load-baseline-reference-context): Alpha 20, Beta 0. These arbitrary units are not authoritative disciplinary judgments or evidence-quality measures. Two rows require no useMemo.

SLA remaining time is max(0,deadline-Date.now()), sampled each second and when visible. It never decrements a counter. Interval/listener cleanup is tested under StrictMode. Invalid/expired deadlines disable submission; the handler rechecks the current client clock and the server checks its own clock. Client display is not security authority. Timer announcements are off to avoid second-by-second speech.

## REST API

Base http://127.0.0.1:3002/api; JSON responses are no-store. Full request examples, schemas and HTTP errors: [API_CONTRACT.md](API_CONTRACT.md).

| Method | Endpoint | Result |
| --- | --- | --- |
| GET | /dossiers | Validated normalized simulation snapshot, including empty arrays |
| GET | /dossiers/:playerID | Player, dossier, owned evidence, sanction and server clock metadata |
| GET | /dossiers/:playerID/evidence | Owned evidence metadata |
| GET | /evidence/:evidenceID | One simulation reference |
| POST | /dossiers/:playerID/appeals | 201 persisted SUBMITTED status and Location |
| GET | /dossiers/:playerID/appeal | Persisted public status or null |
| GET | /appeals/:appealID | Public appeal status |

Errors: 400 IDs/JSON, 404 missing resources, 413 size, 415 media, 422 fields, 409 duplicate, 410 expired, 503 database unavailable, sanitized 500 otherwise. Status endpoints expose no applicant email/name/grounds or database internals. This single-user simulation has no authentication or authorization; do not deploy it as a public real-case service.

## Database configuration and startup

Five collections: players, dossiers, evidence, sanctions and appeals. Business IDs are unique; dossier.playerID and sanction/appeal.dossierID are unique; evidence.dossierID is indexed. Relationship integrity is enforced by validated source snapshots and supported service writes; MongoDB does not provide SQL foreign keys. The appeal write is one atomic insert. Seed is multi-collection and must run before serving; it inserts missing source records, rejects conflicts, preserves existing appeals and never changes fixed deadlines.

Verified environment: Node 24/npm 11. On a fresh checkout only, run npm.cmd ci from Homework 3. Existing installations do not need reinstalling. On non-Windows systems use npm instead of npm.cmd.

From the Lab4 directory, backend terminal:

~~~powershell
cd "Homework 3"
Copy-Item backend/.env.example backend/.env
Copy-Item frontend/.env.example frontend/.env
# Edit backend/.env if your dedicated MongoDB URI differs.
# MongoDB must be running.
npm.cmd run seed --workspace backend
npm.cmd run dev:backend
~~~

Do not overwrite an existing private .env file; copy examples only on first setup. MONGODB_URI is required, for example mongodb://127.0.0.1:27017/hw3_fair_play_simulation. CLIENT_ORIGIN is a comma-separated list of allowed frontend origins. Backend binds loopback port 3002 and waits for the connection/indexes before listening. Startup failures omit credentials. PORT may be changed. No deprecated connection options/callbacks are used.

Separate terminal from Lab4:

~~~powershell
cd "Homework 3"
npm.cmd run dev:frontend
~~~

Open http://127.0.0.1:5174. VITE_API_BASE_URL defaults to http://127.0.0.1:3002; it is public build configuration, never a secret. Private .env files, node_modules, dist and caches are ignored. Seed preserves source dates: Alpha expires 2026-12-05 09:00 UTC, Beta 2026-12-06 08:00 UTC. The form correctly disables after those dates; tests use explicit clocks, not hidden deadline extensions.

## Verification

~~~powershell
npm.cmd test
npm.cmd run test:db
npm.cmd run lint
npm.cmd run build
npm.cmd run check:backend
~~~

npm test runs frontend and independent backend tests and explicitly skips opt-in MongoDB cases. test:db sets RUN_MONGODB_TESTS=1 and executes the full backend suite against actual MongoDB. It creates random hw3_test_<hex> databases and checks names before dropping its own test database. MONGODB_TEST_URI optionally selects a server URI; no test may target another project's database. An unavailable database makes this explicit run fail; it is never counted as passed.

| Check | Actual result through P3-15 |
| --- | --- |
| P3-12 schema RED | 3 failed / 1 passed before implementation |
| P3-12 real MongoDB | 7 passed after fixing a nested seed comparison defect |
| P3-13 API RED | 37 failed / 8 passed, exit 1, before API implementation |
| P3-14 real MongoDB/API | 45 passed, including simultaneous duplicate submissions |
| P3-15 frontend RED | 10 new failed / 88 existing passed after correcting a test import path |
| P3-15 standard final | 98 frontend + 6 independent backend passed; 39 opt-in database cases skipped |
| P3-15 checks | Lint and Vite production build passed |

Actual evidence is in verification/P3-12-* through P3-15-*. Historical P3-05/P3-10 browser reports apply to those earlier local-only versions. AI_FAILURE_AUDIT.md records the seed comparator bug, test setup import error and asynchronous test migration, with unmodified validation/timing assertions and actual retests.

## Limitations

Simulation only; no actual accusations, official sanctions or adjudication. No authentication, appeal resolution/admin workflow, uploads, email delivery, pagination or public-production hardening. Public status is visible to anyone with the local demo URL; PII is omitted. The frontend clock can be changed; server time is authoritative. Direct database writes can bypass application relationships. Seed is resumable, not a cross-collection transaction; run it before serving. Physical-device, screen-reader, full WCAG/Lighthouse and deployment checks remain outside this task range. No push or history rewrite is performed. The pre-existing Homework 1 checklist modification is preserved.
