import { getWeatherData } from "../helpers/getWeatherData";
import { Weather } from "../models/weather.model";

interface GetWeatherProps {
  selected: string;
  appId: string | undefined;
}

export const getCityWeather = async ({ selected, appId }: GetWeatherProps) => {
  return await fetch(
    `http://api.openweathermap.org/data/2.5/forecast?id=${selected}&units=metric&APPID=${appId}`
  )
    .then(async (res) => {
      const weather = await res.json();
      const weatherList: Weather[] = getWeatherData(weather.list);

      return weatherList;
    })
    .catch((err) => {
      console.log(JSON.stringify(err));
      return [];
    });
};
