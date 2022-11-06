export interface Weather {
  day: string;
  minTemp: string;
  maxTemp: string;
  icon: string;
  description: string;
  minWind: number;
  maxWind: number;
  wind: number;
}

export interface WeatherCardProps {
  item: Weather;
}
