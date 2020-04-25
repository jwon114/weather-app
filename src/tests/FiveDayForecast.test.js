import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import { render } from '@testing-library/react';
import FiveDayForecast from '../components/FiveDayForecast';

test('should render Forecast correctly', () => {
  const renderer = new ReactShallowRenderer();
  renderer.render(<FiveDayForecast />);
  
  expect(renderer.getRenderOutput()).toMatchSnapshot();
});

test('should render the the next 5 days', () => {
  const { container, getByText } = render(<FiveDayForecast data={['Mon', 'Tue', 'Wed', 'Thu', 'Fri']} />);
  
  expect(container.firstChild.children.length).toBe(5);
  expect(getByText(/mon/i)).toBeInTheDocument();
  expect(getByText(/tue/i)).toBeInTheDocument();
  expect(getByText(/wed/i)).toBeInTheDocument();
  expect(getByText(/thu/i)).toBeInTheDocument();
  expect(getByText(/fri/i)).toBeInTheDocument();
});
