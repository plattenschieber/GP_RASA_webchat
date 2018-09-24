/*
 action types
 */

export const ADD_INTENT = 'ADD_INTENT';
export const CLEAR_INTENTS = 'CLEAR_INTENTS';

/*
 action creators
 */

export function addIntent(name, confidence) {
  return { type: ADD_INTENT, name, confidence };
}

export function clearIntents() {
  return { type: CLEAR_INTENTS };
}