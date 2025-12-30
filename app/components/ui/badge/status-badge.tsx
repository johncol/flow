import type { BadgeProps } from "@radix-ui/themes";
import type { TaskStatus } from "~/types/tasks";
import { Badge } from "./badge";
import { statusBadge } from "./status-badge.css";

type StatusBadgeProps = {
  status: TaskStatus;
};

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  return (
    <Badge color={StatusBadgeColor[status]} className={statusBadge}>
      {getStatusBadgeLabel(status)}
    </Badge>
  );
};

const StatusBadgeColor: Record<TaskStatus, BadgeProps["color"]> = {
  pending: "gray",
  "in-progress": "amber",
  completed: "grass",
};

const getStatusBadgeLabel = (status: TaskStatus): string => {
  const cleanedStatus = status.split("-").join(" ");
  return cleanedStatus;
};
