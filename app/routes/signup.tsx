import { SignupPage } from "~/pages/auth/signup-page";
import type { Route } from "./+types/signup";

const title = "Sign Up | Flow";
const description = "Create your Flow account";

export const meta = ({}: Route.MetaArgs) => {
  return [{ title }, { name: "description", content: description }];
};

const Signup = () => {
  return <SignupPage />;
};
export default Signup;
