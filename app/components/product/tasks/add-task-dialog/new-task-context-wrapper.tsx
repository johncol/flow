import type { PropsWithChildren } from "react";
import { NewTaskProvider } from "~/components/product/tasks/add-task-dialog/new-task-context";
import { useTasks } from "~/components/product/tasks/tasks-context";

export const NewTaskProviderWrapper: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const { addTask } = useTasks();

  return <NewTaskProvider addTask={addTask}>{children}</NewTaskProvider>;
};

