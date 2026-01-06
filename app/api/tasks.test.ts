import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import * as tasksStorage from "~/api/storage/tasks";
import type { NewTaskInput, Task } from "~/types/tasks";
import {
  restoreStorageMocks,
  setupStorageMocks,
} from "~/utils/testing/storage";
import {
  createTask,
  deleteTasks,
  fetchTasks,
  importTasks,
  updateTask,
} from "./tasks";
import * as utils from "./utils";

vi.mock("./utils", async () => {
  const actual = await vi.importActual("./utils");
  return {
    ...actual,
    delay: vi.fn().mockResolvedValue(undefined),
  };
});

describe("tasks API", () => {
  const userId = "user-123";
  const taskId = "task-test-456";

  const existingTask: Task = {
    id: "task-existing",
    title: "Existing Task",
    dueDate: new Date("2024-06-15"),
    status: "pending",
    createdAt: new Date("2024-01-01"),
    userId,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    setupStorageMocks();
    tasksStorage.saveTasks(userId, [existingTask]);
    vi.spyOn(utils, "generateTaskId").mockReturnValue(taskId);
  });

  afterEach(() => {
    restoreStorageMocks();
  });

  describe("fetchTasks", () => {
    it("returns tasks for the given user", async () => {
      const tasks = await fetchTasks(userId);

      expect(tasks).toEqual([existingTask]);
    });

    it("initializes empty tasks array if user has no tasks", async () => {
      const newUserId = "new-user";

      await fetchTasks(newUserId);

      expect(tasksStorage.getTasks(newUserId)).toEqual([]);
    });

    it("does not reinitialize tasks if user already has tasks", async () => {
      const saveSpy = vi.spyOn(tasksStorage, "saveTasks");

      await fetchTasks(userId);

      expect(saveSpy).not.toHaveBeenCalled();
    });
  });

  describe("createTask", () => {
    const newTaskInput: NewTaskInput = {
      title: "New Task",
      dueDate: new Date("2024-07-01"),
    };

    it("creates a new task with generated id and pending status", async () => {
      const task = await createTask(userId, newTaskInput);

      expect(task).toEqual({
        id: taskId,
        title: "New Task",
        dueDate: new Date("2024-07-01"),
        status: "pending",
        createdAt: expect.any(Date),
        userId,
      });
    });

    it("saves the new task to storage", async () => {
      await createTask(userId, newTaskInput);

      const tasks = tasksStorage.getTasks(userId);
      expect(tasks).toHaveLength(2);
      expect(tasks[1]).toMatchObject({
        id: taskId,
        title: "New Task",
      });
    });
  });

  describe("updateTask", () => {
    it("updates task with provided changes", async () => {
      const updates = { title: "Updated Title", status: "completed" as const };

      const updatedTask = await updateTask(userId, existingTask.id, updates);

      expect(updatedTask).toEqual({
        ...existingTask,
        title: "Updated Title",
        status: "completed",
      });
    });

    it("saves updated task to storage", async () => {
      const updates = { status: "in-progress" as const };

      await updateTask(userId, existingTask.id, updates);

      const tasks = tasksStorage.getTasks(userId);
      expect(tasks[0]).toMatchObject({
        id: existingTask.id,
        status: "in-progress",
      });
    });

    it("throws error when task is not found", async () => {
      await expect(updateTask(userId, "nonexistent-id", {})).rejects.toThrow(
        "Task with id nonexistent-id not found"
      );
    });
  });

  describe("deleteTasks", () => {
    it("removes tasks with matching ids", async () => {
      const taskIds = new Set([existingTask.id]);

      await deleteTasks(userId, taskIds);

      expect(tasksStorage.getTasks(userId)).toEqual([]);
    });

    it("keeps tasks that do not match the ids", async () => {
      const remainingTask: Task = {
        id: "task-remaining",
        title: "Remaining Task",
        dueDate: new Date("2024-06-20"),
        status: "pending",
        createdAt: new Date("2024-01-02"),
        userId,
      };
      tasksStorage.saveTasks(userId, [existingTask, remainingTask]);

      const taskIds = new Set([existingTask.id]);
      await deleteTasks(userId, taskIds);

      expect(tasksStorage.getTasks(userId)).toEqual([remainingTask]);
    });
  });

  describe("importTasks", () => {
    const importedTask: Task = {
      id: "task-imported-1",
      title: "Imported Task 1",
      dueDate: new Date("2024-08-01"),
      status: "pending",
      createdAt: new Date("2024-01-01"),
      userId,
    };
    it("merges imported tasks with existing tasks", async () => {
      const result = await importTasks(userId, [importedTask]);

      expect(result).toEqual([existingTask, importedTask]);
    });

    it("saves merged tasks to storage", async () => {
      await importTasks(userId, [importedTask]);

      expect(tasksStorage.getTasks(userId)).toEqual([
        existingTask,
        importedTask,
      ]);
    });

    it("initializes empty tasks array if user has no tasks", async () => {
      const newUserId = "new-user";

      await importTasks(newUserId, [importedTask]);

      expect(tasksStorage.getTasks(newUserId)).toEqual([importedTask]);
    });
  });
});
