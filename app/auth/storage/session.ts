import type { User } from "~/types/users";

const SESSION_STORAGE_KEY = "session";

export type SessionUser = Omit<User, "password" | "createdAt">;

export type Session = {
  user: SessionUser;
  loginTime: Date;
};

type StoredSession = Omit<Session, "loginTime"> & {
  loginTime: string;
};

export const getSession = (): Session | null => {
  const stored = sessionStorage.getItem(SESSION_STORAGE_KEY);

  if (!stored) {
    return null;
  }

  return deserializeSession(JSON.parse(stored));
};

export const createSession = (user: User): Session => {
  const { password: _, createdAt: __, ...sessionUser } = user;

  const session: Session = {
    user: sessionUser,
    loginTime: new Date(),
  };

  const serialized = serializeSession(session);
  sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(serialized));

  return session;
};

export const deleteSession = (): void => {
  sessionStorage.removeItem(SESSION_STORAGE_KEY);
};

const serializeSession = (session: Session): StoredSession => ({
  ...session,
  loginTime: session.loginTime.toISOString(),
});

const deserializeSession = (stored: StoredSession): Session => ({
  ...stored,
  loginTime: new Date(stored.loginTime),
});
