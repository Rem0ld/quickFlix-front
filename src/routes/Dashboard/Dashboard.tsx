import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Row, useTable } from "react-table";
import UseFetchMovies from "../../hooks/UseFetchMovie";
import { TvShow, Video } from "../../types";
import TableCard from "./Components/TableCard/TableCard";

export default function Dashboard() {
  const { movies, hasMoreMovie, fetchMoreMovies } = UseFetchMovies();
  useEffect(() => {
    fetchMoreMovies();
  }, []);

  const columns: any = useMemo(
    () => [
      { Header: "Name", accessor: "name" },
      { Header: "Filename", accessor: "filename" },
      { Header: "Actions", accessor: "" },
    ],
    [],
  );
  const tableInstance = useTable({ columns, data: movies });

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
    <div className="dashboard-table flex gap-6 p-5 bg-gray-800">
      {/* <Sidebar /> */}
      <table
        {...getTableProps()}
        className={`${
          selected ? "w-2/4" : "w-full"
        } grow text-gray-300 transform-gpu transition-all`}
      >
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
                    <th {...column.getHeaderProps()} className="p-2">
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
                  className="p-2 cursor-pointer"
                  onClick={() => handleClickCell(row.original)}
                >
                  {
                    // Loop over the rows cells
                    row.cells.map((cell) => {
                      // Apply the cell props
                      return (
                        // eslint-disable-next-line react/jsx-key
                        <td {...cell.getCellProps()} className="px-1">
                          {cell.render("Cell")}
                        </td>
                      );
                    })
                  }
                </tr>
              );
            })
          }
        </tbody>
      </table>
      {selected && (
        <TableCard
          obj={selected}
          action={() => {
            setSelected(null);
          }}
        />
      )}
    </div>
  );
}
