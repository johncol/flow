import { Dialog } from "@radix-ui/themes";
import { useNewTask } from "~/components/product/add-task-dialog/new-task-context";
import { AddTaskForm } from "~/components/product/add-task-dialog/add-task-form";

export const AddTaskDialog = () => {
  const { isOpen, closeDialog } = useNewTask();

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && closeDialog()}>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Add New Task</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Create a new task by filling out the form below.
        </Dialog.Description>
        <AddTaskForm />
      </Dialog.Content>
    </Dialog.Root>
  );
};

