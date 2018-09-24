import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import './style.scss';

import Score from './components/Score';

class Scores extends Component {

  render() {
    return (
      <div id="scores" className="scores-container">
        {
          this.props.scores.map((score, index) =>
            <Score score={score} key={index} onClick={console.log('Click on Score')} />
          )
        }
      </div>
    );
  }
}

Scores.propType = {
  scores: ImmutablePropTypes.listOf(ImmutablePropTypes.map)
};

export default connect(store => ({
  scores: store.scores
}))(Scores);
