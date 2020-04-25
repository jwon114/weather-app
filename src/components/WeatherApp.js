import React from 'react';
import logo from '../logo.svg';
import axios from 'axios';
import Header from './Header';
import ProgressBar from './ProgressBar';
import FiveDayForecast from './FiveDayForecast';

export default class WeatherApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: {
        time: this.getCurrentTime(),
        location: 'london',
        temperature: '24'
      },
      startTimer: true,
      weatherData: [
        {
          day: 'Mon',
          temperature: '12',
          iconCode: '01n',
          forecast: 'Cloudy'
        }, 
        {
          day: 'Tue',
          temperature: '10',
          iconCode: '01n',
          forecast: 'A bt windy'
        },
        {
          day: 'Wed',
          temperature: '13',
          iconCode: '01n',
          forecast: 'Can\'t see very far'
        },
        {
          day: 'Thu',
          temperature: '10',
          iconCode: '01n',
          forecast: 'A bit windy'
        },
        {
          day: 'Fri',
          temperature: '13',
          iconCode: '01n',
          forecast: 'Can\'t see very far'
        }
      ]
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
    const { current: { time, location, temperature }, startTimer, weatherData } = this.state;

    return (
      <div className="WeatherApp">
        <Header 
          location={location}
          time={time}
          temperature={temperature}
        />
        <ProgressBar
          startTimer={startTimer}
          initialCountdown={5}
          handleTimerFinished={this.handleTimerFinish}
        />
        <FiveDayForecast 
          data={weatherData}
        />
      </div>
    );
  }
}