import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Button, Callout, Flex, Text, TextField } from "@radix-ui/themes";
import { useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { useNewTask } from "~/components/product/add-task-dialog/new-task-context";
import { input } from "./add-task-form.css";

type FormErrors = {
  title?: boolean;
  dueDate?: boolean;
};

export const AddTaskForm = () => {
  const { saveTask, closeDialog } = useNewTask();
  const {
    title,
    dueDate,
    errors,
    resetState,
    setErrors,
    updateTitle,
    updateDueDate,
  } = useFormState();
  const dueDateRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const newErrors: FormErrors = {
      title: !title.trim(),
      dueDate: !dueDate,
    };

    if (Object.values(newErrors).some(Boolean)) {
      setErrors(newErrors);
      return;
    }

    saveTask({
      title: title.trim(),
      dueDate: new Date(dueDate),
    });

    resetState();
  };

  const handleTitleKeyEnterDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      dueDateRef.current?.focus();
    }
  };

  const hasErrors = Object.values(errors).some(Boolean);

  return (
    <form onSubmit={handleSubmit}>
      <Flex direction="column" gap="4">
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Task Title
          </Text>
          <TextField.Root
            className={input}
            placeholder="e.g. Write blog post"
            value={title}
            onChange={(e) => updateTitle(e.target.value)}
            onKeyDown={handleTitleKeyEnterDown}
            color={errors.title ? "red" : undefined}
            required
          />
        </label>

        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Due Date
          </Text>
          <TextField.Root
            className={input}
            ref={dueDateRef}
            type="date"
            value={dueDate}
            onChange={(e) => updateDueDate(e.target.value)}
            color={errors.dueDate ? "red" : undefined}
            required
          />
        </label>

        {hasErrors && (
          <Callout.Root size="1" color="red">
            <Callout.Icon>
              <ExclamationTriangleIcon />
            </Callout.Icon>
            <Callout.Text>Please fill in all fields</Callout.Text>
          </Callout.Root>
        )}

        <Flex gap="3" mt="4" justify="start" direction="row-reverse">
          <Button type="submit" color="amber">
            Create Task
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

const useFormState = () => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const resetState = () => {
    setTitle("");
    setDueDate("");
    setErrors({});
  };

  const updateTitle = (value: string) => {
    setTitle(value);
    if (errors.title) {
      setErrors((prev) => ({ ...prev, title: false }));
    }
  };

  const updateDueDate = (value: string) => {
    setDueDate(value);
    if (errors.dueDate) {
      setErrors((prev) => ({ ...prev, dueDate: false }));
    }
  };

  return {
    title,
    dueDate,
    updateTitle,
    updateDueDate,
    errors,
    setErrors,
    resetState,
  };
};
