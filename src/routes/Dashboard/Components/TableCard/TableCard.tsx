/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, {
  EventHandler,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { GrClose } from "react-icons/gr";
import { BiSave } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Button from "../../../../components/Button/Button";
import CloseBtn from "../../../../components/CloseBtn/CloseBtn";
import { TvShow, Video } from "../../../../types";
import { updateVideo } from "../../../../api/video";

export default function TableCard({
  obj,
  action,
}: {
  obj: Video;
  action: any;
}) {
  const [values, setValues] = useState<Partial<Video>>({});
  const [pristine, setPristine] = useState<any>({});

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

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setPristine((prev: any) => ({
      ...prev,
      [name]: true,
    }));
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePatch = async () => {
    const data = Object.keys(pristine).reduce((acc: any, el: any) => {
      acc[el] = values[el];
      return acc;
    }, {});

    try {
      const response = await updateVideo(obj._id, data);
      // @ts-ignore
      const result = await response.json();

      setPristine({});
    } catch (error: unknown) {
      console.error(error);
    }
  };

  const handleDelete = () => {
    console.log("deleting");
  };

  return (
    <div className="relative w-2/4 p-4 border border-gray-600 rounded-md shadow-md">
      <div className="flex h-12 justify-between">
        <h1 className="text-white text-xl">Details</h1>
        <div className="flex gap-2">
          {!!Object.keys(pristine).length && (
            <Button
              onClick={handlePatch}
              bgColor="bg-quickflix"
              color="text-white"
              icon={<BiSave size={22} />}
              props="px-3"
            >
              Save modifications
            </Button>
          )}
          <Button
            onClick={handleDelete}
            icon={<MdDelete color="#000" size={22} />}
            props="mr-12 px-3"
          >
            Delete
          </Button>
        </div>
        <CloseBtn action={action} offset={{ top: "top-4", right: "right-4" }} />
      </div>
      <header className="flex gap-4 mt-2">
        {/* TODO: make dropdown to select picture, TODO2: make carousel */}
        <div className="w-52 object-contain">
          {values.posterPath?.length && (
            <img
              src={`http://${
                import.meta.env.DEV ? "localhost" : "192.168.0.11"
              }:3050/images${values.posterPath[0]}`}
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
