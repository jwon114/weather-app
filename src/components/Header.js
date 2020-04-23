import React from 'react';

const Header = (props) => (
  <div className="header">
    <h2 className="header__location">{props.location}</h2>
    <div>{props.currentTime}</div>
<h2 className="header__temperature">{props.temperature}</h2>
  </div>
);

Header.defaultProps = {
  location: 'london'
};

export default Header;