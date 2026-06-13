import type { TaskStatus } from "./task-status";
import type { TaskPriority } from "./task-priority";
import type { TaskSeverity } from "./task-severity";

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
  severity?: TaskSeverity;
}

export interface Epic extends BaseTask {
  type: "epic";
  subtaskIds?: string[];
}

export type WorkItem = Task | Bug | Epic;
export type TaskType = WorkItem["type"];
