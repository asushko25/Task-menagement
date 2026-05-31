import type { Task } from "../../types/task";

export interface TaskStorage {
  getTasks(): Task[];
  createTask(task: Task): void;
  deleteTask(id: string): void;
}
