/*
 action types
 */

export const ADD_SCORE = 'ADD_SCORE';
export const CLEAR_SCORES = 'CLEAR_SCORES';
export const PREDICT_SCORES = 'EMIT_PREDICT';

/*
 action creators
 */

export function addScore(action, score) {
  return { type: ADD_SCORE, action, score };
}

export function clearScores() {
  return { type: CLEAR_SCORES };
}

export function predictScore() {
  return { type: PREDICT_SCORES };
}
