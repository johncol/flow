import { describe, expect, it } from "vitest";
import { encryptPassword, generateTaskId, generateUserId } from "./utils";

describe("utils", () => {
  describe("generateTaskId", () => {
    it("returns an id prefixed with 'task-'", () => {
      const id = generateTaskId();
      expect(id).toMatch(/^task-.+/);
    });

    it("generates unique ids", () => {
      const id1 = generateTaskId();
      const id2 = generateTaskId();
      expect(id1).not.toBe(id2);
    });
  });

  describe("generateUserId", () => {
    it("returns an id prefixed with 'user-'", () => {
      const id = generateUserId();
      expect(id).toMatch(/^user-.+/);
    });

    it("generates unique ids", () => {
      const id1 = generateUserId();
      const id2 = generateUserId();
      expect(id1).not.toBe(id2);
    });
  });

  describe("encryptPassword", () => {
    it("produces the same hash for the same input", async () => {
      const hash1 = await encryptPassword("testPassword");
      const hash2 = await encryptPassword("testPassword");
      expect(hash1).toBe(hash2);
    });

    it("produces different hashes for different inputs", async () => {
      const hash1 = await encryptPassword("password1");
      const hash2 = await encryptPassword("password2");
      expect(hash1).not.toBe(hash2);
    });
  });
});
