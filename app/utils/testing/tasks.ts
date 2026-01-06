import type { Task } from "~/types/tasks";

const DEFAULT_TASK: Task = {
  id: "1",
  title: "Test Task",
  dueDate: new Date("2025-01-15"),
  status: "pending",
  createdAt: new Date("2025-01-01"),
  userId: "user-1",
};

export const createMockTask = (overrides: Partial<Task> = {}): Task => ({
  ...DEFAULT_TASK,
  ...overrides,
});
