import { Badge as RadixBadge, type BadgeProps } from "@radix-ui/themes";
import { badge } from "./badge.css";

export const Badge: React.FC<BadgeProps> = ({className, ...props}) => {
  return (
    <RadixBadge
      radius="full"
      variant="soft"
      highContrast
      className={`${badge} ${className}`}
      {...props}
    >
      {props.children}
    </RadixBadge>
  );
};
