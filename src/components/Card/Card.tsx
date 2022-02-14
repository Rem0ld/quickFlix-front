import { nanoid } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  makePercentage,
  makeRandomNumber,
} from "../../utils/numberManipulation";

const btnStyle =
  "grid place-items-center h-10 w-10 border-2 rounded-full border border-white border-gray-500 bg-gray-800";

const Card = ({
  name,
  id,
  posterPath,
  ytKey,
  genres,
  watchTime,
  length,
}: {
  name: string;
  id: string;
  posterPath: string;
  ytKey: string[] | undefined;
  genres: string[];
  watchTime: number | undefined;
  length: number | undefined;
}): React.ReactElement => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [randomNum, setRandomNum] = useState<number>(0);
  const [percentageSeen, setPercentageSeen] = useState(0);

  useEffect(() => {
    setRandomNum(makeRandomNumber(0, ytKey?.length || 0));
  }, []);

  useEffect(() => {
    if (watchTime && length) {
      setPercentageSeen(makePercentage(watchTime, length));
    }
  }, [watchTime, length]);

  return (
    <div
      className="card relative w-52 h-32"
      onMouseEnter={() => {
        setVisible(true);
      }}
      onMouseLeave={() => {
        setVisible(false);
      }}
    >
      <div className="absolute w-52 h-32 rounded-md cursor-pointer bg-gray-200">
        {posterPath ? (
          <img
            className="w-full h-full object-cover"
            src={`http://localhost:3050/images/${posterPath}`}
          />
        ) : (
          <h1 className="absolute bottom-0 pl-1 text-xl capitalize text-white">
            {name}
          </h1>
        )}
      </div>
      {/* === HOVERING CARD === */}
      {/* {`${
          visible ? "visible" : ""
        } hovering-card absolute w-52 h-32 z-50 transform-gpu rounded-sm`} */}
      <div className="visible  absolute w-52 h-32 z-50 transform-gpu rounded-sm">
        {true && (
          <div className="bg-gray-900">
            {ytKey?.length ? (
              <iframe
                width="300"
                height="250"
                src={`https://www.youtube.com/embed/${ytKey[randomNum]}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
            ) : (
              <img
                className="w-full h-full"
                src={`http://localhost:3050/images/${posterPath}`}
              />
            )}
            <div className="action-btns flex justify-between p-2">
              <h1 className="absolute bottom-0 pl-1 text-xl capitalize text-white">
                {name}
              </h1>
              <button
                className={btnStyle}
                onClick={() => {
                  navigate(`/player/${id}`);
                }}
              >
                <FaPlay size={16} color={"white"} />
              </button>
              <button className={btnStyle}>
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
            {/* <div className="categories flex gap-x-1 text-white">
              {genres.map((genre) => (
                <span key={nanoid()}>{genre}</span>
              ))}
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
