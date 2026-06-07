import { useState } from "react";
import { Box, Tooltip, Typography } from "@mui/material";
import useTaskManager from "../../hooks/useTaskManager";
import { createLocalStorageTaskStorage } from "../../services/storage/task-storage.local";
import TaskDialog from "../../components/TaskDialog/TaskDialog";
import TaskTable from "../../components/TaskTable/TaskTable";
import { Button } from "../../components/UI/Button/Button";
import { strings } from "./helpers";
import { addButtonContainerStyles, titleStyles } from "./styles";
import { Footer } from "../../components/Footer/Footer";
import type { Task } from "../../types/task";

const taskStorage = createLocalStorageTaskStorage();

export const TasksPage = () => {
  const { tasks, createTask, deleteTask, updateTask } =
    useTaskManager(taskStorage);
  const [open, setOpen] = useState(false);
  const [isEditingTask, setIsEditingTask] = useState<Task | null>(null);

  return (
    <>
      <Typography variant="h1" sx={titleStyles}>
        {strings.title}
      </Typography>

      <Box sx={addButtonContainerStyles}>
        <Tooltip title={strings.createTaskTooltip} placement="right">
          <Button onClick={() => setOpen(true)}>{strings.addTaskButton}</Button>
        </Tooltip>
      </Box>

      <TaskDialog
        key={isEditingTask?.id ?? "new"}
        open={open || isEditingTask !== null}
        onClose={() => {
          setOpen(false);
          setIsEditingTask(null);
        }}
        onCreateTask={createTask}
        onUpdateTask={updateTask}
        isEditingTask={isEditingTask ?? undefined}
      />
      <TaskTable
        tasks={tasks}
        onDeleteTask={deleteTask}
        onUpdateTask={(task) => setIsEditingTask(task)}
      />
      <Footer />
    </>
  );
};
