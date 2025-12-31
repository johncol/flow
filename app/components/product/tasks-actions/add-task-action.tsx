import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";

export const AddTaskAction = () => {
  return (
    <Button color="amber" size="3">
      Add new task
      <PlusIcon />
    </Button>
  );
};
