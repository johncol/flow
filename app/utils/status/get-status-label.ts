import type { TaskStatus } from "~/types/tasks";

export const getStatusLabel = (status: TaskStatus): string => {
  const cleanedStatus = status.split("-").join(" ");
  return cleanedStatus.charAt(0).toUpperCase() + cleanedStatus.slice(1);
};
