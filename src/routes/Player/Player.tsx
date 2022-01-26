/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaPlay, FaForward, FaBackward, FaVolumeUp, FaCommentAlt, FaPause } from "react-icons/fa";
import { IoPlaySkipForward } from "react-icons/io5";
import { IoIosJournal } from "react-icons/io";
import { SiSpeedtest } from "react-icons/si";
import { RiFullscreenLine, RiFullscreenExitLine } from "react-icons/ri";
import { MdKeyboardBackspace } from "react-icons/md";
import { Popover, Slider } from "antd";
import "antd/dist/antd.css";
import gsap from "gsap";
import UseControlPlayer from "../../hooks/UseControlPlayer";

const baseUrl = `http://${import.meta.env.DEV ? "localhost" : "192.168.0.11"}:3050/api/`;
const size = 30;

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef<any>(null);
  const videoContainer = useRef<any>(null);
  const controlRef = useRef<any>(null);
  const goBackRef = useRef<any>(null);
  const progressRef = useRef<any>();
  const progressBarRef = useRef<any>(null);

  const {
    play,
    isPlaying,
    pause,
    volumeOff,
    changeVolume,
    duration,
    leftTime,
    handleFullScreen,
    isFullScreen,
  } = UseControlPlayer(videoRef, videoContainer, progressRef, progressBarRef);

  const [hours, setHours] = useState("");
  const [mins, setMins] = useState("");
  const [secs, setSecs] = useState<string | number>("");
  const [controlsAreVisible, setControlsAreVisible] = useState(false);
  const [timerControlId, setTimerControlId] = useState<NodeJS.Timeout>();
  const [mouseStopMoving, setMouseStopMoving] = useState<boolean>();

  // TODO: make api call to get info on video, if movie we hide the next btn

  const setTimeOut = () => {
    const id = setTimeout(() => {
      setControlsAreVisible(false);
    }, 2000);

    setTimerControlId(id);
  };

  const handleHoverMediaPlayer = () => {
    if (timerControlId) clearTimeout(timerControlId);
    if (mouseStopMoving) setMouseStopMoving(false);
    if (!controlsAreVisible) setControlsAreVisible(true);

    setTimeout(() => {
      setMouseStopMoving(true);
    }, 500);
  };

  useEffect(() => {
    if (mouseStopMoving) {
      // TODO: get boundingrectclient of controls and go back button + get mouse position if not on these ones, we can set timeout to disappear
    }
  }, [mouseStopMoving]);

  useEffect(() => {
    if (!controlsAreVisible) {
      gsap.to(goBackRef.current, {
        opacity: 0,
      });
      gsap.to(controlRef.current, {
        bottom: "-80px",
      });
    } else {
      gsap.to(goBackRef.current, {
        opacity: 1,
      });
      gsap.to(controlRef.current, {
        bottom: "0px",
      });
    }
  }, [controlsAreVisible]);

  // TODO: make a useEffect with timeInterval of 1sec for updating time

  return (
    <div
      onMouseMove={handleHoverMediaPlayer}
      ref={videoContainer}
      className="h-screen w-screen relative bg-black"
    >
      <span
        ref={goBackRef}
        onMouseOver={() => {
          if (timerControlId) clearTimeout(timerControlId);
        }}
      >
        <MdKeyboardBackspace
          onClick={() => {
            navigate(-1);
          }}
          color="white"
          size={size + 5}
          className="absolute z-50 left-6 top-4 cursor-pointer"
        />
      </span>
      <video ref={videoRef} className="h-screen absolute" preload="metadata">
        <source src={`${baseUrl}${id}`} type="video/webm" />
        <source src={`${baseUrl}${id}`} type="video/mp4" />
        <source src={`${baseUrl}${id}`} type='video/mp4; codecs="avc1"' />
      </video>
      <div
        ref={controlRef}
        onMouseEnter={() => {
          console.log(timerControlId);
          if (timerControlId) clearTimeout(timerControlId);
        }}
        onMouseOver={() => {
          if (timerControlId) clearTimeout(timerControlId);
        }}
        className="h-20 w-full flex flex-col gap-y-2 justify-center absolute bottom-0 px-5 bg-black"
      >
        {/* === PROGRESS BAR === */}
        <div className="flex items-center">
          <div
            ref={progressRef}
            className="progress w-full h-1.5 bg-gray-400 rounded-xl cursor-pointer"
          >
            <div
              ref={progressBarRef}
              className="progressBar w-1 h-1.5 relative rounded-lg bg-red-500 cursor-pointer"
            >
              <span className="handle block w-4 h-4 absolute -right-3 top-2/4 -translate-y-2/4 transition-opacity ease-in rounded-full opacity-0 bg-red-500 cursor-pointer" />
            </div>
          </div>
        </div>
        {/* === MAIN CONTROLS === */}
        <div className="flex items-center justify-between">
          <div className="flex gap-x-4">
            {isPlaying ? (
              <button id="play" onClick={pause}>
                <FaPause color="white" size={size} />
              </button>
            ) : (
              <button id="play" onClick={play}>
                <FaPlay color="white" size={size} />
              </button>
            )}
            <button id="rewind-10">
              <FaBackward color="white" size={size} />
            </button>
            <button id="forward-10">
              <FaForward color="white" size={size} />
            </button>
            <div className="popover-slider relative pt-0.5">
              <Popover
                zIndex={2147483648}
                overlayInnerStyle={{
                  backgroundColor: "#26292e",
                }}
                trigger="hover"
                content={
                  <Slider
                    onChange={changeVolume}
                    vertical
                    tooltipVisible={false}
                    defaultValue={100}
                    trackStyle={{
                      backgroundColor: "#e31018",
                    }}
                    handleStyle={{
                      backgroundColor: "#e31018",
                      borderColor: "#e31018",
                    }}
                  />
                }
              >
                <button id="volume" className="pt-1" onClick={volumeOff}>
                  <FaVolumeUp color="white" size={size} />
                </button>
              </Popover>
            </div>
          </div>
          {/* takes 35-40% of the place and do an excerpt if needed */}
          <div className="video-name w-2/5"></div>
          <div className="flex gap-x-4">
            <button id="next">
              <IoPlaySkipForward color="white" size={size} />
            </button>
            <button id="episodes">
              <IoIosJournal color="white" size={size} />
            </button>
            <button id="subtitles">
              <FaCommentAlt color="white" size={size} />
            </button>
            <button id="speed">
              <SiSpeedtest color="white" size={size} />
            </button>
            <button id="fullscreen" onClick={handleFullScreen}>
              {isFullScreen ? (
                <RiFullscreenExitLine color="white" size={size} />
              ) : (
                <RiFullscreenLine color="white" size={size} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
