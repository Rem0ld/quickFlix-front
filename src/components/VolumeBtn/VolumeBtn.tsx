import { Popover, Slider } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { FaVolumeDown, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { baseSizeIcon } from "../../config";

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

  const handleChangeVolume = (event: any) => {
    if (event?.target?.value) {
      setVolume(+event.target.value);
      changeVolume(+event.target.value);
    }
  };

  useEffect(() => {
    if (volume !== curVolume) {
      setVolume(volume);
    }
  }, [volume]);

  return (
    <div className="popover-slider w-8 h-8  relative pt-0.5">
      <button
        id="volume"
        className="w-8 h-8 hover:scale-125 transition-all"
        onClick={volumeOff}
      >
        {!muted && volume > 0.6 && (
          <FaVolumeUp color="white" size={baseSizeIcon} />
        )}
        {!muted && volume > 0.3 && volume < 0.6 && (
          <FaVolumeDown color="white" size={baseSizeIcon} />
        )}
        {(volume === 0 || muted) && (
          <FaVolumeMute color="white" size={baseSizeIcon} />
        )}
      </button>
    </div>
  );
}
