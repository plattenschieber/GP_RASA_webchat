/*
 action types
 */

export const ADD_SCORE = 'ADD_SCORE';

/*
 action creators
 */

export function addScore(action, score) {
  return { type: ADD_SCORE, action, score };
}
