import { Flex, Text } from "@radix-ui/themes";

import { Content } from "~/components/ui/content/content";
import { Header } from "~/components/ui/header/header";

export const Tasks = () => {
  return (
    <Flex direction="column">
      <Header />
      <Content>
        <Text>
          Welcome to Flow! The task management app that makes life simpler.
        </Text>
      </Content>
    </Flex>
  );
};
