import { showErrorToast, showSuccessToast } from "~/components/ui/toast/toast";

export const notifySignupWelcome = (name: string) => {
  showSuccessToast(`Welcome to Flow, ${name}!`);
};

export const notifyLoginWelcome = (name: string) => {
  showSuccessToast(`Welcome back, ${name}`);
};

export const notifyLoggedOutTasksSaved = (count: number) => {
  showSuccessToast(
    `${count} task${count > 1 ? "s" : ""} created while logged out were imported successfully`
  );
};

export const notifyLoggedOutTasksSaveFailed = () => {
  showErrorToast(`Failed to import tasks created while logged out`);
};
