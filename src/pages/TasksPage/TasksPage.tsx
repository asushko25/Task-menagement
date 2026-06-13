import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useWorkItemManager } from "../../hooks/useWorkItemManager";
import TaskDialog from "./components/TaskDialog/TaskDialog";
import TaskTable from "./components/TaskTable/TaskTable";
import { Button } from "../../components/UI/Button/Button";
import { strings } from "./helpers";
import { addButtonContainerStyles, titleStyles } from "./styles";
import { Footer } from "../../components/Footer/Footer";
import type { WorkItem } from "../../types/task";
import { createLocalStorageWorkItemStorage } from "../../services/storage/workItem-storage.local";
import { Tooltip } from "../../components/UI/Tooltip/Tooltip";
const taskStorage = createLocalStorageWorkItemStorage();

export const TasksPage = () => {
  const { tasks, createWorkItem, deleteWorkItem, updateWorkItem } =
    useWorkItemManager(taskStorage);
  const [open, setOpen] = useState(false);
  const [isEditingTask, setIsEditingTask] = useState<WorkItem | null>(null);

  // Tasks/bugs that can be attached as subtasks to an epic
  const availableSubtasks = tasks.filter(
    (task) => task.type === "task" || task.type === "bug",
  );

  return (
    <>
      <Typography variant="h1" sx={titleStyles}>
        {strings.title}
      </Typography>

      <Box sx={addButtonContainerStyles}>
        <Tooltip title={strings.createTaskTooltip}>
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
        onCreateTask={createWorkItem}
        onUpdateTask={updateWorkItem}
        isEditingTask={isEditingTask ?? undefined}
        availableSubtasks={availableSubtasks}
      />
      <TaskTable
        tasks={tasks}
        onDeleteTask={deleteWorkItem}
        onUpdateTask={(task) => setIsEditingTask(task)}
      />
      <Footer />
    </>
  );
};
