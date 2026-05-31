import {
  Button,
  Dialog,
  DialogActions,
  TextField,
  DialogContent,
  Autocomplete,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { type Dayjs } from "dayjs";
import { useState } from "react";
import type { CreateTaskInput } from "../../hooks/useTaskManager";
import type { TaskPriority } from "../../types/task-priority";
import {
  strings,
  taskPriorityOptions,
  taskStatusOptions,
  taskTypeOptions,
} from "./helpers";
import type { TaskType } from "../../types/task-type";
import { autocompleStyle } from "./styles";
import type { TaskStatus } from "../../types/task-status";
import { TaskTextField } from "./components/TaskTextField/TaskTextField";
import { TaskSelectField } from "./components/TaskSelectField/TaskSelectField";

type TaskDialogProps = {
  open: boolean;
  onClose: () => void;
  onCreateTask: (input: CreateTaskInput) => void;
};

const TaskDialog = ({ open, onClose, onCreateTask }: TaskDialogProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus | null>(null);
  const [dueDate, setDueDate] = useState<Dayjs | null>(null);
  const [priority, setPriority] = useState<TaskPriority | null>(null);
  const [type, setType] = useState<TaskType | null>(null);

  const handleCreate = () => {
    onCreateTask({
      title,
      description,
      dueDate: dueDate ? dueDate.toISOString() : undefined,
      priority: priority ?? undefined,
      type: type ?? undefined,
      status: status ?? undefined,
    });
    setTitle("");
    setDescription("");
    setDueDate(null);
    setPriority(null);
    setType(null);
    setStatus(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <TaskTextField
          value={title}
          label={strings.titleLabel}
          onChange={setTitle}
        />

        <TaskTextField
          value={description}
          label={strings.descriptionLabel}
          onChange={setDescription}
        />

        <TaskSelectField
          sx={autocompleStyle}
          options={taskStatusOptions}
          value={status}
          onChange={(newValue) => setStatus(newValue)}
          label={strings.statusLabel}
        />

        <DatePicker
          label={strings.dueDateLabel}
          value={dueDate}
          onChange={(newValue) => setDueDate(newValue)}
          minDate={dayjs()}
          slotProps={{
            textField: {
              fullWidth: true,
              margin: "normal",
            },
          }}
        />

        <TaskSelectField
          sx={autocompleStyle}
          options={taskPriorityOptions}
          value={priority}
          onChange={(newValue) => setPriority(newValue)}
          label={strings.priorityLabel}
        />

        <TaskSelectField
          sx={autocompleStyle}
          options={taskTypeOptions}
          value={type}
          onChange={(newValue) => setType(newValue)}
          label={strings.typeLabel}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>{strings.cancelButton}</Button>

        <Button
          variant="contained"
          disabled={!title.trim()}
          onClick={handleCreate}
        >
          {strings.createButton}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskDialog;
