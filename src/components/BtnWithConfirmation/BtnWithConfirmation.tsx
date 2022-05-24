import React, { useEffect, useState } from "react";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

export default function BtnWithConfirmation({
  size = 22,
  color = "#fff",
  action,
  props = "",
  propsIcon = "",
}: {
  size?: number;
  color?: string;
  action?: () => void;
  props?: string;
  propsIcon?: string;
}) {
  const [confirmState, setConfirmState] = useState(false);

  useEffect(() => {
    if (confirmState) {
      setTimeout(() => {
        setConfirmState(false);
      }, 1300);
    }
  }, [confirmState]);

  const handleConfirmState = () => {
    setConfirmState(true);
  };
  return (
    <div className={`grid place-items-center cursor-pointer ${props}`}>
      {confirmState ? (
        <button
          type="button"
          onClick={action}
          className="flex items-center gap-1"
        >
          <BsFillExclamationDiamondFill size={size - 4} color="#f00" />
          <span>confirm</span>
        </button>
      ) : (
        <button type="button" className={`${propsIcon}`}>
          <MdDelete onClick={handleConfirmState} size={size} color={color} />
        </button>
      )}
    </div>
  );
}
