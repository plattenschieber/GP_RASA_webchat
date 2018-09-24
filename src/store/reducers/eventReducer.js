import { Map, List } from 'immutable';
import { ADD_EVENT } from '../event-actions';

const initialState = List([Map({ eventtype: 'action', name: 'action_listen', timestamp: 1537344261.3186414, text: 'test text' })]);


export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_EVENT:
      return state.push(Map({ event: action.event,
        name: action.name,
        timestamp: action.timestamp,
        text: action.text }));
    default:
      return state;
  }
}
