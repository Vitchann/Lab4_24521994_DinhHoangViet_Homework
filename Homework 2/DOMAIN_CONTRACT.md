# Domain contract — P2-02

Recorded before P2-03 tests and P2-04 behavior implementation. Models are JSDoc JavaScript contracts in `frontend/src/domain/models.js`; these are domain models, not Mongoose persistence schemas (P2-10).

## Models and ownership

- Profile: `{ id, name, age, bio?, imageUrl? }`. ID/name are nonempty trimmed strings; age is an integer >=18. Optional bio/imageUrl are strings when present. Demo data must be fictional; asset sourcing is a later UI concern. Deck is an ordered array of unique stable IDs.
- SwipeAction: exactly `DISLIKE`, `LIKE` or `SKIP`. Lowercase directions map `left → DISLIKE`, `right → LIKE`, `up → SKIP`. Other strings, including `down`, uppercase variants and prototype property names, are invalid.
- Interaction: `{ profileId, action }`. No score field or undo action is stored. No implicit clock, random ID or network access.
- InteractionHistory: readonly chronological array of Interaction records. Records correspond exactly to the deck prefix in order, with no duplicate profile IDs. The next card is `profiles[history.length]`, or null at completion. Input deck/history/records may be frozen; engine never mutates them.
- One caller owns one history for one fixed ordered deck in one demo session. New session/deck requires resetting history. Session identity, persistence and request idempotency are deferred to P2-09; these pure operations do not provide authentication or durable sessions. A call swipes the current card once; later UI guards prevent duplicate input events. If a call supplies an old history snapshot, the caller must discard obsolete results.

## Pure interfaces

All functions are exported from `frontend/src/domain/swipeEngine.js`.

| Function | Result |
| --- | --- |
| `swipe(profiles, history, direction)` | Validate inputs, append a fresh `{profileId, action}` record to a fresh array; empty/completed deck returns the same history unchanged |
| `undo(history)` | Validate history; remove its last record with a new array; empty history returns itself |
| `calculateScore(history)` | Validate history and derive sum with reduce; LIKE +10, DISLIKE/SKIP -5; empty =0, negatives allowed |
| `getCurrentProfile(profiles, history)` | Validate deck/history prefix; return current input Profile reference or null |
| `getProgress(profiles, history)` | Validate deck/history prefix; return `{completed, total, remaining, isComplete}`; empty deck is complete |

Invalid shape/action/direction throws TypeError; invalid deck/history relationship (history too long, non-prefix IDs) throws RangeError. Unknown extra properties are ignored; action names must be own properties of the mapping. Validate even when deck/history is empty. Score/undo validate standalone history shape and unique IDs; deck-based operations additionally validate the prefix. Unchanged prior records may be shared structurally; newly appended records never alias caller-created records.

## Accepted/rejected examples and edge cases

For deck `[A, B, C]` containing valid adult Profiles:

| Input or operation | Expected |
| --- | --- |
| swipe([], [], 'right') | unchanged empty history; current null; score 0; complete |
| swipe(deck, [], 'left') | `[{profileId:'A', action:'DISLIKE'}]`, score -5, current B |
| right then up then left | LIKE, SKIP, DISLIKE; score 0; current null; progress 3/3 |
| undo after right then up | only LIKE remains; score 10; current B; SKIP returns B on undo just like other actions |
| undo([]) | same empty history; score 0 |
| undo then swipe another direction | append replacement decision; removed decision does not remain in score |
| swipe completed deck | unchanged history and score; undo reopens the last card |
| frozen deck/history/records | successful operations preserve all inputs |
| down, RIGHT, toString, null direction | TypeError, including on an empty deck |
| duplicate/blank ID, missing name, age 17 or fractional age | TypeError |
| invalid action, malformed history, duplicate interaction ID | TypeError |
| history starts at B, wrong order or history longer than deck | RangeError |

Selectors derive values on demand. Future React UI should own only profiles/history and transient interaction/network state; no synchronized score/current-card state or useEffect chains are required. Backend will independently validate requests and derive authoritative scores in later tasks.
