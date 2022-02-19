import React from "react";

export default function IframeWrapper({ ytKey }: { ytKey: string }) {
  if (!ytKey) return <div className="h-32" />;
  return (
    <iframe
      className="w-full aspect-video rounded-t-md"
      style={{ aspectRatio: "16/9" }}
      // ?autoplay=1
      src={`https://www.youtube.com/embed/${ytKey}?autoplay=1`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    ></iframe>
  );
}
