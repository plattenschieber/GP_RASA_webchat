import React, { PureComponent } from 'react';
import { PROP_TYPES } from 'constants';
import PropTypes from 'prop-types';

import './style.scss';

const Color = require('color');
const red = Color('#b92211');
const green = Color('#35e65d');

class Intent extends PureComponent {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }


  handleClick() {
    console.log(`Intent was clicked: ${this.props.intent.get('name')}`);
    this.props.onIntentChoice(this.props.intent);
  }

  render() {
    return (
      <div className="intent" onClick={this.handleClick}>
        <div className="name">
          <p style={{ margin: '0' }}><strong>Intent:</strong>&nbsp;{this.props.intent.get('name')}</p>
        </div>
        <div className="confidence">
          <p style={{
            margin: '0',
            color: red.mix(green, this.props.intent.get('confidence'))
          }}>{Math.round(this.props.intent.get('confidence') * 100)}%</p>
        </div>
      </div>
    );
  }
}

Intent.propTypes = {
  intent: PROP_TYPES.INTENT,
  onIntentChoice: PropTypes.func
};

export default Intent;
