import { Button, Text } from "@radix-ui/themes";
import { authCta } from "./auth-cta.css";
import { container } from "~/global-styles/responsive.css";

export const AuthCta = () => {
  return (
    <Button className={authCta}>
      <Text>
        Don't lose your progress!
        <span className={container.styles.visibleOnMinSmall}>
          &nbsp;Sign in to save
        </span>
      </Text>
    </Button>
  );
};
