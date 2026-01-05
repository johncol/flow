import { useEffect, useReducer, useState } from "react";
import * as api from "~/api/tasks";
import type { NewTaskInput, Task, TaskUpdates } from "~/types/tasks";
import { useSession } from "../session/auth-context";

export const useTasksState = () => {
  const [tasks, dispatch] = useReducer(tasksReducer, []);
  const [tasksLoading, setTasksLoading] = useState(true);
  const { userId } = useSession();

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const fetchedTasks = await api.fetchTasks(userId);
        const action: TasksAction = { type: "set", tasks: fetchedTasks };
        dispatch(action);
      } finally {
        setTasksLoading(false);
      }
    };
    loadTasks();
  }, []);

  const deleteTasks = async (ids: Set<string>) => {
    await api.deleteTasks(userId, ids);
    const action: TasksAction = { type: "delete", ids };
    dispatch(action);
  };

  const addTask = async (input: NewTaskInput) => {
    const task = await api.createTask(userId, input);
    const action: TasksAction = { type: "add", task };
    dispatch(action);
  };

  const updateTask = async (id: string, updates: TaskUpdates) => {
    await api.updateTask(userId, id, updates);
    const action: TasksAction = { type: "update", id, updates };
    dispatch(action);
  };

  return {
    tasks,
    tasksLoading,
    addTask,
    deleteTasks,
    updateTask,
  };
};

type TasksAction =
  | { type: "set"; tasks: Task[] }
  | { type: "add"; task: Task }
  | { type: "delete"; ids: Set<string> }
  | { type: "update"; id: string; updates: TaskUpdates };

const tasksReducer = (state: Task[], action: TasksAction): Task[] => {
  switch (action.type) {
    case "set":
      return [...action.tasks];
    case "add":
      return [...state, action.task];
    case "delete":
      return state.filter((task) => !action.ids.has(task.id));
    case "update":
      return state.map((task) =>
        task.id === action.id ? { ...task, ...action.updates } : task
      );
  }
};
