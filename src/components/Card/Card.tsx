import { nanoid } from "@reduxjs/toolkit";
import React, { useContext, useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { makeRandomNumber } from "../../utils/numberManipulation";
import { VideoContext } from "../CardWrapper/CardWrapper";
import Details from "../Details/Details";
import { Modal } from "../Modal/Modal";

const btnStyle =
  "grid place-items-center h-10 w-10 border-2 rounded-full border border-white border-gray-500 bg-gray-800";

const Card = (): React.ReactElement => {
  const navigate = useNavigate();
  const { id, name, posterPath, ytKeys, percentageSeen }: any =
    useContext(VideoContext);
  const location = useLocation();

  const [visible, setVisible] = useState(false);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [randomNum, setRandomNum] = useState<number>(0);

  useEffect(() => {
    setRandomNum(makeRandomNumber(0, ytKeys?.length || 0));
  }, []);

  useEffect(() => {
    if (location.state) {
      setModalIsVisible(true);
    }
  }, [location.state]);

  return (
    <>
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
              className="w-full h-full aspect-square"
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
          visible ? "isVisible" : ""
        } hovering-card absolute w-52 h-32 z-50 transform-gpu rounded-sm`} */}
        <div className="isVisible  absolute w-52 h-32 z-50 transform-gpu rounded-sm">
          {true && (
            <div className="bg-gray-900">
              {ytKeys?.length ? (
                <iframe
                  width="300"
                  height="250"
                  src={`https://www.youtube.com/embed/${ytKeys[randomNum]}`}
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
                <button
                  className={btnStyle}
                  onClick={() => {
                    setModalIsVisible(true);
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
        </div>
      </div>
      <Modal
        visible={modalIsVisible}
        hide={() => setModalIsVisible(false)}
        width={"60%"}
      >
        <Details
          randomNum={randomNum}
          hide={() => setModalIsVisible(false)}
          play={(id) => navigate(`/player/${id}`, { state: id })}
        />
      </Modal>
    </>
  );
};

export default Card;
