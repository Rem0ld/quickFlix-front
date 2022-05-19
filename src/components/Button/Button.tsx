import React, { MouseEventHandler, ReactElement } from "react";

export default function Button({
  bgColor = "bg-white",
  color = "text-black",
  icon = null,
  children,
  props,
  onClick,
}: {
  children?: ReactElement | HTMLElement | string;
  bgColor?: string;
  color?: string;
  icon?: ReactElement | null;
  props?: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex gap-x-2 items-center py-3 px-6 ${bgColor} rounded-lg shadow-lg font-semibold tracking-wide ${color} ${props}`}
    >
      {icon ? icon : ""}
      {children}
    </button>
  );
}
