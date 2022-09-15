import React from "react";

const ImageCard = ({
  posterPath,
  name,
}: {
  posterPath: string[];
  name: string;
}): React.ReactElement => {
  if (!posterPath || !posterPath.length) {
    return (
      <>
        <span className="text-white">No image yet</span>
        <h1 className="w-full absolute bottom-0 pl-1 text-xl capitalize text-white overflow-ellipsis overflow-hidden">
          {name}
        </h1>
      </>
    );
  }

  return (
    <img
      className="w-full h-full aspect-square rounded-sm"
      src={`http://${
        import.meta.env.DEV ? "localhost" : "192.168.0.11"
      }:3050/images${posterPath[0]}`}
    />
  );
};

export default ImageCard;
