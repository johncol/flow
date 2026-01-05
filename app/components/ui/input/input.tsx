import { TextField } from "@radix-ui/themes";
import { input } from "./input.css";

type InputProps = TextField.RootProps & {
  ref?: React.Ref<HTMLInputElement>;
};

export const Input = ({ className, ...props }: InputProps) => {
  return <TextField.Root className={`${input} ${className}`} {...props} />;
};
