import { render, screen } from "@testing-library/react";
import { StatusBadge } from "./status-badge";

describe("StatusBadge", () => {
  describe("status label", () => {
    it("displays 'Pending' for pending status", () => {
      render(<StatusBadge status="pending" isUpdating={false} />);

      expect(screen.getByText("Pending")).toBeInTheDocument();
    });

    it("displays 'In progress' for in-progress status", () => {
      render(<StatusBadge status="in-progress" isUpdating={false} />);

      expect(screen.getByText("In progress")).toBeInTheDocument();
    });

    it("displays 'Completed' for completed status", () => {
      render(<StatusBadge status="completed" isUpdating={false} />);

      expect(screen.getByText("Completed")).toBeInTheDocument();
    });
  });

  describe("updating indicator", () => {
    it("shows spinner when isUpdating is true", () => {
      const { container } = render(<StatusBadge status="pending" isUpdating={true} />);

      const spinner = container.querySelector(".rt-Spinner");
      expect(spinner).toBeInTheDocument();
    });

    it("does not show spinner when isUpdating is false", () => {
      const { container } = render(<StatusBadge status="pending" isUpdating={false} />);

      const spinner = container.querySelector(".rt-Spinner");
      expect(spinner).not.toBeInTheDocument();
    });
  });
});
