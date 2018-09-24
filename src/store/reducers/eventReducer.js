import { Map, List } from 'immutable';
import { ADD_EVENT, CLEAR_EVENTS } from '../event-actions';

const initialState = List([Map({
  eventType: 'action',
  name: 'action_listen',
  timestamp: 1537344261.3186414,
  text: 'test text'
})]);


export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_EVENT:
      return state.push(Map({
        eventType: action.eventtype,
        name: action.name,
        timestamp: action.timestamp,
        parse_data: action.parseData,
        text: action.text
      }));
    case CLEAR_EVENTS:
      return state.clear();
    default:
      return state;
  }
}
