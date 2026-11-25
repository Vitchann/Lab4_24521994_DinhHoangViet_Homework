/**
 * @typedef {Readonly<{playerID:string, handle:string, displayName:string, team:string, role:string, referenceLabel:string, simulation:true}>} Player
 * @typedef {Readonly<{id:string, at:string, title:string, description:string}>} TimelineEvent
 * @typedef {Readonly<{dossierID:string, playerID:string, title:string, summary:string, status:'DEMO_REVIEW', openedAt:string, appealDeadline:string, evidenceIDs:ReadonlyArray<string>, sanctionID:string, timeline:ReadonlyArray<TimelineEvent>, simulation:true}>} Dossier
 * @typedef {Readonly<{id:string, dossierID:string, title:string, kind:'REPLAY'|'DOCUMENT'|'STATEMENT', summary:string, reference:string, availability:'SIMULATED', simulation:true}>} Evidence
 * @typedef {Readonly<{id:string, dossierID:string, type:'CAUTION'|'TEMPORARY_RESTRICTION', description:string, durationDays:number, issuedAt:string, effectiveUntil:string|null, status:'DEMONSTRATION', simulation:true}>} Sanction
 * @typedef {Readonly<{id:string, dossierID:string, playerID:string, grounds:string, evidenceIDs:ReadonlyArray<string>, submittedAt:string|null, status:'DRAFT'|'SUBMITTED'|'UNDER_REVIEW'|'RESOLVED', simulation:true}>} Appeal
 */

export const SIMULATION_NOTICE = 'Simulation only — fictional training data, not official findings or real-world accusations.'
export const PLAYER_ID_PATTERN = /^sim-[a-z0-9]+(?:-[a-z0-9]+)*$/
export const EVIDENCE_KINDS = Object.freeze(['REPLAY', 'DOCUMENT', 'STATEMENT'])
export const APPEAL_STATUSES = Object.freeze(['DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'RESOLVED'])
