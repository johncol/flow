import { Theme } from "@radix-ui/themes";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { AddTaskAction } from "./add-task-action";

const openDialog = vi.fn();

vi.mock("~/components/product/tasks/add-task-dialog/new-task-context", () => ({
  useNewTask: () => ({ openDialog }),
}));

describe("AddTaskAction", () => {
  beforeEach(() => {
    openDialog.mockClear();
  });

  it("renders the add task button", () => {
    render(
      <Theme>
        <AddTaskAction />
      </Theme>
    );

    expect(
      screen.getByRole("button", { name: /add new task/i })
    ).toBeInTheDocument();
  });

  it("calls openDialog when clicked", async () => {
    const user = userEvent.setup();

    render(
      <Theme>
        <AddTaskAction />
      </Theme>
    );

    await user.click(screen.getByRole("button", { name: /add new task/i }));

    expect(openDialog).toHaveBeenCalledTimes(1);
  });
});
