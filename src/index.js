import React from "react";
import App from "./app";
import store from "./store";
import "./styles/globals.scss";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";

class RootApp extends React.Component {
  render() {
    return (
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>
    );
  }
}
createRoot(document.getElementById("root")).render(<RootApp />);
