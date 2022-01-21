import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const baseUrl = "http://localhost:3050/api/";

const Player = () => {
  const { id } = useParams();

  console.log(id);
  return (
    <div>
      <video width="100%" height="100%" controls>
        <source src={`${baseUrl}${id}`} type="video/webm" />
        <source src={`${baseUrl}${id}`} type="video/mp4" />
        <source src={`${baseUrl}${id}`} type='video/mp4; codecs="avc1"' />
      </video>
    </div>
  );
};

export default Player;
