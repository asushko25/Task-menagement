import {
  Button,
  Dialog,
  DialogActions,
  TextField,
  DialogContent,
} from "@mui/material";
import { useState } from "react";
import type { CreateTaskInput } from "../../hooks/useTaskManager";
import { strings } from "./helpers";

type TaskDialogProps = {
  open: boolean;
  onClose: () => void;
  onCreateTask: (input: CreateTaskInput) => void;
};

const TaskDialog = ({ open, onClose, onCreateTask }: TaskDialogProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = () => {
    onCreateTask({ title, description });
    setTitle("");
    setDescription("");
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
