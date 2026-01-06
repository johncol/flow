import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ANONYMOUS } from "~/types/users";
import { useLoggedOutTasks } from "./use-logged-out-tasks";

vi.mock("~/api/tasks", () => ({
  fetchTasks: vi.fn(),
  importTasks: vi.fn(),
  deleteTasks: vi.fn(),
}));

vi.mock("~/utils/toasts/session", () => ({
  notifyLoggedOutTasksSaved: vi.fn(),
  notifyLoggedOutTasksSaveFailed: vi.fn(),
}));

import * as tasksApi from "~/api/tasks";
import { createMockTask } from "~/utils/testing/tasks";
import * as sessionToasts from "~/utils/toasts/session";

describe("useLoggedOutTasks", () => {
  const user = { id: "user-1", name: "John", email: "john@example.com" };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("saveTasksCreatedWhileLoggedOut", () => {
    it("returns 0 when there are no logged out tasks", async () => {
      vi.mocked(tasksApi.fetchTasks).mockResolvedValue([]);

      const { result } = renderHook(() => useLoggedOutTasks());
      const count = await result.current.saveTasksCreatedWhileLoggedOut(user);

      expect(count).toBe(0);
      expect(tasksApi.fetchTasks).toHaveBeenCalledWith(ANONYMOUS);
      expect(tasksApi.importTasks).not.toHaveBeenCalled();
      expect(tasksApi.deleteTasks).not.toHaveBeenCalled();
      expect(sessionToasts.notifyLoggedOutTasksSaved).not.toHaveBeenCalled();
    });

    it("imports tasks to the user and deletes anonymous tasks", async () => {
      const anonymousTasks = [
        createMockTask({ id: "task-1", title: "Task 1", userId: ANONYMOUS }),
        createMockTask({ id: "task-2", title: "Task 2", userId: ANONYMOUS }),
      ];
      vi.mocked(tasksApi.fetchTasks).mockResolvedValue(anonymousTasks);
      vi.mocked(tasksApi.importTasks).mockResolvedValue([]);
      vi.mocked(tasksApi.deleteTasks).mockResolvedValue();

      const { result } = renderHook(() => useLoggedOutTasks());
      const count = await result.current.saveTasksCreatedWhileLoggedOut(user);

      expect(count).toBe(2);
      expect(tasksApi.fetchTasks).toHaveBeenCalledWith(ANONYMOUS);
      expect(tasksApi.importTasks).toHaveBeenCalledWith(user.id, [
        { ...anonymousTasks[0], userId: user.id },
        { ...anonymousTasks[1], userId: user.id },
      ]);
      expect(tasksApi.deleteTasks).toHaveBeenCalledWith(
        ANONYMOUS,
        new Set(["task-1", "task-2"])
      );
    });

    it("shows success toast", async () => {
      const singleTask = [createMockTask({ id: "task-1", userId: ANONYMOUS })];
      vi.mocked(tasksApi.fetchTasks).mockResolvedValue(singleTask);
      vi.mocked(tasksApi.importTasks).mockResolvedValue([]);
      vi.mocked(tasksApi.deleteTasks).mockResolvedValue();

      const { result } = renderHook(() => useLoggedOutTasks());
      const count = await result.current.saveTasksCreatedWhileLoggedOut(user);

      expect(count).toBe(1);
      expect(sessionToasts.notifyLoggedOutTasksSaved).toHaveBeenCalledWith(1);
    });

    describe("error handling", () => {
      beforeEach(() => {
        vi.spyOn(console, "error").mockImplementation(() => {});
      });

      afterEach(() => {
        vi.restoreAllMocks();
      });

      it("returns 0 and shows error toast when fetching tasks fails", async () => {
        vi.mocked(tasksApi.fetchTasks).mockRejectedValue(
          new Error("Fetch error")
        );

        const { result } = renderHook(() => useLoggedOutTasks());
        const count = await result.current.saveTasksCreatedWhileLoggedOut(user);

        expect(count).toBe(0);
        expect(sessionToasts.notifyLoggedOutTasksSaveFailed).toHaveBeenCalled();
      });

      it("returns 0 and shows error toast when importing tasks fails", async () => {
        vi.mocked(tasksApi.fetchTasks).mockResolvedValue([
          createMockTask({ userId: ANONYMOUS }),
        ]);
        vi.mocked(tasksApi.importTasks).mockRejectedValue(
          new Error("Import failed")
        );

        const { result } = renderHook(() => useLoggedOutTasks());
        const count = await result.current.saveTasksCreatedWhileLoggedOut(user);

        expect(count).toBe(0);
        expect(sessionToasts.notifyLoggedOutTasksSaveFailed).toHaveBeenCalled();
        expect(sessionToasts.notifyLoggedOutTasksSaved).not.toHaveBeenCalled();
      });
    });
  });
});
