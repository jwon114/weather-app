import axios from 'axios';
const API_KEY = '6c8ca7a74ad9d3301728396fc82b6227';

export default { 
  fetchCurrentWeather: () => (
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=london,uk&APPID=${API_KEY}&units=metric`)
  ),
  fetchFiveDayForecast: () => (
    axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=london,uk&APPID=${API_KEY}&units=metric`)
  )
}