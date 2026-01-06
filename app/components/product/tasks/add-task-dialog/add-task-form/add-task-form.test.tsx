import { Theme } from "@radix-ui/themes";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import type { NewTaskInput } from "~/types/tasks";
import { NewTaskProvider } from "../new-task-context";
import { AddTaskForm } from "./add-task-form";

const notifyTaskAdded = vi.fn();
vi.mock("~/utils/toasts/tasks", () => ({
  notifyTaskAdded: () => notifyTaskAdded(),
}));

describe("AddTaskForm", () => {
  beforeEach(() => {
    notifyTaskAdded.mockClear();
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("rendering", () => {
    it("renders task title input", () => {
      renderAddTaskForm();

      expect(screen.getByText("Task Title")).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("e.g. Write blog post")
      ).toBeInTheDocument();
    });

    it("renders due date input", () => {
      renderAddTaskForm();

      expect(screen.getByText("Due Date")).toBeInTheDocument();
    });

    it("renders create task button", () => {
      renderAddTaskForm();

      expect(
        screen.getByRole("button", { name: /create task/i })
      ).toBeInTheDocument();
    });

    it("renders cancel button", () => {
      renderAddTaskForm();

      expect(
        screen.getByRole("button", { name: /cancel/i })
      ).toBeInTheDocument();
    });

    it("marks title field as required", () => {
      renderAddTaskForm();

      expect(
        screen.getByPlaceholderText("e.g. Write blog post")
      ).toBeRequired();
    });

    it("marks due date field as required", () => {
      renderAddTaskForm();

      const dueDateInput = screen.getByLabelText("Due Date");
      expect(dueDateInput).toBeRequired();
    });
  });

  describe("form interaction", () => {
    it("allows entering task title", async () => {
      const user = userEvent.setup();
      renderAddTaskForm();

      const titleInput = screen.getByPlaceholderText("e.g. Write blog post");
      await user.type(titleInput, "My new task");

      expect(titleInput).toHaveValue("My new task");
    });

    it("allows entering due date", async () => {
      const user = userEvent.setup();
      renderAddTaskForm();

      const dueDateInput = screen.getByLabelText("Due Date");
      await user.type(dueDateInput, "2026-01-15");

      expect(dueDateInput).toHaveValue("2026-01-15");
    });

    it("focuses due date field when pressing enter on title field", async () => {
      const user = userEvent.setup();
      renderAddTaskForm();

      const titleInput = screen.getByPlaceholderText("e.g. Write blog post");
      await user.type(titleInput, "My task");
      await user.keyboard("{Enter}");

      expect(screen.getByLabelText("Due Date")).toHaveFocus();
    });
  });

  describe("validation", () => {
    it("does not call addTask when title is empty", async () => {
      const user = userEvent.setup();
      const addTask = vi.fn();
      renderAddTaskForm(addTask);

      const dueDateInput = screen.getByLabelText("Due Date");
      await user.type(dueDateInput, "2026-01-15");
      await user.click(screen.getByRole("button", { name: /create task/i }));

      expect(addTask).not.toHaveBeenCalled();
    });

    it("does not call addTask when due date is empty", async () => {
      const user = userEvent.setup();
      const addTask = vi.fn();
      renderAddTaskForm(addTask);

      const titleInput = screen.getByPlaceholderText("e.g. Write blog post");
      await user.type(titleInput, "My task");
      await user.click(screen.getByRole("button", { name: /create task/i }));

      expect(addTask).not.toHaveBeenCalled();
    });
  });

  describe("successful submission", () => {
    it("calls addTask with title and due date", async () => {
      const user = userEvent.setup();
      const addTask = vi.fn().mockResolvedValue(undefined);
      renderAddTaskForm(addTask);

      await user.type(
        screen.getByPlaceholderText("e.g. Write blog post"),
        "My new task"
      );
      await user.type(screen.getByLabelText("Due Date"), "2026-01-15");
      await user.click(screen.getByRole("button", { name: /create task/i }));

      await waitFor(() => {
        expect(addTask).toHaveBeenCalledWith({
          title: "My new task",
          dueDate: new Date("2026-01-15"),
        });
      });
    });

    it("trims title before calling addTask", async () => {
      const user = userEvent.setup();
      const addTask = vi.fn().mockResolvedValue(undefined);
      renderAddTaskForm(addTask);

      await user.type(
        screen.getByPlaceholderText("e.g. Write blog post"),
        "  My task with spaces  "
      );
      await user.type(screen.getByLabelText("Due Date"), "2026-01-15");
      await user.click(screen.getByRole("button", { name: /create task/i }));

      await waitFor(() => {
        expect(addTask).toHaveBeenCalledWith({
          title: "My task with spaces",
          dueDate: new Date("2026-01-15"),
        });
      });
    });

    it("shows success notification", async () => {
      const user = userEvent.setup();
      const addTask = vi.fn().mockResolvedValue(undefined);
      renderAddTaskForm(addTask);

      await user.type(
        screen.getByPlaceholderText("e.g. Write blog post"),
        "My task"
      );
      await user.type(screen.getByLabelText("Due Date"), "2026-01-15");
      await user.click(screen.getByRole("button", { name: /create task/i }));

      await waitFor(() => {
        expect(notifyTaskAdded).toHaveBeenCalled();
      });
    });
  });

  describe("failed submission", () => {
    it("shows error message when addTask throws", async () => {
      const user = userEvent.setup();
      const addTask = vi.fn().mockRejectedValue(new Error("Network error"));
      renderAddTaskForm(addTask);

      await user.type(
        screen.getByPlaceholderText("e.g. Write blog post"),
        "My task"
      );
      await user.type(screen.getByLabelText("Due Date"), "2026-01-15");
      await user.click(screen.getByRole("button", { name: /create task/i }));

      await waitFor(() => {
        expect(
          screen.getByText("Something went wrong. Please try again.")
        ).toBeInTheDocument();
      });
    });
  });
});

const renderAddTaskForm = (
  addTask: (input: NewTaskInput) => Promise<void> = vi.fn()
) => {
  return render(
    <Theme>
      <NewTaskProvider addTask={addTask}>
        <AddTaskForm />
      </NewTaskProvider>
    </Theme>
  );
};
