import { SignupForm } from "~/components/product/session/signup-form/signup-form";
import { ModalPage } from "~/components/ui/modal-page/modal-page";

export const SignupPage = () => {
  return (
    <ModalPage
      heading="Create account"
      subheading="Sign up to get started with Flow"
    >
      <SignupForm />
    </ModalPage>
  );
};
