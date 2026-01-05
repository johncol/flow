import { useSession } from "~/components/product/session/auth-context";
import { AuthCta } from "./auth-cta";
import { header, logo } from "./header.css";
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

const Logo = () => {
  return <img src="/logo.svg" alt="Flow" className={logo} />;
};
