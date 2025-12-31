import { TrashIcon } from "@radix-ui/react-icons";
import { Button, Tooltip } from "@radix-ui/themes";
import { useTasks } from "~/components/product/tasks/tasks-context";
import { useTaskSelection } from "~/components/product/tasks/tasks-table/bulk-select/task-selection-context";
import {
  notifyTasksDeleted,
  notifyTasksDeletedFailed,
} from "~/utils/toasts/tasks";

export const DeleteTasksAction = () => {
  const { selectedIds, clearSelection } = useTaskSelection();
  const { deleteTasks } = useTasks();
  const hasSelection = selectedIds.size > 0;

  const handleDelete = async () => {
    try {
      await deleteTasks(selectedIds);
      clearSelection();
      notifyTasksDeleted(selectedIds.size);
    } catch (error) {
      console.error(error);
      notifyTasksDeletedFailed(selectedIds.size);
    }
  };

  const button = (
    <Button
      color="red"
      size="3"
      disabled={!hasSelection}
      onClick={handleDelete}
    >
      Delete {selectedIds.size > 0 ? `(${selectedIds.size})` : ""}
      <TrashIcon />
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
