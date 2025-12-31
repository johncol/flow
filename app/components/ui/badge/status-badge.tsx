import { Spinner, type BadgeProps } from "@radix-ui/themes";
import type { TaskStatus } from "~/types/tasks";
import { getStatusBadgeLabel } from "~/utils/status/getStatusLabel";
import { Badge } from "./badge";
import { statusBadge } from "./status-badge.css";

type StatusBadgeProps = {
  status: TaskStatus;
  isUpdating: boolean;
};

export const StatusBadge = ({ status, isUpdating }: StatusBadgeProps) => {
  return (
    <Badge color={StatusBadgeColor[status]} className={statusBadge}>
      {getStatusBadgeLabel(status)} {isUpdating ? <Spinner size="1" /> : null}
    </Badge>
  );
};

const StatusBadgeColor: Record<TaskStatus, BadgeProps["color"]> = {
  pending: "gray",
  "in-progress": "amber",
  completed: "grass",
};
