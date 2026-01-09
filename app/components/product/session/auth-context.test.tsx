import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ANONYMOUS } from "~/types/users";
import { createMockSession, createMockUser } from "~/utils/testing/session";
import { AuthProvider, useSession } from "./auth-context";

vi.mock("~/auth/session", () => ({
  getSession: vi.fn(),
  login: vi.fn(),
  createAndLogin: vi.fn(),
  logout: vi.fn(),
}));

import * as authApi from "~/auth/session";

const signupInput = {
  name: "New User",
  email: "new@example.com",
  password: "pw",
};

describe("AuthContext", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(authApi.getSession).mockReturnValue(null);
  });

  describe("useSession", () => {
    it("throws when used outside AuthProvider", () => {
      const consoleError = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      expect(() => render(<TestConsumer />)).toThrow(
        "useSession must be used within an AuthProvider"
      );

      consoleError.mockRestore();
    });
  });

  describe("AuthProvider", () => {
    describe("initialization", () => {
      it("initializes with no session when storage is empty", () => {
        vi.mocked(authApi.getSession).mockReturnValue(null);

        render(
          <AuthProvider>
            <TestConsumer />
          </AuthProvider>
        );

        expect(screen.getByTestId("is-logged-in")).toHaveTextContent("false");
        expect(screen.getByTestId("user-id")).toHaveTextContent(ANONYMOUS);
        expect(screen.getByTestId("session-user-name")).toHaveTextContent(
          "none"
        );
      });

      it("initializes with session from storage on mount", async () => {
        const session = createMockSession();
        vi.mocked(authApi.getSession).mockReturnValue(session);

        render(
          <AuthProvider>
            <TestConsumer />
          </AuthProvider>
        );

        await waitFor(() => {
          expect(screen.getByTestId("is-logged-in")).toHaveTextContent("true");
        });
        expect(screen.getByTestId("user-id")).toHaveTextContent(
          session.user.id
        );
        expect(screen.getByTestId("session-user-name")).toHaveTextContent(
          session.user.name
        );
      });
    });

    describe("login", () => {
      it("updates session state on successful login", async () => {
        const user = userEvent.setup();
        const session = createMockSession();
        vi.mocked(authApi.login).mockResolvedValue(session);

        render(
          <AuthProvider>
            <TestConsumer />
          </AuthProvider>
        );

        expect(screen.getByTestId("is-logged-in")).toHaveTextContent("false");

        await user.click(screen.getByText("Login"));

        await waitFor(() => {
          expect(screen.getByTestId("is-logged-in")).toHaveTextContent("true");
        });
        expect(screen.getByTestId("user-id")).toHaveTextContent(
          session.user.id
        );
      });

      it("does not update session state when login fails", async () => {
        const user = userEvent.setup();
        vi.mocked(authApi.login).mockResolvedValue(null);

        render(
          <AuthProvider>
            <TestConsumer />
          </AuthProvider>
        );

        await user.click(screen.getByText("Login"));

        await waitFor(() => {
          expect(authApi.login).toHaveBeenCalled();
        });
        expect(screen.getByTestId("is-logged-in")).toHaveTextContent("false");
        expect(screen.getByTestId("user-id")).toHaveTextContent(ANONYMOUS);
      });
    });

    describe("signup", () => {
      it("updates session state on successful signup", async () => {
        const user = userEvent.setup();
        const newUser = createMockUser(signupInput);
        const session = createMockSession(newUser);
        vi.mocked(authApi.createAndLogin).mockResolvedValue(session);

        render(
          <AuthProvider>
            <TestConsumer />
          </AuthProvider>
        );

        expect(screen.getByTestId("is-logged-in")).toHaveTextContent("false");

        await user.click(screen.getByText("Signup"));

        await waitFor(() => {
          expect(screen.getByTestId("is-logged-in")).toHaveTextContent("true");
        });
        expect(screen.getByTestId("user-id")).toHaveTextContent(
          session.user.id
        );
        expect(screen.getByTestId("session-user-name")).toHaveTextContent(
          "New User"
        );
        expect(authApi.createAndLogin).toHaveBeenCalledWith(signupInput);
      });
    });

    describe("logout", () => {
      it("clears session state and calls logout API", async () => {
        const user = userEvent.setup();
        const session = createMockSession();
        vi.mocked(authApi.getSession).mockReturnValue(session);

        render(
          <AuthProvider>
            <TestConsumer />
          </AuthProvider>
        );

        await waitFor(() => {
          expect(screen.getByTestId("is-logged-in")).toHaveTextContent("true");
        });

        await user.click(screen.getByText("Logout"));

        expect(screen.getByTestId("is-logged-in")).toHaveTextContent("false");
        expect(screen.getByTestId("user-id")).toHaveTextContent(ANONYMOUS);
        expect(screen.getByTestId("session-user-name")).toHaveTextContent(
          "none"
        );
        expect(authApi.logout).toHaveBeenCalled();
      });
    });
  });
});

const TestConsumer = () => {
  const { isLoggedIn, userId, session, login, signup, logout } = useSession();

  return (
    <div>
      <span data-testid="is-logged-in">{String(isLoggedIn)}</span>
      <span data-testid="user-id">{userId}</span>
      <span data-testid="session-user-name">
        {session?.user.name ?? "none"}
      </span>
      <button
        onClick={() => login({ email: "test@example.com", password: "password" })}
      >
        Login
      </button>
      <button onClick={() => signup(signupInput)}>Signup</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
