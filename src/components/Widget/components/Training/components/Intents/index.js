import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import './style.scss';

import Intent from './components/Intent';

class Intents extends Component {

  render() {
    return (
      <div id="intents" className="intents-container">
        {
          this.props.intents.map((intent, index) =>
            <Intent intent={intent} key={index} />
          )
        }
      </div>
    );
  }
}

Intents.propType = {
  intents: ImmutablePropTypes.listOf(ImmutablePropTypes.map)
};

export default connect(store => ({
  intents: store.intents
}))(Intents);

