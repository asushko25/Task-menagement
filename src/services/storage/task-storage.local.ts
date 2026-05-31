import type { Task } from "../../types/task";
import type { TaskStorage } from "./task-storage.interface";

const TASKS_STORAGE_KEY = "tasks.v1";

export const createLocalStorageTaskStorage = (): TaskStorage => {
  const readTasks = (): Task[] => {
    try {
      const raw = localStorage.getItem(TASKS_STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Task[]) : [];
    } catch {
      return [];
    }
  };

  const writeTasks = (tasks: Task[]): void => {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  };

  return {
    getTasks(): Task[] {
      return readTasks();
    },

    createTask(task: Task): void {
      writeTasks([...readTasks(), task]);
    },

    deleteTask(id: string): void {
      writeTasks(readTasks().filter((task) => task.id !== id));
    },
  };
};
