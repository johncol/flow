import { Button, Flex, Link, Spinner, Text } from "@radix-ui/themes";
import { useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { Link as RouterLink, useNavigate } from "react-router";
import { useSession } from "~/components/product/session/auth-context";
import { ErrorCallout } from "~/components/ui/callout/error-callout";
import { Input } from "~/components/ui/input/input";
import { notifyLoginWelcome } from "~/utils/toasts/session";
import { useLoggedOutTasks } from "../use-logged-out-tasks";
import { useLoginFormState } from "./use-login-form-state";

export const LoginForm = () => {
  const { login } = useSession();
  const { saveTasksCreatedWhileLoggedOut } = useLoggedOutTasks();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { email, password, updateField, errors, hasErrors, updateErrors } =
    useLoginFormState();

  const handleEmailKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      passwordRef.current?.focus();
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (isLoading) {
      return;
    }

    setLoginFailed(false);

    const hasValidationErrors = updateErrors();
    if (hasValidationErrors) {
      return;
    }

    try {
      setIsLoading(true);
      const session = await login(email.trim(), password);

      if (session === null) {
        setLoginFailed(true);
        return;
      }

      await saveTasksCreatedWhileLoggedOut(session.user);
      notifyLoginWelcome(session.user.name);
      navigate("/");
    } catch (error) {
      console.error(error);
      setLoginFailed(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex direction="column" gap="4">
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Email
          </Text>
          <Input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => updateField("email", e.target.value)}
            onKeyDown={handleEmailKeyDown}
            color={errors.email ? "red" : undefined}
            required
            disabled={isLoading}
          />
        </label>

        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Password
          </Text>
          <Input
            ref={passwordRef}
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => updateField("password", e.target.value)}
            color={errors.password ? "red" : undefined}
            required
            disabled={isLoading}
          />
        </label>

        <ErrorCallout
          content="Please fill in all fields"
          visibleIf={hasErrors}
        />

        <ErrorCallout
          content="Invalid email or password"
          visibleIf={loginFailed}
        />

        <Button type="submit" size="3" mt="2" color="amber">
          Sign In {isLoading ? <Spinner size="1" /> : null}
        </Button>

        <Text size="2" color="gray" align="center">
          <Link asChild>
            <RouterLink to="/signup">Or create account</RouterLink>
          </Link>
        </Text>
      </Flex>
    </form>
  );
};
