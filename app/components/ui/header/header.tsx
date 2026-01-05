import { useSession } from "~/components/product/session/auth-context";
import { Logo } from "../logo/logo";
import { AuthCta } from "./auth-cta";
import { header } from "./header.css";
import { UserMenu } from "./user-menu";

export const Header = () => {
  const { isLoggedIn } = useSession();
  return (
    <div className={header}>
      <Logo />
      {isLoggedIn ? <UserMenu /> : <AuthCta />}
    </div>
  );
};
