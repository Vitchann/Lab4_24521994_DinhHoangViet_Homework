// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { simulation } from '../data/simulation.js'
import { calculateMatrix } from './disproportionality.js'

describe('transparent demonstration matrix', () => {
  it('derives load, allowances and clamped excess from each frozen dossier', () => {
    const before = JSON.stringify(simulation)
    expect(calculateMatrix(simulation)).toEqual([
      { dossierID: 'demo-001', player: 'Player Alpha', load: 70, baseline: 40, referenceCredit: 10, contextCredit: 0, excess: 20 },
      { dossierID: 'demo-002', player: 'Player Beta', load: 5, baseline: 40, referenceCredit: 10, contextCredit: 10, excess: 0 },
    ])
    expect(JSON.stringify(simulation)).toBe(before)
  })
  it('recalculates when dossier-linked duration changes, independent of array order', () => {
    const data = structuredClone(simulation)
    data.sanctions[0].durationDays = 14
    data.sanctions[0].effectiveUntil = '2026-12-06T12:00:00.000Z'
    data.sanctions.reverse()
    expect(calculateMatrix(data)[0]).toMatchObject({ load: 140, excess: 90 })
  })
  it('caps reference credit at three and does not borrow another case statement', () => {
    const data = structuredClone(simulation)
    for (const id of ['extra-1', 'extra-2', 'extra-3']) {
      data.evidence.push({ ...data.evidence[0], id })
      data.dossiers[0].evidenceIDs.push(id)
    }
    expect(calculateMatrix(data)[0]).toMatchObject({ referenceCredit: 15, contextCredit: 0, excess: 15 })
  })
  it('rejects broken dataset ownership rather than displaying misleading numbers', () => {
    const data = structuredClone(simulation)
    data.dossiers[0].sanctionID = 'missing'
    expect(() => calculateMatrix(data)).toThrow(TypeError)
  })
})
