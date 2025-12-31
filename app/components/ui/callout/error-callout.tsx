import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Callout } from "@radix-ui/themes";

type ErrorCalloutProps = {
  content: string | React.ReactNode;
  visibleIf: boolean;
};

export const ErrorCallout: React.FC<ErrorCalloutProps> = ({
  content,
  visibleIf,
}) => {
  if (!visibleIf) {
    return null;
  }

  return (
    <Callout.Root size="1" color="red">
      <Callout.Icon>
        <ExclamationTriangleIcon />
      </Callout.Icon>
      <Callout.Text>{content}</Callout.Text>
    </Callout.Root>
  );
};
