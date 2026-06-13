export const strings = {
  empty: "No tasks yet",
  colTitle: "Title",
  colDescription: "Description",
  colStatus: "Status",
  colCreated: "Created",
  colDueDate: "Due Date",
  colPriority: "Priority",
  colSeverity: "Severity",
  colType: "Type",
  colSubtasks: "Subtasks",
  deleteButton: "Delete Task",
  editButton: "Edit Task",
  noStatus: "No status",
  noPriority: "No priority",
  noType: "No type",
  Quantity: "Quantity",
  subtaskTooltip: "This epic has {0} subtask(s)",
};

// Utility functions for formatting strings and dates
export const formatString = (
  template: string,
  ...values: (string | number)[]
) =>
  template.replace(/\{(\d+)\}/g, (_, index) =>
    String(values[Number(index)] ?? ""),
  );

export const formatLocalDateTime = (value?: string) => {
  if (!value) {
    return "—";
  }

  return new Date(value).toLocaleString();
};

export const formatLocalDate = (value?: string) => {
  if (!value) {
    return "—";
  }

  return new Date(value).toLocaleDateString();
};
