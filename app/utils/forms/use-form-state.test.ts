import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useFormState } from "./use-form-state";

describe("useFormState", () => {
  describe("initialization", () => {
    it("initializes with provided values", () => {
      const { result } = renderHook(() =>
        useFormState({
          name: { initialValue: "John" },
          email: { initialValue: "john@example.com" },
        })
      );

      expect(result.current.values).toEqual({
        name: "John",
        email: "john@example.com",
      });
    });

    it("initializes with no errors", () => {
      const { result } = renderHook(() =>
        useFormState({
          name: { initialValue: "John" },
          email: { initialValue: "" },
        })
      );

      expect(result.current.errors).toEqual({
        name: false,
        email: false,
      });
      expect(result.current.hasErrors).toBe(false);
    });
  });

  describe("updateField", () => {
    it("updates a field value", () => {
      const { result } = renderHook(() =>
        useFormState({
          name: { initialValue: "" },
        })
      );

      act(() => {
        result.current.updateField("name", "Jane");
      });

      expect(result.current.values.name).toBe("Jane");
    });

    it("clears error for a field when updated", () => {
      const { result } = renderHook(() =>
        useFormState({
          name: { initialValue: "", validate: (v) => v.length > 0 },
        })
      );

      // Trigger validation to set error
      act(() => {
        result.current.updateErrors();
      });
      expect(result.current.errors.name).toBe(true);

      // Update field should clear the error
      act(() => {
        result.current.updateField("name", "Jane");
      });
      expect(result.current.errors.name).toBe(false);
    });

    it("does not affect other field values", () => {
      const { result } = renderHook(() =>
        useFormState({
          name: { initialValue: "John" },
          email: { initialValue: "john@example.com" },
        })
      );

      act(() => {
        result.current.updateField("name", "Jane");
      });

      expect(result.current.values.email).toBe("john@example.com");
    });
  });

  describe("updateErrors", () => {
    it("sets errors for invalid fields", () => {
      const { result } = renderHook(() =>
        useFormState({
          name: { initialValue: "", validate: (v) => v.length > 0 },
          age: { initialValue: 0, validate: (v) => v > 0 },
        })
      );

      act(() => {
        result.current.updateErrors();
      });

      expect(result.current.errors).toEqual({
        name: true,
        age: true,
      });
      expect(result.current.hasErrors).toBe(true);
    });

    it("clears errors for valid fields", () => {
      const { result } = renderHook(() =>
        useFormState({
          name: { initialValue: "John", validate: (v) => v.length > 0 },
        })
      );

      act(() => {
        result.current.updateErrors();
      });

      expect(result.current.errors.name).toBe(false);
      expect(result.current.hasErrors).toBe(false);
    });

    it("does not set errors for fields without validators", () => {
      const { result } = renderHook(() =>
        useFormState({
          name: { initialValue: "" },
        })
      );

      act(() => {
        result.current.updateErrors();
      });

      expect(result.current.errors.name).toBe(false);
    });
  });

  describe("resetState", () => {
    it("resets values to initial values", () => {
      const { result } = renderHook(() =>
        useFormState({
          name: { initialValue: "John" },
        })
      );

      act(() => {
        result.current.updateField("name", "Jane");
      });
      expect(result.current.values.name).toBe("Jane");

      act(() => {
        result.current.resetState();
      });
      expect(result.current.values.name).toBe("John");
    });

    it("clears all errors", () => {
      const { result } = renderHook(() =>
        useFormState({
          name: { initialValue: "", validate: (v) => v.length > 0 },
        })
      );

      act(() => {
        result.current.updateErrors();
      });
      expect(result.current.errors.name).toBe(true);

      act(() => {
        result.current.resetState();
      });
      expect(result.current.errors.name).toBe(false);
      expect(result.current.hasErrors).toBe(false);
    });
  });

  describe("hasErrors", () => {
    it("is false when no errors exist", () => {
      const { result } = renderHook(() =>
        useFormState({
          name: { initialValue: "John", validate: (v) => v.length > 0 },
        })
      );

      expect(result.current.hasErrors).toBe(false);

      act(() => {
        result.current.updateErrors();
      });

      expect(result.current.hasErrors).toBe(false);
    });

    it("is true when errors exist", () => {
      const { result } = renderHook(() =>
        useFormState({
          name: { initialValue: "", validate: (v) => v.length > 0 },
        })
      );

      act(() => {
        result.current.updateErrors();
      });

      expect(result.current.hasErrors).toBe(true);
    });

    it("updates when errors are cleared by updateField", () => {
      const { result } = renderHook(() =>
        useFormState({
          name: { initialValue: "", validate: (v) => v.length > 0 },
        })
      );

      act(() => {
        result.current.updateErrors();
      });
      expect(result.current.hasErrors).toBe(true);

      act(() => {
        result.current.updateField("name", "John");
      });
      expect(result.current.hasErrors).toBe(false);
    });
  });
});
