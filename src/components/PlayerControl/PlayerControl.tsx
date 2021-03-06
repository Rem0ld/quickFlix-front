import React, {
  MutableRefObject,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { useLocation, useNavigate } from "react-router-dom";
import { size, baseUrl } from "../../config";
import UseControlPlayer from "../../hooks/UseControlPlayer";
import BooleanBtn from "../BooleanBtn/BooleanBtn";
import ProgressBar from "../ProgressBar/ProgressBar";
import VolumeBtn from "../VolumeBtn/VolumeBtn";
import {
  FaPause,
  FaPlay,
  FaBackward,
  FaForward,
  FaCommentAlt,
} from "react-icons/fa";
import { IoIosJournal } from "react-icons/io";
import { IoPlaySkipForward } from "react-icons/io5";
import { MdKeyboardBackspace } from "react-icons/md";
import { RiFullscreenExitLine, RiFullscreenLine } from "react-icons/ri";
import { SiSpeedtest } from "react-icons/si";
import UseFetchMovieInfo from "../../hooks/UseFetchMovieInfo";
import { useDispatch, useSelector } from "react-redux";
import { createWatched } from "../../api/watched";
import { getVideoById } from "../../api/video";
import { setVideo } from "../../features/video/videoSlice";

export default function PlayerControl({
  videoRef,
  videoContainer,
  progressRef,
  progressBarRef,
  children,
  idVideo,
}: {
  videoRef: MutableRefObject<HTMLVideoElement>;
  videoContainer: MutableRefObject<HTMLDivElement>;
  progressRef: MutableRefObject<HTMLDivElement>;
  progressBarRef: MutableRefObject<HTMLDivElement>;
  children: ReactElement;
  idVideo: string;
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  // @ts-expect-error - false error defaultRootState
  const { name, type, watched } = useSelector((state) => state.details);

  const controlRef = useRef<any>(null);
  const goBackRef = useRef<any>(null);

  // TODO: make a useEffect with timeInterval of 1sec for updating time

  useEffect(() => {
    if (!watched) {
      createWatched(idVideo);
    }

    if (!name) {
      getVideoById(idVideo).then((result) => {
        if (!result) return;
        dispatch(setVideo(result));
      });
    }
  }, []);

  const {
    playPause,
    isPlaying,
    volumeOff,
    changeVolume,
    isMuted,
    duration,
    leftTime,
    handleFullScreen,
    isFullScreen,
    handleForwardBackward,
  } = UseControlPlayer(videoRef, videoContainer, progressRef, progressBarRef);

  // TODO: get duration check if length exists, update if not
  // check if already watched, update or create
  // put in place a 5 sec interval to update watched

  const [timerControlId, setTimerControlId] = useState<number>();
  const [isHoverControl, setIsHoverControl] = useState(false);

  const setTimeOut = () => {
    if (timerControlId) clearTimeout(timerControlId);

    const idTimeOut = window.setTimeout(() => {
      hideControls();
    }, 1500);

    setTimerControlId(idTimeOut);
  };

  const handleHoverMediaPlayer = () => {
    showControls();

    if (isHoverControl) clearTimeout(timerControlId);
    if (!isHoverControl) {
      setTimeOut();
    }
  };

  const showControls = () => {
    gsap.to(goBackRef.current, {
      opacity: 1,
    });
    gsap.to(controlRef.current, {
      display: "flex",
      bottom: "0px",
    });
  };

  const hideControls = () => {
    gsap.to(goBackRef.current, {
      opacity: 0,
    });
    gsap
      .to(controlRef.current, {
        bottom: "-80px",
      })
      .then((result) => {
        gsap.to(controlRef.current, {
          display: "none",
        });
      });
  };

  return (
    <div
      onMouseMove={handleHoverMediaPlayer}
      ref={videoContainer}
      className="h-screen w-screen max-h-full relative bg-black"
    >
      <span
        ref={goBackRef}
        onMouseEnter={() => {
          setIsHoverControl(true);
        }}
        onMouseLeave={() => {
          setIsHoverControl(false);
        }}
        className="w-9 h-9 absolute z-50 left-6 top-4 cursor-pointer"
      >
        <MdKeyboardBackspace
          onClick={() => {
            if (location.state) {
              navigate(
                `/browse${type === "tv" ? "/tv-show" : ""}?id=${idVideo}`,
                {
                  state: { backgroundLocation: location },
                },
              );
            } else {
              navigate("/browse");
            }
          }}
          color="white"
          size={size + 5}
          className=""
        />
      </span>
      {/* === VIDEO HERE === */}
      {children}
      {/* === VIDEO HERE === */}
      <div
        ref={controlRef}
        onMouseEnter={() => {
          setIsHoverControl(true);
        }}
        onMouseLeave={() => {
          setIsHoverControl(false);
        }}
        className="h-20 w-full flex flex-col gap-y-2 justify-center absolute bottom-0 px-5 bg-black"
      >
        {/* === PROGRESS BAR === */}
        <ProgressBar
          progressBarRef={progressBarRef}
          progressRef={progressRef}
        />
        {/* === MAIN CONTROLS === */}
        <div className="flex items-center justify-between">
          <div className="flex gap-x-4 items-center">
            <BooleanBtn
              isActive={isPlaying}
              action={playPause}
              placeholders={[
                <FaPause key={0} color="white" size={size} />,
                <FaPlay key={1} color="white" size={size} />,
              ]}
            />
            <button
              id="rewind-10"
              className="w-8 h-8 hover:scale-125 transition-all"
              onClick={() => handleForwardBackward("rewind")}
            >
              <FaBackward color="white" size={size} />
            </button>
            <button
              id="forward-10"
              className="w-8 h-8 hover:scale-125 transition-all"
              onClick={() => handleForwardBackward("forward")}
            >
              <FaForward color="white" size={size} />
            </button>
            <VolumeBtn
              changeVolume={changeVolume}
              volumeOff={volumeOff}
              volume={videoRef?.current?.volume}
              muted={isMuted}
            />
          </div>
          {/* takes 35-40% of the place and do an excerpt if needed */}
          <div className="video-name w-2/5 text-white text-center font-semibold capitalize">
            {name}
          </div>
          <div className="flex gap-x-4">
            <button
              id="next"
              className={`${type === "tv" ? "visible" : "hidden"} w-8 h-8 `}
            >
              <IoPlaySkipForward color="white" size={size} />
            </button>
            <button
              id="episodes"
              className="w-8 h-8 hover:scale-125 transition-all"
            >
              <IoIosJournal color="white" size={size} />
            </button>
            <button
              id="subtitles"
              className="w-8 h-8 hover:scale-125 transition-all"
            >
              <FaCommentAlt color="white" size={size} />
            </button>
            <button
              id="speed"
              className="w-8 h-8 hover:scale-125 transition-all"
            >
              <SiSpeedtest color="white" size={size} />
            </button>
            <BooleanBtn
              isActive={isFullScreen}
              action={handleFullScreen}
              placeholders={[
                <RiFullscreenExitLine key={0} color="white" size={size} />,
                <RiFullscreenLine key={1} color="white" size={size} />,
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
