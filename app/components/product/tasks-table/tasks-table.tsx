import { Strong, Table, Text } from "@radix-ui/themes";
import { Badge } from "~/components/ui/badge/badge";
import { StatusBadge } from "~/components/ui/badge/status-badge";
import { useTasks } from "~/components/product/tasks-context";
import type { TaskStatus } from "~/types/tasks";
import { formatDate } from "~/utils/dates/formatting";
import { SelectionCell } from "./bulk-select/selection-cell";
import { SelectionHeaderCell } from "./bulk-select/selection-header-cell";
import { HeaderCell } from "./header-cell";
import { dueDateText, tableTitle } from "./tasks-table.css";

export const TasksTable = () => {
  const { tasks } = useTasks();

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <SelectionHeaderCell />
          <HeaderCell className={tableTitle}>
            <Text>Tasks</Text>
          </HeaderCell>
          <HeaderCell>
            <Badge color="gray" variant="surface">
              <Strong>Status</Strong>
            </Badge>
          </HeaderCell>
          <HeaderCell>
            <Text>Due Date</Text>
          </HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {tasks.map(({ id, title, dueDate, status }) => (
          <Table.Row key={id}>
            <SelectionCell id={id} title={title} />
            <Table.Cell>{title}</Table.Cell>
            <StatusCell status={status} />
            <DueDateCell dueDate={dueDate} />
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

const StatusCell: React.FC<{ status: TaskStatus }> = ({ status }) => {
  return (
    <Table.Cell>
      <StatusBadge status={status} />
    </Table.Cell>
  );
};

const DueDateCell: React.FC<{ dueDate: Date }> = ({ dueDate }) => {
  return (
    <Table.Cell>
      <Text className={dueDateText}>{formatDate(dueDate)}</Text>
    </Table.Cell>
  );
};
