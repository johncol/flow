import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";
import { mockTasks } from "~/components/product/tasks-table/mock-tasks";
import type { Task } from "~/types/tasks";

type TasksContextValue = {
  tasks: Task[];
};

const TasksContext = createContext<TasksContextValue | null>(null);

export const TasksProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [tasks, _setTasks] = useState<Task[]>(mockTasks);

  return (
    <TasksContext.Provider value={{ tasks }}>{children}</TasksContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
};
