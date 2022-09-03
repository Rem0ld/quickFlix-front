import React, { createContext, ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TUser } from "../../types";

export const AuthContext = createContext(null);

export default function AuthContextProvider({
  children,
}: {
  children: ReactElement;
}) {
  const navigate = useNavigate();
  const [user, setUser] = useState<TUser | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      setUser(null);
      navigate("/login");
      return;
    }

    setUser(JSON.parse(savedUser));
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
