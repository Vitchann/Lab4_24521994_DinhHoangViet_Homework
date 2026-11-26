import { PLAYER_ID_PATTERN, SIMULATION_NOTICE } from '../domain/models.js'

function freeze(value) {
  if (value && typeof value === 'object') {
    Object.values(value).forEach(freeze)
    Object.freeze(value)
  }
  return value
}

export const simulation = freeze({
  notice: SIMULATION_NOTICE,
  players: [
    { playerID: 'sim-himass', handle: 'SIM-HM', displayName: 'Player Alpha', team: 'Northline Academy (fictional)', role: 'Training roster · flex', referenceLabel: 'Himass', simulation: true },
    { playerID: 'sim-tanvuu', handle: 'SIM-TV', displayName: 'Player Beta', team: 'Meridian Academy (fictional)', role: 'Training roster · support', referenceLabel: 'TanVuu', simulation: true },
  ],
  dossiers: [
    {
      dossierID: 'demo-001', playerID: 'sim-himass', title: 'Training protocol review',
      summary: 'An invented scrim scenario explores an unacknowledged rules briefing, incomplete context and a proportionate review. No conduct by a real person is alleged.',
      status: 'DEMO_REVIEW', openedAt: '2026-11-20T09:00:00.000Z', appealDeadline: '2026-12-05T09:00:00.000Z', evidenceIDs: ['ev-hm-replay', 'ev-hm-brief'], sanctionID: 'sanction-hm', simulation: true,
      timeline: [
        { id: 'hm-open', at: '2026-11-20T09:00:00.000Z', title: 'Simulation dossier opened', description: 'A fictional training scenario is created for interface exploration.' },
        { id: 'hm-evidence', at: '2026-11-21T10:30:00.000Z', title: 'Demo references attached', description: 'Two synthetic evidence descriptions are attached; no actual footage is supplied.' },
        { id: 'hm-review', at: '2026-11-22T12:00:00.000Z', title: 'Illustrative outcome recorded', description: 'A demonstration restriction is recorded for educational comparison only.' },
      ],
    },
    {
      dossierID: 'demo-002', playerID: 'sim-tanvuu', title: 'Roster notice review',
      summary: 'A fictional roster-notice exercise demonstrates how written context and a participant statement can be organized for review. This is not a real allegation or disciplinary record.',
      status: 'DEMO_REVIEW', openedAt: '2026-11-21T08:00:00.000Z', appealDeadline: '2026-12-06T08:00:00.000Z', evidenceIDs: ['ev-tv-notice', 'ev-tv-statement'], sanctionID: 'sanction-tv', simulation: true,
      timeline: [
        { id: 'tv-open', at: '2026-11-21T08:00:00.000Z', title: 'Simulation dossier opened', description: 'The second independent, fictional case is added to the registry.' },
        { id: 'tv-evidence', at: '2026-11-22T11:00:00.000Z', title: 'Demo references attached', description: 'Invented notice and statement descriptions are linked to this exercise only.' },
        { id: 'tv-review', at: '2026-11-23T14:00:00.000Z', title: 'Illustrative outcome recorded', description: 'A demonstration caution is recorded; no real-world sanction is asserted.' },
      ],
    },
  ],
  evidence: [
    { id: 'ev-hm-replay', dossierID: 'demo-001', title: 'Scrim replay index', kind: 'REPLAY', summary: 'Synthetic replay metadata for the exercise. No real recording or finding is attached.', reference: 'simulation://hw3/ev-hm-replay', availability: 'SIMULATED', simulation: true },
    { id: 'ev-hm-brief', dossierID: 'demo-001', title: 'Training rules briefing', kind: 'DOCUMENT', summary: 'Invented briefing reference used to demonstrate evidence organization.', reference: 'simulation://hw3/ev-hm-brief', availability: 'SIMULATED', simulation: true },
    { id: 'ev-tv-notice', dossierID: 'demo-002', title: 'Roster notice sample', kind: 'DOCUMENT', summary: 'Fictional notice metadata, not an actual team or organizer document.', reference: 'simulation://hw3/ev-tv-notice', availability: 'SIMULATED', simulation: true },
    { id: 'ev-tv-statement', dossierID: 'demo-002', title: 'Participant context sample', kind: 'STATEMENT', summary: 'An invented participant-context reference. No real statement is attributed to anyone.', reference: 'simulation://hw3/ev-tv-statement', availability: 'SIMULATED', simulation: true },
  ],
  sanctions: [
    { id: 'sanction-hm', dossierID: 'demo-001', type: 'TEMPORARY_RESTRICTION', description: 'Illustrative 7-day training participation restriction. Fictional exercise only; not an official decision about any real player.', durationDays: 7, issuedAt: '2026-11-22T12:00:00.000Z', effectiveUntil: '2026-11-29T12:00:00.000Z', status: 'DEMONSTRATION', simulation: true },
    { id: 'sanction-tv', dossierID: 'demo-002', type: 'CAUTION', description: 'Illustrative written caution for the fictional exercise only. No real disciplinary outcome is implied.', durationDays: 0, issuedAt: '2026-11-23T14:00:00.000Z', effectiveUntil: null, status: 'DEMONSTRATION', simulation: true },
  ],
})

export function findDossier(playerID) {
  if (typeof playerID !== 'string' || !PLAYER_ID_PATTERN.test(playerID)) return undefined
  return simulation.dossiers.find((dossier) => dossier.playerID === playerID)
}
