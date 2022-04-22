import React from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Details from "./components/Details/Details";
import DetailsTvShow, {
  EnhancedComp,
} from "./components/DetailsTvShow/DetailsTvShow";
import ModalWrapper from "./components/ModalWrapper/ModalWrapper";
import Dashboard from "./routes/Dashboard/Dashboard";
import Home from "./routes/Home/Home";
import Layout from "./routes/Layout/Layout";
import Login from "./routes/Login/Login";
import Player from "./routes/Player/Player";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <div>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/">
          <Route element={<Layout />}>
            <Route index element={<Login />} />
            <Route path="/browse" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
      <Routes>
        <Route path="/player/:id" element={<Player />} />
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route
            path="/browse"
            element={
              <ModalWrapper>
                <Details />
              </ModalWrapper>
            }
          />
          <Route
            path="/browse/tv-show"
            element={
              <ModalWrapper>
                <DetailsTvShow />
              </ModalWrapper>
            }
          />
        </Routes>
      )}
    </div>
  );
}
