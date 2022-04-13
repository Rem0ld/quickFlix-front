import { nanoid } from "@reduxjs/toolkit";
import React, { Suspense, useEffect, useRef } from "react";
import { FaPlay } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IframeWrapper from "../IframeWrapper/IframeWrapper";
import WrapperEpisodes from "../ListEpisodes/ListEpisodes";
import Score from "../Score/Score";

export default function DetailsTvShow() {
  const navigate = useNavigate();
  // @ts-expect-error - false error with defaultRootState
  const detailsTvShow = useSelector((state) => state.detailsTvShow);
  const {
    _id,
    idMovieDb,
    name,
    location,
    firstAirDate,
    posterPath,
    originCountry,
    ongoing,
    date,
    trailerYtCode,
    genres,
    resume,
    score,
    seasons,
  } = detailsTvShow;

  const play = (id: any) => {
    navigate(`/player/${id}`, { state: id });
    return;
  };

  useEffect(() => {
    if (!detailsTvShow._id && !detailsTvShow.name) {
      navigate("/browse");
    }
  }, [detailsTvShow]);

  return (
    <div>
      <div className="relative">
        <button
          className="absolute right-4 top-2 p-2 bg-white rounded-full"
          onClick={() => navigate("/browse")}
        >
          <GrClose color="#fff" size={22} />
        </button>
        <Suspense fallback="Loading...">
          <IframeWrapper ytKey={trailerYtCode.length ? trailerYtCode[0] : ""} />
        </Suspense>
        {/* <div className="absolute bottom-16 w-2/5 flex items-center rounded-sm bg-white pr-3">
        {percentage ? (
          <>
            <div className="w-9/12">
              <div className="flex items-center justify-center p-1">
                <div className="progress w-11/12 h-px bg-gray-500 cursor-pointer">
                  <div
                    style={{
                      width: `${percentage}%`,
                    }}
                    className="progressBar h-px relative bg-red-500 cursor-pointer"
                  ></div>
                </div>
              </div>
            </div>
            <span className="text-gray-700 text-xs whitespace-nowrap">
              {parsedWatchTime?.mins} on {parsedWatchTime?.total} mins
            </span>
          </>
        ) : (
          ""
        )}
      </div> */}
        <button
          className="absolute bottom-1 left-2/4 transform-gpu -translate-x-2/4 flex gap-x-2 items-center py-3 px-6 bg-white rounded-lg shadow-lg font-semibold tracking-wide"
          onClick={() => play(_id)}
        >
          <FaPlay size={16} color={"black"} />
          Play
        </button>
      </div>
      <div className=" px-6 pt-3">
        <div className="flex">
          <div className="flex flex-col gap-4 w-9/12 text-gray-300 font-light">
            <div className="flex gap-x-2 items-baseline">
              <h6 className="capitalize">{name}</h6>
              {/* {year ? <span>{new Date(year).getFullYear()}</span> : ""}
            {parsedMovieLength?.h ? (
              <span>
                {parsedMovieLength?.h} h {parsedMovieLength?.min} min
              </span>
            ) : (
              ""
            )} */}
              {score ? <Score score={score} /> : ""}
            </div>
            <p className="text-sm">{resume}</p>
          </div>
          <div className="categories flex gap-x-1 text-gray-300 font-light text-sm">
            <span className="text-gray-500">Genres:</span>{" "}
            <span>
              {genres.length
                ? genres.map((genre: string, i: number, arr: []) => {
                    if (i === arr.length - 1)
                      return <span key={nanoid()}>{genre}</span>;
                    return <span key={nanoid()}>{genre}, </span>;
                  })
                : ""}
            </span>
          </div>
        </div>
        <div className="pt-12 text-gray-300">
          {seasons?.length ? <WrapperEpisodes seasons={seasons} /> : ""}
          {trailerYtCode?.length > 1 ? (
            <>
              <h3 className="text-2xl font-semibold py-5">Trailers</h3>
              <div className="flex gap-5 flex-wrap">
                {trailerYtCode.map((ytKey: string, i: number) => {
                  if (i === 0) return "";
                  return (
                    <iframe
                      key={nanoid()}
                      width="200"
                      height="156"
                      src={`https://www.youtube.com/embed/${ytKey}`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    ></iframe>
                  );
                })}
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
