import React, { ReactElement } from "react";

export default function BooleanBtn({
  isActive,
  action,
  placeholders,
}: {
  isActive: boolean;
  action: () => void;
  placeholders: ReactElement[];
}) {
  return (
    <button className="hover:scale-125 transition-all" onClick={action}>
      {isActive ? placeholders[0] : placeholders[1]}
    </button>
  );
}
