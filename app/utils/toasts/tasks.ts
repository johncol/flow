import { showSuccessToast } from "~/components/ui/toast/toast";

export const notifyTasksDeleted = (count: number) => {
  showSuccessToast(`${count} task${count > 1 ? "s" : ""} deleted`);
};

export const notifyTaskAdded = () => {
  showSuccessToast(`Task added successfully`);
};

export const notifyTaskUpdated = () => {
  showSuccessToast(`Task updated successfully`);
};
