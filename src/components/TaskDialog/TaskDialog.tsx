import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
} from "@mui/material";
import { Button } from "../UI/Button/Button";
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
import { TaskTextField } from "./components/TextField";
import { TaskSelectField } from "./components/SelectField";
import type { Task } from "../../types/task";

type TaskDialogProps = {
  open: boolean;
  onClose: () => void;
  onCreateTask: (input: CreateTaskInput) => void;
  task?: Task;
  onUpdateTask: (task: Task) => void;
};

const TaskDialog = ({
  open,
  onClose,
  onCreateTask,
  onUpdateTask,
  task: isEditingTask,
}: TaskDialogProps) => {
  const [title, setTitle] = useState(isEditingTask?.title ?? "");
  const [description, setDescription] = useState(
    isEditingTask?.description ?? "",
  );
  const [status, setStatus] = useState<TaskStatus | null>(
    isEditingTask?.status ?? null,
  );
  const [dueDate, setDueDate] = useState<Dayjs | null>(
    isEditingTask?.dueDate ? dayjs(isEditingTask.dueDate) : null,
  );
  const [priority, setPriority] = useState<TaskPriority | null>(
    isEditingTask?.priority ?? null,
  );
  const [type, setType] = useState<TaskType | null>(
    isEditingTask?.type ?? null,
  );

  const handleCreate = () => {
    if (isEditingTask) {
      onUpdateTask({
        ...isEditingTask,
        title,
        description,
        status: status ?? undefined,
        dueDate: dueDate ? dueDate.toISOString() : undefined,
        priority: priority ?? undefined,
        type: type ?? undefined,
      });
      setTitle("");
      setDescription("");
      setDueDate(null);
      setPriority(null);
      setType(null);
      setStatus(null);
      onClose();

      return;
    }

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
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton aria-label="close" size="small" onClick={onClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

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
          {isEditingTask ? strings.updateButton : strings.createButton}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskDialog;
