import { Theme } from "@radix-ui/themes";

export const RadixUIProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Theme
      appearance="light"
      accentColor="bronze"
      radius="full"
      scaling="100%"
    >
      {children}
    </Theme>
  );
};
