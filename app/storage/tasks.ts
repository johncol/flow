import type { Task } from "~/types/tasks";

const STORAGE_KEY_PREFIX = "tasks-user-";
const getStorageKey = (userId: string) => `${STORAGE_KEY_PREFIX}${userId}`;

type StoredTask = Omit<Task, "dueDate" | "createdAt"> & {
  dueDate: string;
  createdAt: string;
};

export const getTasks = (userId: string): Task[] => {
  const key = getStorageKey(userId);
  const stored = localStorage.getItem(key);

  if (!stored) {
    return [];
  }

  const parsed: StoredTask[] = JSON.parse(stored);
  return parsed.map(deserializeTask);
};

export const saveTasks = (userId: string, tasks: Task[]): void => {
  const key = getStorageKey(userId);
  const serialized = tasks.map(serializeTask);
  localStorage.setItem(key, JSON.stringify(serialized));
};

export const hasTasks = (userId: string): boolean => {
  const key = getStorageKey(userId);
  return localStorage.getItem(key) !== null;
};

const serializeTask = (task: Task): StoredTask => ({
  ...task,
  dueDate: task.dueDate.toISOString(),
  createdAt: task.createdAt.toISOString(),
});

const deserializeTask = (stored: StoredTask): Task => ({
  ...stored,
  dueDate: new Date(stored.dueDate),
  createdAt: new Date(stored.createdAt),
});
