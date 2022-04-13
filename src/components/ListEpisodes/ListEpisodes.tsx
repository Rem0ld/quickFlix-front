import { nanoid } from "@reduxjs/toolkit";
import React, { RefObject, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setVideo } from "../../features/video/videoSlice";
import { Episode, Season, TvShow } from "../../types";
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
    [seasons]
  );

  useEffect(() => {
    setParsedSeasons(reduceSeasons);
  }, [seasons, reduceSeasons]);

  useEffect(() => {
    if (parsedSeasons) {
      setSelectedSeason(
        parsedSeasons[selected].slice().sort((a, b) => +a.number - +b.number)
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
      <ListEpisodes season={selectedSeason ? selectedSeason : []} />
    </div>
  );
}

function ListEpisodes({ season }: { season: Episode[] }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!season) return null;
  return (
    <ul>
      {season.map((episode, i: number) => {
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
              "flex items-center gap-5 h-32 w-full px-10 cursor-pointer rounded-md border-b border-gray-600"
            }
          >
            <h5 className="font-semibold text-2xl">{episode.number}</h5>
            <div>
              <img src="#" />
            </div>
            <p>{episode?.ref?.resume}</p>
          </li>
        );
      })}
    </ul>
  );
}
