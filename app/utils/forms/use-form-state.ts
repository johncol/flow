import { useState } from "react";

type FieldConfig<T> = {
  initialValue: T;
  validate?: (value: T) => boolean;
};

type FormConfig<TFields extends Record<string, unknown>> = {
  [K in keyof TFields]: FieldConfig<TFields[K]>;
};

type FormState<TFields extends Record<string, unknown>> = {
  values: TFields;
  errors: Record<keyof TFields, boolean>;
  hasErrors: boolean;
  updateField: <K extends keyof TFields>(field: K, value: TFields[K]) => void;
  updateErrors: () => boolean;
  resetState: () => void;
};

export const useFormState = <TFields extends Record<string, unknown>>(
  config: FormConfig<TFields>
): FormState<TFields> => {
  const fieldNames = Object.keys(config) as Array<keyof TFields>;

  const getInitialValues = (): TFields => {
    const values = {} as TFields;
    for (const key of fieldNames) {
      values[key] = config[key].initialValue;
    }
    return values;
  };

  const getInitialErrors = (): Record<keyof TFields, boolean> => {
    const errors = {} as Record<keyof TFields, boolean>;
    for (const key of fieldNames) {
      errors[key] = false;
    }
    return errors;
  };

  const [values, setValues] = useState<TFields>(getInitialValues);
  const [errors, setErrors] = useState<Record<keyof TFields, boolean>>(getInitialErrors);

  const updateField = <K extends keyof TFields>(field: K, value: TFields[K]) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => (prev[field] ? { ...prev, [field]: false } : prev));
  };

  const updateErrors = (): boolean => {
    const newErrors = {} as Record<keyof TFields, boolean>;
    for (const key of fieldNames) {
      const fieldConfig = config[key];
      const value = values[key];

      if (fieldConfig.validate) {
        newErrors[key] = !fieldConfig.validate(value);
      } else {
        newErrors[key] = false;
      }
    }

    const hasValidationErrors = Object.values(newErrors).some(Boolean);
    setErrors(newErrors);
    return hasValidationErrors;
  };

  const resetState = () => {
    setValues(getInitialValues());
    setErrors(getInitialErrors());
  };

  const hasErrors = Object.values(errors).some(Boolean);

  return {
    values,
    errors,
    hasErrors,
    updateField,
    updateErrors,
    resetState,
  };
};
