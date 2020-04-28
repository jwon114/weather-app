import React from 'react';
import PropTypes from 'prop-types';
import DailyForecast from './DailyForecast';
import { Transition } from 'react-spring/renderprops';

const FiveDayForecast = (props) => (
  <div className="five-day-forecast">
    {props.data.length === 0 && 
      <div className="five-day-forecast__data-not-available">No weather forecast data available.</div>}
    {props.data.length > 0 &&
      <Transition
        items={props.data} 
        keys={item => item.dt}
        from={{ opacity: 0 }}
        enter={{ opacity: 1 }}
        reset={props.animate}
        config={{ duration: 500 }}
        trail={200} >
          {item => styleProp =>
            <DailyForecast
              style={styleProp}
              day={item.dt}
              temperature={item.main.temp}
              iconCode={item.weather[0].icon}
              forecast={item.weather[0].description} />}
      </Transition>}
  </div>
);

FiveDayForecast.propTypes = {
  data: PropTypes.array.isRequired,
  animate: PropTypes.bool.isRequired
};

export default FiveDayForecast;