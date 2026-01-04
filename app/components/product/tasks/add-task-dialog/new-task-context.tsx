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
  saveTask: (input: NewTaskInput) => Promise<void>;
  saveTaskFailed: boolean;
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
  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => {
    setIsDialogOpen(false);
    setSaveTaskFailed(false);
  };

  const [saveTaskFailed, setSaveTaskFailed] = useState(false);

  const saveTask = (input: NewTaskInput) => {
    return addTask(input)
      .then(() => setSaveTaskFailed(false))
      .catch((error) => {
        setSaveTaskFailed(true);
        throw error;
      });
  };

  const context: NewTaskContextValue = {
    isDialogOpen,
    openDialog,
    closeDialog,
    saveTask,
    saveTaskFailed,
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
