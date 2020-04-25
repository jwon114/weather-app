import React from 'react';
import logo from '../logo.svg';
import axios from 'axios';
import Header from './Header';
import ProgressBar from './ProgressBar';

export default class WeatherApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: this.getCurrentTime(),
      location: 'london',
      startTimer: true,
      currentTemperature: '24'
    };
  }

  componentDidMount() {
    // const API_KEY = '6c8ca7a74ad9d3301728396fc82b6227'

    // axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=London,uk&units=metric&APPID=${API_KEY}`)
    // .then(res => {
    //   console.log(res);
    // })
    // .catch(err => {
    //   console.log(err);
    // })
    // const dateTimeNow = new Date();
    // this.setState(() => ({
    //   currentTime: `${dateTimeNow.getUTCHours()}:${dateTimeNow.getUTCMinutes()} GMT`
    // }));
  }

  // bonus
  // use localStorage to keep latest copy of temperature data in case API call fails

  getCurrentTime = () => {
    const dateTimeNow = new Date();
    return `${dateTimeNow.getUTCHours()}:${dateTimeNow.getUTCMinutes()} GMT`
  }

  handleTimerFinish = () => {
    console.log('timer finished')
    // stop timer
    this.setState(() => ({ startTimer: false }));

    // reset start timer again
  }


  
  render() {
    const { currentTime, location, startTimer, currentTemperature } = this.state;

    return (
      <div className="WeatherApp">
        <Header 
          location={location}
          time={currentTime}
          temperature={currentTemperature}
        />
        <ProgressBar
          startTimer={startTimer}
          initialCountdown={5}
          handleTimerFinished={this.handleTimerFinish}
        />
      </div>
    );
  }
}