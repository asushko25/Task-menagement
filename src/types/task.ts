import type { TaskStatus } from "./task-status";
import type { TaskPriority } from "./task-priority";
import type { TaskType } from "./task-type";

export type Task = {
  id: string;
  title: string;
  type?: TaskType;
  description?: string;
  status?: TaskStatus;
  createdAt: string;
  dueDate?: string;
  priority?: TaskPriority;
};
