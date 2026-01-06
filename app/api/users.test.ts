import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import * as usersStorage from "~/api/storage/users";
import { DomainError } from "~/types/errors";
import type { NewUserInput, User } from "~/types/users";
import {
  restoreStorageMocks,
  setupStorageMocks,
} from "~/utils/testing/storage";
import { createUser, fetchUser } from "./users";
import * as utils from "./utils";

vi.mock("./utils", async () => {
  const actual = await vi.importActual("./utils");
  return {
    ...actual,
    delay: vi.fn().mockResolvedValue(undefined),
  };
});

describe("users API", () => {
  const encryptedPassword = "encrypted-password-hash";
  const userId = "user-test-123";

  const existingUser: User = {
    id: "user-existing",
    name: "Existing User",
    email: "existing@example.com",
    password: encryptedPassword,
    createdAt: new Date("2024-01-01"),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    setupStorageMocks();
    usersStorage.saveUsers([existingUser]);
    vi.spyOn(utils, "encryptPassword").mockResolvedValue(encryptedPassword);
    vi.spyOn(utils, "generateUserId").mockReturnValue(userId);
  });

  afterEach(() => {
    restoreStorageMocks();
  });

  describe("fetchUser", () => {
    it("returns the user when email and password match", async () => {
      const user = await fetchUser("existing@example.com", "password123");

      expect(user).toEqual(existingUser);
      expect(utils.encryptPassword).toHaveBeenCalledWith("password123");
    });

    it("returns undefined when email does not match", async () => {
      const user = await fetchUser("nonexistent@example.com", "password123");

      expect(user).toBeUndefined();
    });

    it("returns undefined when password does not match", async () => {
      vi.mocked(utils.encryptPassword).mockResolvedValue("different-hash");

      const user = await fetchUser("existing@example.com", "wrongpassword");

      expect(user).toBeUndefined();
    });
  });

  describe("createUser", () => {
    const newUserInput: NewUserInput = {
      name: "New User",
      email: "new@example.com",
      password: "newpassword123",
    };

    it("creates a new user with generated id and encrypted password", async () => {
      const user = await createUser(newUserInput);

      expect(user).toEqual({
        id: userId,
        name: "New User",
        email: "new@example.com",
        password: encryptedPassword,
        createdAt: expect.any(Date),
      });
    });

    it("saves the new user to storage", async () => {
      await createUser(newUserInput);

      const users = usersStorage.getUsers();
      expect(users).toHaveLength(2);
      expect(users[1]).toMatchObject({
        id: userId,
        name: "New User",
        email: "new@example.com",
        password: encryptedPassword,
      });
    });

    it("throws DomainError when email already exists", async () => {
      const duplicateEmailInput: NewUserInput = {
        name: "Another User",
        email: "existing@example.com",
        password: "password123",
      };

      await expect(createUser(duplicateEmailInput)).rejects.toThrow(
        DomainError
      );
      await expect(createUser(duplicateEmailInput)).rejects.toThrow(
        "An account with this email is already registered."
      );
    });

    it("email comparison is case-insensitive", async () => {
      const duplicateEmailInput: NewUserInput = {
        name: "Another User",
        email: "EXISTING@example.com",
        password: "password123",
      };

      await expect(createUser(duplicateEmailInput)).rejects.toThrow(
        DomainError
      );
    });
  });
});
