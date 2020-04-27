import axios from 'axios';
const API_KEY = '6c8ca7a74ad9d3301728396fc82b6227';

export default { 
  fetchCurrentWeather: () => (
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=london,uk&APPID=${API_KEY}&units=metric`)
  ),
  fetchFiveDayForecast: () => (
    // latitidue longitude for London, UK
    // axios.get(`http://api.openweathermap.org/data/2.5/onecall?lat=51.509865&lon=-0.118092&units=metric&APPID=${API_KEY}`)
    axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=london,uk&APPID=${API_KEY}&units=metric`)
  )
}