import { Map, List } from 'immutable';
import { ADD_SCORE, CLEAR_SCORES, PREDICT_SCORES } from '../score-actions';


const initialState = List([]);


export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_SCORE:
      return state.push(Map({ score: action.score, action: action.action }));
    case CLEAR_SCORES:
      return state.clear();
    case PREDICT_SCORES:
      return state;
    default:
      return state;
  }
}
