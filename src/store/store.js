import { createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios';
import behavior from './reducers/behaviorReducer';
import messages from './reducers/messagesReducer';
import scores from './reducers/scoresReducer';


let store = 'call initStore first';

function initStore(hint, socket) {
  const socketMiddleWare = store => next => (action) => {
    if (action.type === 'EMIT_NEW_USER_MESSAGE') {
      socket.emit('user_uttered', { message: action.text, customData: socket.customData });
    }
    // console.log('Middleware triggered:', action);
    next(action);
  };

  const restMiddleWare = store => next => (action) => {
    console.log('Middleware triggered:', action);
    axios.post('http://localhost:5005/conversations/default/messages', {
      sender: 'user',
      text: 'hallo',
      parse_data: null
    }, { headers: { 'Content-Type': 'application/json' } });
    next(action);
  };

  const reducer = combineReducers({ behavior: behavior(hint), messages, scores });

  /* eslint-disable no-underscore-dangle */
  store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(restMiddleWare)
  );
  /* eslint-enable */
}

export { initStore, store };
