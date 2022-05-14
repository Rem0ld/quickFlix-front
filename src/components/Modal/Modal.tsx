import React, { ReactElement, useEffect } from "react";
import { GrClose } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import CloseBtn from "../CloseBtn/CloseBtn";

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
    <div
      className="absolute inset-0 grid place-items-center min-h-screen"
      onClick={hide}
      style={{
        top: window.scrollY,
      }}
    >
      <div className="absolute inset-0 z-50 opacity-90 bg-gray-800" />
      <div
        style={{ width, maxHeight: 785 }}
        onClick={(event) => {
          event.stopPropagation();
        }}
        className="absolute z-50 overflow-y-scroll rounded-md bg-gray-900 pb-16 drop-shadow-md transform-gpu animate-fade-in"
      >
        <CloseBtn action={hide} />
        {children}
      </div>
    </div>
  );
};
