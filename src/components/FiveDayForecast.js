import React from 'react';
import PropTypes from 'prop-types';
import DailyForecast from './DailyForecast';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const FiveDayForecast = (props) => (
  <div className="five-day-forecast">
    {console.log(props, 'fiveday props')}
    <TransitionGroup>
      {props.data.map((d, index) => (
        <CSSTransition 
          key={index}
          in={props.animate}
          timeout={{
            appear: 5000 * index,
            enter: 5000 * index
          }}
          classNames="fade-in" >
          <DailyForecast
            key={index}
            day={d.dt} 
            temperature={d.main.temp}
            iconCode={d.weather[0].icon}
            forecast={d.weather[0].description}
            animate={props.animate}
            loading={props.loading}
          />
        </CSSTransition>
      ))}
    </TransitionGroup>

  </div>
);

FiveDayForecast.propTypes = {
  data: PropTypes.array
};

export default FiveDayForecast;