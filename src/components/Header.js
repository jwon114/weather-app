import React from 'react';
import PropTypes from 'prop-types';

const Header = (props) => (
  <div className="header">
    <span className="header__location">{props.location}</span>
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
    <span className="header__temperature">{props.temperature}&deg;</span>
  </div>
);

Header.propTypes = {
  location: PropTypes.string,
  time: PropTypes.string,
  temperature: PropTypes.number
}

export default Header;