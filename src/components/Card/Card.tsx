import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setVideo } from "../../features/video/videoSlice";
import { Video } from "../../types";
import { makePercentage } from "../../utils/numberManipulation";
import ImageCard from "../ImageCard/ImageCard";
import PercentageSeen from "../PercentageSeen/PercentageSeen";
import.meta.env.REACT_APP_BACK_IP;
import.meta.env.BASE_URL;

const Card = (video: Partial<Video>): React.ReactElement => {
  const { posterPath, name, length, watched, uuid } = video;
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [percentageSeen, setPercentageSeen] = useState(0);

  const dispatchDetails = () => {
    dispatch(setVideo(video));
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const time = watched?.timeWatched || 0;
    const leng = length || 0;
    if (time > 0 && leng > 0) {
      const percentage = makePercentage(time, leng);
      setPercentageSeen(percentage);
    }
  }, [watched, length]);

  return (
    <>
      <div
        className="card relative w-52 h-96"
        // onMouseEnter={() => {
        //   setVisible(true);
        // }}
        // onMouseLeave={() => {
        //   setVisible(false);
        // }}
      >
        <div
          className="absolute w-52 h-96 cursor-pointer bg-gray-600"
          onClick={() => {
            dispatchDetails();
            navigate(`/browse?id=${uuid}`, {
              state: { backgroundLocation: location },
            });
          }}
        >
          <ImageCard posterPath={posterPath} name={name} />
        </div>
        <PercentageSeen percentageSeen={percentageSeen} />
      </div>
    </>
  );
};

export default Card;
