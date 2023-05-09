import { render, screen } from "@testing-library/react";
import { WeatherCardTemp } from "./WeatherCardTemp";

describe("WeatherCardTemp", () => {
  it("Render WeatherCardTemp", () => {
    const min = 10;
    const max = 20;
    const label = "ºC";
    render(<WeatherCardTemp min={min} max={max} label={label} />);

    expect(screen.getByText(`Max: ${Math.round(max)}${label}`)).toBeDefined();
    expect(screen.getByText(`Min: ${Math.round(min)}${label}`)).toBeDefined();
  });
});
