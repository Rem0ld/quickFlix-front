import React, { MutableRefObject, useEffect } from "react";

export default function ProgressBar({
  progressRef,
  progressBarRef,
}: {
  progressRef: MutableRefObject<HTMLDivElement>;
  progressBarRef: MutableRefObject<HTMLDivElement>;
}) {
  useEffect(() => {
    const abort = new AbortController();

    progressRef.current.addEventListener("mousedown", () => {
      document.addEventListener(
        "mousemove",
        (event) => {
          const { clientX } = event;
          progressBarRef.current.style.width = clientX - 24 + "px";
        },
        { signal: abort.signal },
      );
    });

    document.addEventListener("mouseup", () => {
      abort.abort();
    });
  });

  return (
    <div className="flex items-center">
      <div
        ref={progressRef}
        className="progress w-full h-1.5 bg-gray-400 rounded-xl cursor-pointer"
      >
        <div
          ref={progressBarRef}
          className="progressBar w-1 h-1.5 relative rounded-lg bg-red-500 cursor-pointer"
        >
          <span className="handle block w-4 h-4 absolute -right-3 top-2/4 -translate-y-2/4 transition-opacity ease-in rounded-full opacity-0 bg-red-500 cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
