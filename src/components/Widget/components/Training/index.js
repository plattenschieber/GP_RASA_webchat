import React from 'react';
import PropTypes from 'prop-types';
import Scores from './components/Scores';
import Intents from './components/Intents';
import Events from './components/Events';


import './style.scss';
import Header from '../Conversation/components/Header';
import ConnectedWidget from '../../../../index';

const Training = props =>
  <div className="training-container">
    <Header title={props.showComp} subtitle={'Wähle das passende Item!'} />
    {
      props.showComp === 'scores' && <Scores />
    }
    {
      props.showComp === 'intents' && <Intents />
    }
    {
      props.showComp === 'events' && <Events />
    }

  </div>;

Training.propTypes = {
  showComp: PropTypes.string
};

Training.defaultProps = {
  showComp: 'intents'
};

export default Training;
