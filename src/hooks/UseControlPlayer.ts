/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { MutableRefObject, useEffect, useState } from "react";


export default function UseControlPlayer(
  videoRef: MutableRefObject<HTMLVideoElement>,
  videoContainer: MutableRefObject<HTMLDivElement>,
  progressRef: MutableRefObject<HTMLDivElement>,
  progressBarRef: MutableRefObject<HTMLDivElement>) {

  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [duration, setDuration] = useState(0);
  const [leftTime, setLeftTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false)

  const playPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const volumeOff = () => {
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(!videoRef.current.muted)
  };

  const changeVolume = (value: number) => {
    videoRef.current.volume = value / 100;
  };

  const setFullscreenData = function (state: any) {
    videoContainer.current.setAttribute("data-fullscreen", !!state);
  };

  const handleFullScreen = () => {
    if (isFullScreen) {
      if (document.exitFullscreen) document.exitFullscreen();
      else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
      else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
      else if (document.msExitFullscreen) document.msExitFullscreen();
      setFullscreenData(false);
      setIsFullScreen(false);
    } else {
      if (videoContainer.current.requestFullscreen) videoContainer.current.requestFullscreen();
      else if (videoContainer.current.mozRequestFullScreen)
        videoContainer.current.mozRequestFullScreen();
      else if (videoContainer.current.webkitRequestFullScreen)
        videoContainer.current.webkitRequestFullScreen();
      else if (videoContainer.current.msRequestFullscreen)
        videoContainer.current.msRequestFullscreen();
      setFullscreenData(true);
      setIsFullScreen(true);
    }
  };


  const handleForwardBackward = (type: "rewind" | "forward") => {
    if (type === "forward") {
      videoRef.current.currentTime += 10;
    } else {
      videoRef.current.currentTime -= 10;
    }
    videoRef.current.dispatchEvent(new Event("timeupdate"));
  };

  /**
  * Setting up all events to take care of the video
  */
  useEffect(() => {
    const loadedMetadata = videoRef.current.addEventListener("loadedmetadata", () => {
      setDuration(videoRef.current.duration);
      progressRef.current.setAttribute("max", videoRef.current.duration.toString());
    });

    const timeUpdate = videoRef.current.addEventListener("timeupdate", (e) => {
      console.log(e)
      console.log(videoRef.current.currentTime)
      if (!progressRef.current.getAttribute("max"))
        progressRef.current.setAttribute("max", videoRef.current.duration.toString());

      // TODO: onclick UP we fire the event, when we look for another frame in the progress bar we update the UI to have this feeling of going smoothly
      // but we only fire event on mouse up
      progressBarRef.current.style.width =
        Math.floor((videoRef.current.currentTime / videoRef.current.duration) * 100) + "%";


    });


    const progress = progressRef.current.addEventListener("click", (e) => {
      const rect = progressRef.current.getBoundingClientRect();
      const pos = (e.pageX - rect.left) / progressRef.current.offsetWidth;
      videoRef.current.currentTime = pos * videoRef.current.duration;
    });

    const fsChange = document.addEventListener("fullscreenchange", function () {
      setFullscreenData(!!(document.fullscreen || document.fullscreenElement));
    });
    const webkitFsChange = document.addEventListener("webkitfullscreenchange", function () {
      setFullscreenData(!!document.webkitIsFullScreen);
    });
    const mozFsChange = document.addEventListener("mozfullscreenchange", function () {
      setFullscreenData(!!document.mozFullScreen);
    });
    const msFsChange = document.addEventListener("msfullscreenchange", function () {
      setFullscreenData(!!document.msFullscreenElement);
    });

    () => {
      videoRef.current.removeEventListener("loadedmetadata", loadedMetadata);
      videoRef.current.removeEventListener("timeupdate", timeUpdate);
      progressRef.current.removeEventListener("click", progress);
      // @ts-expect-error
      document.removeEventListener("fullscreenchange", fsChange);
      // @ts-expect-error
      document.removeEventListener("webkitfullscreenchange", webkitFsChange);
      // @ts-expect-error
      document.removeEventListener("mozfullscreenchange", mozFsChange);
      // @ts-expect-error
      document.removeEventListener("msfullscreenchange", msFsChange);
    };
  }, []);

  return {
    playPause,
    isPlaying,
    volumeOff,
    changeVolume,
    isMuted,
    duration,
    leftTime,
    handleFullScreen,
    isFullScreen,
    handleForwardBackward
  }
}