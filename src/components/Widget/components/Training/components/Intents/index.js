import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './style.scss';

import Intent from './components/Intent';
import {showActions} from '../../../../../../store/training-actions';
import {
  removeLastEvent,
  resetTracker
} from '../../../../../../store/event-actions';

class Intents extends Component {
  constructor(props) {
    super(props);
    this.handleIntentChoice = this.handleIntentChoice.bind(this);
  }

  handleIntentChoice(intent) {
    if (intent === this.props.intents.get(0)) {
      this.props.dispatch(showActions());
    } else {
      console.log('Other Intent chosen');
      // Revert events
      this.props.dispatch(removeLastEvent());
      this.props.dispatch(resetTracker());
      // Post new events + new intent
    }
  }

  render() {
    return (
      <div id="intents" className="intents-container">
        {
          this.props.intents.map((intent, index) =>
            <Intent
              intent={intent} key={index}
              onIntentChoice={() => this.handleIntentChoice(intent)}
            />
          )
        }
      </div>
    );
  }
}

Intents.propType = {
  intents: ImmutablePropTypes.listOf(ImmutablePropTypes.map),
};

export default connect(store => ({
  intents: store.intents
}))(Intents);

