import * as tasksApi from "~/api/tasks";
import type { SessionUser } from "~/types/session";
import { ANONYMOUS } from "~/types/users";
import {
  notifyLoggedOutTasksSaved,
  notifyLoggedOutTasksSaveFailed,
} from "~/utils/toasts/session";

type TasksCount = number;

export const useLoggedOutTasks = () => {
  const saveTasksCreatedWhileLoggedOut = async (
    user: SessionUser
  ): Promise<TasksCount> => {
    try {
      const loggedOutTasks = await tasksApi.fetchTasks(ANONYMOUS);
      const tasksCount = loggedOutTasks.length;
      if (tasksCount === 0) {
        return 0;
      }

      const tasksToImport = loggedOutTasks.map((task) => ({
        ...task,
        userId: user.id,
      }));
      await tasksApi.importTasks(user.id, tasksToImport);

      const tasksIds = new Set(loggedOutTasks.map((task) => task.id));
      tasksApi.deleteTasks(ANONYMOUS, tasksIds);

      notifyLoggedOutTasksSaved(tasksCount);

      return tasksCount;
    } catch (error) {
      console.error(error);
      notifyLoggedOutTasksSaveFailed();
      return 0;
    }
  };

  return {
    saveTasksCreatedWhileLoggedOut,
  };
};
