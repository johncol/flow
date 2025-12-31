import { Table } from "@radix-ui/themes";
import { tableHeaderCell } from "./tasks-table.css";

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
