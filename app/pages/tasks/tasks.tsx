import { Flex, Text } from "@radix-ui/themes";
import { RadixDemo } from "~/components/radix-demo";

export const Tasks = () => {
  return (
    <Flex direction="column" gap="2" align="start">
      <Text>
        Welcome to Flow! The task management app that makes life simpler.
      </Text>
      <RadixDemo />
    </Flex>
  );
};
