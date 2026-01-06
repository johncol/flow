import { describe, it, expect } from "vitest";
import { getStatusLabel } from "./get-status-label";

describe("getStatusLabel", () => {
  it("capitalizes a single-word status", () => {
    expect(getStatusLabel("pending")).toBe("Pending");
  });

  it("capitalizes and replaces hyphens with spaces for multi-word status", () => {
    expect(getStatusLabel("in-progress")).toBe("In progress");
  });

  it("handles completed status", () => {
    expect(getStatusLabel("completed")).toBe("Completed");
  });
});
