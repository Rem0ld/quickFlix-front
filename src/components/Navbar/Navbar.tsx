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
  const [isVisible, setIsVisible] = useState(false);

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

  const handleMenuVisible = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    if (window.innerWidth >= 768) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
    const scroll = () => {
      const { scrollY } = window;
      setOpacity(1 * (scrollY / 100));
    };

    document.addEventListener("scroll", scroll);

    return () => document.removeEventListener("scroll", scroll);
  }, []);

  useEffect(() => {
    if (user) {
      accessVideos();
    }
  }, [user]);

  const menuDesktop = (
    <>
      <button
        onClick={handleMenuVisible}
        className="temp-menu-burger block md:hidden"
      />
      <div
        onClick={() => setIsVisible(false)}
        className={`${
          isVisible ? "visible" : "hidden"
        } flex gap-x-10 absolute initial-pos md:flex-initial left-4 top-12 bg-gray-700 md:bg-transparent rounded-sm py-5 px-4 md:p-0`}
      >
        <Link to="/browse" className="hidden md:block text-xl text-red-500">
          <img src={logo} width={70} />
        </Link>
        {location.pathname !== "/" && !!user && (
          <div className="flex flex-col md:flex-row justify-center items-center md:justify-around gap-3 text-white">
            <Link to="/movies" className="text-xl">
              Movies
            </Link>
            <Link to="/tv-show" className="text-xl">
              Tv-shows
            </Link>
            {user?.isAdmin && (
              <>
                <Link to="/add" className="text-xl">
                  Add
                </Link>
                <Link to="/dashboard" className="text-xl">
                  Dashboard
                </Link>
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
    </>
  );

  return (
    <nav
      ref={ref}
      style={{
        backgroundColor: `rgba(0,0,0, ${opacity})`,
      }}
      className={`w-full h-14 flex items-center justify-between fixed z-10 px-4 lg:px-14 `}
    >
      {menuDesktop}
    </nav>
  );
};

export default Navbar;
