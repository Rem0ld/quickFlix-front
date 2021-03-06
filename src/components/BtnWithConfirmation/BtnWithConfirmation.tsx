import React, { useEffect, useState } from "react";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

export default function BtnWithConfirmation({
  size = 22,
  color = "#fff",
  action,
}: {
  size?: number;
  color?: string;
  action?: () => void;
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
  return confirmState ? (
    <div className="flex items-center gap-1">
      <BsFillExclamationDiamondFill size={size - 4} color="#f00" />
      <span>confirm</span>
    </div>
  ) : (
    <MdDelete onClick={handleConfirmState} size={size} color={color} />
  );
}
