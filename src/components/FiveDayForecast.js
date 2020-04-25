import React from 'react';
import PropTypes from 'prop-types';
import DailyForecast from './DailyForecast';

const FiveDayForecast = (props) => (
  <div className="five-day-forecast">
    {props.data.map((d, index) => (
      <DailyForecast
        key={index}
        day={d.day} 
        temperature={d.temperature}
        iconCode={d.iconCode}
        forecast={d.forecast} 
      />
    ))}
  </div>
);

FiveDayForecast.propTypes = {
  data: PropTypes.array
};

export default FiveDayForecast;