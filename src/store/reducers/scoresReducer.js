import { List } from 'immutable';
import { ADD_SCORE } from '../score-actions';

const initialState = List([]);

export default function reducer(state = initialState, action) {
  switch (action.type) {