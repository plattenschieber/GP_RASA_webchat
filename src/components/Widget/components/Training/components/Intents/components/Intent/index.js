import React, { PureComponent } from 'react';
import { PROP_TYPES } from 'constants';

import './style.scss';

class Intent extends PureComponent {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log(`Intent was clicked: ${this.props.intent.get('name')}`);
  }

  render() {
    return (
      <button className="intent" onClick={this.handleClick}>
        <div className="confidence">
          <p style={{ margin: '0' }}>{this.props.intent.get('confidence')}</p>
        </div>
        <div className="name">
          <p style={{ margin: '0' }}>{this.props.intent.get('name')}</p>
        </div>
      </button>
    );
  }
}

Intent.propTypes = {
  intent: PROP_TYPES.INTENT
};

export default Intent;
