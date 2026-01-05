import { LoginPage } from "~/pages/auth/login-page";
import type { Route } from "./+types/login";

const title = "Login | Flow";
const description = "Login to your Flow account";

export const meta = ({}: Route.MetaArgs) => {
  return [{ title }, { name: "description", content: description }];
};

const Login = () => {
  return <LoginPage />;
};
export default Login;
