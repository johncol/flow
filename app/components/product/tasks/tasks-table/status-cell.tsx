import { Select, Table } from "@radix-ui/themes";
import { useState } from "react";
import { useTasks } from "~/components/product/tasks/tasks-context";
import { StatusBadge } from "~/components/ui/badge/status-badge";
import { TaskStatuses, type TaskStatus } from "~/types/tasks";
import { getStatusLabel } from "~/utils/status/get-status-label";
import {
  notifyTaskUpdated,
  notifyTaskUpdatedFailed,
} from "~/utils/toasts/tasks";

type StatusCellProps = {
  taskId: string;
  status: TaskStatus;
};

export const StatusCell: React.FC<StatusCellProps> = ({ taskId, status }) => {
  const { updateTask } = useTasks();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (value: string) => {
    try {
      setIsUpdating(true);
      await updateTask(taskId, { status: value as TaskStatus });
      notifyTaskUpdated();
    } catch (error) {
      console.error(error);
      notifyTaskUpdatedFailed();
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Table.Cell>
      <Select.Root
        value={status}
        onValueChange={handleStatusChange}
        disabled={isUpdating}
      >
        <Select.Trigger variant="ghost">
          <StatusBadge status={status} isUpdating={isUpdating} />
        </Select.Trigger>
        <Select.Content>
          {TaskStatuses.map((statusOption) => (
            <Select.Item key={statusOption} value={statusOption}>
              {getStatusLabel(statusOption)}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </Table.Cell>
  );
};
