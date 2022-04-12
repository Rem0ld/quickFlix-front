import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { TvShow, Video } from "../../types";

export default function CardTvShow({
  _id,
  trailerYtCode,
  posterPath,
  name,
  date,
  resume,
  genres,
  score,
  watched,
  seasons,
}: Partial<TvShow>) {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    if (seasons?.length) {
      const { _id } = seasons[0].episodes[0].ref;

      if (_id) setId(_id);
    }
  }, [seasons]);

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
        <div className="absolute w-52 h-96 rounded-md cursor-pointer bg-gray-200">
          <img
            className="w-full h-full aspect-square rounded-sm"
            src={`http://localhost:3050/images/${posterPath}`}
          />
          <h1 className="absolute bottom-0 pl-1 text-xl capitalize text-white">
            {name}
          </h1>
        </div>
        {/* === HOVERING CARD === */}
        {/* <div
          className={`${
            visible ? "isVisible" : ""
          } hovering-card absolute w-52 h-32 z-50 transform-gpu rounded-sm`}
        >
          {visible && (
            <div>
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${
                  trailerYtCode && trailerYtCode[0]
                }`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <div className="action-btns flex justify-between px-2">
                <button
                  className="grid place-items-center h-10 w-10 rounded-full border border-white"
                  onClick={() => {
                    if (id.length) {
                      navigate(`/player/${id}`);
                    }
                  }}
                >
                  <FaPlay size={20} />
                </button>
                <button
                  className="grid place-items-center h-10 w-10 rounded-full border border-white"
                  onClick={() => {
                    setModalVisible(true);
                  }}
                >
                  <MdKeyboardArrowDown size={20} />
                </button>
              </div>
              <div className="categories flex gap-x-1 text-white">
                {categories.map((category) => {
                  <span>{category}</span>;
                })}
              </div> 
            </div>
          )}
        </div> */}
      </div>
    </>
  );
}
