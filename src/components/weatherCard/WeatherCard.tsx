import { FC } from "react";
import { WeatherCardProps } from "../../models/weather.model";
import { months, weekdays } from "../../variables/dates";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowUp } from "@fortawesome/free-solid-svg-icons";

import "./WeatherCard.css";
import { Tooltip } from "@mui/material";
import { capitalizeFirstLetter } from "../../helpers/capitalizeFirstLetter";

const WeatherCard: FC<WeatherCardProps> = (props) => {
  const { day, minTemp, maxTemp, description, icon, minWind, maxWind, wind } =
    props.item;

  const getDay = new Date(day).getDate();
  const monthDay = months[new Date(day).getMonth()];
  const weekDay = weekdays[new Date(day).getDay()];

  return (
    <div className="weather-card-container">
      <h4>{weekDay}</h4>
      <h5>
        {monthDay} {getDay}
      </h5>
      <Tooltip title={capitalizeFirstLetter(description)}>
        <img
          src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
          height="100"
          alt={`weather icon ${icon}`}
          className="weather-card-img"
        />
      </Tooltip>
      <span className="weather-card-temp">
        Max: {Math.round(parseFloat(maxTemp))}ºC
        <br />
        Min: {Math.round(parseFloat(minTemp))}ºC
      </span>
      <span className="weather-card-temp">
        <FontAwesomeIcon
          icon={faCircleArrowUp}
          style={{ transform: `rotate(${wind}deg)` }}
        />
      </span>
      <span className="weather-card-temp">
        Max: {Math.round((maxWind * 3600) / 1000)} km/h
        <br />
        Min: {Math.round((minWind * 3600) / 1000)} km/h
      </span>
    </div>
  );
};

export default WeatherCard;
