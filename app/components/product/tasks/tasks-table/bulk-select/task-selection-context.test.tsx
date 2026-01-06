import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  TaskSelectionProvider,
  useTaskSelection,
} from "./task-selection-context";

describe("TaskSelectionContext", () => {
  describe("useTaskSelection", () => {
    it("throws when used outside TaskSelectionProvider", () => {
      const consoleError = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      expect(() => render(<TestConsumer />)).toThrow(
        "useTaskSelection must be used within a TaskSelectionProvider"
      );

      consoleError.mockRestore();
    });
  });

  describe("TaskSelectionProvider", () => {
    describe("initial state", () => {
      it("starts with no tasks selected", () => {
        render(
          <TaskSelectionProvider taskIds={["1", "2", "3"]}>
            <TestConsumer />
          </TaskSelectionProvider>
        );

        expect(screen.getByTestId("selected-count")).toHaveTextContent("0");
        expect(screen.getByTestId("all-selected")).toHaveTextContent("false");
        expect(screen.getByTestId("some-selected")).toHaveTextContent("false");
      });

      it("starts with selection enabled", () => {
        render(
          <TaskSelectionProvider taskIds={["1", "2"]}>
            <TestConsumer />
          </TaskSelectionProvider>
        );

        expect(screen.getByTestId("is-disabled")).toHaveTextContent("false");
      });
    });

    describe("isSelected", () => {
      it("returns false for unselected task", () => {
        render(
          <TaskSelectionProvider taskIds={["1", "2"]}>
            <TestConsumer />
          </TaskSelectionProvider>
        );

        expect(screen.getByTestId("is-selected-1")).toHaveTextContent("false");
        expect(screen.getByTestId("is-selected-2")).toHaveTextContent("false");
      });

      it("returns true for selected task", async () => {
        const user = userEvent.setup();

        render(
          <TaskSelectionProvider taskIds={["1", "2"]}>
            <TestConsumer />
          </TaskSelectionProvider>
        );

        await user.click(screen.getByTestId("toggle-1"));

        expect(screen.getByTestId("is-selected-1")).toHaveTextContent("true");
        expect(screen.getByTestId("is-selected-2")).toHaveTextContent("false");
      });
    });

    describe("toggle", () => {
      it("selects an unselected task", async () => {
        const user = userEvent.setup();

        render(
          <TaskSelectionProvider taskIds={["1", "2"]}>
            <TestConsumer />
          </TaskSelectionProvider>
        );

        await user.click(screen.getByTestId("toggle-1"));

        expect(screen.getByTestId("is-selected-1")).toHaveTextContent("true");
        expect(screen.getByTestId("selected-count")).toHaveTextContent("1");
      });

      it("deselects a selected task", async () => {
        const user = userEvent.setup();

        render(
          <TaskSelectionProvider taskIds={["1", "2"]}>
            <TestConsumer />
          </TaskSelectionProvider>
        );

        await user.click(screen.getByTestId("toggle-1"));
        expect(screen.getByTestId("is-selected-1")).toHaveTextContent("true");

        await user.click(screen.getByTestId("toggle-1"));
        expect(screen.getByTestId("is-selected-1")).toHaveTextContent("false");
        expect(screen.getByTestId("selected-count")).toHaveTextContent("0");
      });

      it("can select multiple tasks", async () => {
        const user = userEvent.setup();

        render(
          <TaskSelectionProvider taskIds={["1", "2", "3"]}>
            <TestConsumer />
          </TaskSelectionProvider>
        );

        await user.click(screen.getByTestId("toggle-1"));
        await user.click(screen.getByTestId("toggle-3"));

        expect(screen.getByTestId("is-selected-1")).toHaveTextContent("true");
        expect(screen.getByTestId("is-selected-2")).toHaveTextContent("false");
        expect(screen.getByTestId("is-selected-3")).toHaveTextContent("true");
        expect(screen.getByTestId("selected-count")).toHaveTextContent("2");
      });
    });

    describe("toggleAll", () => {
      it("selects all tasks when none are selected", async () => {
        const user = userEvent.setup();

        render(
          <TaskSelectionProvider taskIds={["1", "2", "3"]}>
            <TestConsumer />
          </TaskSelectionProvider>
        );

        await user.click(screen.getByText("Toggle All"));

        expect(screen.getByTestId("is-selected-1")).toHaveTextContent("true");
        expect(screen.getByTestId("is-selected-2")).toHaveTextContent("true");
        expect(screen.getByTestId("is-selected-3")).toHaveTextContent("true");
        expect(screen.getByTestId("all-selected")).toHaveTextContent("true");
      });

      it("selects all tasks when some are selected", async () => {
        const user = userEvent.setup();

        render(
          <TaskSelectionProvider taskIds={["1", "2", "3"]}>
            <TestConsumer />
          </TaskSelectionProvider>
        );

        await user.click(screen.getByTestId("toggle-1"));
        expect(screen.getByTestId("some-selected")).toHaveTextContent("true");

        await user.click(screen.getByText("Toggle All"));

        expect(screen.getByTestId("is-selected-1")).toHaveTextContent("true");
        expect(screen.getByTestId("is-selected-2")).toHaveTextContent("true");
        expect(screen.getByTestId("is-selected-3")).toHaveTextContent("true");
        expect(screen.getByTestId("all-selected")).toHaveTextContent("true");
      });

      it("deselects all tasks when all are selected", async () => {
        const user = userEvent.setup();

        render(
          <TaskSelectionProvider taskIds={["1", "2", "3"]}>
            <TestConsumer />
          </TaskSelectionProvider>
        );

        await user.click(screen.getByText("Toggle All"));
        expect(screen.getByTestId("all-selected")).toHaveTextContent("true");

        await user.click(screen.getByText("Toggle All"));

        expect(screen.getByTestId("is-selected-1")).toHaveTextContent("false");
        expect(screen.getByTestId("is-selected-2")).toHaveTextContent("false");
        expect(screen.getByTestId("is-selected-3")).toHaveTextContent("false");
        expect(screen.getByTestId("selected-count")).toHaveTextContent("0");
      });
    });
  });
});

const TestConsumer = () => {
  const {
    selectedIds,
    isSelected,
    toggle,
    toggleAll,
    allSelected,
    someSelected,
    isDisabledSelection,
    setIsDisabledSelection,
  } = useTaskSelection();

  return (
    <div>
      <span data-testid="selected-count">{selectedIds.size}</span>
      <span data-testid="all-selected">{String(allSelected)}</span>
      <span data-testid="some-selected">{String(someSelected)}</span>
      <span data-testid="is-disabled">{String(isDisabledSelection)}</span>

      <span data-testid="is-selected-1">{String(isSelected("1"))}</span>
      <span data-testid="is-selected-2">{String(isSelected("2"))}</span>
      <span data-testid="is-selected-3">{String(isSelected("3"))}</span>

      <button data-testid="toggle-1" onClick={() => toggle("1")}>
        Toggle 1
      </button>
      <button data-testid="toggle-2" onClick={() => toggle("2")}>
        Toggle 2
      </button>
      <button data-testid="toggle-3" onClick={() => toggle("3")}>
        Toggle 3
      </button>
      <button onClick={toggleAll}>Toggle All</button>
      <button onClick={() => setIsDisabledSelection(true)}>
        Disable Selection
      </button>
      <button onClick={() => setIsDisabledSelection(false)}>
        Enable Selection
      </button>
    </div>
  );
};
