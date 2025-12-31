import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";
import type { Task } from "~/types/tasks";

type NewTaskInput = {
  title: string;
  dueDate: Date;
};

type NewTaskContextValue = {
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
  saveTask: (input: NewTaskInput) => void;
};

const NewTaskContext = createContext<NewTaskContextValue | null>(null);

type NewTaskProviderProps = PropsWithChildren<{
  addTask: (task: Task) => void;
}>;

export const NewTaskProvider: React.FC<NewTaskProviderProps> = ({
  addTask,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const saveTask = (input: NewTaskInput) => {
    const newTask: Task = {
      id: "t_" + crypto.randomUUID(),
      title: input.title,
      dueDate: input.dueDate,
      status: "pending",
      createdAt: new Date(),
      userId: "u_0001",
    };

    addTask(newTask);
    closeDialog();
  };

  const context: NewTaskContextValue = {
    isOpen,
    openDialog,
    closeDialog,
    saveTask,
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

