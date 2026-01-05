import { logo } from "./logo.css";

type LogoProps = {
  className?: string;
};

export const Logo = ({ className }: LogoProps) => {
  return <img src="/logo.svg" alt="Flow" className={`${logo} ${className}`} />;
};
