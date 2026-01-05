import { Button, Text } from "@radix-ui/themes";
import { authCta } from "./auth-cta.css";

export const AuthCta = () => {
  return (
    <Button className={authCta}>
      <Text>Don't lose your progress!</Text>
    </Button>
  );
};
