import {
  act,
  fireEvent,
  prettyDOM,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { Main } from "./Main";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import fetchMock from "jest-fetch-mock";
import { CityList } from "../../models/city.model";
import { selectFirstOption } from "../../../jest/selectFirstOption";

const list: CityList[] = [
  {
    id: 5039192,
    name: "New York Mills",
    country: "US",
  },
  {
    id: 5128581,
    name: "New York City",
    country: "US",
  },
  {
    id: 5128594,
    name: "New York County",
    country: "US",
  },
  {
    id: 5128638,
    name: "New York",
    country: "US",
  },
  {
    id: 5174095,
    name: "Toronto",
    country: "US",
  },
  {
    id: 6167865,
    name: "Toronto",
    country: "CA",
  },
];

describe("Main", () => {
  jest.useFakeTimers();
  const OLD_ENV = process.env;

  beforeEach(() => {
    fetchMock.resetMocks();
    process.env = { ...OLD_ENV };
  });

  it("Render Main", async () => {
    await act(async () => {
      fetchMock.mockResponseOnce(JSON.stringify(list));

      render(
        <Provider store={store}>
          <Main />
        </Provider>
      );
    });

    expect(screen.getByPlaceholderText("Insert city name")).toBeDefined();
  });

  it("Get city weather", async () => {
    await act(async () => {
      process.env.REACT_APP_WEATHER_KEY = "123";
      fetchMock.mockResponseOnce(JSON.stringify(list));

      render(
        <Provider store={store}>
          <Main />
        </Provider>
      );
    });

    const autocomplete = await selectFirstOption();
    const input = within(autocomplete).getByRole("combobox");

    expect(input).toHaveValue(`${list[0].name}, ${list[0].country}`);

    const { selectedCity } = store.getState().main;
    expect(selectedCity).toBe(list[0].id.toString());
  });
});
