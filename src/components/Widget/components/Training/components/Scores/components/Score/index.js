import React, { PureComponent } from 'react';
import { PROP_TYPES } from 'constants';
import PropTypes from 'prop-types';
import './style.scss';

const Color = require('color');

const red = Color('#b92211');
const yellow = Color('#ffff00')
const green = Color('#35e65d');


class Score extends PureComponent {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log(`Score was clicked: ${this.props.score.get('action')}`);
    this.props.onActionChoice(this.props.score.get('action'));
  }


  render() {
    return (
      <div className="score" onClick={this.handleClick}>
        <div className="action">
          <p style={{ margin: '0' }}>{this.props.score.get('action')}</p>
        </div>

        <div className="score-value">
          <p style={{
            margin: '0',
            color: red.mix(yellow, this.props.score.get('score') * 2).mix(green, (this.props.score.get('score') * 2) - 1)
          }}>{Math.round(this.props.score.get('score') * 100)}%</p>
        </div>
      </div>
    );
  }
}

Score.propTypes = {
  score: PROP_TYPES.SCORE,

  onActionChoice: PropTypes.func
};

export default Score;
