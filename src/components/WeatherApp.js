import React from 'react';
import API from '../utils/api';
import DateUtils from '../utils/date';
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
    API.fetchCurrentWeather()
    .then(res => {
      console.log(res, 'current weather')
      const currentTemperature = res.data.main.temp;
      API.fetchFiveDayForecast()
      .then(res => {
        console.log(res, 'res')
        const forecastData = this.filterForecastData(res.data.list);
        console.log(forecastData, 'forecastData');
        this.setState(() => ({
          currentTime: this.getCurrentTime(),
          currentTemperature: Math.floor(currentTemperature),
          startTimer: true,
          forecastData
        }));
      })
      .catch(err => {
        console.log(err);
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  filterForecastData = (data) => {
    const filteredData = data.filter((dataObject) => {
      const forecastHour = DateUtils.getForecastHour(dataObject.dt);
      const morningHour = 9
    
      return forecastHour === morningHour;
    });

    // in some instances the current day will be included if the current time is early morning.
    return filteredData.length > 5 ? filteredData.slice(1, 5) : filteredData;
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
    this.getWeatherData();
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
          initialTime={60}
          handleTimerFinished={this.handleTimerFinish}
        />
        <FiveDayForecast 
          data={forecastData}
        />
      </div>
    );
  }
}