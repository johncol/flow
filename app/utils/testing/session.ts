import type { Session } from "~/types/session";
import type { User } from "~/types/users";

const DEFAULT_USER: User = {
  id: "user-1",
  name: "John Doe",
  email: "john@example.com",
  password: "encrypted-password",
  createdAt: new Date(),
};

export const createUser = (overrides: Partial<User> = {}): User => {
  return {
    ...DEFAULT_USER,
    ...overrides,
  };
};

export const createLoggedInSession = (user: User = DEFAULT_USER): Session => {
  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    loginTime: new Date(),
  };
};
