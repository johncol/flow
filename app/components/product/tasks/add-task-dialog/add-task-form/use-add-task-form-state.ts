import { useState } from "react";

type FormErrors = {
  title?: boolean;
  dueDate?: boolean;
};

export const useAddTaskFormState = () => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const resetState = () => {
    setTitle("");
    setDueDate("");
    setErrors({});
  };

  const updateTitle = (value: string) => {
    setTitle(value);
    if (errors.title) {
      setErrors((prev) => ({ ...prev, title: false }));
    }
  };

  const updateDueDate = (value: string) => {
    setDueDate(value);
    if (errors.dueDate) {
      setErrors((prev) => ({ ...prev, dueDate: false }));
    }
  };

  const updateErrors = (): boolean => {
    const newErrors: FormErrors = {
      title: !title.trim(),
      dueDate: !dueDate,
    };
    const hasErrors = Object.values(newErrors).some(Boolean);
    setErrors(newErrors);
    return hasErrors;
  };

  const hasErrors = Object.values(errors).some(Boolean);

  return {
    title,
    dueDate,
    updateTitle,
    updateDueDate,
    errors,
    hasErrors,
    updateErrors,
    resetState,
  };
};
