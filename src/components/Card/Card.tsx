import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setVideo, setWatched } from "../../features/video/videoSlice";
import { Video } from "../../types";
import ImageCard from "../ImageCard/ImageCard";
import PercentageSeen from "../PercentageSeen/PercentageSeen";
import.meta.env.REACT_APP_BACK_IP;
import.meta.env.BASE_URL;

const Card = (video: Partial<Video>): React.ReactElement => {
  const { posterPath, name, uuid } = video;
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [percentageSeen] = useState(0);

  const dispatchDetails = () => {
    dispatch(setVideo(video));
  };

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
