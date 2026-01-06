import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import {
  createMockAuthContext,
  renderWithProviders,
} from "~/utils/testing/render-with-providers";
import { createMockSession } from "~/utils/testing/session";
import { LoginForm } from "./login-form";

const navigate = vi.fn();
vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => navigate,
  };
});

const notifyLoginWelcome = vi.fn();
vi.mock("~/utils/toasts/session", () => ({
  notifyLoginWelcome: (name: string) => notifyLoginWelcome(name),
}));

const saveTasksCreatedWhileLoggedOut = vi.fn();
vi.mock("../use-logged-out-tasks", () => ({
  useLoggedOutTasks: () => ({
    saveTasksCreatedWhileLoggedOut,
  }),
}));

describe("LoginForm", () => {
  beforeEach(() => {
    navigate.mockClear();
    notifyLoginWelcome.mockClear();
    saveTasksCreatedWhileLoggedOut.mockClear();
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("rendering", () => {
    it("renders email and password fields", () => {
      renderWithProviders(<LoginForm />);

      expect(screen.getByLabelText("Email")).toBeInTheDocument();
      expect(screen.getByLabelText("Password")).toBeInTheDocument();
    });

    it("renders sign in button", () => {
      renderWithProviders(<LoginForm />);

      expect(
        screen.getByRole("button", { name: /sign in/i })
      ).toBeInTheDocument();
    });

    it("renders link to create account", () => {
      renderWithProviders(<LoginForm />);

      expect(screen.getByText(/or create account/i)).toBeInTheDocument();
    });
  });

  describe("form interaction", () => {
    it("allows entering email and password", async () => {
      const user = userEvent.setup();
      renderWithProviders(<LoginForm />);

      await user.type(screen.getByLabelText("Email"), "test@example.com");
      await user.type(screen.getByLabelText("Password"), "secret123");

      expect(screen.getByLabelText("Email")).toHaveValue("test@example.com");
      expect(screen.getByLabelText("Password")).toHaveValue("secret123");
    });

    it("focuses password field when pressing enter on email field", async () => {
      const user = userEvent.setup();
      renderWithProviders(<LoginForm />);

      const emailInput = screen.getByLabelText("Email");
      await user.type(emailInput, "test@example.com");
      await user.keyboard("{Enter}");

      expect(screen.getByLabelText("Password")).toHaveFocus();
    });
  });

  describe("validation", () => {
    it("marks email and password fields as required", () => {
      renderWithProviders(<LoginForm />);

      expect(screen.getByLabelText("Email")).toBeRequired();
      expect(screen.getByLabelText("Password")).toBeRequired();
    });

    it("does not call login when email is empty", async () => {
      const user = userEvent.setup();
      const login = vi.fn();
      const authContext = createMockAuthContext({ login });
      renderWithProviders(<LoginForm />, { authContext });

      await user.type(screen.getByLabelText("Password"), "secret123");
      await user.click(screen.getByRole("button", { name: /sign in/i }));

      expect(login).not.toHaveBeenCalled();
    });

    it("does not call login when password is empty", async () => {
      const user = userEvent.setup();
      const login = vi.fn();
      const authContext = createMockAuthContext({ login });
      renderWithProviders(<LoginForm />, { authContext });

      await user.type(screen.getByLabelText("Email"), "test@example.com");
      await user.click(screen.getByRole("button", { name: /sign in/i }));

      expect(login).not.toHaveBeenCalled();
    });
  });

  describe("successful login", () => {
    it("calls login with email and password", async () => {
      const user = userEvent.setup();
      const session = createMockSession();
      const login = vi.fn().mockResolvedValue(session);
      const authContext = createMockAuthContext({ login });
      renderWithProviders(<LoginForm />, { authContext });

      await user.type(screen.getByLabelText("Email"), "test@example.com");
      await user.type(screen.getByLabelText("Password"), "secret123");
      await user.click(screen.getByRole("button", { name: /sign in/i }));

      expect(login).toHaveBeenCalledWith("test@example.com", "secret123");
    });

    it("trims email before calling login", async () => {
      const user = userEvent.setup();
      const session = createMockSession();
      const login = vi.fn().mockResolvedValue(session);
      const authContext = createMockAuthContext({ login });
      renderWithProviders(<LoginForm />, { authContext });

      await user.type(screen.getByLabelText("Email"), "  test@example.com  ");
      await user.type(screen.getByLabelText("Password"), "secret123");
      await user.click(screen.getByRole("button", { name: /sign in/i }));

      expect(login).toHaveBeenCalledWith("test@example.com", "secret123");
    });

    it("saves tasks created while logged out", async () => {
      const user = userEvent.setup();
      const session = createMockSession();
      const login = vi.fn().mockResolvedValue(session);
      const authContext = createMockAuthContext({ login });
      renderWithProviders(<LoginForm />, { authContext });

      await user.type(screen.getByLabelText("Email"), "test@example.com");
      await user.type(screen.getByLabelText("Password"), "secret123");
      await user.click(screen.getByRole("button", { name: /sign in/i }));

      await waitFor(() => {
        expect(saveTasksCreatedWhileLoggedOut).toHaveBeenCalledWith(
          session.user
        );
      });
    });

    it("shows welcome notification", async () => {
      const user = userEvent.setup();
      const session = createMockSession();
      const login = vi.fn().mockResolvedValue(session);
      const authContext = createMockAuthContext({ login });
      renderWithProviders(<LoginForm />, { authContext });

      await user.type(screen.getByLabelText("Email"), "test@example.com");
      await user.type(screen.getByLabelText("Password"), "secret123");
      await user.click(screen.getByRole("button", { name: /sign in/i }));

      await waitFor(() => {
        expect(notifyLoginWelcome).toHaveBeenCalledWith(session.user.name);
      });
    });

    it("navigates to home page", async () => {
      const user = userEvent.setup();
      const session = createMockSession();
      const login = vi.fn().mockResolvedValue(session);
      const authContext = createMockAuthContext({ login });
      renderWithProviders(<LoginForm />, { authContext });

      await user.type(screen.getByLabelText("Email"), "test@example.com");
      await user.type(screen.getByLabelText("Password"), "secret123");
      await user.click(screen.getByRole("button", { name: /sign in/i }));

      await waitFor(() => {
        expect(navigate).toHaveBeenCalledWith("/");
      });
    });
  });

  describe("failed login", () => {
    it("shows error when login returns null", async () => {
      const user = userEvent.setup();
      const login = vi.fn().mockResolvedValue(null);
      const authContext = createMockAuthContext({ login });
      renderWithProviders(<LoginForm />, { authContext });

      await user.type(screen.getByLabelText("Email"), "test@example.com");
      await user.type(screen.getByLabelText("Password"), "wrongpassword");
      await user.click(screen.getByRole("button", { name: /sign in/i }));

      await waitFor(() => {
        expect(
          screen.getByText("Invalid email or password")
        ).toBeInTheDocument();
      });
    });

    it("shows error when login throws an exception", async () => {
      const user = userEvent.setup();
      const login = vi.fn().mockRejectedValue(new Error("Network error"));
      const authContext = createMockAuthContext({ login });
      renderWithProviders(<LoginForm />, { authContext });

      await user.type(screen.getByLabelText("Email"), "test@example.com");
      await user.type(screen.getByLabelText("Password"), "secret123");
      await user.click(screen.getByRole("button", { name: /sign in/i }));

      await waitFor(() => {
        expect(
          screen.getByText("Invalid email or password")
        ).toBeInTheDocument();
      });
    });
  });
});
