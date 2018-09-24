import React, { PureComponent } from 'react';
import { PROP_TYPES } from 'constants';

import './style.scss';

class Score extends PureComponent {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log(`Score was clicked: ${this.props.score.get('action')}`);
  }

  render() {
    return (
      <button className="score" onClick={this.handleClick}>
        <div className="action" >
          <p style={{ margin: '0' }}>{this.props.score.get('action')}</p>
        </div>
        <div className="score-value" >
          <p style={{ margin: '0' }}>{this.props.score.get('score')}</p>
        </div>
      </button>
    );
  }
}

Score.propTypes = {
  score: PROP_TYPES.SCORE
};

export default Score;
