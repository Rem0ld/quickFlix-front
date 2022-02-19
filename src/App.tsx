import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import ModalWrapper from "./components/ModalWrapper/ModalWrapper";
import Home from "./routes/Home/Home";
import Layout from "./routes/Layout/Layout";
import Login from "./routes/Login/Login";
import Player from "./routes/Player/Player";

export default function App() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <div>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/">
          <Route element={<Layout />}>
            <Route index element={<Login />} />
            <Route path="/browse" element={<Home />} />
          </Route>
        </Route>
      </Routes>
      <Routes>
        <Route path="/player/:id" element={<Player />} />
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path="/browse" element={<ModalWrapper />} />
        </Routes>
      )}
    </div>
  );
}
