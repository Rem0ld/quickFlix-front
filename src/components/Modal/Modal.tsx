import React, { ReactElement, useEffect } from "react";

export const Modal = ({
  visible,
  hide,
  width,
  children,
}: {
  visible: boolean;
  hide: () => void;
  width: string;
  children: ReactElement;
}) => {
  if (!visible) return null;

  return (
    <div className="absolute inset-0 grid place-items-center" onClick={hide}>
      <div className="absolute inset-0 z-50 opacity-90 bg-gray-900" />
      <div
        style={{ width, maxHeight: 900 }}
        onClick={(event) => {
          event.stopPropagation();
        }}
        className="absolute z-50 overflow-y-scroll rounded-md bg-gray-900 pb-16"
      >
        {children}
      </div>
    </div>
  );
};
