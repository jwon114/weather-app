import React from 'react';
import logo from '../logo.svg';
import axios from 'axios';
import Header from './Header';
import ProgressBar from './ProgressBar';

export default class WeatherApp extends React.Component {
  constructor(props) {
    super(props);
    const dateTimeNow = new Date();
    this.state = {
      currentTime: `${dateTimeNow.getUTCHours()}:${dateTimeNow.getUTCMinutes()} GMT`,
      location: 'london',
      startTimer: true
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

  handleTimerFinish = () => {
    // stop timer
    this.setState(() => ({ startTimer: false }));

    // reset start timer again
  }


  
  render() {
    const { currentTime, location, startTimer } = this.state;

    return (
      <div className="WeatherApp">
        <Header 
          location={location}
          time={currentTime}
          temperature='24'
        />
        <ProgressBar
          startTimer={true}
          secondsCountdown={5}
          handleTimerFinished={this.handleTimerFinish}
        />
      </div>
    );
  }
}