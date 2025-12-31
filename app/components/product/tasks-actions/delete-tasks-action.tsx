import { TrashIcon } from "@radix-ui/react-icons";
import { Button, Tooltip } from "@radix-ui/themes";
import { useTasks } from "~/components/product/tasks-context";
import { useTaskSelection } from "~/components/product/tasks-table/bulk-select/task-selection-context";

export const DeleteTasksAction = () => {
  const { selectedIds, clearSelection } = useTaskSelection();
  const { deleteTasks } = useTasks();
  const hasSelection = selectedIds.size > 0;

  const handleDelete = () => {
    deleteTasks(selectedIds);
    clearSelection();
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
