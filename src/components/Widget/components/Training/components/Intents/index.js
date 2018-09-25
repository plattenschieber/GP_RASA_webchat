import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './style.scss';

import Intent from './components/Intent';

class Intents extends Component {

  render() {
    return (
      <div id="intents" className="intents-container">
        {
          this.props.intents.map((intent, index, onIntentChoice) =>
            <Intent
              intent={intent} key={index}
              isHighestConfidence={index === 0}
              onIntentChoice={onIntentChoice}
            />
          )
        }
      </div>
    );
  }
}

Intents.propType = {
  intents: ImmutablePropTypes.listOf(ImmutablePropTypes.map),
  onIntentChoice: PropTypes.func
};

export default connect(store => ({
  intents: store.intents
}))(Intents);

