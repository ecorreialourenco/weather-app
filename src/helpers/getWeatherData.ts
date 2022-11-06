import { Weather } from "../models/weather.model";

export const getWeatherData = (weather: any[]): Weather[] => {
  const weatherList: Weather[] = [];
  const currentDay: string[] = [];

  weather.forEach((el: any) => {
    const day = el.dt_txt.split(" ")[0];
    const currentIndex = currentDay.findIndex((el) => el === day);
    if (currentIndex === -1) {
      currentDay.push(day);
      weatherList.push({
        day,
        minTemp: el.main.temp_min,
        maxTemp: el.main.temp_max,
        icon: el.weather[0].icon.replace("n", "d"), // change night to day icons
        description: el.weather[0].description,
        minWind: el.wind.speed,
        maxWind: el.wind.speed,
        wind: el.wind.deg,
      });
    } else {
      // Update temperatures
      if (weatherList[currentIndex].minTemp > el.main.temp_min) {
        weatherList[currentIndex].minTemp = el.main.temp_min;
      }
      if (weatherList[currentIndex].maxTemp < el.main.temp_max) {
        weatherList[currentIndex].maxTemp = el.main.temp_max;
      }

      if (weatherList[currentIndex].minWind > el.wind.speed) {
        weatherList[currentIndex].minWind = el.wind.speed;
      }
      if (weatherList[currentIndex].maxWind < el.wind.speed) {
        weatherList[currentIndex].maxWind = el.wind.speed;
      }
    }
  });

  return weatherList;
};
