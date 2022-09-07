import React, { useEffect, useState } from "react";
import { makeRandomNumber } from "../../utils/numberManipulation";

type props = {
  ytKeys: string[];
};

export default function IframeWrapper({ ytKeys }: props) {
  const [randomNum, setRandomNum] = useState<number>(0);

  useEffect(() => {
    setRandomNum(makeRandomNumber(0, ytKeys?.length || 0));
  }, []);

  if (!ytKeys?.length) return <div className="h-32" />;

  return (
    <iframe
      className="w-full aspect-video rounded-t-md"
      style={{ aspectRatio: "16/9" }}
      // ?autoplay=1
      src={`https://www.youtube.com/embed/${ytKeys[randomNum]}`}
      frameBorder="0"
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    ></iframe>
  );
}
