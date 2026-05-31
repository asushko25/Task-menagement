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
        <TextField
          value={title}
          label={strings.titleLabel}
          fullWidth
          margin="normal"
          multiline
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          value={description}
          label={strings.descriptionLabel}
          fullWidth
          margin="normal"
          multiline
          onChange={(e) => setDescription(e.target.value)}
        />

        <Autocomplete
          sx={autocompleStyle}
          options={taskStatusOptions}
          value={status}
          onChange={(_, newValue) => setStatus(newValue)}
          getOptionLabel={(option) => option}
          renderInput={(params) => (
            <TextField {...params} label={strings.statusLabel} fullWidth />
          )}
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

        <Autocomplete
          sx={autocompleStyle}
          options={taskPriorityOptions}
          value={priority}
          onChange={(_, newValue) => setPriority(newValue)}
          getOptionLabel={(option) => option}
          renderInput={(params) => (
            <TextField {...params} label={strings.priorityLabel} fullWidth />
          )}
        />

        <Autocomplete
          sx={autocompleStyle}
          options={taskTypeOptions}
          value={type}
          onChange={(_, newValue) => setType(newValue)}
          getOptionLabel={(option) => option}
          renderInput={(params) => (
            <TextField {...params} label={strings.typeLabel} fullWidth />
          )}
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
