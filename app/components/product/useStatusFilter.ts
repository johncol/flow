import { useMemo, useState } from "react";
import type { Task, TaskStatus } from "~/types/tasks";

export type StatusFilter = TaskStatus | "all";

export type FilterByStatus = {
  status: StatusFilter;
  setStatus: (status: StatusFilter) => void;
};

export const useStatusFilter = (tasks: Task[]) => {
  const [status, setStatus] = useState<StatusFilter>("all");

  const filteredTasks = useMemo(() => {
    if (status === "all") {
      return tasks;
    }
    return tasks.filter((task) => task.status === status);
  }, [tasks, status]);

  return {
    filteredTasks,
    filter: { status, setStatus },
  };
};
