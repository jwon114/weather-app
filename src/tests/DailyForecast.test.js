import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import { render } from '@testing-library/react';
import DailyForecast from '../components/DailyForecast';

test('should render Forecast correctly', () => {
  const renderer = new ReactShallowRenderer();
  renderer.render(<DailyForecast />);
  
  expect(renderer.getRenderOutput()).toMatchSnapshot();
});

// test('should display the Day, Temperature, Weather Description', () => {
//   const testData = [
//     {
//       dt: 1587985200,
//       temp: { day: 18.69 },
//       weather: [{ description: 'light rain' }]
//     }
//   ];

//   const { container, getByText } = render(<DailyForecast 
//     key={0}
//     day={testData[0].dt} 
//     temperature={testData[0].temp.day}
//     iconCode={testData[0].weather[0].icon}
//     forecast={testData[0].weather[0].description} />);
  
//   expect(container.firstChild.children.length).toBe(5);
//   expect(getByText(/mon/i)).toBeInTheDocument();
//   expect(getByText((content, node) => node.textContent === 18 + '°')).toBeInTheDocument();
//   expect(getByText(/light rain/i)).toBeInTheDocument();
// });