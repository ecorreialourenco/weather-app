import { CityList, CityResponse } from "../models/city.model";

export const getCityOptions = async () =>
  await fetch("./city.list.json")
    .then(async (res) => {
      const list = await res.json();
      const listOptions: CityList[] = list.map((item: CityResponse) => {
        return {
          id: item.id,
          name: item.name,
          country: item.country,
        };
      });

      return listOptions;
    })
    .catch((err) => {
      console.error(err);
      return [];
    });
