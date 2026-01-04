import type { User } from "./users";

type SessionUser = Omit<User, "password" | "createdAt">;

export type Session = {
  user: SessionUser;
  loginTime: Date;
};
