import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ name, id }: { name: string; id: string }): React.ReactElement => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(`/player/${id}`);
      }}
      className=" card w-52 h-32 border-2 rounded-md bg-red-300 cursor-pointer hover:after:content-[''] after:w-52 after:h-32 after:bg-gray-400"
    >
      <img src="#" />
      <h1 className="text-xl capitalize">{name}</h1>
    </div>
  );
};

export default Card;
