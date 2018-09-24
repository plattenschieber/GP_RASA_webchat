import React from 'react';
import Scores from './components/Scores';
import Intents from './components/Intents';
import Events from './components/Events';

import './style.scss';

const Training = props =>
  <div className="training-container">
    <Scores />
    <Intents />
    <Events />
  </div>;

Training.propTypes = {
}

export default Training;
