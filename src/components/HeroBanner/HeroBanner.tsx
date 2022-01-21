import React from "react";

const HeroBanner = () => {
  return (
    <div className="h-96 grid place-items-center">
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/zyyt3LEsLq8"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default HeroBanner;
