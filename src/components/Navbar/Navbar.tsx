/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../../assets/quickflix-logo-02.svg";
import avatar from "../../../assets/avatar-original.png";
import refreshIcon from "../../../assets/refresh_icon.svg";
import { AuthContext } from "../../contexts/auth/AuthContext";
import DiscoverApi from "../../api/DiscoverApi";
import AuthenticateApi from "../../api/AuthenticateApi";

const stateAccessFolder = {
  1: "bg-green-500",
  0: "bg-red-500",
  pending: "bg-gray-500",
};

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const ref = useRef(null);
  const location = useLocation();
  const [opacity, setOpacity] = useState(0);

  const [refresh, setRefresh] = useState(false);
  const [accessFolder, setAccessFolder] = useState(stateAccessFolder.pending);

  const accessVideos = async () => {
    setRefresh(true);
    setAccessFolder(stateAccessFolder.pending);

    setTimeout(async () => {
      const [access, error] = await DiscoverApi.Instance.checkAccessFolder();
      if (error) {
        //TODO: send error to global error object
        console.error(error);
        return;
      }
      setAccessFolder(stateAccessFolder[access]);
      setRefresh(false);
    }, 300);
  };

  const logout = () => {
    AuthenticateApi.Instance.logout();
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    const scroll = () => {
      const { scrollY } = window;
      setOpacity(1 * (scrollY / 100));
    };

    document.addEventListener("scroll", scroll);

    return () => document.removeEventListener("scroll", scroll);
  });

  useEffect(() => {
    if (user) {
      accessVideos();
    }
  }, [user]);

  return (
    <nav
      ref={ref}
      style={{
        backgroundColor: `rgba(0,0,0, ${opacity})`,
      }}
      className={`w-full h-14 flex items-center justify-between fixed z-10 px-14 `}
    >
      <div className="flex gap-x-10">
        <Link to="/browse" className="text-xl text-red-500">
          <img src={logo} width={70} />
        </Link>
        {location.pathname !== "/" && !!user && (
          <div className="flex justify-around gap-x-3 text-white">
            <Link to="/movies">Movies</Link>
            <Link to="/tv-show">Tv-shows</Link>
            {user?.isAdmin && (
              <>
                <Link to="/add">Add</Link>
                <Link to="/dashboard">Dashboard</Link>
              </>
            )}
          </div>
        )}
      </div>
      {location.pathname !== "/" && !!user && (
        <div className="flex gap-1 items-center">
          <button
            onClick={accessVideos}
            className={`${refresh ? "animate-spin" : "animate-none"}`}
          >
            <img src={refreshIcon} />
          </button>
          <div className={`w-3 h-3 rounded-full ${accessFolder}`} />
          <img
            onClick={logout}
            className="rounded"
            src={avatar}
            width={32}
            height={40}
          />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
