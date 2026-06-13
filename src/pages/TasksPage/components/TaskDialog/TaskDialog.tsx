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
import type { CreateWorkItemInput } from "../../../../hooks/useWorkItemManager";
import {
  strings,
  taskPriorityOptions,
  taskSeverityOptions,
  taskStatusOptions,
  taskTypeOptions,
} from "./helpers";

import { autocompleStyle } from "./styles";
import { FormTextField } from "./components/FormTextField";
import { SelectField } from "./components/SelectField";
import { Controller, useForm, useWatch } from "react-hook-form";
import type { TaskType, WorkItem } from "../../../../types/task";
import type { TaskStatus } from "../../../../types/task-status";
import type { TaskPriority } from "../../../../types/task-priority";
import type { TaskSeverity } from "../../../../types/task-severity";
import { MultiSelectField } from "./components/MultiSelectField";

type FormValues = {
  title: string;
  description: string;
  dueDate: Dayjs | null;
  priority: TaskPriority | null;
  severity: TaskSeverity | null;
  type: TaskType | null;
  status: TaskStatus | null;
  subtasksIds: string[] | [];
};

type TaskDialogProps = {
  open: boolean;
  onClose: () => void;
  onCreateTask: (input: CreateWorkItemInput) => void;
  isEditingTask?: WorkItem;
  onUpdateTask: (task: WorkItem) => void;
  availableSubtasks: WorkItem[];
};

const TaskDialog = ({
  open,
  onClose,
  onCreateTask,
  onUpdateTask,
  isEditingTask,
  availableSubtasks,
}: TaskDialogProps) => {
  const selectableSubtasks = availableSubtasks.filter(
    (task) => task.id !== isEditingTask?.id,
  );
  const selectableSubtaskIds = new Set(selectableSubtasks.map((t) => t.id));

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
      severity: isEditingTask?.type === "bug" ? isEditingTask.severity : null,
      type: isEditingTask?.type ?? null,
      status: isEditingTask?.status ?? null,
      subtasksIds:
        isEditingTask?.type === "epic"
          ? (isEditingTask.subtaskIds ?? []).filter((id) =>
              selectableSubtaskIds.has(id),
            )
          : [],
    },
  });

  const onSubmit = (data: FormValues) => {
    if (!data.type) return;

    if (isEditingTask) {
      onUpdateTask({
        ...isEditingTask,
        title: data.title,
        description: data.description,
        status: data.status ?? undefined,
        dueDate: data.dueDate ? data.dueDate.toISOString() : undefined,
        priority: data.priority ?? undefined,
        severity: data.severity ?? undefined,
        type: data.type,
        subtaskIds: data.type === "epic" ? data.subtasksIds : undefined,
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
      severity: data.severity ?? undefined,
      type: data.type,
      status: data.status ?? undefined,
      subtaskIds: data.type === "epic" ? data.subtasksIds : undefined,
    });
    reset();
    onClose();

    return;
  };

  const selectedType = useWatch({
    control,
    name: "type",
  });

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
              <FormTextField
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
              <FormTextField
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
              <SelectField
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
              <SelectField
                sx={autocompleStyle}
                options={taskPriorityOptions}
                label={strings.priorityLabel}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          {selectedType === "bug" && (
            <Controller
              name="severity"
              control={control}
              render={({ field }) => (
                <SelectField
                  sx={autocompleStyle}
                  options={taskSeverityOptions}
                  label={strings.severityLabel}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          )}

          <Controller
            name="type"
            control={control}
            rules={{ required: strings.typeRequired }}
            render={({ field }) => (
              <SelectField
                sx={autocompleStyle}
                options={taskTypeOptions}
                label={strings.typeLabel}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          {selectedType === "epic" && (
            <Controller
              name="subtasksIds"
              control={control}
              render={({ field }) => (
                <MultiSelectField
                  label={strings.subtasksLabel}
                  options={selectableSubtasks.map((t) => ({
                    id: t.id,
                    label: t.title,
                  }))}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          )}
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
