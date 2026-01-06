import { notEmpty } from "~/utils/forms/validators/not-empty";
import { useFormState } from "~/utils/forms/use-form-state";

type AddTaskFormFields = {
  title: string;
  dueDate: string;
};

export const useAddTaskFormState = () => {
  const { values, ...controller } = useFormState<AddTaskFormFields>({
    title: { initialValue: "", validate: notEmpty },
    dueDate: { initialValue: "", validate: notEmpty },
  });

  return {
    ...values,
    ...controller,
  };
};
