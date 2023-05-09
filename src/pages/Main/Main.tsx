import { FC, useCallback, useEffect, useState } from "react";
import { setCityList } from "../../store/slices/mainStore";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
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

  const getWeather = useCallback(async () => {
    const options = await getCityWeather({
      selected: selectedCity,
      appId: appId,
    });
    setWeatherList(options);
  }, [appId, selectedCity]);

  useEffect(() => {
    const getCityList = async () => {
      const options = await getCityOptions();
      dispatch(setCityList(options));
    };

    !cityList.length && getCityList();
  }, [cityList, dispatch]);

  useEffect(() => {
    if (selectedCity) {
      appId && getWeather();
      localStorage.setItem("selected", selectedCity);
    }
  }, [selectedCity, getWeather, appId]);

  return (
    <div className="main">
      <Search />
      <WeatherContainer list={wheatherList} />
    </div>
  );
};
