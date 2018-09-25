import React, { PureComponent } from 'react';
import { PROP_TYPES } from 'constants';
import PropTypes from 'prop-types';

import './style.scss';

class Intent extends PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log(`Intent was clicked: ${this.props.intent.get('name')}`);
    console.log(this.props);
    if (this.props.isHighestConfidence) {
      this.props.onIntentChoice();
      console.log('isHighestConfidence = true');
    }
  }

  render() {
    return (
      <div className="intent" onClick={this.handleClick}>
        <div className="name">
          <p style={{ margin: '0' }}><strong>Intent:</strong>&nbsp;{this.props.intent.get('name')}</p>
        </div>
        <div className="confidence">
          <p style={{ margin: '0' }}>{Math.round(this.props.intent.get('confidence') * 100)}%</p>
        </div>
      </div>
    );
  }
}

Intent.propTypes = {
  intent: PROP_TYPES.INTENT,
  isHighestConfidence: PropTypes.bool,
  onIntentChoice: PropTypes.func
};

export default Intent;
