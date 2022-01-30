import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Card = ({
  name,
  id,
}: {
  name: string;
  id: string;
}): React.ReactElement => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

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
        <img className="w-full h-full" src="#" />
        <h1 className="absolute bottom-0 pl-1 text-xl capitalize">{name}</h1>
      </div>
      {/* === HOVERING CARD === */}
      <div
        className={`${
          visible ? "visible" : ""
        } hovering-card absolute w-52 h-32 z-50 transform-gpu rounded-sm`}
      >
        <video className="w-full rounded-sm"></video>
        {visible && (
          <div>
            <div className="action-btns flex justify-between px-2">
              <button
                className="grid place-items-center h-10 w-10 rounded-full border border-white"
                onClick={() => {
                  navigate(`/player/${id}`);
                }}
              >
                <FaPlay size={20} />
              </button>
              <button className="grid place-items-center h-10 w-10 rounded-full border border-white">
                <MdKeyboardArrowDown size={20} />
              </button>
            </div>
            <div className="categories flex gap-x-1 text-white">categories</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
