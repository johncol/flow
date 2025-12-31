import { Strong, Table, Text } from "@radix-ui/themes";
import { useTasks } from "~/components/product/tasks-context";
import { Badge } from "~/components/ui/badge/badge";
import { formatDate } from "~/utils/dates/formatting";
import { SelectionCell } from "./bulk-select/selection-cell";
import { SelectionHeaderCell } from "./bulk-select/selection-header-cell";
import { HeaderCell } from "./header-cell";
import { StatusCell } from "./status-cell";
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
            <StatusCell taskId={id} status={status} />
            <DueDateCell dueDate={dueDate} />
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

const DueDateCell: React.FC<{ dueDate: Date }> = ({ dueDate }) => {
  return (
    <Table.Cell>
      <Text className={dueDateText}>{formatDate(dueDate)}</Text>
    </Table.Cell>
  );
};
