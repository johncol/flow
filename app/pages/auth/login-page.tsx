import { Navigate } from "react-router";
import { useSession } from "~/components/product/session/auth-context";
import { LoginForm } from "~/components/product/session/login-form/login-form";
import { ModalPage } from "~/components/ui/modal-page/modal-page";
import { useIsDirectAccess } from "~/utils/navigation/use-is-direct-access";

export const LoginPage = () => {
  const { isLoggedIn } = useSession();
  const isDirectAccess = useIsDirectAccess();

  if (isLoggedIn && isDirectAccess) {
    return <Navigate to="/" />;
  }

  return (
    <ModalPage heading="Welcome back" subheading="Sign in to continue to Flow">
      <LoginForm />
    </ModalPage>
  );
};
