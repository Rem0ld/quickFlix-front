/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { ChangeEvent, useEffect, useState } from "react";
import { BiSave } from "react-icons/bi";
import Button from "../../../../components/Button/Button";
import CloseBtn from "../../../../components/CloseBtn/CloseBtn";
import { TvShow, Video } from "../../../../types";
import BtnWithConfirmation from "../../../../components/BtnWithConfirmation/BtnWithConfirmation";

export default function TableCard({
  obj,
  closeDrawer,
  refetch,
}: {
  obj: Video;
  closeDrawer: () => void;
  refetch: () => void;
}) {
  console.log("🚀 ~ file: TableCard.tsx ~ line 24 ~ obj", obj);
  const [values, setValues] = useState<Partial<Video>>({});
  const [pristine, setPristine] = useState<Record<string, boolean>>({});
  const [selectedPoster, setSelectedPoster] = useState("");

  useEffect(() => {
    if (obj?.posterPath?.length) {
      setSelectedPoster(obj.posterPath[0]);
    }
  }, [obj]);

  useEffect(() => {
    setValues((prev) => ({
      ...prev,
      name: obj.name,
      basename: obj.basename,
      filename: obj.filename,
      location: obj.location,
      type: obj.type,
      posterPath: obj.posterPath,
    }));
  }, [obj]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPristine((prev) => ({
      ...prev,
      [name]: true,
    }));
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePatch = async () => {
    // const data = Object.keys(pristine).reduce(
    //   (acc: Record<string, unknown>, el: any) => {
    //     acc[el] = values[el];
    //     return acc;
    //   },
    //   {},
    // );
    // try {
    //   const response = await updateVideo(obj.id, data);
    //   // @ts-ignore
    //   const result = await response.json();
    //   setPristine({});
    // } catch (error: unknown) {
    //   console.error(error);
    // }
  };

  const handleDelete = async () => {
    // try {
    //   console.log("deleting");
    //   await deleteVideoById(obj.id);
    //   refetch();
    //   closeDrawer();
    // } catch (err) {
    //   console.error(err);
    // }
  };

  const handleChangePoster = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    setSelectedPoster(e.target.value);
  };

  return (
    <div className="relative w-2/4 p-4 border border-gray-600 rounded-md shadow-md animate-fade-in-fast">
      <div className="flex h-12 justify-between items-center">
        <h1 className="text-white text-xl">Details</h1>
        <div className="flex">
          {!!Object.keys(pristine).length && (
            <Button
              onClick={handlePatch}
              bgColor="bg-transparent"
              icon={<BiSave size={22} color="#fff" />}
              props="px-3 hover:bg-gray-600 hover:rounded-full transition-all duration-200"
            />
          )}
          <BtnWithConfirmation
            size={22}
            color="#fff"
            action={handleDelete}
            propsIcon="p-3 hover:bg-gray-600 rounded-full transition-colors duration-200"
            props="mr-12"
          />
        </div>
        <CloseBtn
          action={closeDrawer}
          offset={{ top: "top-5", right: "right-4" }}
        />
      </div>
      <header className="flex gap-4 mt-2">
        {/* TODO: make carousel, TODO: remove poster, add poster from moviedb */}
        <div className="w-52 object-contain">
          {selectedPoster && (
            <img
              src={`http://${
                import.meta.env.DEV ? "localhost" : "192.168.0.11"
              }:3050/images${selectedPoster}`}
            />
          )}
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <h4>Type:</h4>
            <div className="flex gap-3 h-10">
              <div className="flex gap-1 justify-center items-center">
                <input
                  type="radio"
                  name="type"
                  value="tv"
                  checked={values.type === "tv"}
                  onChange={handleChange}
                />
                <label>Tv-show</label>
              </div>
              <div className="flex gap-1 items-center">
                <input
                  type="radio"
                  name="type"
                  value="movie"
                  checked={values.type === "movie"}
                  onChange={handleChange}
                />
                <label>Movie</label>
              </div>
            </div>
          </div>
          <div>
            <h4>Name:</h4>
            <input
              className="h-10 rounded-sm px-1"
              type={"text"}
              value={values.name}
              name={"name"}
              onChange={handleChange}
            />
          </div>
          <div>
            <h4>Basename:</h4>
            <input
              className="h-10 rounded-sm px-1"
              type={"text"}
              name="basename"
              value={values.basename}
              onChange={handleChange}
            />
          </div>
        </div>
      </header>
      <main className="flex flex-wrap gap-4 pt-2">
        <select
          onChange={(e) => console.log(e)}
          className="py-2 px-2 border border-gray-500 rounded-sm bg-gray-800"
          defaultValue={selectedPoster}
        >
          {values?.posterPath?.map((pic, i) => {
            return (
              <option
                // selected={i === 0}
                key={i}
                value={i}
                className="grid place-items-center w-full p-2 cursor-pointer hover:bg-gray-500"
              >
                Poster {i}
              </option>
            );
          })}
        </select>
        <div className="w-full">
          <h4>Filename:</h4>
          <input
            className="w-full h-10 rounded-sm px-1"
            type={"text"}
            value={values.filename}
            onChange={handleChange}
            name="filename"
          />
        </div>
        <div className="w-full">
          <h4>Location:</h4>
          <input
            className="w-full h-10 rounded-sm px-1"
            type={"text"}
            value={values.location}
            name="location"
            onChange={handleChange}
          />
        </div>
      </main>
    </div>
  );
}
