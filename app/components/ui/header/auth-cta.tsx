import { Button, Text } from "@radix-ui/themes";
import { NavLink } from "react-router";
import { container } from "~/global-styles/responsive.css";
import { authCta } from "./auth-cta.css";

export const AuthCta = () => {
  return (
    <Button className={authCta} asChild={true}>
      <NavLink to="/login">
        <Text>
          Don't lose your progress!
          <span className={container.styles.visibleOnMinSmall}>
            &nbsp;Sign in to save
          </span>
        </Text>
      </NavLink>
    </Button>
  );
};
