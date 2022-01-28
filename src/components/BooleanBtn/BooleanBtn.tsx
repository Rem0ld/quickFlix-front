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
    <button onClick={action}>
      {isActive ? placeholders[0] : placeholders[1]}
    </button>
  );
}
