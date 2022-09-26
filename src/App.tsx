import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Details from "./components/Details/Details";
import DetailsTvShow from "./components/DetailsTvShow/DetailsTvShow";
import ModalWrapper from "./components/ModalWrapper/ModalWrapper";
import Dashboard from "./routes/Dashboard/Dashboard";
import Home from "./routes/Home/Home";
import Layout from "./routes/Layout/Layout";
import AnimationLogo from "./routes/AnimationLogo/AnimationLogo";
import Player from "./routes/Player/Player";
import Login from "./routes/Login/Login";
import { RequireAdmin, RequireAuth } from "./contexts/auth/AuthContext";
import AddFile from "./routes/Add/Add";

export default function App() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <div>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/">
          <Route
            element={
              <RequireAuth>
                <Layout />
              </RequireAuth>
            }
          >
            <Route index element={<AnimationLogo />} />
            <Route path="/browse" element={<Home />} />
            <Route
              path="/add"
              element={
                <RequireAdmin>
                  <AddFile />
                </RequireAdmin>
              }
            />
            <Route
              path="/dashboard"
              element={
                <RequireAdmin>
                  <Dashboard />
                </RequireAdmin>
              }
            />
          </Route>
          <Route path="/login" element={<Login />} />)
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
