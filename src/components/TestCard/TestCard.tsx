import { nanoid } from "@reduxjs/toolkit";
import React from "react";
import { useDispatch } from "react-redux";
import { setVideo, VideoState } from "../../features/video/videoSlice";
import { TvShow, Video } from "../../types";
import Card from "../Card/Card";

export function TestCard() {
  const dispatch = useDispatch();

  return (
    <div className="w-screen h-screen grid place-items-center bg-gray-300">
      <Card />
    </div>
  );
}
