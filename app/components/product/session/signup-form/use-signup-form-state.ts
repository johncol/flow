import { useState } from "react";

type FormErrors = {
  name?: boolean;
  email?: boolean;
  password?: boolean;
};

export const useSignupFormState = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const resetState = () => {
    setName("");
    setEmail("");
    setPassword("");
    setErrors({});
  };

  const updateName = (value: string) => {
    setName(value);
    if (errors.name) {
      setErrors((prev) => ({ ...prev, name: false }));
    }
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
      name: !name.trim(),
      email: !email.trim(),
      password: !password.trim(),
    };
    const hasErrors = Object.values(newErrors).some(Boolean);
    setErrors(newErrors);
    return hasErrors;
  };

  const hasErrors = Object.values(errors).some(Boolean);

  return {
    name,
    email,
    password,
    updateName,
    updateEmail,
    updatePassword,
    errors,
    hasErrors,
    updateErrors,
    resetState,
  };
};
