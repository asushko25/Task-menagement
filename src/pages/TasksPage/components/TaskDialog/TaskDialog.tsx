import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";
import { Button } from "../../../../components/UI/Button/Button";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { type Dayjs } from "dayjs";
import type { CreateTaskInput } from "../../../../hooks/useTaskManager";
import {
  strings,
  taskPriorityOptions,
  taskStatusOptions,
  taskTypeOptions,
} from "./helpers";

import { autocompleStyle } from "./styles";
import { TaskTextField } from "./components/TextField";
import { TaskSelectField } from "./components/SelectField";
import type { Task } from "../../../../types/task";
import { Controller, useForm } from "react-hook-form";
import type { TaskType } from "../../../../types/task";
import type { TaskStatus } from "../../../../types/task-status";
import type { TaskPriority } from "../../../../types/task-priority";

type FormValues = {
  title: string;
  description: string;
  dueDate: Dayjs | null;
  priority: TaskPriority | null;
  type: TaskType | null;
  status: TaskStatus | null;
};

type TaskDialogProps = {
  open: boolean;
  onClose: () => void;
  onCreateTask: (input: CreateTaskInput) => void;
  isEditingTask?: Task;
  onUpdateTask: (task: Task) => void;
};

const TaskDialog = ({
  open,
  onClose,
  onCreateTask,
  onUpdateTask,
  isEditingTask,
}: TaskDialogProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title: isEditingTask?.title ?? "",
      description: isEditingTask?.description ?? "",
      dueDate: isEditingTask?.dueDate ? dayjs(isEditingTask.dueDate) : null,
      priority: isEditingTask?.priority ?? null,
      type: isEditingTask?.type ?? null,
      status: isEditingTask?.status ?? null,
    },
  });

  const onSubmit = (data: FormValues) => {
    if (isEditingTask) {
      onUpdateTask({
        ...isEditingTask,
        title: data.title,
        description: data.description,
        status: data.status ?? undefined,
        dueDate: data.dueDate ? data.dueDate.toISOString() : undefined,
        priority: data.priority ?? undefined,
        type: data.type ?? undefined,
      });
      reset();
      onClose();

      return;
    }

    onCreateTask({
      title: data.title,
      description: data.description,
      dueDate: data.dueDate ? data.dueDate.toISOString() : undefined,
      priority: data.priority ?? undefined,
      type: data.type ?? undefined,
      status: data.status ?? undefined,
    });
    reset();
    onClose();

    return;
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Box>
            <IconButton aria-label="close" size="small" onClick={onClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          <Controller
            name="title"
            control={control}
            rules={{ required: strings.titleRequired }}
            render={({ field }) => (
              <TaskTextField
                label={strings.titleLabel}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <Typography variant="caption" color="error">
            {errors.title?.message}
          </Typography>

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TaskTextField
                label={strings.descriptionLabel}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <TaskSelectField
                sx={autocompleStyle}
                options={taskStatusOptions}
                label={strings.statusLabel}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          <Controller
            name="dueDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                label={strings.dueDateLabel}
                value={field.value}
                onChange={field.onChange}
                minDate={dayjs()}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    margin: "normal",
                  },
                }}
              />
            )}
          />

          <Controller
            name="priority"
            control={control}
            render={({ field }) => (
              <TaskSelectField
                sx={autocompleStyle}
                options={taskPriorityOptions}
                label={strings.priorityLabel}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <TaskSelectField
                sx={autocompleStyle}
                options={taskTypeOptions}
                label={strings.typeLabel}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>{strings.cancelButton}</Button>

          <Button type="submit" variant="contained">
            {isEditingTask ? strings.updateButton : strings.createButton}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TaskDialog;
