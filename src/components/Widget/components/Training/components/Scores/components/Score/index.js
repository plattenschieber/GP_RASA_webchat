import React, { PureComponent } from 'react';
import { PROP_TYPES } from 'constants';

import './style.scss';

class Score extends PureComponent {
  render() {
    return (
      <div className="score">
        <div className="action" >
          <p style={{ margin: '0' }}>{this.props.score.get('action')}</p>
        </div>
        <div className="score-value" >
          <p style={{ margin: '0' }}>{this.props.score.get('score')}</p>
        </div>
      </div>
    );
  }
}

Score.propTypes = {
  score: PROP_TYPES.SCORE
};

export default Score;
