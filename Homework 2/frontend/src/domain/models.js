/**
 * @typedef {Readonly<{id: string, name: string, age: number, bio?: string, imageUrl?: string}>} Profile
 * Fictional adults only. IDs are unique and stable within an ordered deck.
 *
 * @typedef {'DISLIKE' | 'LIKE' | 'SKIP'} SwipeAction
 * @typedef {Readonly<{profileId: string, action: SwipeAction}>} Interaction
 * @typedef {ReadonlyArray<Interaction>} InteractionHistory
 * History belongs to one caller-owned demo session and one fixed ordered deck.
 */

export const SWIPE_ACTIONS = Object.freeze({
  DISLIKE: 'DISLIKE',
  LIKE: 'LIKE',
  SKIP: 'SKIP',
})

export const DIRECTION_ACTIONS = Object.freeze({
  left: SWIPE_ACTIONS.DISLIKE,
  right: SWIPE_ACTIONS.LIKE,
  up: SWIPE_ACTIONS.SKIP,
})

export const ACTION_POINTS = Object.freeze({
  DISLIKE: -5,
  LIKE: 10,
  SKIP: -5,
})
