import React, { ReactElement, useEffect } from "react";
import { createPortal } from "react-dom";

export const Modal = ({
  visible,
  width,
  height,
  children,
}: {
  visible: boolean;
  width: number;
  height: number;
  children: ReactElement;
}) => {
  const anchor: HTMLElement = document.getElementById("modal") as HTMLElement;
  anchor.style.position = "absolute";
  anchor.style.inset = "0px";

  useEffect(() => {
    if (!visible) {
      if (anchor.firstChild) anchor.removeChild(anchor.firstChild);
    }
  }, [visible]);

  if (!visible) return null;

  return createPortal(<div style={{ width, height }}>{children}</div>, anchor);
};
