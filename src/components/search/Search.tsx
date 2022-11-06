import { FC, useEffect, useState } from "react";
import { Autocomplete, Grid, TextField } from "@mui/material";
import { debounce } from "lodash";
import { CityList, CityOptions } from "../../models/city.model";
import "./Search.css";
import { setCityOptions } from "../../helpers/setCityOptions";

interface SearchProps {
  list: CityList[];
  value: string;
  onChange: (val: string) => void;
}

const Search: FC<SearchProps> = (props) => {
  const [optionsList, setOptionsList] = useState<CityOptions[]>([]);
  const [defaultValue, setDefaultValue] = useState<CityOptions | null>(null);
  const debouncedSearch = debounce(async (input) => {
    const cityFiltered: CityOptions[] = setCityOptions(
      props.list.filter((item) => {
        return item.name.toLowerCase().startsWith(input.toLowerCase());
      })
    ).filter(
      // Remove duplications
      (value: any, index: any, self: any) =>
        index ===
        self.findIndex(
          (t: any) => t.name === value.name && t.country === value.country
        )
    );
    setOptionsList(cityFiltered);
  }, 300);

  const getCityByName = (input: string) => {
    input.length > 2 && debouncedSearch(input);
  };

  useEffect(() => {
    if (!optionsList.length && !defaultValue) {
      const selected: CityOptions[] = setCityOptions(
        props.list.filter((item) => item.id.toString() === props.value)
      );
      selected && setOptionsList(selected);
      !!selected && selected.length && setDefaultValue(selected[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value, props.list]);

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
          onChange={(e, val) => props.onChange(val?.id ? val.id : "")}
          value={defaultValue}
          renderInput={(params) => (
            <TextField
              placeholder="Insert city name"
              className="search-input"
              onChange={(e) => getCityByName(e.target.value)}
              value={props.value.toString()}
              {...params}
            />
          )}
        />
      </Grid>
    </Grid>
  );
};

export default Search;
