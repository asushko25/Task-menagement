import type { TaskPriority } from "../../types/task-priority";
import type { TaskStatus } from "../../types/task-status";
import type { TaskType } from "../../types/task-type";

export const strings = {
  cancelButton: "Cancel",
  createButton: "Create",
  titleLabel: "Title",
  descriptionLabel: "Description",
  dueDateLabel: "Due Date",
  priorityLabel: "Priority",
  typeLabel: "Type",
  statusLabel: "Status",
  updateButton: "Update",
};

export const taskPriorityOptions: TaskPriority[] = ["low", "medium", "high"];
export const taskTypeOptions: TaskType[] = ["task", "bug", "feature"];
export const taskStatusOptions: TaskStatus[] = ["todo", "in-progress", "done"];
