import { Flex } from "@radix-ui/themes";
import { AddTaskAction } from "./add-task-action";
import { DeleteTasksAction } from "./delete-tasks-action";
import { TaskStatusFilter } from "./task-status-filter";
import { tasksActions } from "./tasks-actions.css";

export const TasksActions = () => {
  return (
    <Flex justify="between" align="center" className={tasksActions}>
      <TaskStatusFilter />
      <Flex gap="2" align="center" direction="row-reverse">
        <AddTaskAction />
        <DeleteTasksAction />
      </Flex>
    </Flex>
  );
};
