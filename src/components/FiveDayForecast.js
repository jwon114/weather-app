import React from 'react';
import PropTypes from 'prop-types';
import DailyForecast from './DailyForecast';

const FiveDayForecast = (props) => (
  <div className="five-day-forecast">
    {props.data.length === 0 && <p>No weather forecast data</p>}
    {props.data.map((d, index) => (
      <DailyForecast
        key={index}
        day={d.dt} 
        temperature={d.temp.day}
        iconCode={d.weather[0].icon}
        forecast={d.weather[0].description} 
      />
    ))}
  </div>
);

FiveDayForecast.propTypes = {
  data: PropTypes.array
};

export default FiveDayForecast;