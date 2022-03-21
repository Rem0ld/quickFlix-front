import React, { createElement, useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { setVideo } from "../../features/video/videoSlice";
import { Video } from "../../types";
import {
  makePercentage,
  makeRandomNumber,
} from "../../utils/numberManipulation";

const btnStyle =
  "grid place-items-center h-10 w-10 border-2 rounded-full border border-white border-gray-500 bg-gray-800";

const Card = ({
  trailerYtCode: ytKeys,
  posterPath,
  name,
  _id: id,
  year,
  resume,
  genres,
  score,
  length,
}: Partial<Video>): React.ReactElement => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [randomNum, setRandomNum] = useState<number>(0);
  const [percentageSeen, setPercentageSeen] = useState(0);

  const dispatchDetails = () => {
    const data = {
      ytKeys,
      posterPath,
      name,
      id,
      year,
      resume,
      genres,
      score,
      length,
      percentageSeen,
      watchTime: 0,
      seasons: [],
      subtitles: [],
    };
    dispatch(setVideo(data));
  };

  // useEffect(() => {
  //   if (watchTime > 0 && length > 0) {
  //     setPercentageSeen(makePercentage(watchTime, length));
  //   }

  //   dispatch(setVideo(Object.assign({ percentageSeen })));
  // }, [watchTime, length]);

  useEffect(() => {
    setRandomNum(makeRandomNumber(0, ytKeys?.length || 0));
  }, []);

  return (
    <>
      <div
        className="card relative w-52 h-96"
        onMouseEnter={() => {
          setVisible(true);
        }}
        onMouseLeave={() => {
          setVisible(false);
        }}
      >
        <div
          className="absolute w-52 h-96 cursor-pointer bg-gray-200"
          onClick={() => {
            dispatchDetails();
            navigate(`/browse?id=${id}`, {
              state: { backgroundLocation: location },
            });
          }}
        >
          {posterPath?.length ? (
            <img
              className="w-full h-full aspect-square rounded-sm"
              src={`http://localhost:3050/images/${posterPath[0]}`}
            />
          ) : (
            <h1 className="absolute bottom-0 pl-1 text-xl capitalize text-white">
              {name}
            </h1>
          )}
        </div>
        {/* === HOVERING CARD === */}
        {/* <div
          className={`${
            visible ? "isVisible" : ""
          } hovering-card absolute  z-50 transform-gpu rounded-sm`}
        >
          {visible && (
            <div className="bg-gray-800 aspect-square drop-shadow-md rounded-sm">
              {ytKeys?.length ? (
                <iframe
                  width="500"
                  height="400"
                  className="rounded-t-sm"
                  src={`https://www.youtube.com/embed/${ytKeys[randomNum]}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
              ) : posterPath?.length ? (
                <img
                  className="w-full h-full rounded-sm"
                  src={`http://localhost:3050/images/${posterPath[0]}`}
                />
              ) : (
                <div />
              )}
              <div className="action-btns flex justify-between p-2 pb-5 rounded-b-sm">
                <button
                  className={btnStyle}
                  onClick={() => {
                    navigate(`/player/${id}`);
                  }}
                >
                  <FaPlay size={16} color={"white"} />
                </button>
                <button
                  className={btnStyle}
                  onClick={() => {
                    dispatchDetails();
                    navigate(`/browse?id=${id}`, {
                      state: { backgroundLocation: location },
                    });
                  }}
                >
                  <MdKeyboardArrowDown size={20} color={"white"} />
                </button>
              </div>
              {percentageSeen > 0 && (
                <div className="flex items-center justify-center p-1">
                  <div className="progress w-11/12 h-1 bg-gray-400 cursor-pointer">
                    <div
                      style={{
                        width: `${percentageSeen}%`,
                      }}
                      className="progressBar h-1 relative bg-red-500 cursor-pointer"
                    ></div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div> */}
      </div>
    </>
  );
};

export default Card;
