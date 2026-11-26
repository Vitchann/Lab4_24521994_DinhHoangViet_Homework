import { validateDataset } from './validateDataset.js'

// Arbitrary educational units, never a recommendation or official finding.
export function calculateMatrix(dataset) {
  validateDataset(dataset)
  return dataset.dossiers.map((dossier) => {
    const sanction = dataset.sanctions.find((item) => item.id === dossier.sanctionID)
    const references = dossier.evidenceIDs.map((id) => dataset.evidence.find((item) => item.id === id))
    const load = sanction.type === 'CAUTION' ? 5 : sanction.durationDays * 10
    const baseline = 40
    const referenceCredit = 5 * Math.min(references.length, 3)
    const contextCredit = references.some((item) => item.kind === 'STATEMENT') ? 10 : 0
    return { dossierID: dossier.dossierID, player: dataset.players.find((item) => item.playerID === dossier.playerID).displayName, load, baseline, referenceCredit, contextCredit, excess: Math.max(0, load - baseline - referenceCredit - contextCredit) }
  })
}
