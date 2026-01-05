import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";
import type { NewTaskInput } from "~/types/tasks";

type NewTaskContextValue = {
  isDialogOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
  addTask: (input: NewTaskInput) => Promise<void>;
};

const NewTaskContext = createContext<NewTaskContextValue | null>(null);

type NewTaskProviderProps = PropsWithChildren<{
  addTask: (input: NewTaskInput) => Promise<void>;
}>;

export const NewTaskProvider: React.FC<NewTaskProviderProps> = ({
  addTask,
  children,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const context: NewTaskContextValue = {
    isDialogOpen,
    openDialog: () => setIsDialogOpen(true),
    closeDialog: () => setIsDialogOpen(false),
    addTask,
  };

  return (
    <NewTaskContext.Provider value={context}>
      {children}
    </NewTaskContext.Provider>
  );
};

export const useNewTask = () => {
  const context = useContext(NewTaskContext);
  if (!context) {
    throw new Error("useNewTask must be used within a NewTaskProvider");
  }
  return context;
};
