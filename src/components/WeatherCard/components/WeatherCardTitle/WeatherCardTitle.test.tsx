import { render, screen } from "@testing-library/react";
import { WeatherCardTitle } from "./WeatherCardTitle";

describe("WeatherCardTitle", () => {
  it("Render WeatherCardTitle", () => {
    const title = "Card Title";
    const subtitle = "Card Subtitle";
    render(<WeatherCardTitle title={title} subTitle={subtitle} />);

    expect(screen.getByText(title)).toBeDefined();
    expect(screen.getByText(subtitle)).toBeDefined();
  });
});
