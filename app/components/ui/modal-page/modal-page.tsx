import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import type { ReactNode } from "react";
import { Logo } from "../logo/logo";
import { container, formCard, logo } from "./modal-page.css";

type ModalPageProps = {
  heading: string;
  subheading: string;
  className?: string;
  children: ReactNode;
};

export const ModalPage = ({
  heading,
  subheading,
  className,
  children,
}: ModalPageProps) => {
  const cardClassName = [formCard, className].filter(Boolean).join(" ");

  return (
    <div className={container}>
      <Logo className={logo} />
      <Card size="4" className={cardClassName}>
        <Flex direction="column" align="center" mb="5">
          <Heading size="6" mb="1">
            {heading}
          </Heading>
          <Text size="2" color="gray">
            {subheading}
          </Text>
        </Flex>
        {children}
      </Card>
    </div>
  );
};
