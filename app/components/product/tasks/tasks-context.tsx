import { createContext, useContext, type PropsWithChildren } from "react";
import type { Task, TaskUpdates } from "~/types/tasks";
import { useStatusFilter, type FilterByStatus } from "./use-status-filter";
import { useTasksState } from "./use-tasks-state";

type TasksContextValue = {
  tasks: Task[];
  filter: FilterByStatus;
  isLoading: boolean;
  deleteTasks: (ids: Set<string>) => Promise<void>;
  addTask: (task: Task) => Promise<void>;
  updateTask: (id: string, updates: TaskUpdates) => Promise<void>;
};

const TasksContext = createContext<TasksContextValue | null>(null);

export const TasksProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { tasks, isLoading, addTask, updateTask, deleteTasks } =
    useTasksState();

  const { filteredTasks, filter } = useStatusFilter(tasks);

  const context: TasksContextValue = {
    tasks: filteredTasks,
    filter,
    isLoading,
    addTask,
    updateTask,
    deleteTasks,
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
