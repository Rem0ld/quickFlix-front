import React, { ReactElement } from "react";
import { createPortal } from "react-dom";

export const Modal = ({
  visible,
  children,
}: {
  visible: boolean;
  children: ReactElement;
}) => {
  const anchor: HTMLElement = document.getElementById("modal") as HTMLElement;
  anchor.style.position = "absolute";
  anchor.style.inset = "0px";

  if (!visible) return null;

  return createPortal(children, anchor);
};
