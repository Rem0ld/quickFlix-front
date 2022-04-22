import React, { useState } from "react";
import { BsChevronLeft } from "react-icons/bs";

export default function Sidebar() {
  const [visible, setVisible] = useState(true);

  const toggleSidebar = () => {
    setVisible(!visible);
  };
  return (
    <aside
      className={`${visible ? "left-0" : "left-[-120px]"} 
    flex flex-col fixed w-40 h-full py-2 rounded-r-sm bg-gray-700 text-white transform-gpu transition-all`}
    >
      <header className="w-full h-fit flex justify-end px-1">
        <span
          onClick={toggleSidebar}
          className={`${
            visible ? "w-full" : "rotate-180 w-8"
          } grid place-items-center h-8 p-1 border rounded-full bg-white cursor-pointer transition-[width]`}
        >
          <BsChevronLeft size={20} color="black" />
        </span>
      </header>
      <main className={`${visible ? "visible" : "hidden"} p-2`}>
        <h3 className="my-5">Management by :</h3>
        <ul>
          <li>Movies</li>
          <li>Tv-shows</li>
          <li>Subtitles</li>
        </ul>
      </main>
    </aside>
  );
}
