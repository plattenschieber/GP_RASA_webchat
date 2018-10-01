import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

import Widget from './components/Widget';
import { store, initStore } from '../src/store/store';
import socket from './socket';

const ConnectedWidget = (props) => {
  let sock = null;
  if (!props.enableTraining) {
    console.log(`Init with socket on url: ${props.socketUrl}`);
    sock = socket(props.socketUrl, props.customData);
    initStore(props.inputTextFieldHint, sock, null, false);
  } else {
    console.log(`Init with Training Mode on url: ${props.trainingUrl}`);
    initStore(props.inputTextFieldHint, null, props.trainingUrl, true);
  }

  return (<Provider store={store}>
    <Widget
      socket={sock}
      interval={props.interval}
      initPayload={props.initPayload}
      title={props.title}
      subtitle={props.subtitle}
      customData={props.customData}
      handleNewUserMessage={props.handleNewUserMessage}
      profileAvatar={props.profileAvatar}
      showCloseButton={props.showCloseButton}
      fullScreenMode={props.fullScreenMode}
      enableTraining={props.enableTraining}
      badge={props.badge}
    />
  </Provider>);
};

ConnectedWidget.propTypes = {
  initPayload: PropTypes.string,
  interval: PropTypes.number,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  socketUrl: PropTypes.string.isRequired,
  customData: PropTypes.shape({}),
  handleNewUserMessage: PropTypes.func,
  profileAvatar: PropTypes.string,
  inputTextFieldHint: PropTypes.string,
  showCloseButton: PropTypes.bool,
  fullScreenMode: PropTypes.bool,
  enableTraining: PropTypes.bool,
  trainingUrl: PropTypes.string,
  badge: PropTypes.number
};

ConnectedWidget.defaultProps = {
  title: 'Welcome',
  customData: {},
  interval: 2000,
  inputTextFieldHint: 'Type a message...',
  showCloseButton: true,
  fullScreenMode: false,
  socketUrl: 'http://localhost:5005',
  trainingUrl: 'http://localhost:5005',
  badge: 0,
  enableTraining: false
};

export default ConnectedWidget;
