import { FC, useEffect, useState } from "react";
import { setCityList } from "../../store/slices/mainStore";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { getCityOptions } from "../../utils/getCity";
import { getCityWeather } from "../../utils/getWeather";
import { Weather } from "../../models/weather.model";
import { Search, WeatherContainer } from "../../components";
import "./Main.css";

export const Main: FC = () => {
  const { cityList, selectedCity } = useSelector(
    (state: RootState) => state.main
  );
  const dispatch = useDispatch();
  const [wheatherList, setWeatherList] = useState<Weather[]>([]);
  const appId = process.env.REACT_APP_WEATHER_KEY;

  useEffect(() => {
    const getCityList = async () => {
      const options = await getCityOptions();
      dispatch(setCityList(options));
    };
    if (!cityList.length) {
      getCityList();
    }
  }, [cityList, dispatch]);

  useEffect(() => {
    const getWeather = async () => {
      const options = await getCityWeather({
        selected: selectedCity,
        appId: appId,
      });
      setWeatherList(options);
    };

    if (appId && selectedCity) {
      getWeather();
      localStorage.setItem("selected", selectedCity);
    }
  }, [selectedCity, appId]);

  return (
    <div className="main">
      <Search />
      <WeatherContainer list={wheatherList} />
    </div>
  );
};
