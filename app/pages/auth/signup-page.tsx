import { Navigate } from "react-router";
import { useSession } from "~/components/product/session/auth-context";
import { SignupForm } from "~/components/product/session/signup-form/signup-form";
import { ModalPage } from "~/components/ui/modal-page/modal-page";
import { useIsDirectAccess } from "~/utils/navigation/use-is-direct-access";

export const SignupPage = () => {
  const { isLoggedIn } = useSession();
  const isDirectAccess = useIsDirectAccess();

  if (isLoggedIn && isDirectAccess) {
    return <Navigate to="/" />;
  }

  return (
    <ModalPage
      heading="Create account"
      subheading="Sign up to get started with Flow"
    >
      <SignupForm />
    </ModalPage>
  );
};
