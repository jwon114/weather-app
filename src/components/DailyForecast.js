import React from 'react'
import PropTypes from 'prop-types';

const DailyForecast = (props) => (
  <div className="daily-forecast">
    <div className="daily-forecast__day-container">
      <div className="daily-forecast__day">{props.day}</div>
      <div className="daily-forecast__temperature">{props.temperature}&deg;</div>
    </div>
    <div className="daily-forecast__forecast-container">
      <div className="daily-forecast__icon-code">{props.iconCode}</div>
      <div className="daily-forecast__forecast">{props.forecast}</div>
    </div>
  </div>
);

DailyForecast.propTypes = {
  day: PropTypes.string,
  temperature: PropTypes.string,
  iconCode: PropTypes.string,
  forecast: PropTypes.string
};

export default DailyForecast;