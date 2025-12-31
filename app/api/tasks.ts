import * as tasksStorage from "~/storage/tasks";
import type { Task, TaskUpdates } from "~/types/tasks";
import { delay } from "./utils";

export const fetchTasks = async (userId: string): Promise<Task[]> => {
  await delay();

  if (!tasksStorage.hasTasks(userId)) {
    tasksStorage.saveTasks(userId, []);
  }

  return tasksStorage.getTasks(userId);
};

export const createTask = async (task: Task): Promise<Task> => {
  await delay();

  const tasks = tasksStorage.getTasks(task.userId);
  tasksStorage.saveTasks(task.userId, [...tasks, task]);
  return task;
};

export const updateTask = async (
  userId: string,
  taskId: string,
  updates: TaskUpdates
): Promise<Task> => {
  await delay();

  const tasks = tasksStorage.getTasks(userId);
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    throw new Error(`Task with id ${taskId} not found`);
  }

  const updatedTask: Task = { ...tasks[taskIndex], ...updates };
  tasks[taskIndex] = updatedTask;
  tasksStorage.saveTasks(userId, tasks);

  return updatedTask;
};

export const deleteTasks = async (
  userId: string,
  taskIds: Set<string>
): Promise<void> => {
  await delay();

  const tasks = tasksStorage.getTasks(userId);
  const filteredTasks = tasks.filter((task) => !taskIds.has(task.id));
  tasksStorage.saveTasks(userId, filteredTasks);
};
