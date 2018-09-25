import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Conversation from './components/Conversation';
import './style.scss';
import Training from './components/Training';

const WidgetLayoutTrain = props =>
  <div className={'widgets-container'}>

    <div className={'training-widget-container'}>
      {
        <Training onIntentChoice={props.onIntentChoice} />
      }
    </div>
    <div className={props.fullScreenMode ? 'widget-container full-screen' : 'widget-container'}>
      {
        <Conversation
          title={props.title}
          subtitle={props.subtitle}
          sendMessage={props.onSendMessage}
          profileAvatar={props.profileAvatar}
          toggleChat={props.onToggleConversation}
          showChat={props.showChat}
          showCloseButton={props.showCloseButton}
          disabledInput={props.disabledInput}
        />
      }
    </div>
  </div>;

WidgetLayoutTrain.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  onSendMessage: PropTypes.func,
  onToggleConversation: PropTypes.func,
  onIntentChoice: PropTypes.func,
  showChat: PropTypes.bool,
  profileAvatar: PropTypes.string,
  showCloseButton: PropTypes.bool,
  disabledInput: PropTypes.bool,
  fullScreenMode: PropTypes.bool,
  badge: PropTypes.number
};

export default connect(store => ({
  showChat: store.behavior.get('showChat'),
  disabledInput: store.behavior.get('disabledInput')
}))(WidgetLayoutTrain);
