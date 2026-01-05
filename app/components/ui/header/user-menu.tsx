import { CaretDownIcon, ExitIcon, PersonIcon } from "@radix-ui/react-icons";
import { Avatar, DropdownMenu, Text } from "@radix-ui/themes";
import { useNavigate } from "react-router";
import { useSession } from "~/components/product/session/auth-context";
import { menuContent, userAvatar, userMenuTrigger } from "./user-menu.css";

export const UserMenu = () => {
  const { session, logout } = useSession();
  const navigate = useNavigate();

  const user = session?.user;
  if (!user) {
    return null;
  }

  const logoutAndNavigate = () => {
    logout();
    navigate("/login");
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button className={userMenuTrigger}>
          <Avatar
            fallback={user.name.charAt(0)}
            className={userAvatar}
            size="2"
            color="gray"
          />
          <Text>{user.name}</Text>
          <CaretDownIcon width={20} height={20} />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className={menuContent}>
        <DropdownMenu.Item disabled>
          <PersonIcon />
          Profile
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item onSelect={logoutAndNavigate}>
          <ExitIcon />
          Close session
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
