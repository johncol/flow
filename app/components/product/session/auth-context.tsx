import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import * as authApi from "~/auth/session";
import type { Session } from "~/types/session";
import {
  ANONYMOUS,
  type AnonymousUserId,
  type NewUserInput,
} from "~/types/users";

export type AuthContextType = {
  isLoggedIn: boolean;
  userId: string | AnonymousUserId;
  session: Session | null;
  login: (email: string, password: string) => Promise<Session | null>;
  signup: (input: NewUserInput) => Promise<Session | null>;
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

  const signup = async (input: NewUserInput) => {
    const session = await authApi.createAndLogin(input);
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
    userId: session?.user.id ?? ANONYMOUS,
    session,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};
