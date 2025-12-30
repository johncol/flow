import { Flex } from "@radix-ui/themes";
import { TasksTable } from "~/components/product/tasks-table/tasks-table";
import { Content } from "~/components/ui/content/content";
import { Header } from "~/components/ui/header/header";

export const Tasks = () => {
  return (
    <Flex direction="column">
      <Header />
      <Content>
        <TasksTable />
      </Content>
    </Flex>
  );
};
