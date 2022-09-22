import React, {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AuthenticateApi from "../../api/AuthenticateApi";
import { TUser } from "../../types";

type TAuthContext = {
  user: TUser;
  login: (arg1: string, arg2: string) => Promise<any>;
  logout: () => void;
  getUser: () => TUser | null;
};
const AuthContext = createContext<TAuthContext | null>(null);

function useAuth() {
  const navigate = useNavigate();
  const [user, setUser] = useState<TUser | null>(null);

  useEffect(() => {
    const savedUser = AuthenticateApi.Instance.getUser();
    if (savedUser) {
      setUser(savedUser);
    }
    return;
  }, []);

  return {
    user,
    getUser: () => AuthenticateApi.Instance.getUser(),
    login: async (pseudo: string, password: string) => {
      const [result, error] = await AuthenticateApi.Instance.authenticate({
        pseudo,
        password,
      });

      if (error) {
        return [null, error];
      }
      AuthenticateApi.Instance.setUser(result);
      setUser(result);
      navigate("/");
      return [result, null];
    },
    logout: () => {
      setUser(null);
      navigate("/login");
      AuthenticateApi.Instance.removeUser();
    },
  };
}

export function RequireAuth({ children }: { children: ReactElement }) {
  const { getUser } = AuthConsumer();

  return getUser() ? children : <Navigate to="/login" replace />;
}

export function RequireAdmin({ children }: { children: ReactElement }) {
  const { getUser } = AuthConsumer();
  const user = getUser();

  return user?.isAdmin ? children : <Navigate to="/browse" replace />;
}

export default function AuthProvider({ children }: { children: ReactElement }) {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function AuthConsumer() {
  return useContext(AuthContext);
}
