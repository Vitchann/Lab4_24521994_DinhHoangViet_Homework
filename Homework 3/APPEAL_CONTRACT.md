# Local appeal, matrix and SLA contract — U004

## P3-06: appeal draft and validation

One form belongs to one fixed simulated dossier/player. Route changes reset its draft with a keyed provider. Applicant input is local demo data only; nothing is sent to a server. Review generation is not a real appeal submission or persistence.

| Field | Contract |
| --- | --- |
| applicantName | Required trimmed 2–80 characters |
| applicantEmail | Required, <=254 characters; simple email format check for demo usability, not full RFC verification |
| relationship | PLAYER or REPRESENTATIVE |
| authorized | Must be true for a REPRESENTATIVE; ignored for PLAYER |
| reason | PROCESS, NEW_EVIDENCE or PROPORTIONALITY |
| grounds | Required, 30–4000 trimmed characters |
| evidenceIDs | Array of unique existing evidence IDs owned by this dossier; NEW_EVIDENCE requires at least one selected reference |
| requestedOutcome | REVIEW, REDUCE or REMOVE; PROPORTIONALITY must choose REDUCE or REMOVE |
| acknowledged | Must explicitly confirm this is a simulation |

`createAppealValues()` returns a fresh empty draft. `validateAppeal(values, {dossier, evidence})` is pure and returns a field-keyed errors object; it does not mutate inputs or store state. Malformed payload/context returns a form-level error; unsupported types/enums/foreign evidence are invalid. Dossier/player identity is read-only context, not an editable input.

Accepted: a valid applicant, PLAYER, PROCESS, 30+ character grounds, REVIEW and acknowledgment, with no supporting reference required. A representative additionally needs authorization. NEW_EVIDENCE requires a same-case reference. PROPORTIONALITY with REVIEW, duplicates, cross-case references and blank/short/oversized fields are rejected.

## P3-07: Context UI contract

FormContext.js shares values, update handlers, dossier/evidence, derived errors and local review receipt. SimpleForm.jsx owns values, attempted-submit flag and the last valid review snapshot only. Errors are calculated synchronously during render; there is no errors state or validation effect. InputField exposes label, hint and error associations/aria-invalid; evidence uses a labeled checkbox group. ShowData previews draft values through Context. An invalid submit shows a summary and produces no receipt; editing clears a stale receipt. A valid action generates a local-only review snapshot; no transport, submitted status or durable ID is fabricated.

## P3-08: illustrative matrix

Pure `calculateMatrix(dataset)` validates the frozen dataset and derives a row per dossier. All weights are arbitrary educational units, not recommendations or disciplinary findings: CAUTION load=5; restriction load=durationDays×10; baseline allowance=40; reference credit=5×min(reference count,3); context credit=10 if the case has a simulated STATEMENT; excess score=max(0,load−40−reference credit−context credit). Alpha: 70−40−10−0=20; Beta: 5−40−10−10 clamped to 0. A reference's presence is not proof of its truth. Never score real people from this model. An accessible table shows each input/weight/result and a visible simulation explanation. Two rows are cheap; no memoization/state/effect is warranted.

## P3-09/P3-10: absolute SLA

`calculateSla(deadline, nowMs)` accepts canonical UTC ISO timestamps and a finite explicit clock sample. It returns `{status:'active'|'expired'|'invalid', remainingMs}`. Remaining time is exactly max(0, deadlineTimestamp−nowMs); equality is expired. Invalid inputs fail closed with remainingMs=0.

`useAppealSlaTimer(deadline)` samples Date.now on initialization, every 1000ms and visibilitychange when visible. It never subtracts from the previous result. Delayed callbacks resample wall-clock time; the display may wait until the next callback (normal browser scheduling) but does not accumulate interval drift. One interval and one visibility listener are cleaned up on unmount. The hook exposes refresh for an immediate event-time resample. Deadline changes derive against the current clock sample; fixed dossier changes remount the keyed form. Invalid/expired deadlines disable the local review action.

Submission also checks `calculateSla(deadline, Date.now())` at the actual submit event and refreshes the clock, so stale UI scheduling cannot permit a late review. Timer UI uses a non-live timer to avoid announcing every second, and a stable status message for active/expired/invalid. This client clock is demonstration-only and can be tampered with; future server code must enforce deadlines independently.

Test active/expired/invalid and exact-boundary calculations, delayed callbacks, background visibility synchronization, deadline replacement, StrictMode/listener/interval cleanup, and late submit while a displayed clock is stale. Controlled clock tests must not weaken assertions to hide drift. No backend endpoint/persistence is included through P3-10.
