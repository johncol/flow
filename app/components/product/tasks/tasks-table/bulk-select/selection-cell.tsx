import { Checkbox, Table, VisuallyHidden } from "@radix-ui/themes";
import { selectionCell } from "./selection-header-cell.css";
import { useTaskSelection } from "./task-selection-context";

type SelectionCellProps = {
  id: string;
  title: string;
};

export const SelectionCell: React.FC<SelectionCellProps> = ({ id, title }) => {
  const { isSelected, toggle } = useTaskSelection();
  const checkboxId = `task-selection-${id}`;

  return (
    <Table.Cell className={selectionCell}>
      <VisuallyHidden>
        <label htmlFor={checkboxId}>Select {title}</label>
      </VisuallyHidden>
      <Checkbox
        id={checkboxId}
        checked={isSelected(id)}
        onCheckedChange={() => toggle(id)}
      />
    </Table.Cell>
  );
};
