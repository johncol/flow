import { useEffect, useReducer, useState } from "react";
import * as api from "~/api/tasks";
import type { Task, TaskUpdates } from "~/types/tasks";
import { MOCK_USER_ID } from "../../../utils/mocks/mock-user";

export const useTasksState = () => {
  const [tasks, dispatch] = useReducer(tasksReducer, []);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const fetchedTasks = await api.fetchTasks(MOCK_USER_ID);
        dispatch({ type: "set", tasks: fetchedTasks });
      } finally {
        setIsLoading(false);
      }
    };
    loadTasks();
  }, []);

  const deleteTasks = async (ids: Set<string>) => {
    await api.deleteTasks(MOCK_USER_ID, ids);
    const action: TasksAction = { type: "delete", ids };
    dispatch(action);
  };

  const addTask = async (task: Task) => {
    await api.createTask(task);
    const action: TasksAction = { type: "add", task };
    dispatch(action);
  };

  const updateTask = async (id: string, updates: TaskUpdates) => {
    await api.updateTask(MOCK_USER_ID, id, updates);
    const action: TasksAction = { type: "update", id, updates };
    dispatch(action);
  };

  return {
    tasks,
    isLoading,
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
