import { Flex } from "@radix-ui/themes";
import { AddTaskDialog } from "~/components/product/tasks/add-task-dialog/add-task-dialog";
import { NewTaskProviderWrapper } from "~/components/product/tasks/add-task-dialog/new-task-context-wrapper";
import { TasksActions } from "~/components/product/tasks/tasks-actions/tasks-actions";
import { TasksProvider } from "~/components/product/tasks/tasks-context";
import { TaskSelectionProviderWrapper } from "~/components/product/tasks/tasks-table/bulk-select/task-selection-context-wrapper";
import { TasksTable } from "~/components/product/tasks/tasks-table/tasks-table";
import { Content } from "~/components/ui/content/content";
import { Header } from "~/components/ui/header/header";

export const Tasks = () => {
  return (
    <TasksProvider>
      <TaskSelectionProviderWrapper>
        <NewTaskProviderWrapper>
          <Flex direction="column">
            <Header />
            <Content>
              <TasksActions />
              <TasksTable />
            </Content>
          </Flex>
          <AddTaskDialog />
        </NewTaskProviderWrapper>
      </TaskSelectionProviderWrapper>
    </TasksProvider>
  );
};
