/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/quickflix-logo-02.svg";
import avatar from "../../../assets/avatar-original.png";

const Navbar = () => {
  const location = useLocation();
  const [opacity, setOpacity] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const scroll = () => {
      const { scrollY } = window;
      setOpacity(1 * (scrollY / 100));
    };

    document.addEventListener("scroll", scroll);

    return () => document.removeEventListener("scroll", scroll);
  });

  return (
    <nav
      ref={ref}
      style={{
        backgroundColor: `rgba(0,0,0, ${opacity})`,
        // transition: "background-color 200ms 50ms ease-in-out",
      }}
      className={`w-full h-14 flex items-center justify-between fixed z-10 px-14 `}
    >
      <div className="flex gap-x-10">
        <Link to="/browse" className="text-xl text-red-500">
          <img src={logo} width={70} />
        </Link>
        {location.pathname !== "/" && (
          <div className="flex justify-around gap-x-3">
            <Link to="/movies" className="text-white">
              Movies
            </Link>
            <Link to="/tv-show" className="text-white">
              Tv-show
            </Link>
            <Link to="/add" className="text-white">
              Add
            </Link>
            <Link to="/discover" className="text-white">
              Parameters
            </Link>
          </div>
        )}
      </div>
      {location.pathname !== "/" && (
        <img className="rounded" src={avatar} width={32} height={40} />
      )}
    </nav>
  );
};

export default Navbar;
