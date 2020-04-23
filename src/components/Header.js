import React from 'react';

const Header = (props) => (
  <div className="header">
    <div className="header__location">{props.location}</div>
    <div className="header__time">
      <span className="header__dot brown"></span>
      <span className="header__dot tan"></span>
      <span className="header__dot gold"></span>
      <span className="header__time_value">{props.time}</span>
      <span className="header__dot brown"></span>
      <span className="header__dot tan"></span>
      <span className="header__dot gold"></span>
    </div>
    <div className="header__temperature">{props.temperature}</div>
  </div>
);

export default Header;