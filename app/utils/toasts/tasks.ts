import { showErrorToast, showSuccessToast } from "~/components/ui/toast/toast";
import { DEFAULT_ERROR_MESSAGE } from "./utils";

export const notifyTasksLoadingFailed = () => {
  showErrorToast(
    "Something went wrong while loading tasks. Please refresh the page."
  );
};

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
  showErrorToast(DEFAULT_ERROR_MESSAGE);
};

export const notifyTasksDeletedFailed = (_count: number) => {
  showErrorToast(DEFAULT_ERROR_MESSAGE);
};
