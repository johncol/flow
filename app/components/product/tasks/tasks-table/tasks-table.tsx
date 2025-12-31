import { Skeleton, Strong, Table, Text } from "@radix-ui/themes";
import { useTasks } from "~/components/product/tasks/tasks-context";
import { Badge } from "~/components/ui/badge/badge";
import { SelectionCell } from "./bulk-select/selection-cell";
import { SelectionHeaderCell } from "./bulk-select/selection-header-cell";
import { DueDateCell } from "./due-date-cell";
import { HeaderCell } from "./header-cell";
import { StatusCell } from "./status-cell";
import { emptyTableCell, tableTitle } from "./tasks-table.css";

export const TasksTable = () => {
  const { tasks, tasksLoading } = useTasks();

  return (
    <Table.Root>
      <TableHeader />
      {tasksLoading ? <TasksTableBodySkeleton /> : null}
      {!tasksLoading && tasks.length === 0 ? <EmptyTableBody /> : null}
      {!tasksLoading && tasks.length > 0 ? <TasksTableBody /> : null}
    </Table.Root>
  );
};

const TableHeader = () => {
  return (
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
  );
};

const TasksTableBody = () => {
  const { tasks } = useTasks();

  return (
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
  );
};

const EmptyTableBody = () => {
  return (
    <Table.Body>
      <Table.Row>
        <Table.Cell colSpan={4} className={emptyTableCell}>
          <Text align="center" as="p" color="gray">
            No tasks around here. <br /> Use the <Strong>Add new task</Strong>{" "}
            button in the top right corner to create your first task.
          </Text>
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  );
};

const SKELETON_ROWS = 3;

const TasksTableBodySkeleton = () => {
  return (
    <Table.Body>
      {Array.from({ length: SKELETON_ROWS }).map((_, index) => (
        <Table.Row key={index}>
          <Table.Cell>
            <Skeleton width="16px" height="16px" />
          </Table.Cell>
          <Table.Cell>
            <Skeleton width="180px" height="20px" />
          </Table.Cell>
          <Table.Cell>
            <Skeleton width="80px" height="24px" />
          </Table.Cell>
          <Table.Cell>
            <Skeleton width="100px" height="20px" />
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  );
};
