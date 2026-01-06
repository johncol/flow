import { screen } from "@testing-library/react";
import {
  createMockAuthContext,
  renderWithProviders,
} from "~/utils/testing/render-with-providers";
import { createLoggedInSession } from "~/utils/testing/session";
import { Header } from "./header";

describe("Header", () => {
  it("renders the logo", () => {
    renderWithProviders(<Header />);

    expect(screen.getByAltText("Flow")).toBeInTheDocument();
  });

  it("shows sign-in CTA when user is not logged in", () => {
    const authContext = createMockAuthContext({ isLoggedIn: false });
    renderWithProviders(<Header />, { authContext });

    expect(screen.getByText(/Don't lose your progress/i)).toBeInTheDocument();
  });

  it("shows user menu when user is logged in", () => {
    const session = createLoggedInSession();
    const authContext = createMockAuthContext({
      isLoggedIn: true,
      session,
    });
    renderWithProviders(<Header />, { authContext });

    expect(screen.getByText(session.user.name)).toBeInTheDocument();
  });
});
