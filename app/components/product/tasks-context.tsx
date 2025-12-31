import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";
import { mockTasks } from "~/components/product/tasks-table/mock-tasks";
import type { Task } from "~/types/tasks";
import { useStatusFilter, type FilterByStatus } from "./use-status-filter";

type TaskUpdates = Partial<Omit<Task, "id" | "createdAt" | "userId">>;

type TasksContextValue = {
  tasks: Task[];
  filter: FilterByStatus;
  deleteTasks: (ids: Set<string>) => void;
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: TaskUpdates) => void;
};

const TasksContext = createContext<TasksContextValue | null>(null);

export const TasksProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const { filteredTasks, filter } = useStatusFilter(tasks);

  const deleteTasks = (ids: Set<string>) => {
    setTasks((prev) => prev.filter((task) => !ids.has(task.id)));
  };

  const addTask = (task: Task) => {
    setTasks((prev) => [...prev, task]);
  };

  const updateTask = (id: string, updates: TaskUpdates) => {
    setTasks((prev) =>
      prev.map((task) => {
        return task.id === id ? { ...task, ...updates } : task;
      })
    );
  };

  const context: TasksContextValue = {
    tasks: filteredTasks,
    filter,
    deleteTasks,
    addTask,
    updateTask,
  };

  return (
    <TasksContext.Provider value={context}>{children}</TasksContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
};
