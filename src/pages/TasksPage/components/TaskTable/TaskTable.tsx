import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import { Button } from "../../../../components/UI/Button/Button";
import {
  baseCellStyles,
  emptyStateCellStyles,
  headerRowStyles,
  tableContainerStyles,
  tableStyles,
  editIconStyle,
} from "./styles";
import type { Task } from "../../../../types/task";
import { formatLocalDate, formatLocalDateTime, strings } from "./helpers";
import EditIcon from "@mui/icons-material/Edit";

const renderTaskList = (
  tasks: Task[],
  onDeleteTask: (id: string) => void,
  onUpdateTask: (task: Task) => void,
) => {
  if (tasks.length === 0) {
  return  (
    <TableRow>
      <TableCell align="center" colSpan={9} sx={emptyStateCellStyles}>
        {strings.empty}
      </TableCell>
    </TableRow>
    );
  }

  return tasks.map((task) => (
        <TableRow key={task.id}>
          <TableCell sx={baseCellStyles}>{task.title}</TableCell>
          <TableCell sx={baseCellStyles}>{task.description}</TableCell>
          <TableCell sx={baseCellStyles}>
          {task.status ?? strings.noStatus}
        </TableCell>
        <TableCell sx={baseCellStyles}>
          {formatLocalDateTime(task.createdAt)}
        </TableCell>
        <TableCell sx={baseCellStyles}>
          {formatLocalDate(task.dueDate)}
        </TableCell>
        <TableCell sx={baseCellStyles}>
          {task.priority ?? strings.noPriority}
        </TableCell>
        <TableCell sx={baseCellStyles}>{task.type ?? strings.noType}</TableCell>

        <TableCell sx={baseCellStyles}>
          <IconButton aria-label="edit" onClick={() => onUpdateTask(task)}>
            <EditIcon sx={editIconStyle} />
          </IconButton>
        </TableCell>

        <TableCell sx={baseCellStyles}>
          <Button
            variant="outlined"
            color="error"
            onClick={() => onDeleteTask(task.id)}
          >
            {strings.deleteButton}
          </Button>
        </TableCell>
      </TableRow>
  ))
};

export const TaskTable = ({
  tasks,
  onDeleteTask,
  onUpdateTask,
}: {
  tasks: Task[];
  onDeleteTask: (id: string) => void;
  onUpdateTask: (task: Task) => void;
}) => {
  return (
    <Box>
      <TableContainer sx={tableContainerStyles}>
        <Table size="small" sx={tableStyles}>
          <TableHead>
            <TableRow sx={headerRowStyles}>
              <TableCell sx={baseCellStyles}>{strings.colTitle}</TableCell>
              <TableCell sx={baseCellStyles}>
                {strings.colDescription}
              </TableCell>
              <TableCell sx={baseCellStyles}>{strings.colStatus}</TableCell>
              <TableCell sx={baseCellStyles}>{strings.colCreated}</TableCell>
              <TableCell sx={baseCellStyles}>{strings.colDueDate}</TableCell>
              <TableCell sx={baseCellStyles}>{strings.colPriority}</TableCell>
              <TableCell sx={baseCellStyles}>{strings.colType}</TableCell>
              <TableCell sx={baseCellStyles}>{strings.editButton}</TableCell>
              <TableCell sx={baseCellStyles}>{strings.deleteButton}</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {renderTaskList(tasks, onDeleteTask, onUpdateTask)}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TaskTable;
