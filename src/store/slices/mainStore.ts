import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CityList } from "../../models/city.model";

export interface MainStore {
  cityList: CityList[];
  selectedCity: string;
}

const initialState: MainStore = {
  cityList: [],
  selectedCity: "",
};

export const mainStore = createSlice({
  name: "mainStore",
  initialState,
  reducers: {
    setCityList: (state, action: PayloadAction<CityList[]>) => {
      state.cityList = action.payload;
    },
    setSelectedCity: (state, action: PayloadAction<string>) => {
      state.selectedCity = action.payload;
    },
  },
});

export const { setCityList, setSelectedCity } = mainStore.actions;

export default mainStore.reducer;
