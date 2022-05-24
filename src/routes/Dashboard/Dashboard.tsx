import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Row, useTable } from "react-table";
import UseFetchMovies from "../../hooks/UseFetchMovie";
import { TvShow, Video } from "../../types";
import TableCard from "./Components/TableCard/TableCard";
import { MdDelete } from "react-icons/md";
import Button from "../../components/Button/Button";
import BtnWithConfirmation from "../../components/BtnWithConfirmation/BtnWithConfirmation";
import { BsSearch } from "react-icons/bs";
import { IoClose } from "react-icons/io5";

export default function Dashboard() {
  const [onlyMovie, setOnlyMovie] = useState(true);
  const { movies, refetch, hasMoreMovie, fetchMoreMovies } = UseFetchMovies({
    onlyMovie,
  });
  const [filteredData, setFilteredData] = useState([]);
  const [selected, setSelected] = useState<TvShow | Video | null>(null);
  const [textFilter, setTextFilter] = useState("");

  const columns: any = useMemo(
    () => [
      { Header: "Name", accessor: "name" },
      { Header: "Filename", accessor: "filename" },
    ],
    [],
  );
  const tableInstance = useTable({
    columns,
    data: filteredData,
  });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    allColumns,
    toggleHideColumn,
  } = tableInstance;

  const toggleHideColumns = (bool: boolean) => {
    allColumns.forEach((column) => {
      if (column.id !== "name") {
        toggleHideColumn(column.id, bool);
      }
    });
  };

  const handleClickCell = (obj: Video | TvShow) => {
    if (selected?._id === obj._id) {
      setSelected(null);
      toggleHideColumns(false);
      return;
    }

    setSelected(obj);
    toggleHideColumns(true);
  };

  const closeDrawer = () => {
    setSelected(null);
    toggleHideColumns(false);
    return;
  };

  useEffect(() => {
    setFilteredData(movies);
  }, [movies]);

  useEffect(() => {
    const filtered = movies.filter((el: Video) => el.name.includes(textFilter));
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
            onChange={() => setOnlyMovie(!onlyMovie)}
            className="w-4 h-4"
            type="checkbox"
            name="filter-movie"
            value="movie"
            checked={onlyMovie}
          />
        </form>
      </div>
      <div className="flex flex-grow min-h-0 gap-6">
        <div
          className={`${
            selected ? "w-2/4" : "w-full"
          } flex flex-col flex-grow min-h-0 overflow-auto border border-gray-600 rounded-sm`}
        >
          <table {...getTableProps()} className="table-auto text-gray-300">
            <thead>
              {
                // Loop over the header rows
                headerGroups.map((headerGroup, i) => (
                  // Apply the header row props
                  // eslint-disable-next-line react/jsx-key
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {
                      // Loop over the headers in each row
                      headerGroup.headers.map((column) => (
                        // Apply the header cell props
                        // eslint-disable-next-line react/jsx-key
                        <th
                          {...column.getHeaderProps()}
                          className="h-12 px-1 text-left"
                        >
                          {
                            // Render the header
                            column.render("Header")
                          }
                        </th>
                      ))
                    }
                  </tr>
                ))
              }
            </thead>
            {/* Apply the table body props */}
            <tbody {...getTableBodyProps()}>
              {
                // Loop over the table rows
                rows.map((row) => {
                  // Prepare the row for display
                  prepareRow(row);
                  return (
                    // Apply the row props
                    // eslint-disable-next-line react/jsx-key
                    <tr
                      {...row.getRowProps()}
                      className="group even:bg-gray-700 p-2 cursor-pointer"
                      onClick={() => handleClickCell(row.original)}
                    >
                      {
                        // Loop over the rows cells
                        row.cells.map((cell) => {
                          // Apply the cell props
                          return (
                            // eslint-disable-next-line react/jsx-key
                            <td
                              {...cell.getCellProps()}
                              className="h-12 px-1 border border-r-0 border-l-0 border-gray-600 capitalize"
                            >
                              {cell.render("Cell")}
                            </td>
                          );
                        })
                      }
                      {!selected && (
                        <td
                          onClick={(e) => e.stopPropagation()}
                          className="h-12 w-24 px-1 border-t border-b border-gray-600 "
                        >
                          <div className="h-full justify-end items-center hidden group-hover:flex">
                            {/* TODO: finish integration */}
                            <BtnWithConfirmation />
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
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
