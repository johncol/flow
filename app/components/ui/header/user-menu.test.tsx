import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import {
  createMockAuthContext,
  renderWithProviders,
} from "~/utils/testing/render-with-providers";
import { createMockSession } from "~/utils/testing/session";
import { UserMenu } from "./user-menu";

const mockNavigate = vi.fn();

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("UserMenu", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("renders nothing when no session exists", () => {
    const authContext = createMockAuthContext({ session: null });

    renderWithProviders(<UserMenu />, { authContext });

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("displays user name when logged in", () => {
    const session = createMockSession();
    const authContext = createMockAuthContext({
      isLoggedIn: true,
      session,
    });

    renderWithProviders(<UserMenu />, { authContext });

    expect(screen.getByText(session.user.name)).toBeInTheDocument();
  });

  it("calls logout and navigates to login when clicking close session", async () => {
    const user = userEvent.setup();
    const logout = vi.fn();
    const authContext = createMockAuthContext({
      isLoggedIn: true,
      session: createMockSession(),
      logout,
    });
    renderWithProviders(<UserMenu />, { authContext });

    await user.click(screen.getByRole("button"));
    await user.click(screen.getByText("Close session"));

    expect(logout).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});
