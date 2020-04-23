import React from 'react';
import logo from '../logo.svg';
import './WeatherApp.css';

const WeatherApp = () => {
  return (
    <div className="WeatherApp">
      <header className="WeatherApp-header">
        <img src={logo} className="WeatherApp-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="WeatherApp-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default WeatherApp;
