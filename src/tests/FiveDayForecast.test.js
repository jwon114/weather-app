import React from 'react';
import { create } from 'react-test-renderer';
import { render } from '@testing-library/react';
import FiveDayForecast from '../components/FiveDayForecast';

test('should render Forecast correctly', () => {
  const root = create(<FiveDayForecast 
                            data={[]}
                            animate={false}
                            loading={false} />);
  
  expect(root.toJSON()).toMatchSnapshot();
});

test('should render the the next 5 days', () => {
  const testData = [
    {
      dt: 1587985200, // Monday
      main: { temp: 18.69 },
      weather: [{ description: 'light rain', icon: '10d' }]
    },
    {
      dt: 1588071600, // Tuesday
      main: { temp: 9.17 },
      weather: [{ description: 'clear sky', icon: '01d' }]
    },
    {
      dt: 1588158000, // Wednesday
      main: { temp: 10.85 },
      weather: [{ description: 'cloudy', icon: '02d' }]
    },
    {
      dt: 1588244400, // Thursday
      main: { temp: 15.20 },
      weather: [{ description: 'snow', icon: '13d' }]
    },
    {
      dt: 1588330800, // Friday
      main: { temp: 11.37 },
      weather: [{ description: 'heavy rain', icon: '09d' }]
    }
  ];
  const { container, getByText } = render(<FiveDayForecast 
                                            data={testData} 
                                            animate={false}
                                            loading={false} />);
  
  expect(container.firstChild.children.length).toBe(5);
  expect(getByText(/mon/i)).toBeInTheDocument();
  expect(getByText(/tue/i)).toBeInTheDocument();
  expect(getByText(/wed/i)).toBeInTheDocument();
  expect(getByText(/thu/i)).toBeInTheDocument();
  expect(getByText(/fri/i)).toBeInTheDocument();
});
