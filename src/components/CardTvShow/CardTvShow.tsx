import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setTvShow } from "../../features/tvShow/tvShowSlice";
import { TvShow } from "../../types";
import ImageCard from "../ImageCard/ImageCard";

export default function CardTvShow(props: TvShow) {
  const { posterPath, name, videos } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    if (videos.length) {
      setId(videos[1][1]);
    }
  }, [videos]);

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
          className="absolute w-52 h-96 rounded-md cursor-pointer bg-gray-600"
          onClick={() => {
            dispatch(setTvShow(props));
            navigate(`/browse/tv-show?id=${props.id}`, {
              state: { backgroundLocation: location },
            });
          }}
        >
          <ImageCard posterPath={posterPath} name={name} />
        </div>
      </div>
    </>
  );
}
