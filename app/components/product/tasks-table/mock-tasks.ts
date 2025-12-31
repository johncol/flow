import type { Task } from "~/types/tasks";

export const mockTasks: Task[] = [
  {
    id: "t_0001",
    title: "Brand Strategy",
    dueDate: new Date("2026-01-01"),
    status: "pending",
    createdAt: new Date("2025-01-01"),
    userId: "u_0001",
  },
  {
    id: "t_0002",
    title: "Website Redesign",
    dueDate: new Date("2026-01-02"),
    status: "in-progress",
    createdAt: new Date("2025-01-02"),
    userId: "u_0001",
  },
  {
    id: "t_3",
    title: "Social Media Campaign",
    dueDate: new Date("2026-01-03"),
    status: "completed",
    createdAt: new Date("2025-01-03"),
    userId: "u_0001",
  },
];
