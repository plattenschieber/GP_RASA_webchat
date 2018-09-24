/*
 action types
 */

export const ADD_EVENT = 'ADD_EVENT';

/*
 action creators
 */

export function addEvent(action, rasaevent) {
  return { type: ADD_EVENT, action, rasaevent };
}
