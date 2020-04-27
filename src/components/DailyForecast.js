import React from 'react'
import PropTypes from 'prop-types';
import DateUtils from '../utils/date';
import { CSSTransition } from 'react-transition-group';

const DailyForecast = (props) => (
  <div className="daily-forecast">
    <div className="daily-forecast__day-container">
      <CSSTransition
        in={props.animate}
        timeout={{
          appear: 5000
        }}
        classNames="fade-in" >
        <span className="daily-forecast__day">{DateUtils.getDayOfWeek(props.day)}</span>
      </CSSTransition>
        <span className="daily-forecast__temperature">{Math.floor(props.temperature)}&deg;</span>
    </div>
    <div className="daily-forecast__forecast-container">
      <img className="daily-forecast__icon-code" src={`http://openweathermap.org/img/wn/${props.iconCode}.png`} alt="weather forecast icon" />
      <span className="daily-forecast__forecast">{props.forecast}</span>
    </div>
  </div>
);

DailyForecast.propTypes = {
  day: PropTypes.number.isRequired,
  temperature: PropTypes.number.isRequired,
  iconCode: PropTypes.string.isRequired,
  forecast: PropTypes.string.isRequired
};

export default DailyForecast;