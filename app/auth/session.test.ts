import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import * as usersApi from "~/api/users";
import * as sessionStorage from "~/auth/storage/session";
import {
  restoreStorageMocks,
  setupStorageMocks,
} from "~/utils/testing/storage";
import { createUser } from "~/utils/testing/session";
import { createAndLogin, getSession, login, logout } from "./session";

vi.mock("~/api/users");

describe("auth/session", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setupStorageMocks();
  });

  afterEach(() => {
    restoreStorageMocks();
  });

  describe("login", () => {
    it("returns null when user is not found", async () => {
      vi.mocked(usersApi.fetchUser).mockResolvedValue(undefined);

      const result = await login("unknown@example.com", "password");

      expect(result).toBeNull();
      expect(usersApi.fetchUser).toHaveBeenCalledWith(
        "unknown@example.com",
        "password"
      );
    });

    it("creates and returns session when user is found", async () => {
      const user = createUser();
      vi.mocked(usersApi.fetchUser).mockResolvedValue(user);

      const result = await login("john@example.com", "password123");

      expect(result).toMatchObject({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        loginTime: expect.any(Date),
      });
      expect(usersApi.fetchUser).toHaveBeenCalledWith(
        "john@example.com",
        "password123"
      );
    });

    it("does not create session when user is not found", async () => {
      vi.mocked(usersApi.fetchUser).mockResolvedValue(undefined);

      await login("unknown@example.com", "password");

      expect(sessionStorage.getSession()).toBeNull();
    });
  });

  describe("createAndLogin", () => {
    it("creates user and returns session", async () => {
      const input = {
        name: "Jane Doe",
        email: "jane@example.com",
        password: "securepassword",
      };
      const user = createUser(input);
      vi.mocked(usersApi.createUser).mockResolvedValue(user);

      const result = await createAndLogin(input);

      expect(result).toMatchObject({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        loginTime: expect.any(Date),
      });
      expect(usersApi.createUser).toHaveBeenCalledWith(input);
    });
  });

  describe("logout", () => {
    it("calls deleteSession from storage", () => {
      const user = createUser();
      sessionStorage.createSession(user);
      expect(sessionStorage.getSession()).toBeDefined();

      logout();

      expect(sessionStorage.getSession()).toBeNull();
    });
  });

  describe("getSession", () => {
    it("returns session from storage when it exists", () => {
      const user = createUser();
      const createdSession = sessionStorage.createSession(user);

      const result = getSession();

      expect(result).toEqual(createdSession);
    });

    it("returns null when no session exists", () => {
      const result = getSession();

      expect(result).toBeNull();
    });
  });
});
