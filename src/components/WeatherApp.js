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
      currentTime: this.getCurrentTime(),
      currentLocation: 'london',
      currentTemperature: undefined,
      startTimer: false,
      forecastData: [],
      animate: false,
      loading: true
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
        this.setState((prevState) => ({
          currentTime: this.getCurrentTime(),
          currentTemperature: Math.floor(currentTemperature),
          startTimer: true,
          forecastData,
          animate: true,
          loading: false
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
    const morningHour = 9
    const filteredData = data.filter((dataObject) => {
      const forecastHour = DateUtils.getForecastHour(dataObject.dt);
      
      return forecastHour === morningHour;
    });

    const firstDate = DateUtils.getForecastDate(filteredData[0].dt)
    const todaysDateTime = new Date();
    const todaysDate = todaysDateTime.getUTCDate();

    // for early mornings, the 09:00 forecast is not available for the 5th day.
    if ((firstDate === todaysDate) && (filteredData.length === 5)) {
      filteredData.shift();
      filteredData.push(data[data.length - 1]);
    }

    // possible overlap with current day and 5th day around 09:00 hour
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
    this.setState((prevState) => ({
      forecastData: [],
      startTimer: false,
      animate: false,
      loading: true
    }));

    // setTimeout(() => {
    //   console.log('in timeout of 1 second')
    // }, 1000)

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
    const { currentTime, currentLocation, currentTemperature, startTimer, forecastData, animate, loading } = this.state;

    return (
      <div className="weather-app">
        <Header 
          location={currentLocation}
          time={currentTime}
          temperature={currentTemperature}
          animate={animate}
        />
        <ProgressBar
          startTimer={startTimer}
          initialTime={10}
          handleTimerFinished={this.handleTimerFinish}
        />
        <FiveDayForecast 
          data={forecastData}
          animate={animate}
          loading={loading}
        />
      </div>
    );
  }
}