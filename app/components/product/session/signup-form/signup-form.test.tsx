import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { DomainError } from "~/types/errors";
import {
  createMockAuthContext,
  renderWithProviders,
} from "~/utils/testing/render-with-providers";
import { createMockSession } from "~/utils/testing/session";
import { SignupForm } from "./signup-form";

const navigate = vi.fn();
vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => navigate,
  };
});

const saveTasksCreatedWhileLoggedOut = vi.fn();
vi.mock("../use-logged-out-tasks", () => ({
  useLoggedOutTasks: () => ({ saveTasksCreatedWhileLoggedOut }),
}));

const notifySignupWelcome = vi.fn();
vi.mock("~/utils/toasts/session", () => ({
  notifySignupWelcome: (name: string) => notifySignupWelcome(name),
}));

describe("SignupForm", () => {
  beforeEach(() => {
    navigate.mockClear();
    saveTasksCreatedWhileLoggedOut.mockClear();
    notifySignupWelcome.mockClear();
    saveTasksCreatedWhileLoggedOut.mockResolvedValue(0);
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("rendering", () => {
    it("renders all form fields", () => {
      renderWithProviders(<SignupForm />);

      expect(screen.getByText("Name")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Your name")).toBeInTheDocument();

      expect(screen.getByText("Email")).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("you@example.com")
      ).toBeInTheDocument();

      expect(screen.getByText("Password")).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("Create a password")
      ).toBeInTheDocument();
    });

    it("renders the submit button", () => {
      renderWithProviders(<SignupForm />);

      expect(
        screen.getByRole("button", { name: /create account/i })
      ).toBeInTheDocument();
    });

    it("renders link to login page", () => {
      renderWithProviders(<SignupForm />);

      const link = screen.getByRole("link", { name: /or login/i });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/login");
    });
  });

  describe("form interactions", () => {
    it("allows entering name, email, and password", async () => {
      const user = userEvent.setup();
      renderWithProviders(<SignupForm />);

      const nameInput = screen.getByPlaceholderText("Your name");
      await user.type(nameInput, "John Doe");

      const emailInput = screen.getByPlaceholderText("you@example.com");
      await user.type(emailInput, "john@example.com");

      const passwordInput = screen.getByPlaceholderText("Create a password");
      await user.type(passwordInput, "secret123");

      expect(nameInput).toHaveValue("John Doe");
      expect(emailInput).toHaveValue("john@example.com");
      expect(passwordInput).toHaveValue("secret123");
    });
  });

  describe("keyboard navigation", () => {
    it("focuses next field when pressing Enter on current field", async () => {
      const user = userEvent.setup();
      renderWithProviders(<SignupForm />);

      const nameInput = screen.getByPlaceholderText("Your name");
      const emailInput = screen.getByPlaceholderText("you@example.com");
      const passwordInput = screen.getByPlaceholderText("Create a password");

      await user.click(nameInput);

      await user.keyboard("{Enter}");
      expect(emailInput).toHaveFocus();

      await user.keyboard("{Enter}");
      expect(passwordInput).toHaveFocus();
    });
  });

  describe("form validation", () => {
    it("shows validation error when submitting with whitespace-only fields", async () => {
      const user = userEvent.setup();
      renderWithProviders(<SignupForm />);

      // Whitespace passes native required validation but fails custom notEmpty validator
      await user.type(screen.getByPlaceholderText("Your name"), "   ");
      await user.type(screen.getByPlaceholderText("you@example.com"), "a@b.c");
      await user.type(screen.getByPlaceholderText("Create a password"), "pass");
      await user.click(screen.getByRole("button", { name: /create account/i }));

      expect(screen.getByText("Please fill in all fields")).toBeInTheDocument();
    });

    it("does not call signup when validation fails", async () => {
      const user = userEvent.setup();
      const signup = vi.fn();
      const authContext = createMockAuthContext({ signup });
      renderWithProviders(<SignupForm />, { authContext });

      // Whitespace passes native required validation but fails custom notEmpty validator
      await user.type(screen.getByPlaceholderText("Your name"), "   ");
      await user.type(screen.getByPlaceholderText("you@example.com"), "a@b.c");
      await user.type(screen.getByPlaceholderText("Create a password"), "pass");
      await user.click(screen.getByRole("button", { name: /create account/i }));

      expect(signup).not.toHaveBeenCalled();
    });
  });

  describe("successful signup", () => {
    it("calls signup with trimmed form values", async () => {
      const user = userEvent.setup();
      const session = createMockSession();
      const signup = vi.fn().mockResolvedValue(session);
      const authContext = createMockAuthContext({ signup });
      renderWithProviders(<SignupForm />, { authContext });

      await user.type(screen.getByPlaceholderText("Your name"), "  John Doe  ");
      await user.type(
        screen.getByPlaceholderText("you@example.com"),
        "  john@example.com  "
      );
      await user.type(
        screen.getByPlaceholderText("Create a password"),
        "password123"
      );
      await user.click(screen.getByRole("button", { name: /create account/i }));

      await waitFor(() => {
        expect(signup).toHaveBeenCalledWith({
          name: "John Doe",
          email: "john@example.com",
          password: "password123",
        });
      });
    });

    it("saves tasks created while logged out", async () => {
      const user = userEvent.setup();
      const session = createMockSession();
      const signup = vi.fn().mockResolvedValue(session);
      const authContext = createMockAuthContext({ signup });
      renderWithProviders(<SignupForm />, { authContext });

      await user.type(screen.getByPlaceholderText("Your name"), "John Doe");
      await user.type(
        screen.getByPlaceholderText("you@example.com"),
        "john@example.com"
      );
      await user.type(
        screen.getByPlaceholderText("Create a password"),
        "password123"
      );
      await user.click(screen.getByRole("button", { name: /create account/i }));

      await waitFor(() => {
        expect(saveTasksCreatedWhileLoggedOut).toHaveBeenCalledWith(
          session.user
        );
      });
    });

    it("shows welcome toast notification", async () => {
      const user = userEvent.setup();
      const session = createMockSession();
      const signup = vi.fn().mockResolvedValue(session);
      const authContext = createMockAuthContext({ signup });
      renderWithProviders(<SignupForm />, { authContext });

      await user.type(screen.getByPlaceholderText("Your name"), "John Doe");
      await user.type(
        screen.getByPlaceholderText("you@example.com"),
        "john@example.com"
      );
      await user.type(
        screen.getByPlaceholderText("Create a password"),
        "password123"
      );
      await user.click(screen.getByRole("button", { name: /create account/i }));

      await waitFor(() => {
        expect(notifySignupWelcome).toHaveBeenCalledWith(session.user.name);
      });
    });

    it("navigates to home page after successful signup", async () => {
      const user = userEvent.setup();
      const session = createMockSession();
      const signup = vi.fn().mockResolvedValue(session);
      const authContext = createMockAuthContext({ signup });
      renderWithProviders(<SignupForm />, { authContext });

      await user.type(screen.getByPlaceholderText("Your name"), "John Doe");
      await user.type(
        screen.getByPlaceholderText("you@example.com"),
        "john@example.com"
      );
      await user.type(
        screen.getByPlaceholderText("Create a password"),
        "password123"
      );
      await user.click(screen.getByRole("button", { name: /create account/i }));

      await waitFor(() => {
        expect(navigate).toHaveBeenCalledWith("/");
      });
    });
  });

  describe("error handling", () => {
    it("shows default error when signup returns null", async () => {
      const user = userEvent.setup();
      const signup = vi.fn().mockResolvedValue(null);
      const authContext = createMockAuthContext({ signup });
      renderWithProviders(<SignupForm />, { authContext });

      await user.type(screen.getByPlaceholderText("Your name"), "John Doe");
      await user.type(
        screen.getByPlaceholderText("you@example.com"),
        "john@example.com"
      );
      await user.type(
        screen.getByPlaceholderText("Create a password"),
        "password123"
      );
      await user.click(screen.getByRole("button", { name: /create account/i }));

      await waitFor(() => {
        expect(
          screen.getByText("Something went wrong. Please try again.")
        ).toBeInTheDocument();
      });
    });

    it("shows domain error message when signup throws DomainError", async () => {
      const user = userEvent.setup();
      const signup = vi
        .fn()
        .mockRejectedValue(new DomainError("Email already exists"));
      const authContext = createMockAuthContext({ signup });
      renderWithProviders(<SignupForm />, { authContext });

      await user.type(screen.getByPlaceholderText("Your name"), "John Doe");
      await user.type(
        screen.getByPlaceholderText("you@example.com"),
        "john@example.com"
      );
      await user.type(
        screen.getByPlaceholderText("Create a password"),
        "password123"
      );
      await user.click(screen.getByRole("button", { name: /create account/i }));

      await waitFor(() => {
        expect(screen.getByText("Email already exists")).toBeInTheDocument();
      });
    });

    it("shows default error message when signup throws generic error", async () => {
      const user = userEvent.setup();
      const signup = vi.fn().mockRejectedValue(new Error("Network error"));
      const authContext = createMockAuthContext({ signup });
      renderWithProviders(<SignupForm />, { authContext });

      await user.type(screen.getByPlaceholderText("Your name"), "John Doe");
      await user.type(
        screen.getByPlaceholderText("you@example.com"),
        "john@example.com"
      );
      await user.type(
        screen.getByPlaceholderText("Create a password"),
        "password123"
      );
      await user.click(screen.getByRole("button", { name: /create account/i }));

      await waitFor(() => {
        expect(
          screen.getByText("Something went wrong. Please try again.")
        ).toBeInTheDocument();
      });
    });
  });
});
