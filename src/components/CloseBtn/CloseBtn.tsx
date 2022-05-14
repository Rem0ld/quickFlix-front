import React, { MouseEventHandler } from "react";
import { GrClose } from "react-icons/gr";

export default function CloseBtn({
  action,
  offset = { top: "top-2", right: "right-4" },
}: {
  action: MouseEventHandler<HTMLButtonElement>;
  offset: { top: string; right: string };
}) {
  return (
    <button
      className={`absolute ${offset.right} ${offset.top} z-50 p-2 bg-white rounded-full transition-opacity animate-fade-in`}
      onClick={action}
    >
      <GrClose color="#fff" size={22} />
    </button>
  );
}
