import { nanoid } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import DiscoverApi from "../../api/DiscoverApi";
import Button from "../../components/Button/Button";

type TResult = {
  data: string[];
  total: string | number;
};

export default function AddFile() {
  const [list, setList] = useState([]);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState("null");
  const [result, setResult] = useState<TResult | null>(null);

  const handleChangeValue = (e) => {
    setSelected(e.target.value);
  };

  const handleClick = async () => {
    setResult(null);
    const [result, error] = await DiscoverApi.Instance.discover(selected);

    if (error) {
      console.log(error);
    }

    setResult(result);
  };

  useEffect(() => {
    DiscoverApi.Instance.getDir().then(
      ([result, error]: [result: string[], error: Error]) => {
        if (error) {
          setError(error.message);
          return;
        }
        setList(result);
      },
    );
  }, []);

  return (
    <div className="h-screen flex flex-col w-2/4 p-2">
      {error && (
        <div>
          <span className="text-xl text-center">{error}</span>
        </div>
      )}
      <label>Choose which folder to get videos from:</label>
      <select
        onChange={handleChangeValue}
        value={selected}
        className="h-10 rounded-sm bg-gray-700"
      >
        <option value="null">-- Choose option --</option>
        {list?.map((el) => {
          return (
            <option key={nanoid()} value={el}>
              {el}
            </option>
          );
        })}
      </select>
      {selected.length > 0 && selected !== "null" && (
        <div className="flex items-center justify-between gap-4 my-4">
          <span>{selected}</span>
          <Button
            onClick={handleClick}
            bgColor="bg-black"
            color="text-white"
            props="w-fit"
          >
            Choose option
          </Button>
        </div>
      )}
      {!!result && (
        <div>
          <span>{result.total} videos added to DB</span>
        </div>
      )}
    </div>
  );
}
