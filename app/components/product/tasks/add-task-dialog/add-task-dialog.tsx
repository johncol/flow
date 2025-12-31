import { Dialog } from "@radix-ui/themes";
import { AddTaskForm } from "~/components/product/tasks/add-task-dialog/add-task-form/add-task-form";
import { useNewTask } from "~/components/product/tasks/add-task-dialog/new-task-context";

export const AddTaskDialog = () => {
  const { isDialogOpen, closeDialog } = useNewTask();

  return (
    <Dialog.Root
      open={isDialogOpen}
      onOpenChange={(open) => {
        if (!open) {
          closeDialog();
        }
      }}
    >
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
