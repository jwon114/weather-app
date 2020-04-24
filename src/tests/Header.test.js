import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import { render } from '@testing-library/react';
import Header from '../components/Header';

test('should render Header correctly', () => {
  const renderer = new ReactShallowRenderer();
  renderer.render(<Header />);
  expect(renderer.getRenderOutput()).toMatchSnapshot();
});

test('renders location, time and temperature', () => {
  const { getByText } = render(<Header 
    location={'london'} 
    time={'10:24 GMT'}
    temperature={'24'} />)

  const locationElement = getByText(/london/i);
  const timeElement = getByText('10:24 GMT');
  const temperatureElement = getByText('24');

  expect(locationElement).toBeInTheDocument();
  expect(timeElement).toBeInTheDocument();
  expect(temperatureElement).toBeInTheDocument();
});