import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { ModalPage } from "./modal-page";

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
};

describe("ModalPage", () => {
  it("renders the logo", () => {
    renderWithRouter(
      <ModalPage heading="Welcome" subheading="Please sign in">
        <div>Content</div>
      </ModalPage>
    );

    expect(screen.getByAltText("Flow")).toBeInTheDocument();
  });

  it("renders the heading", () => {
    renderWithRouter(
      <ModalPage heading="Welcome" subheading="Please sign in">
        <div>Content</div>
      </ModalPage>
    );

    expect(
      screen.getByRole("heading", { name: "Welcome" })
    ).toBeInTheDocument();
  });

  it("renders the subheading", () => {
    renderWithRouter(
      <ModalPage heading="Welcome" subheading="Please sign in">
        <div>Content</div>
      </ModalPage>
    );

    expect(screen.getByText("Please sign in")).toBeInTheDocument();
  });

  it("renders the children content", () => {
    renderWithRouter(
      <ModalPage heading="Welcome" subheading="Please sign in">
        <button>Submit</button>
      </ModalPage>
    );

    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });
});
