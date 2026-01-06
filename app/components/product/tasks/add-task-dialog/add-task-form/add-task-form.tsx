import { Button, Flex, Spinner, Text } from "@radix-ui/themes";
import { useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { useNewTask } from "~/components/product/tasks/add-task-dialog/new-task-context";
import { ErrorCallout } from "~/components/ui/callout/error-callout";
import { Input } from "~/components/ui/input/input";
import { notifyTaskAdded } from "~/utils/toasts/tasks";
import { DEFAULT_ERROR_MESSAGE } from "~/utils/toasts/utils";
import { useAddTaskFormState } from "./use-add-task-form-state";

export const AddTaskForm = () => {
  const { addTask, closeDialog } = useNewTask();
  const [addTaskFailed, setAddTaskFailed] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const {
    title,
    dueDate,
    resetState,
    updateField,
    errors,
    updateErrors,
    hasErrors,
  } = useAddTaskFormState();

  const dueDateRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (isSaving) {
      return;
    }

    const hasErrors = updateErrors();
    if (hasErrors) {
      return;
    }

    try {
      setIsSaving(true);
      setAddTaskFailed(false);

      await addTask({
        title: title.trim(),
        dueDate: new Date(dueDate),
      });

      resetState();
      closeDialog();
      notifyTaskAdded();
    } catch (error) {
      console.error(error);
      setAddTaskFailed(true);
    } finally {
      setIsSaving(false);
    }
  };

  const handleTitleKeyEnterDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      dueDateRef.current?.focus();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex direction="column" gap="4">
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Task Title
          </Text>
          <Input
            placeholder="e.g. Write blog post"
            value={title}
            onChange={(e) => updateField("title", e.target.value)}
            onKeyDown={handleTitleKeyEnterDown}
            color={errors.title ? "red" : undefined}
            required
            disabled={isSaving}
          />
        </label>

        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Due Date
          </Text>
          <Input
            ref={dueDateRef}
            type="date"
            value={dueDate}
            onChange={(e) => updateField("dueDate", e.target.value)}
            color={errors.dueDate ? "red" : undefined}
            required
            disabled={isSaving}
          />
        </label>

        <ErrorCallout
          content="Please fill in all fields"
          visibleIf={hasErrors}
        />

        <ErrorCallout
          content={DEFAULT_ERROR_MESSAGE}
          visibleIf={addTaskFailed}
        />

        <Flex gap="3" mt="4" justify="start" direction="row-reverse">
          <Button type="submit" color="amber">
            Create Task {isSaving ? <Spinner size="1" /> : null}
          </Button>
          <Button
            type="button"
            variant="soft"
            color="gray"
            onClick={closeDialog}
          >
            Cancel
          </Button>
        </Flex>
      </Flex>
    </form>
  );
};
