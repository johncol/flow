import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";
import type { Task } from "~/types/tasks";
import { MOCK_USER_ID } from "../../../../utils/mocks/mock-user";

type NewTaskInput = {
  title: string;
  dueDate: Date;
};

type NewTaskContextValue = {
  isDialogOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
  saveTask: (input: NewTaskInput) => Promise<void>;
  saveTaskFailed: boolean;
};

const NewTaskContext = createContext<NewTaskContextValue | null>(null);

type NewTaskProviderProps = PropsWithChildren<{
  addTask: (task: Task) => Promise<void>;
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
    const newTask: Task = {
      id: "t_" + crypto.randomUUID(),
      title: input.title,
      dueDate: input.dueDate,
      status: "pending",
      createdAt: new Date(),
      userId: MOCK_USER_ID,
    };

    return addTask(newTask)
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
