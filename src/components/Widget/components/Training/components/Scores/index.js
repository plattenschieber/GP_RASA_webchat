import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
            <div className="score" key={index}>
              {
                <Score score={score} />
              }
            </div>
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
