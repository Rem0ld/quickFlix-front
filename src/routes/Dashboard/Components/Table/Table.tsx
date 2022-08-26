/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTable } from "react-table";
import BtnWithConfirmation from "../../../../components/BtnWithConfirmation/BtnWithConfirmation";
import { baseVideoLimit } from "../../../../config";
import { Video } from "../../../../types";
import { scrollReachThreshold } from "../../../../utils/documentManipulation";
import VideoApi from "../../../../api/VideoApi";

export default function Table({
  selected,
  setSelected,
  filteredData,
  threshold = 50,
  hasMore,
  fetchMore,
  isFetching,
}: {
  selected: Video | null;
  setSelected: (arg: Video | null) => void;
  filteredData: Video[];
  threshold?: number;
  hasMore: boolean;
  fetchMore: () => void;
  isFetching: boolean;
}) {
  const el = useRef<HTMLTableElement | undefined>();
  const columns: any = useMemo(
    () => [
      { Header: "Name", accessor: "name" },
      { Header: "Filename", accessor: "filename" },
    ],
    [],
  );

  useEffect(() => {
    const event = (e) => {
      if (scrollReachThreshold(e, threshold) && !isFetching) {
        fetchMore();
        return;
      }
    };
    if (el.current) {
      el.current.parentElement?.addEventListener("scroll", event);
    }

    () => {
      if (el.current) {
        return el.current.parentElement?.removeEventListener("scroll", event);
      }
    };
  }, [el, threshold]);

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

  const handleClickCell = (obj: Video) => {
    if (selected?.id === obj.id) {
      setSelected(null);
      toggleHideColumns(false);
      return;
    }

    setSelected(obj);
    toggleHideColumns(true);
  };

  useEffect(() => {
    if (!selected) {
      toggleHideColumns(false);
    }
  }, [selected]);

  return (
    <div
      className={`${
        selected ? "w-2/4" : "w-full"
      } flex flex-col flex-grow min-h-0 overflow-auto border border-gray-600 rounded-sm`}
    >
      <table ref={el} {...getTableProps()} className="table-auto text-gray-300">
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
  );
}
