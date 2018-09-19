import React from 'react';
import PropTypes from 'prop-types';

import Scores from './components/Scores';

import './style.scss';

const Training = props =>
  <div className="training-container">
    <Scores />
  </div>;

Training.propTypes = {
}

export default Training;
