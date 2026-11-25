// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { calculateScore, getCurrentProfile, getProgress, swipe, undo } from './swipeEngine.js'

const profiles = Object.freeze([
  Object.freeze({ id: 'a', name: 'Fictional An', age: 24 }),
  Object.freeze({ id: 'b', name: 'Fictional Binh', age: 28 }),
  Object.freeze({ id: 'c', name: 'Fictional Chi', age: 30 }),
])
const record = (profileId, action = 'LIKE') => Object.freeze({ profileId, action })

describe('swipe contract', () => {
  it.each([
    ['left', 'DISLIKE', -5],
    ['right', 'LIKE', 10],
    ['up', 'SKIP', -5],
  ])('%s records %s with %i points and advances once', (direction, action, points) => {
    const history = swipe(profiles, [], direction)
    expect(history).toEqual([{ profileId: 'a', action }])
    expect(calculateScore(history)).toBe(points)
    expect(getCurrentProfile(profiles, history)).toBe(profiles[1])
  })

  it('appends immutably to frozen history without changing earlier snapshots', () => {
    const first = record('a')
    const history = Object.freeze([first])
    const next = swipe(profiles, history, 'up')
    expect(next).not.toBe(history)
    expect(history).toEqual([{ profileId: 'a', action: 'LIKE' }])
    expect(next).toEqual([first, { profileId: 'b', action: 'SKIP' }])
    expect(next[1]).not.toBe(first)
    expect(profiles.map(({ id }) => id)).toEqual(['a', 'b', 'c'])
  })

  it.each(['down', 'RIGHT', '', 'toString', '__proto__', null, undefined, 1])(
    'rejects invalid direction %s even for an empty deck', (direction) => {
      expect(() => swipe([], [], direction)).toThrow(TypeError)
    },
  )

  it('returns unchanged history at completion', () => {
    const history = Object.freeze([record('a'), record('b', 'SKIP'), record('c', 'DISLIKE')])
    expect(swipe(profiles, history, 'right')).toBe(history)
    expect(getCurrentProfile(profiles, history)).toBeNull()
    expect(getProgress(profiles, history)).toEqual({ completed: 3, total: 3, remaining: 0, isComplete: true })
  })

  it('handles an empty deck', () => {
    const history = Object.freeze([])
    expect(swipe([], history, 'up')).toBe(history)
    expect(getCurrentProfile([], history)).toBeNull()
    expect(getProgress([], history)).toEqual({ completed: 0, total: 0, remaining: 0, isComplete: true })
  })
})

describe('LIFO undo and derived state', () => {
  it('starts with zero score and the first card', () => {
    expect(calculateScore([])).toBe(0)
    expect(getCurrentProfile(profiles, [])).toBe(profiles[0])
    expect(getProgress(profiles, [])).toEqual({ completed: 0, total: 3, remaining: 3, isComplete: false })
  })

  it('uses asymmetric scoring and permits negative totals', () => {
    expect(calculateScore([record('a'), record('b', 'SKIP'), record('c', 'DISLIKE')])).toBe(0)
    expect(calculateScore([record('a', 'SKIP'), record('b', 'DISLIKE')])).toBe(-10)
  })

  it.each(['LIKE', 'DISLIKE', 'SKIP'])('undo removes latest %s and restores its score/card', (action) => {
    const history = Object.freeze([record('a'), record('b', action)])
    const next = undo(history)
    expect(next).not.toBe(history)
    expect(next).toEqual([record('a')])
    expect(history).toEqual([record('a'), record('b', action)])
    expect(calculateScore(next)).toBe(10)
    expect(getCurrentProfile(profiles, next)).toBe(profiles[1])
    expect(undo(next)).toEqual([])
  })

  it('undo on empty history is a stable no-op', () => {
    const history = Object.freeze([])
    expect(undo(history)).toBe(history)
    expect(calculateScore(undo(history))).toBe(0)
  })

  it('undo at completion reopens the last card and allows a replacement decision', () => {
    let history = swipe(profiles, [], 'right')
    history = swipe(profiles, history, 'right')
    history = swipe(profiles, history, 'right')
    const reopened = undo(history)
    expect(getCurrentProfile(profiles, reopened)).toBe(profiles[2])
    expect(getProgress(profiles, reopened)).toEqual({ completed: 2, total: 3, remaining: 1, isComplete: false })
    const replacement = swipe(profiles, reopened, 'left')
    expect(calculateScore(replacement)).toBe(15)
    expect(calculateScore(history)).toBe(30)
    expect(replacement[2]).toEqual({ profileId: 'c', action: 'DISLIKE' })
  })
})

describe('invalid models and history', () => {
  it.each([
    null,
    {},
    [null],
    [{ id: '', name: 'Fictional', age: 25 }],
    [{ id: ' a ', name: 'Fictional', age: 25 }],
    [{ id: 'a', age: 25 }],
    [{ id: 'a', name: ' ', age: 25 }],
    [{ id: 'a', name: 'Fictional', age: 17 }],
    [{ id: 'a', name: 'Fictional', age: 24.5 }],
    [{ id: 'a', name: 'Fictional', age: 25, bio: 1 }],
    [{ id: 'a', name: 'Fictional', age: 25, imageUrl: null }],
    [profiles[0], profiles[0]],
  ].map((deck) => [deck]))('rejects malformed deck %j', (deck) => {
    expect(() => swipe(deck, [], 'right')).toThrow(TypeError)
    expect(() => getCurrentProfile(deck, [])).toThrow(TypeError)
    expect(() => getProgress(deck, [])).toThrow(TypeError)
  })

  it.each([
    null, {}, [null], [{ action: 'LIKE' }], [record('')], [record(' a ')],
    [record('a', 'LOVE')], [record('a', 'toString')], [record('a', '__proto__')],
    [record('a'), record('a')],
  ].map((history) => [history]))('rejects malformed history %j', (history) => {
    expect(() => swipe(profiles, history, 'right')).toThrow(TypeError)
    expect(() => undo(history)).toThrow(TypeError)
    expect(() => calculateScore(history)).toThrow(TypeError)
    expect(() => getCurrentProfile(profiles, history)).toThrow(TypeError)
    expect(() => getProgress(profiles, history)).toThrow(TypeError)
  })

  it.each([
    [record('b')],
    [record('a'), record('c')],
    [record('a'), record('b'), record('c'), record('d')],
  ].map((history) => [history]))('rejects non-prefix history %j', (history) => {
    expect(() => swipe(profiles, history, 'right')).toThrow(RangeError)
    expect(() => getCurrentProfile(profiles, history)).toThrow(RangeError)
    expect(() => getProgress(profiles, history)).toThrow(RangeError)
  })

  it('rejects nonempty history on an empty deck', () => {
    expect(() => swipe([], [record('a')], 'right')).toThrow(RangeError)
  })
})
