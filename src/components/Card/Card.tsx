import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({
  name,
  location,
  id,
}: {
  name: string;
  location: string;
  id: string;
}): React.ReactElement => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(`/player/${id}`);
      }}
      className="w-52 h-32 border-2 rounded-md bg-red-300"
    >
      <img src="#" />
      <h1 className="text-xl">{name}</h1>
    </div>
  );
};

export default Card;
