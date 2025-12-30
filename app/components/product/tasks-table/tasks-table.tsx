import { Strong, Table, Text } from "@radix-ui/themes";
import { Badge } from "~/components/ui/badge/badge";
import { StatusBadge } from "~/components/ui/badge/status-badge";
import type { TaskStatus } from "~/types/tasks";
import { formatDate } from "~/utils/dates/formatting";
import { HeaderCell } from "./header-cell";
import { tasks } from "./mock-tasks";
import { dueDateText, tableTitle } from "./tasks-table.css";

export const TasksTable = () => {
  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
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
            <Table.Cell>{title}</Table.Cell>
            <StatusCell status={status} />
            <DueDateCell dueDate={dueDate} />
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

const StatusCell = ({ status }: { status: TaskStatus }) => {
  return (
    <Table.Cell>
      <StatusBadge status={status} />
    </Table.Cell>
  );
};

const DueDateCell = ({ dueDate }: { dueDate: Date }) => {
  return (
    <Table.Cell>
      <Text className={dueDateText}>{formatDate(dueDate)}</Text>
    </Table.Cell>
  );
};
