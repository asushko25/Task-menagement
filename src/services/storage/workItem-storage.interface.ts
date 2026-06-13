import type { WorkItem } from "../../types/task";

export interface WorkItemStorage {
  getWorkItems(): WorkItem[];
  createWorkItem(task: WorkItem): void;
  deleteWorkItem(id: string): void;
  updateWorkItem(task: WorkItem): void;
}
