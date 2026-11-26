# Product and domain contract — P3-02

Written before fixture/routing implementation. JSDoc domain models live in frontend/src/domain/models.js; these are not Mongoose schemas.

## Requirements and boundaries

The current product is a read-only educational esports case-review dashboard. Users can browse a registry, navigate to a player dossier, inspect evidence metadata, demonstration sanctions and a timeline, and recover from unknown IDs/routes. Shared navigation must work without full page reload; direct dossier URLs must also work on a fresh load. Responsive semantic layouts, visible focus, readable contrast and clear simulation labeling are non-functional requirements.

No factual adjudication service, official authority, authentication, submission form, sanction calculation, ticking SLA, API client or database is implemented in P3-01–P3-05. Later task IDs cover those engines/integration separately. All evidence references are internal simulation identifiers, never fabricated real sources. Local synthetic avatars replace real player photographs.

## Models and relationships

| Model | Identity and required fields | Relationships/invariants |
| --- | --- | --- |
| Player | playerID, handle, displayName, team, role, referenceLabel, simulation=true | Stable unique lowercase `sim-...` ID; referenceLabel may name the supplied case-study reference, but other fields are invented |
| Dossier | dossierID, playerID, title, summary, DEMO_REVIEW status, openedAt, appealDeadline, evidenceIDs, sanctionID, timeline, simulation=true | One demo dossier per player; ordered evidence references; exactly one displayed demonstration sanction; chronological unique timeline events |
| Evidence | id, dossierID, title, kind, summary, reference, availability=SIMULATED, simulation=true | Unique ID; REPLAY/DOCUMENT/STATEMENT kind; owning dossier must exist; reference starts `simulation://`, not a real evidence URL |
| Sanction | id, dossierID, type, description, durationDays, issuedAt, effectiveUntil, status=DEMONSTRATION, simulation=true | CAUTION has duration 0/end null; TEMPORARY_RESTRICTION has positive whole days/end after issue; outcome is illustrative, not an official decision |
| Appeal | id, dossierID, playerID, grounds, evidenceIDs, submittedAt, status, simulation=true | Future workflow only; same player/dossier, existing evidence references, no cross-case submission |

All collections and IDs are unique; relationships must resolve within the same fixture snapshot and owning case. Fixture records/arrays are recursively frozen. Models separate case data from rendering and transport. No independent state mirrors route selection: derive the selected dossier from useParams and fixture lookup.

## Time, lifecycle and future validation contract

- Dates are explicit UTC ISO-8601 strings. openedAt precedes appealDeadline. Timeline is chronological; equal timestamps permitted with distinct stable IDs. Display absolute UTC dates consistently; do not imply a live authoritative deadline.
- Future persisted appeal lifecycle: DRAFT → SUBMITTED → UNDER_REVIEW → RESOLVED. A real submission requires nonblank grounds (30–4000 trimmed characters), the matching player/dossier, unique same-dossier evidence IDs and a server-observed submittedAt strictly earlier than appealDeadline. Exactly at the deadline is expired. P3-06–P3-10 add a separate local AppealDraft, validation and in-memory review only, documented in APPEAL_CONTRACT.md; no client-only deadline authority, persistence or submitted status is implied.
- A resolved appeal must not silently mutate the original evidence/sanction record. Identity, concurrency/versioning, duplicate submission and audit trail will be finalized in P3-11/P3-12, not invented as current API behavior.
- Domain dataset validation rejects missing IDs/fields, invalid enum/date, real external evidence references, false simulation flags, duplicate identifiers, mismatched relationships and unsorted timeline. Validation must not mutate supplied fixtures.

## Interface and routing contracts

| Interface | Contract |
| --- | --- |
| `validateDataset(dataset)` | Pure fixture-integrity check; throws TypeError/RangeError for malformed data or broken links; returns true for valid data |
| `findDossier(playerID)` | Return the matching frozen dossier or undefined for missing/invalid/unknown ID; safe against prototype property names |
| `AppRoutes` | Export route tree independently of BrowserRouter for MemoryRouter tests; default App uses BrowserRouter |
| `/` | Overview within shared dashboard layout, links to available dossiers |
| `/dossiers` | Simulation dossier registry with NavLink navigation |
| `/dossier/:playerID` | Dossier selected with useParams, composed from PlayerDossier, EvidenceList, SanctionSummary and CaseTimeline |
| `/about` | Explain simulation boundaries and reference labels; no appeal form |
| Invalid/unknown player ID | In-layout "Dossier not found", no first-player fallback and no crash; recovery link to registry |
| Unknown path or missing ID | In-layout "Page not found", recovery navigation |

Use Routes, Route, NavLink, Outlet and useParams from React Router v7. Layout owns one main landmark and shared navigation; nested routes populate Outlet. Native semantic links expose destinations, NavLink exposes active state. All pages retain the visible simulation notice; each dossier/evidence/sanction/timeline view reiterates its fictional scope.

Accepted examples: `/dossier/sim-himass` and `/dossier/sim-tanvuu` resolve only synthetic profile records. `/dossier/unknown`, `/dossier/toString`, `/dossier/SIM-HIMASS` produce the unknown-player state. `/dossier`, `/missing`, `/dossier/sim-himass/extra` produce the unknown-route state. Deep linking must serve SPA index.html and render the matching case after reload. Production static hosts require a rewrite/fallback, documented in README.

## Simulation provenance

The user supplied the names Himass and TanVuu as inspiration/reference labels. No external source text was supplied or verified; no event/date/allegation/outcome about those real people is asserted. Demo handles, teams, roles, incidents, dates, evidence and sanctions are explicitly invented training material. Duplicate a prominent notice in the shared layout and label all case-specific outcomes as simulations. Never infer a real disciplinary finding from this dataset.

## Acceptance mapping

P3-02: models/relationships, boundary, accepted/rejected examples and timing assumptions documented before implementation. P3-03: validate both fixture structure and labels. P3-04: execute assertion-based routing RED against a resolvable stub, capture counts. P3-05: all routing tests GREEN; nested navigation/unknown states, responsive semantic dossier components, direct URL/reload and SPA fallback verified. No later-task feature is implied by passing these checks.
