import React, {
  MutableRefObject,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
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

export default function PlayerControl({
  videoRef,
  videoContainer,
  progressRef,
  progressBarRef,
  children,
}: {
  videoRef: MutableRefObject<HTMLVideoElement>;
  videoContainer: MutableRefObject<HTMLDivElement>;
  progressRef: MutableRefObject<HTMLDivElement>;
  progressBarRef: MutableRefObject<HTMLDivElement>;
  children: ReactElement;
}) {
  const navigate = useNavigate();
  const controlRef = useRef<any>(null);
  const goBackRef = useRef<any>(null);

  const [hours, setHours] = useState("");
  const [mins, setMins] = useState("");
  const [secs, setSecs] = useState<string | number>("");

  // TODO: make a useEffect with timeInterval of 1sec for updating time

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
  } = UseControlPlayer(videoRef, videoContainer, progressRef, progressBarRef);

  const [controlsAreVisible, setControlsAreVisible] = useState(false);
  const [timerControlId, setTimerControlId] = useState<NodeJS.Timeout>();
  const [isHoverControl, setIsHoverControl] = useState(false);

  // TODO: make api call to get info on video, if movie we hide the next btn

  const setTimeOut = () => {
    if (timerControlId) clearTimeout(timerControlId);

    const id = setTimeout(() => {
      setControlsAreVisible(false);
      hideControls();
    }, 1500);

    setTimerControlId(id);
  };

  const handleHoverMediaPlayer = () => {
    showControls();
    setControlsAreVisible(true);

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
      bottom: "0px",
    });
  };

  const hideControls = () => {
    gsap.to(goBackRef.current, {
      opacity: 0,
    });
    gsap.to(controlRef.current, {
      bottom: "-80px",
    });
  };

  return (
    <div
      onMouseMove={handleHoverMediaPlayer}
      ref={videoContainer}
      className="h-screen w-screen relative bg-black"
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
            navigate(-1);
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
        // onMouseLeave={() => {
        //   setIsHoverControl(false);
        // }}
        className="h-20 w-full flex flex-col gap-y-2 justify-center absolute bottom-0 px-5 bg-black"
      >
        {/* === PROGRESS BAR === */}
        <ProgressBar
          progressBarRef={progressBarRef}
          progressRef={progressRef}
        />
        {/* === MAIN CONTROLS === */}
        <div className="flex items-center justify-between">
          <div className="flex gap-x-4">
            <BooleanBtn
              isActive={isPlaying}
              action={playPause}
              placeholders={[
                <FaPause key={0} color="white" size={size} />,
                <FaPlay key={1} color="white" size={size} />,
              ]}
            />
            <button id="rewind-10">
              <FaBackward color="white" size={size} />
            </button>
            <button id="forward-10">
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
