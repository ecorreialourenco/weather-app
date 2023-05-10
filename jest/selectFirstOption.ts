import {
  act,
  fireEvent,
  screen,
  waitFor,
  within,
} from "@testing-library/react";

export const selectFirstOption = async () => {
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
