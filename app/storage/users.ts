import type { User } from "~/types/users";

const STORAGE_KEY = "users";

type StoredUser = Omit<User, "createdAt"> & {
  createdAt: string;
};

export const getUsers = (): User[] => {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return [];
  }

  const parsed: StoredUser[] = JSON.parse(stored);
  return parsed.map(deserializeUser);
};

export const saveUsers = (users: User[]): void => {
  const serialized = users.map(serializeUser);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(serialized));
};

const serializeUser = (user: User): StoredUser => ({
  ...user,
  createdAt: user.createdAt.toISOString(),
});

const deserializeUser = (stored: StoredUser): User => ({
  ...stored,
  createdAt: new Date(stored.createdAt),
});
