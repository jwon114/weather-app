import React from 'react';
import { create } from 'react-test-renderer';
import WeatherApp from '../components/WeatherApp';
import TestFiveDayThreeHourForecast from './data/fiveDayThreeHourForecast';
import TestFilteredForecastData from './data/filteredForecastData';

test('should render WeatherApp correctly', () => {
  Date.now = jest.fn(() => 1588082171504);
  const root = create(<WeatherApp />);
  
  expect(root.toJSON()).toMatchSnapshot();
});

test('should filter weather data and return next 5 days forecast', () => {
  const root = create(<WeatherApp />);
  const app = root.getInstance();

  expect(app.filterForecastData(TestFiveDayThreeHourForecast.list)).toEqual(TestFilteredForecastData);
});