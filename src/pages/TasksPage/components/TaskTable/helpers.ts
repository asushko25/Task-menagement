export const strings = {
  empty: "No tasks yet",
  colTitle: "Title",
  colDescription: "Description",
  colStatus: "Status",
  colCreated: "Created",
  colDueDate: "Due Date",
  colPriority: "Priority",
  colType: "Type",
  deleteButton: "Delete Task",
  editButton: "Edit Task",
  noStatus: "No status",
  noPriority: "No priority",
  noType: "No type",
};

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
