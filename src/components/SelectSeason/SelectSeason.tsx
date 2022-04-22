import { nanoid } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Episode } from "../../types";

type PropTypes = {
  selected: number;
  list: [string, Episode[]][];
  setSelected: (arg: number) => void;
};

export default function SelectSeason({
  selected,
  list,
  setSelected,
}: PropTypes) {
  const [isOpen, setIsOpen] = useState(false);

  if (!list) return null;
  return (
    <div className="relative">
      <button
        className="flex gap-3 items-center px-2 py-3 rounded-md border bg-gray-800"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        Season {list[selected - 1][0]} ({list[selected - 1][1].length} episodes)
        <MdKeyboardArrowDown />
      </button>
      <ul
        className={`${
          isOpen ? "block opacity-100" : "none opacity-0"
        } absolute top-full w-full flex flex-col justify-center delay-75 transition-opacity items-center mt-1 z-50 rounded-sm bg-gray-800`}
      >
        {list.map((el: [string, Episode[]]) => (
          <li
            key={nanoid()}
            onClick={(e) => {
              e.stopPropagation();
              setSelected(+el[0]);
              setIsOpen(false);
            }}
            className={`${
              +el[0] === selected ? "bg-gray-500" : ""
            } grid place-items-center w-full p-2 cursor-pointer hover:bg-gray-500`}
          >
            Season {el[0]} ({el[1].length} episodes)
          </li>
        ))}
      </ul>
    </div>
  );
}
