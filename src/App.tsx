import { Provider } from "react-redux";
import { store } from "./store/store";
import { Main } from "./pages";
import { FC } from "react";
import "./App.css";

const App: FC = () => (
  <Provider store={store}>
    <Main />
  </Provider>
);

export default App;
