import type { PropsWithChildren } from "react";
import { TaskSelectionProvider } from "~/components/product/tasks/tasks-table/bulk-select/task-selection-context";
import { useTasks } from "~/components/product/tasks/tasks-context";

export const TaskSelectionProviderWrapper: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const { tasks } = useTasks();
  const taskIds = tasks.map((task) => task.id);

  return (
    <TaskSelectionProvider taskIds={taskIds}>{children}</TaskSelectionProvider>
  );
};
