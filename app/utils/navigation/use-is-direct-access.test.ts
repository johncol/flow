import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useIsDirectAccess } from "./use-is-direct-access";
import { useNavigationType } from "react-router";

vi.mock("react-router", () => ({
  useNavigationType: vi.fn(),
}));

const mockUseNavigationType = vi.mocked(useNavigationType);
type NavigationType = ReturnType<typeof useNavigationType>;

describe("useIsDirectAccess", () => {
  beforeEach(() => {
    mockUseNavigationType.mockReset();
  });

  it("returns true when navigation type is POP (direct access)", () => {
    mockUseNavigationType.mockReturnValue("POP" as NavigationType);

    const { result } = renderHook(() => useIsDirectAccess());

    expect(result.current).toBe(true);
  });

  it("returns false when navigation type is PUSH (link navigation)", () => {
    mockUseNavigationType.mockReturnValue("PUSH" as NavigationType);

    const { result } = renderHook(() => useIsDirectAccess());

    expect(result.current).toBe(false);
  });

  it("returns false when navigation type is REPLACE", () => {
    mockUseNavigationType.mockReturnValue("REPLACE" as NavigationType);

    const { result } = renderHook(() => useIsDirectAccess());

    expect(result.current).toBe(false);
  });
});
