import { useEffect, useState } from "react";
import WeatherCard from "./components/weatherCard/WeatherCard";
import { Grid } from "@mui/material";
import { Weather } from "./models/weather.model";
import { CityList, CityResponse } from "./models/city.model";
import Search from "./components/search/Search";
import { getWeatherData } from "./helpers/getWeatherData";
import "./App.css";

function App() {
  const [cityList, setCityList] = useState<CityList[]>([]);
  const stored: string = localStorage.getItem("selected") || "";
  const [selected, setSelected] = useState<string>(stored);
  const [wheatherList, setWeatherList] = useState<Weather[]>([]);

  const appId = process.env.REACT_APP_WEATHER_KEY;

  const getCityList = async () => {
    await fetch("./city.list.json")
      .then(async (res) => {
        const list = await res.json();
        const listOptions: CityList[] = list.map((item: CityResponse) => {
          return {
            id: item.id,
            name: item.name,
            country: item.country,
          };
        });

        setCityList(listOptions);
      })
      .catch((err) => err);
  };

  const getWeather = () => {
    fetch(
      `http://api.openweathermap.org/data/2.5/forecast?id=${selected}&units=metric&APPID=${appId}`
    )
      .then(async (res) => {
        const weather = await res.json();
        const weatherList: Weather[] = getWeatherData(weather.list);

        setWeatherList(weatherList);
      })
      .catch((err) => err);
  };

  useEffect(() => {
    !cityList.length && getCityList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selected) {
      getWeather();
      localStorage.setItem("selected", selected);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <div className="app">
      <Search list={cityList} value={selected} onChange={setSelected} />

      <Grid container justifyContent="center">
        <Grid item xs={10}>
          <Grid container justifyContent="center" spacing={2}>
            {wheatherList.map((item) => {
              return (
                <Grid key={item.day} item xs={12} sm={4} md={2}>
                  <WeatherCard item={item} />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
