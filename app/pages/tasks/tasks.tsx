import { Flex } from "@radix-ui/themes";
import { TasksActions } from "~/components/product/tasks-actions/tasks-actions";
import { TaskSelectionProviderWrapper } from "~/components/product/tasks-table/bulk-select/task-selection-context-wrapper";
import { TasksTable } from "~/components/product/tasks-table/tasks-table";
import { Content } from "~/components/ui/content/content";
import { Header } from "~/components/ui/header/header";
import { TasksProvider } from "../../components/product/tasks-context";

export const Tasks = () => {
  return (
    <TasksProvider>
      <TaskSelectionProviderWrapper>
        <Flex direction="column">
          <Header />
          <Content>
            <TasksActions />
            <TasksTable />
          </Content>
        </Flex>
      </TaskSelectionProviderWrapper>
    </TasksProvider>
  );
};
