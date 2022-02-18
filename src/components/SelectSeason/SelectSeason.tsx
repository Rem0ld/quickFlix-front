import { nanoid } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Episode } from "../../types";
import { ParsedSeason } from "../ListEpisodes/ListEpisodes";

export default function SelectSeason({
  selected,
  list,
  setSelected,
}: {
  selected: number;
  list: [[key: string | number], Episode[]];
  setSelected: (arg: number) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  if (!list) return null;
  return (
    <div className="relative">
      <button
        className="flex gap-3 items-center px-2 py-3 rounded-md border- bg-gray-800"
        onClick={() => setIsOpen(!isOpen)}
      >
        Season {list[selected - 1][0]} ({list[selected - 1][1].length} episodes)
        <MdKeyboardArrowDown />
      </button>
      <ul
        className={`${
          isOpen ? "visible" : "hidden"
        } absolute top-full w-full flex flex-col  justify-center items-center mt-1 bg-gray-800`}
      >
        {list.map((el: any) => (
          <li
            key={nanoid()}
            onClick={() => setSelected(+el[0])}
            className="grid place-items-center w-full p-2 cursor-pointer hover:bg-gray-500"
          >
            Season {el[0]} ({el[1].length} episodes)
          </li>
        ))}
      </ul>
    </div>
  );
}
