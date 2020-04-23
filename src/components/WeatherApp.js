import React from 'react';
import logo from '../logo.svg';
import axios from 'axios';
import Header from './Header';

export default class WeatherApp extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {

    // };
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
  }
  
  render() {
    return (
      <div className="WeatherApp">
        <Header 
          location='london'
          currentTime={Date.now()}
          temperature='24'
        />
      </div>
    );
  }
}