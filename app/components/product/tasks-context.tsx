import { createContext, useContext, type PropsWithChildren } from "react";
import { mockTasks } from "~/components/product/tasks-table/mock-tasks";
import type { Task } from "~/types/tasks";
import { useStatusFilter, type FilterByStatus } from "./useStatusFilter";

type TasksContextValue = {
  tasks: Task[];
  filter: FilterByStatus;
};

const TasksContext = createContext<TasksContextValue | null>(null);

export const TasksProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { filteredTasks, filter } = useStatusFilter(mockTasks);

  const context: TasksContextValue = {
    tasks: filteredTasks,
    filter,
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
