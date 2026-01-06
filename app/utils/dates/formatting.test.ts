import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { formatDate } from "./formatting";

describe("formatDate", () => {
  const originalNavigator = global.navigator;

  beforeEach(() => {
    vi.stubGlobal("navigator", { language: "en-US" });
  });

  afterEach(() => {
    vi.stubGlobal("navigator", originalNavigator);
  });

  it("formats date with month, day, and year", () => {
    const date = new Date(2025, 5, 15); // June 15, 2025

    const result = formatDate(date);

    expect(result).toBe("Jun 15, 2025");
  });

  it("formats date using user locale", () => {
    vi.stubGlobal("navigator", { language: "en-GB" });
    const date = new Date(2025, 11, 25); // December 25, 2025

    const result = formatDate(date);

    expect(result).toBe("25 Dec 2025");
  });
});
