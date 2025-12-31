import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";

type TaskSelectionContextValue = {
  selectedIds: Set<string>;
  isSelected: (taskId: string) => boolean;
  toggle: (taskId: string) => void;
  toggleAll: () => void;
  clearSelection: () => void;
  allSelected: boolean;
  someSelected: boolean;
  isDisabledSelection: boolean;
  setIsDisabledSelection: (disabled: boolean) => void;
};

const TaskSelectionContext = createContext<TaskSelectionContextValue | null>(
  null
);

type TaskSelectionProviderProps = PropsWithChildren<{
  taskIds: string[];
}>;

export const TaskSelectionProvider: React.FC<TaskSelectionProviderProps> = ({
  taskIds,
  children,
}) => {
  const [isDisabledSelection, setIsDisabledSelection] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const isSelected = (taskId: string) => selectedIds.has(taskId);

  const toggle = (taskId: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(taskId)) {
        next.delete(taskId);
      } else {
        next.add(taskId);
      }
      return next;
    });
  };

  const toggleAll = () => {
    setSelectedIds((prev) => {
      const allSelected = taskIds.every((id) => prev.has(id));
      return allSelected ? new Set() : new Set(taskIds);
    });
  };

  const clearSelection = () => {
    setSelectedIds(new Set());
  };

  const allSelected =
    taskIds.length > 0 && taskIds.every((id) => selectedIds.has(id));
  const someSelected =
    taskIds.some((id) => selectedIds.has(id)) && !allSelected;

  const context = {
    selectedIds,
    isSelected,
    toggle,
    toggleAll,
    clearSelection,
    allSelected,
    someSelected,
    isDisabledSelection,
    setIsDisabledSelection,
  };

  return (
    <TaskSelectionContext.Provider value={context}>
      {children}
    </TaskSelectionContext.Provider>
  );
};

export const useTaskSelection = () => {
  const context = useContext(TaskSelectionContext);
  if (!context) {
    throw new Error(
      "useTaskSelection must be used within a TaskSelectionProvider"
    );
  }
  return context;
};
