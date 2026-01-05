import { CaretDownIcon } from "@radix-ui/react-icons";
import { Avatar, Button, Text } from "@radix-ui/themes";
import { useSession } from "~/components/product/session/auth-context";
import { userAvatar, userMenu } from "./user-menu.css";

export const UserMenu = () => {
  const { session } = useSession();
  const user = session!.user;
  return (
    <Button className={userMenu}>
      <Avatar fallback={user.name.charAt(0)} className={userAvatar} size="2" />
      <Text>{user.name}</Text>
      <CaretDownIcon width={20} height={20} />
    </Button>
  );
};
