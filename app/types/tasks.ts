export const TaskStatuses = ["pending", "in-progress", "completed"] as const;

export type TaskStatus = (typeof TaskStatuses)[number];

export type Task = {
  id: string;
  title: string;
  dueDate: Date;
  status: TaskStatus;
  createdAt: Date;
  userId: string;
};

export type TaskUpdates = Partial<Omit<Task, "id" | "createdAt" | "userId">>;
