import { createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios';
import behavior from './reducers/behaviorReducer';
import messages from './reducers/messagesReducer';
import scores from './reducers/scoresReducer';
import { addScore, clearScores, predictScore } from './score-actions';


let store = 'call initStore first';

function initStore(hint, socket, serverUrl) {
  const socketMiddleWare = store => next => (action) => {
    if (action.type === 'EMIT_NEW_USER_MESSAGE') {
      socket.emit('user_uttered', { message: action.text, customData: socket.customData });
    }
    // console.log('Middleware triggered:', action);
    next(action);
  };

  const restMiddleWare = store => next => (action) => {
    if (action.type === 'EMIT_NEW_USER_MESSAGE') {
      axios.post((`${serverUrl}/conversations/default/messages`), {
        sender: 'user',
        text: action.text,
        parse_data: action.intent ? action.intent : null
      }, { headers: { 'Content-Type': 'application/json' } }).then(() => {
        console.log(`Respone from ${serverUrl}/conversations/default/messages was successful`);
        console.log('Will dispatch scores...');
        store.dispatch(predictScore());
      }).catch((err) => {
        console.log(`Error: ${JSON.stringify(err)}`);
      });
    }

    if (action.type === 'EMIT_PREDICT') {
      console.log('clear all previous scores from store');
      store.dispatch(clearScores());
      console.log(`Request to: ${serverUrl}/conversations/default/predict`);
      axios.post((`${serverUrl}/conversations/default/predict`)).then((res) => {
        console.log(`Respone from ${serverUrl}/conversations/default/predict was successful`);
        console.log(`Recieved ${res.data.scores.length} Actions...`);
        res.data.scores.forEach((score) => {
          store.dispatch(addScore(score.action, score.score));
        });
      }).catch((err) => {
        console.log(`Error: ${JSON.stringify(err)}`);
      });
    }

    if (action.type === 'EMIT_EXECUTE_ACTIONS') {
      axios.post((`${serverUrl}/conversations/default/execute`), {
        action: action.action
      }, { headers: { 'Content-Type': 'application/json' } }).then((res) => {
        console.log(`Respone from ${serverUrl}/conversations/default/execute was successful : ${JSON.stringify(res)}`);
      }).catch((err) => {
        console.log(`Error: ${JSON.stringify(err)}`);
      });
    }

    if (action.type === 'EMIT_RESET_TRACKER') {
      axios.put((`${serverUrl}/conversations/default/tracker/events`), action.eventTracker, { headers: { 'Content-Type': 'application/json' } }).then((res) => {
        console.log(`Respone from ${serverUrl}/conversations/default/tracker/events was successful : ${JSON.stringify(res)}`);
      }).catch((err) => {
        console.log(`Error: ${JSON.stringify(err)}`);
      });
    }

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
