export type TaskStatus = "pending" | "in-progress" | "completed";

export type Task = {
  id: string;
  title: string;
  dueDate: Date;
  status: TaskStatus;
  createdAt: Date;
  userId: string;
};
