import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import { render } from '@testing-library/react';
import Forecast from '../components/Forecast';

test('should render Forecast correctly', () => {
  const renderer = new ReactShallowRenderer();
  renderer.render(<Forecast />);
  expect(renderer.getRenderOutput()).toMatchSnapshot();
});

test('should render the the next 5 days', () => {
  const { container, getByText } = render(<Forecast data={['Mon', 'Tue', 'Wed', 'Thu', 'Fri']} />);
  expect(container.firstChild.children.length).toBe(5);
  expect(getByText(/mon/i)).toBeInTheDocument();
  expect(getByText(/tue/i)).toBeInTheDocument();
  expect(getByText(/wed/i)).toBeInTheDocument();
  expect(getByText(/thu/i)).toBeInTheDocument();
  expect(getByText(/fri/i)).toBeInTheDocument();
});
