import React from "react";

const Card = ({ details }: { details: any }): React.ReactElement => {
  return (
    <div className="w-52 h-32 border-2 rounded-md bg-red-300">
      <img src="#" />
      <h1 className="text-xl">{details}</h1>
    </div>
  );
};

export default Card;
