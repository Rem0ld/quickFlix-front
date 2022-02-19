import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setVideo, VideoState } from "../../features/video/videoSlice";
import { makePercentage } from "../../utils/numberManipulation";

export default function CardWrapper({
  data,
  children,
}: {
  children: ReactElement;
  data: Omit<VideoState, "percentageSeen">;
}) {
  const dispatch = useDispatch();

  const [percentageSeen, setPercentageSeen] = useState(0);

  useEffect(() => {
    if (data.watchTime > 0 && data.length > 0) {
      setPercentageSeen(makePercentage(data.watchTime, length));
    }
    dispatch(setVideo(Object.assign({ percentageSeen }, data)));
  }, [data.watchTime, data.length]);

  return <>{children}</>;
}
