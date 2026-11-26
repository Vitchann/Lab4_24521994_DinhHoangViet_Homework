// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { simulation, findDossier } from './simulation.js'
import { validateDataset } from '../domain/validateDataset.js'

describe('P3-03 simulation integrity', () => {
  it('has two explicitly simulated case-study references with valid relationships', () => {
    expect(simulation.players).toHaveLength(2)
    expect(simulation.players.map((player) => player.referenceLabel)).toEqual(['Himass', 'TanVuu'])
    expect(simulation.notice).toMatch(/simulation.*not official/i)
    expect(validateDataset(simulation)).toBe(true)
  })

  it('deeply freezes the fixtures and keeps real reference labels out of synthetic handles', () => {
    const check = (value) => {
      if (value && typeof value === 'object') {
        expect(Object.isFrozen(value)).toBe(true)
        Object.values(value).forEach(check)
      }
    }
    check(simulation)
    for (const player of simulation.players) expect(player.handle).not.toBe(player.referenceLabel)
  })

  it('finds a dossier by stable player ID without mutating it', () => {
    expect(findDossier('sim-himass')).toBe(simulation.dossiers[0])
    expect(findDossier('sim-tanvuu')).toBe(simulation.dossiers[1])
  })

  it.each([undefined, 'toString', '__proto__', 'SIM-HIMASS', 'unknown'])('returns undefined for invalid/unknown ID %s', (id) => {
    expect(findDossier(id)).toBeUndefined()
  })

  it.each([
    ['false simulation flag', (data) => { data.dossiers[0].simulation = false }],
    ['duplicate player ID', (data) => { data.players[1].playerID = data.players[0].playerID }],
    ['broken evidence link', (data) => { data.dossiers[0].evidenceIDs.push('missing') }],
    ['cross-case evidence', (data) => { data.evidence[0].dossierID = data.dossiers[1].dossierID }],
    ['external evidence source', (data) => { data.evidence[0].reference = 'https://invented.example/evidence' }],
    ['invalid chronology', (data) => { data.dossiers[0].appealDeadline = data.dossiers[0].openedAt }],
    ['unsorted timeline', (data) => { data.dossiers[0].timeline.reverse() }],
    ['invalid sanction duration', (data) => { data.sanctions[0].durationDays = -1 }],
  ])('rejects %s', (_label, change) => {
    const data = structuredClone(simulation)
    change(data)
    expect(() => validateDataset(data)).toThrow(TypeError)
  })
})
