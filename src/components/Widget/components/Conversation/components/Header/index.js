import React from 'react';
import PropTypes from 'prop-types';

import close from 'assets/clear-button.svg';
import './style.scss';


const Header = ({ title, subtitle, toggleChat, showCloseButton }) =>
  <div
    className="header" style={{
      backgroundColor: title === 'Actions' ? '#b92211' : title === 'Intents' ? '#e3ab2a' : '#0084ff'
    }}
  >
    {
      showCloseButton &&
      <button className="close-button" onClick={toggleChat}>
        <img src={close} className="close" alt="close"/>
      </button>
    }
    <h4 className="title">{title}</h4>
    {subtitle && <span>{subtitle}</span>}
  </div>;

Header.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  toggleChat: PropTypes.func,
  showCloseButton: PropTypes.bool
};

export default Header;
