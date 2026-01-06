import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Task } from "~/types/tasks";
import { useStatusFilter } from "./use-status-filter";
import { createMockTask } from "~/utils/testing/tasks";

describe("useStatusFilter", () => {
  const tasks: Task[] = [
    createMockTask({ id: "1", status: "pending" }),
    createMockTask({ id: "2", status: "in-progress" }),
    createMockTask({ id: "3", status: "completed" }),
    createMockTask({ id: "4", status: "pending" }),
  ];

  describe("initial state", () => {
    it("initializes with status set to 'all'", () => {
      const { result } = renderHook(() => useStatusFilter(tasks));

      expect(result.current.filter.status).toBe("all");
    });

    it("returns all tasks when status is 'all'", () => {
      const { result } = renderHook(() => useStatusFilter(tasks));

      expect(result.current.filteredTasks).toEqual(tasks);
    });
  });

  describe("filtering by status", () => {
    it("filters tasks by 'pending' status", () => {
      const { result } = renderHook(() => useStatusFilter(tasks));

      act(() => {
        result.current.filter.setStatus("pending");
      });

      expect(result.current.filteredTasks).toHaveLength(2);
      expect(result.current.filteredTasks.every((t) => t.status === "pending")).toBe(true);
    });

    it("filters tasks by 'in-progress' status", () => {
      const { result } = renderHook(() => useStatusFilter(tasks));

      act(() => {
        result.current.filter.setStatus("in-progress");
      });

      expect(result.current.filteredTasks).toHaveLength(1);
      expect(result.current.filteredTasks[0].status).toBe("in-progress");
    });

    it("filters tasks by 'completed' status", () => {
      const { result } = renderHook(() => useStatusFilter(tasks));

      act(() => {
        result.current.filter.setStatus("completed");
      });

      expect(result.current.filteredTasks).toHaveLength(1);
      expect(result.current.filteredTasks[0].status).toBe("completed");
    });

    it("returns all tasks when status is changed back to 'all'", () => {
      const { result } = renderHook(() => useStatusFilter(tasks));

      act(() => {
        result.current.filter.setStatus("pending");
      });
      expect(result.current.filteredTasks).toHaveLength(2);

      act(() => {
        result.current.filter.setStatus("all");
      });
      expect(result.current.filteredTasks).toEqual(tasks);
    });
  });

  describe("setStatus", () => {
    it("updates the filter status", () => {
      const { result } = renderHook(() => useStatusFilter(tasks));

      act(() => {
        result.current.filter.setStatus("completed");
      });

      expect(result.current.filter.status).toBe("completed");
    });
  });

  describe("empty cases", () => {
    it("returns empty array when no tasks match the filter", () => {
      const pendingOnly = [createMockTask({ id: "1", status: "pending" })];
      const { result } = renderHook(() => useStatusFilter(pendingOnly));

      act(() => {
        result.current.filter.setStatus("completed");
      });

      expect(result.current.filteredTasks).toEqual([]);
    });

    it("handles empty tasks array", () => {
      const { result } = renderHook(() => useStatusFilter([]));

      expect(result.current.filteredTasks).toEqual([]);

      act(() => {
        result.current.filter.setStatus("pending");
      });

      expect(result.current.filteredTasks).toEqual([]);
    });
  });
});
