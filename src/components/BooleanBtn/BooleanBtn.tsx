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
    <button className="w-8 h-8 hover:scale-125 transition-all" onClick={action}>
      {isActive ? placeholders[0] : placeholders[1]}
    </button>
  );
}
