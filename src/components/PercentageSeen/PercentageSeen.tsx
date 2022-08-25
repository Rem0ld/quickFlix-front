import React from "react";

const PercentageSeen = ({ percentageSeen }: { percentageSeen: number }) => {
  if (!percentageSeen) {
    return null;
  }
  return (
    <div className="progress w-full absolute h-1 bottom-0">
      <div
        className={`filling h-1 bg-red-600`}
        style={{
          width: percentageSeen + "%",
        }}
      />
    </div>
  );
};

export default PercentageSeen;
