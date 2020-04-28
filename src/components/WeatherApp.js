import React, { Component } from 'react';
import API from '../utils/api';
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
        this.saveLatestFetch(forecastData, currentTemperature);
        this.setState(() => ({
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
      try {
        const { weatherData, currentTemperature } = this.getLatestFetch();
        this.setState(() => ({
          currentTime: this.getCurrentTime(),
          currentTemperature: Math.floor(currentTemperature),
          startTimer: true,
          forecastData: weatherData,
          animate: true,
          loading: false
        }));
      } catch(e) {
        console.log(e);
      }
    })
  }

  // use localStorage to keep latest copy of forecast data in case API call fails
  saveLatestFetch = (forecastData, currentTemperature) => {
    const forecastDataJSON = JSON.stringify(forecastData);
    const currentTemperatureJSON = JSON.stringify(currentTemperature);
    localStorage.setItem('weatherData', forecastDataJSON);
    localStorage.setItem('currentTemperature', currentTemperatureJSON);
  }

  getLatestFetch = () => {
    const weatherData = JSON.parse(localStorage.getItem('weatherData'));
    const currentTemperature = JSON.parse(localStorage.getItem('currentTemperature'));
    return { weatherData, currentTemperature }
  }

  filterForecastData = (data) => {
    const morningHour = 9;
    const filteredData = data.filter((dataObject) => {
      const forecastHour = new Date(dataObject.dt * 1000).getUTCHours();
      return forecastHour === morningHour;
    });

    const firstDate = new Date(filteredData[0].dt * 1000).getUTCDate();
    const todaysDate = new Date().getUTCDate();

    // For early mornings, the 5th day 09:00 forecast is not covered by the 40 datapoints. Remove the first datapoint and append the latest 5th day forecast.
    if ((firstDate === todaysDate) && (filteredData.length === 5)) {
      filteredData.shift();
      filteredData.push(data[data.length - 1]);
    }

    // Possible overlap with current day and 5th day around 09:00 hour
    return filteredData.length > 5 ? filteredData.slice(1, 5) : filteredData;
  }

  getCurrentTime = () => {
    const timeNow = new Date();
    const hours = timeNow.getUTCHours();
    const minutes = timeNow.getUTCMinutes().toString().padStart(2, 0);
    return `${hours}:${minutes} GMT`;
  }

  handleTimerFinish = () => {
    // stop timer
    this.setState(() => ({
      forecastData: [],
      startTimer: false,
      animate: false,
      loading: true
    }));

    // reset start timer again
    this.getWeatherData();
  }

  // Todo:
  // day and temperature alignment
  // progress bar smooth animation

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