import { Flex } from "@radix-ui/themes";
import { AddTaskAction } from "./add-task-action";
import { DeleteTasksAction } from "./delete-tasks-action";
import { TaskStatusFilter } from "./task-status-filter";

export const TasksActions = () => {
  return (
    <Flex justify="between" align="center">
      <TaskStatusFilter />
      <Flex gap="2" align="center" direction="row-reverse">
        <AddTaskAction />
        <DeleteTasksAction />
      </Flex>
    </Flex>
  );
};
