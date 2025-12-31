import { showErrorToast, showSuccessToast } from "~/components/ui/toast/toast";

export const notifyTaskAdded = () => {
  showSuccessToast(`Task added successfully`);
};

export const notifyTaskUpdated = () => {
  showSuccessToast(`Task updated successfully`);
};

export const notifyTasksDeleted = (count: number) => {
  showSuccessToast(`${count} task${count > 1 ? "s" : ""} deleted`);
};

export const notifyTaskUpdatedFailed = () => {
  showErrorToast(`Failed to update task`);
};

export const notifyTasksDeletedFailed = (count: number) => {
  showErrorToast(`Failed to delete task${count > 1 ? "s" : ""}`);
};
