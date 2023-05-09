import {
  render,
  screen,
  fireEvent,
  within,
  waitFor,
  prettyDOM,
} from "@testing-library/react";
import { Search } from "./Search";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import { CityList } from "../../models/city.model";
import { setCityList, setSelectedCity } from "../../store/slices/mainStore";
import { act } from "react-dom/test-utils";

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

const selectFirstOption = async () => {
  const autocomplete = await screen.getByTestId("autocomplete");
  const input = within(autocomplete).getByRole("combobox");
  autocomplete.focus();

  await act(async () => {
    fireEvent.change(input, { target: { value: "New" } });
    jest.runAllTimers();
  });

  await act(async () => {
    fireEvent.keyDown(autocomplete, { key: "ArrowDown" });
    await waitFor(() => {});
    fireEvent.keyDown(autocomplete, { key: "Enter" });
    await waitFor(() => {});
  });

  return autocomplete;
};

const resetStore = () => {
  act(() => {
    store.dispatch(setCityList([]));
    store.dispatch(setSelectedCity(""));
  });
};

describe("Search", () => {
  jest.useFakeTimers();

  afterEach(() => {
    resetStore();
  });

  it("Render Search", () => {
    store.dispatch(setCityList(list));

    act(() => {
      render(
        <Provider store={store}>
          <Search />
        </Provider>
      );
    });

    expect(screen.getByPlaceholderText("Insert city name")).toBeDefined();
  });

  it("Search by city", async () => {
    act(() => {
      store.dispatch(setCityList(list));

      render(
        <Provider store={store}>
          <Search />
        </Provider>
      );
    });

    const autocomplete = await selectFirstOption();
    const input = within(autocomplete).getByRole("combobox");
    expect(input).toHaveValue(`${list[0].name}, ${list[0].country}`);

    const { selectedCity } = store.getState().main;
    expect(selectedCity).toBe(list[0].id.toString());
  });

  it("Clear Search option", async () => {
    act(() => {
      store.dispatch(setCityList(list));

      render(
        <Provider store={store}>
          <Search />
        </Provider>
      );
    });

    const autocomplete = await selectFirstOption();
    const closeButton = await screen.getByTestId("CloseIcon");
    fireEvent.click(closeButton);

    const input = within(autocomplete).getByRole("combobox");
    expect(input).toHaveValue("");
  });
});
