import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import { useNewTask } from "~/components/product/tasks/add-task-dialog/new-task-context";

export const AddTaskAction = () => {
  const { openDialog } = useNewTask();

  return (
    <Button color="amber" size="2" onClick={openDialog}>
      Add new task
      <PlusIcon />
    </Button>
  );
};
