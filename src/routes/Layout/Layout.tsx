import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

export default function Layout() {
  return (
    <div className="relative min-h-screen w-screen bg-gray-900">
      <Navbar />
      <div className="h-14" />
      <Outlet />
    </div>
  );
}
