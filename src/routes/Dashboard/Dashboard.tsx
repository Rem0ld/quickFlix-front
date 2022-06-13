import React, { useEffect, useMemo, useState } from "react";
import { useTable } from "react-table";
import { Video } from "../../types";
import TableCard from "./Components/TableCard/TableCard";
import BtnWithConfirmation from "../../components/BtnWithConfirmation/BtnWithConfirmation";
import { BsSearch } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import UseFetchVideos from "../../hooks/UseFetchVideos";
import Table from "./Components/Table/Table";

export default function Dashboard() {
  const [onlyMovie, setOnlyMovie] = useState(true);
  const { videos, refetch, total, skip, limit, fetchMore } = UseFetchVideos({
    onlyMovie,
  });
  const [filteredData, setFilteredData] = useState<Video[]>([]);
  const [selected, setSelected] = useState<Video | null>(null);
  const [textFilter, setTextFilter] = useState("");

  const closeDrawer = () => {
    setSelected(null);
    return;
  };

  useEffect(() => {
    setFilteredData(videos);
  }, [videos]);

  useEffect(() => {
    console.log("in dashboard", total, skip, limit);
  }, [total, skip, limit]);
  useEffect(() => {
    const filtered = videos.filter((el: Video) => el.name.includes(textFilter));
    setFilteredData(filtered);
  }, [textFilter]);

  return (
    <main className="h-[calc(100vh-theme(height.14))] flex flex-col gap-2 p-5 bg-gray-800">
      {/* <Sidebar /> */}
      <div className="filters w-full flex gap-2">
        {/* Search input */}
        <form className="flex items-center bg-gray-50 w-min focus:border focus:outline-black rounded-sm">
          <label className="pl-2" htmlFor="filter-text">
            <BsSearch color="#000" />
          </label>
          <input
            name="filter-text"
            onChange={(e) => setTextFilter(e.target.value)}
            className="py-2 px-2 rounded-sm focus:outline-none"
            type={"text"}
            placeholder="find videos"
            value={textFilter}
          />
          <button
            type="button"
            onClick={() => setTextFilter("")}
            className={`${
              textFilter.length ? "visible animate-fade-in" : "invisible"
            } w-6  cursor-pointer`}
          >
            <IoClose color="#000" size={22} />
          </button>
        </form>
        <form className="flex items-center gap-2">
          <label htmlFor="filter-movie">Only movie</label>
          <input
            onChange={() => {
              setOnlyMovie(!onlyMovie);
            }}
            className="w-4 h-4"
            type="checkbox"
            name="filter-movie"
            value="movie"
            checked={onlyMovie}
          />
        </form>
      </div>
      <div className="flex flex-grow min-h-0 gap-6">
        <Table
          filteredData={filteredData}
          selected={selected}
          setSelected={setSelected}
          hasMore={skip + limit < total}
          fetchMore={fetchMore}
        />
        {selected && (
          <TableCard
            obj={selected}
            closeDrawer={closeDrawer}
            refetch={refetch}
          />
        )}
      </div>
    </main>
  );
}
