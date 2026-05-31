import { Box } from "@mui/material";
import { useState } from "react";
import TaskDialog from "./components/TaskDialog/TaskDialog";
import TaskTable from "./components/TaskTable/TaskTable";
import { createLocalStorageTaskStorage } from "./services/storage/task-storage.local";
import useTaskManager from "./hooks/useTaskManager";
import { CreateTask } from "./components/CreateTaskButton/CreateTaskButton";
import { Header } from "./components/Header/Header";

const taskStorage = createLocalStorageTaskStorage();

function App() {
  const { tasks, createTask, deleteTask } = useTaskManager(taskStorage);
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Header />
      <CreateTask onOpen={() => setOpen(true)} />
      <TaskDialog
        open={open}
        onClose={() => setOpen(false)}
        onCreateTask={createTask}
      />
      <TaskTable tasks={tasks} onDeleteTask={deleteTask} />
    </Box>
  );
}

export default App;
