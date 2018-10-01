/*
 action types
 */


export const SHOW_EVENTS = 'Events';
export const SHOW_INTENTS = 'Intents';
export const SHOW_ACTIONS = 'Actions';


/*
 action creators
 */
export function showEvents() {
  return { type: SHOW_EVENTS };
}

export function showIntents() {
  return { type: SHOW_INTENTS };
}

export function showActions() {
  return { type: SHOW_ACTIONS };
}
