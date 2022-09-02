import React, { createContext, ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

export default function AuthContextProvider({
  children,
}: {
  children: ReactElement;
}) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      setUser(null);
      navigate("/login");
      return;
    }

    setUser(savedUser);
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}
