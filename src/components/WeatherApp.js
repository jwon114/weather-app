import React from 'react';
import API from '../utils/api';
import Header from './Header';
import ProgressBar from './ProgressBar';
import FiveDayForecast from './FiveDayForecast';

export default class WeatherApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: undefined,
      currentLocation: 'london',
      currentTemperature: undefined,
      startTimer: false,
      forecastData: []
    };
  }

  componentDidMount() {
    this.getWeatherData();
  }

  getWeatherData = () => {
    API.fetchData()
    .then(res => {
      console.log(res, 'weatherData')
      this.setState(() => ({
        currentTime: this.getCurrentTime(),
        currentTemperature: Math.floor(res.data.current.temp),
        startTimer: true,
        forecastData: res.data.daily.slice(1, 6)
      }));
    })
    .catch(err => {
      console.log(err);
    })
  }

  // bonus
  // use localStorage to keep latest copy of temperature data in case API call fails

  getCurrentTime = () => {
    const dateTimeNow = new Date();
    return `${dateTimeNow.getUTCHours()}:${dateTimeNow.getUTCMinutes().toString().padStart(2, 0)} GMT`;
  }

  handleTimerFinish = () => {
    console.log('timer finished')
    // stop timer
    this.setState(() => ({ startTimer: false }));

    // reset start timer again
    // this.getWeatherData();
  }

  // Todo:
  // day and temperature alignment
  // progress bar smooth animation
  // animation when data updates
  // 

  
  render() {
    console.log(this.state, 'this.state in render')
    const { currentTime, currentLocation, currentTemperature, startTimer, forecastData } = this.state;

    return (
      <div className="WeatherApp">
        <Header 
          location={currentLocation}
          time={currentTime}
          temperature={currentTemperature}
        />
        <ProgressBar
          startTimer={startTimer}
          initialTime={5}
          handleTimerFinished={this.handleTimerFinish}
        />
        <FiveDayForecast 
          data={forecastData}
        />
      </div>
    );
  }
}