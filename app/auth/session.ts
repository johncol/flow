import * as usersApi from "~/api/users";
import type { Session } from "~/types/session";
import type { NewUserInput } from "~/types/users";
import * as sessionStorage from "./storage/session";

export const login = async (
  email: string,
  password: string
): Promise<Session | null> => {
  const user = await usersApi.fetchUser(email, password);

  if (!user) {
    return null;
  }

  const session = sessionStorage.createSession(user);
  return session;
};

export const createAndLogin = async (input: NewUserInput): Promise<Session> => {
  const user = await usersApi.createUser(input);
  const session = sessionStorage.createSession(user);
  return session;
};

export const logout = (): void => {
  sessionStorage.deleteSession();
};

export const getSession = (): Session | null => {
  return sessionStorage.getSession();
};
