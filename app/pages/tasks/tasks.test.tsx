import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import * as tasksStorage from "~/api/storage/tasks";
import {
  createMockAuthContext,
  renderWithProviders,
} from "~/utils/testing/render-with-providers";
import { createMockSession } from "~/utils/testing/session";
import {
  restoreStorageMocks,
  setupStorageMocks,
} from "~/utils/testing/storage";
import { createMockTask } from "~/utils/testing/tasks";
import { Tasks } from "./tasks";

vi.mock("~/utils/toasts/tasks", () => ({
  notifyTaskAdded: vi.fn(),
  notifyTasksLoadingFailed: vi.fn(),
}));

vi.mock("./utils", async () => {
  const actual = await vi.importActual("./utils");
  return {
    ...actual,
    delay: vi.fn().mockResolvedValue(undefined),
  };
});

describe("Tasks", () => {
  const session = createMockSession();
  const userId = session.user.id;

  beforeEach(() => {
    setupStorageMocks();
  });

  afterEach(() => {
    restoreStorageMocks();
  });

  describe("rendering", () => {
    it("renders the header with logo", async () => {
      renderTasks();

      await waitForTasksToLoad();

      expect(screen.getByAltText("Flow")).toBeInTheDocument();
    });

    it("renders the task status filter", async () => {
      renderTasks();

      await waitForTasksToLoad();

      expect(screen.getByText("Status:")).toBeInTheDocument();
    });

    it("renders the add new task button", async () => {
      renderTasks();

      await waitForTasksToLoad();

      expect(
        screen.getByRole("button", { name: /add new task/i })
      ).toBeInTheDocument();
    });

    it("renders the tasks table header", async () => {
      renderTasks();

      await waitForTasksToLoad();

      expect(screen.getByText("Tasks")).toBeInTheDocument();
      expect(screen.getByText("Status")).toBeInTheDocument();
      expect(screen.getByText("Due Date")).toBeInTheDocument();
    });
  });

  describe("loading state", () => {
    it("shows loading skeletons while fetching tasks", () => {
      renderTasks();

      const skeletons = document.querySelectorAll(".rt-Skeleton");
      expect(skeletons.length).toBeGreaterThan(0);
    });

    it("removes loading skeletons after tasks are loaded", async () => {
      renderTasks();

      await waitForTasksToLoad();

      const skeletons = document.querySelectorAll(".rt-Skeleton");
      expect(skeletons.length).toBe(0);
    });
  });

  describe("empty state", () => {
    it("shows empty state message when there are no tasks", async () => {
      renderTasks();

      await waitForTasksToLoad();

      expect(screen.getByText(/no tasks around here/i)).toBeInTheDocument();
      expect(
        screen.getByText(/button in the top right corner to create your first task/i)
      ).toBeInTheDocument();
    });
  });

  describe("with existing tasks", () => {
    it("displays tasks from storage", async () => {
      const tasks = [
        createMockTask({ id: "1", title: "First task", userId }),
        createMockTask({ id: "2", title: "Second task", userId }),
      ];
      tasksStorage.saveTasks(userId, tasks);

      renderTasks();

      await waitFor(() => {
        expect(screen.getByText("First task")).toBeInTheDocument();
        expect(screen.getByText("Second task")).toBeInTheDocument();
      });
    });

    it("shows status for each task", async () => {
      const tasks = [
        createMockTask({ id: "1", title: "Pending task", status: "pending", userId }),
        createMockTask({ id: "2", title: "Completed task", status: "completed", userId }),
      ];
      tasksStorage.saveTasks(userId, tasks);

      renderTasks();

      await waitFor(() => {
        expect(screen.getByText("Pending")).toBeInTheDocument();
        expect(screen.getByText("Completed")).toBeInTheDocument();
      });
    });
  });

  describe("add task dialog", () => {
    it("opens add task dialog when clicking add button", async () => {
      const user = userEvent.setup();
      renderTasks();

      await waitForTasksToLoad();

      await user.click(screen.getByRole("button", { name: /add new task/i }));

      expect(screen.getByText("Add New Task")).toBeInTheDocument();
      expect(
        screen.getByText(/create a new task by filling out the form below/i)
      ).toBeInTheDocument();
    });

    it("creates a new task when form is submitted", async () => {
      const user = userEvent.setup();
      renderTasks();

      await waitForTasksToLoad();

      await user.click(screen.getByRole("button", { name: /add new task/i }));

      const dialog = screen.getByRole("dialog");
      await user.type(
        within(dialog).getByPlaceholderText("e.g. Write blog post"),
        "My new task"
      );
      await user.type(within(dialog).getByLabelText("Due Date"), "2026-01-15");
      await user.click(
        within(dialog).getByRole("button", { name: /create task/i })
      );

      await waitFor(() => {
        expect(screen.getByText("My new task")).toBeInTheDocument();
      });
    });
  });

  describe("user session", () => {
    it("shows user menu when logged in", async () => {
      renderTasks();

      await waitForTasksToLoad();

      expect(screen.getByText(session.user.name)).toBeInTheDocument();
    });

    it("shows sign-in CTA when not logged in", async () => {
      const authContext = createMockAuthContext({ isLoggedIn: false });
      renderWithProviders(<Tasks />, { authContext });

      await waitForTasksToLoad();

      expect(
        screen.getByText(/don't lose your progress/i)
      ).toBeInTheDocument();
    });
  });

  const renderTasks = () => {
    const authContext = createMockAuthContext({
      isLoggedIn: true,
      session,
      userId,
    });
    return renderWithProviders(<Tasks />, { authContext });
  };

  const waitForTasksToLoad = async () => {
    await waitFor(() => {
      const skeletons = document.querySelectorAll(".rt-Skeleton");
      expect(skeletons.length).toBe(0);
    });
  };
});
