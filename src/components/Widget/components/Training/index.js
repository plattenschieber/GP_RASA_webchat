


import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import connect from 'react-redux/es/connect/connect';

import Scores from './components/Scores';
import Intents from './components/Intents';
import Events from './components/Events';
import { SHOW_ACTIONS, SHOW_EVENTS, SHOW_INTENTS } from '../../../../store/training-actions';

import './style.scss';
import Header from '../Conversation/components/Header';


const Training = props =>
  <div className="training-container">
    <Header title={props.trainings[0]} subtitle={'Wähle das passende Item!'} />
    {
      props.trainings.map((training, index) => {
        console.log(training);
        switch (training.component) {
          case SHOW_INTENTS:
            return <Intents key={index} />;
          case SHOW_ACTIONS:
            return <Scores key={index} />;
          case SHOW_EVENTS:
            return <Events key={index} />;
          default:
            return <Intents key={index} />;
        }
      })
    }

  </div>;

Training.propTypes = {
  trainings: ImmutablePropTypes.listOf(ImmutablePropTypes.map)
};

export default connect(store => ({
  trainings: store.trainings
}))(Training);
