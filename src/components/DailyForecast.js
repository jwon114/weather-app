import React from 'react'
import PropTypes from 'prop-types';
import Date from '../utils/date';

const DailyForecast = (props) => (
  <div className="daily-forecast">
    <div className="daily-forecast__day-container">
      <span className="daily-forecast__day">{Date.getDayOfWeek(props.day)}</span>
      <span className="daily-forecast__temperature">{Math.floor(props.temperature)}&deg;</span>
    </div>
    <div className="daily-forecast__forecast-container">
      <img className="daily-forecast__icon-code" src={`http://openweathermap.org/img/wn/${props.iconCode}.png`} alt="weather forecast icon" />
      <span className="daily-forecast__forecast">{props.forecast}</span>
    </div>
  </div>
);

DailyForecast.propTypes = {
  day: PropTypes.number,
  temperature: PropTypes.number,
  iconCode: PropTypes.string,
  forecast: PropTypes.string
};

export default DailyForecast;