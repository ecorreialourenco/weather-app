import { CityList, CityOptions } from "../models/city.model";

export const setCityOptions = (options: CityList[]): CityOptions[] =>
  options.map((item: CityList) => {
    return {
      id: item.id.toString(),
      name: item.name,
      country: item.country,
      label: `${item.name}, ${item.country}`,
    };
  });
