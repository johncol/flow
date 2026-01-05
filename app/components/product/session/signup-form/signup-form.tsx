import { Button, Flex, Link, Spinner, Text } from "@radix-ui/themes";
import { useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { Link as RouterLink, useNavigate } from "react-router";
import { useSession } from "~/components/product/session/auth-context";
import { ErrorCallout } from "~/components/ui/callout/error-callout";
import { Input } from "~/components/ui/input/input";
import { ModalPage } from "~/components/ui/modal-page/modal-page";
import { showSuccessToast } from "~/components/ui/toast/toast";
import { DomainError } from "~/errors/domain-error";
import { useSignupFormState } from "./use-signup-form-state";

export const SignupForm = () => {
  const { signup } = useSession();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [signupError, setSignupError] = useState<string | null>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const {
    name,
    email,
    password,
    updateName,
    updateEmail,
    updatePassword,
    errors,
    hasErrors,
    updateErrors,
  } = useSignupFormState();

  const handleNameKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      emailRef.current?.focus();
    }
  };

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

    setSignupError(null);

    const hasValidationErrors = updateErrors();
    if (hasValidationErrors) {
      return;
    }

    try {
      setIsLoading(true);

      const session = await signup({
        name: name.trim(),
        email: email.trim(),
        password,
      });

      if (session === null) {
        setSignupError(DEFAULT_ERROR_MESSAGE);
        return;
      }

      showSuccessToast(`Welcome to Flow, ${session.user.name}!`);
      navigate("/");
    } catch (error) {
      console.error(error);
      if (error instanceof DomainError) {
        setSignupError(error.message);
      } else {
        setSignupError(DEFAULT_ERROR_MESSAGE);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalPage
      heading="Create account"
      subheading="Sign up to get started with Flow"
    >
      <form onSubmit={handleSubmit}>
        <Flex direction="column" gap="4">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Name
            </Text>
            <Input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => updateName(e.target.value)}
              onKeyDown={handleNameKeyDown}
              color={errors.name ? "red" : undefined}
              required
              disabled={isLoading}
            />
          </label>

          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Email
            </Text>
            <Input
              ref={emailRef}
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => updateEmail(e.target.value)}
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
              placeholder="Create a password"
              value={password}
              onChange={(e) => updatePassword(e.target.value)}
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
            content={signupError!}
            visibleIf={signupError !== null}
          />

          <Button type="submit" size="3" mt="2" color="amber">
            Create Account {isLoading ? <Spinner size="1" /> : null}
          </Button>

          <Text size="2" color="gray" align="center">
            <Link asChild>
              <RouterLink to="/login">Or login</RouterLink>
            </Link>
          </Text>
        </Flex>
      </form>
    </ModalPage>
  );
};

const DEFAULT_ERROR_MESSAGE =
  "Unable to create account. Please try again or contact our support team.";
