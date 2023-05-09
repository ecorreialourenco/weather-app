import { FC } from "react";
import { WeatherCardProps } from "../../models/weather.model";
import { months, weekdays } from "../../variables/dates";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowUp } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "@mui/material";
import { capitalizeFirstLetter } from "../../helpers/capitalizeFirstLetter";
import { WeatherCardTemp, WeatherCardTitle } from "./components";
import "./WeatherCard.css";

export const WeatherCard: FC<WeatherCardProps> = ({
  item: { day, minTemp, maxTemp, description, icon, minWind, maxWind, wind },
}) => {
  const getDay = new Date(day).getDate();
  const monthDay = months[new Date(day).getMonth()];
  const weekDay = weekdays[new Date(day).getDay()];

  return (
    <div className="weather-card-container">
      <WeatherCardTitle title={weekDay} subTitle={`${monthDay} ${getDay}`} />
      <Tooltip title={capitalizeFirstLetter(description)}>
        <img
          src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
          height="100"
          alt={`weather icon ${icon}`}
          className="weather-card-img"
        />
      </Tooltip>
      <WeatherCardTemp
        min={parseFloat(minTemp)}
        max={parseFloat(maxTemp)}
        label="ºC"
      />
      <span className="weather-card-temp">
        <FontAwesomeIcon
          icon={faCircleArrowUp}
          style={{ transform: `rotate(${wind}deg)` }}
        />
      </span>
      <WeatherCardTemp
        min={(minWind * 3600) / 1000}
        max={(maxWind * 3600) / 1000}
        label="km/h"
      />
    </div>
  );
};
