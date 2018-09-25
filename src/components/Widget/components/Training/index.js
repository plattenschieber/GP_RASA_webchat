import React from 'react';
import PropTypes from 'prop-types';
import Scores from './components/Scores';
import Intents from './components/Intents';
import Events from './components/Events';


import './style.scss';
import Header from '../Conversation/components/Header';
import connect from 'react-redux/es/connect/connect';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { SHOW_ACTIONS, SHOW_EVENTS, SHOW_INTENTS } from '../../../../store/training-actions';

const Training = ({trainings, onIntentChoice}) =>
  <div className="training-container">
    <Header title={trainings[0]} subtitle={'Wähle das passende Item!'} />
    {
      trainings.map((training) => {
        console.log(training);
        switch (training.component) {
          case SHOW_INTENTS:
            return <Intents onIntentChoice={onIntentChoice} />;
          case SHOW_ACTIONS:
            return <Scores />;
          case SHOW_EVENTS:
            return <Events />;
          default:
            return <Intents />;
        }
      })
    }

  </div>;

Training.propTypes = {
  trainings: ImmutablePropTypes.listOf(ImmutablePropTypes.map),
  onIntentChoice: PropTypes.func
};

export default connect(store => ({
  trainings: store.trainings
}))(Training);
