import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.module.scss";
import App from "./App.jsx";
import { Provider } from "react-redux";
import configureStore from "./index.js";

createRoot(document.querySelector(".root")).render(
  // <StrictMode>
  <Provider store={configureStore}>
    <App />
  </Provider>,
  // </StrictMode>
);
