import React from 'react';
import PropTypes from 'prop-types';
import DailyForecast from './DailyForecast';
import { Transition } from 'react-spring/renderprops';

const FiveDayForecast = (props) => (
  <div className="five-day-forecast">
    {console.log(props, 'fiveday props')}
    {props.data.length > 0 && 
      <Transition
        items={props.data} 
        keys={item => item.dt}
        from={{ opacity: 0 }}
        enter={{ opacity: 1 }}
        reset={props.animate}
        config={{ duration: 1000 }}
        trail={250} >
          {item => p => <DailyForecast
                          style={p}
                          day={item.dt}
                          temperature={item.main.temp}
                          iconCode={item.weather[0].icon}
                          forecast={item.weather[0].description} />}
      </Transition>}
  </div>
);

FiveDayForecast.propTypes = {
  data: PropTypes.array
};

export default FiveDayForecast;