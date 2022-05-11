import React, { useEffect, useState } from "react";
import { TvShow, Video } from "../../../../types";

export default function TableCard({ obj }: { obj: Video }) {
  console.log("🚀 ~ file: TableCard.tsx ~ line 5 ~ TableCard ~ obj", obj);

  const [isLocked, setIsLocked] = useState(true);
  const [name, setName] = useState(obj.name);
  const [basename, setBasename] = useState(obj.basename);
  const [filename, setFilename] = useState(obj.filename);
  const [location, setLocation] = useState(obj.location);
  const [type, setType] = useState<string>(obj.type);

  useEffect(() => {
    setIsLocked(true);
    setName(obj.name);
    setBasename(obj.basename);
    setFilename(obj.filename);
    setLocation(obj.location);
    setType(obj.type);
  }, [obj]);

  return (
    <div className="w-2/4 p-4 border border-gray-600 rounded-md shadow-md">
      <h1 className="text-white text-xl flex-grow">Details</h1>
      <header className="flex">
        {/* TODO: make dropdown to select picture, TODO2: make carousel */}
        <div className="w-52 object-contain">
          {obj.posterPath?.length && (
            <img
              src={`http://${
                import.meta.env.DEV ? "localhost" : "192.168.0.11"
              }:3050/images${obj.posterPath[0]}`}
            />
          )}
        </div>
        <button
          type="button"
          onClick={() => {
            setIsLocked(!isLocked);
          }}
        >
          {isLocked ? "Unlock" : "Lock"}
        </button>
      </header>
      <main className="flex flex-wrap gap-4 pt-2">
        <div>
          <h4>Name:</h4>
          <input
            className="h-10 rounded-sm px-1"
            type={"text"}
            value={name}
            disabled={isLocked}
          />
        </div>
        <div>
          <h4>Basename:</h4>
          <input
            className="h-10 rounded-sm px-1"
            type={"text"}
            value={basename}
            disabled={isLocked}
          />
        </div>
        <div>
          <h4>Type:</h4>
          <div className="flex gap-3 h-10">
            <div className="flex gap-1 justify-center items-center">
              <input
                type="radio"
                name="type"
                value="tv"
                checked={type === "tv"}
                onChange={(e) => setType(e.target.value)}
              />
              <label>Tv-show</label>
            </div>
            <div className="flex gap-1 items-center">
              <input
                type="radio"
                name="type"
                value="movie"
                checked={type === "movie"}
                onChange={(e) => setType(e.target.value)}
              />
              <label>Movie</label>
            </div>
          </div>
        </div>
        <div className="w-full">
          <h4>Filename:</h4>
          <input
            className="w-full h-10 rounded-sm px-1"
            type={"text"}
            value={filename}
            disabled={isLocked}
          />
        </div>
        <div className="w-full">
          <h4>Location:</h4>
          <input
            className="w-full h-10 rounded-sm px-1"
            type={"text"}
            value={location}
            disabled={isLocked}
          />
        </div>
      </main>
    </div>
  );
}
