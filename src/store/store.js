import { applyMiddleware, combineReducers, createStore } from 'redux';
import axios from 'axios';

import { addResponseMessage } from 'actions';
import behavior from './reducers/behaviorReducer';
import messages from './reducers/messagesReducer';
import scores from './reducers/scoresReducer';
import trainings from './reducers/trainingReducer';

import { addScore, clearScores, predictScore } from './score-actions';
import intents from './reducers/intentReducer';
import events from './reducers/eventReducer';
import { addIntent, clearIntents } from './intent-actions';
import { addEvent, clearEvents } from './event-actions';
import { showIntents } from './training-actions';


const uuid = require('uuid/v1');

let store = 'call initStore first';

function initStore(hint, socket, serverUrl) {
  const conversationID = uuid();
  const socketMiddleWare = store => next => (action) => {
    if (action.type === 'EMIT_NEW_USER_MESSAGE') {
      socket.emit('user_uttered', { message: action.text, customData: socket.customData });
    }
    // console.log('Middleware triggered:', action);
    next(action);
  };

  const restMiddleWare = store => next => (action) => {
    if (action.type === 'EMIT_NEW_USER_MESSAGE') {
      console.log('clear all previous Intents from store');
      store.dispatch(clearIntents());

      axios.post((`${serverUrl}/conversations/${conversationID}/messages`), {
        sender: 'user',
        text: action.text,
        parse_data: action.intent ? action.intent : null
      }, { headers: { 'Content-Type': 'application/json' } }).then((res) => {
        console.log(`Respone from ${serverUrl}/conversations/${conversationID}/messages was successful`);
        console.log(`Recieved ${res.data.latest_message.intent_ranking.length} Intents...`);
        res.data.latest_message.intent_ranking.forEach((intent) => {
          store.dispatch(addIntent(intent.name, intent.confidence));
        });

        console.log('Will dispatch scores...');
        store.dispatch(predictScore());

        console.log('Will dispatch Events...');
        console.log('Clear all previous events from store');
        store.dispatch(clearEvents());
        res.data.events.forEach((event) => {
          store.dispatch(
            addEvent(event.event, event.name, event.timestamp, event.parse_data, event.text));
        });

      }).catch((err) => {
        console.log(`Error: ${JSON.stringify(err)}`);
      });
    }

    if (action.type === 'EMIT_PREDICT') {
      console.log('clear all previous scores from store');
      store.dispatch(clearScores());
      console.log(`Request to: ${serverUrl}/conversations/${conversationID}/predict`);
      axios.post((`${serverUrl}/conversations/${conversationID}/predict`)).then((res) => {
        console.log(`Respone from ${serverUrl}/conversations/${conversationID}/predict was successful`);
        console.log(`Recieved ${res.data.scores.length} Actions...`);
        res.data.scores.forEach((score) => {
          store.dispatch(addScore(score.action, score.score));
        });
      }).catch((err) => {
        console.log(`Error: ${JSON.stringify(err)}`);
      });
    }

    if (action.type === 'EXECUTE_ACTION') {
      axios.post((`${serverUrl}/conversations/${conversationID}/execute`), {
        action: action.action
      }, { headers: { 'Content-Type': 'application/json' } }).then((res) => {
        console.log(`Respone from ${serverUrl}/conversations/${conversationID}/execute was successful : ${JSON.stringify(res)}`);

        if (action.action != 'action_listen') {
          store.dispatch(addResponseMessage(res.data.messages[0].text));
          store.dispatch(predictScore());
        }else{
          store.dispatch(addResponseMessage('... warte auf Antwort'));
          store.dispatch(clearIntents());
          store.dispatch(showIntents());
        }
      }).catch((err) => {
        console.log(`Error: ${JSON.stringify(err)}`);
      });
    }

    if (action.type === 'EMIT_RESET_TRACKER') {
      axios.put((`${serverUrl}/conversations/${conversationID}/tracker/events`), action.eventTracker, { headers: { 'Content-Type': 'application/json' } }).then((res) => {
        console.log(`Respone from ${serverUrl}/conversations/${conversationID}/tracker/events was successful : ${JSON.stringify(res)}`);
      }).catch((err) => {
        console.log(`Error: ${JSON.stringify(err)}`);
      });
    }

    next(action);
  };

  const reducer = combineReducers({ behavior: behavior(hint), messages, scores, intents, events, trainings });

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
