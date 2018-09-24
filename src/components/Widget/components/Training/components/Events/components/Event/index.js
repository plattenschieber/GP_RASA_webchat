import React, { PureComponent } from 'react';
import { PROP_TYPES } from 'constants';

import './style.scss';

class Event extends PureComponent {
  render() {
    return (
      <div className="event">
        <div className="event-type">
          <p style={{ margin: '0'}}>{this.props.event.get('eventtype')}</p>
        </div>
        <div className="event-name">
          <p style={{ margin: '0'}}>{this.props.event.get('name')}</p>
        </div>
        <div className="event-timestamp">
          <p style={{ margin: '0'}}>{this.props.event.get('timestamp')}</p>
        </div>
        <div className="event-text">
          <p style={{ margin: '0'}}>{this.props.event.get('text')}</p>
        </div>
      </div>
    );
  }
}

Event.propType = {
  event: PROP_TYPES.EVENT
};

export default Event;
