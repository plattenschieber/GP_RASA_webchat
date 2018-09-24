import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import './style.scss';

import Event from './components/Event';

class Events extends Component {

  render() {
    return (
      <div id="events" className="events-container">
        {
          this.props.events.map((event, index) =>
            <div className="event" key={index}>
              {
                <Event event={event} />
              }
            </div>
          )
        }
      </div>
    );
  }
}

Events.propType = {
  events: ImmutablePropTypes.listOf(ImmutablePropTypes.map)
};

export default connect(store => ({
  events: store.events
}))(Events);
