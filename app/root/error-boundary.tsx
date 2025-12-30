import { isRouteErrorResponse, Link } from "react-router";

import type { Route } from "../+types/root";
import {
  container,
  errorCode,
  title,
  description,
  stackContainer,
  stackCode,
  homeLink,
} from "./error-boundary.css";

export const ErrorBoundary = ({ error }: Route.ErrorBoundaryProps) => {
  const { code, message, details, stack } = getErrorDetails(error);

  return (
    <main className={container}>
      <p className={errorCode}>{code}</p>
      <h1 className={title}>{message}</h1>
      <p className={description}>{details}</p>

      {stack && (
        <div className={stackContainer}>
          <code className={stackCode}>{stack}</code>
        </div>
      )}

      <Link to="/" className={homeLink}>
        Go home
      </Link>
    </main>
  );
};

const getErrorDetails = (error: unknown) => {
  let code = "!";
  let message = "Something went wrong";
  let details = "An unexpected error occurred";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    code = String(error.status);
    message = error.status === 404 ? "Page not found" : "Error";
    details =
      error.status === 404
        ? "The page you're looking for doesn't exist."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return { code, message, details, stack };
};
