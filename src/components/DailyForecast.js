import React from 'react'
import PropTypes from 'prop-types';

const DailyForecast = (props) => (
  <div className="daily-forecast">
    <div className="daily-forecast__day-container">
      <span className="daily-forecast__day">{props.day}</span>
      <span className="daily-forecast__temperature">{props.temperature}&deg;</span>
    </div>
    <div className="daily-forecast__forecast-container">
      <span className="daily-forecast__icon-code">{props.iconCode}</span>
      <span className="daily-forecast__forecast">{props.forecast}</span>
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