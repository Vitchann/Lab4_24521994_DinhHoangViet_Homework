// @vitest-environment node
import { expect, it } from 'vitest'
import { calculateSla } from './appealSla.js'

const deadline = '2026-12-05T09:00:00.000Z'
const end = Date.parse(deadline)
it('calculates an exact absolute delta for active deadlines', () => {
  expect(calculateSla(deadline, end - 12345)).toEqual({ status: 'active', remainingMs: 12345 })
})
it.each([end, end + 1, end + 3600000])('clamps expired deadline at clock %s', (now) => {
  expect(calculateSla(deadline, now)).toEqual({ status: 'expired', remainingMs: 0 })
})
it.each(['invalid', '', null, '2026-02-30T09:00:00.000Z', '2026-12-05', 123])('fails closed for invalid/noncanonical deadline %s', (value) => {
  expect(calculateSla(value, end)).toEqual({ status: 'invalid', remainingMs: 0 })
})
it.each([NaN, Infinity, undefined])('fails closed for invalid clock %s', (now) => {
  expect(calculateSla(deadline, now)).toEqual({ status: 'invalid', remainingMs: 0 })
})
