import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './style.scss';

import Intent from './components/Intent';
import {showActions} from "../../../../../../store/training-actions";

class Intents extends Component {
  constructor(props) {
    super(props);
    this.handleIntentChoice = this.handleIntentChoice.bind(this);
  }
  // handleNewIntentChoice = (intent) =>{
  //
  // }
  handleIntentChoice() {
    this.props.dispatch(showActions());
  }

  render() {
    return (
      <div id="intents" className="intents-container">
        {
          this.props.intents.map((intent, index) =>
            <Intent
              intent={intent} key={index}
              isHighestConfidence={index === 0}
              onIntentChoice={() => this.handleIntentChoice()}
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

