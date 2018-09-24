import React, { PureComponent } from 'react';
import { PROP_TYPES } from 'constants';

import './style.scss';

class Intent extends PureComponent {
  render() {
    return (
      <div className="intent">
        <div className="confidence">
          <p style={{ margin: '0' }}>{this.props.intent.get('confidence')}</p>
        </div>
        <div className="name">
          <p style={{ margin: '0' }}>{this.props.intent.get('name')}</p>
        </div>
      </div>
    );
  }
}

Intent.propTypes = {
  intent: PROP_TYPES.INTENT
};

export default Intent;
