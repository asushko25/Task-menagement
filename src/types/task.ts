import type { TaskStatus } from "./task-status";
import type { TaskPriority } from "./task-priority";

export interface BaseTask {
  id: string;
  title: string;
  description?: string;
  status?: TaskStatus;
  createdAt: string;
  dueDate?: string;
  priority?: TaskPriority;
}

export interface Task extends BaseTask {
  type: "task";
}

export interface Bug extends BaseTask {
  type: "bug";
  environment?: string;
}

export interface Epic extends BaseTask {
  type: "epic";
  tasks: (Task | Bug)[];
}

export type WorkItem = Task | Bug | Epic;
export type TaskType = WorkItem["type"];