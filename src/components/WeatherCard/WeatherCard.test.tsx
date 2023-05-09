import { render, screen } from "@testing-library/react";
import { WeatherCard } from "./WeatherCard";
import { Weather } from "../../models/weather.model";

describe("WeatherCard", () => {
  it("Render WeatherCard", () => {
    const minTemp = "10";
    const maxTemp = "20";
    const label = "ºC";
    const item: Weather = {
      day: "1",
      minTemp,
      maxTemp,
      description: "",
      icon: "",
      minWind: 1000,
      maxWind: 5000,
      wind: 15000,
    };
    render(<WeatherCard item={item} />);

    expect(screen.getByText(`Max: ${maxTemp}${label}`)).toBeDefined();
    expect(screen.getByText(`Min: ${minTemp}${label}`)).toBeDefined();
  });
});
