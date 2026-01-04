import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import * as authApi from "~/auth/session";
import type { Session } from "~/types/session";

type AuthContextType = {
  isLoggedIn: boolean;
  session: Session | null;
  login: (email: string, password: string) => Promise<Session | null>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const useSession = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useSession must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const session = authApi.getSession();
    if (session) {
      setSession(session);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const session = await authApi.login(email, password);
    if (session) {
      setSession(session);
    }
    return session;
  };

  const logout = () => {
    authApi.logout();
    setSession(null);
  };

  const context: AuthContextType = {
    isLoggedIn: !!session,
    session,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};
