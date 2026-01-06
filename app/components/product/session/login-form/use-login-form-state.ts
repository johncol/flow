import { notEmpty } from "~/utils/forms/validators/not-empty";
import { useFormState } from "~/utils/forms/use-form-state";

type LoginFormFields = {
  email: string;
  password: string;
};

export const useLoginFormState = () => {
  const { values, ...controller } = useFormState<LoginFormFields>({
    email: { initialValue: "", validate: notEmpty },
    password: { initialValue: "", validate: notEmpty },
  });

  return {
    ...values,
    ...controller,
  };
};
