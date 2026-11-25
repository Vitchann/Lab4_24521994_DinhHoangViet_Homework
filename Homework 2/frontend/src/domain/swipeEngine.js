import { ACTION_POINTS, DIRECTION_ACTIONS } from './models.js'

const isText = (value) => typeof value === 'string' && value.length > 0 && value.trim() === value
const isRecord = (value) => value !== null && typeof value === 'object' && !Array.isArray(value)

function validateHistory(history) {
  if (!Array.isArray(history)) throw new TypeError('History must be an array')
  const ids = new Set()
  for (const entry of history) {
    if (!isRecord(entry) || !isText(entry.profileId) ||
        typeof entry.action !== 'string' || !Object.hasOwn(ACTION_POINTS, entry.action)) {
      throw new TypeError('Invalid interaction')
    }
    if (ids.has(entry.profileId)) throw new TypeError('Duplicate interaction profile ID')
    ids.add(entry.profileId)
  }
}

function validateDeckHistory(profiles, history) {
  if (!Array.isArray(profiles)) throw new TypeError('Profiles must be an array')
  const ids = new Set()
  for (const profile of profiles) {
    if (!isRecord(profile) || !isText(profile.id) || !isText(profile.name) ||
        !Number.isInteger(profile.age) || profile.age < 18 ||
        (profile.bio !== undefined && typeof profile.bio !== 'string') ||
        (profile.imageUrl !== undefined && typeof profile.imageUrl !== 'string')) {
      throw new TypeError('Invalid adult profile')
    }
    if (ids.has(profile.id)) throw new TypeError('Duplicate profile ID')
    ids.add(profile.id)
  }
  validateHistory(history)
  if (history.length > profiles.length ||
      history.some((entry, index) => entry.profileId !== profiles[index].id)) {
    throw new RangeError('History must match the ordered deck prefix')
  }
}

/**
 * @param {ReadonlyArray<import('./models.js').Profile>} profiles
 * @param {import('./models.js').InteractionHistory} history
 * @param {'left' | 'right' | 'up'} direction
 * @returns {import('./models.js').InteractionHistory}
 */
export function swipe(profiles, history, direction) {
  if (typeof direction !== 'string' || !Object.hasOwn(DIRECTION_ACTIONS, direction)) {
    throw new TypeError('Direction must be left, right or up')
  }
  validateDeckHistory(profiles, history)
  const current = profiles[history.length]
  if (!current) return history
  return [...history, { profileId: current.id, action: DIRECTION_ACTIONS[direction] }]
}

/** @param {import('./models.js').InteractionHistory} history */
export function undo(history) {
  validateHistory(history)
  return history.length === 0 ? history : history.slice(0, -1)
}

/** @param {import('./models.js').InteractionHistory} history */
export function calculateScore(history) {
  validateHistory(history)
  return history.reduce((score, entry) => score + ACTION_POINTS[entry.action], 0)
}

/**
 * @param {ReadonlyArray<import('./models.js').Profile>} profiles
 * @param {import('./models.js').InteractionHistory} history
 * @returns {import('./models.js').Profile | null}
 */
export function getCurrentProfile(profiles, history) {
  validateDeckHistory(profiles, history)
  return profiles[history.length] ?? null
}

/**
 * @param {ReadonlyArray<import('./models.js').Profile>} profiles
 * @param {import('./models.js').InteractionHistory} history
 */
export function getProgress(profiles, history) {
  validateDeckHistory(profiles, history)
  return {
    completed: history.length,
    total: profiles.length,
    remaining: profiles.length - history.length,
    isComplete: history.length === profiles.length,
  }
}
