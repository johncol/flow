import * as usersStorage from "~/storage/users";
import type { NewUserInput, User } from "~/types/users";
import { delay, encryptPassword, generateUserId } from "./utils";

export const fetchUser = async (
  email: string,
  password: string
): Promise<User | undefined> => {
  await delay();

  const encryptedPassword = await encryptPassword(password);
  const users = usersStorage.getUsers();
  return users.find((user) => {
    return user.email === email && user.password === encryptedPassword;
  });
};

export const createUser = async (input: NewUserInput): Promise<User> => {
  await delay();

  const encryptedPassword = await encryptPassword(input.password);
  const user: User = {
    id: generateUserId(),
    name: input.name,
    email: input.email,
    password: encryptedPassword,
    createdAt: new Date(),
  };

  const users = usersStorage.getUsers();
  usersStorage.saveUsers([...users, user]);

  return user;
};
