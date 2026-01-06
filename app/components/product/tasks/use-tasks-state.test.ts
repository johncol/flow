import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { NewTaskInput } from "~/types/tasks";
import { createMockTask } from "~/utils/testing/tasks";
import { useTasksState } from "./use-tasks-state";

import * as tasksApi from "~/api/tasks";
import { useSession } from "../session/auth-context";

vi.mock("~/api/tasks", () => ({
  fetchTasks: vi.fn(),
  createTask: vi.fn(),
  updateTask: vi.fn(),
  deleteTasks: vi.fn(),
}));

vi.mock("../session/auth-context", () => ({
  useSession: vi.fn(),
}));

describe("useTasksState", () => {
  const userId = "user-123";

  beforeEach(() => {
    vi.mocked(useSession).mockReturnValue({
      userId,
      isLoggedIn: true,
      session: null,
      login: vi.fn(),
      signup: vi.fn(),
      logout: vi.fn(),
    });
    vi.mocked(tasksApi.fetchTasks).mockResolvedValue([]);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("initial state", () => {
    it("starts with loading state true and becomes false after fetch", async () => {
      const { result } = renderHook(() => useTasksState());

      expect(result.current.tasksLoading).toBe(true);

      await waitFor(() => {
        expect(result.current.tasksLoading).toBe(false);
      });
    });

    it("starts with empty tasks array", async () => {
      const { result } = renderHook(() => useTasksState());

      expect(result.current.tasks).toEqual([]);

      await waitFor(() => {
        expect(result.current.tasksLoading).toBe(false);
      });
    });

    it("starts with errorLoadingTasks false", async () => {
      const { result } = renderHook(() => useTasksState());

      expect(result.current.errorLoadingTasks).toBe(false);

      await waitFor(() => {
        expect(result.current.tasksLoading).toBe(false);
      });
    });
  });

  describe("fetching tasks on mount", () => {
    it("fetches tasks for the current user on mount", async () => {
      renderHook(() => useTasksState());

      await waitFor(() => {
        expect(tasksApi.fetchTasks).toHaveBeenCalledWith(userId);
      });
    });

    it("sets loading to false after fetching tasks", async () => {
      const { result } = renderHook(() => useTasksState());

      await waitFor(() => {
        expect(result.current.tasksLoading).toBe(false);
      });
    });

    it("populates tasks after successful fetch", async () => {
      const tasks = [
        createMockTask({ id: "1", title: "Task 1" }),
        createMockTask({ id: "2", title: "Task 2" }),
      ];
      vi.mocked(tasksApi.fetchTasks).mockResolvedValue(tasks);

      const { result } = renderHook(() => useTasksState());

      await waitFor(() => {
        expect(result.current.tasks).toEqual(tasks);
      });
    });
  });

  describe("error handling", () => {
    beforeEach(() => {
      vi.spyOn(console, "error").mockImplementation(() => {});
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("sets errorLoadingTasks to true when fetch fails", async () => {
      vi.mocked(tasksApi.fetchTasks).mockRejectedValue(
        new Error("Fetch error")
      );

      const { result } = renderHook(() => useTasksState());

      await waitFor(() => {
        expect(result.current.errorLoadingTasks).toBe(true);
      });
    });

    it("sets loading to false when fetch fails", async () => {
      vi.mocked(tasksApi.fetchTasks).mockRejectedValue(
        new Error("Fetch error")
      );

      const { result } = renderHook(() => useTasksState());

      await waitFor(() => {
        expect(result.current.tasksLoading).toBe(false);
      });
    });
  });

  describe("addTask", () => {
    it("calls createTask API with userId and input and adds the created task to the tasks list", async () => {
      const newTask = createMockTask({ id: "new-1", title: "New Task" });
      vi.mocked(tasksApi.createTask).mockResolvedValue(newTask);

      const { result } = renderHook(() => useTasksState());
      await waitFor(() => expect(result.current.tasksLoading).toBe(false));

      const input: NewTaskInput = {
        title: "New Task",
        dueDate: new Date("2025-02-01"),
      };
      await act(async () => {
        await result.current.addTask(input);
      });

      expect(tasksApi.createTask).toHaveBeenCalledWith(userId, input);
      expect(result.current.tasks).toContainEqual(newTask);
    });
  });

  describe("deleteTasks", () => {
    it("calls deleteTasks API with userId and task ids and removes the deleted tasks from the tasks list", async () => {
      const tasks = [
        createMockTask({ id: "1", title: "Task 1" }),
        createMockTask({ id: "2", title: "Task 2" }),
      ];
      vi.mocked(tasksApi.fetchTasks).mockResolvedValue(tasks);
      vi.mocked(tasksApi.deleteTasks).mockResolvedValue();

      const { result } = renderHook(() => useTasksState());
      await waitFor(() => expect(result.current.tasksLoading).toBe(false));

      const idsToDelete = new Set(["1"]);
      await act(async () => {
        await result.current.deleteTasks(idsToDelete);
      });

      expect(tasksApi.deleteTasks).toHaveBeenCalledWith(userId, idsToDelete);
      expect(result.current.tasks).toHaveLength(1);
      expect(result.current.tasks[0].id).toBe("2");
    });
  });

  describe("updateTask", () => {
    it("calls updateTask API and only updates the specified task", async () => {
      const tasks = [
        createMockTask({ id: "1", title: "Task 1", status: "pending" }),
        createMockTask({ id: "2", title: "Task 2", status: "pending" }),
      ];
      vi.mocked(tasksApi.fetchTasks).mockResolvedValue(tasks);
      vi.mocked(tasksApi.updateTask).mockResolvedValue({
        ...tasks[0],
        status: "completed",
      });

      const { result } = renderHook(() => useTasksState());
      await waitFor(() => expect(result.current.tasksLoading).toBe(false));

      await act(async () => {
        await result.current.updateTask("1", { status: "completed" });
      });

      expect(tasksApi.updateTask).toHaveBeenCalledWith(userId, "1", {
        status: "completed",
      });

      expect(result.current.tasks[0].status).toBe("completed");
      expect(result.current.tasks[1].status).toBe("pending");
    });
  });
});
