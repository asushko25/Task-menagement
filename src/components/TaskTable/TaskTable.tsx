import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  actionCellStyles,
  baseCellStyles,
  emptyStateCellStyles,
  headerRowStyles,
  tableContainerStyles,
  tableStyles,
} from "./styles";
import type { Task } from "../../types/task";
import { strings } from "./helpers";

const renderTaskList = (tasks: Task[], onDeleteTask: (id: string) => void) => {
  return tasks.length === 0 ? (
    <TableRow>
      <TableCell align="center" colSpan={8} sx={emptyStateCellStyles}>
        {strings.empty}
      </TableCell>
    </TableRow>
  ) : (
    tasks.map((task) => (
      <TableRow key={task.id}>
        <TableCell sx={baseCellStyles}>{task.title}</TableCell>
        <TableCell sx={baseCellStyles}>{task.description}</TableCell>
        <TableCell sx={baseCellStyles}>{task.status}</TableCell>
        <TableCell sx={baseCellStyles}>{task.createdAt}</TableCell>
        <TableCell sx={baseCellStyles}>{task.dueDate ?? "—"}</TableCell>
        <TableCell sx={baseCellStyles}>{task.priority ?? "—"}</TableCell>
        <TableCell sx={baseCellStyles}>{task.type ?? "—"}</TableCell>
        <TableCell sx={actionCellStyles}>
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
  );
};

export const TaskTable = ({
  tasks,
  onDeleteTask,
}: {
  tasks: Task[];
  onDeleteTask: (id: string) => void;
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
              <TableCell sx={actionCellStyles}>
                {strings.deleteButton}
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>{renderTaskList(tasks, onDeleteTask)}</TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TaskTable;
