/*
 action types
 */

export const ADD_INTENT = 'ADD_INTENT';

/*
 action creators
 */

export function addIntent(name, confidence) {
  return { type: ADD_INTENT, name, confidence };
}
