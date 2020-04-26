import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import WeatherApp from '../components/WeatherApp';

test('should render WeatherApp correctly', () => {
  const renderer = new ReactShallowRenderer();
  renderer.render(<WeatherApp />);
  
  expect(renderer.getRenderOutput()).toMatchSnapshot();
});