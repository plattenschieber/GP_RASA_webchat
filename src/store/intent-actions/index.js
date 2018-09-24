/*
 action types
 */

export const ADD_INTENT = 'ADD_INTENT';

/*
 action creators
 */

export function addIntent(action, intent) {
  return { type: ADD_INTENT, action, intent };
}
