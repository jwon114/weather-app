import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import WeatherApp from '../components/WeatherApp';

test('should render WeatherApp correctly', () => {
  const renderer = new ReactShallowRenderer();
  Date.now = jest.fn(() => 1588082171504)
  renderer.render(<WeatherApp />);
  
  expect(renderer.getRenderOutput()).toMatchSnapshot();
});