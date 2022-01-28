/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../config";
import PlayerControl from "../../components/PlayerControl/PlayerControl";

const Player = () => {
  const { id } = useParams();
  const videoRef = useRef<any>(null);
  const videoContainer = useRef<any>(null);
  const progressRef = useRef<any>();
  const progressBarRef = useRef<any>(null);

  return (
    <PlayerControl
      videoRef={videoRef}
      videoContainer={videoContainer}
      progressBarRef={progressBarRef}
      progressRef={progressRef}
    >
      <video ref={videoRef} className="h-screen absolute" preload="metadata">
        <source src={`${baseUrl}${id}`} type="video/webm" />
        <source src={`${baseUrl}${id}`} type="video/mp4" />
        <source src={`${baseUrl}${id}`} type='video/mp4; codecs="avc1"' />
      </video>
    </PlayerControl>
  );
};

export default Player;
