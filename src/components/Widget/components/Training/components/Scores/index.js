import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import './style.scss';

import Score from './components/Score';
import { chooseScore } from '../../../../../../store/score-actions';

class Scores extends Component {
  constructor(props) {
    super(props);
    this.handleActionChoice = this.handleActionChoice.bind(this);
  }

  handleActionChoice(score) {
    console.log('HandleActionChoice');
    console.log(score.get('action'));
    this.props.dispatch(chooseScore(score.get('action')));
  }

  render() {
    return (
      <div id="scores" className="scores-container">
        {
          this.props.scores.sortBy(item => item.get('score')).reverse().map((score, index) =>
            <Score
              score={score}
              key={index}
              onActionChoice={() => this.handleActionChoice(score)}
            />
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
