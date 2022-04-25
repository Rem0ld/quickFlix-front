import { nanoid } from "@reduxjs/toolkit";
import React, { RefObject, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setVideo } from "../../features/video/videoSlice";
import { Episode, Season, TvShow } from "../../types";
import { makePercentage } from "../../utils/numberManipulation";
import SelectSeason from "../SelectSeason/SelectSeason";

export type ParsedSeason = { [key: number | string]: Episode[] };

export default function WrapperEpisodes({ seasons }: { seasons: Season[] }) {
  const [parsedSeasons, setParsedSeasons] = useState<ParsedSeason | null>(null);
  const [selected, setSelected] = useState(1);
  const [selectedSeason, setSelectedSeason] = useState<Episode[]>();

  const reduceSeasons = useMemo(
    () =>
      seasons.reduce((acc: ParsedSeason, el: Season) => {
        if (!acc[el.number]) {
          acc[el.number] = el.episodes;
        }
        return acc;
      }, {}),
    [seasons],
  );

  useEffect(() => {
    setParsedSeasons(reduceSeasons);
  }, [seasons, reduceSeasons]);

  useEffect(() => {
    if (parsedSeasons) {
      setSelectedSeason(
        parsedSeasons[selected].slice().sort((a, b) => +a.number - +b.number),
      );
    }
  }, [parsedSeasons, selected]);

  return (
    <div>
      <div className="flex items-end justify-between pb-5">
        <h3 className="text-2xl font-semibold ">Episodes</h3>
        {parsedSeasons && (
          <SelectSeason
            selected={selected}
            list={Object.entries(parsedSeasons)}
            setSelected={setSelected}
          />
        )}
      </div>
      <ListEpisodes season={selectedSeason || []} />
    </div>
  );
}

function ListEpisodes({ season }: { season: Episode[] }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { averageLength, watched } = useSelector(
    // @ts-expect-error - false error with defaultRootState
    (state) => state.detailsTvShow,
  );

  if (!season) return null;
  return (
    <ul className="flex flex-wrap justify-between gap-5">
      {season.map((episode, i: number) => {
        const filtered = watched?.filter((el: any) => {
          return el.videoId === episode.ref._id;
        });
        let percentage = 0;

        if (filtered?.length && (episode.ref.length || averageLength)) {
          percentage = makePercentage(
            filtered[0].watchedId.timeWatched,
            episode.ref.length || averageLength,
          );
        }

        return (
          <li
            key={nanoid()}
            onClick={() => {
              dispatch(setVideo(episode.ref));
              navigate(`/player/${episode.ref._id}`, {
                state: episode.ref._id,
              });
            }}
            className={
              `${i === 0 ? "border-t " : ""}` +
              "relative flex flex-col justify-evenly items-center h-32 w-52 px-1 cursor-pointer rounded-md border border-gray-600"
            }
          >
            <h5 className="font-semibold text-2xl">{episode.number}</h5>
            {/* <div><img src="#" /></div> */}
            {/* {episode?.ref?.resume && <p>{episode.ref.resume}</p>} */}
            {percentage ? (
              <div className="progress w-full self-end bg-gray-300">
                <div
                  className={`filling h-1 bg-red-600`}
                  style={{
                    width: percentage + "%",
                  }}
                />
              </div>
            ) : (
              ""
            )}
          </li>
        );
      })}
    </ul>
  );
}
