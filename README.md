# Weather App
A simple React app that displays the current weather information in London, and weather forecasts for the next 5 days. A 1 minute counter and progress bar displays the time until the weather information is refreshed.

OpenWeather API provided the weather information.

## Getting Started
Git clone or download the repository.

## Prerequisites
These are required for install:
- Node
- yarn or npm

## Installing
Install the project dependencies

```
yarn install
```
or
```
npm install
```

## Available Scripts
Scripts that were made available through Create React App

### Starting the Development Server
```
yarn start
```

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Running the Tests
```
yarn test
```

Launches the test runner in the interactive watch mode.

### Deployment
```
yarn build
```

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

## Implementation
- Fetched weather information using two OpenWeather API endpoints:
1. To retrieve the current weather (https://openweathermap.org/current)
2. For a 5 day/3 hour weather forecast (https://openweathermap.org/forecast5)
- Data manipulation was required to retrieve daily forecasting from 5 day/3 hour 40 
- Increment the refresh counter with a timer and animate progress bar using inline CSS styles.
- Use Web API's Window.localStorage to store the latest fetched weather information. In the case of a failed fetch this information will be displayed instead.
- If no fetch data is saved, no data available messages are shown.

## Assumptions
- The weather information fetched is always set to London.
- 5 day forecast only.
- 1 minute countdown for weather information refresh.
- OpenWeather API free account only.
- The time of day for daily weather forecasting was taken at 12:00 when possible.
- Forecasting starts at current time to the nearest 3 hour interval. During the early mornings (after 00:00 and before 09:00), the 5th day forecast at 12:00 was not available because it is not within the 40 forecasts. Assumed to take the forecast at 09:00 instead.

## Future Improvements
- OpenWeather API recently released an endpoint named "One Call API". It provides the current weather and a daily forecast for 7 days. This might be a more appropriate endpoint to use because it requires only one API call and no data manipulation to retrieve daily forecasting.
- Progress bar animation smoothness.
- More interesting animations when transitioning to new data.

## Built With
- [Open Weather Map API] (https://openweathermap.org/api) 
- This project was bootstrapped with [Create React App] (https://github.com/facebook/create-react-app).
- [React v16] (https://reactjs.org/)
- [axios] (https://github.com/axios/axios)
- [react-spring] (https://github.com/react-spring/react-spring)
- [react-spinners] (https://github.com/davidhu2000/react-spinners)
- [node-sass] (https://github.com/sass/node-sass)
- [Jest] (https://jestjs.io/)
- [react-test-renderer] (https://reactjs.org/docs/test-renderer.html)
- [react-testing-library] (https://github.com/testing-library/react-testing-library)

## Authors
James Wong
