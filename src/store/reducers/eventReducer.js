import { Map, List } from 'immutable';
import {
  ADD_EVENT,
  CLEAR_EVENTS,
  REMOVE_LAST_EVENT,
  RESET_TRACKER
} from '../event-actions';

const initialState = List([Map({
  event: 'action',
  name: 'action_listen',
  timestamp: 1537344261.3186414,
  text: 'test text'
})]);


export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_EVENT:
      return state.push(Map({
        event: action.event,
        name: action.name,
        timestamp: action.timestamp,
        parse_data: action.parseData,
        text: action.text
      }));
    case REMOVE_LAST_EVENT:
      return state.pop();
    case RESET_TRACKER:
      return state;
    case CLEAR_EVENTS:
      return state.clear();
    default:
      return state;
  }
}
