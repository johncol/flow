import { useState } from "react";

type FormErrors = {
  email?: boolean;
  password?: boolean;
};

export const useLoginFormState = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const resetState = () => {
    setEmail("");
    setPassword("");
    setErrors({});
  };

  const updateEmail = (value: string) => {
    setEmail(value);
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: false }));
    }
  };

  const updatePassword = (value: string) => {
    setPassword(value);
    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: false }));
    }
  };

  const updateErrors = (): boolean => {
    const newErrors: FormErrors = {
      email: !email.trim(),
      password: !password.trim(),
    };
    const hasErrors = Object.values(newErrors).some(Boolean);
    setErrors(newErrors);
    return hasErrors;
  };

  const hasErrors = Object.values(errors).some(Boolean);

  return {
    email,
    password,
    updateEmail,
    updatePassword,
    errors,
    hasErrors,
    updateErrors,
    resetState,
  };
};
