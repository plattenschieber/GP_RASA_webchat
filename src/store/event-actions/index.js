/*
 action types
 */

export const ADD_EVENT = 'ADD_EVENT';
export const CLEAR_EVENTS = 'CLEAR_EVENTS';

/*
 action creators
 */

export function addEvent(eventtype, name, timestamp, parseData, text) {
  return { type: ADD_EVENT, eventtype, name, timestamp, parseData, text };
}

export function clearEvents() {
  return { type: CLEAR_EVENTS };
}
