import { TrashIcon } from "@radix-ui/react-icons";
import { Button, Spinner, Tooltip } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useTasks } from "~/components/product/tasks/tasks-context";
import { useTaskSelection } from "~/components/product/tasks/tasks-table/bulk-select/task-selection-context";
import {
  notifyTasksDeleted,
  notifyTasksDeletedFailed,
} from "~/utils/toasts/tasks";
import { largeContainer } from "./delete-tasks-action.css";

export const DeleteTasksAction = () => {
  const { selectedIds, clearSelection, setIsDisabledSelection } = useTaskSelection();
  const { deleteTasks } = useTasks();
  const [isDeleting, setIsDeleting] = useState(false);
  const hasSelection = selectedIds.size > 0;

  useEffect(() => {
    setIsDisabledSelection(isDeleting);
  }, [setIsDisabledSelection, isDeleting]);

  const handleDelete = async () => {
    if (isDeleting) {
      return;
    }

    try {
      setIsDeleting(true);
      await deleteTasks(selectedIds);
      clearSelection();
      notifyTasksDeleted(selectedIds.size);
    } catch (error) {
      console.error(error);
      notifyTasksDeletedFailed(selectedIds.size);
    } finally {
      setIsDeleting(false);
    }
  };

  const button = (
    <Button
      color="red"
      size="2"
      disabled={!hasSelection}
      onClick={handleDelete}
      aria-label={getAriaLabel(selectedIds.size)}
    >
      <span className={largeContainer}>Delete</span>
      {getMaybeTasksCount(selectedIds.size)}
      {isDeleting ? <Spinner size="1" /> : <TrashIcon />}
    </Button>
  );

  if (hasSelection) {
    return button;
  }

  return (
    <Tooltip content="Select at least one task using the checkboxes">
      {button}
    </Tooltip>
  );
};

const getMaybeTasksCount = (count: number) => {
  return count > 0 ? `(${count})` : "";
};

const getAriaLabel = (count: number) => {
  return `Delete ${count} task${count > 1 ? "s" : ""}`;
};
