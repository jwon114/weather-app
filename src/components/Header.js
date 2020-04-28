import React from 'react';
import PropTypes from 'prop-types';
import { Spring } from 'react-spring/renderprops';

const Header = (props) => (
  <div className="header">
    <span className="header__location">{props.location}</span>
      <div className="header__time-container">
        <div className="header__time">
          <span className="header__dot brown"></span>
          <span className="header__dot tan"></span>
          <span className="header__dot gold"></span>
          <Spring
            from={{ opacity: 0 }}
            to={{ opacity: 1 }}
            reset={props.animate}
            config={{ duration: 1500 }} >
            {p => <span style={p} className="header__time_value">{props.time}</span>}
          </Spring>
          <span className="header__dot brown"></span>
          <span className="header__dot tan"></span>
          <span className="header__dot gold"></span>
        </div>
      </div>
    <Spring
      from={{ opacity: 0 }}
      to={{ opacity: 1 }}
      reset={props.animate}
      config={{ duration: 1500 }} >
      {p => <span style={p} className="header__temperature">{props.temperature}&deg;</span>}
    </Spring>
  </div>
)

Header.propTypes = {
  location: PropTypes.string,
  time: PropTypes.string,
  temperature: PropTypes.number
}

export default Header;