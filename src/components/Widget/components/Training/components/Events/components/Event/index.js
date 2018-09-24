import React, { PureComponent } from 'react';
import { PROP_TYPES } from 'constants';

import './style.scss';

class Event extends PureComponent {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log('Event was clicked: ' + this.props.event.get('name'));
  }

  render() {
    return (
      <button className="event" onClick={this.handleClick}>
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
      </button>
    );
  }
}

Event.propType = {
  event: PROP_TYPES.EVENT
};

export default Event;
