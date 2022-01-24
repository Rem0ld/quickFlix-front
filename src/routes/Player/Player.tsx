/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaPlay, FaForward, FaBackward, FaVolumeUp, FaCommentAlt, FaPause } from "react-icons/fa";
import { IoPlaySkipForward } from "react-icons/io5";
import { IoIosJournal } from "react-icons/io";
import { SiSpeedtest } from "react-icons/si";
import { RiFullscreenLine } from "react-icons/ri";
import { MdKeyboardBackspace } from "react-icons/md";
import { Popover, Slider } from "antd";
import "antd/dist/antd.css";

const baseUrl = `http://${import.meta.env.DEV ? "localhost" : "192.168.0.11"}:3050/api/`;
const size = 35;

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef<any>(null);
  const progressRef = useRef<any>();
  const progressBarRef = useRef<any>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [leftTime, setLeftTime] = useState(0);
  const [hours, setHours] = useState("");
  const [mins, setMins] = useState("");
  const [secs, setSecs] = useState("");

  const play = () => {
    videoRef.current.play();
    setIsPlaying(true);
  };

  const pause = () => {
    videoRef.current.pause();
    setIsPlaying(false);
  };

  const volumeOff = () => {
    videoRef.current.muted = !videoRef.current.muted;
  };

  const changeVolume = (value: number) => {
    videoRef.current.volume = value / 100;
  };

  const isFullScreen = function () {
    return !!(
      document.fullscreen ||
      document.webkitIsFullScreen ||
      document.mozFullScreen ||
      document.msFullscreenElement ||
      document.fullscreenElement
    );
  };

  const setFullscreenData = function (state: any) {
    videoRef.current.setAttribute("data-fullscreen", !!state);
  };

  const handleFullScreen = () => {
    if (isFullScreen()) {
      if (document.exitFullscreen) document.exitFullscreen();
      else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
      else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
      else if (document.msExitFullscreen) document.msExitFullscreen();
      setFullscreenData(false);
    } else {
      if (videoRef.current.requestFullscreen) videoRef.current.requestFullscreen();
      else if (videoRef.current.mozRequestFullScreen) videoRef.current.mozRequestFullScreen();
      else if (videoRef.current.webkitRequestFullScreen) videoRef.current.webkitRequestFullScreen();
      else if (videoRef.current.msRequestFullscreen) videoRef.current.msRequestFullscreen();
      setFullscreenData(true);
    }
  };

  useEffect(() => {
    const loadedMetadata = videoRef.current.addEventListener("loadedmetadata", () => {
      console.log(videoRef.current.duration);
      setDuration(videoRef.current.duration);
      progressRef.current.setAttribute("max", videoRef.current.duration);
    });

    const timeUpdate = videoRef.current.addEventListener("timeupdate", () => {
      if (!progressRef.current.getAttribute("max"))
        progressRef.current.setAttribute("max", videoRef.current.duration);

      progressRef.current.value = videoRef.current.currentTime;
      progressBarRef.current.style.with =
        Math.floor((videoRef.current.currentTime / videoRef.current.duration) * 100) + "%";

      setLeftTime(+duration - videoRef.current.currentTime);
    });

    // @ts-ignore
    const progress = progressRef.current.addEventListener("click", (e) => {
      const rect = progressRef.current.getBoundingClientRect();
      const pos = (e.pageX - rect.left) / progressRef.current.offsetWidth;
      videoRef.current.currentTime = pos * videoRef.current.duration;
    });

    // document.addEventListener("fullscreenchange", function () {
    //   setFullscreenData(!!(document.fullscreen || document.fullscreenElement));
    // });
    // document.addEventListener("webkitfullscreenchange", function () {
    //   setFullscreenData(!!document.webkitIsFullScreen);
    // });
    // document.addEventListener("mozfullscreenchange", function () {
    //   setFullscreenData(!!document.mozFullScreen);
    // });
    // document.addEventListener("msfullscreenchange", function () {
    //   setFullscreenData(!!document.msFullscreenElement);
    // });

    () => {
      videoRef.current.removeEventListener("loadedmetadata", loadedMetadata);
      videoRef.current.removeEventListener("timeupdate", timeUpdate);
      progressRef.current.removeEventListener("click", progress);
    };
  });

  return (
    <div className="h-screen w-screen relative bg-black">
      <MdKeyboardBackspace
        onClick={() => {
          navigate(-1);
        }}
        color="white"
        size={size}
        className="absolute z-50 left-6 top-4 cursor-pointer"
      />
      <div className="relative">
        <video ref={videoRef} className="h-screen absolute" preload="metadata">
          <source src={`${baseUrl}${id}`} type="video/webm" />
          <source src={`${baseUrl}${id}`} type="video/mp4" />
          <source src={`${baseUrl}${id}`} type='video/mp4; codecs="avc1"' />
        </video>
      </div>
      <div
        id="controls"
        className="h-20 w-full flex flex-col justify-center absolute bottom-0 px-5 bg-black"
      >
        <div className="flex gap-x-2 items-center">
          <progress
            ref={progressRef}
            value="0"
            className="w-full h-1 rounded-full mb-1 text-red-500 cursor-pointer"
          >
            <span id="progressBar" ref={progressBarRef} className="progressBar bg-red-500" />
          </progress>
        </div>
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
              <RiFullscreenLine color="white" size={size} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
