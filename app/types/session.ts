import type { User } from "./users";

export type SessionUser = Omit<User, "password" | "createdAt">;

export type Session = {
  user: SessionUser;
  loginTime: Date;
};
