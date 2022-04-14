/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { MutableRefObject, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateTvShow } from "../api/tvshow";
import { updateVideo } from "../api/video";
import { updateWatched } from "../api/watched";
import { setLength, setUpdateTimeWatched } from "../features/video/videoSlice";


export default function UseControlPlayer(
  videoRef: MutableRefObject<HTMLVideoElement>,
  videoContainer: MutableRefObject<HTMLDivElement>,
  progressRef: MutableRefObject<HTMLDivElement>,
  progressBarRef: MutableRefObject<HTMLDivElement>) {

  const { id } = useParams()
  // @ts-expect-error
  const video = useSelector(state => state.details)
  // @ts-expect-error
  const { _id: idTvShow, name, averageLength } = useSelector(state => state.detailsTvShow)
  const dispatch = useDispatch()

  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [duration, setDuration] = useState(0);
  const [leftTime, setLeftTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false)
  const [idTimeOutUpdateTime, setIdTimeOutUpdateTime] = useState<any>(null)

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
    // @ts-expect-error
    videoContainer.current.setAttribute("data-fullscreen", !!state);
  };

  const handleFullScreen = () => {
    if (isFullScreen) {
      if (document.exitFullscreen) document.exitFullscreen();
      // @ts-expect-error
      else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
      // @ts-expect-error
      else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
      // @ts-expect-error
      else if (document.msExitFullscreen) document.msExitFullscreen();
      setFullscreenData(false);
      setIsFullScreen(false);
    } else {
      if (videoContainer.current.requestFullscreen) videoContainer.current.requestFullscreen();
      // @ts-expect-error
      else if (videoContainer.current.mozRequestFullScreen)
        // @ts-expect-error
        videoContainer.current.mozRequestFullScreen();
      // @ts-expect-error
      else if (videoContainer.current.webkitRequestFullScreen)
        // @ts-expect-error
        videoContainer.current.webkitRequestFullScreen();
      // @ts-expect-error
      else if (videoContainer.current.msRequestFullscreen)
        // @ts-expect-error
        videoContainer.current.msRequestFullscreen();
      setFullscreenData(true);
      setIsFullScreen(true);
    }
  };

  const handleUpdateTimeWatched = () => {
    dispatch(setUpdateTimeWatched(videoRef.current.currentTime))
    updateWatched(id as string, videoRef.current.currentTime, video.type === "tv" ? name : null)
  }

  const handleForwardBackward = (type: "rewind" | "forward") => {
    if (type === "forward") {
      videoRef.current.currentTime += 10;
    } else {
      videoRef.current.currentTime -= 10;
    }
    videoRef.current.dispatchEvent(new Event("timeupdate"));
    handleUpdateTimeWatched()
  };

  /**
  * Setting up all events to take care of the video
  */
  useEffect(() => {
    const loadedMetadata = videoRef.current.addEventListener("loadedmetadata", async () => {
      if (!video.length) {
        await updateVideo(id, { length: videoRef.current.duration })
        dispatch(setLength(videoRef.current.duration))
      }
      if (!averageLength) {
        await updateTvShow(idTvShow, { averageLength: videoRef.current.duration })
      }

      setDuration(videoRef.current.duration);
      progressRef.current.setAttribute("max", videoRef.current.duration.toString());
    });

    const timeUpdate = videoRef.current.addEventListener("timeupdate", (e) => {
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

      handleUpdateTimeWatched()
    });

    const fsChange = document.addEventListener("fullscreenchange", function () {
      setFullscreenData(!!(document.fullscreen || document.fullscreenElement));
    });
    const webkitFsChange = document.addEventListener("webkitfullscreenchange", function () {
      // @ts-expect-error
      setFullscreenData(!!document.webkitIsFullScreen);
    });
    const mozFsChange = document.addEventListener("mozfullscreenchange", function () {
      // @ts-expect-error
      setFullscreenData(!!document.mozFullScreen);
    });
    const msFsChange = document.addEventListener("msfullscreenchange", function () {
      // @ts-expect-error
      setFullscreenData(!!document.msFullscreenElement);
    });

    () => {
      // @ts-expect-error
      videoRef.current.removeEventListener("loadedmetadata", loadedMetadata);
      // @ts-expect-error
      videoRef.current.removeEventListener("timeupdate", timeUpdate);
      // @ts-expect-error
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

  useEffect(() => {
    if (video?.watched?.timeWatched > 0) {
      videoRef.current.currentTime = video.watched.timeWatched;
      progressBarRef.current.style.width =
        Math.floor((video.watched.timeWatched / videoRef.current.duration) * 100) + "%";

    }
  }, [video.watched])

  useEffect(() => {
    if (isPlaying) {
      const idTimeOut = setTimeout(() => {
        handleUpdateTimeWatched()
      }, 10000)

      setIdTimeOutUpdateTime(idTimeOut)
    } else {
      clearTimeout(idTimeOutUpdateTime)
      setIdTimeOutUpdateTime(null)
    }

    return () => {
      clearTimeout(idTimeOutUpdateTime)
    }
  }, [isPlaying])

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