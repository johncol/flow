import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { Button, Flex, Select, Text, Tooltip } from "@radix-ui/themes";
import { useTaskSelection } from "~/components/product/tasks-table/bulk-select/task-selection-context";
import { TaskStatuses } from "~/types/tasks";
import { getStatusBadgeLabel } from "~/utils/status/getStatusLabel";

const BUTTON_SIZE = "3";

export const TasksActions = () => {
  return (
    <Flex justify="between" align="center">
      <FilterByStatusSelect />
      <Flex gap="2" align="center" direction="row-reverse">
        <NewTaskButton />
        <DeleteTasksButton />
      </Flex>
    </Flex>
  );
};

const FilterByStatusSelect = () => {
  return (
    <Flex align="center" gap="2">
      <Text as="label" size="2" htmlFor="status-filter">
        Filter by status
      </Text>
      <Select.Root defaultValue="all">
        <Select.Trigger id="status-filter" />
        <Select.Content>
          <Select.Item value="all">All</Select.Item>
          {Object.values(TaskStatuses).map((status) => (
            <Select.Item key={status} value={status}>
              {getStatusBadgeLabel(status)}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </Flex>
  );
};

const NewTaskButton = () => {
  return (
    <Button color="amber" size={BUTTON_SIZE}>
      Add new task
      <PlusIcon />
    </Button>
  );
};

const DeleteTasksButton = () => {
  const { selectedIds } = useTaskSelection();
  const hasSelection = selectedIds.size > 0;

  const button = (
    <Button color="red" size={BUTTON_SIZE} disabled={!hasSelection}>
      Delete {selectedIds.size > 0 ? `(${selectedIds.size})` : ""}
      <TrashIcon />
    </Button>
  );

  if (hasSelection) {
    return button;
  }

  return (
    <Tooltip content="Select at least one task using the checkboxes">
      <span tabIndex={0}>{button}</span>
    </Tooltip>
  );
};
