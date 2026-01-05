import { Link } from "react-router";
import { logo } from "./logo.css";

type LogoProps = {
  className?: string;
};

export const Logo = ({ className }: LogoProps) => {
  return (
    <Link to="/">
      <img src="/logo.svg" alt="Flow" className={`${logo} ${className}`} />
    </Link>
  );
};
