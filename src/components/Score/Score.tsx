import React from "react";
import { BsStar, BsStarHalf, BsStarFill } from "react-icons/bs";

export default function Score({ score }: { score: number }) {
  return (
    <div className="flex gap-1 items-center">
      {score < 1 ? (
        <BsStar />
      ) : score >= 1 && score < 2 ? (
        <BsStarHalf />
      ) : (
        <BsStarFill />
      )}
      {score < 3 ? (
        <BsStar />
      ) : score >= 3 && score < 4 ? (
        <BsStarHalf />
      ) : (
        <BsStarFill />
      )}
      {score < 5 ? (
        <BsStar />
      ) : score >= 5 && score < 6 ? (
        <BsStarHalf />
      ) : (
        <BsStarFill />
      )}
      {score < 7 ? (
        <BsStar />
      ) : score >= 7 && score < 8 ? (
        <BsStarHalf />
      ) : (
        <BsStarFill />
      )}

      {score > 9.5 ? (
        <BsStarFill />
      ) : score >= 9 && score <= 9.5 ? (
        <BsStarHalf />
      ) : (
        <BsStar />
      )}
    </div>
  );
}
