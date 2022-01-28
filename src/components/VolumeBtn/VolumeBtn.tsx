import React, { useEffect, useRef, useState } from "react";
import { FaVolumeDown, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { size } from "../../config";

export default function VolumeBtn({
  changeVolume,
  volumeOff,
  volume,
  muted,
}: {
  changeVolume: (value: number) => void;
  volumeOff: () => void;
  volume: number;
  muted: boolean;
}) {
  const [curVolume, setVolume] = useState(1);

  const handleChangeVolume = (event) => {
    setVolume(+event.target.value);
    changeVolume(+event.target.value);
  };

  useEffect(() => {
    if (volume !== curVolume) {
      setVolume(volume);
    }
  }, [volume]);

  return (
    <div className="popover-slider relative pt-0.5">
      <div className="absolute top-0 -right-1 -translate-y-full h-32 w-10 rounded-md bg-gray-800">
        <input
          className="slider absolute top-12 left-1 -rotate-90 translate-y-full -translate-x-1/3 h-10 w-24"
          type="range"
          min={0}
          max={1}
          step={0.1}
          value={curVolume}
          onChange={handleChangeVolume}
        />
        <div className="filling" />
      </div>
      <button id="volume" className="pt-1" onClick={volumeOff}>
        {!muted && volume > 0.6 && <FaVolumeUp color="white" size={size} />}
        {!muted && volume > 0.3 && volume < 0.6 && (
          <FaVolumeDown color="white" size={size} />
        )}
        {(volume === 0 || muted) && <FaVolumeMute color="white" size={size} />}
      </button>
    </div>
  );
}
