import React from "react";
import { FaPlay } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import IframeWrapper from "../IframeWrapper/IframeWrapper";
import ImageCard from "../ImageCard/ImageCard";

const btnStyle =
  "grid place-items-center h-10 w-10 border-2 rounded-full border border-white border-gray-500 bg-gray-800";

type props = {
  visible: boolean;
  posterPath: string[];
  trailerYtCode: string[];
  name: string;
};

const HoveringCard = ({ name, visible, posterPath, trailerYtCode }: props) => {
  return (
    <div
      className={`${
        visible ? "isVisible" : ""
      } hovering-card absolute  z-50 transform-gpu rounded-sm`}
    >
      {visible && (
        <div className="bg-gray-800 aspect-square drop-shadow-md rounded-sm">
          {trailerYtCode?.length ? (
            <IframeWrapper ytKeys={trailerYtCode} />
          ) : (
            <ImageCard posterPath={posterPath} name={name} />
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
    </div>
  );
};

export default HoveringCard;
