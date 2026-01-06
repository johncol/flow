import { notEmpty } from "~/utils/forms/validators/not-empty";
import { useFormState } from "~/utils/forms/use-form-state";

type SignupFormFields = {
  name: string;
  email: string;
  password: string;
};

export const useSignupFormState = () => {
  const { values, ...controller } = useFormState<SignupFormFields>({
    name: { initialValue: "", validate: notEmpty },
    email: { initialValue: "", validate: notEmpty },
    password: { initialValue: "", validate: notEmpty },
  });

  return {
    ...values,
    ...controller,
  };
};
