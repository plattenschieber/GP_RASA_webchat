/*
 action types
 */

export const ADD_EVENT = 'ADD_EVENT';
export const CLEAR_EVENTS = 'CLEAR_EVENTS';
export const REMOVE_LAST_EVENT = 'REMOVE_LAST_EVENT';
export const RESET_TRACKER = 'RESET_TRACKER';

/*
 action creators
 */

export function addEvent(eventtype, name, timestamp, parseData, text) {
  return { type: ADD_EVENT, eventtype, name, timestamp, parseData, text };
}

export function removeLastEvent() {
  return { type: REMOVE_LAST_EVENT };
}

export function resetTracker() {
  return { type: RESET_TRACKER };
}

export function clearEvents() {
  return { type: CLEAR_EVENTS };
}
