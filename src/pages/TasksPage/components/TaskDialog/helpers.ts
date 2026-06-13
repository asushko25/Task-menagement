import type { TaskType } from "../../../../types/task";
import type { TaskPriority } from "../../../../types/task-priority";
import type { TaskSeverity } from "../../../../types/task-severity";
import type { TaskStatus } from "../../../../types/task-status";

export const strings = {
  cancelButton: "Cancel",
  createButton: "Create",
  titleLabel: "Title",
  descriptionLabel: "Description",
  dueDateLabel: "Due Date",
  priorityLabel: "Priority",
  typeLabel: "Type",
  statusLabel: "Status",
  severityLabel: "Severity",
  updateButton: "Update",
  titleRequired: "Title is required",
  subtasksLabel: "Subtasks",
  typeRequired: "Type is required",
};

export const taskPriorityOptions: TaskPriority[] = ["low", "medium", "high"];
export const taskTypeOptions: TaskType[] = ["task", "bug", "epic"];
export const taskStatusOptions: TaskStatus[] = ["todo", "in-progress", "done"];
export const taskSeverityOptions: TaskSeverity[] = [
  "minor",
  "major",
  "critical",
];
