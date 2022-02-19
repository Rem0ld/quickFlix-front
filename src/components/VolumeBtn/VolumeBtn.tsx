import { Popover, Slider } from "antd";
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
      <button
        id="volume"
        className="pt-1 hover:scale-125 transition-all"
        onClick={volumeOff}
      >
        {!muted && volume > 0.6 && <FaVolumeUp color="white" size={size} />}
        {!muted && volume > 0.3 && volume < 0.6 && (
          <FaVolumeDown color="white" size={size} />
        )}
        {(volume === 0 || muted) && <FaVolumeMute color="white" size={size} />}
      </button>
    </div>
  );
}
