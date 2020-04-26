import React from 'react'
import PropTypes from 'prop-types';
import Date from '../utils/date';

const DailyForecast = (props) => {
  // create own context with webpack
  const icons = require.context('../img/weather-icons', true);
  const weatherIcon = icons(`./${props.iconCode}.png`);

  return (
    <div className="daily-forecast">
      <div className="daily-forecast__day-container">
        <span className="daily-forecast__day">{Date.getDayOfWeek(props.day)}</span>
        <span className="daily-forecast__temperature">{Math.floor(props.temperature)}&deg;</span>
      </div>
      <div className="daily-forecast__forecast-container">
        <img className="daily-forecast__icon-code" src={weatherIcon} alt="weather forecast icon" />
        <span className="daily-forecast__forecast">{props.forecast}</span>
      </div>
    </div>
  );
};

DailyForecast.propTypes = {
  day: PropTypes.number,
  temperature: PropTypes.number,
  iconCode: PropTypes.string,
  forecast: PropTypes.string
};

export default DailyForecast;