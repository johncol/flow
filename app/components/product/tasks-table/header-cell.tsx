import { Table, Text } from "@radix-ui/themes";
import { Badge } from "~/components/ui/badge/badge";
import { StatusBadge } from "~/components/ui/badge/status-badge";
import { formatDate } from "~/utils/dates/formatting";
import { tasks } from "./mock-tasks";
import { dueDateText, tableHeaderCell, tableTitle } from "./tasks-table.css";

export const HeaderCell: React.FC<Table.ColumnHeaderCellProps> = ({
  className,
  ...props
}) => {
  return (
    <Table.ColumnHeaderCell
      {...props}
      className={`${tableHeaderCell} ${className}`}
    />
  );
};