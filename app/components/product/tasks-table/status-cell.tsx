import { Select, Table } from "@radix-ui/themes";
import { useTasks } from "~/components/product/tasks-context";
import { StatusBadge } from "~/components/ui/badge/status-badge";
import { TaskStatuses, type TaskStatus } from "~/types/tasks";
import { getStatusBadgeLabel } from "~/utils/status/getStatusLabel";
import { notifyTaskUpdated } from "~/utils/toasts/tasks";

type StatusCellProps = {
  taskId: string;
  status: TaskStatus;
};

export const StatusCell: React.FC<StatusCellProps> = ({ taskId, status }) => {
  const { updateTask } = useTasks();

  const handleStatusChange = (value: string) => {
    updateTask(taskId, { status: value as TaskStatus });
    notifyTaskUpdated();
  };

  return (
    <Table.Cell>
      <Select.Root value={status} onValueChange={handleStatusChange}>
        <Select.Trigger variant="ghost">
          <StatusBadge status={status} />
        </Select.Trigger>
        <Select.Content>
          {TaskStatuses.map((statusOption) => (
            <Select.Item key={statusOption} value={statusOption}>
              {getStatusBadgeLabel(statusOption)}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </Table.Cell>
  );
};
