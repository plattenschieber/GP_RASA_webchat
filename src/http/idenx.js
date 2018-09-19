import { Axios } from 'axios';

const httpClientMiddleware = store => next => (action) => {
  Axios.get();
  if (action.type === 'SEND_USER_MESSAGE') {
    console.log('Send a new user message');
  }
  if (action.type === 'SEND_PREDICT') {
    console.log('');
  }
  if (action.type === 'SEND_EXECUTE') {
    console.log('');
  }
  if (action.type === 'SEND_RESET') {
    console.log('');
  }
};

export {
  httpClientMiddleware
};
