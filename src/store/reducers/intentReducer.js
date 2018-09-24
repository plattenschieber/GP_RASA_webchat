import { Map, List } from 'immutable';
import { ADD_INTENT } from '../intent-actions';

const initialState = List([Map({ confidence: 0.5, name: 'MyIntent' })]);


export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_INTENT:
      return state.push(Map({ confidence: action.confidence, name: action.name }));
    default:
      return state;
  }
}
