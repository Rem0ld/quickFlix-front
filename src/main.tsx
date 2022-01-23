import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./main.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./routes/Home/Home";
import Player from "./routes/Player/Player";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/browse" element={<Home />} />
          <Route path="/player/:id" element={<Player />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
