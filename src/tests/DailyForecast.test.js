import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import { render } from '@testing-library/react';
import DailyForecast from '../components/DailyForecast';

test('should render Forecast correctly', () => {
  const renderer = new ReactShallowRenderer();
  renderer.render(<DailyForecast />);
  
  expect(renderer.getRenderOutput()).toMatchSnapshot();
});

test('should display the Day, Temperature, Weather Description', () => {
  
});