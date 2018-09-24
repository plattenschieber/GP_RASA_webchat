import { Map, List } from 'immutable';
import { ADD_SCORE } from '../score-actions';

const initialState = List([Map({ action: 'MyAction', score: 1 }), Map({ action: 'MyAction2', score: 0.1 })]);


export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_SCORE:
      return state.push(Map({ score: action.score, action: action.action }));
    default:
      return state;
  }
}
