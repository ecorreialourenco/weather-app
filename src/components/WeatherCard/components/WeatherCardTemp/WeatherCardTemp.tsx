import { FC } from "react";

interface WeatherCardTempProps {
  min: number;
  max: number;
  label: string;
}

export const WeatherCardTemp: FC<WeatherCardTempProps> = ({
  min,
  max,
  label,
}) => (
  <>
    <p>
      Max: {Math.round(max)}
      {label}
    </p>
    <p>
      Min: {Math.round(min)}
      {label}
    </p>
  </>
);
