import { LoginForm } from "~/components/product/session/login-form/login-form";
import { ModalPage } from "~/components/ui/modal-page/modal-page";

export const LoginPage = () => {
  return (
    <ModalPage heading="Welcome back" subheading="Sign in to continue to Flow">
      <LoginForm />
    </ModalPage>
  );
};
