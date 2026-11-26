import { simulation } from '../../shared/data/simulation.js'
import { validateDataset } from '../../shared/domain/validateDataset.js'

function canonical(value) {
  if (value instanceof Date) return value.toISOString()
  if (Array.isArray(value)) return value.map(canonical)
  if (value && typeof value === 'object') return Object.fromEntries(Object.keys(value).sort().map((key) => [key, canonical(value[key])]))
  return value
}

export async function seedDatabase(models, dataset = simulation) {
  validateDataset(dataset)
  let inserted = 0
  for (const [name, records, key] of [['Player', dataset.players, 'playerID'], ['Dossier', dataset.dossiers, 'dossierID'], ['Evidence', dataset.evidence, 'id'], ['Sanction', dataset.sanctions, 'id']]) {
    for (const record of records) {
      const previous = await models[name].findOne({ [key]: record[key] })
      if (previous) {
        const normalized = previous.toJSON()
        if (JSON.stringify(canonical(normalized)) !== JSON.stringify(canonical(record))) throw new Error(`Conflicting simulation seed record in ${name}; existing data preserved`)
      } else { await models[name].create(record); inserted++ }
    }
  }
  return { inserted, simulation: true }
}
