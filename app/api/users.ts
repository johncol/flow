import * as usersStorage from "~/api/storage/users";
import { DomainError } from "~/types/errors";
import type { LoginInput, NewUserInput, User } from "~/types/users";
import { delay, encryptPassword, generateUserId } from "./utils";

export const fetchUser = async (
  input: LoginInput
): Promise<User | undefined> => {
  await delay();

  const encryptedPassword = await encryptPassword(input.password);
  const users = usersStorage.getUsers();
  return users.find((user) => {
    return user.email === input.email && user.password === encryptedPassword;
  });
};

export const createUser = async (input: NewUserInput): Promise<User> => {
  await delay();

  const users = usersStorage.getUsers();
  const emailExists = users.some(
    (user) => user.email.toLowerCase() === input.email.toLowerCase()
  );

  if (emailExists) {
    throw new DomainError("An account with this email is already registered.");
  }

  const encryptedPassword = await encryptPassword(input.password);
  const user: User = {
    id: generateUserId(),
    name: input.name,
    email: input.email,
    password: encryptedPassword,
    createdAt: new Date(),
  };

  usersStorage.saveUsers([...users, user]);

  return user;
};
