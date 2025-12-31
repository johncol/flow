import { Flex, Select, Text } from "@radix-ui/themes";
import { useTasks } from "~/components/product/tasks-context";
import type { StatusFilter } from "~/components/product/useStatusFilter";
import { TaskStatuses } from "~/types/tasks";
import { getStatusBadgeLabel } from "~/utils/status/getStatusLabel";

export const TaskStatusFilter = () => {
  const { filter } = useTasks();

  const handleStatusChange = (value: string) => {
    filter.setStatus(value as StatusFilter);
  };

  return (
    <Flex align="center" gap="2">
      <Text as="label" size="2" htmlFor="status-filter">
        Status:
      </Text>
      <Select.Root value={filter.status} onValueChange={handleStatusChange}>
        <Select.Trigger id="status-filter" />
        <Select.Content>
          <Select.Item value="all">All</Select.Item>
          {TaskStatuses.map((status) => (
            <Select.Item key={status} value={status}>
              {getStatusBadgeLabel(status)}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </Flex>
  );
};
