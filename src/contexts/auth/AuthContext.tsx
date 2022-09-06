import React, {
  createContext,
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { TUser } from "../../types";

type TAuthContext = {
  user: TUser;
  setUser: Dispatch<SetStateAction<TUser | null>>;
};
export const AuthContext = createContext<TAuthContext | null>(null);

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