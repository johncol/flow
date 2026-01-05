import { Table, Text } from "@radix-ui/themes";
import { formatDate } from "~/utils/dates/formatting";
import { dueDateText } from "./tasks-table.css";

type DueDateCellProps = {
  dueDate: Date;
} & Table.CellProps;

export const DueDateCell: React.FC<DueDateCellProps> = ({
  dueDate,
  ...props
}) => {
  return (
    <Table.Cell {...props}>
      <Text className={dueDateText}>{formatDate(dueDate)}</Text>
    </Table.Cell>
  );
};
