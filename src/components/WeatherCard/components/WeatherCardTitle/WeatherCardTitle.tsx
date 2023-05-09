import { FC } from "react";

interface WeatherCardTitleProps {
  title: string;
  subTitle: string;
}

export const WeatherCardTitle: FC<WeatherCardTitleProps> = ({
  title,
  subTitle,
}) => (
  <>
    <h4>{title}</h4>
    <h5>{subTitle}</h5>
  </>
);
