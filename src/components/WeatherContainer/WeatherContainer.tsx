import { Grid } from "@mui/material";
import { FC } from "react";
import { Weather } from "../../models/weather.model";
import { WeatherCard } from "../WeatherCard";

interface WeatherContainerProps {
  list: Weather[];
}

export const WeatherContainer: FC<WeatherContainerProps> = ({ list }) => (
  <Grid container justifyContent="center">
    <Grid item xs={10}>
      <Grid container justifyContent="center" spacing={2}>
        {list.map((item) => (
          <Grid
            key={item.day}
            item
            xs={12}
            sm={4}
            md={2}
            data-testid="weather-card-grid"
          >
            <WeatherCard item={item} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  </Grid>
);
