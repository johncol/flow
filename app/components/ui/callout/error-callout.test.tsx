import { render, screen } from "@testing-library/react";
import { ErrorCallout } from "./error-callout";

describe("ErrorCallout", () => {
  describe("visibility", () => {
    it("renders content when visibleIf is true", () => {
      render(<ErrorCallout content="Something went wrong" visibleIf={true} />);

      expect(screen.getByRole("alert")).toBeInTheDocument();
      expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    });

    it("does not render when visibleIf is false", () => {
      render(<ErrorCallout content="Something went wrong" visibleIf={false} />);

      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
      expect(screen.queryByText("Something went wrong")).not.toBeInTheDocument();
    });
  });

  describe("content", () => {
    it("renders string content", () => {
      render(<ErrorCallout content="Error message" visibleIf={true} />);

      expect(screen.getByText("Error message")).toBeInTheDocument();
    });

    it("renders React node content", () => {
      const content = <span data-testid="custom-error">Custom error</span>;
      render(<ErrorCallout content={content} visibleIf={true} />);

      expect(screen.getByTestId("custom-error")).toBeInTheDocument();
    });
  });
});
