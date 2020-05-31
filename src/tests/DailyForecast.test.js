import React from 'react';
import { create } from 'react-test-renderer';
import { render } from '@testing-library/react';
import DailyForecast from '../components/DailyForecast';

test('should render Forecast correctly', () => {
  const root = create(<DailyForecast />);
  
  expect(root.toJSON()).toMatchSnapshot();
});

test('should display the Day, Temperature, Weather Description', () => {
  const testData = [
    {
      dt: 1587985200, // Monday
      temp: { day: 18.69 },
      weather: [{ description: 'clear sky', icon: '01d' }]
    }
  ];

  const { getByAltText, getByText } = render(<DailyForecast 
                                                key={testData[0].dt}
                                                day={testData[0].dt} 
                                                temperature={testData[0].temp.day}
                                                iconCode={testData[0].weather[0].icon}
                                                forecast={testData[0].weather[0].description} />);
  
  expect(getByText(/mon/i)).toBeInTheDocument();
  expect(getByText((content, node) => node.textContent === 18 + '°')).toBeInTheDocument();
  expect(getByText(/clear sky/i)).toBeInTheDocument();
  expect(getByAltText(/weather forecast icon/i).src).toEqual(`https://openweathermap.org/img/wn/${testData[0].weather[0].icon}.png`);
});