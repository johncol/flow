import * as usersApi from "~/api/users";
import type { Session } from "~/types/session";
import type { LoginInput, NewUserInput } from "~/types/users";
import * as storage from "./storage/session";

export const login = async (input: LoginInput): Promise<Session | null> => {
  const user = await usersApi.fetchUser(input);

  if (!user) {
    return null;
  }

  const session = storage.createSession(user);
  return session;
};

export const createAndLogin = async (input: NewUserInput): Promise<Session> => {
  const user = await usersApi.createUser(input);
  const session = storage.createSession(user);
  return session;
};

export const logout = (): void => {
  storage.deleteSession();
};

export const getSession = (): Session | null => {
  return storage.getSession();
};
