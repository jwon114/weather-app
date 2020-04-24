import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import { render } from '@testing-library/react';
import WeatherApp from '../components/WeatherApp';

test('should render WeatherApp correctly', () => {
  const renderer = new ReactShallowRenderer();
  renderer.render(<WeatherApp />);
  expect(renderer.getRenderOutput()).toMatchSnapshot();
});

test('renders location, current time and temperature', () => {
  const { getByText } = render(<WeatherApp />);
  const dateTimeNow = new Date();
  const currentTime = `${dateTimeNow.getUTCHours()}:${dateTimeNow.getUTCMinutes()} GMT`;

  const locationElement = getByText(/london/i);
  const timeElement = getByText(currentTime);
  const temperatureElement = getByText('24');

  expect(locationElement).toBeInTheDocument();
  expect(timeElement).toBeInTheDocument();
  expect(temperatureElement).toBeInTheDocument();
});
