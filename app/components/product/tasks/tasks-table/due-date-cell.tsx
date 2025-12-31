import { Table, Text } from "@radix-ui/themes";
import { formatDate } from "~/utils/dates/formatting";
import { dueDateText } from "./tasks-table.css";

type DueDateCellProps = {
  dueDate: Date;
};

export const DueDateCell: React.FC<DueDateCellProps> = ({ dueDate }) => {
  return (
    <Table.Cell>
      <Text className={dueDateText}>{formatDate(dueDate)}</Text>
    </Table.Cell>
  );
};
