import { Button, Text } from "@radix-ui/themes";
import { authCta } from "./auth-cta.css";
import { queries } from "~/global-styles/queries.css";

export const AuthCta = () => {
  return (
    <Button className={authCta}>
      <Text>
        Don't lose your progress!
        <span className={queries.styles.minSmall}>&nbsp;Sign in to save</span>
      </Text>
    </Button>
  );
};
