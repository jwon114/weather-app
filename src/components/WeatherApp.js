import React, { Component } from 'react';
import API from '../utils/api';
import DateUtils from '../utils/date';
import Header from './Header';
import ProgressBar from './ProgressBar';
import FiveDayForecast from './FiveDayForecast';
import PulseLoader from "react-spinners/PulseLoader";
import Colors from '../styles/base/_settings.scss';

export default class WeatherApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: undefined,
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
      const currentTemperature = res.data.main.temp;
      API.fetchFiveDayForecast()
      .then(res => {
        const forecastData = this.filterForecastData(res.data.list);
        this.setLatestFetchData(forecastData, currentTemperature);
        this.saveWeatherDataToState(forecastData, currentTemperature);
      })
      .catch(err => {
        console.log(err);
      })
    })
    .catch(err => {
      console.log(err);
      try {
        const { forecastData, currentTemperature } = this.getLatestFetchData();
        this.setStateFromWeatherData(forecastData, currentTemperature);
      } catch(e) {
        console.log(e);
      }
    })
  }

  saveWeatherDataToState = (forecastData, currentTemperature) => {
    this.setState(() => ({
      currentTime: DateUtils.getCurrentTime(),
      currentTemperature: Math.floor(currentTemperature),
      startTimer: true,
      forecastData,
      animate: true,
      loading: false
    }));
  }

  // Use localStorage to store latest forecast data in case API call fails
  setLatestFetchData = (forecastData, currentTemperature) => {
    const forecastDataJSON = JSON.stringify(forecastData);
    const currentTemperatureJSON = JSON.stringify(currentTemperature);
    localStorage.setItem('forecastData', forecastDataJSON);
    localStorage.setItem('currentTemperature', currentTemperatureJSON);
  }

  getLatestFetchData = () => {
    const weatherData = JSON.parse(localStorage.getItem('weatherData'));
    const currentTemperature = JSON.parse(localStorage.getItem('currentTemperature'));
    return { weatherData, currentTemperature }
  }

  filterForecastData = (data) => {
    const noonHour = 12;
    const filteredData = data.filter((dataObject) => {
      const forecastHour = new Date(dataObject.dt * 1000).getUTCHours();
      return forecastHour === noonHour;
    });

    const firstDate = new Date(filteredData[0].dt * 1000).getUTCDate();
    const todaysDate = new Date().getUTCDate();

    // For early mornings between 00:00 -> 09:00, the 5th day 12:00 forecast is not covered by the 40 datapoints. Remove the first datapoint (current day) and append the latest 5th day forecast.
    if ((firstDate === todaysDate) && (filteredData.length === 5)) {
      filteredData.shift();
      filteredData.push(data[data.length - 1]);
    }

    return filteredData;
  }

  handleTimerFinish = () => {
    // Stop timer and reset forecast state
    this.setState(() => ({
      forecastData: [],
      startTimer: false,
      animate: false,
      loading: true
    }));

    // Fetch new weather data
    this.getWeatherData();
  }

  render() {
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
          initialTime={60}
          handleTimerFinished={this.handleTimerFinish}
        />
        <div className="forecast-container">
          {loading && <div className="loader">
            <PulseLoader
              size={20}
              loading={loading}
              color={Colors.tan}
            />
          </div>}
          <FiveDayForecast 
            data={forecastData}
            animate={animate}
            loading={loading}
          />
        </div>
      </div>
    );
  }
}