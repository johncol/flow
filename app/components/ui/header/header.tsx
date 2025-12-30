import { CaretDownIcon } from "@radix-ui/react-icons";
import { Avatar, Button, Text } from "@radix-ui/themes";
import { header, logo, userAvatar, userMenu } from "./header.css";

export const Header = () => {
  return (
    <div className={header}>
      <Logo />
      <UserMenu />
    </div>
  );
};

const Logo = () => {
  return <img src="/logo.svg" alt="Flow" className={logo} />;
};

const UserMenu = () => {
  return (
    <Button className={userMenu}>
      <Avatar
        src="https://cdn.faire.com/fastly/dc25f733e06dceea6d2a465dd2fa539f8c57f0062539fcca2009487594a05f21.jpeg"
        fallback="J"
        className={userAvatar}
        size="2"
      />
      <Text>John</Text>
      <CaretDownIcon width={20} height={20} />
    </Button>
  );
};
