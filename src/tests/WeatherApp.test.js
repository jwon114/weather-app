import React from 'react';
import { create } from 'react-test-renderer';
import WeatherApp from '../components/WeatherApp';
import forecastAfternoon from './data/forecastAfternoon';
import filteredForecastAfternoon from './data/filteredForecastAfternoon';
import forecastMorning from './data/forecastMorning';
import filteredForecastMorning from './data/filteredForecastMorning';

test('should render WeatherApp correctly', () => {
  Date.now = jest.fn(() => 1588082171504);
  const root = create(<WeatherApp />);
  
  expect(root.toJSON()).toMatchSnapshot();
});

test('should filter weather data and return next 5 days forecast afternoon', () => {
  const root = create(<WeatherApp />);
  const app = root.getInstance();

  expect(app.filterForecastData(forecastAfternoon.list)).toEqual(filteredForecastAfternoon);
});

test('should filter weather data and return next 5 days forecast morning', () => {
  const root = create(<WeatherApp />);
  const app = root.getInstance();

  expect(app.filterForecastData(forecastMorning.list)).toEqual(filteredForecastMorning);
});