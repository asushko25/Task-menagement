import { Box, Button } from "@mui/material";
import { strings } from "./helpers";
import { buttonStyles, containerStyles } from "./styles";

type CreateTaskProps = {
  onOpen: () => void;
};

export const CreateTask = ({ onOpen }: CreateTaskProps) => {
  return (
    <Box sx={containerStyles}>
      <Button variant="contained" onClick={onOpen} sx={buttonStyles}>
        {strings.addTaskButton}
      </Button>
    </Box>
  );
};
