import { describe, it, expect } from "vitest";
import { notEmpty } from "./not-empty";

describe("notEmpty", () => {
  describe("returns true for non-empty values", () => {
    it("handles regular text", () => {
      expect(notEmpty("hello")).toBe(true);
    });

    it("handles text with leading/trailing spaces", () => {
      expect(notEmpty("  hello  ")).toBe(true);
    });
  });

  describe("returns false for empty values", () => {
    it("handles empty string", () => {
      expect(notEmpty("")).toBe(false);
    });

    it("handles whitespace only", () => {
      expect(notEmpty("   ")).toBe(false);
    });

    it("handles tabs only", () => {
      expect(notEmpty("\t")).toBe(false);
    });

    it("handles newlines only", () => {
      expect(notEmpty("\n")).toBe(false);
    });
  });
});
