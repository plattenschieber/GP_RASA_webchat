import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux';

import './style.scss';

class Scores extends Component {
  getComponentToRender = (score, index) => {
    const ComponentToRender = score.get('component');
    if (score.get('type') === 'component') {
      return <ComponentToRender id={index} {...score.get('props')}/>;
    }
    return <ComponentToRender id={index} score={score}/>;
  };

  render() {
    return (
      <div id="scores" className="scores-container">
        {
          this.props.scores.map((score, index) =>
            <div className="score" key={index}>
              {
                this.getComponentToRender(score, index)
              }
            </div>
          )
        }
      </div>
    );
  }
}

Scores.propType = {
  scores: ImmutablePropTypes.listOf(ImmutablePropTypes.map)
};

export default connect(store => ({
  scores: store.scores
}))(Scores);
