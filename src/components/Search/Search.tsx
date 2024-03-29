import { FC, SyntheticEvent, useState } from "react";
import { Autocomplete, Grid, TextField } from "@mui/material";
import { debounce } from "lodash";
import { CityOptions } from "../../models/city.model";
import { setCityOptions } from "../../helpers/setCityOptions";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { setSelectedCity } from "../../store/slices/mainStore";
import "./Search.css";

export const Search: FC = () => {
  const dispatch = useDispatch();
  const [optionsList, setOptionsList] = useState<CityOptions[]>([]);
  const [defaultValue, setDefaultValue] = useState<CityOptions | null>(null);
  const { cityList, selectedCity } = useSelector(
    (state: RootState) => state.main
  );

  const debouncedSearch = debounce(async (input) => {
    const cityFiltered: CityOptions[] = setCityOptions(
      cityList.filter(({ name }) =>
        name.toLowerCase().startsWith(input.toLowerCase())
      )
    ).filter(
      // Remove duplications
      (value: any, index: any, self: any) =>
        index ===
        self.findIndex(
          (t: CityOptions) =>
            t.name === value.name && t.country === value.country
        )
    );
    setOptionsList(cityFiltered);
  }, 300);

  const getCityByName = async (input: string) => {
    input.length > 2 && (await debouncedSearch(input));
  };

  const handleChangeOption = (e: SyntheticEvent, val: CityOptions | null) => {
    dispatch(setSelectedCity(val?.id ? val.id : ""));
    setDefaultValue(val);
  };

  const handleChangeInput = async (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    try {
      await getCityByName(e.target.value);

      return e.target.value;
    } catch (err) {
      console.log(err);

      return null;
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      spacing={2}
      className="search-container"
    >
      <Grid item xs={10} sm={6} md={4} lg={3}>
        <Autocomplete
          disablePortal
          options={optionsList}
          onChange={handleChangeOption}
          value={defaultValue}
          data-testid="autocomplete"
          renderInput={(params) => (
            <TextField
              placeholder="Insert city name"
              className="search-input"
              onChange={handleChangeInput}
              value={selectedCity.toString()}
              {...params}
            />
          )}
        />
      </Grid>
    </Grid>
  );
};
