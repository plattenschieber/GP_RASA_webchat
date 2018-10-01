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

export function addEvent(event, name, timestamp, parseData, text) {
  return { type: ADD_EVENT, event, name, timestamp, parseData, text };
}

export function removeLastEvent() {
  return { type: REMOVE_LAST_EVENT };
}

export function resetTracker(intent) {
  return { type: RESET_TRACKER, intent };
}

export function clearEvents() {
  return { type: CLEAR_EVENTS };
}
