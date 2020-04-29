import React from 'react';
import { create } from 'react-test-renderer';
import WeatherApp from '../components/WeatherApp';
import forecastAfternoon from './data/sampleForecastAfternoon';
import filteredForecastAfternoon from './data/filteredForecastAfternoon';
import forecastMorning from './data/sampleForecastMorning';
import filteredForecastMorning from './data/filteredForecastMorning';
import MockDate from 'mockdate';

test('should render WeatherApp correctly', () => {
  MockDate.set(1588082171504);
  const root = create(<WeatherApp />);
  
  expect(root.toJSON()).toMatchSnapshot();
  MockDate.reset();
});

test('should filter weather data and return next 5 days forecast afternoon', () => {
  MockDate.set(1588106600000);
  const root = create(<WeatherApp />);
  const app = root.getInstance();

  expect(app.filterForecastData(forecastAfternoon.list)).toEqual(filteredForecastAfternoon);
  MockDate.reset();
});

test('should filter weather data and return next 5 days forecast morning', () => {
  MockDate.set(1588128200000);
  const root = create(<WeatherApp />);
  const app = root.getInstance();

  expect(app.filterForecastData(forecastMorning.list)).toEqual(filteredForecastMorning);
  MockDate.reset();
});