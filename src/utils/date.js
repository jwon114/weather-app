export default {
  getDayOfWeek: (unixTime) => {
    const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const date = new Date(unixTime * 1000); // multiple by 1000 to get milliseconds
    return days[date.getUTCDay()];
  },
  getCurrentTime:() => {
    const timeNow = new Date();
    const hours = timeNow.getUTCHours();
    const minutes = timeNow.getUTCMinutes().toString().padStart(2, 0);
    return `${hours}:${minutes} GMT`;
  }
}