import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Row, useTable } from "react-table";
import UseFetchMovies from "../../hooks/UseFetchMovie";
import { TvShow, Video } from "../../types";
import TableCard from "./Components/TableCard/TableCard";
import { MdDelete } from "react-icons/md";
import Button from "../../components/Button/Button";

export default function Dashboard() {
  const { movies, hasMoreMovie, fetchMoreMovies } = UseFetchMovies();
  useEffect(() => {
    fetchMoreMovies();
  }, []);

  const columns: any = useMemo(
    () => [
      { Header: "Name", accessor: "name" },
      { Header: "Filename", accessor: "filename" },
    ],
    [],
  );
  const tableInstance = useTable({
    columns,
    data: [...movies, ...movies, ...movies],
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

  const [selected, setSelected] = useState<TvShow | Video | null>(null);

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

  return (
    <main className="flex flex-col h-[calc(100vh-theme(height.14))]  p-5 bg-gray-800">
      {/* <Sidebar /> */}
      <div className="filters w-full h-32"></div>
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
                              className="h-12 px-1 border-t border-gray-600 capitalize"
                            >
                              {cell.render("Cell")}
                            </td>
                          );
                        })
                      }
                      <td className="h-12 w-12 px-1 border-t border-b border-gray-600 ">
                        <div className="h-full justify-center items-center hidden group-hover:flex">
                          {/* TODO: make btn with confirmation */}
                          <MdDelete size={22} color="#fff" />
                        </div>
                      </td>
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
            action={() => {
              setSelected(null);
            }}
          />
        )}
      </div>
    </main>
  );
}
