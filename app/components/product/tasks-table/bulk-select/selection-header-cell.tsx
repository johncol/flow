import { Checkbox, VisuallyHidden } from "@radix-ui/themes";
import { HeaderCell } from "../header-cell";
import { selectionCell } from "./selection-header-cell.css";
import { useTaskSelection } from "./task-selection-context";

export const SelectionHeaderCell: React.FC = () => {
  const { allSelected, someSelected, toggleAll } = useTaskSelection();

  return (
    <HeaderCell className={selectionCell}>
      <VisuallyHidden>
        <label htmlFor="select-all-tasks">Select all tasks</label>
      </VisuallyHidden>
      <Checkbox
        id="select-all-tasks"
        checked={someSelected ? "indeterminate" : allSelected}
        onCheckedChange={toggleAll}
      />
    </HeaderCell>
  );
};
