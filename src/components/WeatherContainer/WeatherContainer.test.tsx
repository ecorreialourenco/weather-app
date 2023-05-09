import { render, screen } from "@testing-library/react";
import { WeatherContainer } from "./WeatherContainer";
import { Weather } from "../../models/weather.model";

describe("WeatherContainer", () => {
  it("Render WeatherContainer", () => {
    const weatherList: Weather[] = [
      {
        day: "2023-05-09",
        minTemp: "8.28",
        maxTemp: "15.43",
        icon: "04d",
        description: "broken clouds",
        minWind: 1.74,
        maxWind: 2.61,
        wind: 21,
      },
      {
        day: "2023-05-10",
        minTemp: "8.52",
        maxTemp: "19.91",
        icon: "02d",
        description: "few clouds",
        minWind: 1.11,
        maxWind: 3.12,
        wind: 332,
      },
      {
        day: "2023-05-11",
        minTemp: "13.04",
        maxTemp: "20.91",
        icon: "04d",
        description: "overcast clouds",
        minWind: 0.66,
        maxWind: 3.4,
        wind: 281,
      },
      {
        day: "2023-05-12",
        minTemp: "13.33",
        maxTemp: "21.2",
        icon: "03d",
        description: "scattered clouds",
        minWind: 1.85,
        maxWind: 3.76,
        wind: 201,
      },
      {
        day: "2023-05-13",
        minTemp: "12.72",
        maxTemp: "19.91",
        icon: "10d",
        description: "light rain",
        minWind: 0.38,
        maxWind: 3.14,
        wind: 243,
      },
      {
        day: "2023-05-14",
        minTemp: "13.34",
        maxTemp: "16.82",
        icon: "04d",
        description: "overcast clouds",
        minWind: 2.61,
        maxWind: 3.03,
        wind: 346,
      },
    ];

    render(<WeatherContainer list={weatherList} />);

    expect(screen.getAllByTestId("weather-card-grid").length).toBe(
      weatherList.length
    );
  });
});
