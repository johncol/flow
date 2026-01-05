import { createContext, useContext, type PropsWithChildren } from "react";
import type { NewTaskInput, Task, TaskUpdates } from "~/types/tasks";
import { useStatusFilter, type FilterByStatus } from "./use-status-filter";
import { useTasksState } from "./use-tasks-state";

type TasksContextValue = {
  tasks: Task[];
  filter: FilterByStatus;
  tasksLoading: boolean;
  errorLoadingTasks: boolean;
  deleteTasks: (ids: Set<string>) => Promise<void>;
  addTask: (input: NewTaskInput) => Promise<void>;
  updateTask: (id: string, updates: TaskUpdates) => Promise<void>;
};

const TasksContext = createContext<TasksContextValue | null>(null);

export const TasksProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { tasks: unfilteredTasks, ...tasksState } = useTasksState();
  const { filteredTasks: tasks, filter } = useStatusFilter(unfilteredTasks);

  const context: TasksContextValue = {
    ...tasksState,
    tasks,
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
