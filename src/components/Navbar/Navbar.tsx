import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/quickflix-logo-02.svg";

const Navbar = () => {
  const location = useLocation();

  console.log(location);
  return (
    <nav className="w-full h-14 flex gap-x-10 items-center px-14 bg-black/50">
      <Link to="/" className="text-xl text-red-500">
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
    </nav>
  );
};

export default Navbar;
