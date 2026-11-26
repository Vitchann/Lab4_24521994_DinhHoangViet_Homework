# REST and persistence contract — P3-11

All records and outcomes are fictional simulations. This is a single-user educational service, without authentication or real disciplinary authority. Use fictional applicant details. There is one persisted appeal per dossier, irrespective of email; this deliberately avoids treating an unverified email as identity. No administrative decision/update endpoint is provided.

## Resources and responses

Base URL: http://127.0.0.1:3002/api. JSON only; bodies limited to 32 KiB. Responses have `Cache-Control: no-store`. UTC dates use canonical ISO strings. Business IDs are strings, never MongoDB ObjectIds exposed to clients.

| Method / path | Success data | Errors |
| --- | --- | --- |
| GET /dossiers | 200 `{data:{notice,players:Player[],dossiers:Dossier[],evidence:Evidence[],sanctions:Sanction[]}}` normalized complete simulation snapshot; empty arrays permitted | 503 database unavailable; 500 inconsistent stored dataset |
| GET /dossiers/:playerID | 200 `{data:{player,dossier,evidence:Evidence[],sanction},meta:{serverNow}}` | 400 malformed player ID; 404 unknown player; 500 broken stored relationships |
| GET /dossiers/:playerID/evidence | 200 `{data:Evidence[]}` owned by this dossier | 400 / 404 / 503 |
| GET /evidence/:evidenceID | 200 `{data:Evidence}` | 400 malformed ID; 404 missing; 503 |
| POST /dossiers/:playerID/appeals | 201 `{data:AppealStatus}` plus Location `/api/appeals/:id` | 400 malformed JSON/ID; 404 dossier missing; 415 non-JSON; 413 oversized; 422 fields; 409 duplicate; 410 expired; 503 unavailable |
| GET /dossiers/:playerID/appeal | 200 `{data:AppealStatus|null}`; null means no submission | 400 / 404 / 503 |
| GET /appeals/:appealID | 200 `{data:AppealStatus}` | 400 malformed UUID; 404 missing; 503 |

Player/Dossier/Evidence/Sanction shapes are those in DOMAIN_CONTRACT.md and the validated seed snapshot. No `_id`, `__v`, applicant email, name, grounds or private data appears in status responses. `AppealStatus = {id:UUID,dossierID,playerID,status:'SUBMITTED'|'UNDER_REVIEW'|'RESOLVED',submittedAt:UTC_ISO,simulation:true}`. In this task range new records remain SUBMITTED; no resolution is invented.

Errors: `{error:{code,message,fields?}}`; field validation uses a map of field names to safe explanations. Duplicate errors may additionally contain `error.appeal:AppealStatus`. Stable codes: INVALID_ID, NOT_FOUND, INVALID_JSON, UNSUPPORTED_MEDIA_TYPE, PAYLOAD_TOO_LARGE, VALIDATION_FAILED, DUPLICATE_APPEAL, DEADLINE_EXPIRED, DATABASE_UNAVAILABLE, INTERNAL_ERROR. Never expose stack traces, query strings or database credentials. Unknown routes return JSON 404, not HTML. Express 5 async handler rejection reaches one centralized error handler.

## Submission payload and order

POST accepts exactly the ten AppealDraft fields from APPEAL_CONTRACT.md: applicantName, applicantEmail, relationship, authorized, reason, grounds, evidenceIDs, requestedOutcome, acknowledged. All keys are required and unexpected keys rejected, including status, submittedAt, playerID and dossierID. String fields must be strings, booleans must be booleans. Name/grounds/email trimmed; email normalized lowercase. Required name 2–80, email <=254 with simple format, grounds 30–4000. Evidence IDs unique and owned by this dossier. REPRESENTATIVE requires authorized=true; NEW_EVIDENCE needs a reference; PROPORTIONALITY requires REDUCE or REMOVE; acknowledgment=true.

Example body:

```json
{"applicantName":"Demo Applicant","applicantEmail":"demo@example.test","relationship":"PLAYER","authorized":false,"reason":"PROCESS","grounds":"Please review the fictional briefing context and demonstration record.","evidenceIDs":[],"requestedOutcome":"REVIEW","acknowledged":true}
```

Resolve and validate the dossier first; validate the complete payload independently on the server; check an existing appeal; sample server time immediately before attempting insertion. At or after appealDeadline return 410. Client-supplied clocks/status/IDs are never authoritative. submittedAt is the server acceptance timestamp; the database commit can complete later. A unique dossierID index is the final concurrency guard: simultaneous valid requests produce one 201 and one 409. Duplicate recovery returns existing public status even after the window closes. A network failure after commit is ambiguous; GET the dossier's appeal before a retry. No automatic POST retries. One atomic insert persists the appeal; original evidence/sanction/dossier are unchanged.

## Database architecture and operations

Five collections: players, dossiers, evidence, sanctions, appeals. Unique business IDs on each; unique playerID on dossiers; unique dossierID on sanctions and appeals. Evidence indexed by dossierID. Appeals indexed by UUID and dossierID, with submittedAt/status fields. Schemas use strict validation, enums, date/length constraints and simulation=true. Logical references use business IDs; MongoDB does not supply foreign-key constraints. The validated seed and service ownership/integrity checks enforce relationships for supported writes. Direct database mutation is outside this API contract.

`process.env.MONGODB_URI` is required. Backend connects and awaits index initialization before listening; failure exits with sanitized diagnostics. Use a dedicated hw3 database. Seed validates the entire shared snapshot, inserts missing records without deleting/overwriting existing records, refuses conflicting source records and preserves appeals; reruns do not extend fixed deadlines. Seeding is not a multi-collection transaction; run it before starting the service, and rerun to complete an interrupted seed. No deprecated callbacks, useNewUrlParser or useUnifiedTopology.

## Frontend and verification contract

UI data comes from these APIs; bundled fixtures are test/seed inputs only, never a silent network fallback. Context loaders expose loading/error/empty/retry and abort obsolete requests. Dynamic dossier routing requests its own case, handles 400/404 and rejects invalid response shapes/ownership. The matrix derives from the validated collection snapshot. Form errors remain render-derived; submission has a synchronous in-flight guard, AbortController cleanup and no concurrent duplicate POST. Confirmation displays persisted public status, and GET restores it after reload without localStorage or PII. Existing status takes priority over an expired window.

P3-12 verifies schemas/seed and actual MongoDB when available. P3-13 records Supertest RED before API implementation. P3-14 verifies HTTP behavior using real models/database plus injectable error cases. P3-15 tests frontend transport/state before integration. P3-16 verifies API, routing, form, matrix, SLA, real persistence/reconnection/races and network failures. A skipped/unavailable database is explicitly not a pass.

Implementation references: [Mongoose 8 validation and unique indexes](https://mongoosejs.com/docs/8.x/docs/validation.html), [Express 5 error handling](https://expressjs.com/en/guide/error-handling/). Unique indexes must be ready before writes; they are not Mongoose field validators.
