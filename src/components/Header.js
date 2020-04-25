import React from 'react';
import PropTypes from 'prop-types';

const Header = (props) => (
  <div className="header">
    <div className="header__location">{props.location}</div>
    <div className="header__time-container">
      <div className="header__time">
        <span className="header__dot brown"></span>
        <span className="header__dot tan"></span>
        <span className="header__dot gold"></span>
        <span className="header__time_value">{props.time}</span>
        <span className="header__dot brown"></span>
        <span className="header__dot tan"></span>
        <span className="header__dot gold"></span>
      </div>
    </div>
    <div className="header__temperature">{props.temperature}&deg;</div>
  </div>
);

Header.propTypes = {
  location: PropTypes.string,
  time: PropTypes.string,
  temperature: PropTypes.string
}

export default Header;